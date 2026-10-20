"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Brain, LineChart, Radar, Sparkles, Users, Wand2 } from "lucide-react";
import type { ReactNode } from "react";
import {
  BlobBg,
  Card,
  ChipRow,
  DashedNote,
  Frame,
  IconChip,
  Kicker,
  KeyPoint,
  Pill,
  Reveal,
  SlideHead,
  StatBig,
  StatRow,
  StepGrid,
} from "../slide-kit";
import type { SlideDef } from "../Deck";
import {
  BRAND_CASES,
  DIFFERENTIATORS,
  EXPECTED_EFFECTS,
  HSAD_META,
  HSAD_SECTIONS,
  HSAD_STATS,
  PAIN_POINTS,
  PROCESSES,
  RPES,
  SOLUTION_AREAS,
  TARGET_INDUSTRIES,
  type SolutionArea,
} from "@/lib/hsad-data";
import { DEV_META } from "@/lib/hsad-dev-data";
import { IDEAS_SECTION } from "@/lib/hsad-ideas-data";
import { HSAD_IDEAS_SLIDES, HSAD_OVERVIEW_SLIDES } from "./hsad-ideas";
import { ACCENTS, type Accent } from "@/lib/theme";

/**
 * HSAD × Wisebirds AI 솔루션 기획서 — 프레젠테이션 판.
 *
 * 문장은 전부 [hsad-data.ts](../../lib/hsad-data.ts) 에서 온다. 여기서는 **배치만** 한다 —
 * 슬라이드에 본문을 새로 쓰면 문서 페이지(`/hsad/**`)와 내용이 갈라진다.
 *
 * **요약형이 기본, 상세는 예외다.** 문장을 읽혀야 뜻이 사는 네 장만 산문을 남기고
 * (차별점 · 자동 운영 룰 · 한화 케이스 · Trend&Mood), 나머지는 구조가 보이는 시각 요약으로 접었다.
 *
 * 높이 예산은 **664px** 다 — 1280×720 에서 상단 바를 뺀 값이고, 덱 섹션은 넘쳐도
 * 스크롤되지 않고 옆 슬라이드로 새어 나간다. 슬라이드를 합칠 때는 이 값으로 잰다.
 */

const areaIcon: Record<string, ReactNode> = {
  A: <Radar className="h-5 w-5" />,
  B: <Users className="h-5 w-5" />,
  C: <LineChart className="h-5 w-5" />,
  D: <Wand2 className="h-5 w-5" />,
};

/** 영역 코드로 액센트 — 파이프라인과 영역 카드가 같은 색을 쓰게 */
const areaAccent = (code: string): Accent =>
  SOLUTION_AREAS.find((a) => a.code === code)?.accent ?? "violet";

/* ══════════════════════ 01 표지 + 목차 ══════════════════════ */

/** 표지 목차 — 기획서 4파트 + 아이디어 파트 1칸. 문장은 전부 데이터에서 온다 */
const TOC = [
  ...HSAD_SECTIONS.map((s) => ({
    key: s.slug,
    num: s.num,
    title: s.title,
    desc: s.desc,
    accent: s.accent,
    dashed: false,
  })),
  { key: "ideas", ...IDEAS_SECTION, dashed: true },
];

function CoverSlide() {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      <BlobBg accent="violet" />
      <Frame w={1240} className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-violet/25 bg-brand-violet/5 px-4 py-1.5 font-display text-[12px] font-bold tracking-[0.14em] text-brand-violet">
                <Sparkles className="h-3.5 w-3.5" /> HSAD × WISEBIRDS
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              {/* 수동 줄바꿈 — 좁은 칸에서 '솔루션' 세 글자만 남는 고아 줄을 막는다 */}
              <h1 className="ko-head mt-5 text-[34px] font-extrabold leading-[1.12] tracking-[-0.035em] text-brand-ink md:text-[44px]">
                데이터 기반
                <br />
                <span className="text-grad-violet">풀스택 마케팅 솔루션</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="ko-body mt-4 max-w-lg text-[14.5px] leading-[1.7] text-brand-sub">
                {HSAD_META.lead}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-[12.5px] font-semibold text-brand-mut">
                <span className="rounded-full border border-brand-violet/30 px-3 py-1 text-brand-violetDeep">
                  AI 솔루션 공동 개발 기획(안)
                </span>
                <span>{HSAD_META.date}</span>
              </div>
            </Reveal>
          </div>

          {/* 목차 — AGENDA 슬라이드를 없애고 여기로 접었다.
              01~04 는 HSAD_SECTIONS(기획서), 05 는 IDEAS_SECTION(새 아이디어 파트)에서 온다.
              05 는 대응하는 문서 페이지가 없는 덱 전용 파트라 **점선**으로 그린다
              (미확정·별개 출처를 실선과 가르는 프로젝트 규칙). */}
          <div className="flex flex-col gap-2">
            {TOC.map((s, i) => {
              const a = ACCENTS[s.accent];
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.28 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-2xl py-3 pl-5 pr-4 backdrop-blur ${
                    s.dashed
                      ? "border border-dashed border-brand-violet/45 bg-white/70"
                      : "border border-line bg-white/90 shadow-card"
                  }`}
                  style={s.dashed ? undefined : { borderLeft: `4px solid ${a.main}` }}
                >
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className="font-display text-[15px] font-extrabold"
                      style={{ color: a.main }}
                    >
                      {s.num}
                    </span>
                    <b className="text-[15.5px] font-extrabold text-brand-ink">{s.title}</b>
                  </div>
                  <p className="ko-body mt-1 text-[12px] leading-[1.5] text-brand-mut">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ══════════════════════ 02 차별점 (상세) ══════════════════════ */

function DiffSlide() {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="01 · 차별화"
        title="같은 축을 놓고 보면"
        accentWord="출발점이 다르다"
        sub="매체 최적화 기법을 겨루지 않습니다. AI에게 무엇을 먹이느냐로 갈립니다."
        accent="coral"
      />

      <Reveal delay={0.16}>
        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <div className="grid grid-cols-[74px_minmax(0,1fr)_minmax(0,1.15fr)] border-b border-line bg-surface-mist text-[11.5px] font-bold">
            <div className="px-3 py-2 text-brand-sub">구분</div>
            <div className="px-3 py-2 text-brand-faint">기존 퍼포먼스 대행사</div>
            <div className="px-3 py-2 text-brand-coral">본 솔루션 · 퍼포먼스 브랜딩</div>
          </div>
          {DIFFERENTIATORS.map((d) => {
            /* ' — ' 앞은 주장, 뒤는 부연 — 문자열을 나눌 뿐 문장을 더하지 않는다 */
            const [claim, ...rest] = d.ours.split(" — ");
            return (
              <div
                key={d.axis}
                className="grid grid-cols-[74px_minmax(0,1fr)_minmax(0,1.15fr)] border-b border-line last:border-b-0"
              >
                <div className="px-3 py-2.5 text-[12px] font-bold text-brand-ink">{d.axis}</div>
                <div className="ko-body px-3 py-2.5 text-[12px] leading-[1.55] text-brand-faint">
                  {d.legacy}
                </div>
                <div className="px-3 py-2.5 bg-brand-coral/[0.04]">
                  <div className="ko-body text-[12.5px] font-bold leading-[1.5] text-brand-sub">
                    {claim}
                  </div>
                  {rest.length > 0 && (
                    <div className="ko-body mt-0.5 text-[11.5px] leading-[1.5] text-brand-mut">
                      {rest.join(" — ")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Frame>
  );
}

/* ══════════════════════ 03 페인포인트 4건 ══════════════════════ */

function PainSlide() {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="01 · 페인포인트"
        title="지금 퍼포먼스 마케팅이 막혀 있는 곳"
        sub="네 군데가 막혀 있습니다. 각 문제 아래가 그것을 푸는 기능과, 걸려 있는 CDJ 단계입니다."
        accent="coral"
      />

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {PAIN_POINTS.map((pt, i) => {
          const a = ACCENTS[pt.accent];
          return (
            <Reveal key={pt.no} delay={0.14 + i * 0.06}>
              <div
                className="flex h-full flex-col rounded-2xl border border-line bg-white p-4 shadow-card"
                style={{ borderTop: `3px solid ${a.main}` }}
              >
                <div className="flex items-center gap-2">
                  <IconChip accent={pt.accent} size="sm">
                    <AlertTriangle className="h-4 w-4" />
                  </IconChip>
                  <div>
                    <div className="font-display text-[10.5px] font-bold" style={{ color: a.main }}>
                      {pt.no}
                    </div>
                    <div className="text-[15px] font-extrabold leading-tight text-brand-ink">
                      {pt.headline}
                    </div>
                  </div>
                </div>

                <p className="ko-body mt-2 text-[12px] leading-[1.6] text-brand-mut">{pt.pain}</p>

                <div className="mt-2.5">
                  <ChipRow items={pt.fixTags} accent={pt.accent} size="sm" />
                </div>

                <div className="mt-auto pt-2 text-[10.5px] font-semibold leading-[1.45] text-brand-faint">
                  CDJ · {pt.cdj}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Frame>
  );
}

/* ══════════════════════ 04 총괄 ══════════════════════ */

function FrameworkSlide() {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="02 · SOLUTION FRAMEWORK"
        title="누가 무엇을 맡는가"
        sub="HSAD의 기존 솔루션과 Wisebirds의 데이터·크리에이티브 역량을 결합합니다."
        accent="blue"
      />

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {SOLUTION_AREAS.map((a, i) => {
          const t = ACCENTS[a.accent];
          return (
            <Reveal key={a.slug} delay={0.14 + i * 0.07}>
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card"
                style={{ borderTop: `4px solid ${t.main}` }}
              >
                <div className="flex items-center gap-2.5 p-4 pb-2.5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ backgroundImage: t.gradCss }}
                  >
                    {areaIcon[a.code]}
                  </span>
                  <div>
                    <div className="text-[11px] font-bold" style={{ color: t.main }}>
                      {a.owner}
                    </div>
                    <div className="text-[16px] font-extrabold text-brand-ink">
                      {a.code}. {a.title}
                    </div>
                  </div>
                </div>
                <p className="ko-body px-4 pb-3 text-[12px] leading-[1.55] text-brand-mut">
                  {a.aim}
                </p>
                <div className="mt-auto border-t border-line p-4 pt-3">
                  <ChipRow items={a.groups.map((g) => g.title)} accent={a.accent} size="sm" />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-4">
        <StatRow>
          <StatBig value={HSAD_STATS.areas} label="영역" accent="blue" />
          <StatBig value={HSAD_STATS.groups} label="기능 그룹" accent="navy" />
          <StatBig value={HSAD_STATS.features} label="세부 기능" accent="teal" />
          <StatBig value={HSAD_STATS.cases} label="브랜드 적용 예시" accent="violet" />
        </StatRow>
      </div>
    </Frame>
  );
}

/* ══════════════════════ 05~07 영역 ══════════════════════ */

/** 그룹 하나 — 번호·제목 + 세부 기능 제목 목록 */
function GroupCard({ group, accent }: { group: SolutionArea["groups"][number]; accent: Accent }) {
  const t = ACCENTS[accent];
  return (
    <div className="flex h-full flex-col rounded-xl border border-line bg-white p-3.5">
      <div className="flex items-center gap-1.5">
        <span
          className="rounded px-1.5 py-0.5 font-display text-[10.5px] font-bold"
          style={{ background: t.soft, color: t.deep }}
        >
          {group.no}
        </span>
        <span className="text-[13.5px] font-extrabold leading-tight text-brand-ink">
          {group.title}
        </span>
      </div>
      <ul className="mt-2 flex flex-1 flex-col gap-1.5">
        {group.items.map((it) => (
          <li
            key={it.title}
            className="ko-body flex gap-1.5 text-[11.5px] leading-[1.45] text-brand-mut"
          >
            <span aria-hidden className="flex-none" style={{ color: t.main }}>
              ·
            </span>
            {it.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** HSAD 두 영역을 한 장에 — 담당이 같으므로 붙이면 분담이 레이아웃으로 말해진다 */
function AreasHsadSlide() {
  const areas = SOLUTION_AREAS.filter((a) => a.owner === "HSAD");
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="02 · HSAD 기존 솔루션"
        title="A 시장 분석 · B 타겟 도출"
        sub="앞단 두 단계 — 시장을 읽고, 누구에게 말할지 정하는 구간을 HSAD가 맡습니다."
        accent="blue"
      />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {areas.map((area, i) => {
          const t = ACCENTS[area.accent];
          return (
            <Reveal key={area.slug} delay={0.14 + i * 0.08}>
              <div className="flex h-full flex-col">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-[15px] font-extrabold"
                    style={{ color: t.main }}
                  >
                    {area.code}
                  </span>
                  <b className="text-[17px] font-extrabold text-brand-ink">{area.title}</b>
                  <span className="ko-body text-[11.5px] text-brand-faint">{area.aim}</span>
                </div>
                <div className="mt-2.5 grid flex-1 gap-2">
                  {area.groups.map((g) => (
                    <GroupCard key={g.no} group={g} accent={area.accent} />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Frame>
  );
}

/** Wisebirds 영역 하나 — 그룹이 4개라 붙이면 넘친다. 한 장씩 간다 */
function AreaSlide({ area }: { area: SolutionArea }) {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker={`02 · ${area.owner} · AREA ${area.code}`}
        title={area.title}
        sub={area.quote}
        accent={area.accent}
      />

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {area.groups.map((g, i) => (
          <Reveal key={g.no} delay={0.14 + i * 0.07} className="h-full">
            <GroupCard group={g} accent={area.accent} />
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* ══════════════════════ 08 자동 운영 룰 (상세) ══════════════════════ */

function OpsRuleSlide() {
  const c = SOLUTION_AREAS.find((a) => a.slug === "data")!;
  const rules = c.groups.find((g) => g.no === "C-3")!;
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="02 · C-3"
        title="자동 운영 룰 — 기계적으로 끄지 않는다"
        sub="“효율 안 좋으니 다 꺼라” 식 접근은 광고 운영 현실상 불가능합니다. 그래서 아래 로직을 전제로 설계합니다."
        accent="teal"
      />

      <div className="mt-5 grid grid-cols-1 gap-2.5 md:grid-cols-2">
        {rules.items.map((it, i) => (
          <Reveal key={it.title} delay={0.14 + i * 0.06}>
            <Card accent="teal" className="h-full !p-4">
              <div className="text-[14px] font-extrabold text-brand-ink">
                <span className="mr-1.5 font-display text-brand-teal">{i + 1}</span>
                {it.title}
              </div>
              <p className="ko-body mt-1 text-[12px] leading-[1.55] text-brand-mut">{it.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <div className="mt-3">
          <DashedNote label="추가 논의 포인트 — 아직 결론이 나지 않은 항목" items={c.openIssues ?? []} />
        </div>
      </Reveal>
    </Frame>
  );
}

/* ══════════════════════ 09 크리에이티브 아이디어 3건 ══════════════════════ */

function ProcessesSlide() {
  return (
    <Frame w={1300}>
      <Reveal>
        <div className="text-center">
          <Kicker accent="violet">02 · CREATIVE IDEA</Kicker>
          <h2 className="ko-head mt-2 text-[26px] font-extrabold tracking-[-0.03em] text-brand-ink md:text-[32px]">
            세 아이디어가 같은 5단계 파이프라인을 탄다
          </h2>
        </div>
      </Reveal>

      <div className="mt-5 flex flex-col gap-2.5">
        {PROCESSES.map((p, i) => {
          const t = ACCENTS[p.accent];
          return (
            <Reveal key={p.key} delay={0.12 + i * 0.08}>
              <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[190px_minmax(0,1fr)]">
                <div className="flex flex-col justify-center rounded-xl px-3.5 py-2.5" style={{ background: t.soft }}>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[12px] font-bold" style={{ color: t.main }}>
                      {p.no}
                    </span>
                    <b className="text-[13.5px] font-extrabold leading-tight" style={{ color: t.deep }}>
                      {p.title}
                    </b>
                  </div>
                  <span className="ko-body mt-0.5 text-[10.5px] leading-[1.4] text-brand-mut">
                    {p.sub}
                  </span>
                  <span className="mt-1 font-mono text-[9.5px] text-brand-faint">{p.from}</span>
                </div>
                <StepGrid steps={p.steps} accent={p.accent} cols={5} compact />
              </div>
            </Reveal>
          );
        })}
      </div>
    </Frame>
  );
}

/* ══════════════════════ 10 R-PES ══════════════════════ */

function RpesSlide() {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="03 · PIPELINE"
        title={RPES.abbr}
        accentWord={RPES.ko}
        sub={RPES.name}
        accent="violet"
      />

      <div className="mt-7 flex flex-wrap items-stretch justify-center gap-2">
        {RPES.steps.map((s, i) => {
          const t = ACCENTS[areaAccent(s.area)];
          return (
            <div key={`${s.area}-${i}`} className="flex items-center">
              {i > 0 && (
                <span aria-hidden className="mx-1 text-[16px] text-brand-faint">
                  →
                </span>
              )}
              <Reveal delay={0.14 + i * 0.08}>
                <div
                  className="flex h-full w-[186px] flex-col rounded-2xl border border-line bg-white p-4 shadow-card"
                  style={{ borderTop: `4px solid ${t.main}` }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-lg font-display text-[11px] font-bold"
                      style={{ background: t.soft, color: t.deep }}
                    >
                      {s.area}
                    </span>
                    <span className="font-display text-[10px] font-bold text-brand-faint">
                      STEP {i + 1}
                    </span>
                  </div>
                  <div className="mt-2 text-[14px] font-extrabold leading-tight text-brand-ink">
                    {s.title}
                  </div>
                  <p className="ko-body mt-1 text-[11.5px] leading-[1.5] text-brand-mut">{s.sub}</p>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <KeyPoint accent="violet">{RPES.quote}</KeyPoint>
      </div>
    </Frame>
  );
}

/* ══════════════════════ 11 실시간 케이스 2건 ══════════════════════ */

function CasesRealtimeSlide() {
  const cases = BRAND_CASES.filter((c) => c.rows);
  return (
    <Frame w={1300}>
      <Reveal>
        <div className="text-center">
          <Kicker accent="blue">03 · CASE</Kicker>
          <h2 className="ko-head mt-2 text-[26px] font-extrabold tracking-[-0.03em] text-brand-ink md:text-[32px]">
            같은 엔진, 다른 업종
          </h2>
        </div>
      </Reveal>

      <div className="mt-5 flex flex-col gap-3">
        {cases.map((c, ci) => {
          const t = ACCENTS[c.accent];
          return (
            <Reveal key={c.brand + c.label} delay={0.12 + ci * 0.1}>
              <div className="rounded-2xl border border-line bg-white p-3.5 shadow-card">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span
                    className="rounded-lg px-2 py-0.5 font-display text-[11.5px] font-bold"
                    style={{ background: t.soft, color: t.deep }}
                  >
                    {c.brand}
                  </span>
                  <b className="text-[15px] font-extrabold text-brand-ink">{c.label}</b>
                  <span className="ko-body text-[11px] leading-[1.45] text-brand-faint">
                    크롤링 · {c.crawl}
                  </span>
                </div>

                <div className="mt-2.5 grid grid-cols-2 gap-2 lg:grid-cols-4">
                  {(c.rows ?? []).map((r) => (
                    <div key={r.persona} className="rounded-xl border border-line bg-surface-mist/50 p-2.5">
                      <div className="text-[12.5px] font-extrabold leading-tight text-brand-ink">
                        {r.persona}
                      </div>
                      <div className="ko-body mt-1.5 text-[10.5px] leading-[1.4] text-brand-mut">
                        {r.data}
                      </div>
                      <div
                        className="ko-body mt-1 text-[10.5px] font-bold leading-[1.4]"
                        style={{ color: t.deep }}
                      >
                        {r.creative}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Frame>
  );
}

/* ══════════════════════ 12 서술형 케이스 2건 (상세) ══════════════════════ */

function CasesStorySlide() {
  const cases = BRAND_CASES.filter((c) => !c.rows);
  return (
    <Frame w={1300}>
      <Reveal>
        <div className="text-center">
          <Kicker accent="navy">03 · CASE</Kicker>
          <h2 className="ko-head mt-2 text-[26px] font-extrabold tracking-[-0.03em] text-brand-ink md:text-[32px]">
            엔진이 아니라 도구로 가는 두 갈래
          </h2>
        </div>
      </Reveal>

      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {cases.map((c, ci) => {
          const t = ACCENTS[c.accent];
          return (
            <Reveal key={c.brand + c.label} delay={0.12 + ci * 0.1}>
              <div
                className="flex h-full flex-col rounded-2xl border border-line bg-white p-4 shadow-card"
                style={{ borderTop: `3px solid ${t.main}` }}
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <span
                    className="rounded-lg px-2 py-0.5 font-display text-[11.5px] font-bold"
                    style={{ background: t.soft, color: t.deep }}
                  >
                    {c.brand}
                  </span>
                  <b className="text-[15px] font-extrabold leading-tight text-brand-ink">
                    {c.label}
                  </b>
                </div>

                {c.pain && (
                  <p className="ko-body mt-2 rounded-lg bg-surface-mist/70 px-3 py-2 text-[11.5px] leading-[1.55] text-brand-mut">
                    <b className="text-brand-sub">페인포인트</b> · {c.pain}
                  </p>
                )}

                <ol className="mt-2.5 flex flex-1 flex-col gap-1.5">
                  {(c.approach ?? []).map((txt, n) => {
                    const [head, ...rest] = txt.split(" — ");
                    return (
                      <li key={txt} className="flex gap-2 text-[11.5px] leading-[1.5]">
                        <span
                          className="mt-px flex h-[16px] w-[16px] flex-none items-center justify-center rounded font-display text-[9.5px] font-bold"
                          style={{ background: t.soft, color: t.deep }}
                        >
                          {n + 1}
                        </span>
                        <span className="ko-body">
                          <b className="text-brand-sub">{head}</b>
                          {rest.length > 0 && (
                            <span className="text-brand-mut"> — {rest.join(" — ")}</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Frame>
  );
}

/* ══════════════════════ 13 대상 · 효과 ══════════════════════ */

function ScopeSlide() {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="04 · SCOPE"
        title="어디부터 붙이고, 무엇을 얻는가"
        accent="navy"
      />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Reveal delay={0.14}>
          <div className="flex h-full flex-col">
            <div className="text-[13px] font-extrabold text-brand-mut">타겟 업종 · 브랜드</div>
            <div className="mt-2.5 grid flex-1 gap-2">
              {TARGET_INDUSTRIES.map((t) => (
                <div
                  key={t.industry}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-line bg-white p-3"
                >
                  <b className="w-[76px] flex-none text-[13px] font-extrabold text-brand-ink">
                    {t.industry}
                  </b>
                  <ChipRow items={t.brands} accent="navy" size="sm" />
                  <span className="ko-body w-full text-[10.5px] leading-[1.4] text-brand-faint">
                    {t.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="flex h-full flex-col">
            <div className="text-[13px] font-extrabold text-brand-mut">기대 효과</div>
            <div className="mt-2.5 grid flex-1 gap-2">
              {EXPECTED_EFFECTS.map((e) => {
                const t = ACCENTS[e.accent];
                return (
                  <div
                    key={e.title}
                    className="rounded-xl border border-line bg-white p-3"
                    style={{ borderLeft: `3px solid ${t.main}` }}
                  >
                    <b className="text-[13px] font-extrabold" style={{ color: t.deep }}>
                      {e.title}
                    </b>
                    <p className="ko-body mt-1 text-[11.5px] leading-[1.55] text-brand-mut">
                      {e.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </Frame>
  );
}

/* ══════════════════════ 14 마무리 ══════════════════════ */

function ClosingSlide() {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      <BlobBg accent="violet" />
      <Frame w={980} className="relative z-10">
        <div className="text-center">
          <Reveal>
            <IconChip accent="violet" size="lg">
              <Brain className="h-6 w-6" />
            </IconChip>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="ko-head mt-6 text-[28px] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink md:text-[40px]">
              {HSAD_META.closing.head}
              <br />
              <span className="text-grad-violet">{HSAD_META.closing.accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="ko-body mx-auto mt-5 max-w-2xl text-[15px] leading-[1.75] text-brand-sub">
              {HSAD_META.closing.lead}
            </p>
          </Reveal>
          {/* 개발 파트의 약속 — 제안을 실행 계획으로 닫는다 (문장은 DEV_META 에 있다) */}
          <Reveal delay={0.26}>
            <p className="ko-body mx-auto mt-6 max-w-2xl rounded-2xl border border-dashed border-brand-violet/40 bg-white/70 px-5 py-3 text-[13px] leading-[1.65] text-brand-mut">
              <b className="text-brand-violetDeep">{DEV_META.closing.head}</b>
              <br />
              {DEV_META.closing.lead}
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <Pill accent="violet">HSAD × Wisebirds</Pill>
              <span className="text-[13px] font-semibold text-brand-mut">{HSAD_META.date}</span>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="ko-body mt-6 text-[11.5px] leading-[1.7] text-brand-faint">
              본 문서는 {HSAD_META.source}를 기반으로 정리한 기획서입니다.
              <br />
              {DEV_META.asIsCaveat} {DEV_META.estimateCaveat}
            </p>
          </Reveal>
        </div>
      </Frame>
    </div>
  );
}

/* ══════════════════════ 슬라이드 목록 ══════════════════════ */

const area = (slug: string) => SOLUTION_AREAS.find((a) => a.slug === slug)!;

/**
 * 기획서 본문 13장 — **여기 있는 슬라이드는 내용을 고치지 않는다.**
 * 배경(01) · 기능 체계(02) · R-PES(03) · 대상·효과(04) 는 별도로 다시 손볼 예정이라
 * 통합할 때 순서만 옮기고 노드는 그대로 둔다.
 */
const PLAN_BODY_SLIDES: SlideDef[] = [
  { id: "diff", nav: "01 차별점", group: "A", accent: "coral", node: <DiffSlide /> },
  { id: "pain", nav: "01 페인포인트", group: "A", accent: "coral", node: <PainSlide /> },

  { id: "framework", nav: "02 총괄", group: "B", accent: "blue", node: <FrameworkSlide /> },
  { id: "areas-hsad", nav: "A · B (HSAD)", group: "B", accent: "blue", node: <AreasHsadSlide /> },
  {
    id: "area-c",
    nav: "C 데이터 분석",
    group: "B",
    accent: "teal",
    node: <AreaSlide area={area("data")} />,
  },
  {
    id: "area-d",
    nav: "D 크리에이티브",
    group: "B",
    accent: "violet",
    node: <AreaSlide area={area("creative")} />,
  },
  { id: "ops-rule", nav: "자동 운영 룰", group: "B", accent: "teal", node: <OpsRuleSlide /> },
  { id: "processes", nav: "크리에이티브 3건", group: "B", accent: "violet", node: <ProcessesSlide /> },

  { id: "rpes", nav: "03 R-PES", group: "C", accent: "violet", node: <RpesSlide /> },
  { id: "cases-realtime", nav: "실시간 케이스", group: "C", accent: "blue", node: <CasesRealtimeSlide /> },
  { id: "cases-story", nav: "도구형 케이스", group: "C", accent: "navy", node: <CasesStorySlide /> },

  { id: "scope", nav: "04 대상 · 효과", group: "D", accent: "navy", node: <ScopeSlide /> },
];

/**
 * **통합 덱** — 기획서 발표와 개발 기획이 한 덱으로 합쳐진 뒤, 새 아이디어 자료가 본문이 된다.
 *
 *   표지 → 개요 2장(취합) → 기획서 본문 13장 → 아이디어 36장(연계도·우선순위·상세) + 구성 1장 → 마무리
 *
 * 앞머리 개요는 두 자료의 요지를 마케팅 언어로 줄인 것이고, 뒤쪽 아이디어 파트는
 * 원문 PPTX 의 순서를 그대로 지킨다. 두 파트는 배경색(`bg-page-alt`)으로 눈에 보이게 갈린다.
 * 장수가 바뀌면 `tests/deck.spec.ts` 의 `count` 도 같이 고친다.
 */
export const HSAD_DECK_SLIDES: SlideDef[] = [
  { id: "cover", nav: "표지 · 목차", group: "intro", accent: "violet", node: <CoverSlide /> },
  ...HSAD_OVERVIEW_SLIDES,
  ...PLAN_BODY_SLIDES,
  ...HSAD_IDEAS_SLIDES,
  { id: "closing", nav: "마무리", group: "close", accent: "violet", node: <ClosingSlide /> },
];
