import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://digilicen.com";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

async function exists(file) {
  try {
    return await stat(file);
  } catch {
    return null;
  }
}

async function resolveLocalReference(source, reference) {
  const clean = reference.split(/[?#]/, 1)[0];
  if (!clean) return true;

  let target = clean.startsWith("/")
    ? path.join(ROOT, clean.slice(1))
    : path.resolve(path.dirname(source), clean);
  const targetStat = await exists(target);
  if (targetStat?.isFile()) return true;
  if (targetStat?.isDirectory() && await exists(path.join(target, "index.html"))) return true;
  if (!path.extname(target) && await exists(`${target}.html`)) return true;
  return false;
}

const files = await walk(ROOT);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const errors = [];
let jsonLdCount = 0;
let localReferenceCount = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    jsonLdCount += 1;
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${path.relative(ROOT, file)} has invalid JSON-LD: ${error.message}`);
    }
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/.test(reference)) continue;
    localReferenceCount += 1;
    if (!await resolveLocalReference(file, reference)) {
      errors.push(`${path.relative(ROOT, file)} has a broken reference: ${reference}`);
    }
  }
}

const sitemap = await readFile(path.join(ROOT, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
if (duplicateUrls.length) errors.push(`sitemap.xml has duplicate URLs: ${[...new Set(duplicateUrls)].join(", ")}`);

for (const url of sitemapUrls) {
  if (!url.startsWith(SITE_URL)) {
    errors.push(`sitemap.xml has a URL outside ${SITE_URL}: ${url}`);
    continue;
  }
  const pathname = new URL(url).pathname;
  const relative = pathname === "/" ? "index.html" : `${pathname.replace(/^\//, "")}.html`;
  const direct = path.join(ROOT, pathname.replace(/^\//, ""));
  const candidates = pathname.endsWith("/")
    ? [path.join(direct, "index.html")]
    : [direct, path.join(ROOT, relative)];
  const page = candidates.find((candidate) => files.includes(candidate));
  if (!page) {
    errors.push(`sitemap.xml points to a missing page: ${url}`);
    continue;
  }
  const html = await readFile(page, "utf8");
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) {
    errors.push(`sitemap.xml contains a noindex page: ${url}`);
  }
}

const robots = await readFile(path.join(ROOT, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  errors.push("robots.txt does not reference the canonical sitemap URL");
}

const llms = await readFile(path.join(ROOT, "llms.txt"), "utf8");
for (const required of ["# DIGILICEN", "## Product Pages", "## Blog Guides"]) {
  if (!llms.includes(required)) errors.push(`llms.txt is missing ${required}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${htmlFiles.length} HTML files, ${jsonLdCount} JSON-LD blocks, ${localReferenceCount} local references, and ${sitemapUrls.length} sitemap URLs.`);
}
