"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { ACCENTS, type Accent } from "@/lib/theme";

export type { Accent };

/* ================================================================== */
/*  Motion                                                            */
/* ================================================================== */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  Layout & typography                                               */
/* ================================================================== */
export function Frame({
  children,
  w = 1180,
  className = "",
}: {
  children: ReactNode;
  w?: number;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full px-12 ${className}`}
      style={{ maxWidth: w }}
    >
      {children}
    </div>
  );
}

export function Kicker({
  children,
  accent = "violet",
}: {
  children: ReactNode;
  accent?: Accent;
}) {
  return (
    <div
      className="font-display text-[13px] font-bold tracking-[0.14em]"
      style={{ color: ACCENTS[accent].main }}
    >
      {children}
    </div>
  );
}

export function Title({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`ko-head mt-2.5 font-extrabold leading-[1.15] tracking-[-0.03em] text-brand-ink ${className}`}
      style={{ fontSize: "clamp(28px,3.6vw,42px)" }}
    >
      {children}
    </h2>
  );
}

export function Sub({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`ko-body mt-3.5 text-[16px] leading-[1.7] text-brand-sub ${className}`}
      style={{ maxWidth: 820 }}
    >
      {children}
    </p>
  );
}

export function Em({
  children,
  accent = "indigo" as Accent,
}: {
  children: ReactNode;
  accent?: Accent;
}) {
  const color =
    accent === ("indigo" as Accent) ? "#4f46e5" : ACCENTS[accent].deep;
  return (
    <b className="font-bold" style={{ color }}>
      {children}
    </b>
  );
}

export function Mono({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-brand-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-brand-ink">
      {children}
    </code>
  );
}

/** Kicker + Title + Sub composite. */
export function SlideHead({
  kicker,
  title,
  accentWord,
  sub,
  accent = "violet",
  align = "center",
}: {
  kicker: string;
  title: ReactNode;
  accentWord?: string;
  sub?: ReactNode;
  accent?: Accent;
  align?: "center" | "left";
}) {
  const gradClass =
    accent === "blue"
      ? "text-grad-blue"
      : accent === "teal"
        ? "text-grad-teal"
        : "text-grad-violet";
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <Reveal>
        <Kicker accent={accent}>{kicker}</Kicker>
      </Reveal>
      <Reveal delay={0.06}>
        <Title>
          {title}
          {accentWord && <span className={gradClass}> {accentWord}</span>}
        </Title>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p
            className={`ko-body mt-3.5 text-[16px] leading-[1.7] text-brand-sub ${
              align === "center" ? "mx-auto" : ""
            }`}
            style={{ maxWidth: 820 }}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Cards, chips, lists                                               */
/* ================================================================== */
export function Card({
  children,
  title,
  icon,
  accent = "violet",
  topBorder = true,
  className = "",
  style,
}: {
  children: ReactNode;
  title?: ReactNode;
  icon?: ReactNode;
  accent?: Accent;
  topBorder?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const a = ACCENTS[accent];
  return (
    <div
      className={`rounded-2xl border border-line bg-white p-5 shadow-card ${className}`}
      style={{ borderTop: topBorder ? `3px solid ${a.main}` : undefined, ...style }}
    >
      {(title || icon) && (
        <div className="mb-2.5 flex items-center gap-2.5">
          {icon && <IconChip accent={accent} size="sm">{icon}</IconChip>}
          {title && (
            <div className="text-[15.5px] font-extrabold text-brand-ink">
              {title}
            </div>
          )}
        </div>
      )}
      <div className="ko-body text-[14px] leading-[1.65] text-brand-sub">{children}</div>
    </div>
  );
}

export function IconChip({
  children,
  accent = "violet",
  size = "md",
}: {
  children: ReactNode;
  accent?: Accent;
  size?: "sm" | "md" | "lg";
}) {
  const a = ACCENTS[accent];
  const s = size === "lg" ? "h-13 w-13" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const px = size === "lg" ? 52 : size === "sm" ? 36 : 44;
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl ${s}`}
      style={{ background: a.soft, color: a.main, width: px, height: px }}
    >
      {children}
    </span>
  );
}

export function Pill({
  children,
  accent = "violet",
  soft = false,
}: {
  children: ReactNode;
  accent?: Accent;
  soft?: boolean;
}) {
  const a = ACCENTS[accent];
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold"
      style={
        soft
          ? { background: a.soft, color: a.deep }
          : { backgroundImage: a.gradCss, color: "#fff" }
      }
    >
      {children}
    </span>
  );
}

export function Steps({
  items,
  accent = "violet",
}: {
  items: { h: ReactNode; d?: ReactNode }[];
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <ol className="flex list-none flex-col gap-3.5 p-0">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3.5">
          <span
            className="mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] font-display text-[14px] font-bold text-white"
            style={{ background: a.main }}
          >
            {i + 1}
          </span>
          <div>
            <div className="text-[16px] font-bold leading-snug text-brand-ink">
              {it.h}
            </div>
            {it.d && (
              <div className="mt-1 text-[13.5px] leading-[1.55] text-brand-mut">
                {it.d}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Bullet({
  children,
  accent = "violet",
  tone = "dot",
}: {
  children: ReactNode;
  accent?: Accent;
  tone?: "dot" | "plus" | "minus";
}) {
  const a = ACCENTS[accent];
  if (tone === "plus" || tone === "minus") {
    const color = tone === "plus" ? "#16a34a" : "#dc2626";
    return (
      <li className="flex items-start gap-2 text-[14px] leading-[1.55] text-brand-sub">
        <span className="font-bold" style={{ color }}>
          {tone === "plus" ? "＋" : "－"}
        </span>
        <span>{children}</span>
      </li>
    );
  }
  return (
    <li className="flex items-start gap-2.5 text-[14.5px] leading-[1.6] text-brand-sub">
      <span
        className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: a.main }}
      />
      <span>{children}</span>
    </li>
  );
}

/* ================================================================== */
/*  Callouts                                                          */
/* ================================================================== */
export function KeyPoint({
  children,
  label = "KEY Point",
  accent = "violet",
}: {
  children: ReactNode;
  label?: string;
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <Reveal>
      <div
        className="flex items-start gap-3 rounded-2xl border px-5 py-4"
        style={{ borderColor: `${a.main}33`, background: a.soft }}
      >
        <span
          className="mt-0.5 shrink-0 rounded-md px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-wide text-white"
          style={{ background: a.main }}
        >
          {label}
        </span>
        <p
          className="text-[14.5px] font-semibold leading-relaxed"
          style={{ color: a.deep }}
        >
          {children}
        </p>
      </div>
    </Reveal>
  );
}

export function Callout({
  children,
  icon,
  accent,
  className = "",
}: {
  children: ReactNode;
  icon?: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  const a = accent ? ACCENTS[accent] : null;
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border px-5 py-4 text-[14px] leading-[1.65] text-brand-sub ${className}`}
      style={
        a
          ? { borderColor: `${a.main}30`, background: a.soft }
          : { borderColor: "rgba(15,23,42,0.09)", background: "#f7f8fc" }
      }
    >
      {icon && (
        <span className="mt-0.5 shrink-0" style={{ color: a?.main ?? "#64748b" }}>
          {icon}
        </span>
      )}
      <div>{children}</div>
    </div>
  );
}

/* ================================================================== */
/*  Compare card (pros / cons)                                        */
/* ================================================================== */
export function CompareCard({
  name,
  tag,
  icon,
  accent = "violet",
  pros = [],
  cons = [],
}: {
  name: ReactNode;
  tag?: ReactNode;
  icon?: ReactNode;
  accent?: Accent;
  pros?: ReactNode[];
  cons?: ReactNode[];
}) {
  const a = ACCENTS[accent];
  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
      style={{ borderTop: `4px solid ${a.main}` }}
    >
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        {icon && <IconChip accent={accent} size="sm">{icon}</IconChip>}
        <div>
          <div className="text-[16px] font-extrabold text-brand-ink">{name}</div>
          {tag && (
            <div className="text-[11.5px] font-bold" style={{ color: a.main }}>
              {tag}
            </div>
          )}
        </div>
      </div>
      <ul className="flex list-none flex-col gap-1.5 p-4">
        {pros.map((p, i) => (
          <Bullet key={`p${i}`} tone="plus">
            {p}
          </Bullet>
        ))}
        {cons.map((c, i) => (
          <Bullet key={`c${i}`} tone="minus">
            {c}
          </Bullet>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================== */
/*  Stats                                                             */
/* ================================================================== */
export function StatBig({
  value,
  label,
  accent = "violet",
}: {
  value: ReactNode;
  label: ReactNode;
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <div className="text-center">
      <div
        className="font-display font-extrabold leading-none"
        style={{ color: a.main, fontSize: "clamp(30px,3.4vw,40px)" }}
      >
        {value}
      </div>
      <div className="mt-2 text-[13px] font-medium text-brand-mut">{label}</div>
    </div>
  );
}

export function StatRow({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-white p-6 shadow-card md:grid-cols-4">
        {children}
      </div>
    </Reveal>
  );
}

/* ================================================================== */
/*  Flow diagram                                                      */
/* ================================================================== */
export function FlowRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-y-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function FlowArrow({
  label,
  accent = "violet",
}: {
  label?: string;
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <div className="mx-1 flex min-w-[54px] flex-col items-center justify-center gap-1">
      {label && (
        <span
          className="whitespace-nowrap rounded-full border bg-white px-2 py-0.5 font-mono text-[10.5px] font-bold"
          style={{ borderColor: a.soft, color: a.deep }}
        >
          {label}
        </span>
      )}
      <svg width="40" height="16" aria-hidden>
        <line
          x1="1"
          y1="8"
          x2="32"
          y2="8"
          stroke={a.main}
          strokeWidth="2.4"
          strokeLinecap="round"
          className="flow-dash"
        />
        <path d="M32 3.5 L40 8 L32 12.5 Z" fill={a.main} />
      </svg>
    </div>
  );
}

/** Circular node for step flows. */
export function FlowNode({
  title,
  desc,
  icon,
  accent = "violet",
  highlight = false,
  index = 0,
}: {
  title: ReactNode;
  desc?: ReactNode;
  icon?: ReactNode;
  accent?: Accent;
  highlight?: boolean;
  index?: number;
}) {
  const a = ACCENTS[accent];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.38, delay: index * 0.07 }}
      className="flex h-[122px] w-[122px] flex-col items-center justify-center rounded-full border-2 bg-white px-3 text-center md:h-[132px] md:w-[132px]"
      style={{
        borderColor: highlight ? a.main : "rgba(15,23,42,0.1)",
        boxShadow: highlight ? `0 8px 22px ${a.ring}` : "0 2px 12px rgba(15,23,42,0.05)",
      }}
    >
      {icon && (
        <span className="mb-1" style={{ color: highlight ? a.main : "#64748b" }}>
          {icon}
        </span>
      )}
      <div
        className="text-[14px] font-bold leading-tight"
        style={{ color: highlight ? a.deep : "#0f172a" }}
      >
        {title}
      </div>
      {desc && (
        <div className="mt-0.5 text-[11px] leading-tight text-brand-mut">
          {desc}
        </div>
      )}
    </motion.div>
  );
}

/* ================================================================== */
/*  Mockups                                                           */
/* ================================================================== */
function TrafficDots() {
  return (
    <>
      <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f56]" />
      <span className="h-[11px] w-[11px] rounded-full bg-[#ffbd2e]" />
      <span className="h-[11px] w-[11px] rounded-full bg-[#27c93f]" />
    </>
  );
}

export function Browser({
  url,
  children,
  w = 540,
}: {
  url: string;
  children: ReactNode;
  w?: number;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl border border-line bg-white shadow-float"
      style={{ maxWidth: w }}
    >
      <div className="flex items-center gap-2 border-b border-line bg-[#eef1f5] px-3.5 py-2.5">
        <TrafficDots />
        <span className="ml-2 flex-1 truncate rounded-full border border-line bg-white px-3 py-1 font-mono text-[12px] text-brand-mut">
          {url}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/** iPhone-style device frame — for iOS / ATT / SKAN screens. */
export function PhoneMock({
  children,
  w = 260,
  label,
}: {
  children: ReactNode;
  w?: number;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative rounded-[36px] border-[3px] border-[#1e232b] bg-[#0d1117] p-2 shadow-mock"
        style={{ width: w }}
      >
        <div className="absolute left-1/2 top-2 z-10 h-4 w-24 -translate-x-1/2 rounded-b-2xl bg-[#1e232b]" />
        <div className="overflow-hidden rounded-[28px] bg-white" style={{ minHeight: 300 }}>
          {children}
        </div>
      </div>
      {label && <div className="text-[12px] font-semibold text-brand-mut">{label}</div>}
    </div>
  );
}

/* ================================================================== */
/*  Screenshot                                                        */
/* ================================================================== */

/**
 * 화면 캡처 액자 — 실제 UI 스크린샷을 슬라이드에 얹을 때 쓴다.
 *
 * `maxH` 를 **반드시** 슬라이드 높이 예산(663px @1280×720) 안에서 잡는다.
 * 덱 섹션은 `h-full` 이라 넘쳐도 스크롤되지 않고 옆 슬라이드로 새어 나간다.
 * 이미지는 `object-contain` 이라 비율이 유지되고, 세로로 긴 캡처는 폭이 저절로 줄어든다.
 */
export function Shot({
  src,
  alt,
  maxH = 400,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  maxH?: number;
  caption?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`flex min-h-0 flex-col items-center ${className}`}>
      {/* 로컬 정적 캡처 — 프로젝트 규칙상 next/image 를 쓰지 않는다 (eslint.config.mjs 에서 규칙을 껐다) */}
      <img
        src={src}
        alt={alt}
        className="w-auto max-w-full rounded-xl border border-line bg-white object-contain shadow-float"
        style={{ maxHeight: maxH }}
      />
      {caption && (
        <figcaption className="ko-body mt-2.5 text-center text-[12px] leading-[1.5] text-brand-mut">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ================================================================== */
/*  Ad-tech specific visuals                                          */
/* ================================================================== */

/** 6-bit conversion-value strip. */
export function BitStrip({
  bits,
  accent = "blue",
}: {
  bits: (0 | 1)[];
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <div className="flex justify-center gap-1.5">
      {bits.map((b, i) => (
        <span
          key={i}
          className="flex h-9 w-9 items-center justify-center rounded-md font-mono text-[15px] font-bold"
          style={
            b
              ? { background: `${a.main}22`, color: a.deep }
              : { background: "#f1f5f9", color: "#94a3b8" }
          }
        >
          {b}
        </span>
      ))}
    </div>
  );
}

/** Horizontal timeline (e.g. SKAN postback windows). */
export function Timeline({
  items,
  accent = "blue",
}: {
  items: { t: string; label: ReactNode; sub?: ReactNode }[];
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <div className="relative flex items-stretch justify-between gap-2">
      <div
        className="absolute left-0 right-0 top-[15px] h-[2px]"
        style={{ background: `${a.main}33` }}
      />
      {items.map((it, i) => (
        <div key={i} className="relative flex flex-1 flex-col items-center text-center">
          <span
            className="z-10 flex h-8 w-8 items-center justify-center rounded-full font-display text-[12px] font-bold text-white"
            style={{ background: a.main }}
          >
            {it.t}
          </span>
          <div className="mt-2 text-[13.5px] font-bold text-brand-ink">
            {it.label}
          </div>
          {it.sub && (
            <div className="mt-0.5 text-[11.5px] leading-tight text-brand-mut">
              {it.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Labeled progress bars (e.g. crowd-anonymity tiers, coarse CV). */
export function Meter({
  rows,
  accent = "blue",
}: {
  rows: { label: ReactNode; desc?: ReactNode; pct: number }[];
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-[13px] font-bold text-brand-ink">
            {r.label}
          </span>
          <div className="h-9 flex-1 overflow-hidden rounded-lg bg-[#f1f5f9]">
            <div
              className="flex h-full items-center rounded-lg px-3 text-[11.5px] font-semibold text-white"
              style={{ width: `${r.pct}%`, backgroundImage: a.gradCss }}
            >
              {r.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Section divider                                                   */
/* ================================================================== */
export function SectionCover({
  tag,
  title,
  subtitle,
  topics,
  accent = "violet",
}: {
  tag: string;
  title: string;
  subtitle?: ReactNode;
  topics?: string[];
  accent?: Accent;
}) {
  const a = ACCENTS[accent];
  return (
    <Frame w={1040}>
      <div className="text-center">
        <Reveal>
          <div
            className="font-display font-extrabold leading-none tracking-[-0.04em]"
            style={{
              fontSize: "clamp(72px,11vw,132px)",
              backgroundImage: a.gradCss,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {tag}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="ko-head mt-1 font-extrabold tracking-[-0.03em] text-brand-ink"
            style={{ fontSize: "clamp(30px,5vw,52px)" }}
          >
            {title}
          </h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className="ko-body mx-auto mt-4 text-[18px] leading-[1.7] text-brand-sub" style={{ maxWidth: 680 }}>
              {subtitle}
            </p>
          </Reveal>
        )}
        {topics && (
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {topics.map((t, i) => (
                <span
                  key={t}
                  className="flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-[14px] font-semibold text-brand-sub shadow-sm backdrop-blur"
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: a.main }}
                  >
                    {i + 1}
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </Frame>
  );
}

/* ================================================================== */
/*  Decorative background blobs                                       */
/* ================================================================== */
export function BlobBg({ accent = "violet" }: { accent?: Accent }) {
  const a = ACCENTS[accent];
  return (
    /* deck-decor — 인쇄에서 빼는 장식층.
       인쇄 규칙이 framer-motion 을 펴려고 `opacity:1 !important` 를 거는데,
       그게 이 8~13% 블롭까지 불투명하게 만들어 표지에 진한 색 띠가 생긴다. */
    <div className="deck-decor pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-[0.10] blur-3xl"
        style={{ background: a.main }}
      />
      <div
        className="absolute -bottom-32 -left-24 h-[360px] w-[360px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: a.deep }}
      />
    </div>
  );
}

/* ================================================================== */
/*  요약형 슬라이드용 조각                                              */
/* ================================================================== */

/** 소프트 칩 묶음 — 산문을 걷어내고 '무엇이 있는지'만 남길 때 쓴다 */
export function ChipRow({
  items,
  accent = "violet",
  size = "md",
}: {
  items: ReactNode[];
  accent?: Accent;
  size?: "sm" | "md";
}) {
  const a = ACCENTS[accent];
  const cls =
    size === "sm" ? "px-2 py-0.5 text-[10.5px]" : "px-2.5 py-1 text-[11.5px]";
  return (
    <span className="flex flex-wrap gap-1.5">
      {items.map((t, i) => (
        <span
          key={i}
          className={`rounded-full font-bold ${cls}`}
          style={{ background: a.soft, color: a.deep }}
        >
          {t}
        </span>
      ))}
    </span>
  );
}

/**
 * 점선 블록 — **확정되지 않은 것**을 확정된 것과 눈으로 가른다.
 * (미확정 항목을 실선 카드에 넣지 않는다는 프로젝트 규칙을 모양으로 강제한다)
 */
export function DashedNote({
  label,
  items,
  children,
}: {
  label: string;
  items?: string[];
  children?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white/60 px-5 py-3.5">
      <div className="text-[11.5px] font-extrabold text-brand-mut">{label}</div>
      {items && (
        <ul className="mt-1.5 flex flex-col gap-1">
          {items.map((t) => (
            <li key={t} className="ko-body flex gap-2 text-[12px] leading-[1.55] text-brand-mut">
              <span aria-hidden className="flex-none text-brand-faint">
                ·
              </span>
              {t}
            </li>
          ))}
        </ul>
      )}
      {children && <div className="ko-body mt-1.5 text-[12px] leading-[1.6] text-brand-mut">{children}</div>}
    </div>
  );
}

/**
 * 번호 붙은 단계 카드를 가로로 편 그리드.
 * 같은 골격을 여러 번 보여줄 때 행으로 쌓으면 '같은 파이프라인'이 레이아웃으로 말해진다.
 */
export function StepGrid({
  steps,
  accent = "violet",
  cols = 5,
  compact = false,
}: {
  steps: { t: string; d?: string }[];
  accent?: Accent;
  cols?: number;
  compact?: boolean;
}) {
  const a = ACCENTS[accent];
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {steps.map((s, i) => (
        <div
          key={s.t}
          className={`flex h-full flex-col rounded-xl border border-line bg-white ${
            compact ? "p-2.5" : "p-3.5"
          }`}
        >
          <span
            className="flex h-[18px] w-[18px] items-center justify-center rounded font-display text-[10px] font-bold text-white"
            style={{ background: a.main }}
          >
            {i + 1}
          </span>
          <div
            className={`mt-1.5 font-extrabold leading-tight text-brand-ink ${
              compact ? "text-[11.5px]" : "text-[13px]"
            }`}
          >
            {s.t}
          </div>
          {s.d && (
            <p
              className={`ko-body mt-1 leading-[1.45] text-brand-mut ${
                compact ? "text-[10px]" : "text-[11px]"
              }`}
            >
              {s.d}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
