# Vani Kabir Studio storefront

## Run locally

- Install dependencies with `npm install`.
- Start the Replit preview with `npm run dev` (Vite serves on port 5000).
- Create a production build with `npm run build`.

## Project notes

- The home page recreates the Vani Kabir Studio bio-link layout with the two campaign cards and its 12 original destinations.
- The existing five-question crystal quiz opens as a first-visit popup on the home page. Visitors can skip it, dismiss it with Escape or the backdrop, and reopen it from the home-page button.
- Collection, product, checkout, link-directory, masterclass, and quiz routes are handled by the client app.
- The storefront uses local demo catalog data. Supabase and Razorpay code paths are optional and need project configuration; no live inventory or booking data is bundled.
- The homepage intentionally omits the shared footer; other routes include it.
