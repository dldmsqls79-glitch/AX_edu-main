"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, RefreshCw, Smartphone } from "lucide-react";
import {
  BlobBg,
  Bullet,
  Frame,
  IconChip,
  Reveal,
  SlideHead,
} from "../slide-kit";
import type { Accent } from "@/lib/theme";
import { ACCENTS } from "@/lib/theme";

/* ---------------------------- 핵심 요약 ---------------------------- */
const SUMMARY: {
  tag: string;
  accent: Accent;
  icon: React.ReactNode;
  title: string;
  points: string[];
}[] = [
  {
    tag: "A",
    accent: "violet",
    icon: <RefreshCw className="h-5 w-5" />,
    title: "앱 리타겟팅",
    points: [
      "앱 유지 → Re-engagement, 삭제 후 재설치 → Re-attribution",
      "Inactivity·Re-engagement·Re-attribution 윈도우가 핵심 설정",
      "이중 귀속·오가닉 잠식 → Incrementality로 검증",
    ],
  },
  {
    tag: "B",
    accent: "blue",
    icon: <Smartphone className="h-5 w-5" />,
    title: "iOS SKAN",
    points: [
      "ATT·IDFA 제약에서 태어난 프라이버시 중심 집계 측정",
      "Conversion Value(fine/coarse)와 다중 포스트백",
      "지연·집계·null — 리포트는 '다르게' 읽어야 한다",
    ],
  },
  {
    tag: "C",
    accent: "teal",
    icon: <Globe className="h-5 w-5" />,
    title: "웹투앱 · 앱투웹",
    points: [
      "Deferred Deep Link가 설치 경계 너머로 맥락을 보존",
      "OneLink로 상황별 라우팅을 표준화",
      "OneLink·PBA·CUID로 경계를 넘는 측정 연속성",
    ],
  },
];

export function SummarySlide() {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="WRAP-UP · 핵심 요약"
        title="중급편 정리 : 광고 방식의"
        accentWord="확장"
        sub="측정을 이해하는 단계를 넘어, 세 가지 축으로 앱 광고의 범위를 넓혔습니다."
        accent="navy"
      />

      {/* 확장의 세 축 — 링크 밴드 */}
      <Reveal delay={0.16}>
        <div className="mx-auto mt-7 flex max-w-2xl items-center justify-center gap-3">
          {SUMMARY.map((s, i) => {
            const ac = ACCENTS[s.accent];
            return (
              <div key={s.tag} className="flex items-center gap-3">
                <span
                  className="flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-bold text-white shadow-sm"
                  style={{ backgroundImage: ac.gradCss }}
                >
                  <span className="opacity-80">{s.tag}</span>
                  {s.title}
                </span>
                {i < SUMMARY.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-brand-faint" />
                )}
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* 3-축 takeaway 카드 */}
      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
        {SUMMARY.map((s, i) => {
          const ac = ACCENTS[s.accent];
          return (
            <Reveal key={s.tag} delay={0.2 + i * 0.1}>
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card"
                style={{ borderTop: `4px solid ${ac.main}` }}
              >
                <div className="flex items-center gap-3 p-5 pb-4">
                  <IconChip accent={s.accent}>{s.icon}</IconChip>
                  <div className="text-[17px] font-extrabold text-brand-ink">
                    <span style={{ color: ac.main }}>{s.tag}.</span> {s.title}
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5 border-t border-line p-5 pt-4">
                  {s.points.map((p) => (
                    <Bullet key={p} accent={s.accent}>
                      {p}
                    </Bullet>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Frame>
  );
}

/* ---------------------------- Q&A / Closing ---------------------------- */
export function QnaSlide() {
  const a = ACCENTS.navy;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center">
      <BlobBg accent="navy" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-8">
        <Reveal>
          <div className="font-display text-[13px] font-bold tracking-[0.16em] text-brand-sub">
            W-INSIGHT 앱 광고 교육 · 중급편
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="mt-4 font-display font-extrabold leading-none tracking-[-0.04em]"
            style={{
              fontSize: "clamp(80px,13vw,150px)",
              backgroundImage: a.gradCss,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Q&amp;A
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-5 max-w-lg text-[16px] font-medium leading-relaxed text-brand-sub md:text-[18px]">
            질문을 환영합니다. 다음 시간{" "}
            <b className="text-brand-indigo">응용편</b>에서는 앱 캠페인 분석
            예시와 광고 운영 TIP으로 이어집니다.
          </p>
        </Reveal>

        {/* 응용편 예고 칩 */}
        <Reveal delay={0.28}>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {["앱 캠페인 분석 예시", "광고 운영 TIP"].map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-semibold shadow-sm"
                style={{ borderColor: `${a.main}30`, background: a.soft, color: a.deep }}
              >
                <motion.span
                  className="h-2 w-2 rounded-full"
                  style={{ background: a.main }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.38}>
          <div className="mt-9 text-[13px] font-semibold text-brand-faint">
            © 2026 Wisebirds Inc. · AD-TECH · NO.1 Digital Marketing Agency
          </div>
        </Reveal>
      </div>
    </div>
  );
}
