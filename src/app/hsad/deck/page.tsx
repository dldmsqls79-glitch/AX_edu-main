import type { Metadata } from "next";
import { Deck } from "@/components/Deck";
import { HSAD_DECK_SLIDES } from "@/components/slides/hsad-plan";
import { HSAD_META, hs } from "@/lib/hsad-data";
import { IDEA_STATS } from "@/lib/hsad-ideas-data";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "프레젠테이션",
  description:
    `${HSAD_META.subtitle} — 기획서와 개발 기획을 한 벌로 합친 발표 자료. ` +
    `기능 체계 · R-PES · 아이디어 ${IDEA_STATS.ideas}건과 우선순위 체크.`,
};

export default function HsadDeckPage() {
  return (
    <Deck
      slides={HSAD_DECK_SLIDES}
      badge={PROJECTS.hsad.badge}
      backHref={hs()}
      backLabel="기획서"
      eyebrow={HSAD_META.title}
      chip="프레젠테이션"
    />
  );
}
