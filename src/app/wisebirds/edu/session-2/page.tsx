import type { Metadata } from "next";
import { Session2Deck } from "@/components/slides/session-2";
import { S2_META } from "@/lib/session2-data";

export const metadata: Metadata = {
  title: `2회차 · ${S2_META.title}`,
  description:
    "Wisebirds-AX 사내 교육 2회차 — 깃허브 복습, API 활용 순서, MCP 연결과 활용, 로컬 · Vercel 키값 관리.",
};

export default function Session2Page() {
  return <Session2Deck />;
}
