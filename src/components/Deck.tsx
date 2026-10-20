"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { SideNav } from "./SideNav";
import { ChromeDivider, ChromePill } from "./site/chrome";
import { TopBar, TopBarButton, TopBarCounter, TopBarNote } from "./site/TopBar";
import { ACCENTS, type Accent } from "@/lib/theme";

type GroupKey = "intro" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "close";

export type SlideMeta = {
  id: string;
  nav: string;
  /**
   * 덱의 편집상 파트(A · B · C …). **아직 화면에서 읽지 않는다** — SideNav 가 도트를 평평하게 늘어놓는다.
   * 지우지 않고 두는 이유는 덱의 파트 구분을 기계가 읽을 수 있는 형태로 가진 곳이 여기뿐이기 때문이다.
   * (HSAD 통합 덱은 기획 4파트 + 연계도·우선순위·아이디어 3파트라 A~G 를 다 쓴다.)
   */
  group?: GroupKey;
  accent: Accent;
  /** optional tailwind bg-* override */
  bg?: string;
  /** raw CSS background override (bg 보다 우선) — 인라인 스타일로 들어간다 */
  bgCss?: string;
};

export type SlideDef = SlideMeta & { node: ReactNode };

export function Deck({
  slides,
  badge,
  backHref,
  backLabel = "뒤로",
  eyebrow = "W-Insight · 앱 광고 교육",
  chip = "중급편",
}: {
  slides: SlideDef[];
  /** 로고 옆 프로젝트 배지 — 덱을 품은 프로젝트의 `PROJECTS[id].badge` 를 넘긴다 */
  badge?: string;
  /** 상단바에 표시할 뒤로가기 링크 (없으면 표시하지 않는다) */
  backHref?: string;
  backLabel?: string;
  /** 상단바 로고 옆 자료명 */
  eyebrow?: string;
  /** 자료명 옆 배지 (없으면 표시하지 않는다) */
  chip?: string;
}) {
  const [active, setActive] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const lockRef = useRef(false);
  const total = slides.length;

  /* 덱은 화면을 꽉 채우므로 문서 스크롤을 잠근다 (다른 페이지는 정상 스크롤) */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /**
   * 한 칸 스냅. 이웃 칸으로 갈 때만 부드럽게 굴린다.
   *
   * **먼 거리(Home · End)는 즉시 이동한다.** 50장짜리 덱에서 부드럽게 굴리면 수만 px 를
   * 몇 초에 걸쳐 훑고 지나가고, 그 사이 IntersectionObserver 가 중간 슬라이드를 계속
   * 활성으로 보고해 도트·카운터가 요동친다(53장 덱에서 `Home` 이 5초 안에 안 끝났다).
   * Home·End 는 원래 '즉시 처음/끝'이라는 뜻이라 이게 더 맞는 동작이기도 하다.
   */
  const goTo = useCallback(
    (target: number) => {
      const c = document.getElementById("deck-scroll");
      if (!c || lockRef.current) return;
      const clamped = Math.max(0, Math.min(total - 1, target));
      const H = c.clientHeight;
      const from = Math.round(c.scrollTop / H);
      if (from === clamped) return;
      const far = Math.abs(clamped - from) > 2;
      lockRef.current = true;
      // instant 를 명시한다 — html 에 `scroll-behavior: smooth` 가 걸려 있어 auto 로는 부드러워진다
      c.scrollTo({ top: clamped * H, behavior: far ? "instant" : "smooth" });
      if (far) setActive(clamped);
      window.setTimeout(() => (lockRef.current = false), far ? 120 : 520);
    },
    [total]
  );

  /** 목차·SCROLL 버튼용. `goTo` 와 같은 이유로 먼 거리는 즉시 이동한다 */
  const jumpTo = useCallback(
    (i: number) => {
      const c = document.getElementById("deck-scroll");
      if (!c) return;
      const clamped = Math.max(0, Math.min(total - 1, i));
      const H = c.clientHeight;
      const far = Math.abs(clamped - Math.round(c.scrollTop / H)) > 2;
      lockRef.current = true;
      c.scrollTo({ top: clamped * H, behavior: far ? "instant" : "smooth" });
      setActive(clamped);
      window.setTimeout(() => (lockRef.current = false), far ? 120 : 620);
    },
    [total]
  );

  /* active tracking via center-line IntersectionObserver + wheel/key/touch snap */
  useEffect(() => {
    const c = document.getElementById("deck-scroll");
    if (!c) return;
    const cur = () => Math.round(c.scrollTop / c.clientHeight);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = Number((e.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { root: c, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    c.querySelectorAll<HTMLElement>("[data-index]").forEach((el) => io.observe(el));

    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      if (lockRef.current || Math.abs(e.deltaY) < 5) return;
      goTo(cur() + (e.deltaY > 0 ? 1 : -1));
    };
    const key = (e: KeyboardEvent) => {
      if (lockRef.current) return;
      // 크롬(상단 바·도트 네비)이나 입력 요소에 포커스가 있으면 가로채지 않는다.
      // 없으면 목차 버튼에 포커스를 두고 Space 를 눌렀을 때 버튼이 눌리지 않고 슬라이드가 넘어간다.
      const el = e.target as HTMLElement | null;
      if (el?.closest("header, nav, button, a, input, textarea, select, [contenteditable]")) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(cur() + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(cur() - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    let ty = 0;
    const ts = (e: TouchEvent) => (ty = e.touches[0].clientY);
    const te = (e: TouchEvent) => {
      if (lockRef.current) return;
      const d = ty - e.changedTouches[0].clientY;
      if (Math.abs(d) < 40) return;
      goTo(cur() + (d > 0 ? 1 : -1));
    };

    c.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", key);
    c.addEventListener("touchstart", ts, { passive: true });
    c.addEventListener("touchend", te, { passive: true });
    return () => {
      io.disconnect();
      c.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", key);
      c.removeEventListener("touchstart", ts);
      c.removeEventListener("touchend", te);
    };
  }, [goTo, total]);

  const current = slides[active] ?? slides[0];
  const curAccent = ACCENTS[current.accent];

  return (
    /* data-deck — 인쇄(PDF 저장) 규칙이 이 훅으로 셸을 해제한다 (globals.css @media print) */
    <div
      data-deck
      className="fixed inset-0 flex flex-col bg-surface-base font-sans text-brand-ink"
    >
      {/* ── 상단 바 — 사이트 공통 TopBar. 덱은 우측에 슬라이드 제목·카운터·목차 토글만 넣는다 ── */}
      <TopBar
        mode="shell"
        badge={badge}
        label={eyebrow}
        chip={chip}
        back={backHref ? { href: backHref, label: backLabel } : undefined}
      >
        <TopBarNote>{current.nav}</TopBarNote>
        {/* 구분선은 짝이 되는 TopBarNote 와 같은 브레이크포인트에서 나타난다 (고아 세로선 방지) */}
        <ChromeDivider className="hidden md:block" />
        <TopBarCounter current={active + 1} total={total} />
        {/* PDF 는 브라우저 인쇄를 그대로 쓴다 — 글자가 벡터로 남고 폰트·그라디언트가 깨지지 않는다.
            (캔버스로 굽는 방식은 텍스트가 이미지가 되어 검색·복사가 안 된다)
            한 장 = 한 페이지로 떨어지는 규칙은 globals.css 의 @media print 에 있다. */}
        <TopBarButton
          onClick={() => window.print()}
          /* 인쇄 대화상자의 설정은 코드로 강제할 수 없다. 색이 빠진다는 신고의 실측 원인은
             '배경 그래픽' 이 아니라(그건 print-color-adjust:exact 로 이미 이긴다) 색상 항목이라
             여기서 그것만 짚어준다 — 틀린 항목을 안내하면 시키는 대로 해도 안 고쳐진다. */
          title="PDF 로 저장 — 인쇄 창에서 '대상: PDF로 저장' · '색상: 컬러' 를 확인하세요"
        >
          <span aria-hidden>⤓</span>
          <span className="hidden sm:inline">PDF</span>
        </TopBarButton>
        <TopBarButton
          active={showLabels}
          pressed={showLabels}
          onClick={() => setShowLabels((v) => !v)}
          title="목차 표시/숨기기"
        >
          {/* 글리프를 aria-hidden 으로 감싸야 좁은 폭에서 title 이 접근 이름으로 승격된다 */}
          <span aria-hidden>☰</span>
          <span className="hidden sm:inline">{showLabels ? "목차 숨기기" : "목차 보기"}</span>
        </TopBarButton>
      </TopBar>

      {/* ── scroll container ── */}
      <main
        id="deck-scroll"
        tabIndex={-1}
        className="flex-1 overflow-y-auto overflow-x-hidden outline-none [overscroll-behavior:none]"
      >
        {slides.map((s, i) => {
          const a = ACCENTS[s.accent];
          return (
            <section
              key={s.id}
              id={s.id}
              data-index={i}
              className={`relative flex h-full min-h-full items-center justify-center border-b border-line ${
                s.bgCss ? "" : (s.bg ?? a.pageBg)
              }`}
              style={s.bgCss ? { background: s.bgCss } : undefined}
            >
              {/* PAGE marker */}
              <div
                className="pointer-events-none absolute left-6 top-8 font-display text-[11px] font-bold tracking-[0.22em]"
                style={{ color: a.main, opacity: 0.85 }}
              >
                PAGE {String(i + 1).padStart(2, "0")}
              </div>

              {s.node}

              {/* SCROLL 버튼 — 상단 바 컨트롤과 같은 ChromePill 을 쓴다 */}
              {i < total - 1 && (
                <ChromePill
                  as="button"
                  onClick={() => jumpTo(i + 1)}
                  title="다음 슬라이드"
                  className="deck-chrome absolute bottom-7 left-1/2 -translate-x-1/2 tracking-[0.08em] backdrop-blur"
                >
                  SCROLL <span aria-hidden className="animate-bob">↓</span>
                </ChromePill>
              )}
            </section>
          );
        })}
      </main>

      {/* ── 진행바 — 상단 바 '아래 모서리'에 붙인다.
             top-0 이면 화면 최상단, 즉 상단 바 위에 3px 이 겹쳐 그려져 바가 두 겹처럼 보였다. ── */}
      <div className="deck-chrome pointer-events-none absolute left-0 top-[calc(var(--topbar-h)-3px)] z-rail h-[3px] w-full">
        <div
          className="h-full transition-[width] duration-500 ease-out"
          style={{
            width: `${total > 1 ? (active / (total - 1)) * 100 : 0}%`,
            background: `linear-gradient(90deg, ${curAccent.deep}, ${curAccent.main})`,
          }}
        />
      </div>

      <SideNav
        slides={slides}
        active={active}
        showLabels={showLabels}
        onJump={jumpTo}
      />
    </div>
  );
}
