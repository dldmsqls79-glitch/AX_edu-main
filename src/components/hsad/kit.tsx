import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/slide-kit";
import { ACCENTS, type Accent } from "@/lib/theme";
import { HSAD_SECTIONS, hs } from "@/lib/hsad-data";

/**
 * 기획서 문서 페이지 공통 조각.
 *
 * 크롬(상단 바·푸터·시트)이 아니라 **본문** 조각이라 chrome.tsx 에 넣지 않는다.
 * 대신 여기 하나에 모아, 섹션마다 표·목록 모양이 달라지지 않게 한다.
 */

/** 섹션 배경은 흰색 ↔ 가라앉은 면을 번갈아 둔다 (사이트 전체 규칙) */
export function DocSection({
  tone = "white",
  children,
}: {
  tone?: "white" | "sunken";
  children: ReactNode;
}) {
  return (
    <section
      className={`border-b border-line ${tone === "white" ? "bg-white" : "bg-surface-sunken"}`}
    >
      <div className="mx-auto max-w-page px-6 py-12 md:py-14">{children}</div>
    </section>
  );
}

export function DocHead({
  no,
  title,
  desc,
}: {
  no?: string;
  title: string;
  desc?: ReactNode;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-baseline gap-2.5">
        {no && (
          <span className="font-display text-[12px] font-bold tracking-[0.16em] text-brand-violet">
            {no}
          </span>
        )}
        <h2 className="text-[24px] font-extrabold tracking-tight md:text-[28px]">{title}</h2>
      </div>
      {desc && (
        <p className="mt-2.5 max-w-[760px] text-[13.5px] leading-[1.75] text-brand-mut">{desc}</p>
      )}
    </Reveal>
  );
}

/** 원문 인용 한 줄 — 각 영역이 무엇을 하는지 정의한 문장 */
export function Quote({ accent = "violet", children }: { accent?: Accent; children: ReactNode }) {
  const a = ACCENTS[accent];
  return (
    <p
      className="border-l-[3px] pl-4 text-[14px] font-semibold leading-[1.7] text-brand-sub"
      style={{ borderColor: a.main }}
    >
      {children}
    </p>
  );
}

/**
 * 가로로 넓은 표. **반드시 이 래퍼를 쓴다** —
 * 표가 스스로 스크롤하지 않으면 좁은 폭에서 문서 전체에 가로 스크롤이 생긴다
 * (`tests/routes.spec.ts` 가 360px 에서 검사한다).
 */
export function DocTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-e1">
      <table className="w-full min-w-[640px] border-collapse text-left">{children}</table>
    </div>
  );
}

export function Th({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <th
      scope="col"
      className={`border-b border-line bg-surface-mist px-4 py-3 text-[12px] font-bold text-brand-sub ${className}`}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <td
      className={`border-b border-line px-4 py-3.5 align-top text-[13px] leading-[1.7] text-brand-mut last:border-b-0 ${className}`}
    >
      {children}
    </td>
  );
}

/** 번호가 붙은 기능 목록 — 기획서의 `1) 2) 3)` 을 그대로 옮긴 모양 */
export function FeatureList({
  accent,
  items,
}: {
  accent: Accent;
  items: { title: string; body: string }[];
}) {
  const a = ACCENTS[accent];
  return (
    <ol className="space-y-2.5">
      {items.map((it, i) => (
        <li
          key={it.title}
          className="edge-top flex gap-3.5 rounded-2xl border border-line bg-surface-raise p-5 shadow-e1"
        >
          <span
            className="mt-px flex h-6 w-6 flex-none items-center justify-center rounded-lg font-display text-[11.5px] font-bold"
            style={{ background: a.soft, color: a.deep }}
          >
            {i + 1}
          </span>
          <div className="min-w-0">
            <b className="block text-[14.5px] font-extrabold tracking-tight text-brand-ink">
              {it.title}
            </b>
            <p className="mt-1.5 text-[13px] leading-[1.75] text-brand-mut">{it.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** 아직 정리 중인 논점 — 확정된 기능과 눈으로 구분되게 점선으로 둔다 */
export function OpenIssues({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white/50 p-5">
      <b className="block text-[13px] font-extrabold text-brand-mut">추가 논의 포인트</b>
      <ul className="mt-2.5 space-y-2">
        {items.map((t) => (
          <li key={t} className="flex gap-2 text-[13px] leading-[1.7] text-brand-mut">
            <span aria-hidden className="flex-none text-brand-faint">
              ·
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 섹션 사이 이동 — 문서를 순서대로 읽을 수 있게 한다.
 * 목록은 `HSAD_SECTIONS` 에서 파생되므로 섹션을 추가해도 따라온다.
 */
export function SectionPager({ slug }: { slug: string }) {
  const i = HSAD_SECTIONS.findIndex((s) => s.slug === slug);
  const prev = i > 0 ? HSAD_SECTIONS[i - 1] : null;
  const next = i >= 0 && i < HSAD_SECTIONS.length - 1 ? HSAD_SECTIONS[i + 1] : null;

  // min-w-0 이 링크(부모)에도 있어야 truncate 가 실제로 걸린다 —
  // flex item 의 기본 min-width:auto 때문에, 자식에만 걸면 셀이 제목 길이만큼 벌어져 문서가 가로로 넘친다
  const cell =
    "flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-line bg-white px-5 py-3.5 shadow-e1 transition-colors hover:border-brand-violet/45";

  return (
    <section className="bg-surface-sunken">
      <div className="mx-auto flex max-w-page items-stretch gap-2.5 px-6 py-8">
        {prev ? (
          <Link href={hs(`/${prev.slug}`)} className={cell}>
            <span aria-hidden className="text-[15px] text-brand-faint">
              ←
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-bold text-brand-faint">
                이전 · {prev.num}
              </span>
              <span className="block truncate text-[13.5px] font-bold text-brand-sub">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <Link href={hs()} className={cell}>
            <span aria-hidden className="text-[15px] text-brand-faint">
              ←
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-bold text-brand-faint">돌아가기</span>
              <span className="block truncate text-[13.5px] font-bold text-brand-sub">
                기획서 첫 화면
              </span>
            </span>
          </Link>
        )}

        {next && (
          <Link href={hs(`/${next.slug}`)} className={`${cell} justify-end text-right`}>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-bold text-brand-faint">
                다음 · {next.num}
              </span>
              <span className="block truncate text-[13.5px] font-bold text-brand-sub">
                {next.title}
              </span>
            </span>
            <span aria-hidden className="text-[15px] text-brand-faint">
              →
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
