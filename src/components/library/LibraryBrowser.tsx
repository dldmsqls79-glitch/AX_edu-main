"use client";

import { useMemo, useState } from "react";
import { ALL_TOOLS, MODULES, ROLES, findModule, type Role } from "@/lib/lab-data";
import { PROMPT_ENTRIES, searchPrompts } from "@/lib/lab-search";
import { ACCENTS } from "@/lib/theme";
import { FilterRow } from "./FilterRow";
import { PromptResult } from "./PromptResult";

/**
 * 프롬프트 라이브러리 — 2회차 실습의 프롬프트를 모듈·직무·도구로 좁혀 찾는다.
 *
 * 필터 상태는 URL 에 넣지 않는다. 페이지 전체가 정적으로 프리렌더되어야
 * 검색어 없이 들어온 사람에게도 27개가 그대로 보인다.
 */
export function LibraryBrowser() {
  const [query, setQuery] = useState("");
  const [module, setModule] = useState<number | undefined>();
  const [role, setRole] = useState<Role | undefined>();
  const [tool, setTool] = useState<string | undefined>();

  const results = useMemo(
    () => searchPrompts({ query, module, role, tool }),
    [query, module, role, tool]
  );

  /* 칩의 숫자는 **다른 축을 적용한 뒤** 세어야 눌러도 0건인 조합이 안 생긴다 */
  const moduleCounts = useMemo(() => {
    const pool = searchPrompts({ query, role, tool });
    return MODULES.map((m) => ({
      value: m.num,
      label: `M${m.num}`,
      count: pool.filter((e) => e.moduleNum === m.num).length,
    }));
  }, [query, role, tool]);

  const roleCounts = useMemo(() => {
    const pool = searchPrompts({ query, module, tool });
    return ROLES.map((r) => ({
      value: r,
      label: r,
      count: pool.filter((e) => e.roles.includes(r)).length,
    }));
  }, [query, module, tool]);

  const toolCounts = useMemo(() => {
    const pool = searchPrompts({ query, module, role });
    return ALL_TOOLS.map((t) => ({
      value: t,
      label: t,
      count: pool.filter((e) => e.tools.includes(t)).length,
    }));
  }, [query, module, role]);

  const dirty = query !== "" || module !== undefined || role !== undefined || tool !== undefined;

  const reset = () => {
    setQuery("");
    setModule(undefined);
    setRole(undefined);
    setTool(undefined);
  };

  return (
    <>
      {/* ── 검색 · 필터 ── */}
      <div className="edge-top relative overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise">
        <label className="block">
          <span className="text-[12px] font-bold text-brand-faint">검색</span>
          <input
            type="search"
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
            placeholder="리텐션, 카피, 레드팀, 예산 재배분 … 프롬프트 본문까지 찾습니다"
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[14px] font-semibold outline-none transition-colors placeholder:font-medium placeholder:text-brand-faint focus:border-brand-violet/50"
          />
        </label>

        <div className="mt-4 space-y-2.5 border-t border-line pt-4">
          <FilterRow
            label="모듈"
            options={moduleCounts}
            value={module}
            onChange={setModule}
            colorOf={(n) => ACCENTS[findModule(n)!.accent].main}
          />
          <FilterRow label="직무" options={roleCounts} value={role} onChange={setRole} />
          <FilterRow label="도구" options={toolCounts} value={tool} onChange={setTool} />
        </div>
      </div>

      {/* ── 결과 ── */}
      <div className="mt-7 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-[18px] font-extrabold tracking-tight">
          프롬프트 {results.length}개
          {results.length !== PROMPT_ENTRIES.length && (
            <span className="ml-1.5 text-[13px] font-bold text-brand-faint">
              / 전체 {PROMPT_ENTRIES.length}
            </span>
          )}
        </h2>

        <span className="flex items-center gap-3">
          <span className="text-[12px] font-semibold text-brand-mut">
            변수는 기본값으로 채워져 있습니다 — 값을 바꾸려면 실습에서 여세요
          </span>
          {dirty && (
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-line bg-white px-3 py-1.5 text-[12px] font-bold text-brand-sub transition-colors hover:text-brand-violet"
            >
              필터 초기화
            </button>
          )}
        </span>
      </div>

      {results.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-line bg-white/50 px-6 py-10 text-center text-[13.5px] font-semibold text-brand-faint">
          조건에 맞는 프롬프트가 없습니다. 검색어를 줄이거나 필터를 풀어 보세요.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {results.map((e) => (
            <PromptResult key={e.key} e={e} query={query} />
          ))}
        </div>
      )}
    </>
  );
}
