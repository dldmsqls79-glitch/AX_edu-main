"use client";

/**
 * HSAD × Wisebirds — AI 솔루션 아이디어 장표.
 *
 * 원문 `doc/HSAD-plan-doc/HSAD_WB_AI_Solution_Ideas.pptx` 36장의 **순서를 그대로** 옮겼다:
 *   연계도 1장 → 우선순위 체크 7장 → 아이디어 정리 28장.
 * 앞머리의 개요 2장(취합)만 원문 밖이고, 그 문장도 컴포넌트가 아니라
 * [hsad-ideas-data.ts](../../lib/hsad-ideas-data.ts) 의 `OVERVIEW`·`SHIFTS`·`BOTTLENECKS` 에 있다.
 *
 * 색은 곧 단계다 — ① 기획 blue · ② 생성 violet · ③ 집행 coral · ④ 학습 teal (`STAGES`).
 * 높이 예산 663px 안에서 배치만 한다. 문장을 여기서 새로 쓰지 않는다.
 */
import { Frame, Kicker, Reveal, SlideHead, Title } from "../slide-kit";
import type { SlideDef } from "../Deck";
import { PriorityBoard, PriorityTally } from "../hsad/PriorityCheck";
import {
  BOTTLENECKS,
  IDEAS,
  IDEA_STATS,
  INPUT_LINES,
  LOOP_FLOW,
  LOOP_META,
  OVERVIEW,
  PRIORITY_GROUPS,
  SHIFTS,
  STAGES,
  findStage,
  type Idea,
} from "@/lib/hsad-ideas-data";
import { ARCHITECTURE, DEV_META, TASK_SPEC } from "@/lib/hsad-dev-data";
import { ACCENTS } from "@/lib/theme";

/**
 * 이 파일의 모든 장표 폭 — 1280 뷰포트에서 우측 도트 레일이 x≳1135 를 차지한다(실측).
 * Frame 은 좌우 `px-12` 이므로 내용 우측 끝 = (1280 + 1040) / 2 − 48 = **1112px** 로 20px 남는다.
 * 레일 폭은 **가장 긴 nav 라벨**이 정하므로 딱 맞추지 않는다 — 라벨 하나 늘어나면 다시 가린다.
 * (체크 표의 세 번째 열이 레일 아래로 들어가면 아예 눌리지 않는다. slide-kit 의 `SectionCover` 도 1040 이다.)
 */
const W = 1040;

/* ══════════════════════ 개요 (취합) ══════════════════════ */

/** 앞머리 1 — 무엇을 만드는가. 마케팅 언어로 짧게, 숫자는 파생값으로 */
function OverviewSlide() {
  return (
    <Frame w={W}>
      <SlideHead
        kicker={OVERVIEW.kicker}
        title={OVERVIEW.title}
        sub={OVERVIEW.lead}
        accent="violet"
      />

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {OVERVIEW.gains.map((g, i) => {
          const a = ACCENTS[g.accent];
          return (
            <Reveal key={g.t} delay={0.14 + i * 0.07}>
              <div
                className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card"
                style={{ borderTop: `4px solid ${a.main}` }}
              >
                <b className="text-[17px] font-extrabold tracking-tight" style={{ color: a.deep }}>
                  {g.t}
                </b>
                <p className="ko-body mt-2 flex-1 text-[13.5px] leading-[1.65] text-brand-mut">
                  {g.d}
                </p>
                <span className="mt-3 text-[10.5px] font-bold text-brand-faint">{g.from}</span>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* 네 단계 — 뒤에 나올 구조를 미리 한 줄로 */}
      <Reveal delay={0.4}>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          {STAGES.map((s, i) => {
            const a = ACCENTS[s.accent];
            return (
              <span key={s.key} className="flex items-center gap-1.5">
                <span
                  className="rounded-full px-3 py-1.5 text-[12.5px] font-bold"
                  style={{ background: a.soft, color: a.deep }}
                >
                  {s.no} {s.title}
                </span>
                {i < STAGES.length - 1 && (
                  <span aria-hidden className="text-[13px] text-brand-faint">
                    →
                  </span>
                )}
              </span>
            );
          })}
          <span aria-hidden className="ml-1 text-[13px] text-brand-faint">
            ↻
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.48}>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] font-bold text-brand-mut">
          <span>
            아이디어 <b className="text-brand-ink">{IDEA_STATS.ideas}</b>건
          </span>
          <span aria-hidden className="text-brand-faint">
            ·
          </span>
          <PriorityTally />
        </div>
      </Reveal>
    </Frame>
  );
}

/** 앞머리 2 — 지금 → 바뀐 뒤, 그리고 개발 병목 */
function ShiftSlide() {
  return (
    <Frame w={W}>
      <div className="text-center">
        <Reveal>
          <Kicker accent="violet">NOW → NEXT</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <Title>지금 이렇게 일하고, 이렇게 바뀝니다</Title>
        </Reveal>
      </div>

      <div className="mt-7 space-y-2">
        {SHIFTS.map((s, i) => (
          <Reveal key={s.axis} delay={0.12 + i * 0.07}>
            <div className="grid items-stretch gap-2 md:grid-cols-[104px_1fr_1fr]">
              <div className="flex items-center rounded-xl bg-surface-mist px-3 py-2.5">
                <b className="text-[13px] font-extrabold text-brand-sub">{s.axis}</b>
              </div>
              <div
                className="rounded-xl border border-line bg-white px-4 py-2.5"
                style={{ borderLeft: `3px solid ${ACCENTS.coral.main}` }}
              >
                <span className="font-display text-[10px] font-bold tracking-[0.12em] text-brand-coral">
                  NOW
                </span>
                <p className="ko-body mt-0.5 text-[12.5px] leading-[1.55] text-brand-mut">
                  {s.asIs}
                </p>
              </div>
              <div
                className="rounded-xl border border-line bg-white px-4 py-2.5"
                style={{ borderLeft: `3px solid ${ACCENTS.violet.main}` }}
              >
                <span className="font-display text-[10px] font-bold tracking-[0.12em] text-brand-violet">
                  NEXT
                </span>
                <p className="ko-body mt-0.5 text-[12.5px] leading-[1.55] text-brand-ink">
                  {s.toBe}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* 병목은 확정 계획이 아니라 선행 과제다 — 점선으로 가른다 */}
      <Reveal delay={0.36}>
        <div className="mt-4 rounded-2xl border border-dashed border-line bg-white/60 px-5 py-3.5">
          <div className="text-[11.5px] font-extrabold text-brand-mut">
            먼저 풀어야 하는 것 — 아이디어 {IDEA_STATS.ideas}건 중 {IDEA_STATS.premises}건에 전제가 걸려 있습니다
          </div>
          <div className="mt-2 grid gap-x-5 gap-y-1.5 md:grid-cols-2">
            {BOTTLENECKS.map((b) => (
              <p key={b.t} className="ko-body text-[11px] leading-[1.5] text-brand-mut">
                <b className="text-brand-sub">{b.t}</b> · {b.d}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}

/* ══════════════════════ 기능 연계도 ══════════════════════ */

function LoopSlide() {
  return (
    <Frame w={W}>
      <div className="text-center">
        <Reveal>
          <Kicker accent="violet">CLOSED LOOP</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="ko-head mt-2 text-[26px] font-extrabold tracking-[-0.03em] text-brand-ink md:text-[32px]">
            {LOOP_META.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="ko-body mx-auto mt-2.5 max-w-3xl text-[12.5px] leading-[1.6] text-brand-mut">
            {LOOP_META.lead}
          </p>
        </Reveal>
      </div>

      {/* ① 기획 — 세 갈래 인풋 */}
      <Reveal delay={0.18}>
        <div className="mt-5 grid gap-2.5 md:grid-cols-3">
          {INPUT_LINES.map((line) => {
            const a = ACCENTS[line.accent];
            return (
              <div
                key={line.key}
                className="rounded-2xl border border-line bg-surface-mist/50 p-2.5"
                style={{ borderTop: `3px solid ${a.main}` }}
              >
                <div className="mb-1.5 text-center text-[11.5px] font-extrabold" style={{ color: a.deep }}>
                  {line.title}
                </div>
                <div className="flex flex-col gap-1">
                  {line.nodes.map((n) => (
                    <div key={n.t} className="rounded-lg border border-line bg-white px-2.5 py-1.5">
                      <b className="text-[11.5px] font-extrabold text-brand-ink">{n.t}</b>
                      <p className="ko-body mt-px text-[10px] leading-[1.4] tracking-normal text-brand-mut">
                        {n.d}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <div className="my-1.5 text-center text-[13px] text-brand-faint" aria-hidden>
          ↓
        </div>
      </Reveal>

      {/* ② 생성 → ③ 집행 → ④ 학습 */}
      <div className="flex flex-col gap-1.5">
        {LOOP_FLOW.filter((f) => f.stage !== "learn").map((f, i) => {
          const st = findStage(f.stage);
          const a = ACCENTS[st.accent];
          return (
            <Reveal key={f.t} delay={0.32 + i * 0.06}>
              <div
                className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-xl border border-line bg-white px-4 py-2"
                style={{ borderLeft: `4px solid ${a.main}` }}
              >
                <span className="text-[11px] font-bold" style={{ color: a.main }}>
                  {st.no} {st.title}
                </span>
                <b className="text-[13px] font-extrabold text-brand-ink">{f.t}</b>
                <span className="ko-body text-[10.5px] leading-[1.45] text-brand-mut">{f.d}</span>
              </div>
            </Reveal>
          );
        })}

        <Reveal delay={0.46}>
          <div className="grid gap-1.5 md:grid-cols-3">
            {LOOP_FLOW.filter((f) => f.stage === "learn").map((f) => {
              const a = ACCENTS[findStage("learn").accent];
              return (
                <div
                  key={f.t}
                  className="rounded-xl border border-line bg-white px-3 py-2"
                  style={{ borderTop: `3px solid ${a.main}` }}
                >
                  <div className="flex items-baseline gap-1.5">
                    <b className="text-[12px] font-extrabold text-brand-ink">{f.t}</b>
                    {f.feedback && (
                      <span
                        className="rounded px-1 py-px font-display text-[9px] font-bold"
                        style={{ background: ACCENTS.violet.soft, color: ACCENTS.violet.deep }}
                      >
                        ↻ 환류
                      </span>
                    )}
                  </div>
                  <p className="ko-body mt-0.5 text-[10px] leading-[1.4] tracking-normal text-brand-mut">
                    {f.d}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.56}>
        <p className="mt-2 text-center text-[10.5px] font-semibold text-brand-faint">
          <span aria-hidden>↻</span> 학습 결과는 다시 ② 생성의 인풋이 됩니다 — 쓸수록 강해지는 구조
        </p>
      </Reveal>
    </Frame>
  );
}

/* ══════════════════════ 우선순위 체크 ══════════════════════ */

function PriorityGroupSlide({ group }: { group: (typeof PRIORITY_GROUPS)[number] }) {
  const st = findStage(group.stage);
  /* 폭 1040 — 1280 뷰포트에서 우측 도트 레일이 x≳1135 를 차지한다(실측).
     체크 표의 세 번째 열(후개발)이 그 아래로 들어가면 **누를 수 없다.**
     Frame 은 좌우 px-12 이므로 내용 우측 끝 = (1280+w)/2 − 48 → 1040 이면 1112 로 20px 남는다.
     레일 폭은 **가장 긴 nav 라벨**이 정하므로 여유를 둔다 — 딱 맞추면 라벨 하나 늘어날 때 다시 가린다. */
  return (
    <Frame w={W}>
      <div>
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-bold"
              style={{ background: ACCENTS[st.accent].soft, color: ACCENTS[st.accent].deep }}
            >
              {st.no} {st.title}
            </span>
            <h2 className="ko-head text-[22px] font-extrabold tracking-[-0.03em] text-brand-ink md:text-[26px]">
              {group.eyebrow}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="ko-body mt-1.5 text-[13px] leading-[1.6] text-brand-mut">{group.lead}</p>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <PriorityBoard group={group} />
      </Reveal>
    </Frame>
  );
}

/* ══════════════════════ 아이디어 정리 ══════════════════════ */

function IdeaDetailSlide({ idea }: { idea: Idea }) {
  const st = findStage(idea.stage);
  const a = ACCENTS[st.accent];

  /* 폭 1040 — 우측 도트 레일(x≳1135)을 비껴간다. 머리줄의 분류 칩이 우측 끝에 붙으므로
     더 넓으면 레일에 가린다 (PriorityGroupSlide 와 같은 이유). */
  return (
    <Frame w={W}>
      {/* 머리 — 번호 · 제목 · 분류 */}
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="font-display text-[13px] font-extrabold" style={{ color: a.main }}>
              #{idea.no}
            </span>
            <h2 className="ko-head text-[22px] font-extrabold tracking-[-0.03em] text-brand-ink md:text-[27px]">
              {idea.title}
            </h2>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold"
            style={{ background: a.soft, color: a.deep }}
          >
            {idea.category}
          </span>
        </div>
      </Reveal>

      {/* 핵심 개요 */}
      <Reveal delay={0.1}>
        <ul className="mt-3.5 flex flex-col gap-1">
          {idea.overview.map((t) => (
            <li key={t} className="ko-body flex gap-2 text-[12.5px] leading-[1.6] text-brand-sub">
              <span aria-hidden className="flex-none font-bold" style={{ color: a.main }}>
                ·
              </span>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* As-Is / To-Be */}
      <div className="mt-4 grid gap-2.5 md:grid-cols-2">
        <Reveal delay={0.18}>
          <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-4 shadow-card">
            <span
              className="self-start rounded-full px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[0.1em]"
              style={{ background: ACCENTS.coral.soft, color: ACCENTS.coral.deep }}
            >
              AS-IS · PAIN POINT
            </span>
            <ul className="mt-2.5 flex flex-col gap-1.5">
              {idea.asIs.map((t) => (
                <li
                  key={t}
                  className="ko-body flex gap-2 text-[12px] leading-[1.55] text-brand-mut"
                >
                  <span aria-hidden className="flex-none text-brand-coral">
                    ·
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div
            className="flex h-full flex-col rounded-2xl border border-line p-4 shadow-card"
            style={{ background: a.soft }}
          >
            <span
              className="self-start rounded-full px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[0.1em] text-white"
              style={{ background: a.main }}
            >
              TO-BE · 기대효과
            </span>
            <ul className="mt-2.5 flex flex-col gap-1.5">
              {idea.toBe.map((t) => (
                <li key={t} className="ko-body flex gap-2 text-[12px] leading-[1.55] text-brand-ink">
                  <span aria-hidden className="flex-none" style={{ color: a.deep }}>
                    ·
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* 전제 — 개발 병목. 확정 내용과 섞지 않는다 */}
      {idea.premise && (
        <Reveal delay={0.3}>
          <p className="ko-body mt-2.5 rounded-xl border border-dashed border-line bg-white/60 px-4 py-2 text-[11px] leading-[1.55] text-brand-mut">
            <b className="text-brand-sub">전제 · 개발 병목</b> — {idea.premise}
          </p>
        </Reveal>
      )}
    </Frame>
  );
}

/* ══════════════════════ 시스템 구성 · 구축 순서 ══════════════════════ */

/**
 * 새 원문(PPTX)에 없는 유일한 "무엇부터 어떻게 만드나" — 개발 기획 자료에서 가져온다.
 * 옛 아이디어 5건 번호로 순서를 적던 줄은 뺐다. 지금 번호 체계는 #01~#28 이라 어긋난다.
 */
function ArchSlide() {
  return (
    <Frame w={W}>
      <SlideHead
        kicker="ARCHITECTURE · ROADMAP"
        title="같은 기반 위에, 하나씩 얹는다"
        sub="아이디어가 늘어도 데이터 계층은 하나다 — 소스는 한 번만 붙이고 나눠 씁니다."
        accent="teal"
      />

      <div className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {ARCHITECTURE.map((l, i) => {
          const a = ACCENTS[l.accent];
          return (
            <Reveal key={l.layer} delay={0.12 + i * 0.06}>
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white">
                <div
                  className="px-3 py-1.5 text-center text-[12px] font-extrabold text-white"
                  style={{ backgroundImage: a.gradCss }}
                >
                  {l.layer}
                </div>
                <ul className="flex flex-1 flex-col gap-1 p-3">
                  {l.items.map((t) => (
                    <li
                      key={t}
                      className="ko-body flex gap-1.5 text-[11px] leading-[1.4] tracking-normal text-brand-mut"
                    >
                      <span aria-hidden className="flex-none" style={{ color: a.main }}>
                        ·
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
        {TASK_SPEC.phases.map((ph, i) => {
          const a = ACCENTS[(["blue", "teal", "violet"] as const)[i]];
          return (
            <Reveal key={ph.p} delay={0.36 + i * 0.07}>
              <div
                className="flex h-full flex-col rounded-xl border border-line bg-white p-3.5"
                style={{ borderTop: `3px solid ${a.main}` }}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[14px] font-extrabold" style={{ color: a.main }}>
                    {ph.p}
                  </span>
                  <span className="text-[10.5px] font-bold text-brand-faint">{ph.when}</span>
                </div>
                <p className="ko-body mt-1 text-[11px] leading-[1.5] text-brand-mut">{ph.what}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.6}>
        <p className="mt-2.5 text-[10.5px] leading-[1.5] text-brand-faint">
          ※ {DEV_META.estimateCaveat}
        </p>
      </Reveal>
    </Frame>
  );
}

/* ══════════════════════ 슬라이드 목록 ══════════════════════ */

/** 앞머리 개요 2장 — 통합 덱의 표지 바로 뒤에 온다 */
export const HSAD_OVERVIEW_SLIDES: SlideDef[] = [
  { id: "overview", nav: "개요", group: "intro", accent: "violet", node: <OverviewSlide /> },
  { id: "shift", nav: "지금 → 바뀐 뒤", group: "intro", accent: "violet", node: <ShiftSlide /> },
];

/**
 * 원문 PPTX 순서 그대로 — 연계도 1 + 우선순위 7 + 아이디어 28 = 36장.
 * 배경(`bg-page-alt`)으로 앞쪽 기획서 파트와 눈에 보이게 구분한다.
 */
export const HSAD_IDEAS_SLIDES: SlideDef[] = [
  {
    id: "loop",
    nav: "기능 연계도",
    group: "E",
    accent: "violet",
    bg: "bg-page-alt",
    node: <LoopSlide />,
  },

  ...PRIORITY_GROUPS.map((g) => ({
    id: `check-${g.slug}`,
    nav: `체크 ${g.short}`,
    group: "F" as const,
    accent: findStage(g.stage).accent,
    bg: "bg-page-alt",
    node: <PriorityGroupSlide group={g} />,
  })),

  ...IDEAS.map((idea) => ({
    id: `idea-${idea.slug}`,
    nav: `#${idea.no} ${idea.short}`,
    group: "G" as const,
    accent: findStage(idea.stage).accent,
    bg: "bg-page-alt",
    node: <IdeaDetailSlide idea={idea} />,
  })),

  {
    id: "arch",
    nav: "구성 · 구축 순서",
    group: "G",
    accent: "teal",
    bg: "bg-page-alt",
    node: <ArchSlide />,
  },
];
