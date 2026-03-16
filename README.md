# Rayda Design UI

A single Next.js application powering four Rayda products, built with [Untitled UI React](https://www.untitledui.com/react) and React Aria Components.

## Products

| Product              | Route Prefix        | Description                                    |
| -------------------- | ------------------- | ---------------------------------------------- |
| **Rayda Remote**     | `/rayda-remote`     | Customer onboarding, marketplace & orders      |
| **Vendor Portal**    | `/vendor-portal`    | Supplier order intake & RFQ response workflows |
| **Rayda Admin**      | `/rayda-admin`      | Internal RFQ review & curation                 |
| **Remote Employees** | `/remote-employees` | Employee order confirmation & profile flows    |

All products run on **one server** under route prefixes inside the same app.

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Install & Run

```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Quality Checks

```bash
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run format        # Prettier (write)
npm run format:check  # Prettier (check only)
```

## Project Structure

```
design-ui/
├── src/
│   ├── app/                    # Next.js App Router (thin route files only)
│   │   ├── rayda-admin/
│   │   ├── rayda-remote/
│   │   ├── vendor-portal/
│   │   ├── remote-employees/
│   │   └── layout.tsx
│   │
│   ├── containers/             # All product & feature code (PascalCase)
│   │   ├── Home/
│   │   ├── RaydaAdmin/
│   │   ├── RaydaRemote/
│   │   ├── VendorPortal/
│   │   └── RemoteEmployees/
│   │
│   ├── components/             # Shared UI component library
│   │   ├── application/        # Modal, Table, Tabs, Pagination, etc.
│   │   ├── base/               # Button, Input, Select, Checkbox, etc.
│   │   ├── foundations/        # Logo, FeaturedIcon, ratings, etc.
│   │   ├── marketing/          # Marketing header navigation
│   │   └── shared-assets/      # Illustrations, patterns, QR code
│   │
│   ├── hooks/                  # Shared React hooks
│   ├── lib/                    # Route definitions & utilities
│   ├── providers/              # Context providers (routing, theme)
│   ├── styles/                 # Global CSS, theme tokens, typography
│   └── utils/                  # Shared helper functions
│
├── public/                     # Static assets
├── .github/workflows/          # CI/CD pipeline
├── Dockerfile                  # Multi-stage Docker build
├── next.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

### Route Files

Each `src/app/.../page.tsx` is a thin re-export from a container:

```tsx
export { default } from "@/containers/RaydaRemote/Marketplace";
```

### Container Architecture

Feature code lives in `src/containers/{Product}/{Feature}/` with internal organization:

```
Feature/
  index.tsx          # Public entry point
  FeaturePage.tsx    # Main page component
  components/        # Feature-local UI pieces
  hooks/             # Feature-local hooks
  data/              # Constants, datasets
  types/             # Feature-local types
  utils/             # Feature-local helpers
```

## Route Map

### Rayda Remote

- `/rayda-remote` — Landing
- `/rayda-remote/dashboard` — Dashboard
- `/rayda-remote/employees` — Employee management
- `/rayda-remote/equipment` — Equipment inventory
- `/rayda-remote/onboard-device` — Device onboarding
- `/rayda-remote/onboard-device/marketplace` — Marketplace
- `/rayda-remote/onboarding` — Onboarding flow
- `/rayda-remote/onboarding/goal-1` — Onboarding goal
- `/rayda-remote/orders` — Orders & custom device requests
- `/rayda-remote/orders/[orderId]` — Order details
- `/rayda-remote/signup` — Signup
- `/rayda-remote/signup/check-email` — Email verification

### Rayda Admin

- `/rayda-admin` — Landing
- `/rayda-admin/rfq-management` — RFQ management dashboard
- `/rayda-admin/rfq-management/[id]` — RFQ detail & curation

### Vendor Portal

- `/vendor-portal` — Vendor dashboard, RFQs & order requests

### Remote Employees

- `/remote-employees` — Landing
- `/remote-employees/overview` — Employee profile & assets
- `/remote-employees/order-summary` — Order confirmation

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** [Untitled UI React](https://www.untitledui.com/react) + [React Aria Components](https://react-spectrum.adobe.com/react-aria/)
- **Icons:** [@untitledui/icons](https://www.untitledui.com/icons) + [@untitledui/country-flags](https://www.untitledui.com/icons)
- **Animation:** Motion
- **Theming:** next-themes

## Deployment

The app is containerized with Docker and deployed via a GitHub Actions CI/CD pipeline:

1. **Build** — Docker multi-stage build (Node 22 build → Alpine runtime)
2. **Push** — Image pushed to AWS ECR
3. **Deploy** — Triggered via AWS SSM on EC2
4. **Notify** — Pipeline status reported to Slack

The pipeline runs on every push to `main`.

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** — Architecture rules, coding standards & contributor guide

---

Built on [Untitled UI React](https://www.untitledui.com/react). Icon library: [Untitled UI Icons](https://www.untitledui.com/icons). Design system: [Untitled UI Figma](https://www.untitledui.com/figma).
