/**
 * 프롬프트 라이브러리 · 전역 검색이 함께 쓰는 인덱스.
 *
 * 목록을 손으로 적지 않는다 — [lab-data.ts](./lab-data.ts) 의 실습에서 파생시킨다.
 * 실습을 추가하면 라이브러리·검색·통계가 전부 따라온다.
 *
 * ⚠️ 이 모듈은 전체 프롬프트 본문을 담는다(수십 KB).
 *    전역 헤더처럼 모든 페이지에 실리는 곳에서는 **동적 import** 로 불러온다.
 */
import { FLAT_LABS, labHref, type LabVar, type Role } from "./lab-data";
import { plainWithDefaults } from "./prompt-text";
import type { Accent } from "./theme";

export interface PromptEntry {
  /** "3-1#0" — 실습 안에서 프롬프트를 구분한다 */
  key: string;
  labId: string;
  labTitle: string;
  goal: string;
  /** 프롬프트 탭 라벨 ("실습 프롬프트" · "A. 단순 요청" …) */
  label: string;
  /**
   * {변수}가 그대로 남아 있는 원문 — **검색은 이것을 본다.**
   *
   * 치환된 글을 색인하면 기본 광고주의 업종 설명("종합 이커머스 앱 — … 재구매 리텐션이 핵심")이
   * 거의 모든 프롬프트에 섞여 들어가, "리텐션" 검색이 27개 중 21개를 잡는다.
   * 변수의 기본값은 프롬프트의 내용이 아니므로 색인에서 뺀다.
   */
  raw: string;
  /** 치환에 쓸 변수 정의 — lab-data 의 객체를 그대로 참조한다(복사하지 않는다) */
  vars: LabVar[];
  moduleNum: number;
  moduleSubject: string;
  accent: Accent;
  tools: string[];
  roles: Role[];
  fileCount: number;
  href: string;
}

export const PROMPT_ENTRIES: PromptEntry[] = FLAT_LABS.flatMap((lab) =>
  lab.prompts.map((p, i) => ({
    key: `${lab.id}#${i}`,
    labId: lab.id,
    labTitle: lab.title,
    goal: lab.goal,
    label: p.label,
    raw: p.text,
    vars: lab.vars,
    moduleNum: lab.mod.num,
    moduleSubject: lab.mod.subject,
    accent: lab.mod.accent,
    tools: lab.tools,
    roles: lab.roles,
    fileCount: lab.files.length,
    href: labHref(`/${lab.id}`),
  }))
);

/** 변수 기본값이 채워진 평문 — 보여주고 복사하는 글 (실습 화면의 초기 상태와 같다) */
export const resolvedText = (e: PromptEntry): string =>
  plainWithDefaults(e.raw, e.vars);

interface PromptFilter {
  query?: string;
  /** 모듈 번호 (없으면 전체) */
  module?: number;
  role?: Role;
  tool?: string;
}

/* 제목에서 맞은 것이 본문에서 스친 것보다 위로 온다 */
const WEIGHT = { id: 10, title: 8, label: 5, goal: 4, meta: 3, body: 1 };

function scoreOf(e: PromptEntry, terms: string[]): number {
  const id = e.labId.toLowerCase();
  const title = e.labTitle.toLowerCase();
  const label = e.label.toLowerCase();
  const goal = e.goal.toLowerCase();
  const meta = [e.moduleSubject, ...e.tools, ...e.roles].join(" ").toLowerCase();
  const body = e.raw.toLowerCase();

  let total = 0;
  for (const t of terms) {
    let s = 0;
    if (id.includes(t)) s += WEIGHT.id;
    if (title.includes(t)) s += WEIGHT.title;
    if (label.includes(t)) s += WEIGHT.label;
    if (goal.includes(t)) s += WEIGHT.goal;
    if (meta.includes(t)) s += WEIGHT.meta;
    if (body.includes(t)) s += WEIGHT.body;
    // 한 단어라도 아예 안 걸리면 결과에서 뺀다 (모든 단어 AND)
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

/** 필터 + 검색. 검색어가 없으면 모듈 순서를 그대로 유지한다. */
export function searchPrompts(
  { query = "", module, role, tool }: PromptFilter,
  entries: PromptEntry[] = PROMPT_ENTRIES
): PromptEntry[] {
  const pool = entries.filter(
    (e) =>
      (module === undefined || e.moduleNum === module) &&
      (role === undefined || e.roles.includes(role)) &&
      (tool === undefined || e.tools.includes(tool))
  );

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return pool;

  return pool
    .map((e) => ({ e, score: scoreOf(e, terms) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score) // 동점이면 원래 순서 유지 (Array#sort 는 stable)
    .map((x) => x.e);
}

/**
 * 검색어 주변만 잘라 보여준다 — 없으면 앞부분.
 *
 * 색인은 원문(`raw`)을 보지만 **보여주는 건 치환된 글**이다.
 * 원문을 그대로 자르면 `{광고주}` 가운데서 끊겨 "… 고주} -" 같은 조각이 나온다.
 */
export function snippetOf(text: string, query: string, len = 120): string {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const body = text.replace(/\s+/g, " ").trim();

  const at = terms
    .map((t) => body.toLowerCase().indexOf(t))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b)[0];

  if (at === undefined) return body.slice(0, len);

  const from = Math.max(0, at - Math.floor(len / 3));
  return (from > 0 ? "… " : "") + body.slice(from, from + len);
}
