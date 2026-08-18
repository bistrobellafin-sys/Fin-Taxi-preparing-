# Taksi Pro

Taksi Pro is an Arabic RTL study workspace for preparing drivers for Taksi Helsinki. It separates official public information from educational explanations and original practice questions, and links important claims to public Taksi Helsinki, Traficom, and Kela sources.

## Run & Operate

- `pnpm install` — install the pnpm workspace dependencies
- `BASE_PATH=/ pnpm --filter @workspace/mockup-sandbox run dev` — run the RTL study platform on the injected `PORT` (the preview command binds to `0.0.0.0` through Vite)
- `pnpm run typecheck` — full typecheck across all packages
- `PORT=5173 BASE_PATH=/ pnpm run build` — typecheck and build the frontend and API packages
- `pnpm --filter @workspace/api-server run dev` — run the API server separately when backend work is needed
- `pnpm --filter @workspace/db run push` — push DB schema changes in development only

## Setup

- `PORT` — supplied by the preview environment and required by the Vite configuration.
- `BASE_PATH` — required by the Vite configuration; use `/` for the standard preview.
- `DATABASE_URL` — required only for PostgreSQL/Drizzle and API work; the current study UI uses local static content and does not need it.

No API keys are required for the current frontend experience. The public-source links are opened directly in the browser.

## Stack

- pnpm workspaces, Node.js, TypeScript, Vite, React 19
- Arabic RTL frontend: Tailwind CSS 4, `tw-animate-css`, Lucide React
- API: Express 5
- Database: PostgreSQL + Drizzle ORM (schema scaffold)
- Python placeholder: WeasyPrint project setup for future document generation

## Product

The frontend lives in `artifacts/mockup-sandbox/src/App.tsx` and currently includes:

- Dashboard with progress metrics and a Taksi Helsinki learning path
- Four training modules with source badges and verification boundaries
- Original five-question practice session with immediate feedback
- Finnish-to-Arabic driver glossary with search
- Official source library with access dates and direct links
- Responsive mobile navigation and a light/dark presentation toggle

The current experience is a static study prototype. Progress, accounts, saved attempts, and content management are not persisted yet.

## Source policy

The platform uses public pages from Taksi Helsinki, Traficom, and Kela. It does not claim access to paid training, Extranet material, private Autocab procedures, or unpublished airport/port operating instructions. Training questions are clearly labelled as original practice questions, not real exam questions.

## Gotchas

- `vite.config.ts` intentionally requires both `PORT` and `BASE_PATH`; keep them in preview/build commands.
- The monorepo build output is under `artifacts/mockup-sandbox/dist` and `artifacts/api-server/dist`.
- Do not treat prices, operational procedures, or internal application instructions as current unless a public official source verifies them.
