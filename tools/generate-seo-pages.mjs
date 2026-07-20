import { mkdir, readFile, writeFile } from "node:fs/promises";

const SITE_URL = "https://digilicen.com";
const SITE_NAME = "DIGILICEN";
const EMAIL = "digilicen@outlook.com";
const WHATSAPP = "https://wa.me/8619928777176";
const LASTMOD = "2026-07-20";
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
  },
  {
    slug: "research-reference-software-licenses",
    name: "Research and Reference Software Licenses",
    title: "Research and Reference Software Licenses | EndNote Windows and Mac | DIGILICEN",
    description: "Research and reference management software license inquiries from DIGILICEN, including EndNote 2025, 21, 20, and X9 for Windows and Mac.",
    heading: "Research and reference software license inquiries",
    intro: "Browse research software license options for reference management, bibliography workflows, Windows and Mac users, and remote installation support.",
    image: "assets/endnote-license-key-installer-tutorial.png",
    match: (product) => product.category === "Research Tools" || product.name.includes("EndNote")
  }
];
const INFO_PAGES = [
  {
    slug: "about",
    title: "About DIGILICEN | Genuine Software License Inquiries",
    description: "Learn about DIGILICEN, a software license inquiry site for Autodesk, Adobe, AutoCAD, engineering, creative, and developer tool customers.",
    heading: "About DIGILICEN",
    intro: "DIGILICEN helps business, design, engineering, creative, and developer users send clear software license inquiries before ordering.",
    sections: [
      {
        heading: "What DIGILICEN does",
        paragraphs: [
          "DIGILICEN is built for customers who want to confirm software license options before payment. The site lists software license inquiry pages, prices, license terms, delivery notes, and contact routes for products such as Autodesk, AutoCAD, Revit, Adobe Creative Cloud, and developer tools.",
          "Customers can review product details, ask compatibility questions, continue to Alibaba where available, request a PayPal invoice, or contact support by WhatsApp and email."
        ]
      },
      {
        heading: "Genuine license positioning",
        paragraphs: [
          "DIGILICEN focuses on genuine software license solutions and pre-purchase confirmation. The site does not promote cracked software, pirated copies, malware, unsafe activation tools, or bypass methods.",
          "Before payment, customers should confirm product name, term, account email requirements, operating system, and expected use case so the order can be matched with the right support process."
        ]
      },
      {
        heading: "How customers should use the site",
        paragraphs: [
          "Use the product pages to compare listed terms and prices, then contact DIGILICEN if you are unsure about compatibility, delivery timing, account requirements, or payment route.",
          "For business buyers, it is useful to prepare the number of users, required software names, account email, and internal purchasing requirements before requesting an invoice."
        ]
      }
    ],
    faqs: [
      {
        question: "Is DIGILICEN a software license inquiry site?",
        answer: "Yes. DIGILICEN is a software license inquiry site where customers can review listed license options and contact support before ordering."
      },
      {
        question: "Does DIGILICEN provide cracked software?",
        answer: "No. DIGILICEN does not provide cracked software, pirated copies, unsafe activation tools, or bypass methods."
      }
    ]
  },
  {
    slug: "payment-and-delivery",
    title: "Payment and Digital Delivery | DIGILICEN",
    description: "DIGILICEN payment and digital delivery guide covering Alibaba online payment, PayPal invoice requests, order details, and activation support.",
    heading: "Payment and digital delivery",
    intro: "Confirm your software license details before payment, then keep order information organized for faster digital delivery and activation support.",
    sections: [
      {
        heading: "Alibaba online payment",
        paragraphs: [
          "Many DIGILICEN product pages include Alibaba links. Alibaba online payment can help create a clear order record, which is useful for matching payment confirmation with delivery support.",
          "Before continuing to Alibaba, confirm the exact software product, term, price, account email requirements, and compatibility details."
        ]
      },
      {
        heading: "PayPal invoice requests",
        paragraphs: [
          "Customers who prefer PayPal can use the PayPal Invoice button on product pages. The email request includes the selected product, term, version, and listed price so DIGILICEN can confirm availability before sending payment instructions.",
          "If you need a company invoice or special purchase note, include that information in the request."
        ]
      },
      {
        heading: "Digital delivery process",
        paragraphs: [
          "After payment, send the order number or invoice email, product name, selected term, account email if required, and preferred support channel.",
          "Delivery timing may vary by product, order status, working hours, account requirements, and compatibility checks. Customers should ask before payment if timing is important."
        ]
      }
    ],
    faqs: [
      {
        question: "Which payment methods does DIGILICEN support?",
        answer: "DIGILICEN supports Alibaba online payment where available and PayPal invoice requests after product details are confirmed."
      },
      {
        question: "What information should I send after payment?",
        answer: "Send your order number or invoice email, product name, selected term, account email if required, and preferred support channel."
      }
    ]
  },
  {
    slug: "order-support-policy",
    title: "Order Support Policy | DIGILICEN",
    description: "DIGILICEN order support policy for software license inquiries, compatibility confirmation, payment records, digital delivery, and support communication.",
    heading: "Order support policy",
    intro: "This page explains how DIGILICEN handles order support for software license inquiries and what customers should confirm before payment.",
    sections: [
      {
        heading: "Confirm before payment",
        paragraphs: [
          "Software license orders can depend on product name, term, account email, operating system, region, team size, and compatibility requirements. Customers should confirm these details before payment.",
          "If you are unsure which product fits your workflow, contact DIGILICEN by WhatsApp or email before placing an order."
        ]
      },
      {
        heading: "Support after payment",
        paragraphs: [
          "After payment confirmation, DIGILICEN uses the product name, order number, account details, and communication channel to coordinate digital delivery and activation guidance.",
          "Support questions should include screenshots or exact error text when possible. This helps the team understand the issue faster."
        ]
      },
      {
        heading: "Refund and issue handling",
        paragraphs: [
          "Because software licenses are digital products, customers should ask all compatibility and account questions before payment. If an issue appears after payment, contact DIGILICEN with order details so the case can be reviewed.",
          "Any refund, replacement, or support decision depends on the payment channel, order state, delivery state, product terms, and information supplied by the customer."
        ]
      }
    ],
    faqs: [
      {
        question: "Should I confirm compatibility before payment?",
        answer: "Yes. Customers should confirm software name, term, account email requirements, operating system, and compatibility needs before payment."
      },
      {
        question: "How should I report an order issue?",
        answer: "Send the order number, product name, account email if required, payment method, and screenshots or exact error text."
      }
    ]
  },
  {
    slug: "contact",
    title: "Contact DIGILICEN | Software License Inquiry Support",
    description: "Contact DIGILICEN by WhatsApp or email for Autodesk, Adobe, AutoCAD, Revit, developer tools, payment, delivery, and software license inquiry support.",
    heading: "Contact DIGILICEN",
    intro: "Send DIGILICEN your product name, term, operating system, account requirements, and payment preference before ordering.",
    sections: [
      {
        heading: "Contact channels",
        paragraphs: [
          "WhatsApp: +86 199 2877 7176. Email: digilicen@outlook.com.",
          "For faster replies, include product name, required term, operating system, account email requirements, payment method, and whether you are buying for personal or business use."
        ]
      },
      {
        heading: "What to include in your inquiry",
        paragraphs: [
          "A complete inquiry should include the exact product name, version or license type, term length, number of users, account email if required, and any compatibility questions.",
          "If you have already paid, include the Alibaba order number or PayPal invoice email so support can match your request."
        ]
      }
    ],
    faqs: [
      {
        question: "Can I contact DIGILICEN before payment?",
        answer: "Yes. Customers are encouraged to contact DIGILICEN before payment to confirm product availability, compatibility, and delivery details."
      }
    ]
  },
  {
    slug: "faq",
    title: "Software License FAQ | DIGILICEN",
    description: "Frequently asked questions about DIGILICEN software license inquiries, genuine licenses, payment, PayPal invoice, Alibaba payment, and digital delivery.",
    heading: "Software license FAQ",
    intro: "Common questions customers ask before sending a DIGILICEN software license inquiry.",
    sections: [
      {
        heading: "General questions",
        paragraphs: [
          "DIGILICEN helps customers review software license options and confirm product details before payment. The site includes product pages, category pages, blog guides, payment information, and contact options.",
          "Customers should contact DIGILICEN if they are unsure about product fit, compatibility, account requirements, delivery timing, or payment method."
        ]
      }
    ],
    faqs: [
      {
        question: "Are the listed products digital software license inquiries?",
        answer: "Yes. DIGILICEN lists digital software license inquiry options with product terms, prices, payment routes, and support contact methods."
      },
      {
        question: "Can I request a PayPal invoice?",
        answer: "Yes. Product pages include PayPal invoice request links so customers can ask for confirmation before payment."
      },
      {
        question: "Does every product have the same delivery process?",
        answer: "No. Delivery and activation steps can vary by software product, account requirement, compatibility needs, and order status."
      }
    ]
  },
  {
    slug: "software-license-price-list",
    title: "Software License Price List | Autodesk, Adobe, AutoCAD, JetBrains | DIGILICEN",
    description: "Compare DIGILICEN software license prices for Autodesk, Adobe Creative Cloud, AutoCAD, Revit, engineering tools, and JetBrains developer tools.",
    heading: "Software license price list",
    intro: "Use this price guide to compare listed software license inquiry options before contacting DIGILICEN for availability, payment, and digital delivery confirmation.",
    relatedProducts: ["autocad", "adobe-1-year", "adobe-6-month", "revit", "civil-3d", "aec-collection", "bim-collection", "jetbrains-ai-assistant-all-products-6-month", "endnote-2025-21-20-x9-license-key"],
    sections: [
      {
        heading: "Compare listed license prices before inquiry",
        paragraphs: [
          "DIGILICEN product pages show listed USD prices, license terms, payment routes, and support options for software license inquiries. Prices help customers compare options before asking for availability confirmation.",
          "Before payment, always confirm the product name, term, account email requirements, operating system, and delivery timing because software license details can vary by product."
        ]
      },
      {
        heading: "Payment options",
        paragraphs: [
          "Customers can continue to Alibaba online payment where available or request a PayPal invoice from the product page. The PayPal request includes product name, term, version, and listed price.",
          "If you are buying for a company, include invoice notes, number of users, and account requirements before requesting payment instructions."
        ]
      },
      {
        heading: "Best pages to check first",
        paragraphs: [
          "For Autodesk and CAD tools, start with AutoCAD, Revit, Civil 3D, AEC Collection, and BIM Collection pages. For creative users, compare Adobe Creative Cloud 1 year, 6 month, 3 month, and 1 month options.",
          "For developer teams, check JetBrains AI Assistant with All Products Pack and confirm devices, account email, user count, and cross-platform requirements."
        ]
      }
    ],
    faqs: [
      {
        question: "Are DIGILICEN prices listed in USD?",
        answer: "Yes. DIGILICEN product pages list prices in USD for software license inquiries, but customers should confirm availability and details before payment."
      },
      {
        question: "Can I ask for a PayPal invoice before payment?",
        answer: "Yes. Product pages include PayPal invoice request links so DIGILICEN can confirm product details before sending payment instructions."
      }
    ]
  },
  {
    slug: "autodesk-license-price-list",
    title: "Autodesk License Price List | AutoCAD, Revit, Civil 3D, Inventor | DIGILICEN",
    description: "Compare Autodesk license inquiry prices for AutoCAD, Revit, Civil 3D, Inventor, Maya, Fusion 360, Navisworks, and Autodesk collections.",
    heading: "Autodesk license price list",
    intro: "Compare Autodesk software license inquiry options by product, term, workflow, and listed price before contacting DIGILICEN.",
    relatedProducts: ["autocad", "autocad-lt", "revit", "civil-3d", "inventor", "fusion-360", "maya", "navisworks", "aec-collection"],
    sections: [
      {
        heading: "Autodesk products customers compare most",
        paragraphs: [
          "Autodesk buyers often compare AutoCAD, AutoCAD LT, Revit, Civil 3D, Inventor, Fusion 360, Maya, Navisworks, and Autodesk collection options before ordering.",
          "The right Autodesk license inquiry depends on workflow: drafting, BIM, civil engineering, mechanical design, product design, visualization, or project coordination."
        ]
      },
      {
        heading: "What to confirm before payment",
        paragraphs: [
          "Confirm the exact Autodesk product name, term, operating system, account email requirement, and number of users before payment. Similar Autodesk names can represent different workflows.",
          "If you are unsure whether a single product or collection fits better, contact DIGILICEN with your project type and required tools."
        ]
      }
    ],
    faqs: [
      {
        question: "Which Autodesk license should I ask about first?",
        answer: "Start with the software your workflow uses every day, such as AutoCAD for drafting, Revit for BIM, Civil 3D for civil engineering, or Inventor for mechanical design."
      }
    ]
  },
  {
    slug: "adobe-creative-cloud-price-list",
    title: "Adobe Creative Cloud Price List | 1 Year, 6 Month, 3 Month, 1 Month | DIGILICEN",
    description: "Compare Adobe Creative Cloud subscription inquiry prices by term, including 1 year, 6 month, 3 month, and 1 month options.",
    heading: "Adobe Creative Cloud price list",
    intro: "Compare Adobe Creative Cloud subscription terms and listed prices before requesting availability, PayPal invoice, or Alibaba payment support.",
    relatedProducts: ["adobe-1-year", "adobe-6-month", "adobe-3-month", "adobe-1-month"],
    sections: [
      {
        heading: "Choose Adobe Creative Cloud by project length",
        paragraphs: [
          "A 1 year Adobe Creative Cloud subscription inquiry can fit ongoing design, agency, production, and company workflows. Shorter 6 month, 3 month, and 1 month terms can fit temporary projects or flexible creative work.",
          "Before payment, confirm account email requirements, required Adobe apps, term length, and delivery timing."
        ]
      },
      {
        heading: "Payment and support",
        paragraphs: [
          "DIGILICEN supports Alibaba online payment where available and PayPal invoice requests after product details are confirmed.",
          "After payment, send the selected term, order reference, account email if required, and preferred support channel."
        ]
      }
    ],
    faqs: [
      {
        question: "Which Adobe Creative Cloud term is best?",
        answer: "Choose 1 year for ongoing creative work and shorter terms such as 6 months, 3 months, or 1 month for temporary projects or flexible use."
      }
    ]
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
  },
  {
    slug: "best-software-licenses-for-cad-teams",
    title: "Best Software License Options for CAD Teams",
    description: "A practical guide for CAD teams comparing AutoCAD, AutoCAD LT, Revit, Civil 3D, Inventor, Fusion 360, and Autodesk collection inquiries.",
    category: "CAD software licenses",
    date: "2026-07-07",
    heroImage: "assets/autocad-commercial.png",
    related: ["autocad", "autocad-lt", "revit", "civil-3d"],
    cta: "Send DIGILICEN your CAD workflow, team size, and required term before choosing a software license option.",
    sections: [
      {
        heading: "Start with your daily CAD workflow",
        paragraphs: [
          "CAD teams often search for one software name but actually need a product that matches a specific workflow. Drafting, BIM modeling, civil infrastructure, mechanical design, plant design, and construction documentation can point to different products.",
          "Before requesting a license, list the drawings, file types, collaboration needs, and account setup your team uses every day."
        ]
      },
      {
        heading: "Match products to project roles",
        paragraphs: [
          "AutoCAD and AutoCAD LT may fit drafting workflows, while Revit is usually tied to BIM and building design. Civil 3D is used for civil engineering workflows, and Inventor or Fusion 360 may fit product design and manufacturing users.",
          "If one team needs several tools, an Autodesk collection inquiry may be more practical than checking each product separately."
        ]
      },
      {
        heading: "Confirm support and delivery details",
        paragraphs: [
          "Before payment, confirm the term, price, account email requirement, operating system, and number of users. These details help support match the order to the right delivery process.",
          "DIGILICEN can help customers compare listed CAD options before they continue to Alibaba payment or request a PayPal invoice."
        ]
      }
    ]
  },
  {
    slug: "what-information-needed-before-software-license-activation",
    title: "What Information Is Needed Before Software License Activation?",
    description: "Prepare the details needed before software license activation, including product name, term, account email, operating system, payment record, and support channel.",
    category: "Activation checklist",
    date: "2026-07-07",
    heroImage: "assets/genuine-software.png",
    related: ["adobe-1-year", "autocad", "revit", "jetbrains-ai-assistant-all-products-6-month"],
    cta: "Prepare product, account, and payment details before contacting DIGILICEN for activation support.",
    sections: [
      {
        heading: "Prepare product and term details",
        paragraphs: [
          "A clear activation request should start with the exact product name, license term, listed price, and version or license type. Similar names can represent different software tools, especially across AutoCAD, Revit, Adobe Creative Cloud, and developer tools.",
          "If you are unsure, send your intended workflow before payment so support can confirm the closest product page."
        ]
      },
      {
        heading: "Prepare account and environment details",
        paragraphs: [
          "Some software license orders may require an account email, operating system, device environment, team setup, or compatibility check. Preparing these details early can reduce delays after payment.",
          "For company buyers, mention whether the software will be used by one user, multiple users, or a managed business account."
        ]
      },
      {
        heading: "Keep payment records easy to find",
        paragraphs: [
          "After payment, send the Alibaba order number or PayPal invoice email together with the product name and account details. This helps support match payment confirmation to the activation request.",
          "A single organized message is often faster than sending information across several separate conversations."
        ]
      }
    ]
  },
  {
    slug: "paypal-invoice-vs-alibaba-payment-software-license",
    title: "PayPal Invoice vs Alibaba Payment for Software License Orders",
    description: "Compare PayPal invoice requests and Alibaba online payment for software license inquiries, including records, confirmation, and delivery support.",
    category: "Payment methods",
    date: "2026-07-07",
    heroImage: "assets/hero-license.png",
    related: ["adobe-6-month", "autocad", "fusion-360", "revit-lt"],
    cta: "Choose Alibaba or PayPal based on your purchasing process, then confirm product details with DIGILICEN before payment.",
    sections: [
      {
        heading: "Alibaba payment creates an order record",
        paragraphs: [
          "Alibaba online payment is useful when customers want a marketplace order trail. Many DIGILICEN product pages link to Alibaba listings where available.",
          "Before payment, confirm the product name, term, price, account email requirements, and delivery details so the order record matches the intended software license inquiry."
        ]
      },
      {
        heading: "PayPal invoice is useful for confirmation first",
        paragraphs: [
          "A PayPal invoice request is useful when the buyer wants DIGILICEN to confirm availability and details before payment. Product pages generate an email with the product, term, version, and price.",
          "Business buyers can include company requirements, invoice notes, and account details in the PayPal request."
        ]
      },
      {
        heading: "Both methods need clear delivery details",
        paragraphs: [
          "Whether you use Alibaba or PayPal, support still needs product name, order reference, account email if required, and preferred contact method.",
          "Choosing the right payment route is helpful, but clear product information is what keeps software delivery organized."
        ]
      }
    ]
  },
  {
    slug: "how-fast-is-digital-software-license-delivery",
    title: "How Fast Is Digital Software License Delivery?",
    description: "Learn what affects digital software license delivery time, including payment confirmation, account information, product compatibility, and support hours.",
    category: "Software license delivery",
    date: "2026-07-07",
    heroImage: "assets/hero-license.png",
    related: ["autocad", "adobe-1-month", "maya", "aec-collection"],
    cta: "Ask DIGILICEN about delivery timing before payment if your project has a deadline.",
    sections: [
      {
        heading: "Delivery speed depends on order completeness",
        paragraphs: [
          "Digital software license delivery is fastest when the customer sends product name, term, account email if required, operating system, payment reference, and support channel in one message.",
          "Missing information can slow the process because support needs to confirm details before moving forward."
        ]
      },
      {
        heading: "Some products require compatibility checks",
        paragraphs: [
          "Engineering, creative, and developer software can have different account or platform requirements. A compatibility check before payment is useful when the customer is unsure about the product fit.",
          "If timing matters, ask about expected delivery before payment instead of assuming every product follows the same process."
        ]
      },
      {
        heading: "Keep communication in one place",
        paragraphs: [
          "Using one support channel, such as WhatsApp or email, helps keep product details and order records together.",
          "When payment is complete, send the order number or invoice email and the selected product page so DIGILICEN can match the request more quickly."
        ]
      }
    ]
  },
  {
    slug: "developer-tools-license-procurement-guide",
    title: "Developer Tools License Procurement Guide",
    description: "A developer tools license procurement guide covering JetBrains AI Assistant, All Products Pack, account details, devices, and payment confirmation.",
    category: "Developer tools",
    date: "2026-07-07",
    heroImage: "assets/jetbrains-ai-assistant-all-products-6-month-usd34.png",
    related: ["jetbrains-ai-assistant-all-products-6-month"],
    cta: "Ask DIGILICEN to confirm developer tool access, account setup, and term before ordering.",
    sections: [
      {
        heading: "Confirm tool access before payment",
        paragraphs: [
          "Developer tools license inquiries should start with the exact tools needed, term length, account environment, and whether the buyer needs individual or team use.",
          "For JetBrains-related inquiries, confirm whether the request includes AI Assistant, All Products Pack access, devices, and cross-platform use."
        ]
      },
      {
        heading: "Prepare account and platform details",
        paragraphs: [
          "Developer tools may depend on account email, operating system, device count, and team requirements. Preparing this information before payment reduces back-and-forth during delivery.",
          "If you are purchasing for a development team, include the number of users and whether each user needs separate access."
        ]
      },
      {
        heading: "Choose the right payment route",
        paragraphs: [
          "DIGILICEN supports Alibaba online payment and PayPal invoice requests. Confirm the product details first, then choose the payment route that fits your purchasing process.",
          "After payment, send the order number, product name, term, and account email if required so support can continue efficiently."
        ]
      }
    ]
  },
  {
    slug: "autocad-license-price-guide-2026",
    title: "AutoCAD License Price Guide 2026",
    description: "Compare AutoCAD license inquiry prices, AutoCAD LT, AutoCAD Mechanical, AutoCAD Architecture, MEP, Electrical, and Plant 3D options.",
    category: "AutoCAD licenses",
    date: "2026-07-17",
    heroImage: "assets/autocad-commercial.png",
    related: ["autocad", "autocad-lt", "autocad-mechanical", "autocad-architecture"],
    cta: "Send DIGILICEN your AutoCAD workflow, term, and account requirements before requesting payment.",
    sections: [
      {
        heading: "AutoCAD price comparisons start with product type",
        paragraphs: [
          "Customers searching for AutoCAD price often need to compare more than one product. AutoCAD, AutoCAD LT, AutoCAD Mechanical, AutoCAD Architecture, AutoCAD MEP, AutoCAD Electrical, and AutoCAD Plant 3D can fit different workflows.",
          "Before payment, confirm whether your work is general drafting, 2D documentation, mechanical design, architecture, MEP design, electrical design, or plant design."
        ]
      },
      {
        heading: "Use listed prices as an inquiry starting point",
        paragraphs: [
          "DIGILICEN product pages list USD prices and license terms so customers can compare options before contacting support. The listed price should be confirmed with product availability, account requirements, and payment route before ordering.",
          "If you are buying for a team, include number of users, account email requirements, operating system, and company purchasing notes."
        ]
      },
      {
        heading: "Ask before paying if you are unsure",
        paragraphs: [
          "A short WhatsApp or email inquiry can prevent ordering the wrong AutoCAD-related product. Send your project type and the files or workflows you need to support.",
          "DIGILICEN supports Alibaba online payment and PayPal invoice requests after details are confirmed."
        ]
      }
    ]
  },
  {
    slug: "adobe-creative-cloud-paypal-invoice-guide",
    title: "Adobe Creative Cloud PayPal Invoice Guide",
    description: "How to request a PayPal invoice for Adobe Creative Cloud subscription inquiries, including term, account email, and delivery details.",
    category: "Adobe Creative Cloud",
    date: "2026-07-17",
    heroImage: "assets/adobe-creative-large.png",
    related: ["adobe-1-year", "adobe-6-month", "adobe-3-month", "adobe-1-month"],
    cta: "Choose your Adobe Creative Cloud term and request PayPal invoice confirmation from DIGILICEN.",
    sections: [
      {
        heading: "Choose the Adobe term first",
        paragraphs: [
          "Adobe Creative Cloud inquiry pages include 1 year, 6 month, 3 month, and 1 month options. Pick the term that fits the project length before requesting invoice confirmation.",
          "If your team needs specific Adobe apps, mention them in the request so support can confirm the subscription option."
        ]
      },
      {
        heading: "What to include in a PayPal invoice request",
        paragraphs: [
          "Include product name, selected term, account email if required, company or personal use case, and preferred support channel. DIGILICEN product pages generate an email with the selected product and listed price.",
          "PayPal invoice requests are useful when customers want product availability and details confirmed before payment."
        ]
      },
      {
        heading: "Keep account and payment details organized",
        paragraphs: [
          "After payment, keep the invoice email, selected term, account email, and support conversation together. This helps digital delivery and activation guidance move faster.",
          "If you prefer Alibaba online payment, use the Alibaba button on the product page where available."
        ]
      }
    ]
  },
  {
    slug: "autodesk-license-for-small-business",
    title: "Autodesk License Options for Small Business Buyers",
    description: "A practical guide for small businesses comparing Autodesk, AutoCAD, Revit, Fusion 360, Inventor, and AEC software license inquiries.",
    category: "Autodesk licenses",
    date: "2026-07-17",
    heroImage: "assets/autodesk-generic.png",
    related: ["autocad", "revit", "fusion-360", "inventor"],
    cta: "Tell DIGILICEN your business workflow and required Autodesk tools before ordering.",
    sections: [
      {
        heading: "Small businesses should match licenses to real workflow",
        paragraphs: [
          "Small business buyers may need one focused Autodesk product or several tools for design, documentation, engineering, and coordination. Start with the product used daily rather than choosing only by price.",
          "AutoCAD can fit drafting, Revit can fit BIM, Fusion 360 and Inventor can fit product design, and AEC Collection can fit multi-discipline building workflows."
        ]
      },
      {
        heading: "Prepare company purchase details",
        paragraphs: [
          "Before asking for payment, prepare company name if needed, user count, account email, operating system, required term, and any invoice notes.",
          "These details help DIGILICEN confirm the correct software license inquiry path and reduce delays after payment."
        ]
      },
      {
        heading: "Confirm delivery and support channel",
        paragraphs: [
          "For digital software license delivery, keep order records and account details in one place. WhatsApp or email can be used for confirmation and activation support.",
          "If timing is important, ask about delivery before payment."
        ]
      }
    ]
  },
  {
    slug: "software-license-inquiry-email-template",
    title: "Software License Inquiry Email Template",
    description: "Use this software license inquiry email template to send product name, term, account email, operating system, payment method, and delivery questions.",
    category: "Buying checklist",
    date: "2026-07-17",
    heroImage: "assets/genuine-software.png",
    related: ["autocad", "adobe-1-year", "revit", "jetbrains-ai-assistant-all-products-6-month"],
    cta: "Use this template when contacting DIGILICEN by email or WhatsApp.",
    sections: [
      {
        heading: "A clear inquiry gets a faster answer",
        paragraphs: [
          "Software license questions are easier to answer when the buyer includes product name, term, account email requirement, operating system, number of users, payment method, and expected delivery timing.",
          "A complete first message reduces repeated questions and helps support confirm availability faster."
        ]
      },
      {
        heading: "Copy this inquiry format",
        paragraphs: [
          "Hello DIGILICEN, I want to inquire about [product name] for [term]. My operating system is [Windows/macOS/Linux]. I need [one user / multiple users]. My preferred payment method is [Alibaba / PayPal invoice]. Please confirm availability, delivery timing, and account email requirements.",
          "If you already paid, add the Alibaba order number or PayPal invoice email to the same message."
        ]
      },
      {
        heading: "Attach useful context",
        paragraphs: [
          "For compatibility questions, include screenshots, exact software names, workflow details, or error text. This helps support understand the request quickly.",
          "For business purchases, include invoice notes or company requirements before payment."
        ]
      }
    ]
  },
  {
    slug: "endnote-license-key-windows-mac-installation-guide",
    title: "EndNote License Key Windows and Mac Installation Guide",
    description: "A buyer guide for EndNote 2025, 21, 20, and X9 license key inquiries for Windows and Mac, including installer package, tutorial, and remote support.",
    category: "Research software",
    date: "2026-07-20",
    heroImage: "assets/endnote-license-key-installer-tutorial.png",
    related: ["endnote-2025-21-20-x9-license-key"],
    cta: "Contact DIGILICEN to confirm your EndNote version, Windows or Mac platform, language preference, and remote installation support before ordering.",
    sections: [
      {
        heading: "Choose the EndNote version and platform",
        paragraphs: [
          "EndNote license key inquiries should start with the exact version and platform. DIGILICEN lists EndNote 2025, EndNote 21, EndNote 20, and EndNote X9 options for Windows and Mac users.",
          "Before ordering, confirm whether you need the Windows version or Mac version and whether you prefer English or Chinese language support."
        ]
      },
      {
        heading: "Delivery includes key, installer, and tutorial",
        paragraphs: [
          "The listed EndNote inquiry includes a license key, installer package, and tutorial. Customers can ask for remote installation support if they need help with setup.",
          "Keep your operating system details ready so support can send the correct installation guidance."
        ]
      },
      {
        heading: "Contact DIGILICEN before payment",
        paragraphs: [
          "This EndNote product does not use an Alibaba product link on DIGILICEN. Customers should contact the team by WhatsApp or email to confirm version, platform, delivery details, and support needs.",
          "DIGILICEN focuses on genuine software license inquiry support and does not provide cracked software, unsafe activation tools, or bypass methods."
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

function isContactOnly(product) {
  return product.contactOnly || !product.alibaba;
}

function deliveryText(product) {
  return product.delivery || "Digital delivery after payment confirmation";
}

function paymentText(product) {
  return isContactOnly(product) ? "Contact DIGILICEN before ordering" : "Alibaba online payment or PayPal invoice request";
}

function productCardActions(product) {
  if (isContactOnly(product)) {
    return `<a href="../products/${product.slug}">View Details</a>
        <a href="${whatsappFor(product)}" target="_blank" rel="noopener">Contact Us</a>
        <a href="mailto:${EMAIL}?subject=${encodeURIComponent(`Inquiry: ${productLabel(product)}`)}">Email Inquiry</a>`;
  }
  return `<a href="../products/${product.slug}">View Details</a>
        <a href="${product.alibaba}" target="_blank" rel="noopener noreferrer nofollow">Alibaba</a>
        <a href="${paypalFor(product)}">PayPal Invoice</a>`;
}

function productDetailActions(product) {
  if (isContactOnly(product)) {
    return `<a class="btn btn-primary" href="${whatsappFor(product)}" target="_blank" rel="noopener">Contact Us on WhatsApp</a>
              <a class="btn btn-secondary" href="mailto:${EMAIL}?subject=${encodeURIComponent(`Inquiry: ${productLabel(product)}`)}">Email Inquiry</a>`;
  }
  return `<a class="btn btn-primary" href="${product.alibaba}" target="_blank" rel="noopener noreferrer nofollow">Pay Securely on Alibaba</a>
              <a class="btn btn-secondary" href="${paypalFor(product)}">Request PayPal Invoice</a>
              <a class="btn btn-ghost" href="${whatsappFor(product)}" target="_blank" rel="noopener">WhatsApp Inquiry</a>
              <a class="btn btn-secondary" href="mailto:${EMAIL}?subject=${encodeURIComponent(`Inquiry: ${productLabel(product)}`)}">Email Inquiry</a>`;
}

function whatsappFor(product) {
  return `${WHATSAPP}?text=${encodeURIComponent(`Hello DIGILICEN, I want to inquire about ${productLabel(product)}.`)}`;
}

function priceValue(product) {
  return product.price.replace("US$", "");
}

function productTitle(product) {
  return `${productLabel(product)} Software License | DIGILICEN`;
}

function productDescription(product) {
  if (isContactOnly(product)) {
    return `${productLabel(product)} from DIGILICEN: ${product.version}, ${product.price}, contact us for version confirmation, installer package, tutorial, remote installation support, and digital delivery.`;
  }
  return `${productLabel(product)} from DIGILICEN: ${product.version}, ${product.price}, Alibaba or PayPal invoice, WhatsApp support, and digital delivery.`;
}

function jsonLd(data) {
  return JSON.stringify(data, null, 2).replaceAll("</", "<\\/");
}

function relatedProducts(product) {
  return PRODUCTS
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 3);
}

function relatedPostsForProduct(product) {
  const direct = BLOG_POSTS.filter((post) => post.related.includes(product.slug));
  const category = BLOG_POSTS.filter((post) => {
    const categoryMatch = post.category.toLowerCase().includes(product.category.toLowerCase().split(" ")[0]);
    const nameMatch = post.title.toLowerCase().includes(product.name.split(" ")[0].toLowerCase());
    return !direct.includes(post) && (categoryMatch || nameMatch);
  });
  return [...direct, ...category].slice(0, 4);
}

function productFaqs(product) {
  if (isContactOnly(product)) {
    return [
      {
        question: `Which versions are available for ${product.name}?`,
        answer: `DIGILICEN lists ${product.name} options for 2025, 21, 20, and X9, with Windows and Mac versions. Contact us to confirm your required version and platform before ordering.`
      },
      {
        question: `What is included with ${product.name}?`,
        answer: "Delivery includes a license key, installer package, tutorial, and remote installation support when needed."
      },
      {
        question: `How do I order ${product.name}?`,
        answer: "This product does not use an Alibaba product link on DIGILICEN. Contact us by WhatsApp or email to confirm version, platform, language preference, price, and delivery details."
      }
    ];
  }

  return [
    {
      question: `Is ${productLabel(product)} a genuine software license inquiry?`,
      answer: `Yes. DIGILICEN provides genuine software license inquiry support for ${productLabel(product)} and does not provide cracked software, pirated copies, or unsafe activation methods.`
    },
    {
      question: `What should I confirm before ordering ${product.name}?`,
      answer: `Please confirm the product name, ${product.term} term, account email requirements, operating system, compatibility needs, payment method, and delivery timing before payment.`
    },
    {
      question: `Can I pay for ${productLabel(product)} with Alibaba or PayPal?`,
      answer: `DIGILICEN supports Alibaba online payment and PayPal invoice requests. Contact us first if you need availability confirmation or an invoice before ordering.`
    }
  ];
}

function productGuidance(product) {
  const categoryGuidance = {
    Adobe: {
      audience: "Creative teams, designers, editors, marketers, freelancers, and short-term project users who need Adobe Creative Cloud access for design, PDF, photo, video, or production work.",
      checklist: "Confirm the Creative Cloud term, account email requirement, required Adobe apps, delivery timing, and whether the subscription is for a single user, contractor, or business workflow."
    },
    Autodesk: {
      audience: "CAD, design, architecture, manufacturing, visualization, product design, and engineering users who need Autodesk software license inquiry support before payment.",
      checklist: "Confirm the exact Autodesk product name, license term, operating system, account setup, project workflow, and whether a single product or collection is more appropriate."
    },
    Engineering: {
      audience: "Engineering, BIM, construction, civil, plant, electrical, mechanical, and infrastructure teams that need professional software for technical workflows.",
      checklist: "Confirm file compatibility, project discipline, required product, account email, number of users, and whether the software needs to fit a company BIM or CAD standard."
    },
    "Developer Tools": {
      audience: "Developers, software teams, technical users, and multi-device coding workflows that need developer tool access and account setup confirmation.",
      checklist: "Confirm included developer tools, account email, operating system, device requirements, user count, AI assistant needs, and payment route before ordering."
    },
    "Research Tools": {
      audience: "Researchers, students, academic writers, laboratories, and office users who need EndNote reference management support for Windows or Mac.",
      checklist: "Confirm the EndNote version, Windows or Mac platform, English or Chinese language preference, installer package needs, tutorial needs, and whether remote installation support is required."
    }
  };
  const guidance = categoryGuidance[product.category] || categoryGuidance.Autodesk;

  return [
    {
      heading: `Who ${productLabel(product)} is for`,
      body: guidance.audience
    },
    {
      heading: "Before ordering checklist",
      body: guidance.checklist
    },
    {
      heading: "Delivery and support workflow",
      body: isContactOnly(product)
        ? `Contact DIGILICEN with the product name, ${product.term} platform option, language preference, operating system details, and whether you need remote installation support.`
        : `After payment confirmation, send DIGILICEN the product name, ${product.term} term, order number or PayPal invoice email, account email if required, and preferred support channel.`
    }
  ];
}

function categoryFaqs(category, products) {
  const examples = products.slice(0, 4).map((product) => product.name).join(", ");
  const contactOnly = products.length > 0 && products.every(isContactOnly);
  return [
    {
      question: `Which products are included in ${category.name}?`,
      answer: `${category.name} includes DIGILICEN software license inquiry options such as ${examples}. Product availability, term, and account requirements should be confirmed before payment.`
    },
    {
      question: `How do I choose the right ${category.name} option?`,
      answer: `Start with your workflow, required software name, license term, operating system, account email, and number of users. DIGILICEN can help confirm the closest listed option before you order.`
    },
    {
      question: contactOnly ? `How do I order ${category.name}?` : `Can I pay for ${category.name} by Alibaba or PayPal?`,
      answer: contactOnly
        ? `For ${category.name}, contact DIGILICEN by WhatsApp or email first to confirm product version, platform, price, and delivery details before ordering.`
        : `Yes. DIGILICEN supports Alibaba online payment and PayPal invoice requests for software license inquiries after product details and availability are confirmed.`
    }
  ];
}

function blogFaqs(post) {
  const primaryProduct = post.related.map((slug) => PRODUCTS.find((product) => product.slug === slug)).find(Boolean);
  const productText = primaryProduct ? productLabel(primaryProduct) : "a software license";
  return [
    {
      question: `Can DIGILICEN help with ${post.title.toLowerCase()}?`,
      answer: `Yes. DIGILICEN can help customers confirm ${productText}, payment route, account requirements, and digital delivery details before ordering.`
    },
    {
      question: "Should I confirm details before payment?",
      answer: "Yes. Always confirm product name, term, account email requirements, operating system, payment method, and delivery timing before payment."
    }
  ];
}

function productPage(product) {
  const title = productTitle(product);
  const description = productDescription(product);
  const image = imageFor(product);
  const canonical = productUrl(product);
  const related = relatedProducts(product);
  const relatedPosts = relatedPostsForProduct(product);
  const faqs = productFaqs(product);
  const guidance = productGuidance(product);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productLabel(product),
    url: canonical,
    image: `${SITE_URL}/${image}`,
    description,
    brand: {
      "@type": "Brand",
      name: product.category
    },
    category: "Software license",
    sku: product.slug,
    itemCondition: "https://schema.org/NewCondition",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "License term",
        value: product.term
      },
      {
        "@type": "PropertyValue",
        name: "Payment options",
        value: paymentText(product)
      },
      {
        "@type": "PropertyValue",
        name: "Delivery",
        value: deliveryText(product)
      }
    ],
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
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to order ${productLabel(product)} from DIGILICEN`,
    description: `Steps to confirm and request ${productLabel(product)} with DIGILICEN before payment.`,
    totalTime: "PT20M",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Product name, term, account email if required, and preferred payment method"
      }
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Confirm product details",
        text: `Check the exact product name, ${product.term} term, listed price, operating system, and account email requirements.`
      },
      {
        "@type": "HowToStep",
        name: "Contact DIGILICEN",
        text: "Ask DIGILICEN to confirm availability, compatibility, payment route, and delivery timing before payment."
      },
      {
        "@type": "HowToStep",
        name: "Pay and send order details",
        text: isContactOnly(product) ? "Contact DIGILICEN by WhatsApp or email to confirm the version, platform, delivery package, and remote installation support." : "Use Alibaba online payment or request a PayPal invoice, then send the order number or invoice email for digital delivery support."
      }
    ]
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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
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
    <script type="application/ld+json">${jsonLd(howToSchema)}</script>
    <script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>
    <script type="application/ld+json">${jsonLd(faqSchema)}</script>
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
              <span><strong>Delivery</strong> ${escapeHtml(deliveryText(product))}</span>
              <span><strong>Payment</strong> ${escapeHtml(paymentText(product))}</span>
              <span><strong>Support</strong> WhatsApp and email activation guidance</span>
            </div>
            <div class="product-actions">
              ${productDetailActions(product)}
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
            <h3>${isContactOnly(product) ? "Contact first" : "Secure payment"}</h3>
            <p>${isContactOnly(product) ? "Contact DIGILICEN by WhatsApp or email to confirm version, platform, language, price, and delivery support before ordering." : "Pay through Alibaba online payment or request a PayPal invoice after availability is confirmed."}</p>
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
          <p class="eyebrow">Buying guide</p>
          <h2>How to prepare for ${escapeHtml(productLabel(product))}</h2>
          <p>Use these notes to confirm whether this listed software license inquiry fits your workflow before payment.</p>
        </div>
        <div class="value-grid compact">
          ${guidance.map((item, index) => `<article>
            <span class="value-icon">${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(item.heading)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </article>`).join("\n          ")}
        </div>
      </section>

      <section class="section section-muted">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>Questions about ${escapeHtml(productLabel(product))}</h2>
        </div>
        <div class="faq-list">
          ${faqs.map((faq, index) => `<details ${index === 0 ? "open" : ""}>
            <summary>${escapeHtml(faq.question)}</summary>
            <p>${escapeHtml(faq.answer)}</p>
          </details>`).join("\n          ")}
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

      ${relatedPosts.length ? `<section class="section section-muted">
        <div class="section-head">
          <p class="eyebrow">Buying guides</p>
          <h2>Guides related to ${escapeHtml(product.name)}</h2>
        </div>
        <div class="related-links">
          ${relatedPosts.map((post) => `<a href="../blog/${post.slug}">${escapeHtml(post.title)}</a>`).join("\n          ")}
          <a href="../blog/">All software license guides</a>
        </div>
      </section>` : ""}
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
        ${productCardActions(product)}
      </div>
    </article>`;
  }).join("\n          ");
}

function categoryPage(category) {
  const products = PRODUCTS.filter(category.match);
  const canonical = categoryUrl(category);
  const faqs = categoryFaqs(category, products);
  const contactOnly = products.length > 0 && products.every(isContactOnly);
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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
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
    <script type="application/ld+json">${jsonLd(faqSchema)}</script>
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
              <span><strong>Payment</strong> ${contactOnly ? "Contact DIGILICEN before ordering" : "Alibaba secure online payment or PayPal invoice"}</span>
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
          <p class="eyebrow">FAQ</p>
          <h2>Questions about ${escapeHtml(category.name)}</h2>
        </div>
        <div class="faq-list">
          ${faqs.map((faq, index) => `<details ${index === 0 ? "open" : ""}>
            <summary>${escapeHtml(faq.question)}</summary>
            <p>${escapeHtml(faq.answer)}</p>
          </details>`).join("\n          ")}
        </div>
      </section>

      <section class="section section-muted">
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
  const faqs = blogFaqs(post);
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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
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
    <script type="application/ld+json">${jsonLd(faqSchema)}</script>
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
          <section>
            <h2>Frequently asked questions</h2>
            <div class="faq-list">
              ${faqs.map((faq, index) => `<details ${index === 0 ? "open" : ""}>
                <summary>${escapeHtml(faq.question)}</summary>
                <p>${escapeHtml(faq.answer)}</p>
              </details>`).join("\n              ")}
            </div>
          </section>
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

function infoPageUrl(page) {
  return `${SITE_URL}/${page.slug}`;
}

function infoPage(page) {
  const canonical = infoPageUrl(page);
  const relatedProducts = page.relatedProducts?.map((slug) => PRODUCTS.find((product) => product.slug === slug)).filter(Boolean) || [];
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    url: canonical,
    description: page.description,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
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
        name: page.heading,
        item: canonical
      }
    ]
  };
  const faqSchema = page.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.title)}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="DIGILICEN">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${SITE_URL}/assets/hero-license.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${SITE_URL}/assets/hero-license.png">
    <link rel="stylesheet" href="styles.css?v=6">
    <script type="application/ld+json">${jsonLd(webPageSchema)}</script>
    <script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>
    ${faqSchema ? `<script type="application/ld+json">${jsonLd(faqSchema)}</script>` : ""}
  </head>
  <body>
    <div class="topbar">Genuine Licenses. Lower Prices. Instant Delivery.</div>
    <header class="site-header">
      <a class="brand" href="/" aria-label="DIGILICEN home">
        <span class="brand-mark">D</span>
        <span>DIGILICEN</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Open menu">Menu</button>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/#products">Products</a>
        <a href="/about">About</a>
        <a href="/payment-and-delivery">Payment & Delivery</a>
        <a href="/blog/">Blog</a>
        <a href="/contact">Contact</a>
      </nav>
      <a class="header-cta" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
    </header>
    <main>
      <article class="article-page">
        <header class="article-hero">
          <p class="eyebrow">DIGILICEN support</p>
          <h1>${escapeHtml(page.heading)}</h1>
          <p>${escapeHtml(page.intro)}</p>
        </header>
        <div class="article-body">
          ${page.sections.map((section) => `<section>
            <h2>${escapeHtml(section.heading)}</h2>
            ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n            ")}
          </section>`).join("\n          ")}
          ${page.faqs?.length ? `<section>
            <h2>Frequently asked questions</h2>
            <div class="faq-list">
              ${page.faqs.map((faq, index) => `<details ${index === 0 ? "open" : ""}>
                <summary>${escapeHtml(faq.question)}</summary>
                <p>${escapeHtml(faq.answer)}</p>
              </details>`).join("\n              ")}
            </div>
          </section>` : ""}
          ${relatedProducts.length ? `<section>
            <h2>Related product price pages</h2>
            <div class="related-links">
              ${relatedProducts.map((product) => `<a href="/products/${product.slug}">${escapeHtml(productLabel(product))} - ${escapeHtml(product.price)}</a>`).join("\n              ")}
            </div>
          </section>` : ""}
          <section class="article-cta">
            <h2>Need help with a software license inquiry?</h2>
            <p>Send DIGILICEN the product name, required term, account email requirements, operating system, and payment preference before ordering.</p>
            <div class="product-actions">
              <a class="btn btn-primary" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp Inquiry</a>
              <a class="btn btn-secondary" href="mailto:${EMAIL}?subject=${encodeURIComponent(page.heading)}">Email DIGILICEN</a>
            </div>
          </section>
        </div>
      </article>
      <section class="section section-muted">
        <div class="section-head">
          <p class="eyebrow">Useful links</p>
          <h2>Continue exploring DIGILICEN</h2>
        </div>
        <div class="related-links">
          <a href="/about">About DIGILICEN</a>
          <a href="/payment-and-delivery">Payment and Delivery</a>
          <a href="/order-support-policy">Order Support Policy</a>
          <a href="/faq">FAQ</a>
          <a href="/blog/">Software License Blog</a>
        </div>
      </section>
    </main>
    <footer class="site-footer">
      <div>
        <strong>DIGILICEN</strong>
        <p>Genuine software license solutions for business, design, engineering, creative, office, and professional users.</p>
      </div>
      <div>
        <strong>Support</strong>
        <a href="/about">About</a>
        <a href="/payment-and-delivery">Payment & Delivery</a>
        <a href="/order-support-policy">Order Support Policy</a>
        <a href="/faq">FAQ</a>
      </div>
      <div>
        <strong>Contact</strong>
        <a href="mailto:${EMAIL}">${EMAIL}</a>
        <a href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
        <span>Secure Payment: Alibaba Online Payment / PayPal Invoice</span>
      </div>
      <div class="copyright">2026 Copyright (c) Digilicen.com</div>
    </footer>
    <script src="app.js?v=6"></script>
  </body>
</html>
`;
}

function sitemapXml() {
  const urls = [
    { loc: `${SITE_URL}/`, priority: "1.0" },
    ...INFO_PAGES.map((page) => ({ loc: infoPageUrl(page), priority: "0.8" })),
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

for (const page of INFO_PAGES) {
  await writeFile(new URL(`../${page.slug}.html`, import.meta.url), infoPage(page));
}

await writeFile(new URL("../sitemap.xml", import.meta.url), sitemapXml());
await writeFile(new URL("../robots.txt", import.meta.url), `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`);

console.log(`Generated ${PRODUCTS.length} product pages, sitemap.xml, and robots.txt.`);
