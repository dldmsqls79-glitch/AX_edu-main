# CLAUDE.md

와이즈버즈 AX 포털. 공개 포털(`/`) 아래 **프로젝트 둘**이 각자 비밀번호로 잠겨 있다.
작업 전에 [README.md](README.md) 의 구조·콘텐츠 설명을 읽고, 여기 있는 **깨지기 쉬운 계약**을 지킨다.

```
/                공개 포털 — 프로젝트 카드 둘
/gate/<id>       진입 비밀번호
/wisebirds/**    🔒 사내 교육 · 프롬프트 라이브러리 · 교육 사례
/hsad/**         🔒 with HSAD — AI 솔루션 공동 개발 기획서
```

## 2회차와 「예시」는 다른 자료다

2026-08-12 에 갈랐다. 원래 2회차였던 **AI 프롬프트 실습**이 `/wisebirds/edu/example`(예시)로
내려갔고, `/wisebirds/edu/session-2` 에는 **새 2회차(API · MCP · 키값 관리, 19장 덱)** 가 들어왔다.

- 실습 자료의 경로는 [lab-data.ts](src/lib/lab-data.ts) 의 **`LAB_BASE` 하나가 소유한다.**
  링크는 `labHref("/3-1")` 로 만든다 — `"/wisebirds/edu/example"` 을 손으로 적지 않는다
  (또 옮길 자료라 흩어지면 그때 전부 찾아야 한다)
- 리다이렉트는 **하위 경로만** 넘긴다(`/wisebirds/edu/session-2/:slug` → `example/:slug`).
  `session-2` 자체를 넘기면 새로 만드는 2회차가 자기 자리를 잃는다
- 개편 전 경로(`/edu/session-2/3-1`)는 `/edu/:path*` 보다 **위에서** 최종 목적지를 직접 겨눈다 —
  아래에 맡기면 두 번 튕기고 `tests/routes.spec.ts` 가 한 번인지 검사한다
- 2회차 본문은 [session2-data.ts](src/lib/session2-data.ts) **하나가 소유한다.**
  [session-2.tsx](src/components/slides/session-2.tsx) 는 배치만 한다 — 슬라이드에 문장을 적지 않는다
- 원문 `doc/AI 2회차 강의_목록 정리-수정.pptx`(18장)의 **순서를 그대로 지킨다**(원문은 저장소에 없다).
  원문 10~12장은 **셋 다 제목이 「MCP 연결」** 이라 단계 번호와 부제를 붙여 갈랐다. 원문은 제목과 캡처가 거의
  전부라 설명 문장은 대부분 풀어 쓴 것이다 — 원문에 있던 문장만 `verbatim: true` 로 표시한다
- **캡처는 `public/wisebirds/session-2/` 안에 둔다.** 프로젝트 접두사 밖으로 옮기면 게이트가 못 막는다
- **이 덱은 `Frame w={1040}` 으로 묶는다.** 기본값 1180 은 우측 도트 레일(1150~)에 물려
  캡처가 목차 라벨 아래로 들어간다(실제로 그렇게 만들었다가 고쳤다)
- **`Shot` 의 `maxH` 는 663px 예산 안에서 잡는다.** 게다가 SCROLL 칩이 바닥 60px 을 먹으므로
  본문은 **543px 이하**여야 겹치지 않는다 — 15장이 603px 이라 실제로 겹쳤다

## HSAD 기획서

원문은 `doc/HSAD-plan-doc/HSAD_Wisebirds_AI솔루션_기획서_상세.md` 이고,
그걸 옮긴 곳이 [hsad-data.ts](src/lib/hsad-data.ts) 하나다. **페이지에 본문 문장을 적지 않는다.**

- 섹션을 추가하면 `HSAD_SECTIONS` 에 넣는다 — 목차·섹션 페이저·테스트 라우트가 따라온다
- 솔루션 영역(A~D)을 추가하면 `SOLUTION_AREAS` 에 넣는다 — `/hsad/framework/[area]` 가 자동으로 생긴다
- 상단 바 네비만 `PROJECTS.hsad.nav` 에 따로 있다(짧은 라벨 큐레이션).
  섹션과 어긋나면 `tests/routes.ts` 가 네비 href 까지 200 검사하므로 드러난다
- 확정 기능과 **아직 논의 중인 항목**(`openIssues`)은 섞지 않는다 — 점선 블록으로 따로 그린다
- 원본 발표 자료가 크리에이티브 아이디어 3건을 5단계 도식으로 그렸다 → `PROCESSES`.
  **본문에 없는 단계를 여기서 만들어 넣지 않는다**

## 통합 프레젠테이션 (`/hsad/deck`) — 덱은 하나다

2026-08-04 에 기획서 발표와 개발 기획을 **한 덱으로 합쳤다.** 구 `/hsad/dev-deck` 은
`next.config.mjs` 에서 308 로 넘긴다. 배열은 [hsad-plan.tsx](src/components/slides/hsad-plan.tsx) 의
`HSAD_DECK_SLIDES` 하나가 소유한다(합성 지점).

```
표지 1 → 개요 2(취합) → 기획서 본문 12 → 아이디어 파트 37 → 마무리 1   = 53장
                                            ├ 기능 연계도 1
                                            ├ 우선순위 체크 7   ← 누르고 저장한다
                                            ├ 아이디어 정리 28
                                            └ 시스템 구성·구축 순서 1
```

- **슬라이드는 배치만 한다.** 문장은 `hsad-data.ts` · `hsad-dev-data.ts` ·
  [hsad-ideas-data.ts](src/lib/hsad-ideas-data.ts) 에서만 온다.
  앞머리 개요도 예외가 아니다 — 마케팅 언어로 줄인 문장은 `OVERVIEW`·`SHIFTS`·`BOTTLENECKS` 에 있고,
  어디서 줄였는지를 `from` 에 남긴다
- **장수가 바뀌면 `tests/deck.spec.ts` 의 `count` 도 같이 고친다** (개수·`End` 키·실제 PDF 쪽수 3곳이 쓴다)
- 기획서 본문 12장(배경·기능 체계·R-PES·대상·효과)은 `PLAN_BODY_SLIDES` 로 묶여 있다 —
  **따로 다시 손볼 예정이라 통합할 때 순서만 옮기고 노드는 건드리지 않았다**
- 아이디어 파트는 배경 `bg-page-alt` 로 앞쪽 기획서 파트와 갈린다. 상단 바 `chip` 하나를 잃은 대신
  **항상 켜져 있는** 구분 신호다(높이 비용 0)
- 아이디어 색은 곧 단계다 — ① 기획 blue · ② 생성 violet · ③ 집행 coral · ④ 학습 teal (`STAGES`)
- 도트 네비 라벨은 짧게 유지한다(`Idea.short`). 53장이라 `SideNav` 가 활성 도트를
  `scrollIntoView({block:"nearest"})` 로 따라간다 — 없으면 넘친 도트가 **아무 신호 없이** 사라진다

### 새 아이디어 자료 (`hsad-ideas-data.ts`)

원문은 `doc/HSAD-plan-doc/HSAD_WB_AI_Solution_Ideas.pptx` (36장)이고 **순서를 그대로 지킨다.**

- 원문 개요의 `전제 :` 줄은 `premise` 로 따로 뺐다 — **개발 병목이 여기 모여 있다.**
  확정 내용과 섞지 않고 점선으로 그린다
- 우선순위 체크는 [priority-store.ts](src/lib/priority-store.ts) 하나가 상태를 갖는다.
  일곱 슬라이드가 함께 보므로 **컨텍스트 프로바이더가 아니라 모듈 스토어 + `useSyncExternalStore`** 다
  (덱·셸 레이아웃을 프로바이더로 감싸지 않는다는 규칙과 같은 방향).
  저장은 `localStorage` 뿐 — 서버가 없다. 결과를 넘기려면 `formatMarks()` 로 복사한다
- 체크 칸은 아이디어당 **하나만** 켜진다(세 열짜리 우선순위 표라 다중 선택은 뜻이 없다).
  같은 칸을 다시 누르면 해제된다

### 출처가 다른 것을 섞지 않는다

`hsad-dev-data.ts` 의 To-Be·페인포인트·기대효과는 기획서에 있는 내용이고,
**As-Is 흐름은 페인포인트에서 역산해 재구성한 것**, 우선순위·KPI·기간은 **제안값**이다.
경고 문구는 `DEV_META.asIsCaveat` · `estimateCaveat` 한 곳에 있고 여러 슬라이드가 같은 문장을 쓴다 —
각 슬라이드에 따로 쓰지 않는다.

`DEV_META.closing` 은 원래 마무리 슬라이드 컴포넌트에 직접 쓰여 있던 문장을 옮긴 것이다.
[workflow.tsx](src/components/hsad/workflow.tsx)(As-Is/To-Be 도식)는 통합 뒤 **쓰는 곳이 없다** —
새 아이디어 28건은 도식 노드 데이터가 없어 산문으로 그린다. 지우거나 되살릴지는 정해야 한다.

## 덱 슬라이드 높이 예산 — 663px

덱 섹션은 `h-full` 이라 내용이 넘쳐도 **스크롤되지 않고 옆 슬라이드로 새어 나간다.**
기준은 1280×720(테스트 뷰포트)에서 상단 바를 뺀 **663px** 다 — 1440×900 으로 재면 180px 을 속는다.
인쇄 예산(916px)이 더 넉넉해서 **PDF 쪽수 테스트는 초록불인데 화면만 깨진다.**
슬라이드를 합치기 전에 이 값으로 재고, 합친 뒤 실측한다.

## 한글 조판

- `word-break: keep-all` + `overflow-wrap: break-word` 는 globals.css 에 **전역**으로 이미 있다. 다시 걸지 않는다
  (`anywhere` 로 올리면 그리드 칸의 min-content 가 바뀌어 한글이 다시 음절 단위로 끊긴다)
- 제목은 `.ko-head`(text-wrap: balance), 본문은 `.ko-body`(pretty). 줄 수를 바꾸지 않아 인쇄 높이에 영향이 없다
- 10~12px 한글에는 body 의 `-0.01em` 자간이 획을 붙인다 — 도식 라벨은 `tracking-normal` 로 되돌린다

## PDF 저장 — 인쇄를 쓴다

상단 바의 PDF 버튼은 `window.print()` 하나다. 규칙은 [globals.css](src/app/globals.css) 의 `@media print`.

- 캔버스로 굽지 않는다(html2canvas 류). 글자가 이미지가 되어 검색·복사가 안 되고 폰트가 깨진다
- 덱은 `fixed inset-0` 셸이라 그대로 인쇄하면 **한 장만** 나온다 → 인쇄에서 셸을 푼다
- **framer-motion 의 `whileInView` 를 반드시 펴 준다.** 화면 밖 슬라이드는 `opacity:0` 이라
  이 규칙이 없으면 표지 말고 전부 빈 페이지로 인쇄된다. 인라인 스타일을 이겨야 하므로 `!important`
- 화면 전용 크롬은 `.deck-chrome` 으로 표시해 인쇄에서 감춘다 — 셀렉터로 `button` 을 통째로 숨기면
  본문 버튼까지 사라진다
- **장식층은 `.deck-decor` 로 표시해 인쇄에서 뺀다.** 위 `opacity:1` 규칙이 8~13% 로 깔아둔 블롭까지
  불투명하게 만들어 표지에 진한 색 띠가 생긴다. opacity 규칙을 좁히는 쪽으로 고치면 안 된다
  (framer 가 임의 요소에 인라인으로 걸어서 셀렉터로 못 가른다)
- **한 장 = 한 페이지는 `zoom` 으로 맞춘다.** A4 가로 인쇄 폭(1062px)은 화면(1400px 안팎)보다 좁아
  그대로 흘리면 내용이 세로로 늘어나 두 페이지로 넘친다. `zoom: 0.8` 로 설계 폭에 배치한 뒤 축소한다.
  `transform` 은 레이아웃을 바꾸지 않아 페이지가 안 나뉜다. `min-height: 125vh` 와 **짝**이다(125 = 100 / 0.8)
- `* { print-color-adjust: exact }` 를 지우거나 좁히지 않는다. 실측상 이게 Chrome 의 '배경 그래픽' 끔을
  이기는 유일한 방어선이고, 없으면 어두운 배경 위 밝은 글자 디자인이 흑백처럼 무너진다
- **인쇄는 조용히 깨진다** — 화면은 멀쩡한데 PDF 만 망가진다. 그래서 `tests/deck.spec.ts` 가 덱마다
  실제로 `page.pdf` 를 뽑아 쪽수(== 슬라이드 수)와 비회색 채움 수를 검사한다.
  단 이건 헤드리스 경로다 — 인쇄 대화상자의 `색상: 흑백` 선택은 코드로 막을 수도 검사할 수도 없다
- 넓은 표는 반드시 `DocTable`([kit.tsx](src/components/hsad/kit.tsx))로 감싼다.
  표가 스스로 스크롤하지 않으면 360px 에서 문서 전체가 가로로 밀린다

## 검증

```bash
npm run verify     # lint → typecheck → build
npm run test:e2e   # 프로덕션 빌드 후 Playwright 스모크 (:3100)
```

**`.next` 는 dev 와 build 가 함께 쓰지 못한다 — 양방향 모두.**

- `npm run dev` 가 돌고 있으면 `npm run build` 를 돌리지 않는다
- **반대도 같다.** `build`(또는 `test:e2e`) 뒤에 dev 를 올리려면 **`.next` 를 먼저 지운다.**
  프로덕션 산출물 위에 dev 를 얹으면 `layout.css` 와 JS 청크가 404 로 떨어진다 —
  증상은 **스타일 없는 화면**이고, 하이드레이션이 죽어 `Reveal`(framer-motion) 안의 본문이
  `opacity:0` 인 채로 남아 **화면이 통째로 비어 보인다.** 실제로 이렇게 깨뜨린 적이 있다.
  확인은 `curl -s -o /dev/null -w "%{http_code}" localhost:3000/_next/static/css/app/layout.css`.

깨졌으면 `.next` 를 지우고 다시 시작한다.
(dev 서버가 파일 핸들을 잡고 있으면 `src/app` 하위 **디렉터리 이름 변경도** 막힌다 — 먼저 끈다.)

게이트 때문에 로컬 실행에는 `.env.local` 이 필요하다 — `AX_SESSION_SECRET` ·
`AX_PW_WISEBIRDS` · `AX_PW_HSAD`. 없으면 게이트는 **닫는 쪽으로** 실패한다(아래 참고).

## 절대 흩뿌리지 않는 값 — 단일 출처만 고친다

| 값 | 단일 출처 | 쓰는 법 |
| --- | --- | --- |
| 프로젝트 경로 | `PROJECTS` ([src/lib/projects.ts](src/lib/projects.ts)) | `wb("/edu")` · `p("hsad", …)` — `"/wisebirds/edu"` 를 손으로 적지 않는다 |
| 상단 바 높이 | `--topbar-h` (globals.css) | `h-topbar` · `top-topbar` · `pt-topbar` |
| 페이지 폭 | `maxWidth.page` (tailwind.config.ts) | `max-w-page` — `max-w-[1160px]` 금지 |
| 적층 순서 | `zIndex` (tailwind.config.ts) | `z-bar`(30) `z-rail`(40) `z-overlay`(20) `z-sheet`(50) `z-modal`(70) `z-pop`(80) |
| 액센트 색 | `ACCENTS` ([src/lib/theme.ts](src/lib/theme.ts)) | 색 리터럴 대신 토큰 |
| 브랜드 로고 | [WisebirdsLogo](src/components/Logo.tsx) 의 `FILES` | `public/brand/` 경로 직접 참조 금지 |
| 실습(예시) 콘텐츠 | [src/lib/lab-data.ts](src/lib/lab-data.ts) | 통계·라우트·목차·라이브러리가 전부 여기서 파생된다 |
| 실습(예시) 경로 | `LAB_BASE` ([src/lib/lab-data.ts](src/lib/lab-data.ts)) | `labHref("/3-1")` — `"/wisebirds/edu/example"` 를 손으로 적지 않는다 |
| 2회차 콘텐츠 | [src/lib/session2-data.ts](src/lib/session2-data.ts) | 원문 PPTX 18장 순서 그대로. 슬라이드는 배치만 한다 |
| HSAD 기획서 콘텐츠 | [src/lib/hsad-data.ts](src/lib/hsad-data.ts) | 목차·라우트·통계가 여기서 파생된다. 페이지에 본문을 적지 않는다 |
| {변수} 치환 | [src/lib/prompt-text.ts](src/lib/prompt-text.ts) | 실습·라이브러리가 **같은 함수**를 쓴다 |
| 복사 | [src/lib/clipboard.ts](src/lib/clipboard.ts) | `navigator.clipboard` 를 직접 부르지 않는다 |

랜딩 통계(`LAB_STATS`)·도구 목록(`ALL_TOOLS`)·라이브러리 항목(`PROMPT_ENTRIES`)·
테스트 라우트 목록(`tests/routes.ts`)이 모두 `lab-data.ts` 에서 계산된다.
실습을 추가하면 숫자·라이브러리·검색·테스트가 자동으로 따라온다 — **하드코딩하지 않는다.**

`projects.ts` 는 경로만이 아니라 **게이트 범위·상단 바 배지·네비·robots** 의 출처이기도 하다.
App Router 폴더명은 리터럴이라 `base` 가 폴더를 만들지는 못한다 — 폴더를 옮기면 `base` 도 같이 고친다.

## 진입 비밀번호 게이트

- 판정은 [src/middleware.ts](src/middleware.ts) 하나에서, **경로 접두사**로만 한다
  (`projectOfPath`). 그래서 페이지뿐 아니라 `public/wisebirds/실습파일/…` 다운로드도 같이 막힌다 —
  **실습 파일을 프로젝트 접두사 밖으로 옮기면 자료가 그대로 샌다.**
- 비밀번호는 소스에 두지 않는다. `PROJECTS[id].pwEnv` 가 가리키는 환경변수에서만 읽는다.
- 쿠키 토큰은 `HMAC(AX_SESSION_SECRET, "<project>:<password>")` — 비번을 바꾸면
  기존 쿠키가 **저절로** 무효가 된다(따로 세션을 지울 곳이 없다). 프로젝트 id 를 섞어
  한 프로젝트 쿠키가 다른 프로젝트에서 통하지 않는다.
- 환경변수가 하나라도 비면 **닫는 쪽으로 실패한다.** 설정 누락이 사이트를 여는 방향으로 끝나면 안 된다.
- 게이트 화면은 프로젝트 접두사 **밖**(`/gate/<id>`)에 있어야 한다 — 안에 두면 자기 자신으로 무한 리다이렉트한다.
- `?next=` 는 주소창과 Server Action 바인딩을 거쳐 오므로 믿지 않는다. `safeNext` 를 통과한
  **그 프로젝트 안의 상대 경로**만 받는다. 빼면 게이트가 오픈 리다이렉터가 된다.
- `_next/static` 은 matcher 에서 제외한다(안 그러면 게이트 화면 자체가 안 그려진다).
  즉 청크 해시 파일명을 이미 아는 사람은 받을 수 있다 — 이건 **공유 비번 수준의 잠금**이지 인증이 아니다.
- 정말 사람 단위로 막아야 하는 자료가 생기면 여기를 조이지 말고 인증 방식을 바꾼다.

## 프롬프트 라이브러리 · 검색

- **검색 색인은 `{변수}` 가 남아 있는 원문(`PromptEntry.raw`)을 본다.**
  치환된 글을 색인하면 기본 광고주(커머스 A사)의 업종 설명 "…재구매 리텐션이 핵심" 이
  거의 모든 프롬프트에 섞여 `리텐션` 이 27개 중 21개를 잡는다. 변수의 기본값은 프롬프트의 내용이 아니다.
  → 보여주고 복사하는 글만 `resolvedText(e)` 로 치환한다. 스니펫도 치환된 쪽에서 뽑는다
  (원문을 자르면 `{광고주}` 가운데서 끊겨 "… 고주} -" 가 나온다).
- **라이브러리 복사본 == 실습 복사본.** 두 곳이 `prompt-text.ts` 하나를 쓰는 이유이고,
  `tests/library.spec.ts` 가 글자 단위로 같은지 검사한다. 한쪽에만 치환 규칙을 더하지 않는다.
- ⌘K 팔레트는 **프로젝트 루트 레이아웃(`wisebirds/layout.tsx`)에 한 번만** 붙는다
  (그 아래 덱·실습 셸에서도 살아 있어야 한다). 루트 레이아웃으로 올리면 **공개 포털·게이트에도 실려
  잠근 프롬프트 인덱스가 새어 나간다** — `tests/library.spec.ts` 가 포털에 팔레트가 없는지 검사한다.
  상단 바 버튼은 `ax:search-open` 이벤트로만 말을 건다 — 컨텍스트 프로바이더로 레이아웃을 감싸지 않는다.
- `lab-search` 는 프롬프트 본문 전체를 담아 수십 KB다. 전역 헤더처럼 모든 페이지에 실리는 곳에서는
  **반드시 동적 `import()`** 로 불러온다. 정적 import 로 바꾸면 홈·교육 목록 번들이 그만큼 커진다.
- 필터 칩의 숫자는 **다른 축을 적용한 뒤** 센다. 0건인 칩은 비활성이라 막다른 길이 안 생긴다.
  칩의 라벨과 숫자 사이에는 공백이 있어야 한다 — 없으면 접근 이름이 `M35` 로 붙어 읽힌다.

## 상단 바 — 사이트에 단 하나

모든 라우트가 [TopBar](src/components/site/TopBar.tsx) **하나**를 쓴다. 페이지가 자체 헤더를 만들지 않는다.
(`banner` 랜드마크가 페이지당 하나여야 한다 — 페이지 내부에서는 `<header>` 를 쓰지 않는다.)

- **좌측** `[로고][프로젝트 배지]` │ `[자료명][배지]` │ `[← 뒤로]` — 순서 고정
- **우측** `children` 하나뿐. `TopBarNav` · `TopBarNote` · `TopBarCounter` · `ChromeDivider` · `TopBarButton` 키트만 넣는다
- **글자** `CHROME_T` 의 네 가지(base/sub/control/badge)로 제한
- **배지 톤** 항상 violet 하나 — 라우트마다 바뀌면 "하나의 바"라는 인상이 깨진다
- **프로젝트 배지(badge)** 로고 옆 한 자리가 **지금 어느 프로젝트 안인지**를 말한다
  (`PROJECTS[id].badge` — 와이즈버즈 `AX`, HSAD `AX × HSAD`, 포털·게이트는 기본 `AX`).
  덱은 `Deck` 의 `badge` 로 넘긴다. 색이 아니라 **글자로만** 구분한다
- **네비·검색 버튼** `SiteHeader project=` 하나로 정해진다 (`navOf(id)` · `hasPromptSearch`).
  항목을 페이지에 손으로 적지 않는다. `project` 를 비우면 포털·게이트용 민바(로고만)
- **자료명(label)** 지금 열려 있는 자료가 있을 때만 채운다. 포털 · 프로젝트 홈 ·
  `/wisebirds/edu` · `/wisebirds/prototype` 은 비우고 우측 네비의 활성 표시가 그 역할을 한다
  (같은 단어가 한 바에 두 번 나오지 않게)
- **로고는 포털(`/`)로 간다** — 프로젝트 밖으로 나가는 유일한 길이다.
  그래서 목록 페이지의 `PageHero` 는 `parent` 로 프로젝트 홈을 끼워 넣는다(홈 / 프로젝트 / 현재)

`mode` 는 레이아웃 계약이다.

- `document` — 문서 스크롤 페이지 → `sticky top-0`
- `shell` — `fixed inset-0 flex flex-col` 셸(덱·실습)의 `flex-none` 아이템 → `relative`.
  **셸에서 바를 `fixed` 로 바꾸면 안 된다** — 본문 `flex-1` 이 뷰포트 전체를 먹어 슬라이드가 바 높이만큼 밀린다.

**바 높이는 런타임에 바뀌면 안 된다**(스크롤 축소 바 금지). 덱 스냅이 `clientHeight` 로 계산되므로
높이가 변하면 슬라이드 중간에 멈춘다. → `tests/deck.spec.ts` 가 이 관계를 검사한다.

## 크롬 조각은 새로 만들지 않는다

[src/components/site/chrome.tsx](src/components/site/chrome.tsx) 에 있는 것만 쓴다 —
`ChromePill` · `ChromeDivider` · `UpLink` · `SheetHeader` · `Eyebrow` · `PageHero` · `CHROME_T`.
여기 없는 새 모양을 페이지에서 직접 만들면 통일성이 깨진다. 필요하면 **여기에 추가**하고 쓴다.

## 덱 (Deck)

- 슬라이드 전환은 `goTo` 가 부드러운 스크롤 동안 **520ms 입력을 잠근다**(연속 입력으로 건너뛰지 않게).
  활성 표시는 IntersectionObserver라 스크롤 도중 먼저 바뀐다 — 테스트에서 키를 연속으로 넣을 때 이 간격을 지킨다.
- 덱은 `document.body.style.overflow = hidden` 으로 문서 스크롤을 잠근다.
- 키 핸들러는 `header, nav, button, a, input, …` 안에 포커스가 있으면 가로채지 않는다.

## 접근성에서 이미 고친 것 — 되돌리지 않는다

- 실습 목차 드로어는 닫힘 상태에서 `inert` 여야 한다. `aria-hidden` 만으로는 포커스가 화면 밖 링크 30여 개로 들어간다.
- 글리프(`☰` `←` `↓`)는 `aria-hidden` 으로 감싸고, 좁은 폭에서 라벨이 접히면 `title` 이 접근 이름이 되게 한다.
- 뒤로가기는 라벨만 접고 **화살표는 항상 남긴다** — 상위로 갈 길이 사라지지 않게.

## 이미지

`next/image` 를 쓰지 않는다. 에셋이 전부 `public/` 의 로컬 정적 파일이고 크기를 코드에서 고정한다.
`@next/next/no-img-element` 는 [eslint.config.mjs](eslint.config.mjs) 에서 꺼 두었다 — 파일마다 disable 주석을 달지 않는다.

## 실습 파일

`public/wisebirds/실습파일/ModuleN/` 에 두고 [lab-data.ts](src/lib/lab-data.ts) 의
`f(name, module)` 로 참조한다. **경로가 프로젝트 접두사 안이어야 게이트가 다운로드까지 막는다** —
`public/` 바로 아래로 옮기면 비번 없이 받아진다(`tests/gate.spec.ts` 가 이걸 검사한다).
`LabFile.path` 는 `/` 로 시작하는 완성된 경로다 — 쓰는 쪽에서 `/` 를 덧붙이지 않는다.

파일을 추가·교체하면 **모듈 ZIP 도 다시 만든다** — `tests/routes.spec.ts` 가 참조된 파일과 ZIP 을 모두 받아본다.

`M1_03`(매체 정책 초안)과 `M3_03`(리포트 초안)은 팩트체크·레드팀 실습용으로 **오류가 의도적으로 들어 있다.** 고치지 않는다.
