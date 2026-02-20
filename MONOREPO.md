# Rayda Monorepo Structure

A monorepo containing four Rayda products built with React, Next.js, and Tailwind CSS.

## Directory Structure

```
rayda-monorepo/
├── apps/
│   ├── Rayda-Remote/         # Customer-facing application
│   │   ├── src/
│   │   │   ├── app/          # Next.js App Router pages
│   │   │   │   ├── onboard-device/   # Device onboarding flow
│   │   │   │   └── orders/           # Order management
│   │   │   ├── components/   # App-specific components
│   │   │   └── styles/       # App-specific styles
│   │   ├── public/           # Static assets
│   │   └── package.json
│   │
│   ├── Vendor-Portal/        # Vendor management application
│   │   ├── src/
│   │   │   ├── app/          # Next.js App Router pages
│   │   │   │   └── vendor-portal/    # Vendor portal pages
│   │   │   ├── components/   # App-specific components
│   │   │   └── styles/       # App-specific styles
│   │   ├── public/           # Static assets
│   │   └── package.json
│   │
│   ├── Rayda-Admin/          # Admin portal application
│   │   ├── src/
│   │   │   ├── app/          # Next.js App Router pages
│   │   │   ├── components/   # App-specific components
│   │   │   └── styles/       # App-specific styles
│   │   ├── public/           # Static assets
│   │   └── package.json
│   │
│   └── Remote-Employees/     # Employee portal application
│       ├── src/
│       │   ├── app/          # Next.js App Router pages
│       │   ├── components/   # App-specific components
│       │   └── styles/       # App-specific styles
│       ├── public/           # Static assets
│       └── package.json
│
├── packages/
│   └── shared/               # Shared code across all apps (future)
│       ├── components/       # Shared UI components
│       ├── design-tokens/    # Design system tokens
│       ├── utils/            # Shared utility functions
│       └── hooks/            # Shared React hooks
│
├── src/                      # Shared component library (Untitled UI)
│   ├── components/           # UI components used by all apps
│   │   ├── base/             # Basic components (Button, Input, etc.)
│   │   └── application/      # Complex patterns (Modal, Table, etc.)
│   ├── hooks/                # Custom React hooks
│   ├── styles/               # Global styles and theme
│   │   ├── globals.css       # Global styles
│   │   ├── theme.css         # Design tokens
│   │   └── typography.css    # Typography styles
│   └── utils/                # Utility functions
│
├── public/                   # Shared static assets
│
└── package.json              # Root package.json
```

## Applications

### Rayda Remote

The customer-facing application for device onboarding and order management.

| Property | Value |
|----------|-------|
| Port | 3001 |
| Package | `@rayda/rayda-remote` |
| Location | `apps/Rayda-Remote/` |
| Command | `npm run dev:remote` |

**Features:**
- Device onboarding flow
- Marketplace browsing
- Order management
- Custom device requests

### Vendor Portal

The vendor management application for handling orders, RFQs, and inventory.

| Property | Value |
|----------|-------|
| Port | 3002 |
| Package | `@rayda/vendor-portal` |
| Location | `apps/Vendor-Portal/` |
| Command | `npm run dev:vendor` |

**Features:**
- Order request management
- RFQ handling
- Inventory management
- Vendor dashboard

### Rayda Admin

The administrative portal for managing the platform.

| Property | Value |
|----------|-------|
| Port | 3003 |
| Package | `@rayda/rayda-admin` |
| Location | `apps/Rayda-Admin/` |
| Command | `npm run dev:admin` |

**Features:** (Coming soon)
- User management
- System configuration
- Analytics and reporting

### Remote Employees

The employee portal for remote device management.

| Property | Value |
|----------|-------|
| Port | 3004 |
| Package | `@rayda/remote-employees` |
| Location | `apps/Remote-Employees/` |
| Command | `npm run dev:employees` |

**Features:** (Coming soon)
- Employee device requests
- Device status tracking
- Support tickets

## Development Commands

### From Root Directory

```bash
# Run individual apps
npm run dev:remote      # http://localhost:3001
npm run dev:vendor      # http://localhost:3002
npm run dev:admin       # http://localhost:3003
npm run dev:employees   # http://localhost:3004

# Build all apps
npm run build

# Build individual app
npm run build:remote
npm run build:vendor
npm run build:admin
npm run build:employees

# Type check
npm run type-check
```

### From App Directory

```bash
cd apps/Rayda-Remote
npm run dev     # Runs on port 3001
npm run build   # Production build
```

## Shared Code

All apps share the component library in `src/`:

```typescript
// Import shared components (in any app)
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Modal } from "@/components/application/modals/modal";
import { cx } from "@/utils/cx";
```

The `@/` alias points to `src/` in all apps, allowing consistent imports.

## Tech Stack

- **Framework**: React 19 + Next.js 16
- **Styling**: Tailwind CSS v4.1
- **Components**: Untitled UI React + React Aria
- **Icons**: @untitledui/icons
- **Type Safety**: TypeScript 5.9
