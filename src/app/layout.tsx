import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wisebirds-ax-edu.vercel.app"),
  title: {
    default: "Wisebirds-AX · 광고 실무를 AI로 다시 설계한다",
    template: "%s | Wisebirds-AX",
  },
  description:
    "Wisebirds-AX — 사내 교육과 AI 프롬프트 실습. 회차별 교육 자료와 광고 실무용 실습 프롬프트를 한곳에서.",
  openGraph: {
    type: "website",
    siteName: "Wisebirds-AX",
    locale: "ko_KR",
    title: "Wisebirds-AX · 광고 실무를 AI로 다시 설계한다",
    description: "사내 교육과 AI 프롬프트 실습을 한곳에서.",
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Wisebirds-AX — 광고 실무를 AI로 다시 설계한다",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F4F4F7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* ⌘K 팔레트는 여기가 아니라 프로젝트 레이아웃(`wisebirds/layout.tsx`)에 붙는다 —
          공개 포털·게이트 화면에 잠근 프롬프트 인덱스가 실리면 안 된다 */}
      <body>{children}</body>
    </html>
  );
}
