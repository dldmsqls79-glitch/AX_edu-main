"use client";

import { useEffect, useRef, useState } from "react";
import type { SlideMeta } from "./Deck";
import { ACCENTS } from "@/lib/theme";

/** Right-side labeled TOC navigation (collapsible). */
export function SideNav({
  slides,
  active,
  showLabels,
  onJump,
}: {
  slides: SlideMeta[];
  active: number;
  showLabels: boolean;
  onJump: (i: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const activeRef = useRef<HTMLButtonElement | null>(null);

  /**
   * 긴 덱에서는 도트가 레일 높이를 넘는다(1280×720 기준 약 21개가 한계).
   * 스크롤바를 숨겨 둔 레일이라 넘친 도트는 **아무 신호 없이** 사라지므로,
   * 활성 도트를 따라 레일을 스스로 움직인다. `nearest` 라 짧은 덱에서는 아무 일도 하지 않는다.
   */
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [active, showLabels]);

  return (
    <nav
      aria-label="슬라이드 네비게이션"
      /* 바 아래에서 시작한다 — top-topbar(= --topbar-h) + mt-4 여백.
         calc/theme() arbitrary 값은 선언이 누락될 수 있어 토큰 유틸리티로만 쓴다.
         레일은 뷰포트 가장자리에 붙인다(컨테이너 경계로 옮기면 넓은 화면에서 슬라이드 본문을 침범한다).
         좌측 PAGE 마커(left-6)와 같은 24px 로 맞춰 좌우 레일이 대칭이 되게 한다. */
      className="fixed bottom-4 right-6 top-topbar z-rail mt-4 hidden flex-col items-end gap-[7px] overflow-y-auto overflow-x-hidden py-1 md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {slides.map((s, i) => {
        const on = i === active;
        const a = ACCENTS[s.accent];
        const label = showLabels || on || hover === i;
        return (
          <button
            key={s.id}
            ref={on ? activeRef : undefined}
            type="button"
            onClick={() => onJump(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            aria-current={on ? "true" : undefined}
            aria-label={`${s.nav} (${i + 1})`}
            className="flex items-center justify-end gap-2 border-0 bg-transparent p-0"
          >
            {label && (
              // 상단 바 배지와 같은 계열로 맞춘다 (bg-surface-card/80 · shadow-pill · brand 색 토큰)
              <span
                className="whitespace-nowrap rounded-full border border-line bg-surface-card/80 px-2.5 py-0.5 text-[11.5px] font-bold text-brand-sub shadow-pill backdrop-blur transition-colors"
                style={on ? { color: a.deep } : undefined}
              >
                {s.nav}
              </span>
            )}
            <span
              aria-hidden
              className="block shrink-0 rounded-full transition-all duration-200 ease-out"
              style={{
                width: on ? 10 : 8,
                height: on ? 10 : 8,
                backgroundColor: on ? a.dot : "rgba(148,163,184,0.45)",
                boxShadow: on ? `0 0 0 3px ${a.ring}` : "none",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
