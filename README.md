# DIGILICEN inquiry site

Static inquiry website converted from the Shopline theme export.

## Preview

```sh
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173/index.html
```

## Pages

- `index.html` - homepage, product list, FAQ, inquiry form
- `product.html?product=autocad` - product detail page

## Contact configuration

Current contact details:

- Email: `digilicen@outlook.com`
- WhatsApp: `+86 199 2877 7176`
- Alibaba product links: embedded in `app.js`
- PayPal: supported as a PayPal invoice email request from each product card and product detail page
- Product version, term, and current prices are embedded in `app.js`

Edit `app.js` to update product names, Alibaba links, WhatsApp text, or email.
If prices change, replace each product's `price` value, for example `price: "US$55.00"`.
If you have a direct PayPal payment link later, replace the `paypalFor(product)` mail link in `app.js`.

## Images

Current image assets are in `assets/` and were copied from the supplied `digilice` folder:

- `assets/hero-license.png`
- `assets/adobe-1-year.png`
- `assets/adobe-6-month.png`
- `assets/adobe-3-month.png`
- `assets/adobe-1-month.png`
- `assets/adobe-creative-large.png`
- `assets/autodesk-generic.png`
- `assets/autocad-commercial.png`
- `assets/autocad-mechanical.png`
- `assets/autocad-mep.png`
- `assets/aec-collection.png`
- `assets/bim-collection.png`
- `assets/raster-design.png`
- `assets/genuine-software.png`

Exact product image mappings are managed in `PRODUCT_IMAGES` inside `app.js`.
Products without a clearly matching single-product image use the matching category image.

The Shopline theme export contains `shopline://...` image references, but not the original uploaded image files.
To restore more exact per-product images, export or download assets from Shopline admin:

- Product images from Products
- Logo and media from Files / Media library
- Homepage section images from theme editor uploads

After downloading the assets, place them in an `assets/` folder and replace the visual placeholders in `index.html`,
`product.html`, or `app.js`.

## SEO

SEO files included:

- `_redirects` - redirects `www.digilicen.com` to the canonical root domain when supported by the Cloudflare static deployment
- `robots.txt` - allows search engines and points to the sitemap
- `sitemap.xml` - lists the homepage, category landing pages, blog pages, and 26 static product pages
- `categories/*.html` - category landing pages for Autodesk, Adobe Creative Cloud, and AutoCAD / engineering software keywords
- `blog/*.html` - software license buying guides for long-tail SEO keywords
- `products/*.html` - static product pages with unique titles, descriptions, canonical URLs, Open Graph tags, Product structured data, and breadcrumb structured data
- Homepage structured data - Organization, WebSite, and FAQPage

After changing products, prices, images, or links in `app.js`, regenerate SEO pages:

```sh
node tools/generate-seo-pages.mjs
```

## Deploy

This is a static site and can be uploaded to:

- Cloudflare Pages
- Netlify
- Vercel
- Any static web server

Use the project root as the publish directory. No build command is required.

### Cloudflare Pages

1. Put this folder into a GitHub repository, or upload it with Cloudflare Pages direct upload.
2. Create a Pages project.
3. Set build command to empty.
4. Set output / publish directory to `/`.
5. Deploy.
6. Add your domain in Cloudflare Pages custom domains, then point DNS to Cloudflare.

### Netlify

1. Drag this project folder into Netlify Drop, or connect a GitHub repository.
2. Set build command to empty.
3. Set publish directory to `/`.
4. Deploy.
5. Add your custom domain in Domain settings.

### Vercel

1. Import the project from GitHub.
2. Keep framework preset as Other.
3. Leave build command empty.
4. Set output directory to `/`.
5. Deploy and connect the custom domain.

### Traditional hosting / cPanel

Upload these files and folders to the website root:

- `index.html`
- `product.html`
- `styles.css`
- `app.js`
- `assets/`

The homepage should open from `https://yourdomain.com/index.html` or `https://yourdomain.com/`.
