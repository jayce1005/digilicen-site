const PRODUCTS = [
  {
    slug: "adobe-1-year",
    name: "Adobe Creative Cloud",
    category: "Adobe",
    badge: "Adobe",
    version: "Creative Cloud Subscription",
    term: "1 Year",
    price: "US$50.00",
    summary: "Adobe Creative Cloud 1 year subscription for professional creative workflows.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-Pack-Genuine-Software-License_1601806607731.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "adobe-6-month",
    name: "Adobe Creative Cloud",
    category: "Adobe",
    badge: "Adobe",
    version: "Creative Cloud Subscription",
    term: "6 Months",
    price: "US$30.00",
    summary: "Adobe Creative Cloud 6 month subscription with fast digital activation support.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806588843.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "adobe-3-month",
    name: "Adobe Creative Cloud",
    category: "Adobe",
    badge: "Adobe",
    version: "Creative Cloud Subscription",
    term: "3 Months",
    price: "US$15.00",
    summary: "Adobe Creative Cloud 3 month subscription for short-term creative projects.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Genuine-Software-License_1601806724021.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "adobe-1-month",
    name: "Adobe Creative Cloud",
    category: "Adobe",
    badge: "Adobe",
    version: "Creative Cloud Subscription",
    term: "1 Month",
    price: "US$6.00",
    summary: "Adobe Creative Cloud 1 month subscription for flexible creative software use.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806591792.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "infraworks",
    name: "Autodesk InfraWorks",
    category: "Autodesk",
    badge: "InfraWorks",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "Infrastructure planning and design license for professional users.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "recap-pro",
    name: "Autodesk ReCap Pro",
    category: "Autodesk",
    badge: "ReCap",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "ReCap Pro commercial license for reality capture and scan workflows.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "autocad-architecture",
    name: "Autodesk AutoCAD Architecture",
    category: "Autodesk",
    badge: "Architecture",
    version: "Professional License",
    term: "1 Year",
    price: "US$60.00",
    summary: "AutoCAD Architecture professional license for building design workflows.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "navisworks",
    name: "Autodesk Navisworks Manage",
    category: "Autodesk",
    badge: "Navisworks",
    version: "Professional License",
    term: "1 Year",
    price: "US$60.00",
    summary: "Navisworks Manage professional license for review, coordination, and project checking.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "fusion-360",
    name: "Autodesk Fusion 360",
    category: "Autodesk",
    badge: "Fusion 360",
    version: "Professional License",
    term: "1 Year",
    price: "US$50.00",
    summary: "Fusion 360 professional license for product design and engineering workflows.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "inventor",
    name: "Autodesk Inventor",
    category: "Autodesk",
    badge: "Inventor",
    version: "Professional License",
    term: "1 Year",
    price: "US$60.00",
    summary: "Inventor professional license support for product design and engineering teams.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "maya",
    name: "Autodesk Maya",
    category: "Autodesk",
    badge: "Maya",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "Maya commercial license for animation, modeling, and creative production.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "3ds-max",
    name: "Autodesk 3ds Max",
    category: "Autodesk",
    badge: "3ds Max",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "3ds Max commercial license for rendering, animation, and visualization.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "civil-3d",
    name: "Autodesk Civil 3D",
    category: "Engineering",
    badge: "Civil 3D",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "Civil 3D commercial license for civil engineering design and documentation.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "revit",
    name: "Autodesk Revit",
    category: "Engineering",
    badge: "Revit",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "Revit commercial license for BIM and building design workflows.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-License-Pack-Genuine-Software_1601806611404.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  },
  {
    slug: "plant-3d",
    name: "AutoCAD Plant 3D",
    category: "Engineering",
    badge: "Plant 3D",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "Plant 3D commercial software license with digital delivery support.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-for-Plant-3D-Commercial-Software_1601758107128.html?spm=a2747.product_manager.0.0.7b1371d2K5bAaX"
  },
  {
    slug: "dwg-history",
    name: "AutoCAD DWG History",
    category: "Autodesk",
    badge: "DWG",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "DWG History commercial license inquiry with secure payment and online support.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-for-DWG-History-Commercial-Software_1601758046299.html?spm=a2747.product_manager.0.0.7b1371d2K5bAaX"
  },
  {
    slug: "electrical",
    name: "AutoCAD Electrical",
    category: "Engineering",
    badge: "Electrical",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "AutoCAD Electrical commercial license for electrical design workflows.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-for-Electrical-Commercial-1-Year_1601758034451.html?spm=a2747.product_manager.0.0.7b1371d2K5bAaX"
  },
  {
    slug: "map-3d",
    name: "Autodesk Map 3D",
    category: "Engineering",
    badge: "Map 3D",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "Map 3D commercial license for mapping and infrastructure workflows.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-for-Map-3D-Commercial-Software_1601757959996.html?spm=a2747.product_manager.0.0.7b1371d2K5bAaX"
  },
  {
    slug: "autocad-lt",
    name: "AutoCAD LT",
    category: "Autodesk",
    badge: "AutoCAD LT",
    version: "Commercial License",
    term: "1 Year",
    price: "US$65.00",
    summary: "AutoCAD LT commercial software license inquiry with activation support.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-for-Autocad-LT-Commercial-Software_1601758139076.html?spm=a2747.product_manager.0.0.7b1371d2K5bAaX"
  },
  {
    slug: "revit-lt",
    name: "Autodesk Revit LT",
    category: "Engineering",
    badge: "Revit LT",
    version: "Commercial License",
    term: "1 Year",
    price: "US$65.00",
    summary: "Revit LT commercial license inquiry for compatible Windows or Mac workflows.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-Revit-LT-Commercial-Software-MAC_1601758056566.html?spm=a2747.product_manager.0.0.702171d2cvVl7s"
  },
  {
    slug: "bim-collection",
    name: "AutoCAD BIM Collection",
    category: "Engineering",
    badge: "BIM",
    version: "Commercial License",
    term: "1 Year",
    price: "US$80.00",
    summary: "BIM collection commercial license for coordinated design and project workflows.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-for-BIM-Collection-Commercial-1_1601758110154.html?spm=a2747.product_manager.0.0.702171d2cvVl7s"
  },
  {
    slug: "raster-design",
    name: "Autodesk Raster Design",
    category: "Autodesk",
    badge: "Raster",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "Raster Design commercial license option for image and CAD workflows.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-for-Raster-Design-Commercial-1_1601758034573.html?spm=a2700.micro_product_manager.0.0.5d083e5fhGAlOe"
  },
  {
    slug: "aec-collection",
    name: "Autodesk AEC Collection",
    category: "Engineering",
    badge: "AEC",
    version: "Commercial License",
    term: "1 Year",
    price: "US$75.00",
    summary: "Architecture, engineering, and construction collection commercial license.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-for-Architecture-Engineering-Construction-Collection_1601757945813.html?spm=a2700.micro_product_manager.0.0.5d083e5fhGAlOe"
  },
  {
    slug: "mep",
    name: "AutoCAD MEP",
    category: "Engineering",
    badge: "MEP",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "AutoCAD MEP commercial license with compatibility confirmation before payment.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-for-MEP-Commercial-Software-Internet_1601757958944.html?spm=a2700.micro_product_manager.0.0.5d083e5fhGAlOe"
  },
  {
    slug: "autocad-mechanical",
    name: "AutoCAD Mechanical",
    category: "Autodesk",
    badge: "Mechanical",
    version: "Commercial License",
    term: "1 Year",
    price: "US$60.00",
    summary: "AutoCAD Mechanical commercial license with guided activation support.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-AutoCAD-Mechanical-Commercial-Software-1_1601758057430.html?spm=a2700.micro_product_manager.0.0.5d083e5fhGAlOe"
  },
  {
    slug: "autocad",
    name: "AutoCAD",
    category: "Autodesk",
    badge: "AutoCAD",
    version: "Commercial License",
    term: "1 Year",
    price: "US$65.00",
    summary: "AutoCAD commercial software license for professional drafting and design teams.",
    alibaba: "https://www.alibaba.com/product-detail/Customization-AutoCAD-Commercial-Software-1-Year_1601757905109.html?spm=a2700.micro_product_manager.0.0.5d083e5fhGAlOe"
  },
  {
    slug: "jetbrains-ai-assistant-all-products-6-month",
    name: "JetBrains AI Assistant + All Products Pack",
    category: "Developer Tools",
    badge: "JetBrains",
    version: "AI Assistant with JetBrains All Products Pack Activation",
    term: "6 Months",
    price: "US$34.00",
    summary: "JetBrains AI Assistant with All Products Pack activation for 16 professional developer tools, multi-device and cross-platform use.",
    alibaba: "https://www.alibaba.com/product-detail/DIGILICEN-Software-Pack-Genuine-Software-License_1601806607731.html?spm=a2747.product_manager.0.0.2c0f71d2KomOoG"
  }
];

const EMAIL = "digilicen@outlook.com";
const WHATSAPP = "https://wa.me/8619928777176";
const CATEGORY_IMAGES = {
  Autodesk: "assets/autodesk-generic.png",
  Adobe: "assets/adobe-creative-large.png",
  Engineering: "assets/aec-collection.png",
  "Developer Tools": "assets/jetbrains-ai-assistant-all-products-6-month-usd34.png"
};

const PRODUCT_IMAGES = {
  "adobe-1-year": "assets/adobe-1-year.png",
  "adobe-6-month": "assets/adobe-6-month.png",
  "adobe-3-month": "assets/adobe-3-month.png",
  "adobe-1-month": "assets/adobe-1-month.png",
  autocad: "assets/autocad-commercial.png",
  "autocad-mechanical": "assets/autocad-mechanical.png",
  mep: "assets/autocad-mep.png",
  "aec-collection": "assets/aec-collection.png",
  "bim-collection": "assets/bim-collection.png",
  "raster-design": "assets/raster-design.png",
  "jetbrains-ai-assistant-all-products-6-month": "assets/jetbrains-ai-assistant-all-products-6-month-usd34.png"
};

function bySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug) || PRODUCTS[0];
}

function productUrl(slug) {
  return `products/${encodeURIComponent(slug)}`;
}

function whatsappFor(productName) {
  return `${WHATSAPP}?text=${encodeURIComponent(`Hello DIGILICEN, I want to inquire about ${productName}.`)}`;
}

function paypalFor(product) {
  const label = productLabel(product);
  const body = [
    "Hello DIGILICEN,",
    "",
    "I want to pay by PayPal invoice for this software license:",
    `Product: ${label}`,
    `Version: ${product.version}`,
    `Price: ${product.price}`,
    "",
    "Please confirm availability and send me the PayPal invoice."
  ].join("\n");

  return `mailto:${EMAIL}?subject=${encodeURIComponent(`PayPal invoice request: ${label}`)}&body=${encodeURIComponent(body)}`;
}

function imageFor(product) {
  return PRODUCT_IMAGES[product.slug] || CATEGORY_IMAGES[product.category] || "assets/genuine-software.png";
}

function productLabel(product) {
  return `${product.name} - ${product.term}`;
}

function renderProducts(filter = "all") {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;

  const products = filter === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.category === filter);
  grid.innerHTML = products.map((product) => `
    <article class="product-card">
      <a class="product-visual" href="${productUrl(product.slug)}" aria-label="View ${product.name}">
        <img src="${imageFor(product)}" alt="${product.name}">
      </a>
      <span class="category">${product.category}</span>
      <h3>${product.name}</h3>
      <div class="product-facts">
        <span><strong>Version</strong>${product.version}</span>
        <span><strong>Term</strong>${product.term}</span>
        <span><strong>Price</strong>${product.price}</span>
      </div>
      <p>${product.summary}</p>
      <div class="card-actions">
        <a href="${productUrl(product.slug)}">View Details</a>
        <a href="${product.alibaba}" target="_blank" rel="noopener noreferrer nofollow">Alibaba</a>
        <a href="${paypalFor(product)}">PayPal Invoice</a>
      </div>
    </article>
  `).join("");
}

function renderProductSelect(selectedName = "") {
  const select = document.querySelector("#productSelect");
  if (!select) return;

  select.innerHTML = PRODUCTS.map((product) => `
    <option value="${productLabel(product)}" ${productLabel(product) === selectedName ? "selected" : ""}>${productLabel(product)}</option>
  `).join("");
}

function renderProductDetail() {
  const detail = document.querySelector("#productDetail");
  if (!detail) return;

  const params = new URLSearchParams(window.location.search);
  const product = bySlug(params.get("product"));
  document.title = `${product.name} | DIGILICEN`;

  detail.innerHTML = `
      <div class="product-detail-card">
      <div class="product-detail-visual">
        <img src="${imageFor(product)}" alt="${product.name}">
      </div>
      <div class="product-info-panel">
        <p class="eyebrow">${product.category} license inquiry</p>
        <h1>${product.name}</h1>
        <p class="product-summary">${product.summary}</p>
        <div class="product-meta">
          <span><strong>Version</strong> ${product.version}</span>
          <span><strong>Term</strong> ${product.term}</span>
          <span><strong>Price</strong> ${product.price}</span>
          <span><strong>License type</strong> Genuine commercial software license</span>
          <span><strong>Delivery</strong> Digital delivery after payment confirmation</span>
          <span><strong>Payment</strong> Alibaba secure online payment or PayPal invoice</span>
          <span><strong>Support</strong> WhatsApp and email activation guidance</span>
        </div>
        <div class="product-actions">
          <a class="btn btn-primary" href="${product.alibaba}" target="_blank" rel="noopener noreferrer nofollow">Pay Securely on Alibaba</a>
          <a class="btn btn-secondary" href="${paypalFor(product)}">Request PayPal Invoice</a>
          <a class="btn btn-ghost" href="${whatsappFor(product.name)}" target="_blank" rel="noopener">WhatsApp Inquiry</a>
          <a class="btn btn-secondary" href="mailto:${EMAIL}?subject=${encodeURIComponent(`Inquiry: ${product.name}`)}">Email Inquiry</a>
        </div>
      </div>
    </div>
  `;

  renderProductSelect(productLabel(product));
}

function bindFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      renderProducts(chip.dataset.filter);
    });
  });
}

function bindInquiryForm() {
  const form = document.querySelector("#inquiryForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const product = data.get("product") || PRODUCTS[0].name;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Product: ${product}`,
      "",
      data.get("message") || ""
    ].join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Software license inquiry: ${product}`)}&body=${encodeURIComponent(body)}`;
  });
}

function bindMobileMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  if (!header || !toggle) return;

  toggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });
}

renderProducts();
renderProductSelect();
renderProductDetail();
bindFilters();
bindInquiryForm();
bindMobileMenu();
