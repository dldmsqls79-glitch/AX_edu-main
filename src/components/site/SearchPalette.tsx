"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PromptEntry } from "@/lib/lab-search";
import { wb } from "@/lib/projects";
import { ACCENTS } from "@/lib/theme";
import { SheetHeader } from "./chrome";
import { TopBarButton } from "./TopBar";

/**
 * 전역 프롬프트 검색(⌘K).
 *
 * 팔레트는 루트 레이아웃에 **한 번만** 붙는다 — 덱·실습 셸에서도 단축키가 살아 있어야 한다.
 * 상단 바의 버튼은 이벤트로만 말을 걸어, 컨텍스트 프로바이더가 레이아웃을 감싸지 않게 한다.
 *
 * 검색 인덱스(`lab-search`)는 프롬프트 본문 전체를 담아 수십 KB다.
 * 모든 페이지 번들에 실리지 않도록 **처음 열 때 동적으로** 불러온다.
 */
const OPEN_EVENT = "ax:search-open";

const MAX_RESULTS = 8;

type SearchModule = typeof import("@/lib/lab-search");

/* ─────────────── 상단 바 버튼 ─────────────── */

export function SearchButton() {
  const [mac, setMac] = useState(false);

  // 서버는 "Ctrl K" 로 그리고, 맥에서만 마운트 뒤 바꾼다 (하이드레이션 불일치 방지)
  useEffect(() => {
    setMac(/mac/i.test(navigator.platform || navigator.userAgent));
  }, []);

  return (
    <TopBarButton
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      title="프롬프트 검색"
    >
      <span aria-hidden>⌕</span>
      <span className="hidden sm:inline">검색</span>
      <kbd className="hidden rounded border border-line bg-surface-mist px-1.5 py-px font-sans text-[10.5px] font-bold text-brand-faint md:inline">
        {mac ? "⌘K" : "Ctrl K"}
      </kbd>
    </TopBarButton>
  );
}

/* ─────────────── 팔레트 ─────────────── */

export function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const [mod, setMod] = useState<SearchModule | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const show = useCallback(() => {
    setOpen(true);
    setSel(0);
  }, []);

  /* ⌘K · Ctrl+K — 입력 중이든 아니든 언제나 연다 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [show]);

  /* 인덱스는 처음 열 때 한 번만 받아온다 */
  useEffect(() => {
    if (!open || mod) return;
    let alive = true;
    import("@/lib/lab-search").then((m) => alive && setMod(m));
    return () => {
      alive = false;
    };
  }, [open, mod]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, mod]);

  if (!open) return null;

  const results = mod
    ? mod.searchPrompts({ query }).slice(0, MAX_RESULTS)
    : [];

  const go = (e: PromptEntry) => {
    setOpen(false);
    router.push(e.href);
  };

  const onKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === "Escape") {
      ev.preventDefault();
      setOpen(false);
    } else if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setSel((i) => Math.min(results.length - 1, i + 1));
    } else if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setSel((i) => Math.max(0, i - 1));
    } else if (ev.key === "Enter" && results[sel]) {
      ev.preventDefault();
      go(results[sel]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="프롬프트 검색"
      className="fixed inset-0 z-modal flex items-start justify-center p-5 pt-[12vh]"
      onKeyDown={onKeyDown}
    >
      <div onClick={() => setOpen(false)} className="absolute inset-0 bg-[rgba(15,20,30,0.45)]" />

      <div className="relative w-full max-w-[620px] overflow-hidden rounded-2xl bg-surface-card shadow-float">
        <SheetHeader
          title="프롬프트 검색"
          sub="제목 · 목표 · 프롬프트 본문에서 찾습니다"
          onClose={() => setOpen(false)}
        />

        <div className="border-b border-line px-4 py-3">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(ev) => {
              setQuery(ev.target.value);
              setSel(0);
            }}
            placeholder="리텐션, 카피, 레드팀, 예산 재배분 …"
            className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:font-medium placeholder:text-brand-faint"
          />
        </div>

        <div className="max-h-[46vh] overflow-y-auto px-2 py-2">
          {!mod ? (
            <p className="px-3 py-6 text-center text-[13px] font-semibold text-brand-faint">
              불러오는 중…
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-[13px] font-semibold text-brand-faint">
              {query.trim() ? "결과가 없습니다" : "검색어를 입력하세요"}
            </p>
          ) : (
            results.map((e, i) => {
              const a = ACCENTS[e.accent];
              return (
                <button
                  key={e.key}
                  type="button"
                  onClick={() => go(e)}
                  onMouseEnter={() => setSel(i)}
                  aria-current={i === sel ? "true" : undefined}
                  className={`flex w-full items-start gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    i === sel ? "bg-surface-mist" : ""
                  }`}
                >
                  <span
                    className="mt-px flex-none rounded px-1.5 py-0.5 font-display text-[10.5px] font-bold"
                    style={{ background: a.soft, color: a.deep }}
                  >
                    {e.labId}
                  </span>
                  <span className="min-w-0 flex-1">
                    <b className="block truncate text-[13.5px] font-extrabold">{e.labTitle}</b>
                    <span className="mt-0.5 block truncate text-[11.5px] text-brand-faint">
                      {query.trim() ? mod.snippetOf(mod.resolvedText(e), query, 90) : e.goal}
                    </span>
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5">
          <span className="text-[11px] font-semibold text-brand-faint">
            ↑ ↓ 이동 · Enter 열기 · Esc 닫기
          </span>
          <Link
            href={wb("/library")}
            onClick={() => setOpen(false)}
            className="text-[12px] font-bold text-brand-violet transition-transform hover:translate-x-0.5"
          >
            전체 라이브러리 →
          </Link>
        </div>
      </div>
    </div>
  );
}
