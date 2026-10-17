# Muhammad Abdullah Rasheed — Portfolio

Source for [abdullahrasheed.tech](https://abdullahrasheed.tech): a React, TypeScript, Vite, and Tailwind CSS v4 site with Motion animations, based on the "AI Engineer Portfolio Website" Figma Make template. It includes an AI assistant chat widget (`@n8n/chat`) backed by an n8n RAG workflow.

- **Content:** edit `client/src/data/portfolio.ts`. The source of truth for its facts is `content/`.
- **Resume:** `client/public/resume.pdf`, linked from the navbar and hero.
- **Chat widget:** `client/src/app/components/ChatWidget.tsx`, themed in `client/src/styles/chat-widget.css`.

## Run locally

```sh
npm install --prefix client
cp client/.env.example client/.env.local   # then set VITE_N8N_CHAT_URL
npm run dev
```

The development site runs at `http://localhost:5173`. Chat messages from localhost need `http://localhost:5173` in the n8n Chat Trigger's **Allowed Origins (CORS)**.

Build for static hosting with `npm run build`; the output is written to `client/dist`. Preview the production build with `npm run preview`, and type-check with `npm run typecheck --prefix client`.

## Environment

| Variable | Purpose |
| --- | --- |
| `VITE_N8N_CHAT_URL` | n8n Chat Trigger production webhook URL. Without it the chat widget is not rendered. Vite inlines it at build time, so set it in the hosting dashboard before building. |

## Note on `client/vendor/n8n-design-system-stub`

`@n8n/chat` depends on `@n8n/design-system`, whose dependency tree includes native modules that need a C++ toolchain to install. The chat widget already ships the design system pre-bundled, so `client/package.json` points `@n8n/design-system` at this empty local stub to keep installs fast and portable.
