"use client";

import type { ReactNode } from "react";
import type { FlowNode, Phase } from "@/lib/hsad-dev-data";
import { ACCENTS, type Accent } from "@/lib/theme";

/**
 * As-Is / To-Be Workflow 도식.
 *
 * 형식은 `퍼포먼스TF 아이디어 구조화 템플릿` 을 따른다 —
 *   1단계(큰 업무 단위) · 2단계(한 문장 요약) · 3단계(세부 흐름) 를 가로 3단으로 쌓고,
 *   시작 → 단계들 → 종료 로 흐르며, As-Is 에는 페인포인트를 붙인다.
 *
 * 원본 PPT 는 자유 배치 다이어그램이지만, 웹에서는 **단계를 열로 세운다** —
 * 좁은 폭에서도 흐름이 끊기지 않고 접근성(읽는 순서)도 유지된다.
 * 노드 종류가 늘어나면 여기 `NodeBox` 에 추가한다. 페이지에서 새 모양을 만들지 않는다.
 */

const T = {
  band: "font-display text-[10.5px] font-bold tracking-[0.12em]",
  node: "text-[12px] font-bold leading-tight tracking-normal",
  note: "text-[10.5px] leading-[1.45] tracking-normal",
};

function StageLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="rounded bg-brand-ink/[0.06] px-1.5 py-0.5 font-display text-[9.5px] font-bold text-brand-mut">
        {n}
      </span>
      <span className="text-[10.5px] font-bold text-brand-faint">{children}</span>
    </div>
  );
}

function Terminal({ label, accent }: { label: string; accent: Accent }) {
  const a = ACCENTS[accent];
  return (
    <span
      className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full border-2 bg-white text-[12px] font-extrabold"
      style={{ borderColor: a.main, color: a.deep }}
    >
      {label}
    </span>
  );
}

function NodeBox({
  node,
  accent,
  dense = false,
}: {
  node: FlowNode;
  accent: Accent;
  /** 압축 모드 — note 를 접고 한 줄 칩으로 만든다 (두 도식을 한 장에 넣을 때) */
  dense?: boolean;
}) {
  const a = ACCENTS[accent];
  const pad = dense ? "px-2.5 py-1.5" : "px-3 py-2.5";

  if (node.kind === "branch") {
    return (
      <div
        className={`rounded-xl border-2 border-dashed bg-white ${pad}`}
        style={{ borderColor: `${a.main}66` }}
      >
        <div className={`flex items-center gap-1.5 ${T.node}`} style={{ color: a.deep }}>
          <span aria-hidden>◇</span>
          {node.label}
        </div>
        <div className="mt-1.5 flex gap-1.5">
          <span className="rounded bg-brand-teal/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-tealDeep">
            Y · {node.yes}
          </span>
          <span className="rounded bg-brand-ink/[0.06] px-1.5 py-0.5 text-[10px] font-bold text-brand-mut">
            N · {node.no}
          </span>
        </div>
      </div>
    );
  }

  if (node.kind === "agent") {
    return (
      <div
        className={`rounded-xl border ${pad}`}
        style={{ borderColor: `${a.main}55`, background: a.soft }}
      >
        <div className="flex items-start gap-1.5">
          <span
            className="mt-px flex h-[17px] w-[17px] flex-none items-center justify-center rounded font-display text-[10px] font-bold text-white"
            style={{ background: a.main }}
          >
            {node.agent}
          </span>
          <span className={T.node} style={{ color: a.deep }}>
            {node.label}
          </span>
        </div>
        {node.note && !dense && (
          <div className={`ko-body mt-1 pl-[23px] text-brand-mut ${T.note}`}>{node.note}</div>
        )}
      </div>
    );
  }

  if (node.kind === "human") {
    return (
      <div className={`rounded-xl border-2 border-brand-ink/25 bg-white ${pad}`}>
        <div className="flex items-start gap-1.5">
          <span className="mt-px flex-none rounded bg-brand-ink/10 px-1 py-0.5 font-display text-[9px] font-bold text-brand-sub">
            HUMAN
          </span>
          <span className={`${T.node} text-brand-ink`}>{node.label}</span>
        </div>
        {node.note && !dense && (
          <div className={`ko-body mt-1 text-brand-mut ${T.note}`}>{node.note}</div>
        )}
      </div>
    );
  }

  /* activity — core 면 굵은 좌측 바로 Core Node 임을 표시한다 */
  return (
    <div
      className={`rounded-xl border border-line bg-white ${pad}`}
      style={node.core ? { borderLeft: `4px solid ${a.main}` } : undefined}
    >
      <div className={`${T.node} text-brand-ink`}>{node.label}</div>
      {node.note && !dense && (
        <div className={`ko-body mt-1 text-brand-mut ${T.note}`}>{node.note}</div>
      )}
    </div>
  );
}

function Down() {
  return (
    <span aria-hidden className="block text-center text-[11px] leading-none text-brand-faint">
      ↓
    </span>
  );
}

/**
 * @param band  As-Is / To-Be 를 한 슬라이드에 위아래로 놓을 때 붙이는 머리띠.
 *              도식 자체가 무엇인지 말해주므로 슬라이드 제목을 두 번 쓰지 않아도 된다.
 * @param dense 압축 모드 — 두 도식을 한 장(높이 예산 664px)에 넣을 때 쓴다.
 *              1·2단계 라벨과 시작/종료 원을 접고, 노드를 한 줄 칩으로 만든다.
 */
export function WorkflowDiagram({
  phases,
  accent,
  mode,
  band,
  dense = false,
}: {
  phases: Phase[];
  accent: Accent;
  mode: "as-is" | "to-be";
  band?: string;
  dense?: boolean;
}) {
  const a = ACCENTS[accent];

  return (
    <div className={`rounded-2xl border border-line bg-surface-mist/50 ${dense ? "p-3" : "p-4"}`}>
      {band ? (
        <div className="mb-2 flex items-center gap-2">
          <span
            className="rounded-md px-2 py-0.5 font-display text-[10.5px] font-bold text-white"
            style={{ background: a.main }}
          >
            {band}
          </span>
          <span className="text-[10.5px] font-bold text-brand-faint">
            1단계 업무 단위 · 2단계 요약 · 3단계 세부 흐름
          </span>
        </div>
      ) : (
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <StageLabel n="1단계">업무 단위</StageLabel>
          <StageLabel n="2단계">한 문장 요약</StageLabel>
          <StageLabel n="3단계">세부 흐름</StageLabel>
        </div>
      )}

      {/* 시작 · 종료는 도식 **안쪽**에 둔다 — 바깥 끝에 붙이면 덱의 도트 네비에 가린다 */}
      <div className="flex items-start gap-2">
        {!dense && (
          <span className="mt-9 hidden md:block">
            <Terminal label="시작" accent={accent} />
          </span>
        )}

        <div className={`grid flex-1 md:grid-cols-3 ${dense ? "gap-2" : "gap-3"}`}>
        {phases.map((ph, pi) => (
          <div key={ph.title} className="relative flex flex-col">
            {/* 단계 사이 화살표 — 마지막 열에는 붙이지 않는다 */}
            {pi < phases.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-[13px] top-[14px] hidden text-[14px] leading-none md:block"
                style={{ color: a.main }}
              >
                →
              </span>
            )}

            {/* 1단계 */}
            <div
              className={`rounded-t-xl px-3 text-center font-extrabold text-white ${
                dense ? "py-1 text-[12px]" : "py-2 text-[13px]"
              }`}
              style={{ backgroundImage: a.gradCss }}
            >
              {ph.title}
            </div>

            {/* 2단계 */}
            <div
              className={`ko-body border-x border-line bg-white px-3 text-center leading-[1.45] text-brand-sub ${
                dense ? "py-1 text-[10.5px]" : "py-2 text-[11.5px]"
              }`}
            >
              {ph.summary}
            </div>

            {/* 3단계 */}
            <div
              className={`flex flex-1 flex-col rounded-b-xl border-x border-b border-line bg-white/70 ${
                dense ? "gap-0.5 p-1.5" : "gap-1 p-2.5"
              }`}
            >
              {ph.nodes.map((n, i) => (
                <div key={i}>
                  {i > 0 && !dense && <Down />}
                  <div className={dense ? "mt-1 first:mt-0" : "mt-1 first:mt-0"}>
                    <NodeBox node={n} accent={accent} dense={dense} />
                  </div>
                </div>
              ))}
            </div>

            {/* 페인포인트 — As-Is 에만 */}
            {mode === "as-is" && ph.pain && (
              <div
                className={`rounded-xl border border-brand-coral/35 bg-brand-coral/[0.07] px-2.5 ${
                  dense ? "mt-1.5 py-1.5" : "mt-2 py-2.5"
                }`}
              >
                <div className={`font-extrabold text-brand-coral ${dense ? "text-[10.5px]" : "text-[11.5px]"}`}>
                  ⚠ {ph.pain.title}
                </div>
                <p
                  className={`ko-body mt-0.5 leading-[1.45] text-brand-sub ${
                    dense ? "text-[10px]" : "text-[11px]"
                  }`}
                >
                  {ph.pain.body}
                </p>
              </div>
            )}
          </div>
        ))}
        </div>

        {!dense && (
          <span className="mt-9 hidden md:block">
            <Terminal label="종료" accent={accent} />
          </span>
        )}
      </div>
    </div>
  );
}

/** 도식 범례 — 원본 템플릿의 범례 박스와 같은 항목 */
export function WorkflowLegend({
  accent,
  mode,
}: {
  accent: Accent;
  mode: "as-is" | "to-be";
}) {
  const a = ACCENTS[accent];
  const items: { chip: ReactNode; t: string; d: string }[] = [
    {
      chip: (
        <span
          className="inline-block h-4 w-7 rounded border border-line bg-white"
          style={{ borderLeft: `4px solid ${a.main}` }}
        />
      ),
      t: "Activity · Core Node",
      d: "1단계 업무의 하위 프로세스. 굵은 선은 핵심 업무 흐름",
    },
    {
      chip: (
        <span className="inline-block h-4 w-7 rounded border-2 border-dashed" style={{ borderColor: `${a.main}66` }} />
      ),
      t: "분기",
      d: "조건부·선택사항이 필요할 때",
    },
  ];

  if (mode === "as-is") {
    items.push({
      chip: (
        <span className="inline-block h-4 w-7 rounded border border-brand-coral/35 bg-brand-coral/[0.07]" />
      ),
      t: "PainPoint",
      d: "현업 담당자 입장에서의 Pain Point",
    });
  } else {
    items.push({
      chip: (
        <span
          className="inline-block h-4 w-7 rounded border"
          style={{ borderColor: `${a.main}55`, background: a.soft }}
        />
      ),
      t: "AI Agent 도입 영역",
      d: "AI 적용으로 자동화된 Activity",
    });
    items.push({
      chip: <span className="inline-block h-4 w-7 rounded border-2 border-brand-ink/25 bg-white" />,
      t: "Human",
      d: "사람 개입이 필수인 판단",
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-line bg-white px-4 py-2.5">
      {items.map((it) => (
        <span key={it.t} className="flex items-center gap-2">
          {it.chip}
          <span className="text-[11px] leading-tight">
            <b className="text-brand-ink">{it.t}</b>{" "}
            <span className="text-brand-faint">— {it.d}</span>
          </span>
        </span>
      ))}
    </div>
  );
}
