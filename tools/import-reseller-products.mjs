import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const API_BASE = "https://reseller.ado-besoft.com";
const MARKUP_MULTIPLIER = 6;

const CATEGORY_MAP = {
  "Account trading": "Account Services",
  "Ai Tools": "AI Tools",
  "Career & Professional Growth": "Professional Growth",
  "Design Tools": "Design Tools",
  "Microsoft Office": "Microsoft Office",
  "Programming tools": "Developer Tools",
  "Remote Access": "Remote Access",
  Streaming: "Streaming",
  "Vpn Tools": "VPN Tools"
};

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? "" : process.argv[index + 1] || "";
}

function asciiText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanName(value) {
  return asciiText(value)
    .replace(/\bAcconts?\b/gi, "Accounts")
    .replace(/\bVesion\b/gi, "Version")
    .replace(/\bDue\b(?=\s+12\s+Months)/gi, "- Full")
    .replace(/([A-Za-z0-9])\(/g, "$1 (")
    .replace(/\s*\|\s*/g, " | ")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return asciiText(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function formatMoney(value) {
  return Number(value).toFixed(2);
}

function termLabel(month) {
  if (month === 0) return "One-Time";
  if (month < 0) return `${Math.abs(month)} Days`;
  if (month === 1) return "1 Month";
  if (month === 12) return "1 Year";
  if (month === 24) return "2 Years";
  if (month === 36) return "3 Years";
  return `${month} Months`;
}

function versionLabel(category, name) {
  if (category === "Account Services" || category === "Streaming") return "Digital Account Service";
  if (/key|license|serial/i.test(name)) return "Digital License Key";
  if (/subscription|account|activation|invite/i.test(name)) return "Digital Subscription";
  if (category === "Professional Growth") return "Professional Digital Product";
  return "Digital Product";
}

function deliveryLabel(product) {
  if (product.requiresEmail) return "Digital delivery; an account email may be required after confirmation";
  if (product.manualFulfill) return "Manual digital delivery after availability confirmation";
  return "Digital delivery after availability and order confirmation";
}

function summaryFor(name, category, options) {
  const terms = options.map((option) => option.term).join(", ");
  const subject = category === "Account Services" || category === "Streaming"
    ? "digital account service"
    : "digital product inquiry";
  return `${name} ${subject} with ${terms} option${options.length === 1 ? "" : "s"}. Confirm requirements, compatibility, delivery, warranty, and availability before payment.`;
}

async function fetchCatalog() {
  const username = process.env.ADO_USER;
  const password = process.env.ADO_PASS;
  if (!username || !password) {
    throw new Error("Set ADO_USER and ADO_PASS, or provide --input /path/to/catalog.json");
  }

  const loginResponse = await fetch(`${API_BASE}/api/credits-pool/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!loginResponse.ok) throw new Error(`Login failed: ${loginResponse.status}`);
  const login = await loginResponse.json();
  const token = login.token || login.accessToken || login.data?.token;
  if (!token) throw new Error("Login response did not include a token");

  const catalogResponse = await fetch(`${API_BASE}/api/credits-pool/marketplace/products`, {
    headers: { authorization: `Bearer ${token}` }
  });
  if (!catalogResponse.ok) throw new Error(`Catalog request failed: ${catalogResponse.status}`);
  return catalogResponse.json();
}

function imageExtension(contentType, url) {
  const type = String(contentType || "").toLowerCase();
  if (type.includes("webp")) return ".webp";
  if (type.includes("jpeg") || type.includes("jpg")) return ".jpg";
  if (type.includes("gif")) return ".gif";
  if (type.includes("png")) return ".png";
  const fromUrl = path.extname(new URL(url).pathname).toLowerCase();
  return [".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(fromUrl) ? fromUrl : ".jpg";
}

async function downloadImage(url, slug) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "Mozilla/5.0 DIGILICEN catalog importer" },
        signal: AbortSignal.timeout(30000)
      });
      if (!response.ok) throw new Error(`Image request failed (${response.status}): ${url}`);
      const extension = imageExtension(response.headers.get("content-type"), url);
      const relative = `assets/catalog/${slug}${extension}`;
      await writeFile(new URL(`../${relative}`, import.meta.url), Buffer.from(await response.arrayBuffer()));
      return relative;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  throw lastError;
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

const input = argValue("--input");
const rawCatalog = input ? JSON.parse(await readFile(input, "utf8")) : await fetchCatalog();
const sourceProducts = rawCatalog.products || [];
if (sourceProducts.length !== 91) {
  throw new Error(`Expected 91 reseller products, received ${sourceProducts.length}`);
}

await mkdir(new URL("../assets/catalog/", import.meta.url), { recursive: true });
await mkdir(new URL("../data/", import.meta.url), { recursive: true });

const normalized = sourceProducts.map((source) => {
  const name = cleanName(source.name);
  const slug = `reseller-${source.id}-${slugify(name)}`;
  const category = CATEGORY_MAP[source.category] || cleanName(source.category) || "Digital Products";
  const options = (source.purchaseOptions || [])
    .filter((option) => Number(option.priceGoldCoins) > 0)
    .map((option) => ({
      term: termLabel(Number(option.month)),
      monthCode: Number(option.month),
      supplierCostGc: Number(option.priceGoldCoins),
      priceUsd: Number((Number(option.priceGoldCoins) * MARKUP_MULTIPLIER).toFixed(2)),
      availableCount: Number(option.availableCount || 0)
    }));
  const prices = options.map((option) => option.priceUsd);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const price = minPrice === maxPrice
    ? `US$${formatMoney(minPrice)}`
    : `US$${formatMoney(minPrice)}-${formatMoney(maxPrice)}`;

  return {
    slug,
    name,
    category,
    sourceCategory: cleanName(source.category),
    sourceId: Number(source.id),
    badge: name.split(/\s+/).slice(0, 3).join(" "),
    version: versionLabel(category, name),
    term: options.length === 1 ? options[0].term : "Multiple Options",
    price,
    priceMin: minPrice,
    priceMax: maxPrice,
    summary: summaryFor(name, category, options),
    alibaba: "",
    contactOnly: true,
    delivery: deliveryLabel(source),
    available: Boolean(source.available),
    availableCount: Number(source.availableCount || 0),
    requiresEmail: Boolean(source.requiresEmail),
    warrantyType: asciiText(source.warrantyType || "confirm-before-order"),
    warrantyDays: source.warrantyDays == null ? null : Number(source.warrantyDays),
    markupMultiplier: MARKUP_MULTIPLIER,
    options,
    sourceImageUrl: source.imageUrl
  };
});

const slugs = new Set(normalized.map((product) => product.slug));
if (slugs.size !== normalized.length) throw new Error("Duplicate reseller slugs detected");

const productsWithImages = await mapWithConcurrency(normalized, 3, async (product) => {
  const image = await downloadImage(product.sourceImageUrl, product.slug);
  return { ...product, image };
});

const publicProducts = productsWithImages.map((product) => {
  const { sourceImageUrl, markupMultiplier, ...publicProduct } = product;
  return {
    ...publicProduct,
    options: publicProduct.options.map(({ supplierCostGc, ...option }) => option)
  };
});

const generated = `// Generated by tools/import-reseller-products.mjs. Do not edit by hand.\nconst RESELLER_PRODUCTS = ${JSON.stringify(publicProducts, null, 2)};\n`;
await writeFile(new URL("../reseller-products.js", import.meta.url), generated);
await writeFile(
  new URL("../data/reseller-catalog-private.json", import.meta.url),
  `${JSON.stringify({
    importedAt: new Date().toISOString(),
    source: API_BASE,
    markupMultiplier: MARKUP_MULTIPLIER,
    productCount: productsWithImages.length,
    products: productsWithImages
  }, null, 2)}\n`
);

console.log(`Imported ${productsWithImages.length} products at ${MARKUP_MULTIPLIER}x supplier GC cost.`);
