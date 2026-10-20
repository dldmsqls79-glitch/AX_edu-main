import Link from "next/link";
import type { ReactNode } from "react";
import { WisebirdsLogo } from "@/components/Logo";
import { Reveal } from "@/components/slide-kit";

/**
 * 크롬(껍데기) 공통 프리미티브.
 *
 * 상단 바·푸터·드로어·모달·덱 오버레이가 **같은 조각**을 쓰게 모아둔 곳이다.
 * 여기에 없는 새 모양을 페이지에서 직접 만들면 통일성이 깨진다.
 */

/** 크롬에서 쓸 수 있는 글자 크기 — 역할 1개당 1개, 이 네 가지뿐 */
export const CHROME_T = {
  /** 자료명 · 네비 · 보조 텍스트 */
  base: "text-[13px] font-bold",
  /** 뒤로가기 · 설명 */
  sub: "text-[12.5px] font-semibold",
  /** 컨트롤 · 카운터 · pill */
  control: "font-display text-[12px] font-bold",
  /** 배지 */
  badge: "text-[11px] font-bold",
};

/** 크롬 안의 모든 세로 구분선 */
export function ChromeDivider({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`h-4 w-px flex-none bg-line ${className}`} />;
}

/**
 * 크롬 pill — 상단 바 컨트롤, 덱 SCROLL 버튼, 도트 네비 라벨이 같은 모양을 공유한다.
 * `as="button"` 이면 버튼, 아니면 표시용 span.
 */
export function ChromePill({
  as = "span",
  active = false,
  onClick,
  title,
  pressed,
  className = "",
  style,
  children,
}: {
  as?: "button" | "span";
  active?: boolean;
  onClick?: () => void;
  title?: string;
  pressed?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const cls = `inline-flex flex-none items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${CHROME_T.control} ${
    active
      ? "border-brand-violet/35 bg-brand-violet/10 text-brand-violet"
      : "border-line bg-surface-card/80 text-brand-sub"
  } ${className}`;

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        title={title}
        aria-pressed={pressed}
        className={`${cls} hover:border-brand-violet/35 hover:text-brand-violet`}
        style={style}
      >
        {children}
      </button>
    );
  }
  return (
    <span className={cls} style={style}>
      {children}
    </span>
  );
}

/**
 * 상위로 가기 — 상단 바, 모듈 개요, 실습 상세가 모두 이것을 쓴다.
 * 글리프는 `←` 하나로 고정하고 `aria-hidden` 이라 스크린리더가 화살표를 읽지 않는다.
 * 라벨은 좁은 폭에서 접히지만 **화살표는 항상 남아** 상위로 가는 길이 사라지지 않는다.
 */
export function UpLink({
  href,
  label,
  collapse = true,
  className = "",
}: {
  href: string;
  label: string;
  /** true 면 sm 미만에서 라벨만 접는다 */
  collapse?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`inline-flex flex-none items-center gap-1 text-brand-mut transition-colors hover:text-brand-violet ${CHROME_T.sub} ${className}`}
    >
      <span aria-hidden>←</span>
      <span className={collapse ? "hidden sm:inline" : undefined}>{label}</span>
    </Link>
  );
}

/** 시트·모달 공통 헤더 (제목 + 부제 + 닫기) */
export function SheetHeader({
  title,
  sub,
  onClose,
}: {
  title: string;
  sub?: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-line bg-surface-card px-5 py-3.5">
      <div className="min-w-0">
        <b className="block text-[14px] font-extrabold">{title}</b>
        {sub && <span className="mt-0.5 block text-[12px] text-brand-mut">{sub}</span>}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="flex-none rounded-lg px-2 py-1 text-[18px] leading-none text-brand-mut transition-colors hover:bg-surface-mist"
      >
        ×
      </button>
    </div>
  );
}

/** 섹션 라벨 pill — 히어로 상단의 영문 eyebrow */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-violet/20 bg-surface-card/70 px-3.5 py-1.5 font-display text-[11px] font-bold tracking-[0.2em] text-brand-violetDeep shadow-pill backdrop-blur">
      {children}
    </span>
  );
}

/**
 * 페이지 헤더(히어로) — `/edu` · `/prototype` 같은 목록 페이지가 공유한다.
 * 배경(격자·blob·CI 워터마크)과 타이포 스케일이 한 곳에만 있어야 페이지마다 달라지지 않는다.
 */
export function PageHero({
  parent,
  crumb,
  eyebrow,
  title,
  desc,
}: {
  /**
   * 홈(포털)과 현재 위치 사이에 끼는 단계 — 프로젝트 홈.
   * 사이트가 포털 아래 프로젝트로 갈라지므로, 이게 없으면 '홈' 이 프로젝트를 건너뛴다.
   */
  parent?: { href: string; label: string };
  /** 브레드크럼의 현재 위치 (앞에 항상 '홈' 이 붙는다) */
  crumb: string;
  eyebrow: string;
  title: string;
  desc: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-hero-spot">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-fine mask-fade-y opacity-50" />
        <div className="absolute -right-24 -top-32 h-[340px] w-[340px] rounded-full bg-grad-violet opacity-[0.18] blur-[80px]" />
        {/* CI 심볼 라인 버전 워터마크 — 비어 있는 오른쪽에 브랜드 존재감을 준다 */}
        <WisebirdsLogo
          variant="symbol"
          tone="line"
          height={230}
          className="absolute bottom-[-46px] right-16 opacity-[0.13]"
        />
      </div>

      <div className="relative mx-auto max-w-page px-6 pb-12 pt-9 md:pb-14 md:pt-11">
        <Reveal>
          <nav
            aria-label="브레드크럼"
            className={`flex items-center gap-2 text-brand-mut ${CHROME_T.sub}`}
          >
            <Link href="/" className="transition-colors hover:text-brand-violet">
              홈
            </Link>
            <span aria-hidden className="text-brand-faint">
              /
            </span>
            {parent && (
              <>
                <Link
                  href={parent.href}
                  className="transition-colors hover:text-brand-violet"
                >
                  {parent.label}
                </Link>
                <span aria-hidden className="text-brand-faint">
                  /
                </span>
              </>
            )}
            <span className="text-brand-ink">{crumb}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.06}>
          <span className="mt-6 block">
            <Eyebrow>{eyebrow}</Eyebrow>
          </span>
          <h1 className="mt-4 text-[34px] font-extrabold leading-[1.16] tracking-tight md:text-[42px]">
            {title}
          </h1>
          <p className="mt-3.5 max-w-[620px] text-[14.5px] leading-[1.75] text-brand-sub">{desc}</p>
        </Reveal>
      </div>
    </section>
  );
}
