"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Database,
  GitCompare,
  Globe,
  RefreshCw,
  Smartphone,
  Sparkles,
} from "lucide-react";
import {
  BlobBg,
  Bullet,
  Card,
  Frame,
  IconChip,
  Kicker,
  Reveal,
  SlideHead,
} from "../slide-kit";
import type { Accent } from "@/lib/theme";
import { ACCENTS } from "@/lib/theme";

/* ============================== COVER ============================== */
const PREVIEW: { tag: string; accent: Accent; icon: React.ReactNode; t: string; d: string }[] = [
  { tag: "A", accent: "violet", icon: <RefreshCw className="h-5 w-5" />, t: "앱 리타겟팅", d: "기준에 따라 다른 재참여 전략" },
  { tag: "B", accent: "blue", icon: <Smartphone className="h-5 w-5" />, t: "iOS SKAN", d: "프라이버시 시대의 집계 측정" },
  { tag: "C", accent: "teal", icon: <Globe className="h-5 w-5" />, t: "웹투앱 · 앱투웹", d: "경계를 넘는 딥링크 · 측정" },
];

export function CoverSlide() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <BlobBg accent="violet" />
      <Frame w={1240} className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* left — hero copy */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-violet/25 bg-brand-violet/5 px-4 py-1.5 font-display text-[12px] font-bold tracking-[0.14em] text-brand-violet">
                <Sparkles className="h-3.5 w-3.5" /> W-INSIGHT · INTERMEDIATE
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 text-[40px] font-extrabold leading-[1.08] tracking-[-0.035em] text-brand-ink md:text-[54px]">
                Wisebirds 앱 광고 교육
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-1 flex flex-wrap items-end gap-x-4 gap-y-1">
                <span className="text-grad-violet text-[48px] font-extrabold leading-none md:text-[68px]">
                  중급편
                </span>
                <span className="mb-2 text-[18px] font-semibold text-brand-sub md:text-[20px]">
                  앱 광고 방식의 확장
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-6 max-w-xl text-[16px] font-medium leading-relaxed text-brand-sub md:text-[17px]">
                기초편에서 배운 측정의 원리를 실제 광고 확장 전략으로 잇습니다.
                리타겟팅 · SKAN · 웹앱 연결까지 —{" "}
                <b className="text-brand-violet">세 가지 축</b>으로 앱 광고의
                범위를 넓힙니다.
              </p>
            </Reveal>
            <Reveal delay={0.36}>
              <div className="mt-8 flex items-center gap-3 text-[13px] font-semibold text-brand-mut">
                <span className="rounded-full border border-brand-violet/30 px-3 py-1 text-brand-violetDeep">
                  ACD4-T1
                </span>
                <span>AD-TECH · NO.1 Digital Marketing Agency</span>
              </div>
            </Reveal>
          </div>

          {/* right — agenda preview stack */}
          <div className="flex flex-col gap-3.5">
            {PREVIEW.map((p, i) => {
              const a = ACCENTS[p.accent];
              return (
                <motion.div
                  key={p.tag}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-white/90 p-4 shadow-card backdrop-blur"
                  style={{ borderLeft: `4px solid ${a.main}` }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-[20px] font-extrabold text-white"
                    style={{ backgroundImage: a.gradCss }}
                  >
                    {p.tag}
                  </span>
                  <div className="flex-1">
                    <div className="text-[16px] font-extrabold text-brand-ink">
                      {p.t}
                    </div>
                    <div className="text-[13px] text-brand-mut">{p.d}</div>
                  </div>
                  <span style={{ color: a.main }}>{p.icon}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ============================== RECAP ============================== */
const RECAP = [
  {
    icon: <Database className="h-5 w-5" />,
    title: "MMP & SDK",
    desc: "측정의 재료 — MMP(측정 파트너)와 SDK로 앱 성과를 수집·통합한다.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Tracking Flow & 기여",
    desc: "노출→클릭→설치→실행, Last Click Attribution과 SAN·View-through.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "리포팅 KPI",
    desc: "Install vs 인앱 이벤트, Unique & Count, Actual & Cohort, Retention.",
  },
  {
    icon: <GitCompare className="h-5 w-5" />,
    title: "웹 vs 앱",
    desc: "쿠키·세션 기반의 웹, SDK/MMP 기반의 앱 — 측정 방식의 차이.",
  },
];

export function RecapSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="RECAP · 기초편 복습"
        title="기초편에서 우리는 무엇을 배웠나"
        sub="중급편은 이 측정의 토대 위에서 '광고 방식의 확장'을 다룹니다."
        accent="navy"
      />

      {/* 기초 → 중급 bridge */}
      <Reveal delay={0.16}>
        <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-4">
          <span className="rounded-full bg-brand-ink/5 px-5 py-2 text-[14px] font-bold text-brand-sub">
            기초편 · 측정의 이해
          </span>
          <ArrowRight className="h-5 w-5 text-brand-violet" />
          <span className="rounded-full bg-grad-violet px-5 py-2 text-[14px] font-bold text-white shadow-glowViolet">
            중급편 · 광고의 확장
          </span>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {RECAP.map((r, i) => (
          <Reveal key={r.title} delay={0.2 + i * 0.08}>
            <Card accent="navy" className="flex h-full items-start gap-4">
              <IconChip accent="navy">{r.icon}</IconChip>
              <div>
                <div className="text-[15.5px] font-extrabold text-brand-ink">
                  {r.title}
                </div>
                <p className="mt-1 text-[13.5px] leading-relaxed text-brand-mut">
                  {r.desc}
                </p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* ============================== GOAL / AGENDA ============================== */
const AGENDA: {
  tag: string;
  accent: Accent;
  icon: React.ReactNode;
  title: string;
  sub: string;
  points: string[];
}[] = [
  {
    tag: "A",
    accent: "violet",
    icon: <RefreshCw className="h-6 w-6" />,
    title: "앱 리타겟팅",
    sub: "기준에 따라 다른 리타겟팅",
    points: ["Re-engagement vs Re-attribution", "MMP 핵심 설정 (Appsflyer)", "iOS 제약과 측정 함정"],
  },
  {
    tag: "B",
    accent: "blue",
    icon: <Smartphone className="h-6 w-6" />,
    title: "iOS의 SKAN",
    sub: "어디서부터 봐야 할지 모르겠는",
    points: ["왜 SKAN인가 (ATT·IDFA)", "Conversion Value & 포스트백", "설정과 리포팅의 한계"],
  },
  {
    tag: "C",
    accent: "teal",
    icon: <Globe className="h-6 w-6" />,
    title: "웹투앱 · 앱투웹",
    sub: "사례는 잘 없지만 알아야 하는",
    points: ["딥링크와 Deferred Deep Link", "OneLink 라우팅", "경계를 넘는 측정 연속성"],
  },
];

export function GoalSlide() {
  return (
    <Frame w={1240}>
      <div className="text-center">
        <Reveal>
          <Kicker accent="navy">중급편 AGENDA</Kicker>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-2.5 text-[28px] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink md:text-[38px]">
            목표 : 앱 광고 <span className="text-grad-violet">방식의 확장</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] font-medium text-brand-sub md:text-[17px]">
            측정을 &lsquo;이해&rsquo;하는 단계에서, 광고를 &lsquo;확장&rsquo;하는
            단계로. 세 가지 축으로 앱 광고의 범위를 넓힙니다.
          </p>
        </Reveal>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
        {AGENDA.map((a, i) => {
          const ac = ACCENTS[a.accent];
          return (
            <Reveal key={a.tag} delay={0.14 + i * 0.1}>
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card"
                style={{ borderTop: `4px solid ${ac.main}` }}
              >
                <div className="flex items-center gap-3 p-6 pb-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white"
                    style={{ backgroundImage: ac.gradCss }}
                  >
                    {a.icon}
                  </span>
                  <div>
                    <div className="text-[12px] font-semibold text-brand-faint">
                      {a.sub}
                    </div>
                    <div className="text-[19px] font-extrabold text-brand-ink">
                      <span style={{ color: ac.main }}>{a.tag}.</span> {a.title}
                    </div>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5 border-t border-line p-6 pt-5">
                  {a.points.map((p) => (
                    <Bullet key={p} accent={a.accent}>
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
