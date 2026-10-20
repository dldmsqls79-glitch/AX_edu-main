"use client";

import {
  AlertTriangle,
  BarChart3,
  Bell,
  Clock,
  Copy,
  Download,
  FlaskConical,
  Layers,
  Link2,
  Mail,
  Network,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Bullet,
  Callout,
  Card,
  FlowArrow,
  FlowNode,
  FlowRow,
  Frame,
  KeyPoint,
  Mono,
  PhoneMock,
  Pill,
  Reveal,
  SlideHead,
  StatBig,
  StatRow,
  Steps,
} from "../slide-kit";
import { ACCENTS } from "@/lib/theme";

const V = ACCENTS.violet;
const SLATE = "#64748b";

/* ---------------------------- A-1 · 리타겟팅이란 ---------------------------- */
const FUNNEL = ["Acquisition", "Activation", "Retention", "Re-engagement"];

export function AWhatSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="A. APP RETARGETING · 01"
        title="리타겟팅이란"
        accentWord="무엇인가"
        sub="새 유저를 '확보(UA)'하는 것이 아니라, 이미 확보한 유저의 가치(LTV)를 다시 끌어올리는 활동."
        accent="violet"
      />

      {/* funnel + brackets */}
      <Reveal delay={0.14}>
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="grid grid-cols-4 gap-2.5">
            {FUNNEL.map((f, i) => {
              const rt = i >= 2;
              return (
                <div
                  key={f}
                  className="rounded-xl px-3 py-3.5 text-center text-[13.5px] font-bold"
                  style={
                    rt
                      ? { background: V.soft, color: V.deep }
                      : { background: "#f1f5f9", color: "#475569" }
                  }
                >
                  {f}
                </div>
              );
            })}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2.5">
            <div className="col-span-2 flex flex-col items-center gap-1.5">
              <div
                className="h-3 w-full rounded-b-lg border-x-2 border-b-2"
                style={{ borderColor: `${SLATE}66` }}
              />
              <span className="text-[12px] font-bold" style={{ color: SLATE }}>
                UA · 신규 획득
              </span>
            </div>
            <div className="col-span-2 flex flex-col items-center gap-1.5">
              <div
                className="h-3 w-full rounded-b-lg border-x-2 border-b-2"
                style={{ borderColor: `${V.main}66` }}
              />
              <span className="text-[12px] font-bold" style={{ color: V.deep }}>
                리타겟팅 · 재참여 · CRM
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal delay={0.2}>
          <Card
            title="UA · User Acquisition"
            icon={<UserPlus className="h-5 w-5" />}
            accent="violet"
            className="h-full"
          >
            <ul className="flex flex-col gap-2">
              <Bullet accent="violet">새 유저 풀을 넓히는 활동</Bullet>
              <Bullet accent="violet">신규 설치 · 첫 액션이 목표</Bullet>
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={0.26}>
          <Card
            title="리타겟팅 · Re-engagement"
            icon={<RefreshCw className="h-5 w-5" />}
            accent="violet"
            className="h-full"
          >
            <ul className="flex flex-col gap-2">
              <Bullet accent="violet">
                기존/이탈 유저를 다시 불러오는 유료 · 자사 채널 활동
              </Bullet>
              <Bullet accent="violet">
                장바구니 이탈 · 미완료 온보딩 · 휴면 유저 winback
              </Bullet>
            </ul>
          </Card>
        </Reveal>
      </div>

      <div className="mt-6">
        <KeyPoint accent="violet">
          유저의 80%는 3개월 내 앱을 이탈한다. 리타겟 유저는 신규 대비 D1 인앱
          이벤트가 약 2배(86 vs 44) — 뒷단 재참여의 ROI가 크다.
        </KeyPoint>
      </div>
    </Frame>
  );
}

/* ---------------------------- A-2 · Re-engage vs Re-attrib ---------------------------- */
function ReengageScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-4 pt-8">
      <div className="mx-auto mb-4 flex flex-col items-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md"
          style={{ backgroundImage: V.gradCss }}
        >
          <Smartphone className="h-7 w-7" />
        </span>
        <span
          className="mt-2 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold"
          style={{ background: V.soft, color: V.deep }}
        >
          앱 유지 중
        </span>
      </div>
      <div
        className="mt-auto rounded-xl border px-3 py-2.5 text-[11.5px] font-semibold leading-snug"
        style={{ borderColor: `${V.main}30`, background: V.soft, color: V.deep }}
      >
        다시 열어보세요 →
        <div className="mt-0.5 text-[10px] font-medium text-brand-mut">
          재오픈 → 인앱 이벤트 귀속
        </div>
      </div>
    </div>
  );
}

function ReattribScreen() {
  return (
    <div className="flex h-full flex-col items-center px-4 pb-4 pt-8">
      <div className="relative mb-1 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-300">
        <Trash2 className="h-6 w-6" />
      </div>
      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10.5px] font-bold text-slate-500">
        삭제됨
      </span>
      <div className="my-3 h-6 w-px bg-slate-200" />
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md"
        style={{ backgroundImage: V.gradCss }}
      >
        <Download className="h-6 w-6" />
      </span>
      <div className="mt-auto text-center text-[11px] font-semibold text-brand-mut">
        재설치 = re-attribution
        <div className="text-[10px] font-medium">신규 설치로 세지 않음</div>
      </div>
    </div>
  );
}

export function ATypesSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="RE-ENGAGE VS RE-ATTRIB"
        title="Re-engagement vs"
        accentWord="Re-attribution"
        sub="Appsflyer는 리타겟팅 전환을 두 종류로 명확히 구분한다. 이 구분이 설정과 리포트를 좌우한다."
        accent="violet"
      />

      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal delay={0.1}>
          <Card
            title="Re-engagement · 재참여"
            icon={<Smartphone className="h-5 w-5" />}
            accent="violet"
            className="h-full"
          >
            <div className="flex items-center gap-4">
              <PhoneMock w={140}>
                <ReengageScreen />
              </PhoneMock>
              <div className="flex-1">
                <p className="text-[13.5px] font-semibold leading-snug text-brand-ink">
                  앱을 <b style={{ color: V.deep }}>삭제하지 않은</b> 기존 유저가
                  리타겟팅 광고에 반응해 <b>앱을 다시 여는</b> 것
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  <Bullet accent="violet">전제 : 앱이 기기에 남아 있음</Bullet>
                  <Bullet accent="violet">
                    Re-engagement window 동안 인앱 이벤트 귀속
                  </Bullet>
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.18}>
          <Card
            title="Re-attribution · 재기여"
            icon={<Trash2 className="h-5 w-5" />}
            accent="violet"
            className="h-full"
          >
            <div className="flex items-center gap-4">
              <PhoneMock w={140}>
                <ReattribScreen />
              </PhoneMock>
              <div className="flex-1">
                <p className="text-[13.5px] font-semibold leading-snug text-brand-ink">
                  앱을 <b style={{ color: V.deep }}>삭제한</b> 유저가 리타겟팅에
                  반응해 <b>재설치</b>하는 것 (= retargeting-reinstall)
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  <Bullet accent="violet">전제 : 삭제 후 복귀 (lapsed user)</Bullet>
                  <Bullet accent="violet">재설치를 신규 설치로 세지 않음</Bullet>
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>

      <div className="mt-6">
        <KeyPoint accent="violet" label="한 문장 요약">
          앱이 남아 있으면 <b>Re-engagement</b>, 삭제 후 재설치면{" "}
          <b>Re-attribution</b>.
        </KeyPoint>
      </div>
    </Frame>
  );
}

/* ---------------------------- A-3 · 세 개의 윈도우 ---------------------------- */
const WINDOWS = [
  {
    icon: <Clock className="h-5 w-5" />,
    name: "Inactivity Window",
    kr: "비활성 윈도우",
    range: "1 – 30일",
    param: "af_inactivity_window",
    desc: "리타겟팅 전환을 인정하려면 유저가 최소 이 기간만큼 비활성이어야 한다. 활발히 쓰던(=오가닉이었을) 유저를 성과에서 배제하는 필터.",
    star: true,
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    name: "Re-engagement Window",
    kr: "재참여 윈도우",
    range: "기본 30일",
    param: "af_reengagement_window",
    desc: "재오픈 이후 얼마 동안 인앱 이벤트를 리타겟 매체에 귀속할지. 이 기간엔 리타겟 네트워크가 주(primary) 귀속처가 된다.",
    star: false,
  },
  {
    icon: <SlidersHorizontal className="h-5 w-5" />,
    name: "Re-attribution Window",
    kr: "재기여 윈도우",
    range: "약 90일(조정 가능)",
    param: "최초 설치 기점",
    desc: "이 기간 내 재설치는 신규 설치로 집계하지 않는다. 리타겟팅으로 유입되면 re-attribution으로, 아니면 오가닉으로 분류.",
    star: false,
  },
];

export function AWindowsSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="THREE WINDOWS"
        title="세 개의 윈도우 = 리타겟팅의"
        accentWord="핵심 설정"
        sub="MMP에서 이 윈도우를 어떻게 잡느냐가 리타겟팅 측정의 정확도를 결정한다."
        accent="violet"
      />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {WINDOWS.map((w, i) => (
          <Reveal key={w.name} delay={0.1 + i * 0.08}>
            <Card
              accent="violet"
              className="relative flex h-full flex-col"
              style={
                w.star ? { boxShadow: `0 10px 30px ${V.ring}` } : undefined
              }
            >
              {w.star && (
                <span className="absolute -right-2 -top-3">
                  <Pill accent="violet">가장 중요</Pill>
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[15px] font-extrabold text-brand-ink">
                    {w.name}
                  </div>
                  <div className="text-[12px] font-medium text-brand-mut">
                    {w.kr}
                  </div>
                </div>
                <span style={{ color: V.main }}>{w.icon}</span>
              </div>
              <div className="mt-3">
                <span
                  className="rounded-md px-2.5 py-1 text-[12px] font-bold"
                  style={{ background: V.soft, color: V.deep }}
                >
                  {w.range}
                </span>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-brand-sub">
                {w.desc}
              </p>
              <div className="mt-auto pt-3 text-[11px]">
                <Mono>{w.param}</Mono>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-6">
        <KeyPoint accent="violet">
          Inactivity Window를 안 켜거나 너무 짧게 잡으면, 어차피 재방문했을 활성
          유저까지 리타겟 성과로 잡혀{" "}
          <b>Organic Cannibalization(오가닉 잠식)</b>과 성과 과대계상이 발생한다.
        </KeyPoint>
      </div>
    </Frame>
  );
}

/* ---------------------------- A-4 · 작동 원리 ---------------------------- */
export function AHowSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="HOW IT WORKS"
        title="리타겟팅은 어떻게"
        accentWord="작동하나"
        sub="세그먼트를 만들고 → 딥링크로 정확한 화면에 착지시키고 → 매체가 귀속 · 측정한다."
        accent="violet"
      />

      <Reveal delay={0.14}>
        <FlowRow className="mt-8">
          <FlowNode
            index={0}
            accent="violet"
            highlight
            icon={<Layers className="h-6 w-6" />}
            title="Audiences"
            desc="행동·매출 세그먼트"
          />
          <FlowArrow accent="violet" />
          <FlowNode
            index={1}
            accent="violet"
            icon={<Link2 className="h-6 w-6" />}
            title="딥링크"
            desc="Deferred · OneLink"
          />
          <FlowArrow accent="violet" />
          <FlowNode
            index={2}
            accent="violet"
            icon={<Network className="h-6 w-6" />}
            title="SRN / 파트너"
            desc="집행 · 귀속"
          />
          <FlowArrow accent="violet" />
          <FlowNode
            index={3}
            accent="violet"
            highlight
            icon={<BarChart3 className="h-6 w-6" />}
            title="측정"
            desc="재참여 · 매출"
          />
        </FlowRow>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal delay={0.2}>
          <Callout accent="violet" icon={<Network className="h-5 w-5" />}>
            <b className="text-brand-ink">SRN (Self-Reporting Network)</b> — 앱
            실행마다 &ldquo;이 기기가 최근 이 광고에 반응했나?&rdquo;를 매체에
            질의하고, lookback · 재참여 최소 간격을 검증해 귀속한다.
          </Callout>
        </Reveal>
        <Reveal delay={0.26}>
          <Callout accent="violet" icon={<Layers className="h-5 w-5" />}>
            <b className="text-brand-ink">Suppression Audience</b> — UA
            캠페인에서 기존/활성 유저를 제외해 예산 낭비와 잠식을 막고, 리타겟팅은
            별도 캠페인으로 분리한다.
          </Callout>
        </Reveal>
      </div>
    </Frame>
  );
}

/* ---------------------------- A-5 · 이중 귀속 & 오설정 ---------------------------- */
const MISCONFIG = [
  { h: "Inactivity Window 미설정 → 오가닉 재방문까지 리타겟 성과로 계상" },
  { h: "Re-engagement Window 과대(lifetime) → 이후 모든 매출을 장기 귀속 → ROAS 착시" },
  { h: "이중 귀속을 모른 채 UA+RT 매출 단순 합산 → 예산 중복 배분" },
  { h: "UA에 Suppression 미적용 → 기존 유저에 예산 낭비" },
];

export function ASetupSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="DOUBLE ATTRIBUTION"
        title="이중 귀속과 흔한"
        accentWord="오설정"
        sub="재참여 이벤트는 원래 UA 매체와 리타겟 매체 양쪽에 동시 귀속된다 — 리포트 합산에 주의."
        accent="violet"
      />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-5">
        {/* double attribution diagram */}
        <Reveal delay={0.1} className="md:col-span-2">
          <Card accent="violet" className="flex h-full flex-col justify-center">
            <div
              className="mx-auto rounded-xl px-4 py-2.5 text-center text-[13px] font-bold text-white"
              style={{ backgroundImage: V.gradCss }}
            >
              재참여 인앱 이벤트
            </div>
            <div className="mx-auto my-2.5 h-5 w-px" style={{ background: `${V.main}55` }} />
            <div className="flex justify-center gap-3">
              <div className="rounded-xl bg-slate-100 px-3.5 py-3 text-center text-[12px] font-bold text-slate-600">
                원래 UA 매체
              </div>
              <div
                className="rounded-xl px-3.5 py-3 text-center text-[12px] font-bold"
                style={{ background: V.soft, color: V.deep }}
              >
                리타겟 매체
              </div>
            </div>
            <p className="mt-4 text-center text-[12px] leading-relaxed text-brand-sub">
              양쪽에 <b className="text-brand-ink">동시 귀속</b> → UA 매출 + 리타겟
              매출을 단순 합산하면 중복(더블 카운팅)
            </p>
          </Card>
        </Reveal>

        {/* misconfig list */}
        <Reveal delay={0.18} className="md:col-span-3">
          <Card
            title="흔한 오설정 (Common Misconfigurations)"
            icon={<AlertTriangle className="h-5 w-5" />}
            accent="violet"
            className="h-full"
          >
            <div className="mt-1">
              <Steps accent="violet" items={MISCONFIG} />
            </div>
          </Card>
        </Reveal>
      </div>

      <div className="mt-5">
        <Callout accent="violet" icon={<Copy className="h-5 w-5" />}>
          Re-engagement은 항상 이중 귀속이 적용되고, Re-attribution은 앱이
          &lsquo;first-install mode&rsquo;일 때만 적용된다. 채널 성과 비교 시 이
          귀속 로직을 팀이 공통으로 이해해야 한다.
        </Callout>
      </div>
    </Frame>
  );
}

/* ---------------------------- A-6 · iOS 제약 ---------------------------- */
const IOS_VALID = [
  { i: <Link2 className="h-4 w-4" />, t: "딥링크 / Universal Links" },
  { i: <Mail className="h-4 w-4" />, t: "이메일 · SMS" },
  { i: <Bell className="h-4 w-4" />, t: "푸시 · 인앱 메시지" },
  { i: <Users className="h-4 w-4" />, t: "1st-party Audiences" },
];

export function AiOSSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="WHY iOS IS DIFFERENT"
        title="iOS에서의"
        accentWord="리타겟팅"
        sub="SKAN은 재참여 귀속을 원천 미지원한다. iOS 리타겟팅은 '무엇이 여전히 유효한가'로 설계한다."
        accent="violet"
      />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal delay={0.1}>
          <Card
            title="제약"
            icon={<AlertTriangle className="h-5 w-5" />}
            accent="violet"
            className="h-full"
          >
            <ul className="flex flex-col gap-2">
              <Bullet accent="violet" tone="minus">
                <b>SKAN은 재참여(re-engagement) 귀속을 지원하지 않는다</b>
              </Bullet>
              <Bullet accent="violet" tone="minus">
                IDFA 기반 결정론적 타겟팅은 ATT 동의 필요
              </Bullet>
              <Bullet accent="violet" tone="minus">
                동의율↓ → 결정론적 리타겟 모수 급감
              </Bullet>
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={0.18}>
          <Card
            title="여전히 유효한 것"
            icon={<ShieldCheck className="h-5 w-5" />}
            accent="violet"
            className="h-full"
          >
            <div className="grid grid-cols-2 gap-2.5">
              {IOS_VALID.map((x) => (
                <div
                  key={x.t}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold text-brand-ink"
                  style={{ background: V.soft }}
                >
                  <span style={{ color: V.main }}>{x.i}</span>
                  {x.t}
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>

      <div className="mt-5">
        <Callout accent="violet" icon={<TrendingUp className="h-5 w-5" />}>
          <b className="text-brand-ink">AdAttributionKit (AAK)</b> — iOS 18.4 /
          2025부터 Apple이 <b>재참여 측정</b>을 정식 도입(중첩 재참여 윈도우,{" "}
          <Mono>reengagementOpen</Mono> conversion tag 등). iOS 재참여 측정은
          &lsquo;불가&rsquo;에서 점진적으로 개선되는 중.
        </Callout>
      </div>
    </Frame>
  );
}

/* ---------------------------- A-7 · KPI & 측정 ---------------------------- */
export function AKpiSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="KPI & MEASUREMENT"
        title="리타겟팅 성과, 어떻게"
        accentWord="읽나"
        sub="Last-click 리포트만으로는 '광고가 만든 전환'과 '어차피 일어날 전환'을 구분하지 못한다."
        accent="violet"
      />

      <div className="mt-8">
        <StatRow>
          <StatBig value="건수" label="Re-engagements / Re-attributions" accent="violet" />
          <StatBig value="CPRe" label="Cost per Re-engagement" accent="violet" />
          <StatBig value="ROAS" label="리타겟 코호트 매출 / 비용" accent="violet" />
          <StatBig value="+5%p" label="재참여 유저 D1 리텐션 리프트" accent="violet" />
        </StatRow>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal delay={0.18}>
          <Card
            title="측정의 두 함정"
            icon={<AlertTriangle className="h-5 w-5" />}
            accent="violet"
            className="h-full"
          >
            <ul className="flex flex-col gap-2">
              <Bullet accent="violet" tone="minus">
                <b>더블 카운팅</b> — 이중 귀속으로 UA · RT 매출이 겹침
              </Bullet>
              <Bullet accent="violet" tone="minus">
                <b>오가닉 잠식</b> — 참여도 높은 유저는 광고 없이도 재방문
              </Bullet>
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={0.24}>
          <Card
            title="해법 : Incrementality (증분성)"
            icon={<FlaskConical className="h-5 w-5" />}
            accent="violet"
            className="h-full"
          >
            <div className="mb-2.5 flex items-center gap-2">
              <span
                className="rounded-md px-2.5 py-1 text-[11.5px] font-bold text-white"
                style={{ backgroundImage: V.gradCss }}
              >
                Exposed
              </span>
              <span className="text-[13px] font-bold text-brand-mut">vs</span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11.5px] font-bold text-slate-500">
                Holdout
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-brand-ink">
              노출 vs 무노출 그룹의 행동 차이 = 진짜 인과적 리프트.
              &ldquo;5만 전환&rdquo;이 아니라 &ldquo;광고가 없었다면 일어나지
              않았을 3만 전환&rdquo;을 본다.
            </p>
          </Card>
        </Reveal>
      </div>
    </Frame>
  );
}
