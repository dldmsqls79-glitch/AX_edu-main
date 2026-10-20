"use client";
/**
 * 사내 교육 2회차 — API · MCP · 키값 관리 (17장).
 *
 * **여기는 배치만 한다.** 문장은 [session2-data.ts](@/lib/session2-data) 에서만 온다
 * (원문 `doc/AI 2회차 강의_목록 정리.pptx` 16장 + 표지 1장).
 *
 * 장수가 바뀌면 `tests/deck.spec.ts` 의 `count` 도 같이 고친다.
 * 슬라이드 높이 예산은 **663px @1280×720** — `Shot` 의 `maxH` 를 그 안에서 잡는다.
 */

import { Deck, type SlideDef } from "@/components/Deck";
import {
  BlobBg,
  Bullet,
  Callout,
  ChipRow,
  DashedNote,
  Frame,
  Kicker,
  KeyPoint,
  Reveal,
  SectionCover,
  Shot,
  SlideHead,
  Title,
} from "@/components/slide-kit";
import { ACCENTS } from "@/lib/theme";
import { PROJECTS, wb } from "@/lib/projects";
import {
  API_DEF,
  API_FLOW,
  ENV_EXAMPLE,
  KEY_HOW,
  KEY_PLACES,
  MCP_RESULT,
  MCP_STEPS,
  NEXT_UP,
  RECAP,
  RECAP_CLONE,
  RECAP_SHOTS,
  S2_META,
  type Shot as ShotData,
} from "@/lib/session2-data";

/* ══════════════════════════════════════════════════════════
   공용 조각 — 이 덱 안에서만 되풀이되는 배치
   ══════════════════════════════════════════════════════════ */

/** 좌: 제목·설명·불릿 │ 우: 화면 캡처. 캡처 슬라이드 대부분이 이 골격이다. */
function ShotSlide({
  no,
  title,
  sub,
  lead,
  points,
  shot,
  accent,
  maxH = 420,
}: {
  no?: string;
  title: string;
  /** 같은 제목이 여러 장에 걸칠 때 그 장이 무엇을 하는지 (원문 MCP 연결 3장) */
  sub?: string;
  lead: string;
  points: readonly string[];
  shot: ShotData;
  accent: "violet" | "blue" | "teal" | "coral" | "navy";
  maxH?: number;
}) {
  return (
    <Frame w={1040}>
      <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1.3fr]">
        <div>
          <Reveal>
            <Kicker accent={accent}>{no ? `STEP ${no}` : "SCREEN"}</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <Title className="!text-[30px] md:!text-[34px]">{title}</Title>
          </Reveal>
          {sub && (
            <Reveal delay={0.09}>
              <div
                className="mt-2 text-[15px] font-extrabold"
                style={{ color: ACCENTS[accent].deep }}
              >
                {sub}
              </div>
            </Reveal>
          )}
          <Reveal delay={0.12}>
            <p className="ko-body mt-3 text-[15px] leading-[1.7] text-brand-sub">{lead}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-5 flex list-none flex-col gap-2 p-0">
              {points.map((p) => (
                <Bullet key={p} accent={accent}>
                  {p}
                </Bullet>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0">
          <Shot src={shot.src} alt={shot.alt} maxH={maxH} caption={S2_META.shotCaveat} />
        </Reveal>
      </div>
    </Frame>
  );
}

/** `.env` 한 줄 — `이름=값` 을 갈라 이름 쪽에 색을 준다 (값은 전부 가려져 있다) */
function EnvLine({ line }: { line: string }) {
  const i = line.indexOf("=");
  const name = i < 0 ? line : line.slice(0, i);
  const value = i < 0 ? "" : line.slice(i);
  const isPublic = name.startsWith("NEXT_PUBLIC_");
  return (
    <div className="whitespace-pre">
      <span style={{ color: isPublic ? "#7dd3fc" : "#fca5a5" }}>{name}</span>
      <span className="text-[#8b95a5]">{value}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   슬라이드
   ══════════════════════════════════════════════════════════ */

const COVER_BG = "linear-gradient(160deg,#f7f5ff 0%,#eef2ff 55%,#f0fdfa 100%)";

const slides: SlideDef[] = [
  /* ─── 01 표지 ─── */
  {
    id: "s2-cover",
    nav: "표지",
    group: "intro",
    accent: "navy",
    bgCss: COVER_BG,
    node: (
      <>
        <BlobBg accent="navy" />
        <Frame w={1080}>
          <div className="relative text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-1.5 font-display text-[12px] font-bold tracking-[0.18em] text-brand-indigo shadow-pill backdrop-blur">
                WISEBIRDS · AX {S2_META.chip}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                className="ko-head mt-6 font-extrabold leading-[1.12] tracking-[-0.035em] text-brand-ink"
                style={{ fontSize: "clamp(34px,5.4vw,60px)" }}
              >
                {S2_META.title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p
                className="ko-body mx-auto mt-5 text-[16px] leading-[1.75] text-brand-sub"
                style={{ maxWidth: 700 }}
              >
                {S2_META.lead}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 grid gap-2.5 md:grid-cols-4">
                {S2_META.agenda.map((a) => (
                  <div
                    key={a.no}
                    className="edge-top rounded-2xl border border-line bg-white/85 px-4 py-4 text-left shadow-e1 backdrop-blur"
                  >
                    <span className="font-display text-[11px] font-bold tracking-[0.16em] text-brand-faint">
                      {a.no}
                    </span>
                    <div className="mt-1.5 text-[16px] font-extrabold text-brand-ink">{a.t}</div>
                    <p className="ko-body mt-1 text-[11.5px] leading-[1.5] text-brand-mut">{a.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Frame>
      </>
    ),
  },

  /* ─── 02 복습 ─── */
  {
    id: "s2-recap",
    nav: "복습",
    group: "A",
    accent: "blue",
    node: (
      <Frame w={1040}>
        <SlideHead
          kicker="RECAP · 1회차에서 한 것"
          title={RECAP.title}
          sub="지난 회차의 마지막 흐름입니다. 오늘은 이 상태에서 출발합니다."
          accent="blue"
        />
        <div className="mt-9 grid gap-3.5 md:grid-cols-3">
          {RECAP.steps.map((s, i) => (
            <Reveal key={s.t} delay={0.08 * i} className="h-full">
              <div className="edge-top relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl font-display text-[15px] font-bold text-white"
                  style={{ background: ACCENTS.blue.main }}
                >
                  {i + 1}
                </span>
                <div className="ko-head mt-4 text-[18px] font-extrabold leading-snug text-brand-ink">
                  {s.t}
                </div>
                <p className="ko-body mt-2 text-[13.5px] leading-[1.65] text-brand-mut">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Frame>
    ),
  },

  /* ─── 03~05 복습 · 화면 ─── */
  ...RECAP_SHOTS.map((s) => ({
    id: `s2-recap-${s.no}`,
    nav: s.title,
    group: "A" as const,
    accent: "blue" as const,
    node: (
      <ShotSlide
        no={s.no}
        title={s.title}
        lead={s.lead}
        points={s.points}
        shot={s.shot}
        accent="blue"
        maxH={s.no === "02" ? 430 : 380}
      />
    ),
  })),

  /* ─── 06 클론 실행 ─── */
  {
    id: "s2-recap-clone",
    nav: "클론 실행",
    group: "A",
    accent: "blue",
    node: (
      <Frame w={1040}>
        <SlideHead
          kicker="STEP 04"
          title={RECAP_CLONE.title}
          sub={RECAP_CLONE.lead}
          accent="blue"
        />

        <Reveal delay={0.1}>
          <div className="mt-7 rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="text-[11.5px] font-extrabold tracking-wide text-brand-faint">
              지시 형태
            </div>
            <p className="ko-body mt-2 font-mono text-[15px] leading-[1.7] text-brand-ink">
              {RECAP_CLONE.verbatimPrompt}
            </p>
            <div className="mt-3.5 grid gap-2 border-t border-line pt-3.5 md:grid-cols-2">
              {RECAP_CLONE.slots.map((s) => (
                <div key={s.k} className="flex items-baseline gap-2.5">
                  <code className="flex-none rounded bg-brand-ink/[0.06] px-1.5 py-0.5 font-mono text-[12px] font-bold text-brand-ink">
                    {s.k}
                  </code>
                  <span className="ko-body text-[12.5px] leading-[1.5] text-brand-mut">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mt-5">
          <Shot
            src={RECAP_CLONE.shot.src}
            alt={RECAP_CLONE.shot.alt}
            maxH={130}
            caption="실제 입력 예시 — 저장 위치와 클론 주소를 그대로 넣는다"
          />
        </Reveal>
      </Frame>
    ),
  },

  /* ─── 07 API 섹션 표지 ─── */
  {
    id: "s2-api-cover",
    nav: "API",
    group: "B",
    accent: "teal",
    bgCss: "linear-gradient(160deg,#f0fdfa 0%,#ecfeff 100%)",
    node: (
      <>
        <BlobBg accent="teal" />
        <div className="relative w-full">
          <SectionCover
            tag="01"
            title="API"
            subtitle="이미 만들어진 기능을 내 프로젝트로 끌어오는 창구입니다."
            topics={["무엇인가", "활용 순서"]}
            accent="teal"
          />
        </div>
      </>
    ),
  },

  /* ─── 08 API 란 ─── */
  {
    id: "s2-api-def",
    nav: "API 란",
    group: "B",
    accent: "teal",
    node: (
      <Frame w={1040}>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr]">
          <div>
            <Reveal>
              <Kicker accent="teal">WHAT IS API</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <Title className="!text-[30px] md:!text-[36px]">{API_DEF.full}</Title>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="ko-body mt-4 text-[16px] leading-[1.8] text-brand-sub">
                {API_DEF.body}
              </p>
            </Reveal>
            <div className="mt-6">
              <KeyPoint accent="teal" label="정리">
                기능을 처음부터 만들지 않고 <b>빌려 쓴다</b> — 그 빌리는 통로가 API 입니다.
              </KeyPoint>
            </div>
          </div>

          <Reveal delay={0.1} className="min-w-0">
            <Shot
              src={API_DEF.shot.src}
              alt={API_DEF.shot.alt}
              maxH={330}
              caption={API_DEF.shotNote}
            />
          </Reveal>
        </div>
      </Frame>
    ),
  },

  /* ─── 09 API 활용 순서 ─── */
  {
    id: "s2-api-flow",
    nav: "API 활용 순서",
    group: "B",
    accent: "teal",
    node: (
      <Frame w={1040}>
        <SlideHead
          kicker="HOW TO USE"
          title={API_FLOW.title}
          sub="발급받고, 등록하고, 시킨다 — 세 단계면 끝입니다."
          accent="teal"
        />
        <div className="mt-10 flex flex-wrap items-stretch justify-center gap-3">
          {API_FLOW.steps.map((s, i) => (
            <div key={s.t} className="flex items-stretch gap-3">
              <Reveal delay={0.1 * i}>
                <div
                  className="edge-top flex h-full w-[280px] flex-col rounded-2xl border border-line bg-white p-6 shadow-card"
                  style={{ borderTop: `3px solid ${ACCENTS.teal.main}` }}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl font-display text-[15px] font-bold text-white"
                    style={{ background: ACCENTS.teal.main }}
                  >
                    {i + 1}
                  </span>
                  <div className="ko-head mt-4 text-[19px] font-extrabold text-brand-ink">
                    {s.t}
                  </div>
                  <p className="ko-body mt-1.5 flex-1 text-[13px] leading-[1.6] text-brand-mut">
                    {s.d}
                  </p>
                  <div className="mt-4 border-t border-line pt-3">
                    <div className="text-[10.5px] font-extrabold tracking-wide text-brand-faint">
                      {s.itemsLabel}
                    </div>
                    <div className="mt-1.5">
                      <ChipRow items={[...s.items]} accent="teal" size="sm" />
                    </div>
                  </div>
                </div>
              </Reveal>
              {i < API_FLOW.steps.length - 1 && (
                <span
                  aria-hidden
                  className="self-center text-[22px] font-bold"
                  style={{ color: ACCENTS.teal.main }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </Frame>
    ),
  },

  /* ─── 10 MCP 섹션 표지 ─── */
  {
    id: "s2-mcp-cover",
    nav: "MCP",
    group: "C",
    accent: "violet",
    bgCss: "linear-gradient(160deg,#f7f5ff 0%,#f5f3ff 100%)",
    node: (
      <>
        <BlobBg accent="violet" />
        <div className="relative w-full">
          <SectionCover
            tag="02"
            title="MCP"
            subtitle="AI가 직접 도구를 쓰게 만드는 연결 규격입니다. 연결해 두면 말로 시키는 것만으로 실행됩니다."
            topics={["연결", "활용", "결과"]}
            accent="violet"
          />
        </div>
      </>
    ),
  },

  /* ─── 11~14 MCP 연결 3장 · 활용 1장 (원문 수정본 10~13장) ─── */
  ...MCP_STEPS.map((s) => ({
    id: `s2-mcp-${s.no}`,
    nav: s.nav,
    group: "C" as const,
    accent: "violet" as const,
    node: (
      <ShotSlide
        no={s.no}
        title={s.title}
        sub={s.sub}
        lead={s.lead}
        points={s.points}
        shot={s.shot}
        accent="violet"
        maxH={400}
      />
    ),
  })),

  /* ─── 13 MCP 활용 결과 ─── */
  {
    id: "s2-mcp-result",
    nav: "활용 결과",
    group: "C",
    accent: "violet",
    node: (
      <Frame w={1040}>
        <div className="grid items-center gap-9 md:grid-cols-[0.8fr_1.35fr]">
          <div>
            <Reveal>
              <Kicker accent="violet">RESULT</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <Title className="!text-[28px] md:!text-[32px]">{MCP_RESULT.title}</Title>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="ko-body mt-3 text-[14.5px] leading-[1.7] text-brand-sub">
                {MCP_RESULT.lead}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-5 flex list-none flex-col gap-2 p-0">
                {MCP_RESULT.points.map((p) => (
                  <Bullet key={p} accent="violet">
                    {p}
                  </Bullet>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="min-w-0">
            <div className="flex items-start justify-center gap-4">
              {MCP_RESULT.shots.map((s) => (
                <Shot key={s.src} src={s.src} alt={s.alt} maxH={430} />
              ))}
            </div>
            <p className="ko-body mt-2.5 text-center text-[12px] text-brand-mut">
              {S2_META.shotCaveat}
            </p>
          </Reveal>
        </div>
      </Frame>
    ),
  },

  /* ─── 14 키값 구성 예시 ─── */
  {
    id: "s2-env-example",
    nav: "키값 구성 예시",
    group: "D",
    accent: "coral",
    node: (
      <Frame w={1040}>
        <div className="grid items-center gap-9 md:grid-cols-[1.35fr_0.75fr]">
          <Reveal className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.2)] shadow-float">
              <div className="flex items-center gap-2 bg-[#1e232b] px-4 py-2.5">
                <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f56]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#ffbd2e]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-[11px] font-semibold text-white/45">
                  .env.local
                </span>
              </div>
              <div className="overflow-x-auto bg-[#0d1117] px-4 py-3.5 font-mono text-[10.5px] leading-[1.62] tracking-normal">
                {ENV_EXAMPLE.lines.map((l) => (
                  <EnvLine key={l} line={l} />
                ))}
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Kicker accent="coral">ENV FILE</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <Title className="!text-[26px] md:!text-[30px]">{ENV_EXAMPLE.title}</Title>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="ko-body mt-3 text-[13.5px] leading-[1.7] text-brand-sub">
                {ENV_EXAMPLE.lead}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                {ENV_EXAMPLE.reading.map((r) => (
                  <li key={r.k} className="rounded-xl border border-line bg-white px-3.5 py-2.5">
                    <div className="font-mono text-[11.5px] font-bold text-brand-ink">{r.k}</div>
                    <div className="ko-body mt-0.5 text-[11.5px] leading-[1.5] text-brand-mut">
                      {r.v}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.24} className="mt-3.5">
              <DashedNote label="이 화면의 값은 전부 가려 두었습니다">
                배울 것은 키의 <b>이름과 생김새</b>이지 값이 아닙니다.
              </DashedNote>
            </Reveal>
          </div>
        </div>
      </Frame>
    ),
  },

  /* ─── 15 키값 등록 — 로컬 · Vercel ─── */
  {
    id: "s2-key-places",
    nav: "키값 등록",
    group: "D",
    accent: "coral",
    node: (
      <Frame w={1040}>
        <SlideHead
          kicker="TWO PLACES"
          title={KEY_PLACES.title}
          sub={KEY_PLACES.lead}
          accent="coral"
        />
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {KEY_PLACES.places.map((p, i) => (
            <Reveal key={p.tag} delay={0.08 * i} className="h-full">
              <div
                className="edge-top flex h-full flex-col rounded-2xl border border-line bg-white p-4 shadow-card"
                style={{ borderTop: `3px solid ${ACCENTS[p.accent].main}` }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="rounded-lg px-2.5 py-1 font-display text-[11.5px] font-bold"
                    style={{ background: ACCENTS[p.accent].soft, color: ACCENTS[p.accent].deep }}
                  >
                    {p.tag}
                  </span>
                  <span className="font-mono text-[14.5px] font-extrabold text-brand-ink">
                    {p.title}
                  </span>
                </div>
                <p className="ko-body mt-2.5 text-[13px] leading-[1.6] text-brand-sub">{p.d}</p>
                <ul className="mt-2.5 flex list-none flex-col gap-1.5 p-0">
                  {p.points.map((t) => (
                    <li
                      key={t}
                      className="ko-body flex gap-2 text-[12px] leading-[1.5] text-brand-mut"
                    >
                      <span aria-hidden className="flex-none text-brand-faint">
                        ·
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-1 items-end justify-center">
                  <Shot src={p.shot.src} alt={p.shot.alt} maxH={196} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Frame>
    ),
  },

  /* ─── 16 키값 등록 방법 ─── */
  {
    id: "s2-key-how",
    nav: "등록 방법",
    group: "D",
    accent: "coral",
    node: (
      <Frame w={1040}>
        <div className="grid items-center gap-10 md:grid-cols-[0.85fr_1.3fr]">
          <div>
            <Reveal>
              <Kicker accent="coral">STEP BY STEP</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <Title className="!text-[28px] md:!text-[32px]">{KEY_HOW.title}</Title>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="ko-body mt-3 text-[14.5px] leading-[1.7] text-brand-sub">
                {KEY_HOW.lead}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-5 flex list-none flex-col gap-2.5 p-0">
                {KEY_HOW.steps.map((s, i) => (
                  <li key={s.t} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-[26px] w-[26px] flex-none items-center justify-center rounded-lg font-display text-[12px] font-bold text-white"
                      style={{ background: ACCENTS.coral.main }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-[13.5px] font-extrabold text-brand-ink">
                        {s.t}
                      </div>
                      <div className="ko-body mt-0.5 text-[12.5px] leading-[1.55] text-brand-mut">
                        {s.d}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.26} className="mt-4">
              <Callout accent="coral">{KEY_HOW.tip}</Callout>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="min-w-0">
            <Shot
              src={KEY_HOW.shot.src}
              alt={KEY_HOW.shot.alt}
              maxH={400}
              caption={S2_META.shotCaveat}
            />
          </Reveal>
        </div>
      </Frame>
    ),
  },

  /* ─── 17 마무리 ─── */
  {
    id: "s2-next",
    nav: "추후 안내",
    group: "close",
    accent: "navy",
    bgCss: COVER_BG,
    node: (
      <>
        <BlobBg accent="navy" />
        <Frame w={920}>
          <div className="relative text-center">
            <Reveal>
              <Kicker accent="navy">NEXT</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <Title>{NEXT_UP.title}</Title>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {NEXT_UP.items.map((t) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-dashed border-line bg-white/60 px-6 py-7 text-[16px] font-bold text-brand-sub"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="ko-body mt-8 text-[14px] leading-[1.7] text-brand-mut">
                오늘 다룬 API · MCP · 키값 관리는 다음 회차의 전제입니다.
                <br />
                각자 프로젝트에 키를 등록해 두고 오시면 바로 이어서 진행합니다.
              </p>
            </Reveal>
          </div>
        </Frame>
      </>
    ),
  },
];

export function Session2Deck() {
  return (
    <Deck
      slides={slides}
      badge={PROJECTS.wisebirds.badge}
      backHref={wb("/edu")}
      backLabel="교육 목록"
      eyebrow={S2_META.eyebrow}
      chip={S2_META.chip}
    />
  );
}
