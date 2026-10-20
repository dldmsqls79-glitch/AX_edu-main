import type { Metadata } from "next";
import { DevOnboardingDeck } from "@/components/slides/dev-onboarding";

export const metadata: Metadata = {
  title: "1회차 · 개발 인프라 구축 가이드",
  description:
    "처음부터 따라 하는 개발 환경 세팅 — Node.js · VS Code · Claude Code · GitHub · Vercel 배포까지. Windows · macOS 모두 지원.",
};

export default function DevOnboardingPage() {
  return <DevOnboardingDeck />;
}
