# Deployment Instructions

This portfolio is a static React application built with Vite. It can be deployed to any static site host.

## Recommended: Vercel

1. **Install Vercel CLI** (Optional, or use web dashboard)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   Run the following command in the project root:
   ```bash
   vercel
   ```
   - Follow the prompts.
   - Default settings are correct (`dist` as output directory).

## Alternative: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy `dist` folder**
   - Drag and drop the `dist` folder to Netlify Drop.
   - OR use Netlify CLI: `netlify deploy --prod`

## Manual / Other

1. Run `npm run build`
2. Serve the generated `dist` folder using any static server (Nginx, Apache, S3).
