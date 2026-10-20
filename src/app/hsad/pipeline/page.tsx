import type { Metadata } from "next";
import { Reveal } from "@/components/slide-kit";
import { PageHero } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { DocHead, DocSection, DocTable, Quote, SectionPager, Td, Th } from "@/components/hsad/kit";
import { BRAND_CASES, findSection, hs, RPES } from "@/lib/hsad-data";
import { PROJECTS } from "@/lib/projects";
import { ACCENTS } from "@/lib/theme";

const SECTION = findSection("pipeline")!;

export const metadata: Metadata = {
  title: SECTION.title,
  description: SECTION.desc,
};

/** 파이프라인 단계 색은 그 단계를 맡는 영역에서 가져온다 */
const AREA_ACCENT = { A: "blue", B: "navy", C: "teal", D: "violet" } as const;

export default function PipelinePage() {
  return (
    <>
      <SiteHeader project="hsad" label="기획서" labelHref={hs()} chip={SECTION.num} />

      <main className="bg-surface-sunken">
        <PageHero
          parent={{ href: hs(), label: PROJECTS.hsad.name }}
          crumb={RPES.abbr}
          eyebrow={SECTION.eyebrow}
          title={`${RPES.abbr} · ${RPES.ko}`}
          desc={RPES.name}
        />

        {/* ── 파이프라인 ── */}
        <DocSection>
          <Reveal>
            <Quote>{RPES.quote}</Quote>
          </Reveal>

          <div className="mt-8 grid gap-2.5 md:grid-cols-5">
            {RPES.steps.map((s, i) => {
              const a = ACCENTS[AREA_ACCENT[s.area]];
              return (
                <Reveal key={`${s.area}-${i}`} delay={0.05 * i} className="h-full">
                  <div className="edge-top relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-raise p-5 shadow-raise">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: a.main, opacity: 0.85 }}
                    />
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 flex-none items-center justify-center rounded-lg font-display text-[11.5px] font-bold"
                        style={{ background: a.soft, color: a.deep }}
                      >
                        {s.area}
                      </span>
                      <span className="font-display text-[11px] font-bold text-brand-faint">
                        STEP {i + 1}
                      </span>
                    </div>
                    <b className="mt-2.5 block text-[14.5px] font-extrabold leading-tight tracking-tight">
                      {s.title}
                    </b>
                    <span className="mt-1.5 block text-[12px] leading-[1.6] text-brand-mut">
                      {s.sub}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-4 text-[12px] font-semibold text-brand-faint">
            A · B 는 HSAD 기존 솔루션, C · D 는 Wisebirds 솔루션 영역입니다.
          </p>
        </DocSection>

        {/* ── 브랜드 적용 예시 ── */}
        <DocSection tone="sunken">
          <DocHead
            title="브랜드 적용 예시"
            desc="같은 파이프라인을 브랜드 성격에 맞춰 어떻게 태우는지."
          />

          <div className="mt-7 space-y-3.5">
            {BRAND_CASES.map((c, i) => {
              const a = ACCENTS[c.accent];
              return (
                <Reveal key={`${c.brand}-${c.label}`} delay={0.05 * i}>
                  <article className="edge-top relative overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise md:p-7">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: a.main, opacity: 0.85 }}
                    />

                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className="rounded-lg px-2.5 py-1 font-display text-[12px] font-bold shadow-pill"
                        style={{ background: a.soft, color: a.deep }}
                      >
                        {c.brand}
                      </span>
                      <h3 className="text-[19px] font-extrabold tracking-tight">{c.label}</h3>
                    </div>

                    {c.pain && (
                      <p className="mt-4 rounded-xl border border-line bg-white p-4 text-[13px] leading-[1.75] text-brand-mut">
                        <b className="mb-1 block text-[11.5px] font-bold text-brand-faint">
                          페인포인트
                        </b>
                        {c.pain}
                      </p>
                    )}

                    <p className="mt-4 text-[13.5px] leading-[1.75] text-brand-sub">
                      <b className="text-brand-ink">핵심 방향성</b> · {c.direction}
                    </p>

                    {c.crawl && (
                      <p className="mt-2.5 text-[13px] leading-[1.75] text-brand-mut">
                        <b className="text-brand-sub">크롤링 데이터</b> · {c.crawl}
                      </p>
                    )}

                    {c.approach && (
                      <ol className="mt-4 space-y-2">
                        {c.approach.map((t, n) => (
                          <li key={t} className="flex gap-3 text-[13px] leading-[1.75] text-brand-mut">
                            <span
                              className="mt-px flex h-5 w-5 flex-none items-center justify-center rounded-md font-display text-[10.5px] font-bold"
                              style={{ background: a.soft, color: a.deep }}
                            >
                              {n + 1}
                            </span>
                            {t}
                          </li>
                        ))}
                      </ol>
                    )}

                    {c.rows && (
                      <div className="mt-5">
                        <DocTable>
                          <thead>
                            <tr>
                              <Th className="w-[28%]">페르소나</Th>
                              <Th className="w-[36%]">실시간 크롤링 데이터</Th>
                              <Th>크리에이티브</Th>
                            </tr>
                          </thead>
                          <tbody>
                            {c.rows.map((r) => (
                              <tr key={r.persona}>
                                <Td className="font-bold text-brand-ink">{r.persona}</Td>
                                <Td>{r.data}</Td>
                                <Td className="font-semibold text-brand-sub">{r.creative}</Td>
                              </tr>
                            ))}
                          </tbody>
                        </DocTable>
                      </div>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </DocSection>

        <SectionPager slug={SECTION.slug} />
      </main>

      <SiteFooter />
    </>
  );
}
