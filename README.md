Field of Command Marketing Site

Marketing landing page for the operational WWII RTS "Field of Command".
Hosted on Cloudflare Pages with Cloudflare Functions for the backend.

Project Structure

index.html: The main single-page application.

functions/api/submit.js: Serverless function handling email signups.

images/: Stores static assets (create this folder yourself).

Deployment

Hosting: Deployed via Cloudflare Pages (connect to this GitHub repo).

Database: Uses Cloudflare KV.

Namespace Name: newsletter_list

Binding Name: NEWSLETTER_DB (Set this in Cloudflare Settings > Functions).