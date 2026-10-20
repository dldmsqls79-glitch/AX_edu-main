import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/slide-kit";
import { PageHero } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { PROJECTS, wb } from "@/lib/projects";

export const metadata: Metadata = {
  title: "교육 사례 프로토타입",
  description:
    "웹 프레젠테이션 형태로 만들어 본 교육 자료 사례 — W-Insight 앱 광고 교육 중급편.",
};

const PARTS: [string, string, string][] = [
  ["A", "앱 리타겟팅", "Re-engagement vs Re-attribution · MMP 설정 · iOS 제약"],
  ["B", "iOS SKAN", "Conversion Value · 다중 포스트백 · Crowd Anonymity"],
  ["C", "웹투앱 · 앱투웹", "딥링크 · OneLink 라우팅 · 측정 연속성"],
];

export default function PrototypePage() {
  return (
    <>
      {/* 이 페이지는 네비의 '교육 사례'가 활성 표시되므로 자료명 슬롯을 비운다 */}
      <SiteHeader project="wisebirds" />

      <main className="bg-surface-sunken">
        <PageHero
          parent={{ href: wb(), label: PROJECTS.wisebirds.name }}
          crumb="교육 사례 프로토타입"
          eyebrow="PROTOTYPE"
          title="교육 사례 프로토타입"
          desc="사내 교육 회차와는 별도로, 교육 자료를 웹 프레젠테이션으로 만들면 어떤 모습이 되는지 시험해 본 사례입니다. 정규 회차 자료가 아니라 형태를 검증하기 위한 프로토타입입니다."
        />
        {/* ── 사례 ── */}
        <section className="bg-white">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <Reveal>
              <Link
                href={wb("/prototype/app-ads")}
                className="edge-top group relative block overflow-hidden rounded-2xl border border-line bg-surface-raise shadow-raise transition-all duration-200 hover:-translate-y-1 hover:shadow-raiseHover"
              >
                <span aria-hidden className="block h-1 bg-grad-violet" />
                <div className="grid gap-7 p-6 md:grid-cols-[1.05fr_1fr] md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-lg bg-brand-violet/10 px-2.5 py-1 font-display text-[12px] font-bold text-brand-violetDeep shadow-pill">
                        사례 01
                      </span>
                      <span className="text-[11.5px] font-bold text-brand-faint">
                        28장 · 스크롤 프레젠테이션
                      </span>
                    </div>

                    <h2 className="mt-3.5 text-[25px] font-extrabold leading-tight tracking-tight md:text-[29px]">
                      앱 광고 교육 · 중급편
                    </h2>
                    <p className="mt-2.5 text-[13.5px] leading-[1.75] text-brand-mut">
                      W-Insight 앱 광고 교육 중급편을 웹 덱으로 만든 사례입니다. 목표는
                      &lsquo;앱 광고 방식의 확장&rsquo;이고, 모든 슬라이드에 흐름도·목업·타임라인 같은
                      실제 시각화를 넣었습니다. 내용은 Appsflyer·Apple 공식 문서로 교차확인했습니다.
                    </p>

                    <span className="mt-6 flex w-fit items-center gap-1.5 text-[13.5px] font-bold text-brand-violet transition-transform group-hover:translate-x-1">
                      사례 열기 →
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {PARTS.map(([tag, title, desc]) => (
                      <li
                        key={tag}
                        className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-e1"
                      >
                        <span className="flex-none rounded-md bg-brand-violet/10 px-2 py-0.5 font-display text-[11px] font-bold text-brand-violetDeep">
                          {tag}
                        </span>
                        <span className="min-w-0 flex-1">
                          <b className="block truncate text-[13.5px] font-extrabold">{title}</b>
                          <span className="block truncate text-[11.5px] text-brand-faint">
                            {desc}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-3.5 rounded-2xl border border-dashed border-line bg-white/45 p-6">
                <h3 className="text-[15px] font-extrabold tracking-tight text-brand-faint">
                  다음 사례 준비 중
                </h3>
                <p className="mt-1.5 text-[13px] leading-[1.7] text-brand-faint">
                  다른 교육 주제도 같은 형태로 만들어 볼 예정입니다.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
