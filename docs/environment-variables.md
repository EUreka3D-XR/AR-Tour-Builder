# Environment Variables

This project supports two ways of configuring the API base URL:

1. **Build-time** variables via `.env` files (standard Vite behavior)
2. **Runtime** variables via `config.js` (injected at deploy time)

Runtime variables take priority over build-time variables.

## How It Works

The config module at `src/config/base-url/config.js` resolves the API base URL using this fallback chain:

```
window.RUNTIME_CONFIG.VITE_API_BASE_URL   (runtime, highest priority)
        ↓ if undefined
import.meta.env.VITE_API_BASE_URL         (build-time, from .env files)
        ↓ if undefined
""                                         (empty string fallback)
```

This means:
- If `config.js` is present and sets `RUNTIME_CONFIG`, that value is used.
- If `config.js` is absent or doesn't set the variable, the build-time `.env` value is used.

## For Local Development

### Using `.env.local` (build-time)

Create or edit `.env.local` in the project root (this file is gitignored):

```
VITE_API_BASE_URL=http://localhost:8000
```

Then run `npm run dev`. Changes to `.env.local` require a dev server restart.

See `.env.example` for reference.

### Using `public/config.js` (runtime)

You can also create `public/config.js` (this file is gitignored):

```js
window.RUNTIME_CONFIG = {
  VITE_API_BASE_URL: "http://localhost:8000",
};
```

Since this is a runtime config, changes only require a **browser refresh** (no dev server restart). This makes it convenient for quickly switching between different backends.

### Switching Between Backends

If you need to alternate between a local backend and a remote one:

1. Keep your default in `.env.local`
2. Use `public/config.js` to override it when needed - just edit the URL and refresh the browser

Since `config.js` takes priority, you can toggle between environments without restarting the dev server.

## For DevOps / Production Deployment

The goal of runtime config is to build the frontend **once** and deploy it to multiple environments (staging, production, etc.) by injecting the correct API URL at deploy time.

### Files Involved

| File | Purpose | Committed to git |
|------|---------|-----------------|
| `public/config.template.js` | Template with placeholder variables | Yes |
| `public/config.js` | Actual runtime config (generated at deploy time) | No (gitignored) |

### Steps

1. **Build the app** normally:

   ```bash
   npm run build
   ```

2. **Generate `config.js` from the template** using `envsubst` (or any equivalent tool):

   ```bash
   export VITE_API_BASE_URL="https://api.production.example.com"
   envsubst < config.template.js > dist/config.js
   ```

   The template (`public/config.template.js`) looks like this:

   ```js
   window.RUNTIME_CONFIG = {
     VITE_API_BASE_URL: "$VITE_API_BASE_URL",
   };
   ```

   After `envsubst`, the generated `config.js` will contain:

   ```js
   window.RUNTIME_CONFIG = {
     VITE_API_BASE_URL: "https://api.production.example.com",
   };
   ```

3. **Serve `config.js` alongside the built app.** It is loaded by `index.html` via:

   ```html
   <script src="/config.js"></script>
   ```

   This script runs before the app bundle, so `window.RUNTIME_CONFIG` is available when the app initializes.

### Docker Example

In a Docker entrypoint script:

```bash
#!/bin/sh
envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js
nginx -g "daemon off;"
```

Pass the environment variable when running the container:

```bash
docker run -e VITE_API_BASE_URL=https://api.production.example.com myapp
```

## Adding New Environment Variables

To add a new runtime-configurable variable:

1. Add it to `public/config.template.js` with a `$PLACEHOLDER`
2. Add it to `src/config/base-url/config.js` with the same fallback pattern
3. Add a build-time default to `.env.example`
