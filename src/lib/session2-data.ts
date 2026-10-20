/**
 * 사내 교육 2회차 콘텐츠 — **본문 문장의 단일 출처.**
 *
 * 원문은 `doc/AI 2회차 강의_목록 정리.pptx` (16장)이고 **순서를 그대로 지킨다.**
 * 슬라이드([session-2.tsx](../components/slides/session-2.tsx))는 배치만 하고 문장을 적지 않는다
 * — 1회차를 뺀 다른 자료(`hsad-data` · `lab-data`)와 같은 구조다.
 *
 * ⚠️ **원문은 제목과 화면 캡처가 거의 전부다.** 그래서 아래 설명 문장은 대부분
 *    원문의 제목·캡처를 풀어 쓴 것이고, 원문에 그대로 있던 문장은 `verbatim: true` 로 표시한다.
 *    발표자가 말로 채우던 자리이므로, 사실이 아닌 내용을 넣지 않도록 화면에 보이는 것만 적었다.
 */

import { wb } from "./projects";

/** 캡처 이미지는 프로젝트 접두사 안에 둔다 — 그래야 게이트가 이미지까지 막는다 */
const SHOTS = wb("/session-2");

export interface Shot {
  src: string;
  /** 화면 낭독용 대체 텍스트 — 무엇을 하는 화면인지까지 적는다 */
  alt: string;
}

const shot = (file: string, alt: string): Shot => ({ src: `${SHOTS}/${file}`, alt });

/* ────────────────────────────────────────────────────────────
   덱 메타
   ──────────────────────────────────────────────────────────── */

export const S2_META = {
  title: "API와 MCP, 그리고 키값 관리",
  chip: "2회차",
  eyebrow: "2회차 · API · MCP · 키값 관리",
  lead:
    "1회차에서 만든 개발 환경 위에, 외부 서비스를 끌어다 쓰는 방법을 얹습니다. " +
    "API로 기능을 빌려오고, MCP로 AI에 도구를 물리고, 그 열쇠가 되는 키값을 안전하게 관리합니다.",
  agenda: [
    { no: "00", t: "복습", d: "깃허브 레포지토리를 만들고 내 컴퓨터로 가져오기" },
    { no: "01", t: "API", d: "서로 다른 프로그램이 대화하는 창구" },
    { no: "02", t: "MCP", d: "AI에게 도구를 쥐여 주는 연결 규격" },
    { no: "03", t: "키값 관리", d: "로컬 .env.local 과 Vercel 환경변수" },
  ],
  /** 원문에 없어 화면에 적어 두는 주의 — 여러 슬라이드가 같은 문장을 쓴다 */
  shotCaveat: "화면은 강의 당시 캡처입니다. 서비스 UI는 바뀔 수 있습니다.",
} as const;

/* ────────────────────────────────────────────────────────────
   00 복습 — 깃허브에서 시작하기 (원문 1~5장)
   ──────────────────────────────────────────────────────────── */

export const RECAP = {
  /** 원문 1장 그대로 */
  verbatim: true,
  title: "복습",
  steps: [
    { t: "깃허브 신규 레포지토리 생성", d: "작업할 프로젝트의 원본이 놓일 자리를 만든다" },
    { t: "내 컴퓨터로 클론하기", d: "클론 = 내 컴퓨터로 복제" },
    { t: "VS 코드로 작업 시작하기", d: "가져온 폴더를 열어 그 자리에서 작업한다" },
  ],
} as const;

export const RECAP_SHOTS = [
  {
    no: "01",
    title: "레포지토리 생성",
    lead: "깃허브 Repositories 에서 New repository 로 시작합니다.",
    points: ["우측 상단 초록색 New repository 버튼", "내가 참여 중인 레포 목록도 이 화면에서 본다"],
    shot: shot("repo-new.png", "GitHub Repositories 화면 — 우측 상단 New repository 버튼이 강조돼 있다"),
  },
  {
    no: "02",
    title: "레포지토리 설정",
    lead: "이름을 정하고, 공개 범위를 고른 뒤 만듭니다.",
    points: [
      "Repository name — 짧고 기억하기 쉬운 이름",
      "Visibility — 사내 작업물은 Private",
      "마지막에 Create repository",
    ],
    shot: shot("repo-create.png", "Create a new repository 화면 — 이름 입력칸, Private 선택, Create repository 버튼이 강조돼 있다"),
  },
  {
    no: "03",
    title: "레포지토리 클론값 복사",
    lead: "만든 레포의 Code 버튼에서 HTTPS 주소를 복사합니다.",
    points: ["초록색 Code ▾ 버튼", "Local 탭 · HTTPS", "옆의 복사 아이콘으로 주소를 복사"],
    shot: shot("repo-clone-url.png", "레포지토리 화면에서 Code 버튼을 눌러 HTTPS 클론 주소를 복사하는 모습"),
  },
] as const;

export const RECAP_CLONE = {
  title: "클론 실행",
  lead: "복사한 주소를 저장 위치와 함께 그대로 지시합니다.",
  /** 원문 5장의 문장 (원문 표기 그대로) */
  verbatimPrompt: "내 컴퓨터 [저장 위치] 에 기 허브의 [프로젝트 값] 클론해",
  slots: [
    { k: "[저장 위치]", v: "내 컴퓨터에서 프로젝트를 둘 폴더 경로" },
    { k: "[프로젝트 값]", v: "앞에서 복사한 깃허브 클론 주소" },
  ],
  shot: shot("clone-prompt.png", "Claude Code 입력창에 저장 위치와 깃허브 주소를 넣어 클론을 지시한 모습"),
} as const;

/* ────────────────────────────────────────────────────────────
   01 API (원문 6~8장)
   ──────────────────────────────────────────────────────────── */

export const API_DEF = {
  /** 원문 7장 그대로 — 정의 문장은 손대지 않는다 */
  verbatim: true,
  full: "Application Programming Interface (응용 프로그램 프로그래밍 인터페이스)",
  body:
    "서로 다른 소프트웨어들이 서로 대화하고 기능을 공유할 수 있도록 만든 규칙과 소통의 창구를 뜻합니다.",
  shot: shot("api-keys.png", "OpenAI 관리 화면의 API keys 목록 — Secret Key 열이 강조돼 있다"),
  shotNote: "발급받은 키는 이런 목록에서 관리합니다. 값 자체는 발급 순간에만 보입니다.",
} as const;

export const API_FLOW = {
  /** 원문 8장 — 세 칸의 제목과 예시는 원문 그대로 */
  verbatim: true,
  title: "API 활용 순서",
  steps: [
    {
      t: "API 획득",
      d: "쓰려는 서비스에서 키를 발급받는다",
      items: ["Claude API", "ChatGPT API", "Gemini API", "Meta API"],
      itemsLabel: "예시",
    },
    {
      t: "API 등록",
      d: "발급받은 키를 프로젝트에 등록한다",
      items: [".env.local"],
      itemsLabel: "두는 곳",
    },
    {
      t: "개발에 활용",
      d: "등록한 키를 쓰도록 시킨다",
      items: ["Claude에게 지시"],
      itemsLabel: "방법",
    },
  ],
} as const;

/* ────────────────────────────────────────────────────────────
   02 MCP (원문 9~12장)
   ──────────────────────────────────────────────────────────── */

/**
 * 원문(수정본) 10~12장 — **세 장 모두 제목이 「MCP 연결」이다.**
 * 연결이 한 번에 끝나지 않고 화면 열기 → 고르기 → 권한 동의로 이어져서,
 * 여기서는 같은 제목 아래 단계 번호와 부제를 붙여 갈랐다(원문의 장 수와 순서는 그대로).
 */
export const MCP_STEPS = [
  {
    no: "01",
    title: "MCP 연결",
    sub: "커넥터 화면 열기",
    nav: "커넥터 화면",
    lead: "Claude 설정의 커넥터에서 지금 연결된 도구를 확인합니다.",
    points: [
      "설정 → 커넥터",
      "GitHub · Gmail · Google Drive · PlayMCP · Slack · Supabase · Vercel 등",
      "연결된 것은 상태 열에 체크로 표시된다",
    ],
    shot: shot("mcp-connectors.png", "Claude 설정의 커넥터 화면 — 연결된 도구가 상태 열에 체크로 표시돼 있다"),
  },
  {
    no: "02",
    title: "MCP 연결",
    sub: "연결할 커넥터 고르기",
    nav: "커넥터 선택",
    lead: "아직 연결되지 않은 커넥터의 연결 버튼을 누릅니다.",
    points: [
      "전체 · 연결됨 · 연결되지 않음 탭으로 거른다",
      "목록에 없으면 우측 상단 찾아보기",
    ],
    shot: shot("mcp-connect-pick.png", "커넥터 목록에서 GitHub 연동과 PlayMCP 의 연결 버튼이 강조돼 있다"),
  },
  {
    no: "03",
    title: "MCP 연결",
    sub: "권한 동의",
    nav: "권한 동의",
    lead: "그 커넥터가 무엇을 할 수 있는지 확인하고 동의합니다.",
    points: [
      "요청 권한을 항목별로 보여준다",
      "필수 동의 항목까지 확인한 뒤 계속",
      "여기서 허용한 범위가 곧 AI가 할 수 있는 일의 범위다",
    ],
    shot: shot("mcp-connect-consent.png", "Claude 에 PlayMCP 를 연결하며 요청 권한과 필수 동의 항목을 확인하는 화면"),
  },
  {
    no: "04",
    title: "MCP 활용",
    sub: "말로 시키기",
    nav: "MCP 활용",
    lead: "연결한 뒤에는 평소처럼 말로 시킵니다.",
    points: [
      "역할 · 취재 범위 · 선정 기준 · 작성 규칙을 프롬프트에 적는다",
      "AI가 연결된 도구를 직접 호출한다",
    ],
    shot: shot("mcp-prompt.png", "Claude 대화 화면 — 게임 뉴스 큐레이션 작업의 역할·기준·규칙을 지시한 프롬프트"),
  },
] as const;

export const MCP_RESULT = {
  title: "MCP 활용 결과",
  lead: "지시 한 번으로 도구 호출과 보고까지 이어집니다.",
  shots: [
    shot("mcp-result-kakao.png", "카카오톡으로 전송된 게임뉴스 Top 10 메시지 두 건"),
    shot("mcp-result-report.png", "Claude 가 실행 결과를 정리해 보고한 화면 — 전송 결과와 검증 항목"),
  ],
  points: [
    "카카오톡 '나에게 보내기' 로 2건 전송",
    "글자 수 제한에 맞춰 1~5위 / 6~10위로 분할",
    "상세 요약은 별도 파일로 저장",
    "실행 결과와 근거를 스스로 보고",
  ],
} as const;

/* ────────────────────────────────────────────────────────────
   03 키값 관리 (원문 13~15장)
   ──────────────────────────────────────────────────────────── */

/**
 * 원문 13장의 `.env.local` 예시.
 *
 * ⚠️ **값은 전부 가렸다.** 원문도 대부분 가려 두었지만, 가려지지 않은 항목이 두 개 있어
 *    같은 규칙으로 맞췄다(교육 자료가 실제 엔드포인트를 담고 있을 이유가 없다).
 *    배울 것은 **키의 이름과 생김새**이지 값이 아니다.
 */
export const ENV_EXAMPLE = {
  title: "키값 구성 예시",
  lead: "프로젝트 루트의 .env.local 한 파일에 이름=값 형태로 쌓입니다.",
  masked: true,
  lines: [
    "NEXT_PUBLIC_SITE_URL=http://localhost:3000",
    "NEXT_PUBLIC_PUBLIC_PAGES_LOCKED=true",
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeJ7cAs————————————————",
    "NEXT_PUBLIC_SUPABASE_URL=https://————————————.supabase.co",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi————————————————",
    "SUPABASE_SERVICE_ROLE_KEY=eyJhbGciO————————————————",
    "SUPABASE_ACCESS_TOKEN=sbp_————————————————",
    "SUPABASE_DB_PASSWORD=————————————————",
    "OPENAI_API_KEY=sk-sv————————————————",
    "ANTHROPIC_API_KEY=sk-————————————————",
    "RESEND_API_KEY=re_————————————————",
    "UPSTASH_REDIS_REST_URL=\"https://————————————.upstash.io\"",
    "UPSTASH_REDIS_REST_TOKEN=\"————————————————\"",
    "RECAPTCHA_SECRET_KEY=6Le————————————————",
    "SIGNUP_SESSION_SECRET=9f————————————————",
    "GOOGLE_CLIENT_ID=57235————————————————",
    "GOOGLE_CLIENT_SECRET=GOC————————————————",
    "MOBILEINDEX_MCP_URL=https://————————————/mcp",
    "MOBILEINDEX_MCP_TOKEN=mip————————————————",
  ],
  reading: [
    { k: "NEXT_PUBLIC_ 로 시작", v: "브라우저까지 내려간다 — 비밀이 아닌 값만" },
    { k: "접두사가 없는 것", v: "서버에만 남는다 — 진짜 비밀은 여기" },
    { k: "…_KEY · …_TOKEN · …_SECRET", v: "노출되면 그 즉시 재발급 대상" },
  ],
} as const;

export const KEY_PLACES = {
  title: "키값 등록",
  lead: "같은 키를 두 곳에 등록합니다. 한 곳만 하면 다른 쪽에서 동작하지 않습니다.",
  places: [
    {
      tag: "로컬",
      title: ".env.local",
      d: "프로젝트 루트에 두는 파일. 내 컴퓨터에서 돌릴 때 이걸 읽는다.",
      points: [".gitignore 에 걸려 있어 깃허브로 따라가지 않는다", "그래서 PC를 옮기면 다시 만들어야 한다"],
      shot: shot("env-local-vscode.png", "VS Code 탐색기에서 프로젝트 루트의 .env.local 파일이 강조된 모습"),
      accent: "blue" as const,
    },
    {
      tag: "Vercel",
      title: "Environment Variables",
      d: "배포된 사이트가 읽는 곳. 프로젝트 설정에 등록한다.",
      points: ["Settings → Environment Variables", "등록한 뒤 재배포해야 이미 떠 있는 배포본에 반영된다"],
      shot: shot("vercel-env-list.png", "Vercel 프로젝트의 Environment Variables 목록 화면"),
      accent: "violet" as const,
    },
  ],
} as const;

export const KEY_HOW = {
  title: "키값 등록 방법",
  lead: "Vercel 에서는 Add Environment Variable 로 한 건씩 넣습니다.",
  steps: [
    { t: "Key", d: "변수 이름을 그대로 — .env.local 과 철자까지 같아야 한다" },
    { t: "Value", d: "발급받은 값" },
    { t: "Sensitive", d: "비밀 값이면 켠다 — 등록 후 다시 볼 수 없게 된다" },
    { t: "Environments", d: "Production and Preview 를 함께 고른다" },
  ],
  shot: shot("vercel-env-add.png", "Vercel 의 Add Environment Variable 모달 — Key·Value 입력칸이 강조돼 있다"),
  tip: ".env 파일을 통째로 넣으려면 하단의 Import .env 를 씁니다.",
} as const;

/* ────────────────────────────────────────────────────────────
   마무리 (원문 16장)
   ──────────────────────────────────────────────────────────── */

export const NEXT_UP = {
  /** 원문 16장 그대로 */
  verbatim: true,
  title: "추후 안내 예정 내용",
  items: ["Wisebirds.AI 도메인 셋팅 방법", "내부 백엔드 활용 및 보안 셋팅 방법"],
} as const;
