/**
 * HSAD × Wisebirds — **개발 기획** 콘텐츠 단일 출처.
 *
 * 형식은 `doc/HSAD-plan-doc/퍼포먼스TF_아이디어 정리 템플릿.pptx` 를 따른다:
 *   아이디어 정리 → As-Is Workflow 분석 → To-Be Workflow Redesign
 *   → Agent 우선순위 평가 → 과제 정의서 → Action 단위 Workflow
 *
 * 내용의 출처를 구분해 둔다 —
 *   · **To-Be · 페인포인트 · 기대효과** : 상세 기획서([hsad-data.ts](./hsad-data.ts))에 있는 내용
 *   · **As-Is Workflow** : 기획서에 As-Is 도식이 없어, 문서의 페인포인트에서 **역산해 재구성**한 것이다.
 *     현업 확인이 필요한 부분이며 화면에도 그렇게 표기한다.
 *   · **우선순위·KPI·로드맵** : 템플릿이 요구하는 칸을 채운 **제안값**이다. 합의된 수치가 아니다.
 */
import { p } from "./projects";
import type { Accent } from "./theme";

export const hsd = (path = "") => p("hsad", path);

export const DEV_META = {
  title: "AI 솔루션 개발 기획",
  subtitle: "HSAD × Wisebirds · 아이디어별 To-Be Workflow 설계",
  template: "퍼포먼스TF 아이디어 구조화 템플릿",
  /** 화면 여러 곳에서 같은 문장으로 경고한다 — 한 곳에서만 고친다 */
  asIsCaveat:
    "As-Is 흐름은 기획서에 도식이 없어 문서에 적힌 페인포인트에서 역산해 재구성한 것입니다. 현업 확인이 필요합니다.",
  estimateCaveat:
    "우선순위·KPI·기간은 템플릿 칸을 채운 제안값입니다. 합의된 수치가 아닙니다.",
  /**
   * 개발 파트의 약속 — 통합 덱 마무리에서 클라이언트 논지 아래 한 줄로 붙는다.
   * 원래 개발 기획 마무리 슬라이드 **컴포넌트 안에 직접 쓰여 있던** 문장을 데이터로 옮긴 것이다
   * ("슬라이드는 배치만 한다" 규칙 위반이었다).
   */
  closing: {
    head: "먼저 하나를 끝까지 관통시킨다",
    lead: "아이디어를 동시에 벌리지 않습니다. 신호 수집 → 카피 생성 한 줄기를 PoC 로 관통시켜 데이터 수집·정형화 계층을 세우고, 나머지는 그 위에 얹습니다.",
  },
} as const;

/* ════════════════ 워크플로 도식 ════════════════ */

export type FlowNode =
  /** 사람이 직접 하는 활동 */
  | { kind: "activity"; label: string; note?: string; core?: boolean }
  /** AI Agent 가 대신하는 활동 */
  | { kind: "agent"; label: string; note?: string; agent: string }
  /** 조건부·선택 */
  | { kind: "branch"; label: string; yes: string; no: string }
  /** 사람 개입 필수 — AI 로 대체하지 않는 판단 */
  | { kind: "human"; label: string; note?: string };

export type Phase = {
  /** 1단계 — 큰 업무 단위 */
  title: string;
  /** 2단계 — 그 단위를 한 문장으로 */
  summary: string;
  /** 3단계 — 세부 흐름 */
  nodes: FlowNode[];
  /** As-Is 에만 붙는 현업 페인포인트 */
  pain?: { title: string; body: string };
};

export type DevIdea = {
  slug: string;
  no: string;
  title: string;
  /** 도트 네비처럼 좁은 자리에 쓰는 짧은 이름 — 길면 네비가 본문을 덮는다 */
  short: string;
  /** 기획서의 어느 영역에서 나온 아이디어인지 */
  origin: string;
  category: string;
  accent: Accent;
  summary: string;
  asIs: string;
  painPoints: string[];
  toBe: string;
  effects: string[];
  asIsFlow: Phase[];
  toBeFlow: Phase[];
  /** 사람 판단으로 남기는 영역 — To-Be 도식 아래 명시한다 */
  humanOnly: string;
  agents: { no: string; name: string; desc: string }[];
  /** 우선순위 매트릭스 — 둘 다 1~5 (제안값) */
  impact: number;
  ease: number;
  priority: "중점 과제" | "전략 과제" | "중장기 과제" | "후보 과제";
};

export const DEV_IDEAS: DevIdea[] = [
  /* ══════════ 01 ══════════ */
  {
    slug: "signal-copy",
    no: "01",
    title: "실시간 신호 카피 에이전트",
    short: "신호 카피",
    origin: "A-1 · A-2 → D-1",
    category: "시장 분석 → 크리에이티브 제작",
    accent: "blue",
    summary:
      "검색·날씨·소셜 신호가 튀는 순간을 잡아, 그 업종의 카피를 즉시 여러 안으로 만든다.",
    asIs:
      "담당자가 트렌드 도구와 뉴스를 눈으로 확인하고, 관련 업종을 판단한 뒤 카피를 처음부터 쓴다. 신호를 알아챘을 때는 이미 늦다.",
    painPoints: [
      "조사 범위가 방대해 담당자별로 중요 데이터를 빠뜨리는 휴먼 에러가 난다",
      "업종별 소재 템플릿이 없어 매번 백지에서 시작한다",
      "카피 톤이 담당자 숙련도·성향에 따라 파편화된다",
    ],
    toBe:
      "신호 수집 → 변화율 계산 → 임계치 필터 → 업종 매핑까지 자동으로 돌고, 업종 템플릿에 키워드를 꽂아 LLM이 카피 다안을 낸다. 사람은 고르고 승인한다.",
    effects: [
      "신호 감지에서 소재 노출까지의 리드타임 단축",
      "업종 템플릿·톤앤매너 사전 구축으로 카피 품질 편차 감소",
      "담당자는 판단에만 시간을 쓴다",
    ],
    asIsFlow: [
      {
        title: "신호 인지",
        summary: "트렌드 도구·뉴스·커뮤니티를 담당자가 개별로 확인한다",
        nodes: [
          { kind: "activity", label: "트렌드 도구 수동 확인", note: "구글 트렌드 · 데이터랩" },
          { kind: "activity", label: "뉴스·커뮤니티 훑기" },
          { kind: "activity", label: "관련 업종 판단", core: true },
        ],
        pain: {
          title: "누락 위험",
          body: "조사 범위가 방대해 담당자별로 중요 신호를 빠뜨리는 휴먼 에러가 발생한다.",
        },
      },
      {
        title: "소재 기획",
        summary: "카피 방향을 논의하고 레퍼런스를 모아 초안을 잡는다",
        nodes: [
          { kind: "activity", label: "카피 방향 논의" },
          { kind: "activity", label: "레퍼런스 수집" },
          { kind: "activity", label: "카피 초안 작성", core: true },
        ],
        pain: {
          title: "일관성 부족",
          body: "업종 템플릿이 없어 매번 백지에서 시작하고, 톤이 담당자 숙련도에 따라 파편화된다.",
        },
      },
      {
        title: "검수 · 집행",
        summary: "내부 검수를 거쳐 매체에 올린다",
        nodes: [
          { kind: "branch", label: "브랜드 톤 부합", yes: "업로드", no: "재작성" },
          { kind: "activity", label: "내부 검수" },
          { kind: "activity", label: "매체 업로드", core: true },
        ],
        pain: {
          title: "타이밍 상실",
          body: "신호를 알아채고 소재가 나갈 때쯤이면 이미 그 맥락이 지나 있다.",
        },
      },
    ],
    toBeFlow: [
      {
        title: "신호 감지",
        summary: "신호 소스를 주기적으로 훑고 급상승 후보만 남긴다",
        nodes: [
          { kind: "agent", agent: "①", label: "신호 수집", note: "검색·날씨 API · 소셜 크롤링" },
          { kind: "agent", agent: "①", label: "변화율 계산", note: "전일·전주 대비" },
          { kind: "agent", agent: "①", label: "임계치 필터", note: "예: 전일 대비 200%↑" },
        ],
      },
      {
        title: "매핑 · 생성",
        summary: "신호를 업종에 붙이고 템플릿으로 카피 다안을 만든다",
        nodes: [
          { kind: "agent", agent: "②", label: "신호–업종 매핑", note: "매핑 테이블 · 임베딩 유사도" },
          { kind: "agent", agent: "②", label: "카피 다안 생성", note: "업종 템플릿 + LLM" },
        ],
      },
      {
        title: "선택 · 집행",
        summary: "담당자가 고르고, 가이드를 통과한 안만 나간다",
        nodes: [
          { kind: "human", label: "담당자 안 선택", note: "AI 가 대체하지 않는 판단" },
          { kind: "branch", label: "브랜드 가이드 통과", yes: "업로드", no: "② 로 피드백" },
          { kind: "agent", agent: "②", label: "매체 업로드", note: "Asset API 연동" },
        ],
      },
    ],
    humanOnly: "카피 안 선택과 최종 집행 승인은 담당자의 판단 영역으로 남긴다.",
    agents: [
      {
        no: "①",
        name: "신호 수집 에이전트",
        desc: "검색 트렌드·날씨 API·소셜/커뮤니티를 주기적으로 조회해 변화율을 계산하고, 임계치를 넘는 키워드만 급상승 후보로 넘긴다.",
      },
      {
        no: "②",
        name: "카피 생성 에이전트",
        desc: "급상승 키워드를 신호–업종 매핑 테이블로 업종에 붙이고, 업종별 소재 템플릿에 삽입해 LLM으로 카피 여러 안을 생성한다.",
      },
    ],
    impact: 5,
    ease: 4,
    priority: "중점 과제",
  },

  /* ══════════ 02 ══════════ */
  {
    slug: "visual-perf",
    no: "02",
    title: "성과–비주얼 분석 에이전트",
    short: "성과 분석",
    origin: "C-1 → D-1",
    category: "데이터 분석 → 크리에이티브 제작",
    accent: "teal",
    summary:
      "무엇이 잘 먹혔는지를 비주얼 특징으로 환원해, 다음 소재 생성의 입력으로 되돌린다.",
    asIs:
      "매체별로 흩어진 리포트를 손으로 모으고, 잘된 소재를 눈으로 훑어 '이런 느낌이 좋았다'로 정리한다. 근거가 사람 머릿속에만 남는다.",
    painPoints: [
      "매체별 성과 데이터가 분산돼 통합·해석에 시간이 든다",
      "무엇이 성과를 만들었는지가 정량으로 남지 않는다",
      "노출이 적은 소재까지 섞여 판단이 흔들린다",
    ],
    toBe:
      "소재 × 비주얼 특징 × 성과를 한 테이블로 쌓고 세그먼트별 상관을 뽑아, 프롬프트·참고카드·신규 소재 스코어링에 그대로 넣는다.",
    effects: [
      "성과 근거가 사람 머릿속이 아니라 테이블에 남는다",
      "신규 소재를 만들기 전에 점수를 매길 수 있다",
      "AI 자동화 캠페인의 블랙박스를 일부 되짚을 수 있다",
    ],
    asIsFlow: [
      {
        title: "수집",
        summary: "매체별 리포트를 내려받아 손으로 합친다",
        nodes: [
          { kind: "activity", label: "매체별 리포트 다운로드" },
          { kind: "activity", label: "시트 병합·정리", core: true },
          { kind: "activity", label: "집행 소재 파일 대조" },
        ],
        pain: {
          title: "통합 비용",
          body: "매체마다 지표 정의와 포맷이 달라 합치는 데만 상당한 시간이 든다.",
        },
      },
      {
        title: "해석",
        summary: "잘된 소재를 눈으로 훑고 공통점을 말로 정리한다",
        nodes: [
          { kind: "activity", label: "상위 소재 육안 확인" },
          { kind: "activity", label: "공통점 메모", core: true },
          { kind: "branch", label: "노출량 충분", yes: "채택", no: "제외" },
        ],
        pain: {
          title: "정량 근거 부재",
          body: "무엇이 성과를 만들었는지가 담당자 설명에만 남고, 다음 사람에게 넘어가지 않는다.",
        },
      },
      {
        title: "반영",
        summary: "다음 소재 요청서에 말로 옮겨 적는다",
        nodes: [
          { kind: "activity", label: "소재 요청서 작성" },
          { kind: "activity", label: "디자이너 구두 공유", core: true },
        ],
        pain: {
          title: "전달 손실",
          body: "말로 옮기는 과정에서 기준이 흐려지고, 사람이 바뀌면 처음부터 다시 쌓는다.",
        },
      },
    ],
    toBeFlow: [
      {
        title: "수집 · 정형화",
        summary: "매체 리포트와 소재 파일을 자동으로 모아 한 포맷으로 맞춘다",
        nodes: [
          { kind: "agent", agent: "①", label: "매체 리포트 통합", note: "노출·CTR/CVR·전환당비용" },
          { kind: "agent", agent: "①", label: "최소 노출량 필터", note: "노이즈 큰 소재 제외" },
          { kind: "agent", agent: "①", label: "소재 × 성과 결합" },
        ],
      },
      {
        title: "특징 추출 · 분석",
        summary: "비주얼을 네 갈래로 분해하고 세그먼트별 상관을 본다",
        nodes: [
          {
            kind: "agent",
            agent: "②",
            label: "비주얼 특징 추출",
            note: "구성 · 색채 · 레이아웃 · 의미",
          },
          { kind: "agent", agent: "②", label: "통합 테이블 저장", note: "소재 × 특징 × 성과" },
          { kind: "agent", agent: "②", label: "세그먼트별 상관 분석" },
        ],
      },
      {
        title: "생성에 반영",
        summary: "분석 결과를 다음 소재를 만드는 입력으로 되돌린다",
        nodes: [
          { kind: "agent", agent: "③", label: "프롬프트 반영" },
          { kind: "agent", agent: "③", label: "참고 카드 생성" },
          { kind: "human", label: "신규 소재 채택 판단", note: "스코어는 참고값" },
        ],
      },
    ],
    humanOnly: "스코어가 낮아도 브랜드 캠페인상 필요한 소재가 있다 — 채택 판단은 사람이 한다.",
    agents: [
      {
        no: "①",
        name: "성과 데이터 통합 에이전트",
        desc: "매체별로 흩어진 리포트를 자동 수집·정형화하고, 최소 노출량을 넘는 소재만 남겨 소재×성과 테이블을 만든다.",
      },
      {
        no: "②",
        name: "비주얼 특징 분석 에이전트",
        desc: "소재 이미지에서 구성적·색채적·레이아웃·의미적 특징을 추출해 성과와의 상관을 세그먼트별로 계산한다.",
      },
      {
        no: "③",
        name: "생성 피드백 에이전트",
        desc: "상관 결과를 생성 프롬프트와 참고 카드로 환원하고, 신규 소재에 예상 점수를 매긴다.",
      },
    ],
    impact: 5,
    ease: 3,
    priority: "전략 과제",
  },

  /* ══════════ 03 ══════════ */
  {
    slug: "shortform",
    no: "03",
    title: "숏폼 자동 편집 에이전트",
    short: "숏폼 편집",
    origin: "D-3",
    category: "크리에이티브 제작",
    accent: "violet",
    summary: "롱폼 하나에서 6~15초 여러 벌을 뽑아 플랫폼별 길이에 맞춘다.",
    asIs:
      "편집자가 롱폼을 처음부터 보며 쓸 구간을 찾고, 길이별·플랫폼별로 각각 다시 편집한다. 한 벌 만드는 데 하루가 든다.",
    painPoints: [
      "타겟팅 자동화로 노출 빈도가 빨라져 소재 피로도가 급격히 쌓인다",
      "플랫폼별 길이·비율이 달라 같은 작업을 여러 번 반복한다",
      "편집 리소스가 병목이라 소재 교체 주기를 못 따라간다",
    ],
    toBe:
      "STT로 스크립트를 확보하고 음성강조·키워드밀도·장면전환으로 하이라이트를 스코어링해, 길이별 컷팅과 9:16 크롭·자막·렌더링까지 자동으로 돌린다.",
    effects: [
      "롱폼 1편에서 숏폼 여러 벌을 같은 날 뽑는다",
      "소재 교체 주기를 편집 리소스가 아니라 성과가 결정한다",
      "업종별 하이라이트 기준을 축적할 수 있다",
    ],
    asIsFlow: [
      {
        title: "구간 선정",
        summary: "편집자가 롱폼을 통으로 보며 쓸 구간을 고른다",
        nodes: [
          { kind: "activity", label: "롱폼 전체 시청" },
          { kind: "activity", label: "하이라이트 구간 메모", core: true },
          { kind: "activity", label: "기획자 협의" },
        ],
        pain: {
          title: "시청 시간 비용",
          body: "영상 길이만큼의 시간이 그대로 들고, 고르는 기준이 편집자마다 다르다.",
        },
      },
      {
        title: "편집",
        summary: "길이별로 각각 잘라 자막을 새로 얹는다",
        nodes: [
          { kind: "activity", label: "길이별 개별 컷팅", core: true },
          { kind: "activity", label: "세로 비율 재구성" },
          { kind: "activity", label: "자막 재작업" },
        ],
        pain: {
          title: "반복 작업",
          body: "6·9·15초와 플랫폼별 비율을 조합하면 같은 작업을 여러 번 되풀이한다.",
        },
      },
      {
        title: "렌더 · 검수",
        summary: "플랫폼별로 내보내고 확인한다",
        nodes: [
          { kind: "activity", label: "플랫폼별 렌더" },
          { kind: "branch", label: "품질 통과", yes: "전달", no: "재편집" },
        ],
        pain: {
          title: "교체 주기 병목",
          body: "편집 리소스가 한계라, 성과가 떨어져도 새 소재를 제때 넣지 못한다.",
        },
      },
    ],
    toBeFlow: [
      {
        title: "구간 스코어링",
        summary: "스크립트와 신호를 결합해 하이라이트를 랭킹한다",
        nodes: [
          { kind: "agent", agent: "①", label: "STT 스크립트", note: "기존 SRT 재사용 가능" },
          {
            kind: "agent",
            agent: "①",
            label: "1~2초 단위 벡터화",
            note: "음성강조 · 키워드밀도 · 장면전환",
          },
          { kind: "agent", agent: "①", label: "하이라이트 랭킹", note: "업종별 키워드 가중치" },
        ],
      },
      {
        title: "자동 컷팅",
        summary: "길이별로 자르고 세로로 바꾼다",
        nodes: [
          { kind: "agent", agent: "②", label: "6 · 9 · 15초 트리밍" },
          { kind: "agent", agent: "②", label: "9:16 세로 크롭", note: "피사체 추적" },
          { kind: "agent", agent: "②", label: "자막 재생성 · 렌더링" },
        ],
      },
      {
        title: "검수 · 집행",
        summary: "사람이 최종 확인하고 내보낸다",
        nodes: [
          { kind: "human", label: "편집자 검수", note: "브랜드 훼손 여부" },
          { kind: "branch", label: "품질 통과", yes: "집행", no: "① 로 재랭킹" },
          { kind: "agent", agent: "②", label: "플랫폼별 배포" },
        ],
      },
    ],
    humanOnly: "브랜드 이미지를 해칠 컷이 섞일 수 있다 — 최종 검수는 편집자가 한다.",
    agents: [
      {
        no: "①",
        name: "하이라이트 추출 에이전트",
        desc: "STT로 타임스탬프 스크립트를 만들고, 음성강조·키워드밀도·장면전환을 1~2초 단위로 벡터화해 하이라이트 구간을 랭킹한다.",
      },
      {
        no: "②",
        name: "숏폼 렌더 에이전트",
        desc: "길이별 트리밍 → 피사체 추적 9:16 크롭 → 자막 재생성 → 플랫폼별 렌더링까지 자동으로 처리한다.",
      },
    ],
    impact: 4,
    ease: 3,
    priority: "전략 과제",
  },

  /* ══════════ 04 ══════════ */
  {
    slug: "creative-ops",
    no: "04",
    title: "소재 운영·교체 에이전트",
    short: "소재 운영",
    origin: "C-3",
    category: "데이터 분석 · 운영",
    accent: "navy",
    summary:
      "반응률이 임계점 아래로 떨어지면 알리고, 브랜드 가이드북 기반으로 변형한 소재 세트를 미리 대기시킨다.",
    asIs:
      "담당자가 대시보드를 눈으로 보다가 효율이 꺾이면 소재를 내리고, 그때부터 새 소재를 요청한다. 요청부터 집행까지 공백이 생긴다.",
    painPoints: [
      "언제 꺼야 하는지 기준이 담당자마다 다르다",
      "성과가 꺾인 뒤에 제작을 시작해 공백이 생긴다",
      "목표 CPA/CPC 절대값을 일괄로 적용하면 브랜드 사정을 못 담는다",
    ],
    toBe:
      "최소 운영 기간을 보장한 뒤 상대적 하위 구간을 정량으로 뽑고, 광고주·운영자가 직접 세운 오프 기준으로 알림을 띄운다. 알림과 동시에 변형 소재 세트가 대기한다.",
    effects: [
      "교체 판단 기준이 사람이 아니라 룰에 남는다",
      "알림 시점에 이미 대체 소재가 준비돼 공백이 줄어든다",
      "조기 판단으로 인한 소재 사장을 막는다",
    ],
    asIsFlow: [
      {
        title: "모니터링",
        summary: "대시보드를 주기적으로 눈으로 확인한다",
        nodes: [
          { kind: "activity", label: "매체 대시보드 확인" },
          { kind: "activity", label: "효율 하락 감지", core: true },
        ],
        pain: {
          title: "기준의 편차",
          body: "언제 꺼야 하는지가 담당자 감각에 달려 있어, 같은 상황에서도 판단이 갈린다.",
        },
      },
      {
        title: "판단 · 중단",
        summary: "하위 소재를 골라 내린다",
        nodes: [
          { kind: "branch", label: "목표 CPA 초과", yes: "중단", no: "유지" },
          { kind: "activity", label: "소재 오프", core: true },
        ],
        pain: {
          title: "조기 판단",
          body: "데이터가 충분히 쌓이기 전에 끄면 살아날 소재를 사장시킨다.",
        },
      },
      {
        title: "교체",
        summary: "새 소재를 요청하고 제작을 기다린다",
        nodes: [
          { kind: "activity", label: "신규 소재 요청" },
          { kind: "activity", label: "제작 대기", core: true },
          { kind: "activity", label: "교체 집행" },
        ],
        pain: {
          title: "집행 공백",
          body: "요청부터 집행까지 며칠이 비고, 그동안 예산은 남은 소재에 쏠린다.",
        },
      },
    ],
    toBeFlow: [
      {
        title: "룰 기반 감시",
        summary: "최소 기간을 보장하고 상대 기준으로 하위를 뽑는다",
        nodes: [
          { kind: "agent", agent: "①", label: "최소 운영 기간 보장", note: "예: 1주일" },
          { kind: "agent", agent: "①", label: "하위 20~30% 추출", note: "절대값 아닌 상대 기준" },
          { kind: "human", label: "커스텀 오프 기준 설정", note: "광고주·운영자가 직접" },
        ],
      },
      {
        title: "알림 · 대기",
        summary: "임계점을 넘으면 알리고, 동시에 대체 세트를 만든다",
        nodes: [
          { kind: "agent", agent: "②", label: "교체 알람", note: "대시보드 시각화" },
          {
            kind: "agent",
            agent: "②",
            label: "변형 소재 세트 생성",
            note: "브랜드 가이드북 기반 카피·비주얼",
          },
        ],
      },
      {
        title: "교체 집행",
        summary: "사람이 승인하면 바로 교체한다",
        nodes: [
          { kind: "human", label: "교체 승인", note: "얼럿은 가이드, 결정은 사람" },
          { kind: "branch", label: "대체 세트 채택", yes: "즉시 교체", no: "신규 제작" },
          { kind: "agent", agent: "②", label: "교체 집행" },
        ],
      },
    ],
    humanOnly:
      "“효율 안 좋으니 다 꺼라” 식 자동 중단은 하지 않는다. 시스템은 얼럿과 가이드라인까지, 끄고 켜는 결정은 사람이 한다.",
    agents: [
      {
        no: "①",
        name: "운영 룰 엔진",
        desc: "최소 운영 기간을 보장한 뒤 브랜드별 상대 기준으로 하위 성과 소재를 추출하고, 운영자가 세운 커스텀 오프 기준을 적용한다.",
      },
      {
        no: "②",
        name: "크리에이티브 시뮬레이터",
        desc: "반응률 임계점 하락 시 교체 알람을 띄우고, 브랜드 가이드북 기반으로 카피·비주얼을 변형한 소재 세트를 미리 대기시킨다.",
      },
    ],
    impact: 4,
    ease: 4,
    priority: "중점 과제",
  },

  /* ══════════ 05 ══════════ */
  {
    slug: "brand-guard",
    no: "05",
    title: "브랜드 세이프 · 체력 모니터",
    short: "브랜드 세이프",
    origin: "C-4",
    category: "데이터 분석 · 브랜드",
    accent: "coral",
    summary:
      "브랜드에 맞지 않는 지면 노출을 통제하고, 단기 매출과 별개로 브랜드 체력이 깎이는지를 함께 본다.",
    asIs:
      "지면 배제는 매체별 설정에 흩어져 있고, 브랜드 건강도는 분기 리서치로만 확인한다. 단기 성과가 좋으면 체력 하락을 늦게 안다.",
    painPoints: [
      "AI 자동화 캠페인이 어떤 지면에 노출했는지 세부를 알 수 없다",
      "단기 성과에 집착하면 시장 파이를 못 키워 획득 비용만 오른다",
      "브랜드 건강도 확인 주기가 캠페인 주기보다 느리다",
    ],
    toBe:
      "브랜드 가이드라인 기준으로 부적합 지면을 사전 차단하고, 자발적 검색량·소셜 바이럴 추천·팬덤 지수를 실시간 대시보드로 함께 본다. 매출은 느는데 체력이 깎이면 알림을 띄운다.",
    effects: [
      "브랜드 훼손 노출을 사후 수습이 아니라 사전에 막는다",
      "단기 ROAS와 장기 체력을 같은 화면에서 판단한다",
      "AI 예산 배분의 블랙박스를 지면 단위로 되짚는다",
    ],
    asIsFlow: [
      {
        title: "지면 관리",
        summary: "매체별 설정 화면에서 각각 배제 목록을 넣는다",
        nodes: [
          { kind: "activity", label: "매체별 배제 목록 입력" },
          { kind: "activity", label: "노출 지면 사후 확인", core: true },
        ],
        pain: {
          title: "블랙박스",
          body: "AI 자동화 캠페인이 어떤 지면에 누구에게 왜 예산을 썼는지 세부 데이터를 볼 수 없다.",
        },
      },
      {
        title: "성과 판단",
        summary: "매체 대시보드의 단기 지표로 판단한다",
        nodes: [
          { kind: "activity", label: "ROAS · CPA 확인" },
          { kind: "branch", label: "목표 달성", yes: "증액", no: "조정" },
        ],
        pain: {
          title: "단기 편향",
          body: "시장 파이를 키우지 않고 한정된 모수에서 경쟁해 고객 획득 비용만 오른다.",
        },
      },
      {
        title: "브랜드 점검",
        summary: "분기 리서치로 브랜드 인식을 확인한다",
        nodes: [
          { kind: "activity", label: "분기 브랜드 조사" },
          { kind: "activity", label: "리포트 공유", core: true },
        ],
        pain: {
          title: "확인 주기 지연",
          body: "캠페인은 매주 도는데 브랜드 확인은 분기라, 체력이 깎인 걸 늦게 안다.",
        },
      },
    ],
    toBeFlow: [
      {
        title: "사전 차단",
        summary: "가이드라인을 규칙으로 만들어 노출 전에 막는다",
        nodes: [
          { kind: "human", label: "브랜드 가이드라인 정의", note: "무엇이 부적합인지" },
          { kind: "agent", agent: "①", label: "지면 적합성 판정" },
          { kind: "agent", agent: "①", label: "부적합 지면 차단", note: "Smart Safe" },
        ],
      },
      {
        title: "체력 측정",
        summary: "브랜드 신호를 상시로 모아 지수화한다",
        nodes: [
          { kind: "agent", agent: "②", label: "자발적 검색량 추이" },
          { kind: "agent", agent: "②", label: "소셜 바이럴 추천 지수" },
          { kind: "agent", agent: "②", label: "팬덤 지수 집계" },
        ],
      },
      {
        title: "동시 판단",
        summary: "단기 성과와 체력을 한 화면에서 본다",
        nodes: [
          { kind: "agent", agent: "②", label: "통합 대시보드" },
          { kind: "branch", label: "매출↑ 체력↓", yes: "알림 발생", no: "유지" },
          { kind: "human", label: "예산 배분 재조정", note: "판단은 사람" },
        ],
      },
    ],
    humanOnly:
      "무엇이 '브랜드에 맞지 않는가'는 정의부터 사람이 한다. 시스템은 그 정의를 집행할 뿐이다.",
    agents: [
      {
        no: "①",
        name: "Smart Safe 엔진",
        desc: "브랜드 가이드라인을 판정 규칙으로 바꿔, 부적합한 매체 지면 노출을 사전에 완전 통제한다.",
      },
      {
        no: "②",
        name: "브랜드 체력 지수 모니터",
        desc: "자발적 검색량·소셜 바이럴 추천·팬덤 지수를 상시 집계해 단기 성과와 함께 대시보드로 보여주고, 괴리가 생기면 알린다.",
      },
    ],
    impact: 3,
    ease: 2,
    priority: "중장기 과제",
  },
];

export const findIdea = (slug: string) => DEV_IDEAS.find((i) => i.slug === slug);

/** 우선순위 매트릭스에 함께 얹는 후보 — 이번 개발 범위는 아니지만 목록에서 빠지면 안 된다 */
export const BACKLOG: { name: string; origin: string; impact: number; ease: number; why: string }[] =
  [
    {
      name: "모듈형 에셋 시스템",
      origin: "D-2",
      impact: 4,
      ease: 2,
      why: "개발보다 크리에이티브 설계가 앞서야 한다 — 후킹×편익×엔딩 규격이 먼저 서야 시스템이 붙는다.",
    },
    {
      name: "AI UGC 확장",
      origin: "D-4",
      impact: 3,
      ease: 2,
      why: "인플루언서 초상 학습은 권리 처리가 선행 과제다.",
    },
    {
      name: "터치포인트 기여도 추적",
      origin: "C-2",
      impact: 5,
      ease: 1,
      why: "모든 터치포인트 수집은 데이터 확보 범위와 개인정보 검토가 먼저다.",
    },
  ];

/* ════════════════ 과제 정의서 (1건 상세) ════════════════ */

export const TASK_SPEC = {
  ideaSlug: "signal-copy",
  agent: "신호 수집 에이전트 + 카피 생성 에이전트",
  valueChain: "시장 분석 → 크리에이티브 제작 (실시간 대응 구간)",
  why: "중점 과제 중 파급효과가 가장 크고 실행 용이성이 높은 1건을 상세 정의한다.",
  functions: [
    {
      t: "신호 소스 자동 조회",
      d: "검색 트렌드 API · 날씨 API · 소셜/커뮤니티 크롤링 · 경쟁사 광고를 주기적으로 조회해 원천 데이터를 모은다.",
    },
    {
      t: "변화율·임계치 필터링",
      d: "전일·전주 대비 변화율을 계산하고, 임계치를 넘는 키워드만 급상승 후보로 남긴다.",
    },
    {
      t: "신호–업종 매핑",
      d: "규칙 테이블로 신호를 업종·브랜드에 붙인다. 데이터가 쌓이면 임베딩 유사도 매칭으로 고도화한다.",
    },
    {
      t: "카피 다안 생성",
      d: "업종별 템플릿·톤앤매너에 키워드를 삽입해 LLM으로 여러 안을 만들고, 담당자에게 선택지로 제시한다.",
    },
  ],
  effects: [
    "신호 감지에서 소재 집행까지의 리드타임 단축",
    "담당자별 신호 누락(휴먼 에러) 최소화",
    "업종 템플릿 축적으로 카피 품질 편차 감소",
  ],
  kpis: {
    agent: [
      "급상승 후보 정밀도 — 담당자가 채택한 신호 / 제시한 신호",
      "신호 감지 지연 — 실제 급상승 시점과 알림 시점의 차",
      "카피 안 채택률 — 생성 안 중 실제 집행된 비율",
    ],
    business: ["신호 → 집행 리드타임", "실시간 대응 소재의 CTR/CVR", "소재 제작 공수(Man-Hour)"],
  },
  phases: [
    {
      p: "Phase 1",
      when: "~2개월",
      what: "PoC — 신호 소스 2종(검색 트렌드 · 날씨)과 업종 1개로 파이프라인을 끝까지 관통시킨다. 카피는 담당자 검수 필수.",
    },
    {
      p: "Phase 2",
      when: "2~4개월",
      what: "소셜·커뮤니티 크롤링과 경쟁사 광고 수집을 붙이고, 업종 템플릿을 확장한다. 매핑 테이블을 운영 데이터로 보정한다.",
    },
    {
      p: "Phase 3",
      when: "4개월~",
      what: "메타/구글 Asset API 연동으로 선택된 안을 바로 집행한다. 성과–비주얼 분석 에이전트와 연결해 생성 품질을 되먹인다.",
    },
  ],
} as const;

/* ════════════════ Action 단위 Workflow ════════════════ */

export const ACTION_FLOW = {
  agent: "신호 수집 · 카피 생성 에이전트",
  lead: "Agent 의 Activity 를 Action 단위로 세분화하고 선후행 관계를 연결한다.",
  actions: [
    { n: 1, t: "신호 소스 스케줄 조회", d: "시간 단위 폴링", agent: true },
    { n: 2, t: "원천 데이터 정규화", d: "소스별 스키마 → 공통 포맷", agent: true },
    { n: 3, t: "전일·전주 대비 변화율 계산", d: "키워드별 시계열", agent: true },
    { n: 4, t: "임계치 초과 후보 추출", d: "예: 전일 대비 200%↑", agent: true },
    { n: 5, t: "신호–업종 매핑", d: "규칙 테이블 조회", agent: true },
    { n: 6, t: "매핑 실패 시 보류 큐", d: "테이블 보강 대상으로 적재", agent: true },
    { n: 7, t: "업종 템플릿 선택", d: "톤앤매너 프리셋", agent: true },
    { n: 8, t: "LLM 카피 다안 생성", d: "안 3~5개", agent: true },
    { n: 9, t: "브랜드 금칙어 필터", d: "가이드 위반 안 제거", agent: true },
    { n: 10, t: "담당자 선택 · 승인", d: "Human", agent: false },
    { n: 11, t: "매체 Asset API 업로드", d: "선택된 안만", agent: true },
  ],
} as const;

/* ════════════════ 시스템 구성 ════════════════ */

export const ARCHITECTURE: { layer: string; accent: Accent; items: string[] }[] = [
  {
    layer: "데이터 소스",
    accent: "blue",
    items: [
      "검색 트렌드 API · 날씨 API",
      "소셜 리스닝 · 커뮤니티 크롤링",
      "경쟁사 광고 수집",
      "매체 리포트 (노출 · CTR/CVR · 전환)",
      "집행 소재 원본 · 브랜드 가이드북",
    ],
  },
  {
    layer: "처리 · 저장",
    accent: "teal",
    items: [
      "수집 스케줄러 · 정규화 파이프라인",
      "소재 × 특징 × 성과 통합 테이블",
      "신호–업종 매핑 테이블",
      "비주얼 특징 추출 · 상관 분석",
      "운영 룰 엔진 · 임계치 관리",
    ],
  },
  {
    layer: "생성 · 판정",
    accent: "violet",
    items: [
      "LLM 카피 생성 (업종 템플릿)",
      "숏폼 하이라이트 스코어링 · 자동 편집",
      "브랜드 금칙어 · 지면 적합성 판정",
      "신규 소재 스코어링",
    ],
  },
  {
    layer: "산출 · 연동",
    accent: "navy",
    items: [
      "메타 / 구글 Asset API",
      "운영 대시보드 · 교체 알람",
      "브랜드 체력 지수 대시보드",
      "담당자 승인 큐",
    ],
  },
];

/* ════════════════ 파생 값 ════════════════ */

export const DEV_STATS = {
  ideas: DEV_IDEAS.length,
  agents: DEV_IDEAS.reduce((n, i) => n + i.agents.length, 0),
  focus: DEV_IDEAS.filter((i) => i.priority === "중점 과제").length,
  backlog: BACKLOG.length,
};
