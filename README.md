# Rayda Design System

A monorepo containing four Rayda products built with [Untitled UI React](https://www.untitledui.com/react).

## Apps

| App | Port | Command | Description |
|-----|------|---------|-------------|
| **Rayda Remote** | 3001 | `npm run dev:remote` | Device onboarding & marketplace |
| **Vendor Portal** | 3002 | `npm run dev:vendor` | Order & inventory management |
| **Rayda Admin** | 3003 | `npm run dev:admin` | Platform administration |
| **Remote Employees** | 3004 | `npm run dev:employees` | Employee device management |

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run an App

```bash
# Rayda Remote (Customer App)
npm run dev:remote
# Open http://localhost:3001

# Vendor Portal
npm run dev:vendor
# Open http://localhost:3002

# Rayda Admin
npm run dev:admin
# Open http://localhost:3003

# Remote Employees
npm run dev:employees
# Open http://localhost:3004
```

### 3. Build for Production

```bash
# Build all apps
npm run build

# Build specific app
npm run build:remote
npm run build:vendor
npm run build:admin
npm run build:employees
```

## Project Structure

```
rayda-monorepo/
├── apps/
│   ├── Rayda-Remote/     # Customer-facing portal
│   ├── Vendor-Portal/    # Vendor management portal
│   ├── Rayda-Admin/      # Admin portal
│   └── Remote-Employees/ # Employee portal
│
├── src/
│   ├── components/       # Shared UI components
│   │   ├── base/         # Button, Input, Select, etc.
│   │   └── application/  # Modal, Table, Tabs, etc.
│   ├── styles/           # Design tokens & theme
│   └── utils/            # Helper functions
│
├── packages/
│   └── shared/           # (Future) Shared package
│
└── public/               # Static assets
```

## Documentation

- **[DESIGN_HANDOFF.md](./DESIGN_HANDOFF.md)** - Guide for design team workflow
- **[CLAUDE.md](./CLAUDE.md)** - Component reference & coding standards
- **[MONOREPO.md](./MONOREPO.md)** - Technical monorepo details

## Tech Stack

- **Framework**: React 19 + Next.js 16
- **Styling**: Tailwind CSS v4
- **Components**: [Untitled UI React](https://www.untitledui.com/react) + React Aria
- **Icons**: [@untitledui/icons](https://www.untitledui.com/icons)
- **Type Safety**: TypeScript

## Design Team Workflow

1. Design components in Figma
2. Generate code using Claude + Figma MCP
3. Place code in appropriate folder
4. Preview in dev environment
5. Create PR for engineering review

See [DESIGN_HANDOFF.md](./DESIGN_HANDOFF.md) for detailed instructions.

---

## Untitled UI

This project is built on [Untitled UI React](https://www.untitledui.com/react), the world's largest collection of open-source React UI components.

**Resources:**
- [Untitled UI Figma](https://www.untitledui.com/figma) - Design system
- [Untitled UI Icons](https://www.untitledui.com/icons) - Icon library
- [Documentation](https://www.untitledui.com/react/docs/introduction)

**License:** MIT (open-source components)

> [!NOTE]
> This license applies only to the starter kit and to the components included in this open-source repository. [Untitled UI React PRO](https://www.untitledui.com/react) includes hundreds more advanced UI components and is subject to a separate [license agreement](https://www.untitledui.com/license).
