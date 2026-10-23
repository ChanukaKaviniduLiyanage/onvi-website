# ONVI — Made to Be Seen

A responsive ONVI fashion website built with Next.js 14, React, TypeScript, GSAP and Montserrat. The homepage retains the editorial campaign direction; dedicated pages now support collection browsing and individual designs.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm run start
```

## Pages included

- `/` — editorial homepage and campaign sections
- `/collection` — full collection grid
- `/collection/textured-asymmetry-top` — Textured Asymmetry product page
- `/collection/botanical-flow-dress` — Botanical Flow Dress product page
- `/collection/linen-asymmetry-top` — Linen Asymmetry Top product page
- `/collection/waist-shirt-dress` — The Waist Shirt Dress product page
- `/story` — brand story and design principles
- `/journal` — editorial / styling notes page
- `/contact` — contact and product enquiry form layout
- `/faq` — ordering, sizing and delivery FAQs

## Updates in this build

- Hero text is visible by default. GSAP only adds a subtle vertical entrance motion, so failed or delayed animation cannot leave the headline invisible.
- The previous ambiguous thumbnail strip is now a purposeful newsletter sign-up section with a clear value proposition.
- Main navigation and footer links lead to dedicated pages.
- Each homepage product card opens a dedicated product page with price, sizes, details, enquiry CTA and related pieces.
- Shared header/footer components keep navigation consistent.
- Mobile layouts are included for the new pages.
- Montserrat remains the site-wide typeface.

## Before launch

- The newsletter currently displays a local demo success state; connect it to an email marketing service.
- The contact form is a frontend preview and does not send messages; connect it to an email/CRM endpoint.
- Confirm final product names, prices, sizes, availability, care instructions, delivery terms and return policy.
- Replace social profile links with ONVI's official accounts.
- Run `npm install`, `npm run build`, and test the website in desktop and mobile browsers before publishing.


## Latest visual/interaction fixes (October 2026)
- Added consistent black editorial frames to all four photos in the homepage journal collage.
- Set the journal phrase in Caveat as a signature-style accent while keeping Montserrat for the rest of the interface.
- Made the hero plus button functional: it cycles through four ONVI looks and updates the thumbnail, caption, and index.
- Moved the desktop scroll cue away from the primary Explore Collection CTA.
- Replaced the generic circular newsletter stamp with an editorial field-notes label.
- Enclosed product names and prices within the product cards beneath each image, with responsive mobile sizing.

## Latest interaction and layout refinement (October 2026)

- The hero's plus control now cycles the primary and secondary campaign photographs, thumbnail, caption and slide counter together; it is a real four-look switcher.
- Moved the scroll cue to the opposite side of the hero CTA on desktop and mobile so the two controls do not overlap.
- Added a fine light keyline around the black-framed journal photos so the black outlines remain legible against the black editorial section.
- Reworked the newsletter graphic into a distinctive editorial garment-label / field-note tag rather than a circular stamp.
- Wrapped the collection page's image, category, design name and price inside one bordered product card. The metadata remains inside the card on mobile too.

## Updating the collection (no CMS required)

All product listing content is maintained in one place: `src/lib/products.ts`. The collection grid, product detail pages, related-piece cards, and product metadata all read from this array.

To add or update a piece:

1. Put the product image in `public/images/` (use a short, descriptive filename, e.g. `model-new-top.jpg`).
2. Edit the matching object in `src/lib/products.ts`.
3. Update `slug` (URL-safe, unique, e.g. `new-everyday-top`), `id`, `name`, `price`, `image` (`/images/model-new-top.jpg`), `alt`, `category`, `description`, `details`, and `sizes`.
4. Save and restart the dev server if needed. The collection card and matching detail route are generated from this same product record.

The `slug` becomes the product URL at `/collection/<slug>`. Keep each slug unique and do not include `/collection/` in the slug itself. Images should be stored in `public/images/`, while the data file should reference them with a leading `/images/`.

## Recent collection fixes

- Product detail route parameters are awaited using the Next.js 16 route API, preventing valid collection-card links from failing because `params` is asynchronous.
- Collection listing images now have a desktop hover magnifier interaction. It is disabled on touch/mobile viewports so the mobile experience remains unchanged.
