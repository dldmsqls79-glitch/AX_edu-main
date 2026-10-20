import type { Metadata } from "next";
import { LabShell } from "@/components/lab/LabShell";

export const metadata: Metadata = {
  // 문자열 title만 두면 하위 세그먼트에 루트 template이 적용되지 않으므로 여기서 다시 선언한다
  title: {
    default: "예시 · AI 프롬프트 실습",
    template: "%s | 예시 · Wisebirds-AX",
  },
  description:
    "와이즈버즈 광고 실무를 위한 생성형 AI 프롬프트 실습 — 카피 제작, 리포팅 자동화, 데이터 분석, 제안까지.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <LabShell>{children}</LabShell>;
}
