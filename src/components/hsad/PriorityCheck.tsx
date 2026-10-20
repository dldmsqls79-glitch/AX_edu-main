"use client";

/**
 * 우선순위 체크 표 — 원문 PPTX 2~8장의 체크 칸을 화면에서 실제로 누르고 저장한다.
 *
 * 상태는 [priority-store.ts](../../lib/priority-store.ts) 하나에 있다(localStorage).
 * 일곱 슬라이드가 같은 스토어를 보므로, 어느 장에서 눌러도 합계가 같이 움직인다.
 *
 * 접근성 — 한 아이디어의 세 칸은 `role="group"` 하나로 묶고 각 칸은 `aria-pressed` 를 가진다.
 * (세 칸 중 하나만 켜지지만 '아무것도 안 고름'이 정상 상태라 라디오가 아니다.)
 */
import { useState } from "react";
import { copyText } from "@/lib/clipboard";
import { CHOICES, IDEAS, findIdea, findStage, type PRIORITY_GROUPS } from "@/lib/hsad-ideas-data";
import { clearMarks, countMarks, formatMarks, toggleMark, useMarks } from "@/lib/priority-store";
import { ACCENTS } from "@/lib/theme";

type Group = (typeof PRIORITY_GROUPS)[number];

/** 체크 칸 하나 — 눌린 칸만 선택지 색으로 찬다 */
function CheckBox({
  on,
  choice,
  label,
  onClick,
}: {
  on: boolean;
  choice: (typeof CHOICES)[number];
  label: string;
  onClick: () => void;
}) {
  const a = ACCENTS[choice.accent];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      aria-label={`${label} — ${choice.label}`}
      className="flex items-center justify-center py-1 transition-transform hover:scale-105 active:scale-100"
    >
      <span
        className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] border-2 text-[13px] font-bold leading-none text-white transition-colors"
        style={{
          borderColor: on ? a.main : "rgba(15,23,42,0.22)",
          background: on ? a.main : "#fff",
        }}
      >
        <span aria-hidden>{on ? "✓" : ""}</span>
      </span>
    </button>
  );
}

/** 한 슬라이드 = 한 그룹. 행 하나가 아이디어 하나 */
export function PriorityBoard({ group }: { group: Group }) {
  const marks = useMarks();
  const stage = findStage(group.stage);
  const items = group.items.map((no) => findIdea(no)!).filter(Boolean);

  /* 제목 열 + 선택지 3열 — 열 폭을 헤더와 행이 공유해야 체크 칸이 라벨 아래 정확히 선다 */
  const COLS = "grid grid-cols-[minmax(0,1fr)_repeat(3,88px)] items-center gap-x-2";

  return (
    <div className="mt-5">
      {/* 열 머리 */}
      <div className={`${COLS} border-b border-line pb-1.5`}>
        <span className="text-[11px] font-bold text-brand-faint">차기 회의 : 우선순위 체크</span>
        {CHOICES.map((c) => (
          <span
            key={c.key}
            className="text-center text-[11.5px] font-extrabold"
            style={{ color: ACCENTS[c.accent].deep }}
          >
            {c.label}
          </span>
        ))}
      </div>

      {/* 행 */}
      <div className="divide-y divide-line/70">
        {items.map((idea) => {
          const cur = marks[idea.no];
          return (
            <div key={idea.no} className={`${COLS} py-2`} role="group" aria-label={`#${idea.no} ${idea.title}`}>
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-2">
                  <b
                    className="font-display text-[12px] font-extrabold"
                    style={{ color: ACCENTS[stage.accent].main }}
                  >
                    #{idea.no}
                  </b>
                  <b className="text-[13.5px] font-extrabold leading-tight text-brand-ink">
                    {idea.title}
                  </b>
                </span>
                <span className="ko-body mt-0.5 block text-[11px] leading-[1.5] text-brand-mut">
                  {idea.brief}
                </span>
              </span>

              {CHOICES.map((c) => (
                <CheckBox
                  key={c.key}
                  on={cur === c.key}
                  choice={c}
                  label={`#${idea.no} ${idea.title}`}
                  onClick={() => toggleMark(idea.no, c.key)}
                />
              ))}
            </div>
          );
        })}
      </div>

      <PriorityFooter />
    </div>
  );
}

/**
 * 합계 · 내보내기 — 일곱 슬라이드 어디에서나 같은 값을 본다.
 * 저장은 브라우저 하나에만 남으므로, 결과를 넘길 길(복사)을 같은 줄에 둔다.
 */
export function PriorityFooter() {
  const marks = useMarks();
  const [copied, setCopied] = useState(false);
  const { checked, total, by } = countMarks(marks);

  const onCopy = async () => {
    await copyText(formatMarks(marks));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-2.5">
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-brand-mut">
        <span>
          체크 <b className="text-brand-ink">{checked}</b> / {total}
        </span>
        {CHOICES.map((c) => (
          <span key={c.key} style={{ color: ACCENTS[c.accent].deep }}>
            {c.label} <b>{by[c.key]}</b>
          </span>
        ))}
      </span>

      {/* 화면 전용 조작 — 인쇄에서는 감춘다 (.deck-chrome) */}
      <span className="deck-chrome flex items-center gap-1.5">
        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg border border-line bg-white px-2.5 py-1 text-[11px] font-bold text-brand-sub transition-colors hover:text-brand-violetDeep"
        >
          {copied ? "복사됨" : "결과 복사"}
        </button>
        <button
          type="button"
          onClick={clearMarks}
          disabled={checked === 0}
          className="rounded-lg border border-line bg-white px-2.5 py-1 text-[11px] font-bold text-brand-faint transition-colors enabled:hover:text-brand-coral disabled:opacity-45"
        >
          초기화
        </button>
      </span>
    </div>
  );
}

/**
 * 체크 현황 한 줄 — 개요 슬라이드에서 "지금 몇 건 정해졌는지"를 보여준다.
 * 표를 그리지 않고 숫자만 쓰므로 높이 비용이 거의 없다.
 */
export function PriorityTally() {
  const marks = useMarks();
  const { checked } = countMarks(marks);
  return (
    <span className="text-[12px] font-bold text-brand-mut">
      우선순위 체크 <b className="text-brand-violetDeep">{checked}</b> / {IDEAS.length}
    </span>
  );
}
