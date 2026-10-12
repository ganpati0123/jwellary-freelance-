# Open To See Your Future storefront

## Run locally

- Install dependencies with `npm install`.
- Start the Replit preview with `npm run dev` (Vite serves on port 5000).
- Create a production build with `npm run build`.

## Project notes

- The home page follows the supplied centered bio-link reference, with two campaign cards and 12 destinations that lead to routes within this storefront.
- The five-question quiz opens on a first visit to any route in a browser tab. Visitors can dismiss it with the close button, Escape or the backdrop, and reopen it from the store header or the landing-page link.
- Collection, product-detail, checkout, link-directory, intention guide, masterclass, and quiz pages are handled by the client app.
- The catalog is local preview data. Without Supabase and Razorpay configuration, checkout is an explicitly labelled preview and does not take payment or save delivery details. Configure the optional providers before accepting live orders.
- The homepage intentionally omits the shared footer; other routes include it.
