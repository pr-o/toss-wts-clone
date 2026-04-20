# Motion Animations Design

**Date:** 2026-04-20  
**Status:** Approved  

## Overview

Add four targeted motion animations to the Toss WTS clone using the already-installed `motion@12.38.0` (`motion/react`). All animations are short, purposeful, and consistent with the restrained style of the real Toss WTS.

## Scope

| ID | Name | Location |
|----|------|----------|
| A | Sliding tab pill | `FilterTabs`, `RightSidebar` order tabs, `OrderFormPanel` tabs |
| B | View content fade | `HomeView` main view tab switch |
| D | RightSidebar panel fade | `RightSidebar` panel switch (내 투자 / 관심 / 최근 본 / 실시간) |
| F | Page-level fade | Root layout (`src/app/layout.tsx`) |

## A — Sliding Tab Pill

**What:** The active tab background indicator slides to the newly selected tab instead of instantly jumping.

**How:** Inside `FilterTabs`'s `TabsList`, render a `motion.div` with `layoutId="tab-pill"` behind the active tab label. Motion's layout animation tracks position changes and interpolates between them.

**Files:** `src/components/home/FilterTabs.tsx`

**Details:**
- `layoutId` must be unique per tab group instance. Since multiple `FilterTabs` are mounted simultaneously on HomeView, pass a required `layoutId` prop (e.g. `"view-tabs"`, `"market-tabs"`, `"sort-tabs"`) from the parent.
- Also apply to the `ORDER_TABS` inside `RightSidebar` and tabs in `OrderFormPanel`.
- Spring config: `{ type: "spring", stiffness: 400, damping: 30 }` — snappy, not floaty.
- The pill renders as an absolutely positioned `motion.div` inside a `relative` wrapper.

## B — HomeView Content Fade

**What:** When switching between 실시간 차트 / 트렌딩 / 투자자 동향, the old view fades out before the new one fades in.

**How:** Wrap the content area in `<AnimatePresence mode="wait">` keyed by `viewTab`. Each child `motion.div` animates `opacity` and a small `y` offset.

**File:** `src/components/home/HomeView.tsx`

**Details:**
- `initial={{ opacity: 0, y: 4 }}`
- `animate={{ opacity: 1, y: 0 }}`
- `exit={{ opacity: 0, y: -4 }}`
- `transition={{ duration: 0.12 }}`
- Wraps only the list column (left flex child), not the sticky preview card column.

## D — RightSidebar Panel Fade

**What:** Switching between panels (내 투자 / 관심 / 최근 본 / 실시간) fades the content instead of hard-swapping.

**How:** Same `AnimatePresence mode="wait"` pattern as B, keyed by `activeId`.

**File:** `src/components/layout/RightSidebar.tsx`

**Details:**
- `initial={{ opacity: 0 }}`
- `animate={{ opacity: 1 }}`
- `exit={{ opacity: 0 }}`
- `transition={{ duration: 0.10 }}`
- No `y` shift — panels fill the sidebar height and a vertical shift would look odd.

## F — Page-Level Fade

**What:** Route navigations between `/`, `/screener`, `/feed/*` etc. fade in instead of hard-cutting.

**How:** In the root layout, wrap `{children}` in a `motion.div` with `key` set to the current pathname (from `usePathname`).

**File:** `src/app/layout.tsx`

**Details:**
- `initial={{ opacity: 0 }}`
- `animate={{ opacity: 1 }}`
- `transition={{ duration: 0.15 }}`
- No exit animation — exiting page unmounts immediately; only the entering page animates in. This avoids a double-fade that would make navigation feel slow.
- `usePathname` requires a Client Component wrapper since `layout.tsx` is a Server Component. Extract a thin `<PageTransition>` client component that wraps `{children}`.

## What's Excluded

- **E (price flash):** Deferred — 5s polling across 20 rows simultaneously would cause excessive visual noise.
- **C (preview card cross-fade):** Deferred — card is hover-driven; constant animation while browsing the rank list would be distracting.

## Import Convention

All animations use:
```ts
import { motion, AnimatePresence } from "motion/react"
```

Not `"framer-motion"` — the package has been renamed.
