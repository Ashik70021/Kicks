# 👟 Kicks — Sneaker E-Commerce App

A modern, fully responsive sneaker e-commerce storefront built with React and Vite. Browse products, view details, manage a persistent cart, and simulate a checkout — all with smooth animations and a clean UI.

---

## 🔗 Live URL

> **[https://kicks-five.vercel.app](https://kicks-five.vercel.app)**  

---

## 📖 Overview

Kicks is a single-page application that mimics a real sneaker shop experience:

- **Home page** — Hero banner with slide switcher, animated category carousel, new-drop products grid, and customer reviews
- **Product Details page** — 2×2 image grid (desktop) / image slider with dot indicators (mobile), color & size selector, Add to Cart / Buy It Now
- **Cart page** — Full bag management with quantity controls, order summary, and a multi-step demo payment modal
- **Persistent cart** — Items survive page refresh via `localStorage`
- **Navbar** — Live cart count badge, navigates to cart on click

---

## ⚙️ Setup

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/kicks.git
cd kicks

# Install dependencies
npm install

# Start development server
npm run dev
```

### Other scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `http://localhost:5173` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Routing | [React Router v7](https://reactrouter.com/) |
| Styling | [Tailwind CSS v3](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) |
| State | React Context API (`CartContext`) |
| Persistence | Browser `localStorage` |
| Data / API | [Escuela JS REST API](https://api.escuelajs.co/api/v1/) |
| Animations | Custom CSS keyframes (`fadeInUp`, `fadeIn`, `slideInRight`) |
| Linting | ESLint + eslint-plugin-react |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── cart_page/          # AddToCart UI + demo payment modal
│   ├── common/             # ProductCard, ScrollToTop
│   ├── footer/             # Footer with newsletter
│   ├── header/             # Navbar with live cart badge
│   ├── Home_Page_Contents/ # Banner, Categories, New_Drops, Reviews
│   └── product details page/ # Details, Also_Like_Products
├── context/
│   └── CartContext.jsx     # Global cart state + localStorage sync
├── data/
│   └── reviews.json        # Static review data
├── layouts/
│   └── MainLayout.jsx      # Shared layout (Navbar + Footer + page fade)
├── pages/                  # Home, ProductDetails, Cart
└── routes/
    └── routes.jsx          # React Router config
```

---

## 📝 Notes

- **API** — Product and category data is fetched from the free [Escuela JS API](https://api.escuelajs.co/api/v1/). Some entries return broken or placeholder image URLs; the app sanitises these at runtime and falls back to the first available image when fewer than 4 product images exist.
- **Payment modal** — The checkout flow is purely a demo. No real payment is processed.
- **Cart persistence** — Cart state is stored in `localStorage` under the key `kicks_cart` and rehydrated on app load.
- **Scroll restoration** — A `ScrollToTop` component resets scroll position to the top on every route change.
- **Responsive** — Fully responsive across mobile, tablet, and desktop breakpoints.
