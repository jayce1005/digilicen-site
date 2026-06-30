import { mkdir, readFile, writeFile } from "node:fs/promises";

const SITE_URL = "https://digilicen.com";
const SITE_NAME = "DIGILICEN";
const EMAIL = "digilicen@outlook.com";
const WHATSAPP = "https://wa.me/8619928777176";
const LASTMOD = "2026-06-30";
const SOURCE = await readFile(new URL("../app.js", import.meta.url), "utf8");

function extractLiteral(name, terminator) {
  const marker = `const ${name} = `;
  const start = SOURCE.indexOf(marker);
  if (start === -1) throw new Error(`Missing ${name}`);
  const literalStart = start + marker.length;
  const end = SOURCE.indexOf(terminator, literalStart);
  if (end === -1) throw new Error(`Missing terminator for ${name}`);
  return SOURCE.slice(literalStart, end + terminator.trim().length);
}

const PRODUCTS = Function(`return ${extractLiteral("PRODUCTS", "\n];")}`)();
const CATEGORY_IMAGES = Function(`return ${extractLiteral("CATEGORY_IMAGES", "\n};")}`)();
const PRODUCT_IMAGES = Function(`return ${extractLiteral("PRODUCT_IMAGES", "\n};")}`)();
const CATEGORY_PAGES = [
  {
    slug: "autodesk-software-licenses",
    name: "Autodesk Software Licenses",
    title: "Autodesk Software Licenses | AutoCAD, Revit, Maya, Inventor | DIGILICEN",
    description: "Autodesk software license inquiries from DIGILICEN, including AutoCAD, Revit, Maya, Inventor, Civil 3D, Fusion 360, Navisworks, and AEC tools.",
    heading: "Autodesk software license inquiries",
    intro: "Browse Autodesk commercial license options for design, engineering, BIM, architecture, manufacturing, and visualization workflows.",
    image: "assets/autodesk-generic.png",
    match: (product) => product.category === "Autodesk" || product.category === "Engineering"
  },
  {
    slug: "adobe-creative-cloud-subscription",
    name: "Adobe Creative Cloud Subscriptions",
    title: "Adobe Creative Cloud Subscription Licenses | DIGILICEN",
    description: "Adobe Creative Cloud subscription inquiries with 1 year, 6 month, 3 month, and 1 month options from DIGILICEN.",
    heading: "Adobe Creative Cloud subscription inquiries",
    intro: "Compare Adobe Creative Cloud subscription terms for creative, design, PDF, video, and professional production workflows.",
    image: "assets/adobe-creative-large.png",
    match: (product) => product.category === "Adobe"
  },
  {
    slug: "autocad-engineering-software-licenses",
    name: "AutoCAD and Engineering Software Licenses",
    title: "AutoCAD and Engineering Software Licenses | DIGILICEN",
    description: "AutoCAD, Civil 3D, Revit, Plant 3D, MEP, Electrical, Map 3D, and BIM software license inquiries from DIGILICEN.",
    heading: "AutoCAD and engineering software license inquiries",
    intro: "Find AutoCAD and engineering software license options for CAD, BIM, infrastructure, plant design, electrical design, and construction teams.",
    image: "assets/aec-collection.png",
    match: (product) => product.category === "Engineering" || product.name.includes("AutoCAD") || product.name.includes("Revit")
  },
  {
    slug: "developer-tools-software-licenses",
    name: "Developer Tools Software Licenses",
    title: "Developer Tools Software Licenses | JetBrains AI Assistant | DIGILICEN",
    description: "Developer tools software license inquiries from DIGILICEN, including JetBrains AI Assistant and JetBrains All Products Pack activation options.",
    heading: "Developer tools software license inquiries",
    intro: "Browse developer software license options for coding, AI assistant workflows, JetBrains tools, multi-device use, and cross-platform development teams.",
    image: "assets/jetbrains-ai-assistant-all-products-6-month-usd34.png",
    match: (product) => product.category === "Developer Tools" || product.name.includes("JetBrains")
  }
];
const BLOG_POSTS = [
  {
    slug: "how-to-buy-genuine-autodesk-software-licenses-online",
    title: "How to Buy Genuine Autodesk Software Licenses Online",
    description: "A practical guide for business buyers comparing Autodesk software license options, payment methods, delivery details, and activation support.",
    category: "Autodesk licenses",
    date: "2026-06-24",
    heroImage: "assets/autodesk-generic.png",
    related: ["autocad", "revit", "inventor", "maya"],
    cta: "Ask DIGILICEN to confirm the Autodesk license, version, term, account requirements, and payment method before you order.",
    sections: [
      {
        heading: "Start with the exact Autodesk product you need",
        paragraphs: [
          "Autodesk software covers many professional workflows, including drafting, BIM, architecture, manufacturing, animation, civil engineering, plant design, and construction coordination. Before requesting a quote, write down the exact product name, the license term, and the device or account environment where the software will be used.",
          "For example, AutoCAD, AutoCAD LT, Revit, Civil 3D, Inventor, Maya, Fusion 360, and Navisworks all serve different teams. Choosing the closest product name helps the seller confirm availability faster and reduces the chance of ordering a license that does not match your workflow."
        ]
      },
      {
        heading: "Confirm license term, account email, and compatibility",
        paragraphs: [
          "Most online software license inquiries need three details before payment: the term length, the account email or activation method, and the operating system or device environment. If your team uses managed company accounts, ask whether the license can match your account setup before placing an order.",
          "Compatibility checks are especially important for engineering teams. Some tools may have version, language, platform, or account requirements. A short confirmation message before payment can prevent delays after the order is placed."
        ]
      },
      {
        heading: "Use a payment path that keeps a clear order record",
        paragraphs: [
          "For international software sourcing, buyers often prefer payment methods that create a clear order trail. DIGILICEN supports Alibaba online payment and PayPal invoice requests, so customers can confirm the product and payment route before activation support begins.",
          "After payment, keep the order number, product name, account email, and preferred contact method together. Sending those details in one message helps the support team process the license request more efficiently."
        ]
      }
    ]
  },
  {
    slug: "autocad-commercial-license-vs-autocad-lt",
    title: "AutoCAD Commercial License vs AutoCAD LT: Which One Should You Choose?",
    description: "Compare AutoCAD Commercial License and AutoCAD LT for professional drafting, design workflows, pricing, and business license inquiries.",
    category: "AutoCAD licenses",
    date: "2026-06-24",
    heroImage: "assets/autocad-commercial.png",
    related: ["autocad", "autocad-lt", "autocad-mechanical", "mep"],
    cta: "Send DIGILICEN your workflow and required term to confirm whether AutoCAD or AutoCAD LT is the better inquiry option.",
    sections: [
      {
        heading: "The main difference is workflow depth",
        paragraphs: [
          "AutoCAD is generally chosen by teams that need broader professional drafting and design capabilities. It is commonly requested by architects, engineers, product designers, and CAD teams that need a full AutoCAD commercial license inquiry.",
          "AutoCAD LT is often requested for lighter drafting work and 2D documentation needs. If your team mainly creates 2D drawings and does not need the broader AutoCAD toolset, AutoCAD LT may be the simpler option to ask about."
        ]
      },
      {
        heading: "Consider the role of specialized AutoCAD tools",
        paragraphs: [
          "Some customers search for AutoCAD but actually need a specialized product such as AutoCAD Mechanical, AutoCAD MEP, AutoCAD Electrical, AutoCAD Plant 3D, or AutoCAD Architecture. These names matter because the workflow and license inquiry may be different.",
          "Before payment, share the exact project type with the seller. Mechanical design, MEP drafting, plant design, electrical documentation, and architecture workflows should be confirmed against the exact product name."
        ]
      },
      {
        heading: "Match your inquiry to term and support needs",
        paragraphs: [
          "A 1 year term is common for business and professional users who need predictable access. When sending an inquiry, include product name, term, account email requirements, and any operating system details.",
          "If you are unsure which AutoCAD option fits, it is better to confirm before paying. DIGILICEN can help compare listed options and direct you to the closest license inquiry page."
        ]
      }
    ]
  },
  {
    slug: "adobe-creative-cloud-subscription-terms",
    title: "Adobe Creative Cloud 1 Year vs 6 Month vs 3 Month Subscription",
    description: "Compare Adobe Creative Cloud subscription terms for creative teams, short projects, flexible use, and digital delivery inquiries.",
    category: "Adobe Creative Cloud",
    date: "2026-06-24",
    heroImage: "assets/adobe-creative-large.png",
    related: ["adobe-1-year", "adobe-6-month", "adobe-3-month", "adobe-1-month"],
    cta: "Choose the Adobe Creative Cloud term you need, then request availability and payment confirmation from DIGILICEN.",
    sections: [
      {
        heading: "Choose a term based on project length",
        paragraphs: [
          "Adobe Creative Cloud subscription inquiries often start with term length. A 1 year option is useful for ongoing creative work, agency teams, design departments, and regular content production.",
          "Shorter terms such as 6 months, 3 months, or 1 month can fit temporary projects, contractors, testing, or seasonal production. The best term depends on how long the user needs access and whether the project will continue after delivery."
        ]
      },
      {
        heading: "Confirm account and activation requirements",
        paragraphs: [
          "Before placing an Adobe Creative Cloud order, confirm whether the subscription requires a specific account email or other activation details. Sending the correct account information early helps avoid delays after payment.",
          "Creative Cloud is used across design, PDF, photo, video, web, and production workflows. If your team depends on specific Adobe apps, mention them in the inquiry so support can confirm the right subscription option."
        ]
      },
      {
        heading: "Keep payment and support details clear",
        paragraphs: [
          "DIGILICEN lists Adobe Creative Cloud subscription options with prices and inquiry buttons. Customers can continue through Alibaba, request a PayPal invoice, or contact the team by WhatsApp or email.",
          "After payment, send the order number, selected term, account email if required, and preferred contact method. This keeps digital delivery and activation guidance organized."
        ]
      }
    ]
  },
  {
    slug: "digital-software-license-delivery-process",
    title: "How Digital Software License Delivery Works",
    description: "Learn what buyers should prepare for digital software license delivery, including product details, account email, payment confirmation, and support steps.",
    category: "Software license delivery",
    date: "2026-06-24",
    heroImage: "assets/genuine-software.png",
    related: ["autocad", "adobe-1-year", "aec-collection", "bim-collection"],
    cta: "Prepare your product name, term, account email, and order number before contacting DIGILICEN for digital delivery support.",
    sections: [
      {
        heading: "Digital delivery starts before payment",
        paragraphs: [
          "A smooth digital software license order starts with clear product information. Before payment, confirm the product name, version or license type, term length, operating system, and account email requirements.",
          "Software licenses are not physical goods, so the support process depends on accurate account and order details. The more complete the inquiry, the faster the seller can confirm availability and next steps."
        ]
      },
      {
        heading: "Payment confirmation connects the order to support",
        paragraphs: [
          "After using Alibaba online payment or requesting a PayPal invoice, keep your order number available. This number helps connect payment confirmation with license processing and support communication.",
          "When contacting support, include the product name, selected term, payment method, order number, account email if required, and the best contact channel. This avoids repeated questions and keeps the delivery process moving."
        ]
      },
      {
        heading: "Activation guidance depends on the product",
        paragraphs: [
          "Different software products may have different activation or account steps. Some buyers need help checking compatibility, while others need guidance after payment confirmation.",
          "DIGILICEN focuses on genuine software license solutions and support communication through WhatsApp and email. If you have any uncertainty, ask before you pay."
        ]
      }
    ]
  },
  {
    slug: "paypal-invoice-software-license-purchases",
    title: "PayPal Invoice for Software License Purchases: How It Works",
    description: "Understand how a PayPal invoice request works for software license inquiries, what information to provide, and when to confirm details before payment.",
    category: "Payment methods",
    date: "2026-06-24",
    heroImage: "assets/hero-license.png",
    related: ["adobe-1-year", "autocad", "revit", "fusion-360"],
    cta: "Use the PayPal Invoice button on DIGILICEN product pages to request an invoice with the selected product, term, and price.",
    sections: [
      {
        heading: "PayPal invoice requests are useful when you need confirmation first",
        paragraphs: [
          "For software licenses, many customers want to confirm the product, term, compatibility, and account requirements before payment. A PayPal invoice request lets you start the conversation with the selected product and price already included.",
          "DIGILICEN product pages include PayPal Invoice buttons that create an email with product name, version, term, and listed price. This helps the team confirm the order details before sending payment instructions."
        ]
      },
      {
        heading: "What to include in the request",
        paragraphs: [
          "Include your product name, required term, account email if needed, operating system, company or personal use case, and preferred delivery contact. If you are comparing multiple products, mention each option clearly.",
          "For business buyers, it is also useful to note whether you need one license or multiple licenses. This helps the seller respond with the most relevant instructions."
        ]
      },
      {
        heading: "Keep records after payment",
        paragraphs: [
          "After payment, keep the PayPal invoice email, product name, account email, and support conversation together. These details help resolve delivery questions quickly.",
          "If you prefer Alibaba online payment, DIGILICEN also links product pages to Alibaba listings where available."
        ]
      }
    ]
  },
  {
    slug: "alibaba-payment-software-license-orders",
    title: "Why Use Alibaba Payment for Software License Orders?",
    description: "Learn why buyers may choose Alibaba online payment for software license orders and what details to confirm before purchase.",
    category: "Payment methods",
    date: "2026-06-24",
    heroImage: "assets/genuine-software.png",
    related: ["autocad", "adobe-6-month", "civil-3d", "revit-lt"],
    cta: "Open the Alibaba link from a DIGILICEN product page after confirming product availability and account requirements.",
    sections: [
      {
        heading: "Alibaba creates a clear online order trail",
        paragraphs: [
          "Many international buyers prefer Alibaba because it provides an online order environment and a transaction record. For software license inquiries, that record can make it easier to match payment with support communication.",
          "Before continuing to Alibaba, confirm the exact software product, term, price, and delivery requirements. This is especially important when several products have similar names."
        ]
      },
      {
        heading: "Always confirm software details before payment",
        paragraphs: [
          "A software license inquiry should not be treated like a simple physical product checkout. Compatibility, account email, version, and delivery steps may matter.",
          "DIGILICEN encourages customers to contact the team before purchase if they are unsure about the product, term, operating system, or activation process."
        ]
      },
      {
        heading: "Send the order number after payment",
        paragraphs: [
          "After payment on Alibaba, send your order number and product details by WhatsApp or email. Include your account email if the product requires it.",
          "This makes it easier for the support team to connect the order to the correct digital delivery process."
        ]
      }
    ]
  },
  {
    slug: "autodesk-aec-collection-vs-individual-licenses",
    title: "Autodesk AEC Collection vs Individual Autodesk Licenses",
    description: "Compare Autodesk AEC Collection inquiries with individual Autodesk software license options for architecture, engineering, and construction workflows.",
    category: "Autodesk licenses",
    date: "2026-06-24",
    heroImage: "assets/aec-collection.png",
    related: ["aec-collection", "revit", "civil-3d", "navisworks"],
    cta: "Tell DIGILICEN your AEC workflow so the team can help compare collection and individual license options.",
    sections: [
      {
        heading: "AEC Collection is often requested by multi-discipline teams",
        paragraphs: [
          "Architecture, engineering, and construction teams may need more than one Autodesk product. AEC Collection inquiries are common when a team needs BIM, design, coordination, documentation, and infrastructure tools.",
          "If your team works across Revit, Civil 3D, Navisworks, AutoCAD, or related AEC workflows, asking about a collection can be more practical than checking each product separately."
        ]
      },
      {
        heading: "Individual licenses can fit focused workflows",
        paragraphs: [
          "Not every buyer needs a collection. A single-product license inquiry may be enough for focused drafting, modeling, plant design, electrical design, or visualization work.",
          "For example, a team that only needs AutoCAD, Revit, Civil 3D, or Navisworks can ask about that specific product first. The right choice depends on the actual tools used in daily work."
        ]
      },
      {
        heading: "Share your project workflow before choosing",
        paragraphs: [
          "Before ordering, describe your project type, required software names, number of users, term length, and account setup. This helps support confirm the most relevant license inquiry path.",
          "DIGILICEN can help buyers compare listed Autodesk options before payment."
        ]
      }
    ]
  },
  {
    slug: "what-to-check-before-buying-autocad-license",
    title: "What to Check Before Buying an AutoCAD License",
    description: "A buyer checklist for AutoCAD license inquiries, including product type, term, compatibility, payment method, delivery, and activation support.",
    category: "AutoCAD licenses",
    date: "2026-06-24",
    heroImage: "assets/autocad-commercial.png",
    related: ["autocad", "autocad-lt", "autocad-architecture", "autocad-mechanical"],
    cta: "Use this checklist before sending an AutoCAD license inquiry to DIGILICEN.",
    sections: [
      {
        heading: "Confirm the exact AutoCAD product",
        paragraphs: [
          "AutoCAD has several related product names, and they are not always interchangeable. Before buying, confirm whether you need AutoCAD, AutoCAD LT, AutoCAD Architecture, AutoCAD Mechanical, AutoCAD MEP, AutoCAD Electrical, or AutoCAD Plant 3D.",
          "If you are unsure, describe the work you need to do. Drafting, architecture, mechanical design, electrical design, MEP, and plant workflows may point to different products."
        ]
      },
      {
        heading: "Check term, price, and account details",
        paragraphs: [
          "Write down the license term, listed price, account email requirements, operating system, and whether the license is for personal or business use. These details help support confirm the order faster.",
          "If you need multiple seats or a company account setup, mention that early in the inquiry."
        ]
      },
      {
        heading: "Decide how you want to pay",
        paragraphs: [
          "DIGILICEN supports Alibaba online payment and PayPal invoice requests. Choose the route that fits your purchasing process, but confirm availability and details before payment.",
          "After payment, send the order number, product name, account email if required, and preferred contact method for activation guidance."
        ]
      }
    ]
  },
  {
    slug: "revit-commercial-license-buying-guide",
    title: "Revit Commercial License Buying Guide for BIM Teams",
    description: "A practical Revit commercial license buying guide for BIM, architecture, engineering, account setup, payment, and digital delivery inquiries.",
    category: "Revit licenses",
    date: "2026-06-26",
    heroImage: "assets/aec-collection.png",
    related: ["revit", "revit-lt", "aec-collection", "bim-collection"],
    cta: "Send DIGILICEN your BIM workflow, Revit term, account email requirements, and preferred payment method before ordering.",
    sections: [
      {
        heading: "Confirm whether you need Revit, Revit LT, or a collection",
        paragraphs: [
          "Revit license inquiries often come from architecture, engineering, and BIM teams, but not every buyer needs the same product. Some users need full Revit, some only need Revit LT, and multi-discipline teams may ask about AEC Collection or BIM Collection options.",
          "Before payment, write down the exact product name, term length, user environment, and whether the license is for individual work or a managed company workflow. These details help support confirm the closest license option."
        ]
      },
      {
        heading: "BIM workflows should be checked before payment",
        paragraphs: [
          "BIM teams may depend on model collaboration, project templates, plug-ins, file compatibility, and company account policies. A quick compatibility check before payment is safer than discovering a mismatch after ordering.",
          "If your work includes Revit, Civil 3D, Navisworks, or AutoCAD together, explain that in the inquiry. It may change whether a single product or a collection is the better route."
        ]
      },
      {
        heading: "Keep delivery and support details organized",
        paragraphs: [
          "After payment, send the order number, product name, account email if required, and the best support contact. DIGILICEN supports Alibaba online payment and PayPal invoice requests for software license inquiries.",
          "For Revit license inquiries, clear account and project details can reduce back-and-forth and help activation support move faster."
        ]
      }
    ]
  },
  {
    slug: "fusion-360-vs-inventor-license-inquiry",
    title: "Fusion 360 vs Inventor License Inquiry: Which Product Fits Your Workflow?",
    description: "Compare Fusion 360 and Inventor license inquiries for product design, engineering, manufacturing, collaboration, and professional CAD workflows.",
    category: "Autodesk licenses",
    date: "2026-06-26",
    heroImage: "assets/autodesk-generic.png",
    related: ["fusion-360", "inventor", "autocad", "bim-collection"],
    cta: "Tell DIGILICEN whether your work is product design, engineering, manufacturing, or CAD documentation before choosing Fusion 360 or Inventor.",
    sections: [
      {
        heading: "Fusion 360 is often requested for flexible product design workflows",
        paragraphs: [
          "Fusion 360 license inquiries usually come from users who need product design, modeling, engineering, and flexible collaboration workflows. It can be a good inquiry option for smaller teams, designers, and engineering users who want a connected design environment.",
          "When asking about Fusion 360, include the license term, account email requirements, and whether you use it for commercial product work, prototyping, or design collaboration."
        ]
      },
      {
        heading: "Inventor is commonly requested for professional mechanical engineering",
        paragraphs: [
          "Inventor license inquiries are often tied to professional mechanical design and engineering workflows. Buyers who need detailed product design, assemblies, and manufacturing-focused CAD work may ask about Inventor instead of Fusion 360.",
          "If your workflow includes large assemblies, mechanical documentation, or engineering team standards, mention those details before payment."
        ]
      },
      {
        heading: "Use your daily workflow to choose the inquiry path",
        paragraphs: [
          "The right product depends on what your team actually does every day. Share your project type, file compatibility needs, account setup, and term length so the seller can confirm the correct product listing.",
          "DIGILICEN can help compare listed Autodesk options before you continue with Alibaba payment or request a PayPal invoice."
        ]
      }
    ]
  },
  {
    slug: "business-software-license-procurement-checklist",
    title: "Business Software License Procurement Checklist",
    description: "A checklist for business buyers preparing software license inquiries, including product name, term, account email, payment route, and delivery support.",
    category: "Buying checklist",
    date: "2026-06-26",
    heroImage: "assets/genuine-software.png",
    related: ["autocad", "adobe-1-year", "revit", "maya"],
    cta: "Use this checklist before sending a software license inquiry to DIGILICEN.",
    sections: [
      {
        heading: "Prepare the product and term first",
        paragraphs: [
          "Business buyers should start with the exact product name, required license term, and expected use case. Similar software names can lead to different license inquiries, especially across AutoCAD, Revit, Autodesk collections, and Adobe Creative Cloud terms.",
          "If multiple users or departments are involved, list the products separately and include the number of users or seats needed."
        ]
      },
      {
        heading: "Confirm account email and compatibility requirements",
        paragraphs: [
          "Some software license orders may require an account email, platform details, or other activation information. Preparing this before payment can prevent delays during delivery.",
          "For engineering and creative teams, include operating system, required apps, version expectations, and whether the license is for personal, professional, or company use."
        ]
      },
      {
        heading: "Choose a payment and record-keeping method",
        paragraphs: [
          "DIGILICEN supports Alibaba online payment and PayPal invoice requests. Whichever route you choose, keep the payment record, order number, product name, and support conversation together.",
          "After payment, send the order number and account details through your preferred contact method so the support team can match your order quickly."
        ]
      }
    ]
  },
  {
    slug: "software-license-delivery-questions-to-ask",
    title: "Software License Delivery Questions to Ask Before Payment",
    description: "Important questions to ask before software license payment, including delivery time, account requirements, activation support, and payment confirmation.",
    category: "Software license delivery",
    date: "2026-06-26",
    heroImage: "assets/hero-license.png",
    related: ["adobe-3-month", "autocad-lt", "civil-3d", "map-3d"],
    cta: "Ask DIGILICEN these delivery questions before payment if you are unsure about the correct software license.",
    sections: [
      {
        heading: "Ask what information is needed for delivery",
        paragraphs: [
          "Before payment, ask whether the license requires an account email, order number, operating system, language preference, or other activation detail. This is especially useful for business buyers who need to prepare internal account information.",
          "Clear delivery information helps prevent delays after payment confirmation."
        ]
      },
      {
        heading: "Ask how support will communicate after payment",
        paragraphs: [
          "Software license delivery is usually handled digitally, so support communication matters. Confirm whether WhatsApp or email is the best channel and keep your order details in one place.",
          "If you are using Alibaba online payment or a PayPal invoice, send the payment reference and product details after the order is complete."
        ]
      },
      {
        heading: "Ask whether your workflow matches the selected product",
        paragraphs: [
          "If you are unsure between similar products, ask before paying. AutoCAD, AutoCAD LT, AutoCAD Mechanical, Revit, Civil 3D, Inventor, and Adobe Creative Cloud options can serve different work needs.",
          "A short pre-payment question can save time and help you choose the correct product page."
        ]
      }
    ]
  },
  {
    slug: "jetbrains-ai-assistant-all-products-pack-activation-guide",
    title: "JetBrains AI Assistant and All Products Pack Activation Guide",
    description: "A buyer guide for JetBrains AI Assistant and JetBrains All Products Pack activation inquiries, including term, price, devices, account details, and delivery support.",
    category: "Developer tools",
    date: "2026-06-26",
    heroImage: "assets/jetbrains-ai-assistant-all-products-6-month-usd34.png",
    related: ["jetbrains-ai-assistant-all-products-6-month"],
    cta: "Ask DIGILICEN to confirm JetBrains AI Assistant and All Products Pack activation details before ordering.",
    sections: [
      {
        heading: "Confirm the JetBrains tools included in the activation",
        paragraphs: [
          "JetBrains All Products Pack inquiries are usually for developers who need access to multiple professional tools across coding, IDE, database, web, and team workflows. Before payment, confirm whether your request includes JetBrains AI Assistant and the All Products Pack activation option.",
          "The listed DIGILICEN option is a 6 month inquiry at US$34.00 and is positioned for multi-device and cross-platform developer use. If you need a different term or account setup, ask before ordering."
        ]
      },
      {
        heading: "Prepare account and device information",
        paragraphs: [
          "Developer software activation may depend on account email, device environment, and platform needs. Before payment, prepare the account email if required and mention whether you use Windows, macOS, Linux, or multiple devices.",
          "If you are buying for a development team, include the number of users and whether each user needs separate account access."
        ]
      },
      {
        heading: "Choose Alibaba payment or PayPal invoice",
        paragraphs: [
          "DIGILICEN supports Alibaba online payment and PayPal invoice requests. For this JetBrains inquiry, you can use the product page buttons to start an Alibaba order, request a PayPal invoice, or contact support by WhatsApp or email.",
          "After payment, send the product name, term, order number, account email if required, and preferred support channel so digital delivery can be handled efficiently."
        ]
      }
    ]
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function productLabel(product) {
  return `${product.name} - ${product.term}`;
}

function imageFor(product) {
  return PRODUCT_IMAGES[product.slug] || CATEGORY_IMAGES[product.category] || "assets/genuine-software.png";
}

function productUrl(product) {
  return `${SITE_URL}/products/${product.slug}`;
}

function categoryUrl(category) {
  return `${SITE_URL}/categories/${category.slug}`;
}

function blogUrl(post) {
  return `${SITE_URL}/blog/${post.slug}`;
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

function whatsappFor(product) {
  return `${WHATSAPP}?text=${encodeURIComponent(`Hello DIGILICEN, I want to inquire about ${productLabel(product)}.`)}`;
}

function priceValue(product) {
  return product.price.replace("US$", "");
}

function productTitle(product) {
  return `${productLabel(product)} | ${product.version} | DIGILICEN`;
}

function productDescription(product) {
  return `${productLabel(product)} ${product.version} inquiry from DIGILICEN. Price ${product.price}. Alibaba online payment, PayPal invoice, WhatsApp support, and digital delivery.`;
}

function jsonLd(data) {
  return JSON.stringify(data, null, 2).replaceAll("</", "<\\/");
}

function relatedProducts(product) {
  return PRODUCTS
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 3);
}

function productPage(product) {
  const title = productTitle(product);
  const description = productDescription(product);
  const image = imageFor(product);
  const canonical = productUrl(product);
  const related = relatedProducts(product);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productLabel(product),
    image: `${SITE_URL}/${image}`,
    description,
    brand: {
      "@type": "Brand",
      name: product.category
    },
    category: "Software license",
    sku: product.slug,
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: "USD",
      price: priceValue(product),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL
      }
    }
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/#products`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productLabel(product),
        item: canonical
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="product">
    <meta property="og:site_name" content="DIGILICEN">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE_URL}/${image}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${SITE_URL}/${image}">
    <link rel="stylesheet" href="../styles.css?v=6">
    <script type="application/ld+json">${jsonLd(schema)}</script>
    <script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>
  </head>
  <body>
    <div class="topbar">Genuine Licenses. Lower Prices. Instant Delivery.</div>

    <header class="site-header">
      <a class="brand" href="../" aria-label="DIGILICEN home">
        <span class="brand-mark">D</span>
        <span>DIGILICEN</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Open menu">Menu</button>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="../#products">Products</a>
        <a href="../#why">Why Choose Us</a>
        <a href="../#faq">FAQ</a>
        <a href="../#contact">Contact</a>
      </nav>
      <a class="header-cta" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
    </header>

    <main>
      <section class="product-detail">
        <div class="product-detail-card">
          <div class="product-detail-visual">
            <img src="../${image}" alt="${escapeHtml(productLabel(product))}" decoding="async" fetchpriority="high">
          </div>
          <div class="product-info-panel">
            <p class="eyebrow">${escapeHtml(product.category)} license inquiry</p>
            <h1>${escapeHtml(product.name)}</h1>
            <p class="product-summary">${escapeHtml(product.summary)}</p>
            <div class="product-meta">
              <span><strong>Version</strong> ${escapeHtml(product.version)}</span>
              <span><strong>Term</strong> ${escapeHtml(product.term)}</span>
              <span><strong>Price</strong> ${escapeHtml(product.price)}</span>
              <span><strong>License type</strong> Genuine commercial software license</span>
              <span><strong>Delivery</strong> Digital delivery after payment confirmation</span>
              <span><strong>Payment</strong> Alibaba secure online payment or PayPal invoice</span>
              <span><strong>Support</strong> WhatsApp and email activation guidance</span>
            </div>
            <div class="product-actions">
              <a class="btn btn-primary" href="${product.alibaba}" target="_blank" rel="noopener noreferrer nofollow">Pay Securely on Alibaba</a>
              <a class="btn btn-secondary" href="${paypalFor(product)}">Request PayPal Invoice</a>
              <a class="btn btn-ghost" href="${whatsappFor(product)}" target="_blank" rel="noopener">WhatsApp Inquiry</a>
              <a class="btn btn-secondary" href="mailto:${EMAIL}?subject=${encodeURIComponent(`Inquiry: ${productLabel(product)}`)}">Email Inquiry</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-muted">
        <div class="section-head">
          <p class="eyebrow">Software license details</p>
          <h2>${escapeHtml(productLabel(product))}</h2>
          <p>Contact DIGILICEN before purchase to confirm compatibility, account email requirements, delivery timing, and activation details.</p>
        </div>
        <div class="value-grid compact">
          <article>
            <span class="value-icon">01</span>
            <h3>Confirm version</h3>
            <p>Tell us the exact product, version, operating system, and account requirement you need.</p>
          </article>
          <article>
            <span class="value-icon">02</span>
            <h3>Secure payment</h3>
            <p>Pay through Alibaba online payment or request a PayPal invoice after availability is confirmed.</p>
          </article>
          <article>
            <span class="value-icon">03</span>
            <h3>Digital delivery</h3>
            <p>After payment confirmation, our team provides digital delivery and activation guidance.</p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <p class="eyebrow">Related products</p>
          <h2>More ${escapeHtml(product.category)} license inquiries</h2>
        </div>
        <div class="related-links">
          ${related.map((item) => `<a href="${item.slug}">${escapeHtml(productLabel(item))}</a>`).join("\n          ")}
          <a href="../#products">View all products</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div>
        <strong>DIGILICEN</strong>
        <p>Genuine software license solutions for business, design, engineering, creative, office, and professional users.</p>
      </div>
      <div>
        <strong>Products</strong>
        <a href="../#products">Autodesk</a>
        <a href="../#products">Adobe</a>
        <a href="../#products">Engineering tools</a>
      </div>
      <div>
        <strong>Contact</strong>
        <a href="mailto:${EMAIL}">${EMAIL}</a>
        <a href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
        <span>Secure Payment: Alibaba Online Payment / PayPal Invoice</span>
      </div>
      <div class="copyright">2026 Copyright (c) Digilicen.com</div>
    </footer>

    <script src="../app.js?v=6"></script>
  </body>
</html>
`;
}

function productCards(products) {
  return products.map((product) => {
    const image = imageFor(product);
    return `<article class="product-card">
      <a class="product-visual" href="../products/${product.slug}" aria-label="View ${escapeHtml(productLabel(product))}">
        <img src="../${image}" alt="${escapeHtml(productLabel(product))}" loading="lazy" decoding="async">
      </a>
      <span class="category">${escapeHtml(product.category)}</span>
      <h3>${escapeHtml(product.name)}</h3>
      <div class="product-facts">
        <span><strong>Version</strong>${escapeHtml(product.version)}</span>
        <span><strong>Term</strong>${escapeHtml(product.term)}</span>
        <span><strong>Price</strong>${escapeHtml(product.price)}</span>
      </div>
      <p>${escapeHtml(product.summary)}</p>
      <div class="card-actions">
        <a href="../products/${product.slug}">View Details</a>
        <a href="${product.alibaba}" target="_blank" rel="noopener noreferrer nofollow">Alibaba</a>
        <a href="${paypalFor(product)}">PayPal Invoice</a>
      </div>
    </article>`;
  }).join("\n          ");
}

function categoryPage(category) {
  const products = PRODUCTS.filter(category.match);
  const canonical = categoryUrl(category);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: productUrl(product),
      name: productLabel(product)
    }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: canonical
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(category.title)}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <meta name="description" content="${escapeHtml(category.description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="DIGILICEN">
    <meta property="og:title" content="${escapeHtml(category.title)}">
    <meta property="og:description" content="${escapeHtml(category.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE_URL}/${category.image}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(category.title)}">
    <meta name="twitter:description" content="${escapeHtml(category.description)}">
    <meta name="twitter:image" content="${SITE_URL}/${category.image}">
    <link rel="stylesheet" href="../styles.css?v=6">
    <script type="application/ld+json">${jsonLd(itemListSchema)}</script>
    <script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>
  </head>
  <body>
    <div class="topbar">Genuine Licenses. Lower Prices. Instant Delivery.</div>

    <header class="site-header">
      <a class="brand" href="../" aria-label="DIGILICEN home">
        <span class="brand-mark">D</span>
        <span>DIGILICEN</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Open menu">Menu</button>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="../#products">Products</a>
        <a href="../#why">Why Choose Us</a>
        <a href="../#faq">FAQ</a>
        <a href="../#contact">Contact</a>
      </nav>
      <a class="header-cta" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
    </header>

    <main>
      <section class="product-detail">
        <div class="product-detail-card">
          <div class="product-detail-visual">
            <img src="../${category.image}" alt="${escapeHtml(category.name)}" decoding="async" fetchpriority="high">
          </div>
          <div class="product-info-panel">
            <p class="eyebrow">DIGILICEN license category</p>
            <h1>${escapeHtml(category.heading)}</h1>
            <p class="product-summary">${escapeHtml(category.intro)}</p>
            <div class="product-meta">
              <span><strong>Products</strong> ${products.length} license options</span>
              <span><strong>Payment</strong> Alibaba secure online payment or PayPal invoice</span>
              <span><strong>Delivery</strong> Digital delivery after payment confirmation</span>
              <span><strong>Support</strong> WhatsApp and email activation guidance</span>
            </div>
            <div class="product-actions">
              <a class="btn btn-primary" href="#category-products">View Products</a>
              <a class="btn btn-ghost" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp Inquiry</a>
              <a class="btn btn-secondary" href="mailto:${EMAIL}?subject=${encodeURIComponent(`${category.name} inquiry`)}">Email Inquiry</a>
            </div>
          </div>
        </div>
      </section>

      <section id="category-products" class="section section-muted">
        <div class="section-head">
          <p class="eyebrow">Available licenses</p>
          <h2>${escapeHtml(category.name)}</h2>
          <p>${escapeHtml(category.description)}</p>
        </div>
        <div class="product-grid">
          ${productCards(products)}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <p class="eyebrow">Explore more</p>
          <h2>Software license categories</h2>
        </div>
        <div class="related-links">
          ${CATEGORY_PAGES.filter((item) => item.slug !== category.slug).map((item) => `<a href="${item.slug}">${escapeHtml(item.name)}</a>`).join("\n          ")}
          <a href="../#products">View all products</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div>
        <strong>DIGILICEN</strong>
        <p>Genuine software license solutions for business, design, engineering, creative, office, and professional users.</p>
      </div>
      <div>
        <strong>Categories</strong>
        ${CATEGORY_PAGES.map((item) => `<a href="${item.slug}">${escapeHtml(item.name)}</a>`).join("\n        ")}
      </div>
      <div>
        <strong>Contact</strong>
        <a href="mailto:${EMAIL}">${EMAIL}</a>
        <a href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
        <span>Secure Payment: Alibaba Online Payment / PayPal Invoice</span>
      </div>
      <div class="copyright">2026 Copyright (c) Digilicen.com</div>
    </footer>

    <script src="../app.js?v=6"></script>
  </body>
</html>
`;
}

function blogIndexPage() {
  const canonical = `${SITE_URL}/blog/`;
  const description = "DIGILICEN software license blog with buying guides for Autodesk, AutoCAD, Adobe Creative Cloud, digital delivery, Alibaba payment, and PayPal invoice requests.";
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "DIGILICEN Software License Blog",
    url: canonical,
    description,
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: blogUrl(post),
      datePublished: post.date
    }))
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Software License Blog | DIGILICEN</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="DIGILICEN">
    <meta property="og:title" content="Software License Blog | DIGILICEN">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE_URL}/assets/hero-license.png">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" href="../styles.css?v=6">
    <script type="application/ld+json">${jsonLd(blogSchema)}</script>
  </head>
  <body>
    <div class="topbar">Genuine Licenses. Lower Prices. Instant Delivery.</div>
    <header class="site-header">
      <a class="brand" href="../" aria-label="DIGILICEN home">
        <span class="brand-mark">D</span>
        <span>DIGILICEN</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Open menu">Menu</button>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="../#products">Products</a>
        <a href="../categories/autodesk-software-licenses">Autodesk</a>
        <a href="../categories/adobe-creative-cloud-subscription">Adobe</a>
        <a href="./">Blog</a>
        <a href="../#contact">Contact</a>
      </nav>
      <a class="header-cta" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
    </header>
    <main>
      <section class="section section-muted">
        <div class="section-head">
          <p class="eyebrow">DIGILICEN blog</p>
          <h1>Software license buying guides</h1>
          <p>${escapeHtml(description)}</p>
        </div>
        <div class="blog-grid">
          ${BLOG_POSTS.map((post) => `<article class="blog-card">
            <a href="${post.slug}">
              <span>${escapeHtml(post.category)}</span>
              <h2>${escapeHtml(post.title)}</h2>
              <p>${escapeHtml(post.description)}</p>
            </a>
          </article>`).join("\n          ")}
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <div>
        <strong>DIGILICEN</strong>
        <p>Genuine software license solutions for business, design, engineering, creative, office, and professional users.</p>
      </div>
      <div>
        <strong>Categories</strong>
        ${CATEGORY_PAGES.map((item) => `<a href="../categories/${item.slug}">${escapeHtml(item.name)}</a>`).join("\n        ")}
      </div>
      <div>
        <strong>Contact</strong>
        <a href="mailto:${EMAIL}">${EMAIL}</a>
        <a href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
        <span>Secure Payment: Alibaba Online Payment / PayPal Invoice</span>
      </div>
      <div class="copyright">2026 Copyright (c) Digilicen.com</div>
    </footer>
    <script src="../app.js?v=6"></script>
  </body>
</html>
`;
}

function blogPage(post) {
  const canonical = blogUrl(post);
  const relatedProducts = post.related.map((slug) => PRODUCTS.find((product) => product.slug === slug)).filter(Boolean);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}/${post.heroImage}`,
    datePublished: post.date,
    dateModified: LASTMOD,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    },
    mainEntityOfPage: canonical
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog/`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(post.title)} | DIGILICEN</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <meta name="description" content="${escapeHtml(post.description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="DIGILICEN">
    <meta property="og:title" content="${escapeHtml(post.title)}">
    <meta property="og:description" content="${escapeHtml(post.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE_URL}/${post.heroImage}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(post.title)}">
    <meta name="twitter:description" content="${escapeHtml(post.description)}">
    <meta name="twitter:image" content="${SITE_URL}/${post.heroImage}">
    <link rel="stylesheet" href="../styles.css?v=6">
    <script type="application/ld+json">${jsonLd(articleSchema)}</script>
    <script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>
  </head>
  <body>
    <div class="topbar">Genuine Licenses. Lower Prices. Instant Delivery.</div>
    <header class="site-header">
      <a class="brand" href="../" aria-label="DIGILICEN home">
        <span class="brand-mark">D</span>
        <span>DIGILICEN</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Open menu">Menu</button>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="../#products">Products</a>
        <a href="../categories/autodesk-software-licenses">Autodesk</a>
        <a href="../categories/adobe-creative-cloud-subscription">Adobe</a>
        <a href="./">Blog</a>
        <a href="../#contact">Contact</a>
      </nav>
      <a class="header-cta" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
    </header>
    <main>
      <article class="article-page">
        <header class="article-hero">
          <p class="eyebrow">${escapeHtml(post.category)}</p>
          <h1>${escapeHtml(post.title)}</h1>
          <p>${escapeHtml(post.description)}</p>
          <img src="../${post.heroImage}" alt="${escapeHtml(post.title)}" decoding="async" fetchpriority="high">
        </header>
        <div class="article-body">
          ${post.sections.map((section) => `<section>
            <h2>${escapeHtml(section.heading)}</h2>
            ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n            ")}
          </section>`).join("\n          ")}
          <section class="article-cta">
            <h2>Ready to confirm your license?</h2>
            <p>${escapeHtml(post.cta)}</p>
            <div class="product-actions">
              <a class="btn btn-primary" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp Inquiry</a>
              <a class="btn btn-secondary" href="mailto:${EMAIL}?subject=${encodeURIComponent(post.title)}">Email DIGILICEN</a>
            </div>
          </section>
        </div>
      </article>
      <section class="section section-muted">
        <div class="section-head">
          <p class="eyebrow">Related products</p>
          <h2>Product pages mentioned in this guide</h2>
        </div>
        <div class="related-links">
          ${relatedProducts.map((product) => `<a href="../products/${product.slug}">${escapeHtml(productLabel(product))}</a>`).join("\n          ")}
          <a href="../#products">View all products</a>
        </div>
      </section>
      <section class="section">
        <div class="section-head">
          <p class="eyebrow">More guides</p>
          <h2>Continue reading</h2>
        </div>
        <div class="related-links">
          ${BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3).map((item) => `<a href="${item.slug}">${escapeHtml(item.title)}</a>`).join("\n          ")}
          <a href="./">All blog posts</a>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <div>
        <strong>DIGILICEN</strong>
        <p>Genuine software license solutions for business, design, engineering, creative, office, and professional users.</p>
      </div>
      <div>
        <strong>Categories</strong>
        ${CATEGORY_PAGES.map((item) => `<a href="../categories/${item.slug}">${escapeHtml(item.name)}</a>`).join("\n        ")}
      </div>
      <div>
        <strong>Contact</strong>
        <a href="mailto:${EMAIL}">${EMAIL}</a>
        <a href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
        <span>Secure Payment: Alibaba Online Payment / PayPal Invoice</span>
      </div>
      <div class="copyright">2026 Copyright (c) Digilicen.com</div>
    </footer>
    <script src="../app.js?v=6"></script>
  </body>
</html>
`;
}

function sitemapXml() {
  const urls = [
    { loc: `${SITE_URL}/`, priority: "1.0" },
    ...CATEGORY_PAGES.map((category) => ({ loc: categoryUrl(category), priority: "0.9" })),
    { loc: `${SITE_URL}/blog/`, priority: "0.8" },
    ...BLOG_POSTS.map((post) => ({ loc: blogUrl(post), priority: "0.7" })),
    ...PRODUCTS.map((product) => ({ loc: productUrl(product), priority: "0.8" }))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

await mkdir(new URL("../products", import.meta.url), { recursive: true });
await mkdir(new URL("../categories", import.meta.url), { recursive: true });
await mkdir(new URL("../blog", import.meta.url), { recursive: true });

for (const product of PRODUCTS) {
  await writeFile(new URL(`../products/${product.slug}.html`, import.meta.url), productPage(product));
}

for (const category of CATEGORY_PAGES) {
  await writeFile(new URL(`../categories/${category.slug}.html`, import.meta.url), categoryPage(category));
}

await writeFile(new URL("../blog/index.html", import.meta.url), blogIndexPage());
for (const post of BLOG_POSTS) {
  await writeFile(new URL(`../blog/${post.slug}.html`, import.meta.url), blogPage(post));
}

await writeFile(new URL("../sitemap.xml", import.meta.url), sitemapXml());
await writeFile(new URL("../robots.txt", import.meta.url), `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`);

console.log(`Generated ${PRODUCTS.length} product pages, sitemap.xml, and robots.txt.`);
