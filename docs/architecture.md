# Strategy Route Architecture

This app now treats route code as an orchestration layer, not a dumping ground for data, rendering, and business rules.

## Route Contract

- `page.tsx` should compose data, state, and route-local modules. Keep it small and readable.
- Use `StrategyDetailPageShell` for standard strategy detail pages. The overview route stays custom because its hero and card grid have materially different structure.
- Put theme and color-token changes in `app/config-layout/theme.ts`. Do not redefine primary or secondary styling inside individual routes.

## Ownership Rules

- Keep route-specific domain content next to the route.
- Use `*.data.ts` for long-lived copy, lists, and domain constants.
- Use `*.model.ts` for pure transforms, filters, matching rules, and stable key generation.
- Use `*.view.tsx` for route-local UI that is too specific to promote into `shared/components`.
- Move something into `shared/components` only after a second real consumer exists.

## Current Example

```text
app/product-strategy/hiring-tiers/
  page.tsx                # state + composition only
  hiring-tiers.data.ts    # domain dataset and explanatory copy
  hiring-tiers.model.ts   # pure search/filter/key helpers
  hiring-tiers.view.tsx   # accordion, search, legend, callouts
```

## Testing Rules

- Add unit tests for `*.model.ts` files whenever route behavior depends on filtering, matching, or ranking logic.
- Keep page tests focused on shell behavior and visible user interactions.
- Use integration tests to cover shared header, navigation, and route contracts across pages.
- Keep Playwright focused on browser-level route loading and critical user flows.

## Tradeoffs

- We keep large datasets colocated with the owning route instead of pushing them into a global data layer too early. That makes ownership obvious and reduces cross-feature coupling.
- We do not split tiny pages into extra files just to satisfy a pattern. The split is justified once a route mixes domain content, logic, and rendering in a way that slows safe edits.
- Stable UI keys should come from domain identity, not array indexes, so filtered and reordered views do not accidentally lose expansion state.

## Extension Checklist

When adding a new strategy detail route:

1. Start with `StrategyDetailPageShell` unless the route has a materially different layout contract.
2. Keep route-local data and helpers beside the route first.
3. Extract a `*.model.ts` file as soon as search, matching, sorting, or scoring logic appears.
4. Add at least one unit or page test before adding more content volume.
5. Promote UI or logic to `shared/` only when multiple routes genuinely depend on it.