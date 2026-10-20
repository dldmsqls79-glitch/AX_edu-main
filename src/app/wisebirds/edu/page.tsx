import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/slide-kit";
import { PageHero } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { ACCENTS } from "@/lib/theme";
import { LAB_BASE, LAB_STATS, MODULES } from "@/lib/lab-data";
import { S2_META } from "@/lib/session2-data";
import { PROJECTS, wb } from "@/lib/projects";

export const metadata: Metadata = {
  title: "사내 교육",
  description:
    "Wisebirds-AX 사내 교육 — 1회차 개발 인프라 구축 가이드, 2회차 준비 중, 예시 AI 프롬프트 실습.",
};

const LOGOS = [
  { src: "/dev-edu/node.svg", alt: "Node.js" },
  { src: "/dev-edu/vscode.svg", alt: "VS Code" },
  { src: "/dev-edu/claude.svg", alt: "Claude Code" },
  { src: "/dev-edu/github.svg", alt: "GitHub" },
  { src: "/dev-edu/vercel.svg", alt: "Vercel" },
];

const S1_PARTS: [string, string, string][] = [
  ["01", "Node.js 설치", "런타임 · npm 준비"],
  ["02", "에디터 비교", "VS Code를 택한 이유"],
  ["03", "VS Code 설치", "메인 에디터 · 권장 확장"],
  ["04", "Claude Code 확장", "AI 페어 프로그래밍"],
  ["05", "GitHub 연동", "Git · 버전 관리 · 협업"],
  ["06", "Vercel 배포", "무료로 웹에 공개"],
];

export default function EduPage() {
  return (
    <>
      {/* 이 페이지는 네비의 '사내 교육'이 활성 표시되므로 자료명 슬롯을 비운다 (같은 단어 중복 방지) */}
      <SiteHeader project="wisebirds" />

      <main className="bg-surface-sunken">
        <PageHero
          parent={{ href: wb(), label: PROJECTS.wisebirds.name }}
          crumb="사내 교육"
          eyebrow="INTERNAL EDUCATION"
          title="사내 교육"
          desc="회차별 교육 자료입니다. 1회차는 개발 환경을 갖추는 온보딩이고, 2회차는 준비 중입니다. 「예시」는 AI를 실무에 붙이는 모듈형 실습으로, 자료가 어떤 형태가 되는지 미리 보여줍니다."
        />
        {/* ── 1회차 ── */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <Reveal>
              <Link
                href={wb("/edu/session-1")}
                className="edge-top group relative block overflow-hidden rounded-2xl border border-line bg-surface-raise shadow-raise transition-all duration-200 hover:-translate-y-1 hover:shadow-raiseHover"
              >
                <span aria-hidden className="block h-1 bg-grad-violet" />
                <div className="grid gap-7 p-6 md:grid-cols-[1.05fr_1fr] md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-lg bg-brand-indigo/10 px-2.5 py-1 font-display text-[12px] font-bold text-brand-indigo shadow-pill">
                        1회차
                      </span>
                      <span className="text-[11.5px] font-bold text-brand-faint">
                        28장 · 스크롤 프레젠테이션
                      </span>
                    </div>

                    <h2 className="mt-3.5 text-[25px] font-extrabold leading-tight tracking-tight md:text-[29px]">
                      개발 인프라 구축 가이드
                    </h2>
                    <p className="mt-2.5 text-[13.5px] leading-[1.75] text-brand-mut">
                      처음부터 따라 하는 개발 환경 세팅. Node.js 설치부터 에디터 비교,
                      Claude Code 확장, GitHub 연동, Vercel 무료 배포까지 이어집니다.
                      Windows · macOS 양쪽 가이드를 함께 제공합니다.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2 shadow-pill">
                        {LOGOS.map((l) => (
                          <img
                            key={l.alt}
                            src={l.src}
                            alt={l.alt}
                            width={22}
                            height={22}
                            className="block object-contain"
                          />
                        ))}
                      </span>
                      <span className="rounded-full border border-line bg-white px-2.5 py-1.5 text-[11.5px] font-bold text-brand-mut shadow-pill">
                        🪟 + 🍎 Windows · macOS
                      </span>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand-indigo transition-transform group-hover:translate-x-1">
                      발표 자료 열기 →
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {S1_PARTS.map(([no, title, desc]) => (
                      <li
                        key={no}
                        className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-2 shadow-e1"
                      >
                        <span className="flex-none rounded-md bg-brand-indigo/10 px-1.5 py-0.5 font-display text-[10.5px] font-bold text-brand-indigo">
                          {no}
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
          </div>
        </section>

        {/* ── 2회차 ── */}
        <section className="border-b border-line bg-surface-sunken">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <Reveal>
              <Link
                href={wb("/edu/session-2")}
                className="edge-top group relative block overflow-hidden rounded-2xl border border-line bg-surface-raise shadow-raise transition-all duration-200 hover:-translate-y-1 hover:shadow-raiseHover"
              >
                <span aria-hidden className="block h-1 bg-grad-teal" />
                <div className="grid gap-7 p-6 md:grid-cols-[1.05fr_1fr] md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-lg bg-brand-teal/10 px-2.5 py-1 font-display text-[12px] font-bold text-brand-tealDeep shadow-pill">
                        2회차
                      </span>
                      <span className="text-[11.5px] font-bold text-brand-faint">
                        {S2_META.agenda.length}개 파트 · 스크롤 프레젠테이션
                      </span>
                    </div>

                    <h2 className="mt-3.5 text-[25px] font-extrabold leading-tight tracking-tight md:text-[29px]">
                      {S2_META.title}
                    </h2>
                    <p className="mt-2.5 text-[13.5px] leading-[1.75] text-brand-mut">
                      {S2_META.lead}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand-teal transition-transform group-hover:translate-x-1">
                      발표 자료 열기 →
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {S2_META.agenda.map((a) => (
                      <li
                        key={a.no}
                        className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-2 shadow-e1"
                      >
                        <span className="flex-none rounded-md bg-brand-teal/10 px-1.5 py-0.5 font-display text-[10.5px] font-bold text-brand-tealDeep">
                          {a.no}
                        </span>
                        <span className="min-w-0 flex-1">
                          <b className="block truncate text-[13.5px] font-extrabold">{a.t}</b>
                          <span className="block truncate text-[11.5px] text-brand-faint">
                            {a.d}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── 예시 — 구 2회차. 새 자료가 나오기 전까지 형태를 보여주는 참고물 ── */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <Reveal>
              <Link
                href={LAB_BASE}
                className="edge-top group relative block overflow-hidden rounded-2xl border border-line bg-surface-raise shadow-raise transition-all duration-200 hover:-translate-y-1 hover:shadow-raiseHover"
              >
                <span aria-hidden className="block h-1 bg-grad-teal" />
                <div className="grid gap-7 p-6 md:grid-cols-[1.05fr_1fr] md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-lg bg-brand-teal/10 px-2.5 py-1 font-display text-[12px] font-bold text-brand-tealDeep shadow-pill">
                        예시
                      </span>
                      <span className="text-[11.5px] font-bold text-brand-faint">
                        모듈형 · 프롬프트 복사 실습
                      </span>
                    </div>

                    <h2 className="mt-3.5 text-[25px] font-extrabold leading-tight tracking-tight md:text-[29px]">
                      AI 프롬프트 실습
                    </h2>
                    <p className="mt-2.5 text-[13.5px] leading-[1.75] text-brand-mut">
                      광고 실무를 AI로 바꾸는 {LAB_STATS.labs}개의 실습.
                      프롬프트를 그대로 복사해 쓰고, 예시 파일을 내려받아 결과를 확인합니다.
                      모든 프롬프트는 역할 · 맥락 · 과업 · 지침 · 제약조건 · 출력형식 6단 구조입니다.
                    </p>

                    <div className="mt-5">
                      <div className="inline-flex flex-wrap divide-x divide-line overflow-hidden rounded-xl border border-line bg-white shadow-pill">
                        {[
                          { n: LAB_STATS.modules, l: "모듈" },
                          { n: LAB_STATS.labs, l: "실습" },
                          { n: LAB_STATS.prompts, l: "프롬프트" },
                          { n: LAB_STATS.files, l: "실습 파일" },
                        ].map((x) => (
                          <span key={x.l} className="px-4 py-2.5">
                            <b className="block font-display text-[20px] font-bold leading-none text-brand-tealDeep">
                              {x.n}
                            </b>
                            <span className="mt-1 block text-[11px] font-bold text-brand-mut">
                              {x.l}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-bold text-brand-faint">사용 도구</span>
                      {["GPT", "Claude", "Gemini", "Perplexity", "AI Studio", "GPTs"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-bold text-brand-mut shadow-pill"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="mt-6 flex w-fit items-center gap-1.5 text-[13.5px] font-bold text-brand-teal transition-transform group-hover:translate-x-1">
                      예시 열기 →
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {MODULES.map((m) => {
                      const a = ACCENTS[m.accent];
                      return (
                        <li
                          key={m.num}
                          className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-2 shadow-e1"
                        >
                          <span
                            className="flex-none rounded-md px-1.5 py-0.5 font-display text-[10.5px] font-bold"
                            style={{ background: a.soft, color: a.deep }}
                          >
                            M{m.num}
                          </span>
                          <span className="min-w-0 flex-1">
                            <b className="block truncate text-[13.5px] font-extrabold">
                              {m.subject}
                            </b>
                            <span className="block truncate text-[11.5px] text-brand-faint">
                              {m.tagline}
                            </span>
                          </span>
                          <span className="flex-none text-[11px] font-bold text-brand-faint">
                            {m.labs.length}개
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── 다음 회차 · 프로토타입 안내 ── */}
        <section className="bg-white">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <div className="grid gap-3.5 md:grid-cols-2">
              <Reveal className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-dashed border-line bg-white/45 p-6">
                  <span className="w-fit rounded-lg bg-surface-mist px-2.5 py-1 font-display text-[12px] font-bold text-brand-faint">
                    3회차
                  </span>
                  <h3 className="mt-3.5 text-[21px] font-extrabold tracking-tight text-brand-faint">
                    준비 중
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-[1.7] text-brand-faint">
                    다음 회차 주제는 확정되지 않았습니다.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.06} className="h-full">
                <Link
                  href={wb("/prototype")}
                  className="edge-top group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise transition-all duration-200 hover:-translate-y-1 hover:shadow-raiseHover"
                >
                  <span className="font-display text-[10px] font-bold tracking-[0.18em] text-brand-violet">
                    PROTOTYPE
                  </span>
                  <h3 className="mt-2.5 text-[21px] font-extrabold tracking-tight">
                    교육 사례 프로토타입
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-[1.7] text-brand-mut">
                    사내 교육 회차와는 별도로, 웹 프레젠테이션 형태를 시험해 본 교육 자료 사례를
                    모아둔 곳입니다.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand-violet transition-transform group-hover:translate-x-1">
                    사례 보기 →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
