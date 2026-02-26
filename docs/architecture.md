# Frontend Architecture Guide

This project follows a feature-first structure so code stays predictable as it grows.

## Layering Rules

Use this dependency direction:

1. `src/app` (bootstrap, providers, global wiring)
2. `src/pages` (route entry points only)
3. `src/features` (business screens and workflows)
4. `src/entities` (reusable domain models, if needed later)
5. `src/shared` (pure reusable UI/lib utilities)

Lower layers must not import upper layers.

## Folder Conventions

For every new feature, follow:

```text
src/features/<feature-name>/
  pages/        # Route-level feature page components
  components/   # Feature-scoped UI pieces
  model/        # Selectors, constants, state helpers
  lib/          # Pure utility functions
  styles/       # Feature styles
  index.js      # Public API of the feature
```

For route files in `src/pages`, keep them thin:

- No heavy business logic
- No data shaping
- Re-export feature page or compose small route shell only

## Naming and Import Rules

- Prefer `kebab-case` for feature folders: `product-detail`, `order-tracking`.
- Prefer `PascalCase` for React components.
- Keep import path casing exact (`@/constant`, not `@/Constant`) for Linux/CI safety.
- Use absolute alias imports (`@/...`) over deep relative imports.

## Migration Strategy

Migrate one area at a time:

1. Create a feature module
2. Move page logic into feature `pages/components/model/lib`
3. Keep old route path stable via thin wrapper in `src/pages`
4. Verify build/lint

This keeps refactor low-risk and shipping-friendly.

## Current Status

Route modules migrated to `src/features`:

- `about`
- `auth` (`login`, `register`, `forgot-password`)
- `cart`
- `checkout`
- `contact`
- `faq`
- `not-found`
- `order-success`
- `order-tracking`
- `product-detail`
- `shop`
- `user-dashboard`
- `wishlist`

Infrastructure migrated:

- `src/app/App.jsx`
- `src/app/bootstrap.jsx`

Compatibility wrappers are kept in `src/pages/**` and `src/App.jsx` / `src/main.jsx` so existing imports and route paths stay stable.
