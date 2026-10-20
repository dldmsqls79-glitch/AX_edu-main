"use client";

import {
  AlertTriangle,
  Binary,
  Clock,
  Database,
  Eye,
  Fingerprint,
  Layers,
  Lock,
  ServerCog,
  ShieldCheck,
  ShieldOff,
  Sparkles,
  Store,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  BitStrip,
  Bullet,
  Callout,
  Card,
  CompareCard,
  FlowArrow,
  FlowNode,
  FlowRow,
  Frame,
  IconChip,
  KeyPoint,
  Meter,
  Reveal,
  SlideHead,
  Timeline,
} from "../slide-kit";

const ACCENT = "blue" as const;

/* ---------------------------- B-1 · 왜 SKAN ---------------------------- */
export function BWhySlide() {
  const chain = [
    "iOS 14.5 · ATT 도입 (2021)",
    "동의 없으면 IDFA 접근 불가",
    "결정론적(유저 단위) 측정 붕괴",
  ];
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="WHY SKAN"
        title="왜"
        accentWord="SKAN인가"
        sub="iOS 14.5의 ATT로 IDFA 기반 결정론적 측정이 무너졌다. SKAN은 Apple이 제시한 프라이버시 중심의 대안이다."
        accent={ACCENT}
      />

      <Reveal delay={0.14}>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[13px] font-semibold">
          {chain.map((c) => (
            <span
              key={c}
              className="rounded-lg border border-line bg-white px-3 py-2 text-brand-ink shadow-sm"
            >
              {c}
            </span>
          ))}
          <span className="text-brand-blue">→</span>
          <span
            className="rounded-lg px-3.5 py-2 font-bold text-white shadow-sm"
            style={{ backgroundImage: "linear-gradient(135deg,#60a5fa 0%,#2563eb 100%)" }}
          >
            SKAdNetwork
          </span>
        </div>
      </Reveal>

      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal delay={0.2}>
          <CompareCard
            name="결정론적 (IDFA)"
            tag="Deterministic"
            icon={<Fingerprint className="h-4 w-4" />}
            accent="coral"
            pros={["유저·기기 단위로 정확히 매칭", "실시간·상세 데이터, 재참여 측정 가능"]}
            cons={["ATT 동의(opt-in) 필요 → 동의율에 종속"]}
          />
        </Reveal>
        <Reveal delay={0.28}>
          <CompareCard
            name="프라이버시 보존 (SKAN)"
            tag="Privacy-preserving"
            icon={<ShieldCheck className="h-4 w-4" />}
            accent={ACCENT}
            pros={["동의 없이도 작동 · Apple이 중개", "집계(aggregate) 단위 — 유저 식별 불가"]}
            cons={["지연·제한적 데이터 (프라이버시 우선)"]}
          />
        </Reveal>
      </div>

      <div className="mt-5">
        <Callout accent={ACCENT} icon={<Sparkles className="h-5 w-5" />}>
          <b className="text-brand-ink">AdAttributionKit (AAK)</b> — iOS
          17.4+(2024)부터 도입된 차세대 프레임워크로, 재참여 측정과 대체
          마켓플레이스(EU DMA)를 지원한다. SKAN을 즉시 대체하지 않고 당분간
          병행된다(폐지 일정 미발표).
        </Callout>
      </div>
    </Frame>
  );
}

/* ---------------------------- B-2 · SKAN 구조 ---------------------------- */
export function BWhatSlide() {
  const cards = [
    {
      icon: <Users className="h-5 w-5" />,
      t: "유저 단위 아님",
      d: "기기가 익명으로 집계 — 개별 유저를 특정하지 않는다.",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      t: "Apple이 중개·서명",
      d: "광고 서명과 설치 검증을 Apple이 수행해 위·변조를 막는다.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      t: "지연 전송",
      d: "랜덤 타이머로 포스트백이 지연 → 실시간 최적화가 어렵다.",
    },
  ];
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="HOW SKAN WORKS"
        title="SKAdNetwork는 어떻게"
        accentWord="작동하나"
        sub="Apple이 설치를 검증하고, 기기가 익명으로 값을 담아, 광고 네트워크에 포스트백을 보낸다."
        accent={ACCENT}
      />

      <Reveal delay={0.14}>
        <div className="mt-8">
          <FlowRow>
            <FlowNode index={0} accent={ACCENT} title="광고 노출" desc="StoreKit 렌더 · 서명된 광고" icon={<Eye className="h-5 w-5" />} />
            <FlowArrow accent={ACCENT} />
            <FlowNode index={1} accent={ACCENT} title="설치" desc="App Store 다운로드" icon={<Store className="h-5 w-5" />} />
            <FlowArrow accent={ACCENT} />
            <FlowNode index={2} accent={ACCENT} title="CV 업데이트" desc="기기가 값 저장·갱신" icon={<Binary className="h-5 w-5" />} />
            <FlowArrow accent={ACCENT} />
            <FlowNode index={3} accent={ACCENT} title="타이머 · Apple" desc="랜덤 지연 후 서명" icon={<Timer className="h-5 w-5" />} />
            <FlowArrow accent={ACCENT} label="postback" />
            <FlowNode index={4} accent={ACCENT} title="포스트백" desc="광고 네트워크 → MMP 사본" highlight icon={<ServerCog className="h-5 w-5" />} />
          </FlowRow>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((x, i) => (
          <Reveal key={x.t} delay={0.24 + i * 0.08}>
            <Card accent={ACCENT} title={x.t} icon={x.icon} className="h-full">
              {x.d}
            </Card>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}

/* ---------------------------- B-3 · Conversion Value ---------------------------- */
export function BCvSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="CONVERSION VALUE"
        title="성과를 숫자로"
        accentWord="인코딩"
        sub="측정 윈도우 동안의 인앱 행동을 하나의 값으로 압축해 포스트백에 담는다."
        accent={ACCENT}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal delay={0.14}>
          <Card accent={ACCENT} title="Fine Conversion Value" icon={<Binary className="h-5 w-5" />} className="flex h-full flex-col">
            <div className="mt-1 text-center">
              <div className="font-display text-[40px] font-extrabold leading-none text-brand-blueDeep">
                0 – 63
              </div>
              <div className="mt-1 text-[13px] font-semibold text-brand-mut">
                6비트 (2⁶ = 64단계)
              </div>
            </div>
            <div className="mt-4">
              <BitStrip bits={[1, 0, 1, 1, 0, 1]} accent={ACCENT} />
            </div>
            <p className="mt-4 text-center text-[13px] text-brand-mut">
              설치·회원가입·첫 구매·매출 구간 등을 스키마로 매핑
            </p>
          </Card>
        </Reveal>

        <Reveal delay={0.22}>
          <Card accent="coral" title="Coarse Conversion Value" icon={<Layers className="h-5 w-5" />} className="flex h-full flex-col">
            <div className="mt-2 flex flex-1 flex-col justify-center">
              <Meter
                accent="coral"
                rows={[
                  { label: "Low", desc: "저볼륨 대안", pct: 40 },
                  { label: "Medium", desc: "중간 신호", pct: 65 },
                  { label: "High", desc: "높은 가치", pct: 90 },
                ]}
              />
            </div>
            <p className="mt-4 text-center text-[13px] text-brand-mut">
              볼륨이 낮아 fine 값을 못 받을 때의 저해상도 대안 (3단계)
            </p>
          </Card>
        </Reveal>
      </div>

      <div className="mt-5">
        <KeyPoint accent={ACCENT}>
          Conversion Value 스키마 설계가 SKAN 성패를 좌우한다 — 어떤 인앱 이벤트를
          어떤 값에 매핑할지 미리 정의해야 하고, 측정 윈도우가 지나면{" "}
          <b>값이 잠긴다(lock)</b>.
        </KeyPoint>
      </div>
    </Frame>
  );
}

/* ---------------------------- B-4 · 다중 포스트백 ---------------------------- */
const POSTBACKS = [
  { n: 1, window: "0 – 2일", cv: "Fine 또는 Coarse", note: "초기 전환 · 가장 상세" },
  { n: 2, window: "3 – 7일", cv: "Coarse", note: "초기 리텐션·행동" },
  { n: 3, window: "8 – 35일", cv: "Coarse", note: "장기 가치·LTV 신호" },
];

export function BPostbackSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="MULTIPLE POSTBACKS"
        title="SKAN 4.0 — 다중"
        accentWord="포스트백"
        sub="단일 포스트백(3.0)에서, 유저 여정을 세 개의 시간창으로 나눠 최대 3회 받는다."
        accent={ACCENT}
      />

      <Reveal delay={0.14}>
        <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-card">
          <Timeline
            accent={ACCENT}
            items={POSTBACKS.map((p) => ({
              t: `#${p.n}`,
              label: p.window,
              sub: p.cv,
            }))}
          />
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {POSTBACKS.map((p, i) => (
          <Reveal key={p.n} delay={0.22 + i * 0.08}>
            <Card accent={ACCENT} title={`Postback #${p.n}`} className="h-full">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[22px] font-extrabold text-brand-blueDeep">
                  {p.window}
                </span>
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ background: "#2563eb" }}
                >
                  {p.cv}
                </span>
              </div>
              <p className="mt-2 text-[13px] text-brand-mut">{p.note}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-5">
        <Callout accent={ACCENT} icon={<Clock className="h-5 w-5" />}>
          각 포스트백은 측정 윈도우 종료 후 <b>랜덤 지연</b>을 거쳐 전송된다. 첫
          포스트백만 fine value를 담을 수 있고, 이후는 coarse 중심이며{" "}
          <b>crowd anonymity 티어</b>에 따라 실제로 받는 값이 달라진다.
        </Callout>
      </div>
    </Frame>
  );
}

/* ---------------------------- B-5 · Crowd Anonymity ---------------------------- */
export function BPrivacySlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="CROWD ANONYMITY"
        title="Crowd Anonymity &"
        accentWord="Source Identifier"
        sub="Apple은 '군중 속 익명성'이 확보될 만큼 볼륨이 클 때만 상세 데이터를 내어준다."
        accent={ACCENT}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-5">
        <Reveal delay={0.14} className="md:col-span-3">
          <Card
            accent={ACCENT}
            title="Crowd Anonymity 티어"
            icon={<Layers className="h-5 w-5" />}
            className="h-full"
          >
            <div className="mb-3 text-[12px] font-semibold text-brand-mut">
              볼륨 ↑ → 데이터 ↑
            </div>
            <Meter
              accent={ACCENT}
              rows={[
                { label: "높은 볼륨", desc: "Fine CV(0–63) + 상세 source ID", pct: 100 },
                { label: "중간 볼륨", desc: "Coarse CV + 축소된 source ID", pct: 66 },
                { label: "낮은 볼륨", desc: "CV·source ID가 null 처리", pct: 33 },
              ]}
            />
          </Card>
        </Reveal>

        <Reveal delay={0.22} className="md:col-span-2">
          <Card
            accent={ACCENT}
            title="Source Identifier"
            icon={<Fingerprint className="h-5 w-5" />}
            className="flex h-full flex-col"
          >
            <div className="flex items-center justify-center gap-1.5 py-2">
              {["2", "3", "4"].map((d) => (
                <span
                  key={d}
                  className="flex h-11 w-11 items-center justify-center rounded-lg font-display text-lg font-extrabold"
                  style={{ background: "rgba(37,99,235,0.10)", color: "#1d4ed8" }}
                >
                  {d}
                </span>
              ))}
              <span className="ml-1 text-[13px] font-semibold text-brand-mut">자리</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-brand-mut">
              기존 2자리 캠페인 ID를 대체한 <b>계층적 식별자</b>. 볼륨이 클수록 더
              많은 자릿수(더 세밀한 캠페인 구분)를 받는다.
            </p>
          </Card>
        </Reveal>
      </div>

      <div className="mt-5">
        <KeyPoint accent={ACCENT}>
          그래서 SKAN 리포트에는 <b>null·downgrade</b>가 흔하다. 캠페인을 지나치게
          잘게 쪼개면 볼륨이 분산되어 오히려 데이터를 잃는다.
        </KeyPoint>
      </div>
    </Frame>
  );
}

/* ---------------------------- B-6 · Appsflyer 셋업 ---------------------------- */
export function BSetupSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="APPSFLYER SETUP"
        title="Appsflyer에서의"
        accentWord="SKAN 설정"
        sub="Conversion Value 스키마를 정의하고, SKAN 대시보드로 집계 성과를 읽는다."
        accent={ACCENT}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal delay={0.14}>
          <Card accent={ACCENT} title="Conversion Studio" icon={<ServerCog className="h-5 w-5" />} className="h-full">
            <ul className="mt-1 flex flex-col gap-2.5">
              <Bullet accent={ACCENT}>
                인앱 이벤트 → Conversion Value 스키마를 노코드로 매핑
              </Bullet>
              <Bullet accent={ACCENT}>매출·퍼널·참여도 기반 측정 모델 선택</Bullet>
              <Bullet accent={ACCENT}>
                <b>SKAN + Predict</b> — 초기 신호로 장기 가치를 예측 보완
              </Bullet>
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={0.22}>
          <Card accent={ACCENT} title="SKAN 리포팅" icon={<Database className="h-5 w-5" />} className="h-full">
            <ul className="mt-1 flex flex-col gap-2.5">
              <Bullet accent={ACCENT}>
                <b>Single-source</b> — 매체가 보낸 원본 포스트백 그대로
              </Bullet>
              <Bullet accent={ACCENT}>
                <b>SSOT (Single Source of Truth)</b> — 어트리뷰션·SKAN 설치를
                중복 제거해 통합
              </Bullet>
              <Bullet accent={ACCENT}>
                <b>SKAN Modeled Data</b> — null·숨겨진 값을 ML로 보정
              </Bullet>
            </ul>
          </Card>
        </Reveal>
      </div>

      <div className="mt-5">
        <Callout accent={ACCENT} icon={<Sparkles className="h-5 w-5" />}>
          매체마다 CV 스키마·측정 윈도우 요구가 다를 수 있으므로, 스키마는{" "}
          <b>사전에 팀·매체와 합의</b>하고 캠페인 시작 전에 고정하는 것이 안전하다.
        </Callout>
      </div>
    </Frame>
  );
}

/* ---------------------------- B-7 · 리포팅 & 한계 ---------------------------- */
const LIMITS = [
  { icon: <Users className="h-5 w-5" />, t: "집계 단위", d: "유저 단위 데이터 없음 · 코호트 세분화 제한" },
  { icon: <Clock className="h-5 w-5" />, t: "지연", d: "랜덤 타이머로 실시간 최적화 어려움" },
  { icon: <ShieldOff className="h-5 w-5" />, t: "null·downgrade", d: "볼륨 부족 시 CV·source ID 손실" },
  { icon: <AlertTriangle className="h-5 w-5" />, t: "재참여 불가", d: "SKAN은 re-engagement 미측정" },
];

export function BReportSlide() {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="REPORTING & LIMITS"
        title="리포팅 & 한계 —"
        accentWord="'다르게' 읽어야 한다"
        sub="SKAN 수치는 다른 대시보드와 일치하지 않는다. 한계를 알고 결정론·예측과 병행해 읽는다."
        accent={ACCENT}
      />

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {LIMITS.map((l, i) => (
          <Reveal key={l.t} delay={0.14 + i * 0.07}>
            <Card accent={ACCENT} className="h-full">
              <div className="flex items-center gap-2.5">
                <IconChip accent={ACCENT} size="sm">{l.icon}</IconChip>
                <span className="text-[14px] font-extrabold text-brand-ink">{l.t}</span>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-brand-mut">
                {l.d}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Reveal delay={0.42}>
          <Callout accent="coral" icon={<AlertTriangle className="h-5 w-5" />}>
            <b className="text-brand-ink">왜 숫자가 다를까</b> — SKAN은{" "}
            <b>논오가닉 설치만</b> 집계하고(어트리뷰션 대시보드는 전체 설치),
            지연·null·설치일 오프셋이 겹친다. 다른 대시보드와 어긋나는 것은
            정상이다.
          </Callout>
        </Reveal>
        <Reveal delay={0.5}>
          <Callout accent={ACCENT} icon={<TrendingUp className="h-5 w-5" />}>
            <b className="text-brand-ink">읽는 법</b> — SKAN을 단독 진실로 보지
            말고, 결정론적 데이터·예측 모델(SKAN + Predict)·증분성과 <b>삼각
            측량</b>해 방향을 판단한다.
          </Callout>
        </Reveal>
      </div>
    </Frame>
  );
}
