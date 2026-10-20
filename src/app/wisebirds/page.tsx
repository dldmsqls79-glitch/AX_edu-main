import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/slide-kit";
import { Eyebrow } from "@/components/site/chrome";
import { HeroCanvas } from "@/components/site/HeroCanvas";
import { HeroDeckMock } from "@/components/site/HeroDeckMock";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { LAB_BASE, LAB_STATS } from "@/lib/lab-data";
import { S2_META } from "@/lib/session2-data";
import { PROJECTS, wb } from "@/lib/projects";

export const metadata: Metadata = {
  title: PROJECTS.wisebirds.name,
  description:
    "와이즈버즈 사내 AX 프로그램 — 회차별 교육 자료, AI 프롬프트 실습, 프롬프트 라이브러리.",
};

const PILLARS = [
  {
    tag: "01",
    title: "배운다",
    desc: "도구·측정·전략의 기준을 팀 전체가 같은 수준으로 맞춥니다. 회차별 교육 자료는 언제든 다시 열어볼 수 있습니다.",
    accent: "#7c3aed",
  },
  {
    tag: "02",
    title: "적용한다",
    desc: "배운 것을 그날의 업무에 바로 붙입니다. 실습 프롬프트를 복사해 쓰고, 예시 파일로 결과를 확인합니다.",
    accent: "#2563eb",
  },
  {
    tag: "03",
    title: "남긴다",
    desc: "검증된 프롬프트와 산출물을 개인 노하우가 아니라 팀 자산으로 남깁니다. 담당자가 바뀌어도 품질이 유지됩니다.",
    accent: "#0d9488",
  },
];

const CATEGORIES = [
  {
    href: wb("/edu"),
    label: "사내 교육",
    en: "INTERNAL EDUCATION",
    desc: "회차별 사내 교육 자료. 1회차 개발 온보딩, 2회차 API · MCP · 키값 관리가 열려 있습니다.",
    meta: "2개 회차",
    live: true,
  },
  {
    href: wb("/prototype"),
    label: "교육 사례 프로토타입",
    en: "PROTOTYPE",
    desc: "웹 프레젠테이션 형태로 만들어 본 교육 자료 사례. 앱 광고 교육 중급편.",
    meta: "1개 사례",
    live: true,
  },
  {
    href: wb("/library"),
    label: "프롬프트 라이브러리",
    en: "PROMPT LIBRARY",
    desc: "실무 프롬프트를 모듈·직무·도구로 찾아 바로 복사해 쓰는 공용 저장소.",
    meta: `${LAB_STATS.prompts}개 프롬프트`,
    live: true,
  },
  {
    href: "",
    label: "AI 도구 가이드",
    en: "TOOL GUIDE",
    desc: "사내에서 쓰는 생성형 AI 도구의 계정·보안 기준과 도구별 강점 정리.",
    meta: "준비 중",
    live: false,
  },
];

const OPEN_NOW = [
  {
    href: wb("/edu/session-1"),
    tag: "1회차",
    tagClass: "bg-brand-indigo/10 text-brand-indigo",
    title: "개발 인프라 구축 가이드",
    desc: "Node.js · VS Code · Claude Code · GitHub · Vercel 배포 — 28장 프레젠테이션",
    cta: "발표 자료 열기",
    ctaClass: "text-brand-indigo",
  },
  {
    href: wb("/edu/session-2"),
    tag: "2회차",
    tagClass: "bg-brand-teal/10 text-brand-tealDeep",
    title: S2_META.title,
    desc: "깃허브 복습 · API 활용 순서 · MCP 연결과 활용 · 로컬 · Vercel 키값 관리",
    cta: "발표 자료 열기",
    ctaClass: "text-brand-teal",
  },
  {
    href: LAB_BASE,
    tag: "예시",
    tagClass: "bg-brand-teal/10 text-brand-tealDeep",
    title: "AI 프롬프트 실습",
    desc: `카피 제작 · 리포팅 자동화 · 데이터 분석 · 제안 — ${LAB_STATS.modules}개 모듈 ${LAB_STATS.labs}개 실습`,
    cta: "예시 열기",
    ctaClass: "text-brand-teal",
  },
  {
    href: wb("/prototype/app-ads"),
    tag: "프로토타입",
    tagClass: "bg-brand-violet/10 text-brand-violetDeep",
    title: "앱 광고 교육 중급편",
    desc: "앱 리타겟팅 · iOS SKAN · 웹투앱/앱투웹 — 28장 프레젠테이션",
    cta: "사례 열기",
    ctaClass: "text-brand-violet",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader project="wisebirds" />

      <main>
        {/* ═══════════ 히어로 ═══════════ */}
        <section className="relative overflow-hidden border-b border-line bg-hero-spot">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid-fine mask-fade-y opacity-60" />
            <HeroCanvas className="absolute inset-0 h-full w-full" />
            <div className="absolute -right-40 -top-44 h-[420px] w-[420px] rounded-full bg-grad-violet opacity-[0.13] blur-[100px]" />
            <div className="absolute -bottom-48 left-1/4 h-[380px] w-[380px] rounded-full bg-grad-blue opacity-[0.14] blur-[90px]" />
          </div>

          <div className="relative mx-auto grid max-w-page items-center gap-10 px-6 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-16">
            <div>
            <Reveal>
              <Eyebrow>WISEBIRDS · AI TRANSFORMATION</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-5 text-[40px] font-extrabold leading-[1.12] tracking-tight md:text-[58px]">
                광고 실무를
                <br />
                <span className="text-grad-violet">AI로 다시 설계한다</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 max-w-[600px] text-[15px] leading-[1.75] text-brand-sub md:text-[16px]">
                Wisebirds-AX는 사내 구성원이 생성형 AI를 실제 업무에 쓰도록 만드는 프로그램입니다.
                교육으로 기준을 맞추고, 실습으로 그날의 업무에 바로 적용합니다.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <Link
                  href={wb("/edu")}
                  className="inline-flex items-center gap-2 rounded-full bg-grad-violet px-6 py-3.5 text-[14.5px] font-bold text-white shadow-glowViolet transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  사내 교육 들어가기 →
                </Link>
                <Link
                  href={wb("/prototype")}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-card px-6 py-3.5 text-[14.5px] font-bold text-brand-sub shadow-pill transition-all hover:-translate-y-0.5 hover:text-brand-violetDeep active:translate-y-0"
                >
                  교육 사례 보기
                </Link>
              </div>
            </Reveal>

            {/* 지표 — 하나의 떠 있는 판 안에 구분선으로 나눈다 */}
            <Reveal delay={0.24}>
              <dl className="mt-10 inline-flex flex-wrap divide-x divide-line overflow-hidden rounded-2xl border border-line bg-surface-raise shadow-raise">
                {[
                  { n: "2", l: "교육 회차" },
                  { n: String(LAB_STATS.labs), l: "AI 실습" },
                  { n: String(LAB_STATS.prompts), l: "실습 프롬프트" },
                  { n: "1", l: "교육 사례" },
                ].map((s) => (
                  <div key={s.l} className="px-6 py-4 first:pl-7 last:pr-7">
                    <dt className="font-display text-[28px] font-bold leading-none text-brand-ink">
                      {s.n}
                    </dt>
                    <dd className="mt-1.5 text-[12px] font-bold text-brand-mut">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            </div>

            {/* 우측 시각물 */}
            <Reveal delay={0.14} className="hidden md:block">
              <HeroDeckMock />
            </Reveal>
          </div>
        </section>

        {/* ═══════════ AX는 무엇인가 ═══════════ */}
        <section className="border-b border-line bg-surface-sunken">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <Reveal>
              <span className="font-display text-[11px] font-bold tracking-[0.2em] text-brand-faint">
                WHAT AX MEANS HERE
              </span>
              <h2 className="mt-3 max-w-[720px] text-[26px] font-extrabold leading-[1.28] tracking-tight md:text-[32px]">
                도구를 도입하는 일이 아니라,
                <br />
                일하는 방식을 바꾸는 일입니다
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-3.5 md:grid-cols-3">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={0.06 * i} className="h-full">
                  <div className="edge-top relative h-full overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise transition-all duration-200 hover:-translate-y-1 hover:shadow-raiseHover">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: p.accent, opacity: 0.85 }}
                    />
                    <span
                      className="font-display text-[12px] font-bold tracking-[0.16em]"
                      style={{ color: p.accent }}
                    >
                      {p.tag}
                    </span>
                    <h3 className="mt-2.5 text-[20px] font-extrabold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-[1.75] text-brand-mut">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 카테고리 ═══════════ */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-[26px] font-extrabold tracking-tight md:text-[30px]">
                  카테고리
                </h2>
                <span className="text-[12.5px] font-semibold text-brand-mut">
                  사내 교육 · 교육 사례 · 프롬프트 라이브러리가 열려 있습니다
                </span>
              </div>
            </Reveal>

            <div className="mt-7 grid gap-3.5 md:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((c, i) => {
                const body = (
                  <div
                    className={`flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 ${
                      c.live
                        ? "edge-top relative overflow-hidden border-line bg-surface-raise shadow-raise hover:-translate-y-1.5 hover:shadow-raiseHover"
                        : "border-dashed border-line bg-white/45 shadow-none"
                    }`}
                  >
                    <span
                      className={`font-display text-[10px] font-bold tracking-[0.18em] ${
                        c.live ? "text-brand-violet" : "text-brand-faint"
                      }`}
                    >
                      {c.en}
                    </span>
                    <h3
                      className={`mt-2.5 text-[20px] font-extrabold leading-tight tracking-tight ${
                        c.live ? "" : "text-brand-faint"
                      }`}
                    >
                      {c.label}
                    </h3>
                    <p
                      className={`mt-2.5 flex-1 text-[13px] leading-[1.7] ${
                        c.live ? "text-brand-mut" : "text-brand-faint"
                      }`}
                    >
                      {c.desc}
                    </p>
                    <span
                      className={`mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-bold ${
                        c.live ? "text-brand-violet" : "text-brand-faint"
                      }`}
                    >
                      {c.meta}
                      {c.live && <span aria-hidden>→</span>}
                    </span>
                  </div>
                );

                return (
                  <Reveal key={c.label} delay={0.05 * i} className="h-full">
                    {c.live ? (
                      <Link href={c.href} className="group block h-full">
                        {body}
                      </Link>
                    ) : (
                      <div aria-disabled className="h-full cursor-not-allowed">
                        {body}
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 지금 열려 있는 것 ═══════════ */}
        <section className="bg-surface-sunken">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <Reveal>
              <h2 className="text-[26px] font-extrabold tracking-tight md:text-[30px]">
                지금 열려 있는 자료
              </h2>
            </Reveal>

            <div className="mt-7 space-y-2.5">
              {OPEN_NOW.map((o, i) => (
                <Reveal key={o.href} delay={0.05 * i}>
                  <Link
                    href={o.href}
                    className="edge-top group relative flex flex-wrap items-center gap-x-5 gap-y-2.5 overflow-hidden rounded-2xl border border-line bg-surface-raise px-6 py-5 shadow-e1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-raiseHover"
                  >
                    <span
                      className={`rounded-lg px-2.5 py-1 font-display text-[11.5px] font-bold shadow-pill ${o.tagClass}`}
                    >
                      {o.tag}
                    </span>
                    <span className="min-w-0 flex-1">
                      <b className="block text-[18px] font-extrabold tracking-tight">
                        {o.title}
                      </b>
                      <span className="mt-0.5 block text-[13px] text-brand-mut">{o.desc}</span>
                    </span>
                    <span
                      className={`text-[12.5px] font-bold transition-transform group-hover:translate-x-1 ${o.ctaClass}`}
                    >
                      {o.cta} →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
