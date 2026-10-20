import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/slide-kit";
import { PageHero, UpLink } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import {
  DocHead,
  DocSection,
  FeatureList,
  OpenIssues,
  Quote,
} from "@/components/hsad/kit";
import { findArea, hs, SHORTFORM_NOTE, SOLUTION_AREAS } from "@/lib/hsad-data";
import { ACCENTS } from "@/lib/theme";

type Params = { params: Promise<{ area: string }> };

/** 라우트 목록은 데이터에서 나온다 — 영역을 추가하면 페이지가 따라 생긴다 */
export function generateStaticParams() {
  return SOLUTION_AREAS.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { area } = await params;
  const a = findArea(area);
  if (!a) return {};
  return { title: `${a.code}. ${a.title}`, description: a.quote };
}

export default async function AreaPage({ params }: Params) {
  const { area } = await params;
  const a = findArea(area);
  if (!a) notFound();

  const i = SOLUTION_AREAS.indexOf(a);
  const prev = i > 0 ? SOLUTION_AREAS[i - 1] : null;
  const next = i < SOLUTION_AREAS.length - 1 ? SOLUTION_AREAS[i + 1] : null;

  return (
    <>
      <SiteHeader
        project="hsad"
        label={`${a.code}. ${a.title}`}
        labelHref={hs("/framework")}
        chip={a.owner}
      />

      <main className="bg-surface-sunken">
        <PageHero
          parent={{ href: hs("/framework"), label: "솔루션 기능 체계" }}
          crumb={`${a.code}. ${a.title}`}
          eyebrow={`${a.owner.toUpperCase()} · AREA ${a.code}`}
          title={a.title}
          desc={a.aim}
        />

        <DocSection>
          <Reveal>
            <Quote accent={a.accent}>{a.quote}</Quote>
          </Reveal>

          {a.slug === "creative" && (
            <Reveal delay={0.06}>
              <p className="mt-5 rounded-2xl border border-line bg-white p-5 text-[13px] leading-[1.75] text-brand-mut shadow-e1">
                {SHORTFORM_NOTE}
              </p>
            </Reveal>
          )}

          <div className="mt-9 space-y-10">
            {a.groups.map((g) => (
              <div key={g.no}>
                <DocHead no={g.no} title={g.title} />
                <div className="mt-4">
                  <FeatureList accent={a.accent} items={g.items} />
                </div>
              </div>
            ))}
          </div>

          {a.openIssues && (
            <Reveal>
              <div className="mt-9">
                <OpenIssues items={a.openIssues} />
              </div>
            </Reveal>
          )}
        </DocSection>

        {/* ── 영역 사이 이동 ── */}
        <section className="bg-surface-sunken">
          <div className="mx-auto max-w-page px-6 py-8">
            <UpLink href={hs("/framework")} label="전체 기능 체계" collapse={false} />

            <div className="mt-4 flex items-stretch gap-2.5">
              {[prev, next].map((n, idx) =>
                n ? (
                  <Link
                    key={n.slug}
                    href={hs(`/framework/${n.slug}`)}
                    /* min-w-0 — 없으면 셀이 제목 길이만큼 벌어져 좁은 폭에서 문서가 가로로 넘친다 */
                    className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-line bg-white px-5 py-3.5 shadow-e1 transition-colors hover:border-brand-violet/45 ${
                      idx === 1 ? "justify-end text-right" : ""
                    }`}
                  >
                    {idx === 0 && (
                      <span aria-hidden className="text-[15px] text-brand-faint">
                        ←
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-[11px] font-bold text-brand-faint">
                        {idx === 0 ? "이전" : "다음"} · {n.owner}
                      </span>
                      <span
                        className="block truncate text-[13.5px] font-bold"
                        style={{ color: ACCENTS[n.accent].deep }}
                      >
                        {n.code}. {n.title}
                      </span>
                    </span>
                    {idx === 1 && (
                      <span aria-hidden className="text-[15px] text-brand-faint">
                        →
                      </span>
                    )}
                  </Link>
                ) : (
                  <span key={idx} className="flex-1" />
                )
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
