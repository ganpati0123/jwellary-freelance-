# Open to See Your Future

## Run locally

- Install dependencies with `npm install`.
- Start the Replit preview with `npm run dev` (Vite serves on port 5000).
- Create a production build with `npm run build`.

## Project notes

- `/` is the link-in-bio landing page. The listed campaign and directory boxes open the crystal quiz before continuing to their destinations; quiz results recommend matching products.
- The original studio home remains available at `/pages/studio-home`; the studio overview, Private Readings, Soulpath Reset, Masterclass, Celebrity, and Library pages remain available at their existing routes.
- `/collections/*`, `/products/*`, `/pages/explore-with-intention`, `/pages/gemstones`, `/pages/studio`, `/blogs`, and `/links` remain available.
- The studio and shop share the existing footer. The studio home and shop product shelves use continuous, reduced-motion-aware horizontal product rails.
- Collection filters include sort, stock status, price range, color, crystal type, material, product type, crystal, and intention.
- The currency picker includes INR, AUD, CAD, CHF, EUR, GBP, HKD, SGD, THB, USD, AED, ZAR, and MYR. Display conversions are indicative estimates; catalog prices and checkout amounts are based in INR.
- The five-question crystal quiz does not auto-open on arrival. Clicking a listed homepage campaign or directory box opens it first; results recommend matching products, and continuing takes the visitor to the selected destination.
- The complete local catalog powers product, collection, search, wishlist, bag and checkout pages. Catalog products are intentionally orderable; verify physical stock before fulfillment.
- Checkout shows the supplied UPI QR, collects the buyer's UPI transaction reference and delivery details, and sends the order to WhatsApp (automatically when its connector is configured, otherwise as a prefilled message for the buyer to send). UPI payments are not verified automatically; the studio confirms them manually.
- Vercel checkout endpoints live under `api/checkout/`; the Replit workflow exposes the matching routes through the Vite API plugin.
