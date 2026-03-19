# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A pixel-faithful clone of **Toss Securities WTS** (Web Trading System, `wts.tossinvest.com`) — a full-featured browser-based stock trading platform for Korean and US equities. Prices and order flow are fully simulated by MSW; no real brokerage connection exists.

## Commands

```bash
pnpm dev          # start Next.js dev server (MSW activates automatically in dev)
pnpm build        # production build
pnpm type-check   # TypeScript — run before committing
pnpm lint         # ESLint
pnpm msw:init     # re-copy the MSW service worker to public/ if it goes missing
```

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | `motion` (Framer Motion rebranded) |
| Mock data | MSW 2 (browser service worker) |
| State | Zustand 5 with `persist` middleware |
| Server state | TanStack Query 5 (5 s stale / 5 s poll interval) |
| Charts | `lightweight-charts` v5 (TradingView open-source) |
| Icons | Lucide React |
| UI components | shadcn/ui (base-ui primitives) |
| Package manager | pnpm |

## Architecture

### MSW data layer
MSW is the entire backend. In `dev` mode `src/app/providers.tsx` dynamically imports `src/mocks/browser.ts` and starts the service worker before rendering anything (the app renders `null` until the worker is ready).

- **Handlers** live in `src/mocks/handlers/` — one file per domain (`stocks.ts`, `orders.ts`, `news.ts`), aggregated in `index.ts`.
- **Seed data** lives in `src/mocks/data/stocks.ts` (Korean + US stocks, market indices).
- Every price fetch applies a small random `jitter()` to simulate live movement; TanStack Query re-fetches every 5 seconds.
- API shape: `GET /api/stocks`, `/api/stocks/:symbol`, `/api/stocks/:symbol/candles`, `/api/stocks/:symbol/orderbook`, `/api/indices`, `/api/news`, `/api/orders`, `/api/account`.

### Panel system (binary-tree layout)
Mirrors the real Toss WTS panel engine described at `toss.tech/article/frontend-tree-structure`.

- Type definitions: `src/types/panel.ts` — `PanelLeaf | PanelSplit`, where splits carry `orientation: "H" | "V"` and `ratio: 0–1`.
- State: `usePanelStore` (Zustand + persist) stores the full tree as JSON in `localStorage` under `wts-panel-layout`.
- Rendering: `src/components/panels/PanelManager.tsx` recursively walks the tree and renders each leaf as its panel component.
- Resize: updating a `ratio` on a split node is the only mutation needed — `usePanelStore.updateRatio(nodeId, ratio)`.
- Default layout: chart (top-left 55 % × 60 %), orderbook (bottom-left), realtime (top-right), order form (bottom-right).

### Global state (Zustand stores)
| Store file | Purpose |
|---|---|
| `stores/themeStore.ts` | `"light" | "dark"` — persisted; sets `data-theme` attr on `<html>` |
| `stores/panelStore.ts` | Panel tree + `activeSymbol` — persisted |
| `stores/watchlistStore.ts` | Array of watched symbols — persisted |

### UI components — shadcn/ui + TDS tokens
shadcn/ui components live in `src/components/ui/`. They are built on base-ui primitives and styled with class-variance-authority. **Always prefer shadcn components** (e.g. `Tabs`, `Button`, `Select`) over hand-rolled HTML elements.

When using shadcn components, **override their colors with TDS tokens** rather than shadcn's default design tokens (`--background`, `--foreground`, `--primary`, etc.). Pass custom `className` props to override the defaults.

```tsx
// Correct — TDS tokens on a shadcn component
<TabsTrigger className="data-active:text-[var(--tds-text-primary)] data-active:bg-[var(--tds-surface-base)]" />

// Wrong — raw Tailwind colors
<TabsTrigger className="data-active:text-gray-900 data-active:bg-white" />
```

### TDS color system
`src/app/globals.css` defines all CSS custom properties in OKLCH (matching Toss's real color pipeline). **Always use `var(--tds-*)` tokens** rather than raw Tailwind color utilities or shadcn's default tokens when implementing UI.

Key tokens:
- `--tds-text-rise` / `--tds-text-fall` — Korean convention: **red = rising, blue = falling**
- `--tds-surface-base / elevated / overlay / sidebar` — layered surface hierarchy
- `--tds-border-default / strong`
- `--tds-text-primary / secondary / tertiary / brand`
- `--tds-fill-brand` — primary brand fill (blue)

Theme is toggled by setting `data-theme="dark"` on `<html>`.

### Layout structure
```
WTSLayout
├── TopBar          — 40 px, indices bar + search + theme toggle
├── LeftNav         — 56 px wide, 5 icon-nav tabs (홈/뉴스/주식 골라보기/내 계좌/종목 검색)
├── PanelManager    — flex-1, recursive binary-tree render
├── RightSidebar    — 240 px, watchlist (관심종목) + portfolio (보유종목)
└── BottomTicker    — 28 px, marquee-scrolling news headlines via motion
```

### Price formatting conventions
Use helpers from `src/lib/utils.ts`:
- `formatPrice(n)` → `"74,800"` (Korean locale, no currency symbol)
- `formatChange(n)` → `"+1.08%"` with leading sign
- `getPriceDirection(n)` → `"rise" | "fall" | "flat"` — use this to select the correct CSS token

### Adding a new panel type
1. Add the type to `PanelType` union in `src/types/panel.ts`.
2. Create the component in the appropriate `src/components/` subdirectory.
3. Add a `case` in the `renderNode` switch inside `src/components/panels/PanelManager.tsx`.
4. Optionally add a new default split in `DEFAULT_LAYOUT` in `src/stores/panelStore.ts`.

### Adding new mock API routes
Add an `http.get / http.post` handler in the relevant file under `src/mocks/handlers/`, then export it from `index.ts`. No server restarts are needed — MSW intercepts at the network layer.
