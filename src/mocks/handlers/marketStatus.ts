import { http, HttpResponse } from "msw";

export interface MarketStatusResponse {
  domestic: MarketSession;
  overseas: MarketSession;
}

export interface MarketSession {
  label: string;
  isOpen: boolean;
  session: string;
}

/**
 * Returns the current hour/minute in KST (UTC+9) as minutes since midnight.
 */
function kstMinutes(): number {
  const now = new Date();
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  return (utcMinutes + 9 * 60) % (24 * 60);
}

function getDomesticSession(m: number): MarketSession {
  // 07:30–08:59  프리마켓
  if (m >= 450 && m < 540)   return { label: "국내 프리마켓",    isOpen: true,  session: "pre" };
  // 09:00–15:29  정규장
  if (m >= 540 && m < 930)   return { label: "국내 정규장",      isOpen: true,  session: "regular" };
  // 15:30–17:59  애프터마켓
  if (m >= 930 && m < 1080)  return { label: "국내 애프터마켓",  isOpen: true,  session: "after" };
  // 18:00–19:29  야간단일가
  if (m >= 1080 && m < 1170) return { label: "국내 야간단일가",  isOpen: true,  session: "night-single" };
  // Otherwise closed
  return { label: "국내 장마감", isOpen: false, session: "closed" };
}

function getOverseasSession(m: number): MarketSession {
  // 데이마켓: 10:00–16:00 KST — Toss's queued daytime US order service
  if (m >= 600 && m < 960)   return { label: "해외 데이마켓",  isOpen: true,  session: "day" };
  // 나이트마켓: 22:30–05:00 KST next day — US regular + extended hours
  if (m >= 1350 || m < 300)  return { label: "해외 나이트마켓", isOpen: true,  session: "night" };
  // 05:00–10:00 US after-hours
  if (m >= 300 && m < 600)   return { label: "해외 애프터마켓", isOpen: true,  session: "after" };
  // 16:00–22:30 closed gap
  return { label: "해외 장마감", isOpen: false, session: "closed" };
}

export const marketStatusHandlers = [
  http.get("/api/market-status", () => {
    const m = kstMinutes();
    const body: MarketStatusResponse = {
      domestic: getDomesticSession(m),
      overseas: getOverseasSession(m),
    };
    return HttpResponse.json(body);
  }),
];
