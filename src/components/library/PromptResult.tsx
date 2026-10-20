"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { copyText } from "@/lib/clipboard";
import { resolvedText, snippetOf, type PromptEntry } from "@/lib/lab-search";
import { ACCENTS } from "@/lib/theme";

/** 라이브러리 결과 한 건 — 미리보기 · 전문 펼치기 · 복사 · 실습 열기 */
export function PromptResult({ e, query }: { e: PromptEntry; query: string }) {
  const a = ACCENTS[e.accent];
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  /* 보여주고 복사하는 글은 변수가 채워진 쪽 — 검색이 보는 원문과 다르다 */
  const text = useMemo(() => resolvedText(e), [e]);

  const copy = async () => {
    await copyText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <article className="edge-top relative overflow-hidden rounded-2xl border border-line bg-surface-raise shadow-raise transition-shadow hover:shadow-raiseHover">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1" style={{ background: a.main }} />

      <div className="px-6 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-md px-2 py-0.5 font-display text-[11px] font-bold"
            style={{ background: a.soft, color: a.deep }}
          >
            M{e.moduleNum} · {e.moduleSubject}
          </span>
          <span className="font-display text-[11.5px] font-bold text-brand-faint">
            실습 {e.labId}
          </span>
          {e.label !== "실습 프롬프트" && (
            <span className="rounded-full border border-line px-2 py-0.5 text-[11px] font-bold text-brand-mut">
              {e.label}
            </span>
          )}
          {e.fileCount > 0 && (
            <span className="text-[11px] font-bold text-brand-faint">
              📎 파일 {e.fileCount}
            </span>
          )}
        </div>

        <h3 className="mt-2.5 text-[17px] font-extrabold tracking-tight">{e.labTitle}</h3>
        <p className="mt-1.5 text-[13px] leading-[1.7] text-brand-mut">{e.goal}</p>

        {/* 검색어가 본문에 걸렸을 때만 본문 조각을 보여준다 (제목만 맞았으면 잡음이 된다) */}
        {query.trim() && (
          <p className="mt-2.5 rounded-lg bg-surface-sunken px-3 py-2 font-mono text-[11.5px] leading-[1.65] text-brand-faint">
            {snippetOf(text, query)}
          </p>
        )}

        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          {e.roles.map((r) => (
            <span
              key={r}
              className="rounded-full px-2 py-0.5 text-[11px] font-bold"
              style={{ background: a.soft, color: a.deep }}
            >
              {r}
            </span>
          ))}
          {e.tools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-2 py-0.5 text-[11px] font-bold text-brand-faint"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copy}
            className="rounded-lg px-3.5 py-2 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: a.main }}
          >
            {copied ? "복사됨 ✓" : "프롬프트 복사"}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="rounded-lg border border-line bg-white px-3.5 py-2 text-[12.5px] font-bold text-brand-sub transition-colors hover:text-brand-violet"
          >
            {open ? "본문 접기" : "본문 보기"}
          </button>

          <Link
            href={e.href}
            className="ml-auto text-[12.5px] font-bold transition-transform hover:translate-x-0.5"
            style={{ color: a.deep }}
          >
            실습에서 열기 →
          </Link>
        </div>

        {open && (
          <pre className="mt-3.5 max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl bg-[#151a23] px-4 py-3.5 font-mono text-[12px] leading-[1.8] text-[#e9edf4]">
            {text}
          </pre>
        )}
      </div>
    </article>
  );
}
