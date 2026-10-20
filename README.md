# Wisebirds-AX

와이즈버즈 AX 프로그램 포털입니다. 공개 포털(`/`) 아래 **프로젝트 둘**이 각자
**진입 비밀번호**로 잠겨 있습니다.

```
/                          포털 (공개) — 프로젝트 카드 둘
├ /gate/wisebirds          진입 비밀번호
└ /gate/hsad               진입 비밀번호

/wisebirds                 🔒 Wisebirds AX — 프로젝트 홈
│
├ /wisebirds/edu                     사내 교육 — 회차 목록
│ ├ …/edu/session-1                  1회차 · 개발 인프라 구축 가이드 (28장 프레젠테이션)
│ ├ …/edu/session-2                  2회차 · API · MCP · 키값 관리 (19장 프레젠테이션)
│ └ …/edu/example                    예시 · AI 프롬프트 실습 (모듈형)
│   ├ …/edu/example/m1..m5           모듈 개요
│   └ …/edu/example/1-1..5-5         개별 실습 (프롬프트 복사 · 실습 파일)
│
├ /wisebirds/library                 프롬프트 라이브러리 — 모듈·직무·도구로 찾아 바로 복사
│
└ /wisebirds/prototype               교육 사례 프로토타입
  └ …/prototype/app-ads              앱 광고 교육 중급편 (28장 프레젠테이션)

/hsad                      🔒 AX with HSAD — AI 솔루션 공동 개발 기획서
├ /hsad/background                   01 기획 배경 · 차별화 방향
├ /hsad/framework                    02 솔루션 기능 체계 (A~D 총괄)
│ └ /hsad/framework/market|target|data|creative
├ /hsad/pipeline                     03 R-PES 통합 운영 파이프라인 · 브랜드 적용 예시
├ /hsad/scope                        04 타겟 업종 · 기대 효과
└ /hsad/deck                         통합 프레젠테이션 (53장) — 기획서 + 개발 기획 + 아이디어 28건
```

포털은 프로젝트 **이름과 집계 수치까지만** 보여줍니다. 본문은 전부 게이트 뒤에 있습니다.
프로젝트 안에서는 어느 화면에서든 **⌘K**(윈도우 `Ctrl+K`)로 프롬프트를 검색합니다.

개편 전 경로(`/edu/lab/3-1` · `/edu/session-2/3-1` 등)는 308 리다이렉트로 살아 있습니다 —
**한 번에** 최종 목적지로 갑니다.

## 진입 비밀번호

[src/middleware.ts](src/middleware.ts) 가 프로젝트 경로로 들어오는 **모든** 요청을 먼저 봅니다.
페이지뿐 아니라 실습 파일 다운로드(`/wisebirds/실습파일/…`)도 같은 접두사라 함께 막힙니다.

- 비밀번호는 소스에 없습니다 — 환경변수에서만 읽습니다 (아래 [로컬 실행](#로컬-실행))
- 통과하면 `HttpOnly` 쿠키가 30일 남습니다. 쿠키 토큰은
  `HMAC(AX_SESSION_SECRET, "<프로젝트>:<비밀번호>")` 이므로 **비밀번호를 바꾸면 기존 쿠키가 저절로 무효**가 됩니다
- 한 프로젝트의 쿠키로 다른 프로젝트는 열리지 않습니다
- 환경변수가 하나라도 비어 있으면 게이트는 **닫는 쪽으로** 실패합니다

> 프로젝트마다 **공유 비밀번호 하나**입니다. 사람 단위 인증이 아니고, 누가 언제 봤는지 남지 않습니다.
> 전달받은 사람이 남에게 넘기면 그대로 열립니다.

## 사내 교육 · 1회차 — 개발 인프라 구축 가이드

처음부터 따라 하는 개발 환경 세팅 28장. Windows · macOS 양쪽 가이드를 함께 제공합니다.

| 파트 | 내용 |
| --- | --- |
| 도입 | 표지 · AGENDA · 각 도구의 역할과 데이터 흐름(다섯 도구 릴레이 + 주방 비유) |
| 01 | Node.js 설치 — nodejs.org LTS 다운로드, 설치와 `node -v` 검증 |
| 02 | 에디터 비교 — VS Code · IntelliJ · Cursor 장단점, 왜 VS Code인가 |
| 03 | VS Code 설치 — OS별 설치, 확장이 핵심, 권장 확장 7종 |
| 04 | Claude Code 확장 — `anthropic.claude-code` 설치, 로그인과 사용 |
| 05 | GitHub 연동 — Git 설치·계정 연결, Clone → Edit → Commit → Push → Pull |
| 06 | Vercel 배포 — 저장소 Import, `.vercel.app` 자동 발급, Claude Code로 배포 |
| 마무리 | 체크리스트 · 맺음말 · 코딩 가이드 4장(`.md` 다운로드 버튼 포함) |

이 장표는 **[zqendix](https://www.zqendix.com/beta/presentation)의 오픈 프리젠테이션을 그대로 이식**한 것입니다.
장표 정의는 [src/components/slides/dev-onboarding.tsx](src/components/slides/dev-onboarding.tsx) 한 파일에 원본 그대로 들어 있고,
바꾼 것은 네 곳뿐입니다 — 덱 엔진을 공용 `Deck` 으로 교체, 에셋 경로 `/beta-edu` → `/dev-edu`,
원본의 기본 배경(짝/홀 교차)을 `bgCss` 로 명시, 상단바 라벨과 표지 배지 문구.
로고 에셋은 `public/dev-edu/`(공식 브랜드 에셋) 에 있습니다.

## 사내 교육 · 2회차 — API와 MCP, 그리고 키값 관리

1회차에서 만든 개발 환경 위에 외부 서비스를 끌어다 쓰는 방법을 얹는 19장입니다.

| 파트 | 장수 | 내용 |
| --- | --- | --- |
| 표지 | 1 | 목차 4칸 |
| 00 복습 | 5 | 깃허브 레포 생성 · 설정 · 클론 주소 복사 · Claude Code 로 클론 |
| 01 API | 3 | 섹션 표지 · 정의 · 활용 순서(획득 → 등록 → 활용) |
| 02 MCP | 6 | 섹션 표지 · 연결 3단계(커넥터 화면 · 선택 · 권한 동의) · 프롬프트로 활용 · 실행 결과 |
| 03 키값 관리 | 3 | `.env.local` 구성 예시 · 로컬 · Vercel 두 곳 등록 · 등록 방법 |
| 마무리 | 1 | 추후 안내 예정 내용 |

원문은 `doc/AI 2회차 강의_목록 정리-수정.pptx`(18장)이고 **순서를 그대로** 따릅니다.
(원문 파일은 저장소에 없습니다 — 사내 드라이브에 있습니다.)
콘텐츠는 [session2-data.ts](src/lib/session2-data.ts) 한 곳에 있고,
[session-2.tsx](src/components/slides/session-2.tsx) 는 배치만 합니다.

> **원문은 제목과 화면 캡처가 거의 전부입니다.** 발표자가 말로 채우던 자리라, 화면에 보이는 것만
> 풀어 적었습니다. 원문에 문장으로 있던 것은 데이터에서 `verbatim: true` 로 표시해 둡니다.
> `.env.local` 예시의 **값은 전부 가렸습니다** — 배울 것은 키의 이름과 생김새이지 값이 아닙니다.

강의 화면 캡처 14장은 `public/wisebirds/session-2/` 에 있습니다.
**프로젝트 접두사 안이라 게이트가 이미지까지 막습니다** — 밖으로 옮기면 캡처가 그대로 샙니다.

## 예시 — AI 프롬프트 실습

원래 2회차였던 자료이며, 2026-08-12 에 **예시**(`/wisebirds/edu/example`)로 내려왔습니다.
새 2회차 자료의 형태를 미리 보여주는 참고물입니다.

광고 실무를 생성형 AI로 바꾸는 모듈형 실습입니다. 5개 모듈 25개 실습이며,
모든 프롬프트는 **역할 · 맥락 · 과업 · 지침 · 제약조건 · 출력형식** 6단 구조로 작성했습니다.

| 모듈 | 주제 |
| --- | --- |
| M1 | AI 활용 기본기 — 6단 프롬프트, 업무 적용 지도, 팩트체크, 대상별 브리핑, AI 파트너 |
| M2 | 광고 소재 · 카피 제작 — 규격 준수 카피, 타겟별 앵글, 이미지·영상 콘셉트, A/B 설계, 사전 점검 |
| M3 | 리포팅 자동화 — raw → 리포트 골격, 광고주용/내부용 분리, 레드팀 검토, HTML 대시보드, GPTs |
| M4 | 데이터 인사이트 분석 — 성과 진단, 세 관점 분석, 예산 재배분, 리텐션·LTV, 의사결정 시뮬레이터 |
| M5 | 제안 · 신규 수임 — 시장·경쟁 리서치, 경쟁사 소재 분석, 제안 스토리라인, 비주얼, 프로토타입 |

**동작 방식**

- 프롬프트 본문의 `{광고주}`·`{매체}` 같은 변수는 화면에서 **콤보박스로 바뀝니다.** 목록에 없는 값을 직접 입력해도 그대로 반영됩니다.
- `{광고주_업종}`은 광고주 선택에 따라 **자동으로 채워지고**, 값이 없으면 그 줄이 빠진 채 복사됩니다.
- 광고주를 바꾸면 `{핵심지표}`처럼 연동된 변수의 기본값도 따라 바뀝니다. 직접 수정한 값은 유지됩니다.
- **복사** 버튼은 현재 탭과 선택한 값이 반영된 프롬프트를 클립보드에 넣습니다.
- 실습 파일은 개별 다운로드와 모듈별 ZIP을 제공합니다. `←` `→` 키로 실습 간 이동합니다.

실습 파일과 프롬프트 안의 광고주·수치는 **모두 교육용 가상 데이터**입니다.
`M1_03`(매체 정책 초안)과 `M3_03`(리포트 초안)은 팩트체크·레드팀 실습용으로
**오류가 의도적으로 포함**되어 있습니다.

## 프롬프트 라이브러리

예시(구 2회차) 실습에 들어 있는 프롬프트 27개를 실습 화면을 거치지 않고 바로 찾아 쓰는 곳입니다.
콘텐츠를 따로 쓰지 않고 [lab-data.ts](src/lib/lab-data.ts) 에서 파생시키므로, 실습을 추가하면 라이브러리도 따라옵니다.

| 축 | 값 |
| --- | --- |
| 모듈 | M1 ~ M5 |
| 직무 | 매체 운영 · 광고 기획 · 데이터 분석 · 크리에이티브 · 신규 제안 (실습마다 `roles` 로 태그) |
| 도구 | GPT · Claude · Gemini · AI Studio · Perplexity · GPTs · … (실습의 `tools` 에서 자동 수집) |

- 칩의 숫자는 **다른 축을 적용한 뒤** 센 값입니다. 눌러도 0건인 조합은 비활성이라 막다른 길이 안 생깁니다.
- 검색은 제목·목표·모듈·도구·직무에 더해 **프롬프트 본문까지** 봅니다. 제목에서 맞은 것이 본문에서 스친 것보다 위로 옵니다.
- **검색은 `{변수}`가 남아 있는 원문을 봅니다.** 치환된 글을 색인하면 기본 광고주의 업종 설명이
  거의 모든 프롬프트에 섞여 들어가 `리텐션` 이 27개 중 21개를 잡습니다. 변수의 기본값은 프롬프트의 내용이 아닙니다.
- 복사되는 글은 변수가 **기본값으로 채워진 평문**이며, 실습 화면에서 아무것도 고르지 않고 복사한 것과 **글자까지 같습니다**
  (양쪽이 [prompt-text.ts](src/lib/prompt-text.ts) 하나를 씁니다 — 테스트가 이 동일성을 검사합니다).
- 값을 바꿔 쓰려면 `실습에서 열기` 로 넘어가 콤보를 조정합니다.

### 전역 검색 (⌘K)

팔레트는 루트 레이아웃에 한 번만 붙어 있어 **덱·실습 셸에서도** 단축키가 삽니다.
검색 인덱스는 프롬프트 본문 전체를 담아 수십 KB이므로 **처음 열 때 동적으로** 불러옵니다
(모든 페이지 번들에 실리지 않게). `↑` `↓` 이동 · `Enter` 열기 · `Esc` 닫기.

## 교육 사례 프로토타입 — 앱 광고 교육 중급편

정규 회차 자료가 아니라, 교육 자료를 웹 프레젠테이션으로 만들면 어떤 모습이 되는지
검증하기 위해 만든 사례입니다. 스크롤 스냅 방식 28장.

- **목표** : 앱 광고 방식의 확장
- **A. 앱 리타겟팅** — Re-engagement vs Re-attribution, MMP 핵심 설정(Appsflyer 기준), iOS 제약과 측정
- **B. iOS SKAN** — 왜 SKAN인가, Conversion Value & 다중 포스트백, 설정과 리포팅
- **C. 웹투앱 · 앱투웹** — 딥링크/Deferred Deep Link, OneLink 라우팅, 경계를 넘는 측정 연속성

기초편 PDF(`doc/`)의 브랜드·디자인 시스템을 계승했고, 각 주제는 Appsflyer/Apple 등
공식 문서를 웹 리서치로 교차확인해 작성했습니다.

## AX with HSAD — AI 솔루션 공동 개발 기획서

`doc/HSAD-plan-doc/HSAD_Wisebirds_AI솔루션_기획서_상세.md` 를 웹 문서로 옮긴 것입니다.
광고 프로세스 전 단계(시장 분석 → 타겟 도출 → 데이터 분석 → 크리에이티브 제작)를
AI로 자동화·간편화하는 퍼포먼스 브랜딩 솔루션 프레임워크입니다.

| 섹션 | 내용 |
| --- | --- |
| 01 배경 | 기존 퍼포먼스 대행사 제안과의 차별점 6축, 페인포인트 4건과 보완 솔루션 · CDJ 연계 |
| 02 기능 체계 | A 시장 분석 · B 타겟 도출(HSAD) │ C 데이터 분석 · D 크리에이티브 제작(Wisebirds) — 영역별 상세 페이지 |
| 03 R-PES | 인사이트 → 페르소나 → 실시간 크롤링 → 소재 생성 → 미디어 최적화 5단계, 브랜드 적용 예시 4건 |
| 04 대상 · 효과 | 타겟 업종·브랜드, 기대 효과 4가지 |

콘텐츠는 [hsad-data.ts](src/lib/hsad-data.ts) **한 곳**에 있고 목차·라우트·통계·슬라이드가 거기서 파생됩니다 —
실습 자료가 `lab-data.ts` 를 쓰는 것과 같은 구조입니다. 문서 페이지도 덱도 본문 문장을 직접 적지 않습니다
(두 곳에 따로 쓰면 내용이 갈라집니다).
확정 기능과 **아직 논의 중인 항목**(`openIssues`)은 화면에서도 점선 블록으로 구분해 둡니다.

## 통합 프레젠테이션 (`/hsad/deck`) — 53장

2026-08-04 에 **기획서 발표와 개발 기획을 한 덱으로 합쳤습니다.** 구 `/hsad/dev-deck` 은 308 로 넘어옵니다.

| 파트 | 장수 | 내용 |
| --- | --- | --- |
| 표지 | 1 | 목차 5칸 — 기획서 4파트 + 아이디어 파트(점선) |
| **개요 (취합)** | 2 | 무엇을 만드는가 · 지금 → 바뀐 뒤. 두 자료의 요지를 마케팅 언어로 줄인 앞머리 |
| 기획서 본문 | 12 | 01 배경 · 02 기능 체계 · 03 R-PES · 04 대상·효과 (내용 그대로) |
| **기능 연계도** | 1 | 3개 인풋 라인 → 생성 → 집행 → 학습 클로즈드 루프 |
| **우선순위 체크** | 7 | 아이디어 28건을 `우선 개발 / 기획 디벨럽 / 후개발` 로 **누르고 저장** |
| **아이디어 정리** | 28 | 분류 · 핵심 개요 · As-is·Pain · To-be·기대효과 · 전제(개발 병목) |
| 시스템 구성 | 1 | 4계층 아키텍처 + Phase 3단계 로드맵 |
| 마무리 | 1 | 기획서 결론 + 개발 파트의 약속 |

앞머리 개요를 뺀 **36장은 `doc/HSAD-plan-doc/HSAD_WB_AI_Solution_Ideas.pptx` 의 순서를 그대로** 따릅니다.
콘텐츠는 [hsad-ideas-data.ts](src/lib/hsad-ideas-data.ts) 한 곳에 있고, 원문 개요의 `전제 :` 줄은
`premise` 로 따로 빼서 점선으로 그립니다 — **개발 병목이 거기 모여 있습니다.**

아이디어 색은 곧 단계입니다: ① 기획 blue · ② 생성 violet · ③ 집행 coral · ④ 학습 teal.
아이디어 파트 전체는 배경(`bg-page-alt`)으로 앞쪽 기획서 파트와 구분됩니다.

### 우선순위 체크 — 눌러서 저장됩니다

원문 PPTX 2~8장의 체크 칸을 화면에서 실제로 씁니다.

- 아이디어당 **한 칸만** 켜집니다(세 열짜리 우선순위 표). 같은 칸을 다시 누르면 해제됩니다
- 상태는 [priority-store.ts](src/lib/priority-store.ts) 하나가 갖고 **`localStorage` 에 저장**됩니다 —
  새로고침·덱 이동 후에도 남습니다. 일곱 슬라이드가 같은 스토어를 보므로 어디서 눌러도 합계가 함께 움직입니다
- 서버가 없어 **다른 사람에게는 넘어가지 않습니다.** 회의 결과를 공유하려면 `결과 복사` 로
  그룹 순서대로 정리된 평문을 클립보드에 담습니다(체크 안 한 항목은 `미정` 으로 남습니다)

> ⚠️ **As-Is 흐름과 우선순위·KPI·기간은 제안값입니다.** 합의된 내용과 섞이지 않게
> [hsad-dev-data.ts](src/lib/hsad-dev-data.ts) 의 `DEV_META` 에 경고 문구를 한 곳에 두고
> 여러 슬라이드가 같은 문장을 씁니다.

## PDF 저장

모든 프레젠테이션의 상단 바 우측에 **PDF** 버튼이 있습니다. 브라우저 인쇄를 그대로 쓰므로
글자가 벡터로 남고(검색·복사 가능) 폰트·그라디언트가 깨지지 않습니다 —
캔버스로 굽는 방식은 전부 이미지가 됩니다.

한 장 = 한 페이지로 떨어뜨리는 규칙은 [globals.css](src/app/globals.css) 의 `@media print` 에 있습니다.
셸(`fixed inset-0`)을 풀고, 화면 전용 크롬(바 · 도트 네비 · 진행바 · SCROLL 버튼)과 장식층을 감추고,
framer-motion 이 화면 밖 슬라이드에 걸어둔 `opacity:0` 을 전부 펴 주고,
`zoom: 0.8` 로 슬라이드를 설계 폭에 배치한 뒤 종이에 맞춰 축소합니다
(인쇄 폭이 화면보다 좁아 그대로 흘리면 내용이 세로로 늘어나 두 페이지로 넘칩니다).

`tests/deck.spec.ts` 가 덱 4개 전부에 대해 실제로 PDF 를 뽑아 **쪽수 == 슬라이드 수**와
**색이 남아 있는지**를 검사합니다. 인쇄는 화면이 멀쩡해도 조용히 깨지기 때문입니다.
(우선순위 체크의 `결과 복사`·`초기화` 버튼은 `.deck-chrome` 이라 인쇄에서 빠지고, 체크 표시는 남습니다.)

> **PDF 가 흑백으로 나온다면** 브라우저 인쇄 창의 `색상` 항목을 **컬러**로 두세요.
> 사이트가 만들어내는 PDF 자체는 컬러입니다(위 테스트가 이를 검사합니다).
> `배경 그래픽` 체크는 켜지 않아도 됩니다 — `print-color-adjust: exact` 가 대신합니다.
> 인쇄 창의 설정은 웹에서 코드로 강제할 수 없어, 이 부분만은 안내로 남습니다.

## 덱 조작 (1회차 · 프로토타입 · HSAD 공통)

| 동작 | 방법 |
| --- | --- |
| 다음/이전 슬라이드 | 스크롤, `↓`/`↑`, `PageDown`/`PageUp`, `Space` |
| 특정 슬라이드로 이동 | 우측 목차 클릭 |
| 처음/끝으로 | `Home` / `End` |

## 기술 스택

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 3** — 라이트 바이올렛 톤 (`src/lib/theme.ts`의 `ACCENTS`)
- **Framer Motion** — 스크롤 진입 애니메이션
- **lucide-react** — 아이콘
- **Pretendard**(본문) · **Space Grotesk**(디스플레이) · **JetBrains Mono**(코드) — CDN

### 상단 바 — 사이트에 단 하나

모든 라우트가 [TopBar](src/components/site/TopBar.tsx) **하나**를 씁니다. 페이지는 자체 헤더를 만들지 않고,
좌측 `[로고][프로젝트 배지] │ [자료명][배지] │ [← 뒤로]` 와 우측 슬롯(`TopBarNav` · `TopBarNote` ·
`TopBarCounter` · `ChromeDivider` · `TopBarButton` 키트)만으로 구성됩니다.
크롬 조각은 [chrome.tsx](src/components/site/chrome.tsx) 에 모여 있습니다.

로고 옆 배지 한 자리가 **지금 어느 프로젝트 안인지**를 말합니다 — 와이즈버즈 `AX`, HSAD `AX × HSAD`.
색은 라우트와 무관하게 violet 하나로 고정해 "하나의 바"라는 인상을 유지합니다.
네비 항목과 검색 버튼 노출도 `SiteHeader project=` 하나로 정해집니다.

폭·높이·적층 순서·**프로젝트 경로** 같은 값은 흩뿌리지 않고 단일 출처에서만 옵니다
(`max-w-page` · `--topbar-h` · `z-*` · [projects.ts](src/lib/projects.ts) 의 `wb()` · `p()`).
**지켜야 할 계약과 그렇게 만든 이유는 [CLAUDE.md](CLAUDE.md) 에 모아 두었습니다** — 상단 바를 건드리기 전에 그 파일을 읽으세요.
`tests/routes.spec.ts` · `tests/deck.spec.ts` · `tests/gate.spec.ts` 가 이 계약들을 실제로 검사합니다.

### 브랜드 에셋

공식 CI 세트가 `public/brand/` 에 있습니다(파일명은 CI 원본 그대로 유지).
코드에서는 경로를 직접 쓰지 말고 [WisebirdsLogo](src/components/Logo.tsx) 를 씁니다 —
`variant`(horizontal · stacked · symbol) × `tone`(color · mix · white · line) 조합이며,
`height` 만 넘기면 원본 비율로 폭이 계산되어 비율 왜곡·레이아웃 밀림이 없습니다.
파일명이 바뀌면 그 컴포넌트의 `FILES` 만 고치면 전부 반영됩니다.

favicon([src/app/icon.png](src/app/icon.png)) · apple-touch-icon · 공유 미리보기
([public/images/og/og-default.jpg](public/images/og/og-default.jpg))는 CI 심볼·가로형에서 생성했습니다.
자세한 대응표는 [public/brand/README.md](public/brand/README.md) 참고.

### 입체감 토큰

평면적인 화면을 피하기 위해 elevation 단계를 토큰으로 정의해 씁니다
([tailwind.config.ts](tailwind.config.ts), [globals.css](src/app/globals.css)).

| 토큰 | 용도 |
| --- | --- |
| `shadow-e1` / `e2` / `e3` | 그림자 세 단계 — 가까운 그림자는 좁고 진하게, 먼 그림자는 넓고 옅게 겹친다 |
| `shadow-raise` / `raiseHover` | 위쪽 1px 하이라이트를 얹은 떠 있는 카드 (기본 카드 표면) |
| `shadow-pill` | 작은 칩 — 위쪽 하이라이트 + 얕은 그림자 |
| `bg-surface-raise` | 위가 밝고 아래로 어두워지는 카드 면 (광원이 위에 있는 것처럼) |
| `bg-surface-sunken` | 가라앉은 섹션 배경 — 카드와 대비를 만든다 |
| `bg-hero-spot` | 히어로 스포트라이트 그라디언트 |
| `.bg-grid-fine` · `.mask-fade-y` | 미세 격자 배경과 위·아래 페이드 마스크 |
| `.edge-top` | 카드 상단 1px 하이라이트 |

섹션은 `bg-white` ↔ `bg-surface-sunken` 을 번갈아 배치해 층이 보이게 합니다.

## 로컬 실행

```bash
npm install
```

게이트 때문에 `.env.local` 이 필요합니다 (커밋되지 않습니다):

```bash
# 쿠키 서명 키 — node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AX_SESSION_SECRET=…
# 프로젝트별 진입 비밀번호
AX_PW_WISEBIRDS=…
AX_PW_HSAD=…
```

배포에는 Vercel → Settings → Environment Variables 에 **같은 이름 세 개**를 등록합니다.
등록하지 않으면 게이트가 닫힌 채로 열리지 않습니다.

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속.

> ⚠️ `npm run dev`가 실행 중일 때 `npm run build`를 돌리면 `.next`가 깨집니다
> (증상: 스타일 없는 화면, `Cannot find module ./vendor-chunks`).
> 둘 중 하나만 실행하고, 깨졌으면 `.next`를 삭제한 뒤 다시 시작하세요.

## 검증

```bash
npm run verify     # lint → typecheck → build 한 번에
npm run test:e2e   # 프로덕션 빌드 후 Playwright 스모크 (:3100)
```

| 명령 | 하는 일 |
| --- | --- |
| `npm run lint` | ESLint 9 (`next/core-web-vitals` · `next/typescript`) — [eslint.config.mjs](eslint.config.mjs) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | [tests/](tests/) — 게이트·라우트·리다이렉트·첨부파일·상단 바·덱 조작·프롬프트 복사·라이브러리·⌘K |

스모크 테스트는 **프로덕션 빌드**를 대상으로 돕니다(배포와 같은 산출물).
사이트 전체가 게이트 뒤에 있으므로 Playwright 프로젝트를 셋으로 나눕니다 —
`setup`(게이트를 폼으로 한 번 통과해 쿠키 저장) · `gate`(게이트 자체를 보므로 **비로그인**) ·
`chromium`(나머지 전부, 저장된 상태를 물려받음). 테스트용 비밀번호는
[tests/gate-secrets.ts](tests/gate-secrets.ts) 하나에서 오고 임시 서버만 여는 값입니다.

검사하는 것은 —

- 전 라우트 200, 없는 slug 404, 구 경로 10개의 308 리다이렉트(**한 번에** 새 목적지로 가는지)
- 잠긴 경로가 게이트로 튕기고 `next` 로 돌아갈 곳을 잃지 않는지,
  **실습 파일·ZIP 다운로드도 막히는지**, 한 프로젝트 쿠키로 다른 프로젝트가 열리지 않는지,
  `?next=` 로 외부 주소에 보낼 수 없는지(오픈 리다이렉터 방지)
- 참조된 실습 파일 13개와 모듈 ZIP 5개가 실제로 내려받히는지 (빈 ZIP 도 잡는다)
- `banner`·`main` 랜드마크가 라우트당 하나씩, **바 높이가 모든 라우트에서 동일**, 360px 폭에서 가로 넘침 없음
- 덱 28장 · `↓↑` `Home` `End` · 목차 점프 · 슬라이드 높이가 `뷰포트 − 바` 와 정확히 일치
- 프롬프트 탭 전환, 변수 치환 후 복사(미치환 `{토큰}` 잔류 검사), 광고주 연동 자동값, 직접 입력값 보존
- 실습 목차 드로어의 `inert` 토글과 `←` `→` 실습 이동
- 라이브러리 3축 필터와 겹침 카운트, **검색 정밀도**(`리텐션` → 1건, `이커머스` → 0건), 스니펫에 잘린 토큰 없음
- **라이브러리 복사본과 실습 복사본이 글자까지 같은지**, ⌘K 가 덱 셸에서도 열리고
  **공개 포털에는 없는지**(프롬프트 인덱스가 잠금 밖으로 나가지 않게)

`main` 푸시와 PR 에서 같은 순서로 [CI](.github/workflows/ci.yml) 가 돕니다.

## 빌드 & 배포

```bash
npm run build   # 프로덕션 빌드 (포털·게이트만 동적, 나머지는 정적 프리렌더)
npm run start   # 빌드 결과 실행
```

Vercel에 배포되어 있습니다 — https://wisebirds-ax-edu.vercel.app/
(`main` 푸시 시 자동 빌드)

> ⚠️ 게이트 환경변수 세 개(`AX_SESSION_SECRET` · `AX_PW_WISEBIRDS` · `AX_PW_HSAD`)를
> Vercel에 등록하고 **재배포**해야 합니다. Vercel은 환경변수를 배포 시점에 함수 환경에 굽기 때문에,
> 등록만 하고 재배포하지 않으면 이미 떠 있는 배포본은 계속 '게이트가 아직 설정되지 않았습니다'를 띄웁니다.
> 값을 바꿀 때도 재배포가 필요하며, 그 시점에 기존 쿠키가 자동으로 무효가 됩니다.

## 구조

```
src/
  middleware.ts                  # 진입 게이트 — 프로젝트 경로 전체를 여기서 먼저 본다
  app/
    layout.tsx                   # 루트 레이아웃 · 메타데이터 template · og
    icon.png                     # favicon (CI 심볼)
    apple-icon.png               # apple-touch-icon
    globals.css                  # 폰트 · 입체감 유틸 · 그라디언트 텍스트
    robots.ts                    # 포털만 허용, 프로젝트·게이트는 Disallow
    page.tsx                     # 포털 (공개) — 쿠키를 읽어 잠김/열림을 그린다
    gate/
      actions.ts                 # 비밀번호 확인 Server Action
      [project]/page.tsx         # 게이트 화면 (+ GateForm.tsx)
    hsad/
      layout.tsx                 # HSAD 프로젝트 셸 (noindex)
      page.tsx                   # 기획서 첫 화면 — 프로세스 4단계 + 목차
      background/page.tsx        # 01 배경 · 차별화
      framework/
        page.tsx                 # 02 기능 체계 총괄
        [area]/page.tsx          # A·B·C·D 영역 상세 (데이터에서 파생)
      pipeline/page.tsx          # 03 R-PES · 브랜드 적용 예시
      scope/page.tsx             # 04 타겟 업종 · 기대 효과
      deck/page.tsx              # 통합 프레젠테이션 진입 (53장 — 구 dev-deck 은 308 로 넘어온다)
    wisebirds/
      layout.tsx                 # 프로젝트 셸 — ⌘K 팔레트가 여기 한 번만 붙는다 (noindex)
      page.tsx                   # 프로젝트 홈 (구 랜딩)
      edu/
        page.tsx                 # 사내 교육 — 1회차 · 2회차 · 예시 카드
        session-1/page.tsx       # 1회차 덱 진입
        session-2/page.tsx       # 2회차 덱 진입 (19장)
        example/                 # 예시 — 구 2회차. 경로는 lab-data 의 LAB_BASE 가 소유한다
          layout.tsx             # 실습 공통 크롬
          page.tsx               # 실습 랜딩 (통계는 데이터에서 계산)
          [slug]/page.tsx        # m1..m5 모듈 개요 · 1-1..5-5 개별 실습
      library/page.tsx           # 프롬프트 라이브러리
      prototype/
        page.tsx                 # 교육 사례 프로토타입 목록
        app-ads/page.tsx         # 앱 광고 중급편 덱 진입 (슬라이드 레지스트리)
  components/
    Deck.tsx                     # 스크롤 스냅 컨트롤러 · 활성 추적 · 키보드 (eyebrow/chip/bgCss 옵션)
    SideNav.tsx                  # 덱 우측 목차
    Logo.tsx                     # 와이즈버즈 CI (variant/tone/height)
    slide-kit.tsx                # 공용 슬라이드 컴포넌트(카드/플로우/표/키포인트 등)
    slides/
      intro·retargeting·skan·web2app·closing.tsx   # 앱 광고 중급편 본문
      dev-onboarding.tsx         # 1회차 개발 온보딩 28장 (zqendix 원본 이식)
      session-2.tsx              # 2회차 API·MCP·키값 19장 (문장은 session2-data 에서 온다)
      hsad-plan.tsx              # HSAD 기획서 본문 + HSAD_DECK_SLIDES(53장) 합성 지점
      hsad-ideas.tsx             # 개요 2장 + 아이디어 파트 37장 (문장은 hsad-ideas-data 에서 온다)
    site/
      TopBar.tsx                 # 사이트 유일 상단 바 + 우측 슬롯 키트
      chrome.tsx                 # 크롬 공통 조각(pill·구분선·UpLink·SheetHeader·PageHero)
      SiteChrome.tsx             # TopBar 래퍼(SiteHeader) + 푸터 — 네비는 projects.ts 에서
      SearchPalette.tsx          # ⌘K 팔레트(프로젝트 레이아웃) + 상단 바 검색 버튼
      HeroCanvas.tsx             # 히어로 배경 캔버스
      HeroDeckMock.tsx           # 히어로 우측 입체 목업
    hsad/
      kit.tsx                    # 기획서 문서 조각(섹션·표·기능 목록·섹션 페이저)
      PriorityCheck.tsx          # 우선순위 체크 표 — 누르고 저장 · 합계 · 결과 복사
      workflow.tsx               # As-Is / To-Be Workflow 도식 + 범례 (통합 뒤 미사용 — NEXT.md §2)
    library/
      LibraryBrowser.tsx         # 검색 + 3축 필터 + 결과 목록
      FilterRow.tsx              # 필터 한 줄 (모듈·직무·도구가 같은 모양)
      PromptResult.tsx           # 결과 한 건 — 스니펫·전문 펼치기·복사
    lab/
      LabShell.tsx               # 실습 상단바 + 목차 드로어
      PromptCard.tsx             # 프롬프트 탭 · 인라인 변수 · 복사
      Combo.tsx                  # 프롬프트 안에 박히는 콤보 입력
      FilesButton.tsx            # 실습 파일 팝업
      LabPager.tsx               # 이전/다음 실습
  lib/
    projects.ts                  # 프로젝트 레지스트리 — 경로·게이트 범위·배지·네비의 단일 출처
    gate.ts                      # 게이트 토큰·쿠키 규칙 (Web Crypto — middleware 와 공유)
    hsad-data.ts                 # HSAD 기획서 콘텐츠 (목차·라우트·통계가 여기서 파생)
    hsad-ideas-data.ts           # 새 아이디어 자료 (연계도 · 우선순위 7그룹 · 아이디어 28건 · 개요·병목)
    hsad-dev-data.ts             # 개발 기획 콘텐츠 (지금 쓰는 것: DEV_META · ARCHITECTURE · phases)
    priority-store.ts            # 우선순위 체크 상태 (localStorage · useSyncExternalStore)
    theme.ts                     # 액센트 토큰
    lab-data.ts                  # 실습 콘텐츠(모듈·실습·프롬프트·변수·직무·파일) + LAB_BASE(라우트)
    session2-data.ts             # 2회차 콘텐츠 (원문 PPTX 18장 순서 그대로)
    prompt-text.ts               # {변수} 치환 규칙 — 실습과 라이브러리가 공유
    lab-search.ts                # 라이브러리·⌘K 인덱스와 검색(원문 색인)
    clipboard.ts                 # 복사 (안전하지 않은 출처 대비 대체 경로)
public/
  brand/                         # 와이즈버즈 공식 CI 세트 (+ README 대응표)
  images/{hero,card,illust,og}/  # 웹 디자인용 이미지 (+ README 규칙)
  wisebirds/session-2/           # 2회차 강의 화면 캡처 14장 (게이트 범위 안)
  wisebirds/실습파일/             # 실습 첨부파일 + 모듈별 ZIP (게이트 범위 안)
  dev-edu/                       # 1회차 장표용 외부 도구 로고
tests/
  gate-secrets.ts                # 테스트 서버 전용 비번 (config 와 setup 이 함께 본다)
  auth.setup.ts                  # 게이트를 폼으로 통과해 쿠키 상태를 저장
  routes.ts                      # 라우트·파일 목록 (lab-data · projects 에서 파생)
  gate.spec.ts                   # 게이트 — 비로그인으로 돈다
  routes.spec.ts                 # 응답·리다이렉트·첨부파일·상단 바 공통 계약
  deck.spec.ts                   # 덱 조작 · 슬라이드 높이 계약
  lab.spec.ts                    # 프롬프트 복사 · 변수 연동 · 목차 드로어
  library.spec.ts                # 라이브러리 필터·검색 정밀도 · ⌘K · 복사 동일성
doc/                             # 기초편 원본 PDF
```

작업 규칙(깨지기 쉬운 계약, 단일 출처 토큰)은 [CLAUDE.md](CLAUDE.md) 에 정리되어 있습니다.

© 2026 Wisebirds Inc. All Rights Reserved.
