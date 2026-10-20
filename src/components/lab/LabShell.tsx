"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SheetHeader } from "@/components/site/chrome";
import { SearchButton } from "@/components/site/SearchPalette";
import { TopBar, TopBarButton } from "@/components/site/TopBar";
import { ACCENTS } from "@/lib/theme";
import { LAB_BASE, MODULES, moduleHasFiles, moduleZip } from "@/lib/lab-data";
import { wb } from "@/lib/projects";

/** 실습 교육 공통 크롬 — 상단 바 + 목차 드로어. 본문 스크롤은 이 안에서만 생긴다. */
export function LabShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 라우트가 바뀌면 목차를 닫는다
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const tail = pathname.startsWith(`${LAB_BASE}/`) ? pathname.slice(LAB_BASE.length + 1) : "";
  const curLab = /^\d+-\d+$/.test(tail) ? tail : "";
  const curMod = tail.match(/^m(\d+)$/)?.[1] ?? "";

  return (
    <div className="fixed inset-0 flex flex-col bg-surface-base font-sans text-brand-ink">
      {/* ── 상단 바 — 사이트 공통 TopBar. 실습은 우측에 목차 버튼만 넣는다 ── */}
      <TopBar
        mode="shell"
        label="AI 프롬프트 실습"
        labelHref={pathname === LAB_BASE ? undefined : LAB_BASE}
        chip="예시"
        back={{ href: wb("/edu"), label: "교육 목록" }}
      >
        {/* 실습 도중 다른 프롬프트를 찾는 일이 잦다 — 검색을 목차 옆에 둔다 */}
        <SearchButton />
        <TopBarButton
          active={open}
          pressed={open}
          onClick={() => setOpen((v) => !v)}
          title="실습 목차 열기"
        >
          <span aria-hidden className="grid gap-[3px]">
            <i className="block h-[1.5px] w-3.5 rounded bg-current" />
            <i className="block h-[1.5px] w-3.5 rounded bg-current" />
            <i className="block h-[1.5px] w-3.5 rounded bg-current" />
          </span>
          <span className="hidden sm:inline">실습 목차</span>
        </TopBarButton>
      </TopBar>

      {/* ── 본문 — 덱·문서 라우트와 같이 main 랜드마크를 갖는다 ── */}
      <main id="lab-view" tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto outline-none">
        {children}
      </main>

      {/* ── 목차 오버레이 ── */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-overlay bg-[rgba(15,20,30,0.4)] transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* 닫힘 상태에서는 inert 로 tab 순서에서 빼야 한다.
          aria-hidden 만으로는 포커스가 화면 밖 링크 36개로 들어간다. */}
      <nav
        aria-label="실습 목차"
        aria-hidden={!open}
        inert={!open}
        /* 상단 바 아래에서 시작한다 — top-0 이면 드로어가 바의 목차 버튼을 덮어 다시 눌러 닫을 수 없다.
           도트 네비(SideNav)가 바를 존중하는 것과 같은 관계로 맞춘다. */
        className={`fixed bottom-0 right-0 top-topbar z-sheet w-[min(400px,90vw)] overflow-y-auto border-l border-line bg-surface-card transition-transform duration-200 ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        {/* 시트 헤더는 파일 모달과 같은 컴포넌트를 쓴다 */}
        <div className="sticky top-0">
          <SheetHeader title="실습 목차" onClose={() => setOpen(false)} />
        </div>

        <div className="px-3 py-3">
          <Link
            href={LAB_BASE}
            className="block rounded-lg px-2.5 py-2 text-[13px] font-bold text-brand-sub transition-colors hover:bg-surface-mist"
          >
            🏠 실습 첫 화면
          </Link>

          {MODULES.map((m) => {
            const a = ACCENTS[m.accent];
            return (
              <div key={m.num} className="mt-3.5 border-t border-line pt-3">
                <div className="flex items-center justify-between gap-2 px-2.5">
                  <Link
                    href={`${LAB_BASE}/m${m.num}`}
                    className="flex items-center gap-2 text-[13px] font-extrabold text-brand-ink transition-colors hover:opacity-70"
                    style={curMod === String(m.num) ? { color: a.deep } : undefined}
                  >
                    <em
                      className="rounded px-1.5 py-0.5 font-display text-[10.5px] font-bold not-italic"
                      style={{ background: a.soft, color: a.deep }}
                    >
                      M{m.num}
                    </em>
                    {m.subject}
                  </Link>
                  {moduleHasFiles(m) && (
                    <a
                      href={encodeURI(moduleZip(m.num))}
                      download
                      className="flex-none text-[11px] font-bold text-brand-mut transition-colors hover:text-brand-violet"
                    >
                      ⬇ ZIP
                    </a>
                  )}
                </div>

                <div className="mt-1">
                  {m.labs.map((l) => {
                    const on = l.id === curLab;
                    return (
                      <Link
                        key={l.id}
                        href={`${LAB_BASE}/${l.id}`}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-[7px] transition-colors hover:bg-surface-mist"
                        style={on ? { background: a.soft } : undefined}
                      >
                        <i
                          className="flex-none font-display text-[11px] font-bold not-italic"
                          style={on ? { color: a.deep } : undefined}
                        >
                          {l.id}
                        </i>
                        <span
                          className="text-[12.5px] font-semibold"
                          style={on ? { color: a.deep } : undefined}
                        >
                          {l.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
