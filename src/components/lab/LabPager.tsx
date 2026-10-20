"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FLAT_LABS, labHref, labIndex } from "@/lib/lab-data";

const href = (id: string) => labHref(`/${id}`);

/** 실습 하단 이전/다음 — ← → 키로도 이동한다. */
export function LabPager({ labId }: { labId: string }) {
  const router = useRouter();
  const i = labIndex(labId);
  const prev = i > 0 ? FLAT_LABS[i - 1] : null;
  const next = i < FLAT_LABS.length - 1 ? FLAT_LABS[i + 1] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      // 입력 중에는 방향키를 가로채지 않는다
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) {
        return;
      }
      if (e.key === "ArrowLeft" && prev) router.push(href(prev.id));
      if (e.key === "ArrowRight" && next) router.push(href(next.id));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  // min-w-0 — 자식의 truncate 만으로는 부족하다. flex item 기본 min-width:auto 라
  // 이게 없으면 셀이 실습 제목 길이만큼 벌어져 좁은 폭에서 가로로 넘친다 (HSAD 페이저와 같은 함정)
  const cell =
    "flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-line bg-white px-4 py-2.5 transition-colors hover:border-brand-violet/45";

  return (
    <div className="flex flex-none items-stretch gap-2.5 pb-4 pt-3">
      {prev ? (
        <Link href={href(prev.id)} className={cell}>
          <span aria-hidden className="text-[15px] text-brand-faint">
            ←
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-bold text-brand-faint">
              이전 · Module {prev.mod.num}
            </span>
            <span className="block truncate text-[13px] font-bold text-brand-sub">
              {prev.id} {prev.title}
            </span>
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}

      <span className="flex flex-none flex-col items-center justify-center px-2">
        <b className="font-display text-[13px] font-bold text-brand-ink">
          {i + 1} / {FLAT_LABS.length}
        </b>
        <span className="text-[10.5px] font-semibold text-brand-faint">
          ← → 키로 이동
        </span>
      </span>

      {next ? (
        <Link href={href(next.id)} className={`${cell} justify-end text-right`}>
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-bold text-brand-faint">
              다음 · Module {next.mod.num}
            </span>
            <span className="block truncate text-[13px] font-bold text-brand-sub">
              {next.id} {next.title}
            </span>
          </span>
          <span aria-hidden className="text-[15px] text-brand-faint">
            →
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </div>
  );
}
