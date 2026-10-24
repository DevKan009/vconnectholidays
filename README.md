# 🌍 VConnect Holidays

> **Holidays | Air Tickets | Visas | Honeymoon Trips | Customized Tours**  
> *Crafting unforgettable travel experiences since 2018.*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.18-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Oxlint](https://img.shields.io/badge/Oxlint-1.81-cyan)](https://oxc.rs/)
[![License](https://img.shields.io/badge/License-Private-blue)](#)

---

## 📖 Overview

**VConnect Holidays** is a modern, responsive web application for a premier full-service travel agency based in Indore, India. The platform showcases international and domestic holiday packages, popular worldwide destinations, customized honeymoon itineraries, visa assistance, and corporate travel planning.

Built with **React 19**, **Vite 8**, and **React Router 7**, the website delivers lightning-fast performance, smooth transitions, mobile-first responsiveness, and an elegant editorial aesthetic powered by curated typography and pure Vanilla CSS.

---

## ✨ Features

- 🌟 **Dynamic Destination Showcase**: Bento-grid and card layouts featuring top travel spots across Asia, Europe, and Island nations (Abu Dhabi, Vietnam, Sri Lanka, Finland, Switzerland, Fiji, etc.).
- ✈️ **Curated Tour Packages**: Detailed holiday packages with durations, transparent pricing estimates, and direct inquiry hooks (Bali, Singapore, Thailand, Phuket & Krabi, Seychelles, South Korea, Paris & Swiss, etc.).
- 💬 **Traveler Testimonials**: Interactive slider showcasing real customer reviews and honeymoon stories.
- ❓ **Interactive FAQ Accordions**: Multi-category collapsible FAQs covering travel queries, bookings, refunds, and transportation.
- 📊 **Animated Stat Counters**: Highlight milestones (25000+ Happy Travelers, 100+ Destinations, 8+ Years in Business).
- 📱 **Fully Responsive Experience**: Tailored layouts for mobile, tablet, and desktop with a slide-out hamburger navigation drawer.
- ✉️ **Inquiry & Contact Form**: Validated contact forms with instant feedback, interactive social links, and physical office details.
- 🎯 **SEO & UX Focused**: Dynamic document titles (`usePageTitle`), smooth `ScrollToTop` upon page navigation, and semantic HTML5.

---

## 🗂️ Website Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Hero banner, destination bento grid, featured tour packages, why choose us, stats counter, client reviews, and FAQs |
| `/about` | **About Us** | Agency story since 2018, core benefits, leadership team, photo gallery, and categorized FAQs |
| `/destination` | **Destinations** | Comprehensive catalogue of dream international & domestic destinations |
| `/tour-packages` | **Tour Packages** | Complete list of curated packages with pricing and durations |
| `/services` | **Services** | Hotels, flights, visas, SIM cards, insurance and group tours, with the "Only need a hotel? We do that too." band |
| `/group-tours` | **Group Tours** | Coming Soon page; every CTA forwards to Contact |
| `/visa` | **Visa hub** | Choose E-Visa or embassy Visa, visa FAQs |
| `/visa/e-visa`, `/visa/e-visa/:slug` | **E-Visa** | Country grid with search, and per-country facts and required documents |
| `/visa/embassy-visa`, `/visa/embassy-visa/:slug` | **Visa** | Same for embassy / sticker visas |
| `/visa/required-documents` | **Required Documents** | Every checklist, plus `/visa/required-documents/schengen` |
| `/privacy-policy` | **Privacy Policy** | What the enquiry form and WhatsApp buttons collect, and visitors' choices |
| `/search?q=` | **Search** | Header search across destinations, visa countries and services |
| `/contact` | **Contact** | Context-aware enquiry form (`?service=hotels`, `?service=visa&country=france`, …) that saves leads to a Google Sheet, emails the team and offers WhatsApp |
| `*` | **404 Not Found** | Custom styled error page with redirect to home |

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) (`react`, `react-dom`)
- **Build Tool / Bundler**: [Vite 8](https://vite.dev/) with Fast Refresh HMR (`@vitejs/plugin-react`)
- **Routing**: [React Router 7](https://reactrouter.com/) (`react-router-dom`)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (`react-icons/fa6`)
- **Typography**: Google Fonts — *Playfair Display* (Editorial headings) & *DM Sans* (Clean, legible body copy)
- **Styling**: Modular Vanilla CSS with CSS custom properties (design tokens), flexbox, and grid layouts
- **Code Linter**: [Oxlint](https://oxc.rs/)

---

## 📁 Project Structure

```text
vconnect2/
├── public/                 # Static assets & favicon
├── src/
│   ├── assets/             # Optimized images (AVIF, WebP, JPG) & icons
│   ├── components/         # Reusable UI components
│   │   ├── Accordion.jsx        # Expandable/collapsible FAQ component
│   │   ├── Button.jsx           # Standard button component
│   │   ├── DestinationCard.jsx  # Destination preview card
│   │   ├── Footer.jsx           # Global site footer with links & contact
│   │   ├── Header.jsx           # Navbar with mobile menu drawer
│   │   ├── Hero.jsx             # Homepage hero section with CTA
│   │   ├── PackageCard.jsx      # Tour package card with pricing & duration
│   │   ├── PageBanner.jsx       # Inner page header banner
│   │   ├── ScrollToTop.jsx      # Auto-scrolls to top on route navigation
│   │   ├── SectionHeading.jsx   # Standardized section headings
│   │   ├── StatCounter.jsx      # Animated milestone numbers
│   │   └── TestimonialSlider.jsx# Client testimonial carousel
│   ├── data/
│   │   └── content.js      # Centralized data store (destinations, packages, FAQs, etc.)
│   ├── hooks/
│   │   └── usePageTitle.js # Dynamic document title hook
│   ├── pages/              # Route views
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Destination.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── TourPackages.jsx
│   ├── App.jsx             # Root application component with route definitions
│   ├── index.css           # Global design tokens, typography, and utility classes
│   └── main.jsx            # Application entry point with BrowserRouter
├── index.html              # HTML shell & font imports
├── package.json            # Dependencies and npm scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DevKan009/vconnectholidays.git
   cd vconnectholidays
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
|---|---|
| `npm run dev` | Runs the app in development mode with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready files into the `dist/` folder. |
| `npm run preview` | Locally serves the production build from `dist/` to test before deployment. |
| `npm run lint` | Runs [Oxlint](https://oxc.rs/) to check code for syntax and quality issues. |

---

## ⚙️ Content Management & Customization

All site content is decoupled from components and stored centrally in **[`src/data/content.js`](src/data/content.js)**:

- **Destinations**: Update `homeDestinations` and `destinationList` arrays with custom titles, subtitles, and imagery.
- **Packages**: Edit `homePackages` and `tourPackages` to modify package names, durations, prices, and banners.
- **Testimonials & Reviews**: Update `testimonials` with client names, quotes, and photos.
- **FAQs**: Modify `homeFaqs` or add category-specific questions.
- **Agency Information**: Update `contactInfo` to modify address, phone numbers, or email addresses:
  ```javascript
  export const contactInfo = {
    address: '408, Apollo Premier, Vijay Nagar Square, Indore',
    email: 'vanita@vconnectholidays.com',
    emails: ['vanita@vconnectholidays.com', 'vconnectholidays.idr@gmail.com'],
    phones: ['9098686133', '6263346650', '9399090152', '6264268858'],
    whatsapp: '9098686133',
  }
  ```

---

## 🚢 Deployment

The site is hosted on **HostingRaja (cPanel, LiteSpeed)** at `vconnectholidays.com`. Email and DNS also live there and are not touched by deploys.

**Build:**

```bash
npm run build
```

`vite build` is followed by `scripts/prerender-meta.mjs`. That script writes one HTML file per page (149 pages: title, description, canonical, Open Graph tags and share image), plus `sitemap.xml`, `robots.txt` and `__spa-fallback.html`. This gives WhatsApp, Facebook and LinkedIn a correct preview for every link. `public/.htaccess` (copied into `dist/`) handles HTTPS, non-www, trailing slashes, old WordPress URLs (301/410), the SPA fallback and cache headers.

Set `VITE_LEADS_ENDPOINT` and `VITE_LEADS_TOKEN` in `.env.local` **before** building; they are baked into the bundle.

**Upload (cPanel File Manager):**

1. Zip the *contents* of `dist/`, including the hidden `.htaccess`.
2. Upload the zip into the site's document root and extract it there.
3. Check that `.htaccess` is present (enable "Show Hidden Files" in File Manager settings).
4. Purge the LiteSpeed cache if the LiteSpeed Cache plugin or the server cache was on.

**Staging:** create the subdomain `new.vconnectholidays.com` in cPanel → Domains, and deploy there first. The `.htaccess` sends `X-Robots-Tag: noindex` on any `new.` host, so staging stays out of Google.

**First launch (replacing WordPress):**

1. Take a full cPanel backup (Files + Databases) and download it. Export the MetForm entries from WordPress.
2. Move the WordPress files out of `public_html` into a dated folder outside the web root.
3. Upload the build as above, then check: an old URL like `/sample-page/` returns 410, `/destination/` redirects to `/destinations/`, a refresh on `/visa/e-visa/thailand/` works, and email still sends and receives.
4. Search Console: add the property, submit `https://vconnectholidays.com/sitemap.xml`, and watch the Pages report for two weeks.
5. Re-scrape link previews with the Facebook Sharing Debugger. For WhatsApp, test with `?v=2` on the URL, because WhatsApp caches previews.

**Helper scripts:** `node scripts/optimize-images.mjs` re-encodes images over 300 KB in place. `node scripts/make-og-default.mjs` rebuilds `public/og-default.jpg`.

### Lead capture (Google Apps Script)

Enquiries and WhatsApp clicks go to a Google Apps Script web app that writes them to a Google Sheet, emails the team and sends the visitor a confirmation.

1. Create a Google Sheet, open **Extensions → Apps Script** and paste `scripts/apps-script/Code.gs`.
2. In **Project Settings → Script properties** add `NOTIFY_EMAILS` (comma-separated) and `SITE_TOKEN` (any random string).
3. **Deploy → New deployment → Web app**, Execute as *Me*, access *Anyone*. Authorize it (Advanced → Go to project).
4. Copy the `/exec` URL. Set `VITE_LEADS_ENDPOINT` (that URL) and `VITE_LEADS_TOKEN` (same as `SITE_TOKEN`) in `.env.local` and in Vercel → Environment Variables, then redeploy. See `.env.example`.
5. After editing the script: **Manage deployments → Edit → New version** keeps the same URL.

Full details: `scripts/apps-script/README.md`. Without the endpoint, the form shows a friendly error and offers WhatsApp.

### Visa content

Visa data in `src/data/visas/*.json` is generated, not hand-edited:

```bash
node scripts/extract-visa-data.mjs
```

```bash
node scripts/normalize-visa-data.mjs
```

The first fetches the reference pages into `scripts/out/` (git-ignored). The second cleans them (with hand fixes in `scripts/visa-overrides.mjs`) and rewrites `docs/visa-content-changelog.md`, which lists every dropped, corrected and fact-checked line.

---

## 🏢 Contact & Agency Details

- **Company**: VConnect Holidays
- **Office**: 408, Apollo Premier, Vijay Nagar Square, Indore, Madhya Pradesh, India
- **Email**: [vanita@vconnectholidays.com](mailto:vanita@vconnectholidays.com) | [vconnectholidays.idr@gmail.com](mailto:vconnectholidays.idr@gmail.com)
- **Phone**: +91 90986 86133 / +91 62633 46650 / +91 93990 90152 / +91 62642 68858
- **WhatsApp**: [+91 90986 86133](https://wa.me/919098686133)

---

## 📄 License

Private and proprietary. Developed for **VConnect Holidays**. All rights reserved.
