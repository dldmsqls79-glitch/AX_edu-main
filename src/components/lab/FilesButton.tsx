"use client";

import { useEffect, useState } from "react";
import { SheetHeader } from "@/components/site/chrome";
import type { LabFile } from "@/lib/lab-data";
import { moduleZip } from "@/lib/lab-data";

const extOf = (n: string) => (n.split(".").pop() || "").toLowerCase();

const EXT_COLOR: Record<string, string> = {
  csv: "#16a34a",
  xlsx: "#16a34a",
  md: "#2563eb",
  txt: "#64748b",
  pdf: "#dc2626",
  docx: "#1d4ed8",
  zip: "#d97706",
};

/** 첨부파일 버튼 + 팝업. 프롬프트를 넣기 전에 AI에 먼저 업로드하는 파일들. */
export function FilesButton({
  files,
  labId,
  labTitle,
  moduleNum,
  accent,
}: {
  files: LabFile[];
  labId: string;
  labTitle: string;
  moduleNum: number;
  accent: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  if (!files.length) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex flex-none items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-bold transition-colors"
        style={{ borderColor: `${accent}55`, color: accent, background: `${accent}12` }}
      >
        📎 실습 파일
        <span className="rounded-full bg-white px-1.5 text-[11px] font-extrabold">
          {files.length}
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="실습 파일"
          className="fixed inset-0 z-modal flex items-center justify-center p-5"
        >
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[rgba(15,20,30,0.45)]"
          />
          <div className="relative w-full max-w-[520px] overflow-hidden rounded-2xl bg-surface-card shadow-float">
            {/* 시트 헤더는 실습 목차 드로어와 같은 컴포넌트를 쓴다 */}
            <SheetHeader
              title="실습 파일"
              sub={`실습 ${labId}. ${labTitle} — 프롬프트를 넣기 전에 AI에 먼저 업로드하세요`}
              onClose={() => setOpen(false)}
            />

            <ul className="max-h-[45vh] overflow-y-auto px-3 py-2.5">
              {files.map((file) => {
                const ext = extOf(file.name);
                return (
                  <li key={file.path}>
                    <a
                      href={encodeURI(file.path)}
                      download
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-surface-mist"
                    >
                      <span
                        className="flex-none rounded-md px-1.5 py-0.5 font-display text-[10px] font-bold text-white"
                        style={{ background: EXT_COLOR[ext] ?? "#64748b" }}
                      >
                        {ext.toUpperCase()}
                      </span>
                      <span className="flex-1 break-all text-[13px] font-semibold text-brand-sub">
                        {file.name}
                      </span>
                      <span className="flex-none text-[11.5px] font-bold text-brand-faint">
                        다운로드
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line px-5 py-3.5">
              <a
                href={encodeURI(moduleZip(moduleNum))}
                download
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: accent }}
              >
                ⬇ Module {moduleNum} 실습 파일 전체 ZIP
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
