import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/slide-kit";
import { PageHero } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { DocHead, DocSection, DocTable, SectionPager, Td, Th } from "@/components/hsad/kit";
import { findSection, hs, SOLUTION_AREAS } from "@/lib/hsad-data";
import { PROJECTS } from "@/lib/projects";
import { ACCENTS } from "@/lib/theme";

const SECTION = findSection("framework")!;

export const metadata: Metadata = {
  title: SECTION.title,
  description: SECTION.desc,
};

export default function FrameworkPage() {
  return (
    <>
      <SiteHeader project="hsad" label="기획서" labelHref={hs()} chip={SECTION.num} />

      <main className="bg-surface-sunken">
        <PageHero
          parent={{ href: hs(), label: PROJECTS.hsad.name }}
          crumb={SECTION.title}
          eyebrow={SECTION.eyebrow}
          title={SECTION.title}
          desc="HSAD의 기존 솔루션과 Wisebirds의 데이터·크리에이티브 역량을 결합해, 광고 프로세스 전 단계를 AI로 자동화·간편화합니다."
        />

        {/* ── 총괄표 ── */}
        <DocSection>
          <DocHead
            title="총괄 — 누가 무엇을 맡는가"
            desc="네 단계를 두 회사가 나눠 맡습니다. 각 열을 눌러 세부 기능으로 들어갑니다."
          />

          <Reveal delay={0.06}>
            <div className="mt-7">
              <DocTable>
                <thead>
                  <tr>
                    <Th className="w-[110px]">구분</Th>
                    {SOLUTION_AREAS.map((a) => (
                      <Th key={a.slug}>
                        <Link
                          href={hs(`/framework/${a.slug}`)}
                          className="transition-colors hover:text-brand-violet"
                          style={{ color: ACCENTS[a.accent].deep }}
                        >
                          {a.code}. {a.title} →
                        </Link>
                      </Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td className="font-bold text-brand-ink">활용 주체</Td>
                    {SOLUTION_AREAS.map((a) => (
                      <Td key={a.slug} className="font-semibold text-brand-sub">
                        {a.owner === "HSAD" ? "HSAD 기존 솔루션" : "Wisebirds 솔루션"}
                      </Td>
                    ))}
                  </tr>
                  <tr>
                    <Td className="font-bold text-brand-ink">AI 간편화</Td>
                    {SOLUTION_AREAS.map((a) => (
                      <Td key={a.slug}>{a.aim}</Td>
                    ))}
                  </tr>
                  <tr>
                    <Td className="font-bold text-brand-ink">기능 그룹</Td>
                    {SOLUTION_AREAS.map((a) => (
                      <Td key={a.slug}>
                        <ol className="space-y-1">
                          {a.groups.map((g, i) => (
                            <li key={g.no}>
                              <span className="font-display text-[11.5px] font-bold text-brand-faint">
                                {["①", "②", "③", "④"][i]}
                              </span>{" "}
                              {g.title}
                            </li>
                          ))}
                        </ol>
                      </Td>
                    ))}
                  </tr>
                </tbody>
              </DocTable>
            </div>
          </Reveal>
        </DocSection>

        {/* ── 영역 카드 ── */}
        <DocSection tone="sunken">
          <DocHead title="영역별 상세" desc="각 영역의 기능 그룹과 세부 기능을 문서 그대로 옮겼습니다." />

          <div className="mt-7 grid gap-3.5 md:grid-cols-2">
            {SOLUTION_AREAS.map((area, i) => {
              const a = ACCENTS[area.accent];
              const count = area.groups.reduce((n, g) => n + g.items.length, 0);
              return (
                <Reveal key={area.slug} delay={0.05 * i} className="h-full">
                  <Link
                    href={hs(`/framework/${area.slug}`)}
                    className="edge-top group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise transition-all duration-200 hover:-translate-y-1 hover:shadow-raiseHover"
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
                        {area.code}. {area.title}
                      </span>
                      <span className="flex-none rounded-full bg-surface-mist px-2 py-0.5 text-[10.5px] font-bold text-brand-mut">
                        {area.owner}
                      </span>
                    </div>

                    <p className="mt-3 flex-1 text-[13px] leading-[1.75] text-brand-mut">
                      {area.quote}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {area.groups.map((g) => (
                        <span
                          key={g.no}
                          className="rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-bold text-brand-mut shadow-pill"
                        >
                          {g.title}
                        </span>
                      ))}
                    </div>

                    <span
                      className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-bold transition-transform group-hover:translate-x-1"
                      style={{ color: a.deep }}
                    >
                      세부 기능 {count}개 보기 <span aria-hidden>→</span>
                    </span>
                  </Link>
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
