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
 * Returns true if the given UTC date falls within US Daylight Saving Time.
 * DST starts on the 2nd Sunday of March at 02:00 EST (07:00 UTC).
 * DST ends on the 1st Sunday of November at 02:00 EDT (06:00 UTC).
 */
function isUsDst(utcDate: Date): boolean {
  const y = utcDate.getUTCFullYear();
  const mar1Day = new Date(Date.UTC(y, 2, 1)).getUTCDay();
  const dstStart = Date.UTC(y, 2, 1 + (7 - mar1Day) % 7 + 7, 7);
  const nov1Day = new Date(Date.UTC(y, 10, 1)).getUTCDay();
  const dstEnd = Date.UTC(y, 10, 1 + (7 - nov1Day) % 7, 6);
  return utcDate.getTime() >= dstStart && utcDate.getTime() < dstEnd;
}

function getKst(utcDate: Date) {
  const d = new Date(utcDate.getTime() + 9 * 3_600_000);
  return { day: d.getUTCDay(), min: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

/** ET = EDT (UTC-4) during US DST, otherwise EST (UTC-5). */
function getEt(utcDate: Date) {
  const offsetMs = (isUsDst(utcDate) ? -4 : -5) * 3_600_000;
  const d = new Date(utcDate.getTime() + offsetMs);
  return { day: d.getUTCDay(), min: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

/**
 * Korean domestic session (KRX equity).
 * All times in KST. Weekdays only.
 *
 * 08:30 – 09:00  장전 프리마켓 (pre-market single-price auction)
 * 09:00 – 15:30  정규장 (regular session)
 * 15:40 – 18:00  장후 애프터마켓 (장후 시간외 단일가, every 10 min)
 */
function getDomesticSession(kst: { day: number; min: number }): MarketSession {
  const { day: d, min: m } = kst;
  if (d === 0 || d === 6)        return { label: "국내 장마감",    isOpen: false, session: "closed"  };
  if (m >= 510 && m < 540)       return { label: "국내 프리마켓",  isOpen: true,  session: "pre"     };
  if (m >= 540 && m < 930)       return { label: "국내 정규장",    isOpen: true,  session: "regular" };
  if (m >= 940 && m < 1080)      return { label: "국내 애프터마켓",isOpen: true,  session: "after"   };
  return                                { label: "국내 장마감",    isOpen: false, session: "closed"  };
}

/**
 * Overseas session (Toss Securities US equity product).
 * All session times follow Toss's published schedule (DST-aware).
 *
 * 데이마켓  10:00–17:50 KST  Mon–Fri KST  (Toss queued-order window; shifted by DST for US sessions below)
 *
 * During US DST (EDT, UTC-4):
 *   프리마켓   18:00–22:30 KST  (US pre-market  04:00–09:30 ET)
 *   나이트마켓  22:30–05:00 KST  (US regular     09:30–16:00 ET)  — check via ET weekday
 *   애프터마켓  05:00–08:50 KST  (US after-hours 16:00–19:50 ET)  — check via ET weekday
 *
 * During US Standard Time (EST, UTC-5): all US-linked sessions shift +1 hour KST:
 *   프리마켓   18:00–23:30 KST
 *   나이트마켓  23:30–06:00 KST
 *   애프터마켓  06:00–09:50 KST
 *
 * The 나이트마켓 and 애프터마켓 span KST midnight, so we use the ET weekday/time to
 * correctly handle weekend boundaries.
 */
function getOverseasSession(
  kst: { day: number; min: number },
  et: { day: number; min: number },
  dst: boolean,
): MarketSession {
  const { day: kDay, min: kMin } = kst;
  const { day: eDay, min: eMin } = et;
  const isEtWeekday = eDay >= 1 && eDay <= 5;
  const isKstWeekday = kDay >= 1 && kDay <= 5;

  // 데이마켓: Toss-internal queued order window, Mon–Fri KST, 10:00–17:50
  if (isKstWeekday && kMin >= 600 && kMin < 1070)
    return { label: "해외 데이마켓",  isOpen: true,  session: "day"    };

  // 프리마켓: US pre-market, Mon–Fri KST evenings
  // DST → 18:00–22:30 KST; Standard → 18:00–23:30 KST
  const preClose = dst ? 1350 : 1410;
  if (isKstWeekday && kMin >= 1080 && kMin < preClose)
    return { label: "해외 프리마켓",  isOpen: true,  session: "pre"    };

  // 나이트마켓: US regular session 09:30–16:00 ET, Mon–Fri ET
  // Spans KST midnight so we check ET day/time directly.
  if (isEtWeekday && eMin >= 570 && eMin < 960)
    return { label: "해외 나이트마켓", isOpen: true,  session: "night"  };

  // 애프터마켓: US after-hours 16:00–20:00 ET, Mon–Fri ET
  if (isEtWeekday && eMin >= 960 && eMin < 1200)
    return { label: "해외 애프터마켓", isOpen: true,  session: "after"  };

  return                { label: "해외 장마감",  isOpen: false, session: "closed" };
}

export const marketStatusHandlers = [
  http.get("/api/market-status", () => {
    const now = new Date();
    const dst = isUsDst(now);
    const body: MarketStatusResponse = {
      domestic: getDomesticSession(getKst(now)),
      overseas: getOverseasSession(getKst(now), getEt(now), dst),
    };
    return HttpResponse.json(body);
  }),
];
