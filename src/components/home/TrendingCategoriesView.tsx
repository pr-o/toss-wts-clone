"use client";

import type { LucideIcon } from "lucide-react";
import {
  Rocket, Car, Tv, Zap, Anchor, Cpu, Wrench, Banknote, Database,
  Heart, FlaskConical, Leaf, BatteryCharging, Building2, Gamepad2,
  Bot, Globe, Factory, Brain, Monitor, Cloud, ShoppingBag, Film,
  Shield, Gem, Truck, Plane,
} from "lucide-react";
import { cn, getPriceDirection } from "@/lib/utils";

interface CategoryRow {
  name: string;
  changeRate: number;
  tradeVolumeBillion: number;
  color: string;
  icon: LucideIcon;
}

const DOMESTIC_CATEGORIES: CategoryRow[] = [
  { name: "방산/우주",        changeRate:  14.82, tradeVolumeBillion: 4821, color: "#7c3aed", icon: Rocket       },
  { name: "교통플랫폼",       changeRate:   8.54, tradeVolumeBillion: 3247, color: "#0891b2", icon: Car          },
  { name: "웹툰/드라마",      changeRate:   6.31, tradeVolumeBillion: 2189, color: "#dc2626", icon: Tv           },
  { name: "원전/에너지",      changeRate:   5.97, tradeVolumeBillion: 1984, color: "#ea580c", icon: Zap          },
  { name: "조선",             changeRate:   5.12, tradeVolumeBillion: 1742, color: "#1d4ed8", icon: Anchor       },
  { name: "반도체",           changeRate:   4.88, tradeVolumeBillion: 1653, color: "#7c3aed", icon: Cpu          },
  { name: "소부장",           changeRate:   4.23, tradeVolumeBillion: 1421, color: "#059669", icon: Wrench       },
  { name: "금융",             changeRate:   3.76, tradeVolumeBillion: 1389, color: "#16a34a", icon: Banknote     },
  { name: "메모리/HBM",       changeRate:   3.44, tradeVolumeBillion: 1254, color: "#7c3aed", icon: Database     },
  { name: "헬스케어",         changeRate:   2.91, tradeVolumeBillion: 1087, color: "#dc2626", icon: Heart        },
  { name: "바이오",           changeRate:   2.55, tradeVolumeBillion:  984, color: "#16a34a", icon: FlaskConical },
  { name: "신재생에너지",     changeRate:   1.78, tradeVolumeBillion:  876, color: "#059669", icon: Leaf         },
  { name: "2차전지",          changeRate:  -0.44, tradeVolumeBillion:  814, color: "#0891b2", icon: BatteryCharging },
  { name: "건설",             changeRate:  -1.23, tradeVolumeBillion:  762, color: "#ea580c", icon: Building2    },
  { name: "자동차/모빌리티",  changeRate:  -2.07, tradeVolumeBillion:  698, color: "#1d4ed8", icon: Car          },
  { name: "게임",             changeRate:  -2.88, tradeVolumeBillion:  634, color: "#7c3aed", icon: Gamepad2     },
  { name: "로봇",             changeRate:  -3.51, tradeVolumeBillion:  521, color: "#dc2626", icon: Bot          },
  { name: "인터넷/플랫폼",   changeRate:  -4.14, tradeVolumeBillion:  487, color: "#16a34a", icon: Globe        },
  { name: "화학",             changeRate:  -5.22, tradeVolumeBillion:  423, color: "#6b7280", icon: FlaskConical },
  { name: "철강/소재",        changeRate:  -6.78, tradeVolumeBillion:  378, color: "#6b7280", icon: Factory      },
];

const INTERNATIONAL_CATEGORIES: CategoryRow[] = [
  { name: "AI/반도체",        changeRate:  12.34, tradeVolumeBillion: 8921, color: "#7c3aed", icon: Brain        },
  { name: "빅테크",           changeRate:   7.21, tradeVolumeBillion: 6543, color: "#1d4ed8", icon: Monitor      },
  { name: "전기차",           changeRate:   5.88, tradeVolumeBillion: 4312, color: "#0891b2", icon: Car          },
  { name: "헬스케어/바이오",  changeRate:   4.76, tradeVolumeBillion: 3876, color: "#dc2626", icon: Heart        },
  { name: "클라우드/SaaS",    changeRate:   4.12, tradeVolumeBillion: 3241, color: "#7c3aed", icon: Cloud        },
  { name: "금융/핀테크",      changeRate:   3.55, tradeVolumeBillion: 2987, color: "#16a34a", icon: Banknote     },
  { name: "에너지",           changeRate:   2.98, tradeVolumeBillion: 2654, color: "#ea580c", icon: Zap          },
  { name: "소비재",           changeRate:   2.43, tradeVolumeBillion: 2187, color: "#059669", icon: ShoppingBag  },
  { name: "미디어/엔터",      changeRate:   1.87, tradeVolumeBillion: 1943, color: "#dc2626", icon: Film         },
  { name: "항공우주/방산",    changeRate:   1.34, tradeVolumeBillion: 1765, color: "#7c3aed", icon: Plane        },
  { name: "로봇/자동화",      changeRate:  -0.22, tradeVolumeBillion: 1432, color: "#0891b2", icon: Bot          },
  { name: "사이버보안",       changeRate:  -1.45, tradeVolumeBillion: 1287, color: "#1d4ed8", icon: Shield       },
  { name: "원자재",           changeRate:  -2.87, tradeVolumeBillion: 1043, color: "#6b7280", icon: Gem          },
  { name: "부동산/리츠",      changeRate:  -4.23, tradeVolumeBillion:  876, color: "#6b7280", icon: Building2    },
  { name: "운송/물류",        changeRate:  -5.67, tradeVolumeBillion:  712, color: "#ea580c", icon: Truck        },
  { name: "게임/메타버스",    changeRate:  -6.12, tradeVolumeBillion:  654, color: "#7c3aed", icon: Gamepad2     },
  { name: "바이오테크",       changeRate:  -6.88, tradeVolumeBillion:  598, color: "#16a34a", icon: FlaskConical },
  { name: "신재생에너지",     changeRate:  -7.43, tradeVolumeBillion:  521, color: "#059669", icon: Leaf         },
  { name: "농업/식품",        changeRate:  -8.21, tradeVolumeBillion:  467, color: "#ea580c", icon: Factory      },
  { name: "광업/자원",        changeRate:  -9.34, tradeVolumeBillion:  389, color: "#6b7280", icon: Wrench       },
];

function CategoryList({
  title,
  subtitle,
  categories,
}: {
  title: string;
  subtitle: string;
  categories: CategoryRow[];
}) {
  return (
    <div className="flex flex-1 flex-col border-r border-[var(--tds-border-default)] last:border-r-0">
      {/* Column header — sticky */}
      <div className="sticky top-0 z-10 bg-[var(--tds-surface-base)] border-b border-[var(--tds-border-default)] px-4 py-2.5">
        <div className="text-[15px] font-semibold text-[var(--tds-text-primary)]">{title}</div>
        <div className="mt-0.5 text-[12px] text-[var(--tds-text-tertiary)]">{subtitle}</div>
      </div>

      {/* Sub-header row — sticky */}
      <div className="sticky top-[57px] z-10 grid grid-cols-[28px_28px_150px_72px_1fr_80px] items-center gap-2 border-b border-[var(--tds-border-default)] bg-[var(--tds-surface-base)] px-4 py-1.5 text-[11px] text-[var(--tds-text-tertiary)]">
        <span>순위</span>
        <span />
        <span>카테고리</span>
        <span>등락률</span>
        <span />
        <span className="text-right">거래대금</span>
      </div>

      {/* Rows */}
      <div>
        {categories.map((cat, i) => {
          const dir = getPriceDirection(cat.changeRate);
          return (
            <div
              key={cat.name}
              className="grid grid-cols-[28px_28px_150px_72px_1fr_80px] cursor-pointer items-center gap-2 border-b border-[var(--tds-border-default)] px-4 py-2.5 transition-colors even:bg-[var(--tds-surface-elevated)] hover:bg-[var(--tds-surface-overlay)] last:border-b-0"
            >
              {/* Rank */}
              <span className="text-[13px] font-medium text-[var(--tds-text-secondary)]">{i + 1}</span>

              {/* Icon */}
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: cat.color }}
              >
                <cat.icon size={14} strokeWidth={2.2} />
              </div>

              {/* Name */}
              <span className="truncate text-[14px] font-medium text-[var(--tds-text-primary)]">{cat.name}</span>

              {/* Change rate — immediately after name */}
              <span className={cn(
                "text-[12px] font-bold tabular-nums",
                dir === "rise" ? "text-[var(--tds-text-rise)]" :
                dir === "fall" ? "text-[var(--tds-text-fall)]" :
                "text-[var(--tds-text-tertiary)]"
              )}>
                {cat.changeRate > 0 ? "+" : ""}{cat.changeRate.toFixed(2)}%
              </span>

              {/* Spacer */}
              <span />

              {/* Trade volume */}
              <span className="text-right text-[13px] tabular-nums text-[var(--tds-text-secondary)]">
                {cat.tradeVolumeBillion.toLocaleString("ko-KR")}억
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TrendingCategoriesView() {
  return (
    <div className="flex flex-1 overflow-y-auto">
      <CategoryList
        title="국내"
        subtitle="코스피·코스닥 상위 카테고리 거래대금 순"
        categories={DOMESTIC_CATEGORIES}
      />
      <CategoryList
        title="해외"
        subtitle="나스닥·NYSE 상위 카테고리 거래대금 순"
        categories={INTERNATIONAL_CATEGORIES}
      />
    </div>
  );
}
