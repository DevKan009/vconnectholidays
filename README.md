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
- 📊 **Animated Stat Counters**: Highlight milestones (25k+ Happy Travelers, 100+ Destinations, 7+ Years in Business).
- 📱 **Fully Responsive Experience**: Tailored layouts for mobile, tablet, and desktop with a slide-out hamburger navigation drawer.
- ✉️ **Inquiry & Contact Form**: Validated contact forms with instant feedback, interactive social links, and physical office details.
- 📝 **Travel Blog & Articles**: Dynamic blog routing (`/blog` and `/blog/:slug`) for travel stories and guides.
- 🎯 **SEO & UX Focused**: Dynamic document titles (`usePageTitle`), smooth `ScrollToTop` upon page navigation, and semantic HTML5.

---

## 🗂️ Website Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Hero banner, destination bento grid, featured tour packages, why choose us, stats counter, client reviews, and FAQs |
| `/about` | **About Us** | Agency story since 2018, core benefits, leadership team, photo gallery, and categorized FAQs |
| `/destination` | **Destinations** | Comprehensive catalogue of dream international & domestic destinations |
| `/tour-packages` | **Tour Packages** | Complete list of curated packages with pricing and durations |
| `/contact` | **Contact** | Inquiry form, office address in Indore, direct email, phone numbers, and socials |
| `/blog` | **Blog** | Travel guides, news, and vacation tips |
| `/blog/:slug` | **Blog Post** | Individual article reader page |
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
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
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
    email: 'Vanita@Vconnectholidays.Com',
    phones: ['73540 46384', '93990 90152'],
  }
  ```

---

## 🚢 Deployment

To deploy the website to production (Vercel, Netlify, Cloudflare Pages, etc.):

1. Run the build script:
   ```bash
   npm run build
   ```
2. The generated assets will be located in the `dist/` folder.
3. Configure your hosting provider to serve Single-Page Applications (SPA) by redirecting all requests to `/index.html`.

---

## 🏢 Contact & Agency Details

- **Company**: VConnect Holidays
- **Office**: 408, Apollo Premier, Vijay Nagar Square, Indore, Madhya Pradesh, India
- **Email**: [Vanita@Vconnectholidays.Com](mailto:Vanita@Vconnectholidays.Com)
- **Phone**: +91 73540 46384 / +91 93990 90152

---

## 📄 License

Private and proprietary. Developed for **VConnect Holidays**. All rights reserved.
