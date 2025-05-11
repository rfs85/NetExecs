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

### 4. Bind Cloudflare R2 Bucket
To use your R2 bucket named `R2_netexec` in Cloudflare Pages Functions:

#### a. Create the R2 bucket in your Cloudflare dashboard (if not already created).

#### b. Bind the R2 bucket in your project settings:
- Go to your Pages project > **Settings** > **Functions** > **R2 bindings**
- Add a binding:
  - **Binding name:** `R2_netexec`
  - **Bucket name:** `R2_netexec`

#### c. Access the R2 bucket in your Functions:
```js
export const onRequestGet = async (context) => {
  const r2 = context.env.R2_netexec; // R2 bucket binding
  // Example: List objects
  const list = await r2.list();
  // ...
};
```

#### d. Local Development with Wrangler
Add the binding to your `wrangler.toml` (if using Wrangler locally):
```toml
[[r2_buckets]]
binding = "R2_netexec"
bucket_name = "R2_netexec"
```

---

## 🏷️ Google Tag Gateway Integration (Cloudflare)

### How to Enable
1. Go to your Cloudflare dashboard and select your domain (`www.netexec-tutorial.com`).
2. Navigate to **Privacy & Compliance > Tag Gateway**.
3. Enable Tag Gateway and add your Google Tag Manager (GTM) or Google Analytics (GA4) tag ID (e.g., `GTM-XXXXXXX` or `G-XXXXXXXXXX`).
4. Save the configuration.

### Remove Direct Google Tag Scripts
- **Do NOT** include Google Tag Manager or Analytics `<script>` tags directly in your codebase. Cloudflare will inject the tag for you.

### Custom Events & Data Layer
- You can still push custom events to the data layer in your React code:
  ```js
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'custom_event',
    value: 123
  });
  ```

### Verification
- After deployment, use browser dev tools to check for the Google Tag (injected by Cloudflare).
- Check your Google Analytics/Tag Manager dashboard for real-time hits.

### References
- [Cloudflare Tag Gateway Docs](https://developers.cloudflare.com/privacy-gateway/tag-gateway/)
- [Cloudflare Blog: Introducing Tag Gateway](https://blog.cloudflare.com/tag-gateway/)

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
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Cloudflare Tag Gateway Docs](https://developers.cloudflare.com/privacy-gateway/tag-gateway/)
- [NetExec Tutorial](https://www.netexec-tutorial.com/)

---

## 📊 Event Tracking Examples (Google Tag Gateway)

You can track user interactions throughout the app using Google Tag Gateway. Here are common event patterns:

### Copy Command
```js
(window as any).dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer.push({
  event: 'copy_command',
  category: 'Command',
  action: 'Copy',
  label: commandText
});
```

### Save Command
```js
(window as any).dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer.push({
  event: 'save_command',
  category: 'Command',
  action: 'Save',
  label: commandName
});
```

### Navigation/Link Clicks
```js
(window as any).dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer.push({
  event: 'navigate',
  category: 'Navigation',
  action: 'Click',
  label: 'Command Generator' // or 'Modules', etc.
});
```

### Read Tutorial
```js
(window as any).dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer.push({
  event: 'read_tutorial',
  category: 'Tutorial',
  action: 'Read',
  label: tutorialTitle
});
```

### View Module
```js
(window as any).dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer.push({
  event: 'view_module',
  category: 'Module',
  action: 'View',
  label: moduleName
});
```

### External Resource Clicks
```js
(window as any).dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer.push({
  event: 'external_link',
  category: 'Resource',
  action: 'Click',
  label: resourceName
});
```

### Pagination
```js
(window as any).dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer.push({
  event: 'paginate',
  category: 'Pagination',
  action: 'Page Change',
  label: `Page ${pageNumber}`
});
```

### Form Submissions
```js
(window as any).dataLayer = (window as any).dataLayer || [];
(window as any).dataLayer.push({
  event: 'form_submit',
  category: 'Form',
  action: 'Submit',
  label: 'Contact Form'
});
```

--- 