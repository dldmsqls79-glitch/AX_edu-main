"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/** 한글·한자·가나는 모노스페이스에서 라틴 문자의 2배 폭을 차지한다 */
const CJK = /[ᄀ-ᇿ぀-ヿ㄰-㆏一-鿿가-힯＀-｠]/;
const visualWidth = (s: string) =>
  [...s].reduce((n, c) => n + (CJK.test(c) ? 2 : 1), 0);

/**
 * 프롬프트 본문 안에 박히는 콤보 입력.
 *
 * 브라우저 기본 datalist는 값이 채워져 있으면 그 값과 일치하는 항목만 보여주므로 직접 만든다.
 * 목록에 없는 값을 입력해도 그대로 프롬프트에 반영된다.
 */
export function Combo({
  value,
  options,
  hint,
  accent,
  onChange,
}: {
  value: string;
  options: string[];
  hint?: string;
  accent: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(-1);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  // 입력값이 목록에 있는 값이면(클릭해서 열었을 때) 전체를 보여준다
  const list =
    !value || options.includes(value)
      ? options
      : options.filter((o) => o.toLowerCase().includes(value.toLowerCase()));

  const place = useCallback(() => {
    const el = inputRef.current;
    const dd = listRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const h = dd?.offsetHeight ?? 200;
    const w = dd?.offsetWidth ?? 240;
    const below = window.innerHeight - r.bottom;
    setPos({
      left: Math.max(8, Math.min(r.left, window.innerWidth - w - 12)),
      // 아래 공간이 좁으면 위로 펼친다
      top: below < h + 16 && r.top > below ? Math.max(8, r.top - h - 5) : r.bottom + 5,
    });
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place, list.length]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => place();
    const onResize = () => setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (
        e.target !== inputRef.current &&
        !listRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, place]);

  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
    setSel(-1);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!list.length) return;
      const base = sel < 0 ? list.indexOf(value) : sel;
      const next =
        e.key === "ArrowDown"
          ? Math.min(list.length - 1, base + 1)
          : Math.max(0, base < 0 ? 0 : base - 1);
      setSel(next);
    } else if (e.key === "Enter") {
      if (sel >= 0 && list[sel]) {
        e.preventDefault();
        pick(list[sel]);
      } else {
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setSel(-1);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        value={value}
        title={hint}
        aria-label={hint}
        spellCheck={false}
        onChange={(e) => {
          onChange(e.target.value);
          setSel(-1);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="mx-[1px] rounded-[5px] border-b-2 bg-white/10 px-1.5 py-[1px] font-mono text-[inherit] font-semibold outline-none transition-colors focus:bg-white/20"
        style={{
          color: "#fff",
          borderBottomColor: accent,
          width: `${Math.max(6, visualWidth(value) + 1.5)}ch`,
        }}
      />
      {open && pos && (
        <div
          ref={listRef}
          role="listbox"
          className="fixed z-pop max-h-[210px] w-[min(280px,86vw)] overflow-y-auto rounded-xl border border-line bg-white py-1 shadow-float"
          style={{ left: pos.left, top: pos.top }}
        >
          {list.length ? (
            list.map((o, i) => {
              const on = i === sel || (sel < 0 && o === value);
              return (
                <div
                  key={o}
                  role="option"
                  aria-selected={on}
                  // blur보다 먼저 잡는다
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(o);
                  }}
                  onMouseEnter={() => setSel(i)}
                  className={`cursor-pointer px-3 py-1.5 text-[13px] font-semibold ${
                    on ? "bg-brand-violet/10" : "text-brand-sub"
                  }`}
                  style={on ? { color: accent } : undefined}
                >
                  {o}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-[12px] text-brand-mut">
              목록에 없음 — 입력한 값이 그대로 쓰입니다
            </div>
          )}
        </div>
      )}
    </>
  );
}
