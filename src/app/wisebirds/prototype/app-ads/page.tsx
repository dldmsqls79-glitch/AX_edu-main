import type { Metadata } from "next";
import { Deck, type SlideDef } from "@/components/Deck";
import { PROJECTS, wb } from "@/lib/projects";
import { SectionCover } from "@/components/slide-kit";
import { CoverSlide, RecapSlide, GoalSlide } from "@/components/slides/intro";
import {
  AWhatSlide,
  ATypesSlide,
  AWindowsSlide,
  AHowSlide,
  ASetupSlide,
  AiOSSlide,
  AKpiSlide,
} from "@/components/slides/retargeting";
import {
  BWhySlide,
  BWhatSlide,
  BCvSlide,
  BPostbackSlide,
  BPrivacySlide,
  BSetupSlide,
  BReportSlide,
} from "@/components/slides/skan";
import {
  CConceptSlide,
  CDeepLinkSlide,
  COneLinkSlide,
  CWeb2AppSlide,
  CApp2WebSlide,
  CMeasureSlide,
} from "@/components/slides/web2app";
import { SummarySlide, QnaSlide } from "@/components/slides/closing";

export const metadata: Metadata = {
  title: "앱 광고 교육 중급편 · 교육 사례 프로토타입",
  description:
    "교육 사례 프로토타입 — W-Insight 앱 광고 교육 중급편. 앱 리타겟팅, iOS SKAN, 웹투앱·앱투웹 광고를 웹 프레젠테이션으로 만든 사례.",
};

const SLIDES: SlideDef[] = [
  // ── Intro ──
  { id: "cover", nav: "표지", group: "intro", accent: "navy", node: <CoverSlide /> },
  { id: "recap", nav: "기초편 복습", group: "intro", accent: "navy", node: <RecapSlide /> },
  { id: "goal", nav: "목표 · Agenda", group: "intro", accent: "navy", node: <GoalSlide /> },

  // ── A. 앱 리타겟팅 ──
  {
    id: "a-divider",
    nav: "A. 앱 리타겟팅",
    group: "A",
    accent: "violet",
    node: (
      <SectionCover
        tag="A"
        title="앱 리타겟팅"
        subtitle="이미 확보한 유저의 가치를 다시 끌어올리는 재참여 전략"
        topics={["Re-engagement vs Re-attribution", "MMP 핵심 설정", "iOS 제약과 측정"]}
        accent="violet"
      />
    ),
  },
  { id: "a-what", nav: "리타겟팅이란", group: "A", accent: "violet", node: <AWhatSlide /> },
  { id: "a-types", nav: "재참여 vs 재기여", group: "A", accent: "violet", node: <ATypesSlide /> },
  { id: "a-windows", nav: "세 개의 윈도우", group: "A", accent: "violet", node: <AWindowsSlide /> },
  { id: "a-how", nav: "작동 원리", group: "A", accent: "violet", node: <AHowSlide /> },
  { id: "a-setup", nav: "이중 귀속·오설정", group: "A", accent: "violet", node: <ASetupSlide /> },
  { id: "a-ios", nav: "iOS 리타겟팅", group: "A", accent: "violet", node: <AiOSSlide /> },
  { id: "a-kpi", nav: "KPI·측정", group: "A", accent: "violet", node: <AKpiSlide /> },

  // ── B. iOS SKAN ──
  {
    id: "b-divider",
    nav: "B. iOS SKAN",
    group: "B",
    accent: "blue",
    node: (
      <SectionCover
        tag="B"
        title="iOS의 SKAN"
        subtitle="프라이버시 시대의 집계 기반 측정 — 어디서부터 봐야 할지 모르겠는 SKAN"
        topics={["왜 SKAN인가", "Conversion Value & 포스트백", "설정과 리포팅"]}
        accent="blue"
      />
    ),
  },
  { id: "b-why", nav: "왜 SKAN인가", group: "B", accent: "blue", node: <BWhySlide /> },
  { id: "b-what", nav: "SKAN 구조", group: "B", accent: "blue", node: <BWhatSlide /> },
  { id: "b-cv", nav: "Conversion Value", group: "B", accent: "blue", node: <BCvSlide /> },
  { id: "b-postback", nav: "다중 포스트백", group: "B", accent: "blue", node: <BPostbackSlide /> },
  { id: "b-privacy", nav: "Crowd Anonymity", group: "B", accent: "blue", node: <BPrivacySlide /> },
  { id: "b-setup", nav: "Appsflyer 셋업", group: "B", accent: "blue", node: <BSetupSlide /> },
  { id: "b-report", nav: "리포팅·한계", group: "B", accent: "blue", node: <BReportSlide /> },

  // ── C. 웹투앱 · 앱투웹 ──
  {
    id: "c-divider",
    nav: "C. 웹투앱·앱투웹",
    group: "C",
    accent: "teal",
    node: (
      <SectionCover
        tag="C"
        title="웹투앱 · 앱투웹 광고"
        subtitle="사례는 잘 없지만 알아야 하는, 웹과 앱의 경계를 잇는 광고"
        topics={["딥링크 & Deferred", "OneLink 라우팅", "측정 연속성"]}
        accent="teal"
      />
    ),
  },
  { id: "c-concept", nav: "개념·왜 중요", group: "C", accent: "teal", node: <CConceptSlide /> },
  { id: "c-deeplink", nav: "딥링크 기초", group: "C", accent: "teal", node: <CDeepLinkSlide /> },
  { id: "c-onelink", nav: "OneLink 라우팅", group: "C", accent: "teal", node: <COneLinkSlide /> },
  { id: "c-web2app", nav: "웹투앱 실전", group: "C", accent: "teal", node: <CWeb2AppSlide /> },
  { id: "c-app2web", nav: "앱투웹 실전", group: "C", accent: "teal", node: <CApp2WebSlide /> },
  { id: "c-measure", nav: "측정 연속성", group: "C", accent: "teal", node: <CMeasureSlide /> },

  // ── Wrap-up ──
  { id: "summary", nav: "핵심 요약", group: "close", accent: "navy", node: <SummarySlide /> },
  { id: "qna", nav: "Q&A", group: "close", accent: "navy", node: <QnaSlide /> },
];

export default function AppAdsPrototypePage() {
  return (
    <Deck
      slides={SLIDES}
      badge={PROJECTS.wisebirds.badge}
      backHref={wb("/prototype")}
      backLabel="프로토타입"
      eyebrow="앱 광고 교육 중급편"
      chip="프로토타입"
    />
  );
}
