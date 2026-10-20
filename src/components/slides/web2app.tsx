"use client";

import {
  AlertTriangle,
  ArrowRight,
  Code2,
  CreditCard,
  Fingerprint,
  Globe,
  Layers,
  Link2,
  MousePointerClick,
  ScanLine,
  Smartphone,
  Store,
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
  IconChip,
  KeyPoint,
  Mono,
  PhoneMock,
  Pill,
  Reveal,
  SlideHead,
  StatBig,
  Steps,
} from "../slide-kit";
import { ACCENTS } from "@/lib/theme";

const A = ACCENTS.teal;
const WARN = ACCENTS.coral;

/* ---------------------------- C-1 · 개념 & 왜 ---------------------------- */
export function CConceptSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="WEB2APP · APP2WEB"
        title="웹과 앱의 경계를 잇는"
        accentWord="광고"
        sub="사용자는 웹과 앱을 구분하지 않는다. 핵심은 경계를 넘어도 '맥락과 어트리뷰션'이 끊기지 않게 하는 것."
        accent="teal"
      />

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Reveal delay={0.06}>
          <Card
            accent="teal"
            icon={<Globe className="h-5 w-5" />}
            title="웹투앱 · Web-to-App"
            className="h-full"
          >
            모바일 웹 방문자를 앱(설치·실행)으로 넘겨 전환·리텐션·LTV를 끌어올린다.
            웹에서 보던 맥락을 앱의 정확한 화면으로 잇는다.
          </Card>
        </Reveal>
        <Reveal delay={0.14}>
          <Card
            accent="teal"
            icon={<Smartphone className="h-5 w-5" />}
            title="앱투웹 · App-to-Web"
            className="h-full"
          >
            앱 사용자를 (주로) 웹 결제·프로모션·콘텐츠로 내보냈다가 다시 앱으로
            복귀시킨다. 획득은 앱, 정산은 웹인 하이브리드 여정.
          </Card>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl border border-line bg-white p-6 shadow-card md:grid-cols-3">
          <StatBig value="+77%" label="웹투앱 캠페인 전환 증가 (2024 vs 2023)" accent="teal" />
          <StatBig value="약 4배" label="Deferred Deep Link 유저 전환 가능성" accent="teal" />
          <StatBig value="약 3배" label="네이티브 쇼핑앱 전환율 (vs 모바일 웹)" accent="teal" />
        </div>
      </Reveal>

      <div className="mt-5">
        <Callout accent="teal" icon={<CreditCard className="h-5 w-5" />}>
          그런데 왜 <b className="text-brand-ink">앱투웹</b>도? 앱스토어
          수수료(15–30%) 회피와 결제·프로모션 유연성 때문에 결제를 웹으로 빼는
          사례가 늘고 있다. (AppsFlyer 자료 기준)
        </Callout>
      </div>
    </Frame>
  );
}

/* ---------------------------- C-2 · 딥링크 기초 ---------------------------- */
const DEEP = [
  {
    t: "Direct Deep Link",
    kr: "직접 딥링크",
    cond: "앱 설치 필요",
    act: "탭 → 앱의 특정 화면으로 바로",
    use: "리타겟팅 · 재방문",
  },
  {
    t: "Deferred Deep Link",
    kr: "지연 딥링크",
    cond: "앱 미설치도 가능",
    act: "스토어 → 설치·첫 실행 후 목적지로",
    use: "신규 획득 · 추천 · 캠페인",
    star: true,
  },
  {
    t: "Contextual Deep Link",
    kr: "맥락 딥링크",
    cond: "위 둘 + 파라미터",
    act: "추천코드·프로모션 등 맥락 전달",
    use: "개인화 · 정밀 분석",
  },
];

const TECH = [
  { t: "URI scheme", d: "myapp:// · 앱 설치 시만, 도메인 검증 없음" },
  { t: "Universal Links (iOS)", d: "HTTPS 링크 · AASA 파일로 검증" },
  { t: "App Links (Android)", d: "HTTPS 링크 · assetlinks.json으로 검증" },
];

export function CDeepLinkSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="DEEP LINKING"
        title="딥링크의"
        accentWord="기초"
        sub="Direct는 설치 경계를 못 넘고, Deferred는 '설치 전 클릭의 맥락'을 설치 이후까지 보존한다."
        accent="teal"
      />

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
        {DEEP.map((d, i) => (
          <Reveal key={d.t} delay={i * 0.09}>
            <Card
              accent="teal"
              className="relative flex h-full flex-col"
            >
              {d.star && (
                <span className="absolute -right-2 -top-3">
                  <Pill accent="teal">핵심</Pill>
                </span>
              )}
              <div className="text-[15px] font-extrabold text-brand-ink">
                {d.t}
              </div>
              <div className="text-[12px] font-medium text-brand-mut">{d.kr}</div>
              <dl className="mt-3 flex flex-col gap-2 border-t border-line pt-3 text-[12.5px]">
                {[
                  ["조건", d.cond],
                  ["동작", d.act],
                  ["용도", d.use],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <dt
                      className="w-9 shrink-0 font-bold"
                      style={{ color: A.main }}
                    >
                      {k}
                    </dt>
                    <dd className="text-brand-sub">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.28}>
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 shadow-card md:flex-row md:items-center">
          <div className="flex shrink-0 items-center gap-2 text-[14px] font-bold text-brand-ink">
            <Layers className="h-4 w-4" style={{ color: A.main }} /> 기술 3층
            <ArrowRight className="h-4 w-4" style={{ color: A.main }} />
          </div>
          <div className="flex flex-1 flex-wrap gap-3">
            {TECH.map((x) => (
              <div
                key={x.t}
                className="flex-1 rounded-xl px-3 py-2 text-center"
                style={{ background: A.soft }}
              >
                <div
                  className="text-[13px] font-bold"
                  style={{ color: A.deep }}
                >
                  {x.t}
                </div>
                <div className="mt-0.5 text-[11px] text-brand-mut">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}

/* ---------------------------- C-3 · OneLink 라우팅 ---------------------------- */
function Chip({
  children,
  strong = false,
}: {
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <span
      className="rounded-md px-2 py-1 text-[12.5px] font-semibold"
      style={
        strong
          ? { background: A.soft, color: A.deep }
          : { background: "#f1f5f9", color: "#334155" }
      }
    >
      {children}
    </span>
  );
}

export function COneLinkSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="ONELINK ROUTING"
        title="OneLink — 하나의 링크,"
        accentWord="상황별 라우팅"
        sub="Direct·Deferred·URI scheme·Universal/App Links를 하나로 묶어 상황에 맞는 경로를 자동 선택한다."
        accent="teal"
      />

      <Reveal delay={0.08}>
        <div className="mt-6 flex flex-col items-center">
          <div
            className="flex items-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-bold text-white shadow-card"
            style={{ backgroundImage: A.gradCss }}
          >
            <MousePointerClick className="h-4 w-4" /> OneLink 클릭
          </div>
          <div className="my-1.5 h-5 w-px" style={{ background: `${A.main}66` }} />
          <div className="text-[12.5px] font-bold text-brand-sub">
            앱이 설치되어 있나?
          </div>

          <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <Card accent="teal">
              <div
                className="mb-3 flex items-center gap-2 text-[14px] font-bold"
                style={{ color: A.deep }}
              >
                <Smartphone className="h-4 w-4" /> YES · 설치됨
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Chip>Universal / App Link로 앱 실행</Chip>
                <ArrowRight className="h-4 w-4" style={{ color: A.main }} />
                <Chip strong>해당 화면</Chip>
              </div>
              <p className="mt-2 text-[12px] text-brand-mut">
                UDL 콜백으로 <Mono>deep_link_value</Mono> 전달
              </p>
            </Card>

            <Card accent="teal">
              <div
                className="mb-3 flex items-center gap-2 text-[14px] font-bold"
                style={{ color: A.deep }}
              >
                <Store className="h-4 w-4" /> NO · 미설치
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Chip>스토어</Chip>
                <ArrowRight className="h-3.5 w-3.5" style={{ color: A.main }} />
                <Chip>설치·첫 실행</Chip>
                <ArrowRight className="h-3.5 w-3.5" style={{ color: A.main }} />
                <Chip strong>해당 화면 (Deferred)</Chip>
              </div>
              <p className="mt-2 text-[12px] text-brand-mut">
                목적지를 저장 → 설치 후 콜백으로 복원
              </p>
            </Card>
          </div>
        </div>
      </Reveal>

      <div className="mt-5">
        <KeyPoint accent="teal">
          데스크톱·미지원 환경은 지정된 <b>fallback 웹페이지</b>로. 모든 마케팅
          링크를 OneLink로 표준화하면 웹↔앱 어디로 튀든 라우팅이 보장된다.
        </KeyPoint>
      </div>
    </Frame>
  );
}

/* ---------------------------- C-4 · 웹투앱 실전 ---------------------------- */
export function CWeb2AppSlide() {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="WEB TO APP"
        title="웹투앱"
        accentWord="실전"
        sub="모바일 웹 방문자를 앱으로 — Smart Banner + Deferred Deep Link + 개인화 랜딩을 세트로."
        accent="teal"
      />

      <div className="mt-6 grid grid-cols-1 items-start gap-5 md:grid-cols-[210px_1fr_1.15fr]">
        {/* smart banner mockup */}
        <Reveal delay={0.06}>
          <PhoneMock w={210} label="Smart Banner">
            <div className="flex flex-col">
              <div
                className="flex items-center gap-2 px-3 py-2.5"
                style={{ background: A.soft }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                  style={{ backgroundImage: A.gradCss }}
                >
                  <ScanLine className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-brand-ink">
                    앱에서 더 빠르게
                  </div>
                  <div className="text-[9.5px] text-brand-mut">지금 열기</div>
                </div>
                <span
                  className="rounded-md px-2 py-1 text-[10px] font-bold text-white"
                  style={{ background: A.main }}
                >
                  열기
                </span>
              </div>
              <div className="space-y-2 p-3">
                <div className="h-20 rounded-lg bg-[#eef1f5]" />
                <div className="h-2.5 w-3/4 rounded bg-[#eef1f5]" />
                <div className="h-2.5 w-1/2 rounded bg-[#eef1f5]" />
                <div className="h-2.5 w-2/3 rounded bg-[#eef1f5]" />
              </div>
            </div>
          </PhoneMock>
        </Reveal>

        {/* smart banner info */}
        <Reveal delay={0.14}>
          <Card
            accent="teal"
            icon={<ScanLine className="h-5 w-5" />}
            title="Smart Banner"
            className="h-full"
          >
            <p>
              모바일 웹 배너. 노코드 에디터로 배포, 웹의 UTM을 OneLink 파라미터로
              매핑해 유입 소스를 설치 어트리뷰션으로 연결.
            </p>
            <div className="mt-3">
              <Pill accent="teal">click-to-install 30%+</Pill>
            </div>
          </Card>
        </Reveal>

        {/* deferred deep link steps */}
        <Reveal delay={0.2}>
          <Card
            accent="teal"
            title="Deferred Deep Link 플로우"
            className="h-full"
          >
            <Steps
              accent="teal"
              items={[
                { h: "모바일 웹에서 상품/콘텐츠 보다 OneLink 클릭" },
                { h: "미설치 → 목적지를 클릭에 매핑해 저장 후 스토어로" },
                { h: "설치·첫 실행 → SDK가 매칭된 deferred 데이터 콜백 수신" },
                { h: "파라미터 파싱 → 웹에서 보던 '그 화면'으로 착지" },
              ]}
            />
          </Card>
        </Reveal>
      </div>

      <div className="mt-5">
        <Callout accent="teal" icon={<Users className="h-5 w-5" />}>
          <b className="text-brand-ink">PBA (People-Based Attribution)</b> — 웹
          SDK와 모바일 SDK가 함께 동작해 <b>웹 방문을 앱 설치에 사람 단위로 귀속</b>.
          어떤 캠페인이 웹 방문을 만들고 그것이 설치로 이어졌는지 추적.
        </Callout>
      </div>
    </Frame>
  );
}

/* ---------------------------- C-5 · 앱투웹 실전 (하이브리드 콜백) ---------------------------- */
const HYBRID = [
  { title: "Web 이벤트", desc: "웹뷰 내 발생", icon: <Globe className="h-5 w-5" /> },
  { title: "JS Bridge 호출", desc: "Native로 전달", icon: <Code2 className="h-5 w-5" /> },
  { title: "Native 전달", desc: "메시지 파싱", icon: <Smartphone className="h-5 w-5" /> },
  { title: "SDK Log Event", desc: "logEvent 전송", icon: <Layers className="h-5 w-5" /> },
  { title: "MMP 수집", desc: "데이터 트래킹", icon: <Fingerprint className="h-5 w-5" />, hl: true },
];

export function CApp2WebSlide() {
  return (
    <Frame w={1240}>
      <SlideHead
        kicker="APP TO WEB"
        title="앱투웹 실전 &"
        accentWord="하이브리드 측정"
        sub="기초편의 하이브리드 앱(Native + WebView + JS Bridge)이 여기서 측정 과제가 된다."
        accent="teal"
      />

      <Reveal delay={0.08}>
        <div className="mt-6">
          <div className="mb-3 text-center text-[13px] font-bold text-brand-sub">
            웹뷰 이벤트 발생 시 흐름
          </div>
          <FlowRow>
            {HYBRID.map((n, i) => (
              <div key={n.title} className="flex items-center">
                <FlowNode
                  accent="teal"
                  index={i}
                  title={n.title}
                  desc={n.desc}
                  icon={n.icon}
                  highlight={n.hl}
                />
                {i < HYBRID.length - 1 && <FlowArrow accent="teal" />}
              </div>
            ))}
          </FlowRow>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal delay={0.14}>
          <Card accent="teal" className="h-full">
            <div
              className="mb-2 flex items-center gap-2 text-[14px] font-bold"
              style={{ color: A.deep }}
            >
              <CreditCard className="h-4 w-4" /> 왜 웹으로 결제를 빼나
            </div>
            <ul className="flex flex-col gap-2">
              <Bullet accent="teal">스토어 수수료 회피 · 프로모션 유연성</Bullet>
              <Bullet accent="teal">
                규제 변화 — Epic v. Apple(2025), EU DMA, 일본 MSCA
              </Bullet>
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={0.2}>
          <Card accent="coral" className="h-full">
            <div
              className="mb-2 flex items-center gap-2 text-[14px] font-bold"
              style={{ color: WARN.deep }}
            >
              <AlertTriangle className="h-4 w-4" /> 측정의 어려움
            </div>
            <ul className="flex flex-col gap-2">
              <Bullet accent="coral">
                SDK는 <b>네이티브에서만</b> 이벤트 전송 → JS Bridge 필수
              </Bullet>
              <Bullet accent="coral">
                인앱 웹뷰에서 딥링크가 깨질 수 있음 → 시스템 브라우저 권장
              </Bullet>
            </ul>
          </Card>
        </Reveal>
      </div>
    </Frame>
  );
}

/* ---------------------------- C-6 · 측정 연속성 & 함정 ---------------------------- */
const AXES = [
  {
    icon: <Link2 className="h-5 w-5" />,
    t: "OneLink 파라미터",
    d: "deep_link_value · media_source · campaign이 클릭→설치→인앱까지 운반",
  },
  {
    icon: <Users className="h-5 w-5" />,
    t: "PBA + Web SDK",
    d: "디바이스가 아닌 '사람' 단위로 웹↔앱 여정을 매핑",
  },
  {
    icon: <Fingerprint className="h-5 w-5" />,
    t: "CUID",
    d: "동일 로그인ID(해시)로 cross-platform 식별 고정. PII는 반드시 해시",
  },
];

const PITFALLS = [
  "Associated Domains에 applinks: 접두어 누락 / 도메인 오타",
  "AASA · assetlinks.json 오구성 (appID·경로·확장자·CDN 캐시)",
  "Deferred deep link 콜백 미구현 → 설치 후 홈으로 떨어짐",
  "인앱 웹뷰 제약 · 링크 래핑(click wrapping)으로 딥링크 무력화",
];

export function CMeasureSlide() {
  return (
    <Frame w={1180}>
      <SlideHead
        kicker="MEASUREMENT"
        title="경계를 넘는"
        accentWord="측정 연속성"
        sub="앱↔웹을 오가도 어트리뷰션을 유지하는 3대 축, 그리고 반드시 QA할 함정들."
        accent="teal"
      />

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
        {AXES.map((x, i) => (
          <Reveal key={x.t} delay={i * 0.08}>
            <Card accent="teal" className="h-full">
              <IconChip accent="teal">{x.icon}</IconChip>
              <div className="mt-3 text-[15px] font-extrabold text-brand-ink">
                {x.t}
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-brand-mut">
                {x.d}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.28}>
        <div
          className="mt-5 rounded-2xl border bg-white p-5 shadow-card"
          style={{ borderColor: `${WARN.main}33` }}
        >
          <div
            className="mb-3 flex items-center gap-2 text-[14px] font-bold"
            style={{ color: WARN.deep }}
          >
            <AlertTriangle className="h-4 w-4" /> 셋업 함정 체크리스트
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {PITFALLS.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[12px] font-bold text-white"
                  style={{ background: WARN.main }}
                >
                  {i + 1}
                </span>
                <span className="text-[13px] leading-relaxed text-brand-ink">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Frame>
  );
}
