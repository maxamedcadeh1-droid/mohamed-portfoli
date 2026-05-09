# Mohamed Portfolio

A cinematic Vite + React portfolio website ready for a fresh GitHub and Vercel deployment.

## Local development

**Prerequisites:** Node.js 18+ and npm

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the app at `http://localhost:3000`

## Production build

```bash
npm run build
```

## Vercel deployment

1. Create a new GitHub repository and push this project.
2. Connect the repo to Vercel.
3. Use the build command:
   ```bash
   npm run vercel-build
   ```
4. Set the output directory to `dist` if Vercel asks.

## Notes

- The project includes `vercel.json` for a clean static build deployment.
- `.gitignore` excludes `dist/`, `node_modules/`, and `.env*`.
- The app uses hash/anchor navigation and does not require server-side routing.
