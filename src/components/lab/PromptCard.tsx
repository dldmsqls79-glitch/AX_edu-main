"use client";

import { useEffect, useMemo, useState } from "react";
import { copyText } from "@/lib/clipboard";
import { AUTO_VARS, type Lab } from "@/lib/lab-data";
import {
  TOKEN,
  autoValue as autoValueOf,
  defaultVals,
  plainPrompt,
  visibleLines,
} from "@/lib/prompt-text";
import { Combo } from "./Combo";

/** 탭에는 괄호 부연을 뺀 짧은 이름만 (전체 라벨은 툴팁으로) */
const tabName = (label: string) => label.replace(/\s*\([^)]*\)\s*$/, "").trim();

export function PromptCard({ lab, accent }: { lab: Lab; accent: string }) {
  const [active, setActive] = useState(0);
  const [vals, setVals] = useState<Record<string, string>>(() => defaultVals(lab.vars));
  const [edited, setEdited] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const varByName = useMemo(
    () => new Map(lab.vars.map((v) => [v.name, v])),
    [lab.vars]
  );

  /* 광고주를 바꾸면 연동 변수의 기본값도 따라 바뀐다 — 직접 고친 변수는 건드리지 않는다 */
  const advertiser = vals["광고주"];
  useEffect(() => {
    if (!advertiser) return;
    setVals((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const v of lab.vars) {
        if (!v.byAdvertiser || edited.has(v.name)) continue;
        const nv = v.byAdvertiser[advertiser];
        if (nv && nv !== prev[v.name]) {
          next[v.name] = nv;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [advertiser, edited, lab.vars]);

  const autoValue = (name: string) => autoValueOf(name, vals);

  const setVal = (name: string, v: string) => {
    setVals((prev) => ({ ...prev, [name]: v }));
    setEdited((prev) => (prev.has(name) ? prev : new Set(prev).add(name)));
  };

  const text = lab.prompts[active]?.text ?? "";
  const lines = visibleLines(text, vals);

  /* 복사용 평문 — 현재 탭과 선택한 값이 반영된 상태 (라이브러리와 같은 규칙) */
  const plain = plainPrompt(text, vals, new Set(varByName.keys()));

  const copy = async () => {
    await copyText(plain);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* ── 탭 · 복사 ── */}
      <div className="flex flex-shrink-0 flex-wrap items-center gap-2 pb-2.5">
        {lab.prompts.length > 1 &&
          lab.prompts.map((p, i) => (
            <button
              key={p.label}
              type="button"
              title={p.label}
              onClick={() => setActive(i)}
              className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold transition-colors ${
                i === active
                  ? "text-white"
                  : "border-line bg-white text-brand-sub hover:text-brand-ink"
              }`}
              style={
                i === active
                  ? { background: accent, borderColor: accent }
                  : undefined
              }
            >
              {tabName(p.label)}
            </button>
          ))}
        <span className="ml-auto text-[11.5px] font-semibold text-brand-faint">
          {lab.vars.length > 0 && "밑줄 값을 바꾸면 복사되는 프롬프트에 그대로 반영됩니다"}
        </span>
      </div>

      {/* ── 프롬프트 본문 ── */}
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-[#151a23] shadow-float">
        <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="font-mono text-[11px] font-semibold tracking-wide text-white/40">
            prompt.txt
          </span>
          <button
            type="button"
            onClick={copy}
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-white/20"
          >
            {copied ? "복사됨 ✓" : "복사"}
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-[1.85] text-[#e9edf4]">
            {lines.map((line, li) => (
              <span key={li}>
                {renderLine(line)}
                {li < lines.length - 1 ? "\n" : ""}
              </span>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );

  function renderLine(line: string) {
    const out: React.ReactNode[] = [];
    let last = 0;
    let k = 0;
    for (const m of line.matchAll(TOKEN)) {
      const name = m[1];
      const at = m.index ?? 0;
      if (at > last) out.push(line.slice(last, at));
      last = at + m[0].length;

      if (name in AUTO_VARS) {
        out.push(
          <span
            key={k++}
            title="선택한 값에 따라 자동으로 채워집니다"
            className="rounded-[5px] px-1.5 py-[1px] font-semibold"
            style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}
          >
            {autoValue(name)}
          </span>
        );
      } else if (varByName.has(name)) {
        const v = varByName.get(name)!;
        out.push(
          <Combo
            key={k++}
            value={vals[name] ?? ""}
            options={v.options}
            hint={`${v.name} — ${v.hint}`}
            accent={accent}
            onChange={(nv) => setVal(name, nv)}
          />
        );
      } else {
        out.push(m[0]);
      }
    }
    if (last < line.length) out.push(line.slice(last));
    return out;
  }
}
