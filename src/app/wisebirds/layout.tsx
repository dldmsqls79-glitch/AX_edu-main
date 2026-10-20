import type { Metadata } from "next";
import { SearchPalette } from "@/components/site/SearchPalette";

/**
 * 와이즈버즈 프로젝트 셸.
 *
 * ⌘K 팔레트는 **프로젝트 루트에 한 번만** 붙는다 — 이 아래 덱·실습 셸에서도 단축키가 살아 있어야 한다.
 * 루트 레이아웃(`src/app/layout.tsx`)에 두면 공개 포털·게이트 화면에도 실려
 * 잠근 프롬프트 인덱스가 번들로 새어 나간다.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function WisebirdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SearchPalette />
    </>
  );
}
