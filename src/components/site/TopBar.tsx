"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { WisebirdsLogo } from "@/components/Logo";
import { CHROME_T, ChromeDivider, ChromePill, UpLink } from "./chrome";

/**
 * 사이트 전체가 공유하는 **단 하나의** 상단 바.
 *
 * 페이지마다 바가 달라 보이던 원인을 세 가지로 못박아 없앤다.
 *   ① 컨테이너 — 어느 라우트든 `max-w-page px-6`. 본문·푸터가 모두 이 폭이므로
 *                라우트를 옮겨도 로고 x 좌표가 1px도 움직이지 않는다.
 *   ② 높이     — `--topbar-h`(globals.css) 하나. 이 값에 붙는 좌표는 `top-topbar` 로 파생시킨다.
 *                런타임에 바뀌는 높이(스크롤 축소 등)는 금지 — 덱 스냅이 clientHeight로 계산된다.
 *   ③ 슬롯     — 좌측 [로고][프로젝트 배지] │ [자료명][배지] │ [뒤로], 우측은 `children` 하나뿐.
 *                우측에 넣을 조각은 아래 TopBar* 로 제한해, 페이지가 새 모양을 만들지 못하게 한다.
 *
 * 로고 옆 배지(badge)는 **지금 어느 프로젝트 안인지**를 말한다 (`PROJECTS[id].badge`).
 * 사이트가 포털 아래 프로젝트 둘로 갈라지므로, 이 한 자리가 소속을 알려주는 유일한 표시다.
 * 톤은 라우트와 무관하게 violet 하나 — 색이 바뀌면 "하나의 바"라는 인상이 깨진다.
 *
 * 자료명(label) 규칙: **지금 열려 있는 자료가 있을 때만** 채운다.
 * 섹션 인덱스(`/edu`, `/prototype`)와 홈은 우측 네비의 활성 표시가 그 역할을 하므로 비운다.
 * 단 셸 라우트(덱·실습)에는 우측 네비가 없으므로 자료명이 유일한 위치 표시가 된다.
 */

type TopBarMode = "document" | "shell";

export function TopBar({
  badge = "AX",
  label,
  labelHref,
  chip,
  back,
  children,
  mode = "document",
}: {
  /** 로고 옆 프로젝트 배지 — `PROJECTS[id].badge`. 포털·게이트는 기본값 "AX" */
  badge?: string;
  /** 지금 열려 있는 자료명 — 예: "개발 인프라 구축 가이드" */
  label?: string;
  /** 자료명 클릭 시 이동 경로 (현재 라우트 자신이면 넘기지 않는다) */
  labelHref?: string;
  /** 자료 분류 배지 — 예: "1회차". 톤은 항상 violet 하나 (바 색이 라우트마다 바뀌면 통일성이 깨진다) */
  chip?: string;
  /** 상위로 올라가는 링크 (상위가 홈이면 로고가 그 역할을 하므로 생략) */
  back?: { href: string; label: string };
  /** 우측 슬롯 — TopBarNav / TopBarNote / TopBarCounter / ChromeDivider / TopBarButton 만 넣는다 */
  children?: ReactNode;
  /**
   * document — 문서 스크롤 페이지 → `sticky top-0`
   * shell    — `fixed inset-0 flex flex-col` 셸(덱·실습)의 `flex-none` 아이템 → `relative`
   *            (셸의 본문이 `flex-1`로 남은 높이를 먹으므로 바를 fixed로 바꾸면 안 된다)
   */
  mode?: TopBarMode;
}) {
  return (
    <header
      className={`z-bar h-topbar flex-none border-b border-line bg-surface-card/80 shadow-e1 backdrop-blur-xl ${
        mode === "document" ? "sticky top-0" : "relative"
      }`}
    >
      <div className="mx-auto flex h-full max-w-page items-center gap-3 px-6">
        {/* ── 브랜드 — 라우트가 바뀌어도 로고 위치·크기는 변하지 않는다.
               프로젝트 배지만 sm 미만에서 접는다 (폰 폭에서 바가 넘치지 않게).
               로고를 누르면 포털(`/`)로 — 프로젝트 밖으로 나가는 유일한 길이다. ── */}
        <Link href="/" aria-label="Wisebirds-AX 홈" className="flex flex-none items-center gap-2.5">
          <WisebirdsLogo priority />
          <span
            className={`hidden flex-none whitespace-nowrap rounded-md bg-brand-violet/10 px-2 py-0.5 font-display tracking-[0.14em] text-brand-violet shadow-pill sm:inline ${CHROME_T.badge}`}
          >
            {badge}
          </span>
        </Link>

        {/* ── 지금 열려 있는 자료 ── */}
        {label && (
          <>
            <ChromeDivider className="hidden sm:block" />
            {/* min-w-0 이 부모와 자식 양쪽에 있어야 truncate 가 실제로 걸린다.
                (flex item 기본 min-width:auto 때문에 자식에 없으면 우측 슬롯을 밀어낸다) */}
            <span className="hidden min-w-0 items-center gap-2 sm:flex">
              {labelHref ? (
                <Link
                  href={labelHref}
                  className={`min-w-0 truncate tracking-tight text-brand-sub transition-colors hover:text-brand-violet ${CHROME_T.base}`}
                >
                  {label}
                </Link>
              ) : (
                <span className={`min-w-0 truncate tracking-tight text-brand-sub ${CHROME_T.base}`}>
                  {label}
                </span>
              )}
              {chip && (
                <span
                  className={`hidden flex-none rounded-md bg-brand-violet/10 px-2 py-0.5 text-brand-violet md:inline ${CHROME_T.badge}`}
                >
                  {chip}
                </span>
              )}
            </span>
          </>
        )}

        {/* ── 뒤로가기 — 화살표는 항상 남긴다. 라벨만 접어야 좁은 폭에서 상위로 갈 길이 사라지지 않는다 ── */}
        {back && <UpLink href={back.href} label={back.label} />}

        {/* ── 우측 슬롯 ──
               min-w-0 이어야 좁은 폭에서 내용이 뷰포트를 밀어내지 않는다.
               (양쪽 블록이 모두 flex-none 이면 320~390px 에서 문서 전체에 가로 스크롤이 생긴다) */}
        <div className="ml-auto flex min-w-0 items-center gap-3">{children}</div>
      </div>
    </header>
  );
}

/* ════════════════ 우측 슬롯 조각 — 바 밖에서는 쓰지 않는다 ════════════════ */

/**
 * 사이트 네비 — 활성 판정과 aria-current 를 여기서만 한다.
 * 좁은 폭에서는 좌우 padding 을 줄이고, 그래도 넘치면 네비 안에서만 가로 스크롤한다
 * (문서 전체가 밀리지 않게 하는 마지막 방어선).
 */
export function TopBarNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="사이트 네비게이션"
      className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((n) => {
        const on = pathname === n.href || pathname.startsWith(`${n.href}/`);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={on ? "page" : undefined}
            className={`flex-none rounded-lg px-2 py-1.5 transition-colors sm:px-3 ${CHROME_T.base} ${
              on
                ? "bg-brand-violet/10 text-brand-violetDeep"
                : "text-brand-sub hover:bg-surface-mist hover:text-brand-violet"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** 우측 보조 텍스트 (덱의 현재 슬라이드명) */
export function TopBarNote({ children }: { children: ReactNode }) {
  return (
    <span
      className={`hidden max-w-[200px] truncate text-right tracking-tight text-brand-ink md:inline ${CHROME_T.base}`}
    >
      {children}
    </span>
  );
}

/** 01 / 28 카운터 */
export function TopBarCounter({ current, total }: { current: number; total: number }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span
      className={`flex flex-none items-center gap-1.5 tracking-wide text-brand-sub ${CHROME_T.control}`}
    >
      <span className="text-brand-ink">{pad(current)}</span>
      <span className="text-brand-faint">/</span>
      <span>{pad(total)}</span>
    </span>
  );
}

/** 크롬 토글 버튼 — 목차 토글·실습 목차가 덱 SCROLL 버튼과 같은 pill 모양을 공유한다 */
export function TopBarButton({
  active = false,
  onClick,
  title,
  pressed,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  /** 좁은 폭에서 라벨이 숨으면 이 값이 접근 이름이 된다 (글리프는 aria-hidden 으로 감싼다) */
  title?: string;
  /** 토글 버튼이면 현재 눌린 상태 */
  pressed?: boolean;
  children: ReactNode;
}) {
  return (
    <ChromePill as="button" active={active} onClick={onClick} title={title} pressed={pressed}>
      {children}
    </ChromePill>
  );
}

export { ChromeDivider, UpLink };
