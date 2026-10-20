"use client";

/**
 * 우선순위 체크 상태 — 아이디어 28건에 `우선 개발 / 기획 디벨럽 / 후개발` 중 하나를 표시하고
 * **브라우저에 저장**한다(원문 PPTX 2~8장의 체크 칸).
 *
 * 서버가 없으므로 저장소는 `localStorage` 하나다 — 같은 브라우저에서는 새로고침·덱 이동 후에도 남고,
 * 다른 사람에게는 넘어가지 않는다. 회의 결과를 공유하려면 `formatMarks()` 로 복사해 붙인다.
 *
 * 상태를 7개 슬라이드가 함께 보므로 **컨텍스트 프로바이더 대신 모듈 스토어 + `useSyncExternalStore`** 를 쓴다.
 * (덱·셸 레이아웃을 프로바이더로 감싸지 않는다는 프로젝트 규칙과 같은 방향이다.)
 */
import { useSyncExternalStore } from "react";
import { CHOICES, IDEAS, PRIORITY_GROUPS, type ChoiceKey } from "./hsad-ideas-data";

/** v1 — 저장 형식이 바뀌면 키를 올려 옛 값을 조용히 버린다 */
const KEY = "ax:hsad-priority:v1";

export type Marks = Readonly<Record<string, ChoiceKey>>;

/** 서버 스냅샷과 빈 상태가 **같은 참조**여야 리렌더 루프가 안 생긴다 */
const EMPTY: Marks = Object.freeze({});

const VALID = new Set<string>(CHOICES.map((c) => c.key));

let marks: Marks = EMPTY;
let loaded = false;
let listening = false;
const subs = new Set<() => void>();

/** 저장된 값에서 알 수 없는 아이디어·선택지는 버린다 (데이터가 바뀐 뒤에도 깨지지 않게) */
function sanitize(raw: unknown): Marks {
  if (!raw || typeof raw !== "object") return EMPTY;
  const known = new Set(IDEAS.map((i) => i.no));
  const out: Record<string, ChoiceKey> = {};
  for (const [no, v] of Object.entries(raw as Record<string, unknown>)) {
    if (known.has(no) && typeof v === "string" && VALID.has(v)) out[no] = v as ChoiceKey;
  }
  return Object.freeze(out);
}

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    marks = raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    // 손상된 값·차단된 저장소 — 빈 상태로 시작한다 (읽기 실패가 화면을 막지 않게)
    marks = EMPTY;
  }
}

const emit = () => subs.forEach((f) => f());

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(marks));
  } catch {
    // 사생활 보호 모드 등 — 저장만 실패하고 화면 상태는 유지된다
  }
}

/** 같은 칸을 다시 누르면 해제된다 (세 칸 중 하나, 또는 아무것도 아님) */
export function toggleMark(no: string, choice: ChoiceKey) {
  load();
  const next: Record<string, ChoiceKey> = { ...marks };
  if (next[no] === choice) delete next[no];
  else next[no] = choice;
  marks = Object.freeze(next);
  persist();
  emit();
}

export function clearMarks() {
  load();
  marks = EMPTY;
  persist();
  emit();
}

function subscribe(f: () => void) {
  load();
  subs.add(f);
  // 다른 탭에서 바꾼 값도 따라온다 — 리스너는 한 번만 붙인다
  if (!listening) {
    listening = true;
    window.addEventListener("storage", (e) => {
      if (e.key !== KEY) return;
      loaded = false;
      load();
      emit();
    });
  }
  return () => {
    subs.delete(f);
  };
}

function getSnapshot(): Marks {
  load();
  return marks;
}

const getServerSnapshot = (): Marks => EMPTY;

export function useMarks(): Marks {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ════════════════ 집계 · 내보내기 ════════════════ */

export function countMarks(marks: Marks) {
  const by = Object.fromEntries(CHOICES.map((c) => [c.key, 0])) as Record<ChoiceKey, number>;
  for (const v of Object.values(marks)) by[v] += 1;
  return { total: IDEAS.length, checked: Object.keys(marks).length, by };
}

/**
 * 회의 결과를 붙여 쓸 수 있는 평문. 그룹 순서(원문 슬라이드 순서)를 유지하고,
 * 체크가 없는 항목은 `미정` 으로 남겨 빠진 것이 드러나게 한다.
 */
export function formatMarks(marks: Marks): string {
  const label = (k?: ChoiceKey) => CHOICES.find((c) => c.key === k)?.label ?? "미정";
  const { checked, total, by } = countMarks(marks);

  const head = [
    "HSAD × Wisebirds — AI 솔루션 아이디어 우선순위",
    `체크 ${checked} / ${total}` +
      "  ·  " +
      CHOICES.map((c) => `${c.label} ${by[c.key]}`).join(" · "),
  ];

  const body = PRIORITY_GROUPS.flatMap((g) => [
    "",
    `[${g.eyebrow}] ${g.lead}`,
    ...g.items.map((no) => {
      const idea = IDEAS.find((i) => i.no === no);
      return `  #${no} ${idea?.title ?? ""} — ${label(marks[no])}`;
    }),
  ]);

  return [...head, ...body].join("\n");
}
