## 토스증권 WTS 클론 - [Toss WTS Clone](https://toss-wts-clone.vercel.app/)

A pixel-faithful clone of [Toss Securities WTS](https://wts.tossinvest.com/) (Web Trading System).

---

# 토스증권 WTS 클론

토스증권 PC 웹 트레이딩 시스템(WTS)을 클론한 프로젝트

토스증권 WTS(`wts.tossinvest.com`)를 분석하여 UI/UX를 최대한 재현한 브라우저 기반 주식 거래 시뮬레이터다. 실제 주가 데이터 대신 MSW(Mock Service Worker)로 시세와 체결 데이터를 시뮬레이션하며, 실제 증권사 연결은 없다.

## 주요 모듈

- Next.js 16 (App Router, 웹 프레임워크)
- TypeScript 5 (타입 안전성)
- Tailwind CSS v4 (스타일링 — TDS OKLCH 컬러 시스템)
- MSW 2 (브라우저 서비스 워커 기반 목 API 백엔드)
- TanStack Query 5 (서버 상태 관리 — 5초 폴링으로 실시간 시세 구현)
- Zustand 5 + persist (전역 상태 — 테마, 패널 레이아웃, 관심종목)
- lightweight-charts v5 (TradingView 오픈소스 캔들스틱 차트)
- motion (Framer Motion — 하단 티커 스크롤 애니메이션)
- shadcn/ui (UI 컴포넌트 — base-ui 프리미티브 기반)
- Lucide React (아이콘)

## 앱 흐름

1. **홈 (`/`)**: 토스증권 거래대금 기준 종목 랭킹 리스트 + 시장 데이터 스트립 (달러 환율, 코스피, 코스닥, 나스닥 등) + 우측에 선택 종목 미리보기 (미니 차트, 한 줄 요약, 커뮤니티)
2. **종목 상세 (`/stocks/:symbol/order`)**: 이진 트리 기반 패널 레이아웃으로 차트, 호가창, 주문폼, 커뮤니티, 투자자동향 패널을 분할 렌더링. 종목 헤더에 현재가·등락률·52주 최고/최저 표시
3. **주문**: 일반주문/간편주문/조건주문 탭, 구매/판매/대기 서브탭, 지정가/시장가 토글, 수량 퍼센트 단축 버튼, 주문 금액 실시간 계산
4. **우측 2단 사이드바**: 외부 네비게이션 레일(내 투자 / 관심 / 최근 본 / 실시간 / 설정)로 내부 패널 전환 — 내 투자(기본계좌·보유종목·주문내역), 관심종목 리스트
5. **하단 티커**: 주요 지수 실시간 스크롤 — 호버 시 정지, 클릭 시 `/indices/:id`로 이동

## 레이아웃 구조

```
[ TopBar 44px — 로고, 탭 네비, 검색, 테마 토글 ]
[ 메인 콘텐츠 flex-1 ] [ RightSidebar — 내부 패널 280px + 외부 레일 48px ]
[ BottomTicker 28px — 지수 스크롤 마퀴 ]
```

- **홈**: `[ 종목 랭킹 820px | 커뮤니티 미리보기 flex-1 ]`
- **종목 상세**: `[ StockHeader ] [ PanelManager — 이진 트리 패널 ]`

## 패널 시스템

`PanelNode = PanelLeaf | PanelSplit` 구조의 이진 트리로 레이아웃을 관리한다. 분할 노드는 `orientation: "H" | "V"`와 `ratio: 0–1`을 가지며, Zustand persist로 `localStorage`에 JSON 직렬화된다.

```
root: split(H, 0.70)
  left: split(H, 0.58)
    left:  split(V, 0.60) → 차트 | 커뮤니티
    right: split(V, 0.55) → 호가창 | 투자자동향
  right: 주문폼 (full height)
```

## UI 컴포넌트 & TDS 컬러 시스템

UI 컴포넌트는 shadcn/ui(`src/components/ui/`)를 기반으로 한다. 단, 컬러는 shadcn 기본 토큰(`--background`, `--primary` 등) 대신 **TDS 토큰(`var(--tds-*)`)**으로 오버라이드한다.

`src/app/globals.css`에 OKLCH 기반 CSS 커스텀 프로퍼티로 정의. `data-theme="dark"` 속성으로 다크 테마 전환.

- `--tds-text-rise` / `--tds-text-fall` — 한국 관례: **빨강 = 상승, 파랑 = 하락**
- `--tds-surface-base / elevated / overlay / sidebar` — 레이어드 서피스

---

# Toss Securities WTS Clone

A browser-based stock trading simulator cloning the Toss Securities WTS UI

Reverse-engineered from `wts.tossinvest.com`, this app replicates the full WTS interface. All prices and order flow are simulated by MSW running as a browser service worker — no real brokerage connection.

## Key Modules

- Next.js 16 (App Router, web framework)
- TypeScript 5 (type safety)
- Tailwind CSS v4 (styling — TDS OKLCH color system)
- MSW 2 (browser service worker mock API backend)
- TanStack Query 5 (server state — 5s polling for live-data feel)
- Zustand 5 + persist (global state — theme, panel layout, watchlist)
- lightweight-charts v5 (TradingView open-source candlestick charts)
- motion (Framer Motion — bottom ticker scroll animation)
- shadcn/ui (UI components — base-ui primitives)
- Lucide React (icons)

## App Flow

1. **Home (`/`)**: Stock ranking list sorted by Toss trade volume + market data strip (USD/KRW, KOSPI, KOSDAQ, NASDAQ, etc.) + focused stock preview panel (mini chart, news summary, community posts)
2. **Stock Detail (`/stocks/:symbol/order`)**: Binary-tree panel layout rendering chart, order book, order form, community, and investor trend panels as resizable splits. Stock header shows current price, change rate, and 52-week high/low
3. **Order Form**: 일반주문/간편주문/조건주문 tabs, buy/sell/wait sub-tabs, limit/market price toggle, quantity percentage shortcuts, real-time total amount calculation
4. **Two-level Right Sidebar**: Outer icon nav rail (내 투자 / 관심 / 최근 본 / 실시간 / settings) controls which inner panel is shown — portfolio (account balance, holdings, order history) or watchlist
5. **Bottom Ticker**: Live-scrolling market indices — pauses on hover, navigates to `/indices/:id` on click

## Layout Structure

```
[ TopBar 44px — logo, tab nav, search, theme toggle ]
[ Main content flex-1 ] [ RightSidebar — inner panel 280px + outer rail 48px ]
[ BottomTicker 28px — scrolling index marquee ]
```

- **Home**: `[ Stock ranking list 820px | Community preview flex-1 ]`
- **Stock detail**: `[ StockHeader ] [ PanelManager — binary tree panels ]`

## UI Components & TDS Color System

UI components are built on shadcn/ui (`src/components/ui/`). shadcn's default design tokens (`--background`, `--primary`, etc.) are **not used** — all colors are overridden with TDS tokens (`var(--tds-*)`) to match the Toss design language.

- `--tds-text-rise` / `--tds-text-fall` — Korean convention: **red = rising, blue = falling**
- `--tds-surface-base / elevated / overlay / sidebar` — layered surface hierarchy
- `--tds-fill-brand` — primary brand blue
- All tokens defined in OKLCH in `src/app/globals.css`; dark theme via `data-theme="dark"` on `<html>`

## Panel System

Layout is managed as a binary tree of `PanelNode = PanelLeaf | PanelSplit`. Split nodes carry `orientation: "H" | "V"` and `ratio: 0–1`, persisted as JSON in `localStorage` via Zustand.

```
root: split(H, 0.70)
  left: split(H, 0.58)
    left:  split(V, 0.60) → chart | community
    right: split(V, 0.55) → orderbook | investor trend
  right: order form (full height)
```

## Development

```bash
pnpm dev          # start Next.js dev server (MSW activates automatically)
pnpm build        # production build
pnpm type-check   # TypeScript check
pnpm lint         # ESLint
```

The deployed app is available at [https://toss-wts-clone.vercel.app](https://toss-wts-clone.vercel.app).
