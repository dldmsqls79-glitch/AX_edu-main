import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/slide-kit";
import { PageHero } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import {
  HSAD_META,
  HSAD_SECTIONS,
  HSAD_STATS,
  hs,
  RPES,
  SOLUTION_AREAS,
} from "@/lib/hsad-data";
import { IDEA_STATS } from "@/lib/hsad-ideas-data";
import { PROJECTS } from "@/lib/projects";
import { ACCENTS } from "@/lib/theme";

export const metadata: Metadata = {
  title: PROJECTS.hsad.name,
  description: `${HSAD_META.subtitle} — ${HSAD_META.title}.`,
};

export default function HsadHome() {
  return (
    <>
      <SiteHeader project="hsad" />

      <main className="bg-surface-sunken">
        <PageHero
          crumb="기획서"
          eyebrow="AX WITH HSAD"
          title={HSAD_META.title}
          desc={
            <>
              {HSAD_META.lead}
              <br />
              <span className="mt-2 inline-block text-[13px] font-semibold text-brand-faint">
                {HSAD_META.subtitle} · {HSAD_META.date}
              </span>
            </>
          }
        />

        {/* ── 한 장 요약 : 프로세스 네 단계 ── */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-[24px] font-extrabold tracking-tight md:text-[28px]">
                  광고 프로세스 전 단계를 AI로
                </h2>
                <span className="text-[12.5px] font-semibold text-brand-mut">
                  {HSAD_STATS.areas}개 영역 · {HSAD_STATS.groups}개 기능 그룹 ·{" "}
                  {HSAD_STATS.features}개 세부 기능
                </span>
              </div>
            </Reveal>

            <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {SOLUTION_AREAS.map((area, i) => {
                const a = ACCENTS[area.accent];
                return (
                  <Reveal key={area.slug} delay={0.05 * i} className="h-full">
                    <Link
                      href={hs(`/framework/${area.slug}`)}
                      className="edge-top group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise transition-all duration-200 hover:-translate-y-1.5 hover:shadow-raiseHover"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-[3px]"
                        style={{ background: a.main, opacity: 0.85 }}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="font-display text-[13px] font-bold tracking-[0.14em]"
                          style={{ color: a.deep }}
                        >
                          {area.code}
                        </span>
                        <span className="flex-none rounded-full bg-surface-mist px-2 py-0.5 text-[10.5px] font-bold text-brand-mut">
                          {area.owner}
                        </span>
                      </div>

                      <h3 className="mt-2.5 text-[19px] font-extrabold leading-tight tracking-tight">
                        {area.title}
                      </h3>
                      <p className="mt-2.5 flex-1 text-[12.5px] leading-[1.7] text-brand-mut">
                        {area.aim}
                      </p>

                      <ul className="mt-4 space-y-1">
                        {area.groups.map((g) => (
                          <li
                            key={g.no}
                            className="truncate text-[11.5px] font-semibold text-brand-faint"
                          >
                            {g.no} {g.title}
                          </li>
                        ))}
                      </ul>

                      <span
                        className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-bold transition-transform group-hover:translate-x-1"
                        style={{ color: a.deep }}
                      >
                        자세히 <span aria-hidden>→</span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            {/* 발표용 한 벌 — 같은 내용을 슬라이드로 훑는 길 */}
            <Reveal delay={0.22}>
              <Link
                href={hs("/deck")}
                className="edge-top group mt-3 flex flex-wrap items-center gap-x-5 gap-y-2.5 rounded-2xl border border-line bg-surface-raise px-6 py-5 shadow-e1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-raiseHover"
              >
                <span className="rounded-lg bg-brand-violet/10 px-2.5 py-1 font-display text-[11.5px] font-bold text-brand-violet shadow-pill">
                  프레젠테이션
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block text-[16px] font-extrabold tracking-tight">
                    기획서와 개발 기획을 한 벌로 보기
                  </b>
                  {/* 장수는 적지 않는다 — "14장"/"12장"이 손으로 박혀 있어 늘 어긋났다.
                      내용 수만 데이터에서 파생시킨다. */}
                  <span className="mt-0.5 block text-[12.5px] text-brand-mut">
                    차별화 · 기능 체계 · R-PES · 타겟 제안 + 기능 연계도와 아이디어{" "}
                    {IDEA_STATS.ideas}건 · 우선순위 체크
                  </span>
                </span>
                <span className="text-[12.5px] font-bold text-brand-violet transition-transform group-hover:translate-x-1">
                  발표 자료 열기 →
                </span>
              </Link>
            </Reveal>

            {/* 신규 프레젠테이션 자리 — 자료가 정해지면 여기에 붙인다.
                라우트를 미리 만들지 않는다: `PROJECTS.hsad.nav` 와 `tests/routes.ts` 가
                네비 href 까지 200 을 검사하므로, 빈 라우트를 올리면 404 로 잡힌다.
                점선 + 커서 금지로 '아직 없음'을 모양으로 말한다(홈의 '준비 중' 카드와 같은 관습). */}
            <Reveal delay={0.25}>
              <div
                aria-disabled
                className="mt-3 flex cursor-not-allowed flex-wrap items-center gap-x-5 gap-y-2.5 rounded-2xl border border-dashed border-line bg-white/45 px-6 py-5"
              >
                <span className="rounded-lg bg-brand-ink/[0.05] px-2.5 py-1 font-display text-[11.5px] font-bold text-brand-faint">
                  준비 중
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block text-[16px] font-extrabold tracking-tight text-brand-faint">
                    신규 프레젠테이션
                  </b>
                  <span className="mt-0.5 block text-[12.5px] text-brand-faint">
                    자료가 준비되면 이 자리에 열립니다.
                  </span>
                </span>
                <span className="text-[12.5px] font-bold text-brand-faint">준비 중</span>
              </div>
            </Reveal>

            {/* R-PES 한 줄 요약 — 네 영역이 어떻게 이어지는지 */}
            <Reveal delay={0.28}>
              <Link
                href={hs("/pipeline")}
                className="edge-top group mt-3 flex flex-wrap items-center gap-x-5 gap-y-2.5 rounded-2xl border border-line bg-surface-raise px-6 py-5 shadow-e1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-raiseHover"
              >
                <span className="rounded-lg bg-brand-violet/10 px-2.5 py-1 font-display text-[11.5px] font-bold text-brand-violet shadow-pill">
                  {RPES.abbr}
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block text-[16px] font-extrabold tracking-tight">
                    네 영역을 하나의 실시간 엔진으로
                  </b>
                  <span className="mt-0.5 block text-[12.5px] text-brand-mut">
                    {RPES.name} · {RPES.ko}
                  </span>
                </span>
                <span className="text-[12.5px] font-bold text-brand-violet transition-transform group-hover:translate-x-1">
                  파이프라인 보기 →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── 목차 ── */}
        <section className="bg-surface-sunken">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <Reveal>
              <h2 className="text-[24px] font-extrabold tracking-tight md:text-[28px]">목차</h2>
            </Reveal>

            <div className="mt-7 space-y-2.5">
              {HSAD_SECTIONS.map((s, i) => (
                <Reveal key={s.slug} delay={0.05 * i}>
                  <Link
                    href={hs(`/${s.slug}`)}
                    className="edge-top group flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-line bg-surface-raise px-6 py-5 shadow-e1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-raiseHover"
                  >
                    <span className="font-display text-[13px] font-bold text-brand-violet">
                      {s.num}
                    </span>
                    <span className="min-w-0 flex-1">
                      <b className="block text-[17px] font-extrabold tracking-tight">{s.title}</b>
                      <span className="mt-0.5 block text-[12.5px] text-brand-mut">{s.desc}</span>
                    </span>
                    <span
                      aria-hidden
                      className="text-[13px] font-bold text-brand-violet transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 text-[12px] leading-[1.7] text-brand-faint">
              본 문서는 {HSAD_META.source}를 기반으로 정리한 기획서입니다.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
