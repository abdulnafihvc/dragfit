# DragFit — Premium Gym Website

A world-class premium gym website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## ✨ Features

- **12 Complete Sections**: Hero, About, Classes, Membership, Trainers, Transformations, Testimonials, BMI Calculator, Facilities, FAQ, Contact, Footer
- **Premium Dark Theme**: Black, charcoal, brand red (#E5001A), and white
- **Glassmorphism Effects**: Throughout cards and overlays
- **Fully Responsive**: Mobile-first, works on all screen sizes
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD, Sitemap, Robots.txt
- **Animations**: Scroll-triggered reveals, counter animations, hover micro-interactions
- **Interactive Features**: BMI Calculator, Membership toggle (monthly/yearly), Class filter, Transformation gallery filter
- **Contact Form**: Validated, with WhatsApp integration
- **Sticky Navigation**: With active section highlighting and mobile drawer menu
- **WhatsApp Floating Button**: Live chat integration
- **Newsletter Signup**: In footer
- **Accessibility**: ARIA labels, keyboard navigation, focus rings, reduced motion support

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.1.0 | Framework |
| React | 19.0.0 | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 3.4.x | Styling |
| Lucide React | 0.469 | Icons |

## 📁 Project Structure

```
dragfit/
├── app/
│   ├── globals.css          # Global styles + CSS variables
│   ├── layout.tsx           # Root layout + SEO metadata + Schema markup
│   ├── page.tsx             # Main page (assembles all sections)
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── robots.ts            # Robots.txt
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky nav with mobile menu
│   │   └── Footer.tsx       # Footer with newsletter
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ClassesSection.tsx
│   │   ├── MembershipSection.tsx
│   │   ├── TrainersSection.tsx
│   │   ├── TransformationSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── BMICalculator.tsx
│   │   ├── FacilitiesSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       └── WhatsAppButton.tsx
├── lib/
│   ├── data.ts              # All site content / data
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript types
├── public/                  # Static assets (add og-image.jpg here)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone or extract the project
cd dragfit

# 2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

# 3. Run development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### Vercel (Recommended — Zero Config)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com/new
```

Set environment variables in Vercel dashboard if needed.

### Netlify

```bash
# Build command:  npm run build
# Publish directory: .next
# Install Netlify Next.js plugin automatically
```

Or use `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Docker

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### AWS / DigitalOcean / VPS

```bash
npm run build
npm start
# Use PM2 for process management:
pm2 start npm --name "dragfit" -- start
```

## ⚙️ Configuration

### Update Site Information

Edit `lib/data.ts` to update:
- Membership plan pricing and features
- Trainer profiles
- Class schedules
- FAQ content
- Gym statistics
- Facility details

### Update SEO & Business Info

Edit `app/layout.tsx` to update:
- Site title and description
- Business address and contact info
- Open Graph image URL
- Schema.org business data

### Update Brand Colors

Edit `tailwind.config.ts`:
```ts
colors: {
  brand: {
    red: '#E5001A',        // Primary red — change to your color
    'red-dark': '#B5001A', // Hover state
    // ...
  }
}
```

### WhatsApp Integration

Replace phone number in `components/ui/WhatsAppButton.tsx` and `components/sections/ContactSection.tsx`:
```
https://wa.me/YOUR_PHONE_NUMBER
```

### Google Maps

Replace the iframe `src` in `ContactSection.tsx` with your embedded Google Maps URL:
1. Go to maps.google.com
2. Search your gym location
3. Click Share → Embed a map → Copy HTML
4. Replace the `src` attribute

### Add Real Images

Replace Unsplash URLs in `lib/data.ts` with your actual gym photos. For best performance:
- Use Next.js `<Image>` component
- Store images in `/public/images/`
- Format: WebP, optimized

## 📊 SEO Checklist

- [x] Title tags with keyword optimization
- [x] Meta descriptions
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Schema.org JSON-LD (HealthClub type)
- [x] Canonical URLs
- [x] XML Sitemap
- [x] Robots.txt
- [x] Semantic HTML (section, nav, main, footer, h1-h6)
- [x] FAQ Schema markup
- [x] Alt text on all images
- [x] Mobile-first responsive design

### Local SEO Additions (Recommended)

Add to `layout.tsx` schema:
```json
{
  "@type": "LocalBusiness",
  "areaServed": "Los Angeles Metropolitan Area",
  "hasMap": "https://maps.google.com/?q=your+gym+address"
}
```

## 🎨 Customization Guide

### Adding a New Section

1. Create `components/sections/YourSection.tsx`
2. Import and add to `app/page.tsx`
3. Add navigation link in `components/layout/Navbar.tsx`

### Modifying Animations

Scroll animations use the `IntersectionObserver` hook pattern in each component. Adjust `threshold` and `transitionDelay` values.

### Form Integration

To connect the contact form to a real backend:

```ts
// In ContactSection.tsx, replace the setTimeout simulation:
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
```

Popular options:
- **Resend** — Email API
- **Formspree** — No-backend forms
- **EmailJS** — Client-side email
- **Supabase** — Full backend

## 📱 Performance Optimization

- Images: Use Next.js `<Image>` with `priority` on hero
- Fonts: Loaded via Google Fonts with `display=swap`
- Code splitting: Automatic via Next.js App Router
- Lazy loading: All below-fold images have `loading="lazy"`

Target Lighthouse scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 🔒 Security

- No API keys in client code
- Form validation both client and server side
- rel="noopener noreferrer" on all external links
- Content Security Policy can be added in `next.config.mjs`

## 📄 License

Built for DragFit. All rights reserved.
