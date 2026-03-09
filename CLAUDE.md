## Product Overview

**Rayda** is a B2B device procurement and management platform. It supports the full lifecycle of device sourcing and fulfillment across multiple internal products:

- **Rayda Remote** for customer onboarding, marketplace browsing, and order management
- **Vendor Portal** for supplier order intake and RFQ response workflows
- **Rayda Admin** for internal RFQ review and curation
- **Remote Employees** for employee-facing order confirmation and profile flows

## Current Runtime Model

This repository is now a **single Next.js application**.

- There is **one server only**
- All products are mounted under route prefixes inside the same app

### Route Prefixes

- `/rayda-admin`
- `/rayda-remote`
- `/vendor-portal`
- `/remote-employees`

### Current Route Map

- `/rayda-admin`
- `/rayda-admin/rfq-management`
- `/rayda-admin/rfq-management/[id]`
- `/rayda-remote`
- `/rayda-remote/dashboard`
- `/rayda-remote/employees`
- `/rayda-remote/equipment`
- `/rayda-remote/onboard-device`
- `/rayda-remote/onboard-device/marketplace`
- `/rayda-remote/onboarding`
- `/rayda-remote/onboarding/goal-1`
- `/rayda-remote/orders`
- `/rayda-remote/orders/[orderId]`
- `/rayda-remote/signup`
- `/rayda-remote/signup/check-email`
- `/vendor-portal`
- `/remote-employees`
- `/remote-employees/overview`
- `/remote-employees/order-summary`

The canonical route definitions live in [src/lib/app-routes.ts](./src/lib/app-routes.ts).

## Development Commands

```bash
# Run the single app
npm run dev

# Production build
npm run build
npm run start

# Quality checks
npm run lint
npm run type-check

# Formatting
npm run format
npm run format:check
```

## Project Structure

### App Router

`src/app` contains thin route files only.

Each route file should stay minimal and simply export a container entry:

```tsx
export { default } from "@/containers/RaydaRemote/Marketplace";
```

Route segments stay URL-oriented and lowercase:

```text
src/app/rayda-remote/onboard-device/marketplace/page.tsx
```

### Container Architecture

All product code lives in `src/containers`.

Top-level product folders are **PascalCase**:

```text
src/containers/
  RaydaAdmin/
  RaydaRemote/
  VendorPortal/
  RemoteEmployees/
  Home/
```

Each feature folder is also **PascalCase**:

```text
src/containers/RaydaRemote/
  Dashboard/
  Employees/
  Equipment/
  Marketplace/
  OnboardDevice/
  Onboarding/
  OnboardingGoalOne/
  OrderDetails/
  Orders/
  Signup/
  Shared/
```

Feature roots should stay clean. Internal files belong in subfolders such as:

```text
Feature/
  index.tsx
  FeaturePage.tsx
  components/
  hooks/
  data/
  types/
  utils/
```

Not every feature needs all subfolders, but **do not dump many subcomponents into the feature root**.

### Shared Code

Shared cross-product code belongs in:

- `src/components`
- `src/hooks`
- `src/lib`
- `src/providers`
- `src/styles`
- `src/utils`

Do not copy shared primitives into product containers unless they are truly feature-specific.

## Hard Rules

### 1. Do Not Reintroduce Old Structures

Do **not** create or restore:

- `apps/`
- `packages/`
- `products/`
- `legacy/`
- `modules/`

The project is not a multi-app runtime anymore.

### 2. Keep Route Files Thin

App route files in `src/app` should not contain business logic, layout logic, or feature composition beyond a direct container export.

### 3. Container Internals Must Be Modular

Within `src/containers`, split feature code into:

- `components/` for feature-local React UI pieces
- `hooks/` for feature-local hooks
- `data/` for seeded data, constants, and datasets
- `types/` for feature-local types when needed
- `utils/` for feature-local helpers when needed

If a feature grows, organize it further instead of keeping dozens of sibling files at the feature root.

### 4. File Length Limit

No file in the enforced architecture layers should exceed **150 lines**.

The current linted targets are:

- `src/app`
- `src/containers`
- `src/hooks`
- `src/lib`
- `src/providers`
- `src/utils`

This is enforced in [eslint.config.mjs](./eslint.config.mjs) with `max-lines`.

Do not bypass this rule by compressing JSX or minifying code into unreadable single-line blocks. The correct fix is to split code into smaller files.

### 5. Use Prettier Normally

Code should remain properly formatted with Prettier.

If formatting pushes a file over the 150-line cap, split the file. Do not fight the formatter.

## Naming Conventions

### Folders

- Route folders in `src/app`: lowercase, URL-based
- Product and feature folders in `src/containers`: **PascalCase**
- Internal organization folders: `components`, `hooks`, `data`, `types`, `utils`

### Files

- Container React component files: **PascalCase**
- Hook files: `useSomething.ts` or `useSomething.tsx`
- Plain data/helper/type files: use the local feature convention consistently
- Route files: `page.tsx`
- Feature entry files: `index.tsx`

### Imports

Prefer direct feature-local imports over broad barrel indirection when working inside a feature.

Use the feature root `index.tsx` as the public entry consumed by `src/app`.

## React Aria Conventions

All imports from `react-aria-components` should use the `Aria*` alias pattern:

```ts
import { Button as AriaButton, TextField as AriaTextField } from "react-aria-components";
```

This avoids collisions with our own base components and keeps the distinction obvious.

## Styling Rules

### Shared Styling

All products share the same root styling system. Keep shared styling in:

- `src/styles/globals.css`
- `src/styles/theme.css`
- `src/styles/typography.css`

Do not create per-product global CSS entrypoints.

### Page Padding

Use the shared `page-px` utility for standard page-level horizontal padding unless the page is intentionally using a sidebar shell with its own layout rules.

### Theme Work

If changing brand colors, update the brand token scale in `src/styles/theme.css` instead of hardcoding one-off replacements.

## Container Authoring Pattern

When adding a new feature:

1. Create the feature under the correct PascalCase product folder in `src/containers`
2. Keep `index.tsx` as the public entry
3. Move local UI pieces into `components/`
4. Move local hooks into `hooks/`
5. Keep the corresponding `src/app/.../page.tsx` file as a thin re-export
6. Run `npm run lint`, `npm run type-check`, and `npm run build`

Example:

```text
src/containers/RaydaRemote/Marketplace/
  index.tsx
  components/
    MarketplacePageContent.tsx
    MarketplacePageHeader.tsx
    ProductCard.tsx
```

```tsx
// src/app/rayda-remote/onboard-device/marketplace/page.tsx
export { default } from "@/containers/RaydaRemote/Marketplace";
```

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- React Aria Components
- Untitled UI icons and country flags

## Core Utilities

- `@/utils/cx`
- `@/utils/sortCx`
- `@/utils/is-react-component`
- `@/hooks/use-breakpoint`

## Guidance For Future Changes

- Preserve the single-app architecture
- Preserve the route-prefix model
- Preserve PascalCase container folders
- Preserve thin App Router pages
- Preserve shared components and shared styling
- Prefer real modularization over shortcuts
- If a file grows, split it before it becomes a problem
