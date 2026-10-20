import Link from "next/link";
import { ACCENTS } from "@/lib/theme";
import {
  LAB_STATS,
  MODULES,
  labHref,
  moduleHasFiles,
  moduleZip,
  type LabModule,
} from "@/lib/lab-data";

const fileCount = (m: LabModule) =>
  new Set(m.labs.flatMap((l) => l.files.map((f) => f.path))).size;

const STEPS = [
  "모듈에서 실습을 하나 고릅니다.",
  "실습 파일이 있으면 내려받아 AI에 먼저 업로드합니다.",
  "프롬프트의 선택 변수를 본인 광고주·매체로 바꿉니다.",
  "프롬프트를 복사해 GPT · Claude · Gemini에 붙여넣습니다.",
];

export default function LabHome() {
  return (
    <div className="mx-auto max-w-page px-6 pb-16">
      {/* ── 히어로 ── */}
      <section className="grid items-center gap-9 py-10 md:grid-cols-[1.1fr_0.9fr] md:py-12">
        <div>
          <span className="font-display text-[11.5px] font-bold tracking-[0.2em] text-brand-violet">
            GENERATIVE AI · PRACTICE
          </span>
          <h1 className="mt-3.5 text-[34px] font-extrabold leading-[1.16] tracking-tight md:text-[42px]">
            광고 실무를 AI로 바꾸는
            <br />
            <span className="text-grad-violet">{LAB_STATS.labs}개의 실습</span>
          </h1>
          <p className="mt-4 max-w-[560px] text-[14.5px] leading-[1.75] text-brand-sub">
            모듈별 실습 프롬프트를 그대로 복사해 쓰고, 실습에 필요한 예시 파일을 내려받으세요.
            모든 프롬프트는 <b className="text-brand-ink">역할 · 맥락 · 과업 · 지침 · 제약조건 · 출력형식</b>
            의 6단 구조로 설계되었습니다.
          </p>
          <Link
            href={labHref("/1-1")}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-grad-violet px-6 py-3.5 text-[14px] font-bold text-white shadow-glowViolet transition-transform hover:-translate-y-0.5"
          >
            첫 실습 시작하기 →
          </Link>
        </div>

        {/* 프롬프트 미리보기 */}
        <div className="overflow-hidden rounded-2xl bg-[#151a23] shadow-float">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[11px] font-semibold text-white/40">
              prompt.txt
            </span>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-4 font-mono text-[12.5px] leading-[1.8] text-[#e9edf4]">
            {`[역할]
퍼포먼스 마케팅 대행사의 시니어 매체 운영자

[맥락]
- 광고주: `}
            <span className="rounded bg-white/15 px-1.5 font-semibold">커머스 A사</span>
            {`
- 대상 매체: `}
            <span className="rounded bg-white/15 px-1.5 font-semibold">Meta</span>
            {`

[과업]
전환 단가 상승의 원인 가설을 다섯 갈래로…`}
          </pre>
        </div>
      </section>

      {/* ── 통계 ── */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { n: LAB_STATS.modules, l: "모듈" },
          { n: LAB_STATS.labs, l: "실습" },
          { n: LAB_STATS.prompts, l: "프롬프트" },
          { n: LAB_STATS.files, l: "실습 파일" },
        ].map((s) => (
          <div
            key={s.l}
            className="edge-top relative overflow-hidden rounded-2xl border border-line bg-surface-raise px-5 py-4 shadow-raise"
          >
            <b className="font-display text-[30px] font-bold leading-none text-brand-violet">
              {s.n}
            </b>
            <span className="mt-1.5 block text-[12.5px] font-bold text-brand-mut">
              {s.l}
            </span>
          </div>
        ))}
      </section>

      {/* ── 모듈 ── */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[22px] font-extrabold tracking-tight">모듈</h2>
          <span className="text-[12.5px] font-semibold text-brand-mut">
            모듈을 눌러 개요를 먼저 확인하세요
          </span>
        </div>

        <div className="mt-5 grid gap-3.5 md:grid-cols-2">
          {MODULES.map((m) => {
            const a = ACCENTS[m.accent];
            const files = fileCount(m);
            return (
              <Link
                key={m.num}
                href={labHref(`/m${m.num}`)}
                className="group relative overflow-hidden edge-top relative overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise transition-all duration-200 hover:-translate-y-1 hover:shadow-raiseHover"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: a.gradCss }}
                />
                <div className="flex items-center gap-2.5">
                  <span
                    className="rounded-md px-2 py-0.5 font-display text-[11px] font-bold tracking-wide"
                    style={{ background: a.soft, color: a.deep }}
                  >
                    MODULE {m.num}
                  </span>
                  <span className="text-[11.5px] font-bold text-brand-faint">
                    실습 {m.labs.length}개{files > 0 && ` · 파일 ${files}개`}
                  </span>
                </div>

                <h3 className="mt-3 text-[19px] font-extrabold tracking-tight">
                  {m.subject}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.7] text-brand-mut">
                  {m.tagline}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {m.tools.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2 py-0.5 text-[11px] font-bold text-brand-mut"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold transition-transform group-hover:translate-x-1"
                  style={{ color: a.main }}
                >
                  보기 →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 진행 방법 ── */}
      <section className="mt-14 edge-top relative overflow-hidden rounded-2xl border border-line bg-surface-raise p-7 shadow-raise">
        <h2 className="text-[18px] font-extrabold tracking-tight">진행 방법</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s} className="rounded-xl border border-line bg-white px-4 py-4 shadow-e1">
              <b className="font-display text-[13px] font-bold text-brand-violet">
                {i + 1}
              </b>
              <span className="mt-1.5 block text-[13px] font-semibold leading-[1.6] text-brand-sub">
                {s}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-line pt-5">
          <span className="text-[12.5px] font-bold text-brand-mut">
            모듈별 실습 파일 전체 받기
          </span>
          {MODULES.filter(moduleHasFiles).map((m) => (
            <a
              key={m.num}
              href={encodeURI(moduleZip(m.num))}
              download
              className="rounded-full border border-line px-3 py-1.5 text-[12px] font-bold text-brand-sub transition-colors hover:border-brand-violet hover:text-brand-violet"
            >
              ⬇ Module {m.num} ZIP
            </a>
          ))}
        </div>
      </section>

      <p className="mt-8 text-center text-[11.5px] font-semibold text-brand-faint">
        실습 파일과 프롬프트 안의 광고주·수치는 모두 교육용 가상 데이터입니다.
      </p>
    </div>
  );
}
