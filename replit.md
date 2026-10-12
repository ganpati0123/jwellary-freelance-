# Vani Kabir Studio storefront

## Run locally

- Install dependencies with `npm install`.
- Start the Replit preview with `npm run dev` (Vite serves on port 5000).
- Create a production build with `npm run build`.

## Project notes

- The home page is a storefront inspired by the supplied Vani Kabir Studio references, with product shelves, intention shortcuts, Rare Energies and Lightcoding features, gemstones, studio, journal, and social sections.
- `/links` remains the separate link directory. `/pages/explore-with-intention`, `/pages/gemstones`, `/pages/studio`, `/blogs`, `/collections/*`, and `/products/*` are storefront routes.
- Collection filters include sort, stock status, price range, color, crystal type, material, product type, crystal, and intention.
- The currency picker includes INR, AUD, CAD, CHF, EUR, GBP, HKD, SGD, THB, USD, AED, ZAR, and MYR. Display conversions are indicative estimates; catalog prices and checkout amounts are based in INR.
- The five-question crystal quiz is available from the store header and quiz route; it does not automatically cover the first page view.
- The catalog is local preview data. Without Supabase and Razorpay configuration, checkout is an explicitly labelled preview and does not take payment or save delivery details. Configure the optional providers before accepting live orders.
