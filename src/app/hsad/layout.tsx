import type { Metadata } from "next";

/**
 * HSAD 프로젝트 셸.
 *
 * 지금 들어 있는 것은 **AI 솔루션 공동 개발 기획서**다. 콘텐츠는 전부
 * [hsad-data.ts](../../lib/hsad-data.ts) 에서 오고, 페이지는 그걸 그리기만 한다.
 * 라우트는 반드시 이 접두사 아래에 둔다 — 그래야 게이트 범위에 들어온다.
 *
 * ⌘K 팔레트는 붙이지 않는다 — 검색 인덱스가 와이즈버즈 실습 콘텐츠라
 * 여기서 부르면 잠근 내용이 이 프로젝트 번들로 새어 나간다
 * (`PROJECTS.hsad.hasPromptSearch = false` 와 같은 이유).
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HsadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
