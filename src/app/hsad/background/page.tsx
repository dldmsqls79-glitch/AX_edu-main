import type { Metadata } from "next";
import { Reveal } from "@/components/slide-kit";
import { PageHero } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { DocHead, DocSection, DocTable, SectionPager, Td, Th } from "@/components/hsad/kit";
import { DIFFERENTIATORS, findSection, hs, PAIN_POINTS } from "@/lib/hsad-data";
import { PROJECTS } from "@/lib/projects";
import { ACCENTS } from "@/lib/theme";

const SECTION = findSection("background")!;

export const metadata: Metadata = {
  title: SECTION.title,
  description: SECTION.desc,
};

export default function BackgroundPage() {
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

        {/* ── 1-1. 차별점 ── */}
        <DocSection>
          <DocHead
            no="1-1"
            title="기존 퍼포먼스 대행사 제안과의 차별점"
            desc="같은 축을 놓고 봤을 때 제안의 출발점부터 최종 KPI까지 무엇이 달라지는지."
          />

          <Reveal delay={0.06}>
            <div className="mt-7">
              <DocTable>
                <thead>
                  <tr>
                    <Th className="w-[110px]">구분</Th>
                    <Th className="w-[34%]">기존 퍼포먼스 대행사</Th>
                    <Th>본 솔루션 · 퍼포먼스 브랜딩</Th>
                  </tr>
                </thead>
                <tbody>
                  {DIFFERENTIATORS.map((d) => (
                    <tr key={d.axis}>
                      <Td className="font-bold text-brand-ink">{d.axis}</Td>
                      <Td className="text-brand-faint">{d.legacy}</Td>
                      <Td className="font-semibold text-brand-sub">{d.ours}</Td>
                    </tr>
                  ))}
                </tbody>
              </DocTable>
            </div>
          </Reveal>
        </DocSection>

        {/* ── 1-2. 페인포인트 ── */}
        <DocSection tone="sunken">
          <DocHead
            no="1-2"
            title="지금 퍼포먼스 마케팅이 막혀 있는 곳"
            desc="네 가지 페인포인트와, 각각을 어떤 기능으로 푸는지. 오른쪽은 그 문제가 걸려 있는 CDJ 단계."
          />

          <div className="mt-7 grid gap-3.5 lg:grid-cols-2">
            {PAIN_POINTS.map((pt, i) => {
              const a = ACCENTS[pt.accent];
              return (
                <Reveal key={pt.no} delay={0.06 * i} className="h-full">
                  <article className="edge-top relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: a.main, opacity: 0.85 }}
                    />

                    <div className="flex items-center gap-2.5">
                      <span
                        className="rounded-lg px-2 py-0.5 font-display text-[11.5px] font-bold"
                        style={{ background: a.soft, color: a.deep }}
                      >
                        {pt.no}
                      </span>
                      <h3 className="text-[18px] font-extrabold tracking-tight">{pt.headline}</h3>
                    </div>

                    <p className="mt-3 text-[13px] leading-[1.75] text-brand-mut">{pt.pain}</p>

                    <div className="mt-4 rounded-xl border border-line bg-white p-4">
                      <b className="block text-[11.5px] font-bold text-brand-faint">보완 솔루션</b>
                      <p className="mt-1.5 text-[13px] leading-[1.75] text-brand-sub">{pt.fix}</p>
                    </div>

                    <p className="mt-auto pt-4 text-[12px] font-semibold leading-[1.6] text-brand-faint">
                      <span className="font-bold">CDJ</span> · {pt.cdj}
                    </p>
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
