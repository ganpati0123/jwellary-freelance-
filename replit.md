# Open to See Your Future

## Run locally

- Install dependencies with `npm install`.
- Start the Replit preview with `npm run dev` (Vite serves on port 5000).
- Create a production build with `npm run build`.

## Project notes

- `/` is the link-in-bio landing page. Its Divine Diwali banner opens the matching collection; the featured masterclass banner opens the full store at `/shop`. The links below those banners continue to their individual destinations.
- The original studio home remains available at `/pages/studio-home`; the studio overview, Private Readings, Soulpath Reset, Masterclass, Celebrity, and Library pages remain available at their existing routes.
- `/collections/*`, `/products/*`, `/pages/explore-with-intention`, `/pages/gemstones`, `/pages/studio`, `/blogs`, and `/links` remain available.
- The studio and shop share the existing footer. The studio home and shop product shelves use continuous, reduced-motion-aware horizontal product rails.
- Collection filters include sort, stock status, price range, color, crystal type, material, product type, crystal, and intention.
- The currency picker includes INR, AUD, CAD, CHF, EUR, GBP, HKD, SGD, THB, USD, AED, ZAR, and MYR. Display conversions are indicative estimates; catalog prices and checkout amounts are based in INR.
- The five-question crystal quiz does not auto-open on arrival. Clicking a listed homepage campaign or directory box opens it first; results recommend matching products, and continuing takes the visitor to the selected destination.
- Every catalog item has its own `/products/:id` detail and buying page, with related products, wishlist, quantity, add-to-bag and buy-now actions.
- The catalog is local preview data. Without Supabase and Razorpay configuration, checkout is an explicitly labelled preview and does not take payment or save delivery details. Configure the optional providers before accepting live orders.
