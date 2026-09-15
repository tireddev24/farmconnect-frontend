# FarmConnect Frontend

FarmConnect is a platform that connects farmers and buyers. This repository is the React single-page application that provides the web interface — dashboards and workflows for Farmers, Buyers, and Admins, backed by the [FarmConnect API](../FarmConBackened).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| UI | Chakra UI v3, Tailwind CSS v4 |
| Routing | React Router v7 |
| State management | Zustand |
| HTTP client | Axios (with a `fetch`-based `secureFetch` helper alongside it) |
| Charts | Recharts / Chakra Charts |
| Icons / motion | Lucide React, React Icons, Framer Motion |

## Features

- **Role-aware routing** — `ProtectedRoute` and `RoleRoute` guard routes based on authentication state and user role, with dedicated route trees for **Buyer**, **Farmer**, and **Admin**
- **Buyer flows** — browse products, view product details, checkout, order history, payment, profile
- **Farmer flows** — dashboard, product listing & management, orders, profile
- **Admin flows** — user management, product moderation, verifications, support tickets, system audit logs
- **Authentication** — login/register, with an in-memory access token (Zustand) and automatic session restoration via a silent refresh call on app load
- **Automatic token refresh** — both the Axios instance and the `secureFetch` fetch wrapper intercept `401` responses, transparently call the refresh endpoint, and retry the original request once

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- A running instance of the [FarmConnect backend API](../FarmConBackened)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/tireddev24/farmconnect-frontend.git
   cd farmconnect-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** — create a `.env` file in the project root:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```
   Point this at wherever your local or deployed instance of the FarmConnect backend is running. All API calls (`src/api/axios.ts`, `src/api/auth.ts`, and the app-wide silent refresh in `App.tsx`) read from this single value, so it's the only thing you need to change to target a different backend environment.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Available Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server with hot module reload |
| `npm run build` | Type-check (`tsc -b`) and produce a production build |
| `npm run preview` | Serve the production build locally for a final check |
| `npm run lint` | Run ESLint across the project |


## Project Structure

```
src/
├── api/            # Axios instance, secureFetch helper, auth API calls
├── components/     # Shared UI components, route guards (ProtectedRoute, RoleRoute)
├── context/        # React context providers (e.g. AuthContext)
├── hooks/          # Custom hooks
├── lib/            # Shared utilities
├── pages/
│   ├── Admin/      # Admin dashboard, user management, moderation, logs
│   ├── Auth/       # Login, Register
│   ├── Buyer/      # Buyer dashboard, product browsing, checkout, orders, profile
│   └── Farmer/     # Farmer dashboard, product listing, orders, profile
├── store/          # Zustand stores (auth state, access token)
├── types/          # Shared TypeScript types
├── App.tsx         # Route definitions, session initialization
└── main.tsx        # App entry point
```

## Deploying

This is a static Vite build (`npm run build` outputs to `dist/`), so it can be hosted on any static hosting provider (Vercel, Netlify, static blob storage behind a CDN, etc.). Whichever host you choose, make sure `VITE_API_URL` is set as a build-time environment variable there, since Vite inlines `import.meta.env.*` values at build time — changing it after the build is deployed requires a rebuild.
