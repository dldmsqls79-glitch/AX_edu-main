import type { Metadata } from "next";
import { Reveal } from "@/components/slide-kit";
import { PageHero } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { DocHead, DocSection, DocTable, SectionPager, Td, Th } from "@/components/hsad/kit";
import { EXPECTED_EFFECTS, findSection, HSAD_META, hs, TARGET_INDUSTRIES } from "@/lib/hsad-data";
import { PROJECTS } from "@/lib/projects";
import { ACCENTS } from "@/lib/theme";

const SECTION = findSection("scope")!;

export const metadata: Metadata = {
  title: SECTION.title,
  description: SECTION.desc,
};

export default function ScopePage() {
  return (
    <>
      <SiteHeader project="hsad" label="기획서" labelHref={hs()} chip={SECTION.num} />

      <main className="bg-surface-sunken">
        <PageHero
          parent={{ href: hs(), label: PROJECTS.hsad.name }}
          crumb={SECTION.title}
          eyebrow={SECTION.eyebrow}
          title={SECTION.title}
          desc={SECTION.desc}
        />

        {/* ── 타겟 업종 ── */}
        <DocSection>
          <DocHead
            no="06"
            title="타겟 업종 및 브랜드 제안"
            desc="집행 이력·RFP 유입·비딩 사례가 있어 먼저 붙일 수 있는 곳부터."
          />

          <Reveal delay={0.06}>
            <div className="mt-7">
              <DocTable>
                <thead>
                  <tr>
                    <Th className="w-[130px]">업종</Th>
                    <Th className="w-[30%]">브랜드</Th>
                    <Th>비고</Th>
                  </tr>
                </thead>
                <tbody>
                  {TARGET_INDUSTRIES.map((t) => (
                    <tr key={t.industry}>
                      <Td className="font-bold text-brand-ink">{t.industry}</Td>
                      <Td>
                        <span className="flex flex-wrap gap-1.5">
                          {t.brands.map((b) => (
                            <span
                              key={b}
                              className="rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] font-bold text-brand-sub shadow-pill"
                            >
                              {b}
                            </span>
                          ))}
                        </span>
                      </Td>
                      <Td>{t.note}</Td>
                    </tr>
                  ))}
                </tbody>
              </DocTable>
            </div>
          </Reveal>
        </DocSection>

        {/* ── 기대 효과 ── */}
        <DocSection tone="sunken">
          <DocHead no="07" title="기대 효과" />

          <div className="mt-7 grid gap-3.5 md:grid-cols-2">
            {EXPECTED_EFFECTS.map((e, i) => {
              const a = ACCENTS[e.accent];
              return (
                <Reveal key={e.title} delay={0.06 * i} className="h-full">
                  <div className="edge-top relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: a.main, opacity: 0.85 }}
                    />
                    <h3
                      className="text-[19px] font-extrabold tracking-tight"
                      style={{ color: a.deep }}
                    >
                      {e.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-[1.75] text-brand-mut">{e.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-8 text-[12px] leading-[1.7] text-brand-faint">
            본 문서는 {HSAD_META.source}를 기반으로 정리한 기획서입니다.
          </p>
        </DocSection>

        <SectionPager slug={SECTION.slug} />
      </main>

      <SiteFooter />
    </>
  );
}
