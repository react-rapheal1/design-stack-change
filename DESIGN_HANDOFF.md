# Design-to-Engineering Handoff Guide

This guide helps the design team collaborate on Rayda's four products and hand off work to engineering.

## Quick Start

### Running the Apps

Open Terminal and run one of these commands:

```bash
# Rayda Remote (device onboarding & marketplace)
npm run dev:remote
# Opens at: http://localhost:3001

# Vendor Portal (order & inventory management)
npm run dev:vendor
# Opens at: http://localhost:3002

# Rayda Admin (platform administration)
npm run dev:admin
# Opens at: http://localhost:3003

# Remote Employees (employee device management)
npm run dev:employees
# Opens at: http://localhost:3004
```

### Which App Should I Work On?

| App | Who Uses It | What It Does |
|-----|-------------|--------------|
| **Rayda Remote** | Customers/Employees | Device onboarding, marketplace browsing, order placement |
| **Vendor Portal** | Vendors/Suppliers | Order management, RFQ responses, inventory tracking |
| **Rayda Admin** | Internal Team | User management, system config, analytics |
| **Remote Employees** | Employees | Device requests, status tracking, support |

---

## Folder Structure (Simplified)

```
rayda-monorepo/
├── apps/
│   ├── Rayda-Remote/     # Customer-facing pages
│   ├── Vendor-Portal/    # Vendor management pages
│   ├── Rayda-Admin/      # Admin portal pages
│   └── Remote-Employees/ # Employee portal pages
│
├── src/
│   ├── components/       # SHARED UI components (Button, Input, etc.)
│   │   ├── base/         # Basic components
│   │   └── application/  # Complex patterns
│   └── styles/           # Design tokens & theme
│
└── public/
    └── devices/          # Product images
```

### Where to Find Things

| Looking For | Location |
|-------------|----------|
| Shared components (Button, Input, Select) | `src/components/base/` |
| Complex UI patterns (Modal, Table, Tabs) | `src/components/application/` |
| Design tokens (colors, spacing) | `src/styles/theme.css` |
| Rayda Remote pages | `apps/Rayda-Remote/src/app/` |
| Vendor Portal pages | `apps/Vendor-Portal/src/app/` |
| Rayda Admin pages | `apps/Rayda-Admin/src/app/` |
| Remote Employees pages | `apps/Remote-Employees/src/app/` |

---

## Working with Claude & Figma MCP

### Creating New Components

1. **Design in Figma** - Create your component design
2. **Generate code with Claude** - Ask Claude to implement the component
3. **Place the code**:
   - Shared component? Put in `src/components/base/`
   - App-specific? Put in `apps/[app-name]/src/components/`
4. **Preview** - Run the app to see your component

### Component Naming Rules

| Type | File Name | Component Name |
|------|-----------|----------------|
| Files | `kebab-case.tsx` | - |
| Components | - | `PascalCase` |
| Props | - | `ComponentNameProps` |

**Example:**
- File: `feature-card.tsx`
- Component: `FeatureCard`
- Props: `FeatureCardProps`

---

## Component Checklist

Before handing off to engineering, ensure:

- [ ] Component works in all four apps (if shared)
- [ ] All size variants work (`sm`, `md`, `lg`)
- [ ] States work correctly (hover, disabled, loading)
- [ ] Colors follow the design system
- [ ] Responsive on mobile and desktop
- [ ] Accessible (keyboard navigation, screen readers)

---

## Common Tasks

### Adding a New Page

1. Create a folder in `apps/[app-name]/src/app/[page-name]/`
2. Add a `page.tsx` file inside
3. The URL will be `localhost:[port]/[page-name]`

**Example:** Creating `/settings` page in Rayda Remote:
```
apps/Rayda-Remote/src/app/settings/page.tsx
→ http://localhost:3001/settings
```

### Adding a New Shared Component

1. Create file in `src/components/base/[component-name].tsx`
2. Export from the file
3. Import in any app with `import { ComponentName } from "@/components/base/component-name"`

### Modifying Design Tokens

Edit `src/styles/theme.css` to change:
- Colors (`--color-brand-*`)
- Spacing (`--spacing`)
- Typography (`--font-*`)
- Shadows (`--shadow-*`)

---

## Handing Off to Engineering

### What to Include in Your PR

1. **Summary** - What was built/changed
2. **Screenshots** - Before/after if UI change
3. **Testing notes** - How to verify it works
4. **Files changed** - List of modified files

### PR Template

```markdown
## Summary
[Brief description of what this adds/changes]

## Type
- [ ] New component
- [ ] New page
- [ ] Bug fix
- [ ] Design update

## Apps Affected
- [ ] Rayda Remote
- [ ] Vendor Portal
- [ ] Rayda Admin
- [ ] Remote Employees

## Screenshots
[Add screenshots here]

## How to Test
1. Run `npm run dev:[app]`
2. Navigate to [URL]
3. Verify [expected behavior]
```

---

## Troubleshooting

### App won't start
```bash
# Try reinstalling dependencies
npm install

# Then run again
npm run dev:remote
```

### Changes not showing
1. Save the file
2. Check the terminal for errors
3. Hard refresh browser (Cmd+Shift+R)

### Port already in use
```bash
# Kill the process using the port
lsof -ti:3001 | xargs kill -9

# Then run again
npm run dev:remote
```

---

## Getting Help

- **Code questions**: Ask Claude
- **Design system**: Check `CLAUDE.md`
- **Component examples**: Browse `src/components/`
