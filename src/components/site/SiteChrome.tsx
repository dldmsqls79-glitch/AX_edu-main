import { Mail, Phone, User } from "lucide-react";
import { WisebirdsLogo } from "@/components/Logo";
import { navOf, PROJECTS, type ProjectId } from "@/lib/projects";
import { ChromeDivider } from "./chrome";
import { SearchButton } from "./SearchPalette";
import { TopBar, TopBarNav } from "./TopBar";

/**
 * 문서 스크롤 페이지의 상단 바.
 * 실제 바는 TopBar 하나뿐이고, 여기서는 그 페이지의 프로젝트·자료명만 넘긴다.
 *
 * 네비와 배지는 [projects.ts](../../lib/projects.ts) 에서 파생된다 —
 * 여기에 항목을 손으로 적지 않는다. `project` 를 비우면 포털·게이트용 민바(로고만)가 된다.
 */
export function SiteHeader({
  project,
  label,
  labelHref,
  chip,
  mode = "document",
}: {
  /** 지금 들어와 있는 프로젝트. 포털·게이트처럼 프로젝트 밖 화면은 넘기지 않는다 */
  project?: ProjectId;
  label?: string;
  labelHref?: string;
  chip?: string;
  /** 한 화면에 고정되는 `fixed inset-0 flex flex-col` 셸이면 "shell" (TopBar 문서 참고) */
  mode?: "document" | "shell";
}) {
  const nav = project ? navOf(project) : [];

  return (
    <TopBar
      mode={mode}
      badge={project ? PROJECTS[project].badge : undefined}
      label={label}
      labelHref={labelHref}
      chip={chip}
    >
      {nav.length > 0 && (
        <>
          <TopBarNav items={nav} />
          <ChromeDivider className="hidden md:block" />
        </>
      )}
      {/* 검색 버튼도 TopBarButton 하나 — 바에 새 모양을 만들지 않는다 */}
      {project && PROJECTS[project].hasPromptSearch && <SearchButton />}
    </TopBar>
  );
}

export function SiteFooter() {
  return (
    /* flex-none — 셸(포털·게이트) 안에서 본문에 눌려 찌그러지지 않게. 문서 페이지에선 무해하다 */
    <footer className="flex-none border-t border-line bg-surface-sunken">
      <div className="mx-auto flex max-w-page flex-wrap items-end justify-between gap-4 px-6 py-8">
        <div>
          {/* 상단 바와 같은 락업 높이 — 브랜드 크기가 크롬마다 달라지지 않게 한다 */}
          <WisebirdsLogo />
          <p className="mt-3 text-[12px] text-brand-faint">
            © {new Date().getFullYear()} Wisebirds Inc. All Rights Reserved.
          </p>
        </div>

        {/* 담당자 · 메일 · 번호 — 라벨 대신 아이콘으로 표기 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-semibold text-brand-mut">
          <span className="inline-flex items-center gap-1.5" title="담당자">
            <User size={14} strokeWidth={2.2} className="text-brand-faint" aria-label="담당자" />
            남철구
          </span>

          <ChromeDivider className="hidden sm:block" />

          <a
            href="mailto:cheolgu.nam@wisebirds.com"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-violet"
            title="메일"
          >
            <Mail size={14} strokeWidth={2.2} className="text-brand-faint" aria-label="메일" />
            cheolgu.nam@wisebirds.com
          </a>

          <ChromeDivider className="hidden sm:block" />

          <a
            href="tel:+821089639311"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-violet"
            title="번호"
          >
            <Phone size={14} strokeWidth={2.2} className="text-brand-faint" aria-label="번호" />
            010-8963-9311
          </a>
        </div>
      </div>
    </footer>
  );
}
