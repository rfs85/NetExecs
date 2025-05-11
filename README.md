# NetExecs2025

## 🚀 Deploying to Cloudflare Pages

### Production Domain
Your production site will be available at: [https://www.netexec-tutorial.com/](https://www.netexec-tutorial.com/)

### 1. Build the Project
```
npm run build
```
This outputs the static site to `dist/public/`.

### 2. Deploy to Cloudflare Pages
- Go to [Cloudflare Pages](https://pages.cloudflare.com/)
- Create a new project and connect your GitHub repo
- **Build command:** `npm run build`
- **Output directory:** `dist/public`
- Add your custom domain (`www.netexec-tutorial.com`) in the Pages dashboard

#### Deploy via Wrangler CLI
```
wrangler pages deploy dist/public
```

### 3. Set Environment Variables
In the Cloudflare Pages dashboard, go to your project > Settings > Environment Variables and add:
- `DATABASE_URL` (your database connection string)

---

## 🛠️ Local Development

1. Copy `.env.example` to `.env` and fill in your local values:
```
DATABASE_URL=your_local_db_url
```
2. Start the dev server:
```
npm run dev
```

### Local API Functions
- Functions use environment variables from `.env` when running locally.
- For local Wrangler emulation, you can use a `functions/.dev.vars` file:
  ```
  DATABASE_URL=your_local_db_url
  ```

---

## 🧩 Project Structure
- `client/` — Frontend source (Vite, React)
- `functions/api/` — Cloudflare Pages Functions (API routes)
- `functions/storage.ts` — Shared DB logic, use `makeStorage(context.env.DATABASE_URL)`
- `shared/` — Shared types and schema

---

## ⚡ Optimization Tips for Cloudflare Pages
- Use `context.env` for all secrets in Functions
- Keep dependencies minimal in Functions
- Use Vite asset optimization for static files
- Monitor deployments and analytics in Cloudflare dashboard

---

## 📚 References
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Custom Domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [NetExec Tutorial](https://www.netexec-tutorial.com/) 