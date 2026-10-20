# public/brand — 와이즈버즈 브랜드 에셋

여기에 넣은 파일은 `/brand/파일명` 으로 바로 접근됩니다.
예: `public/brand/wisebirds-logo.svg` → `<img src="/brand/wisebirds-logo.svg" />`

## 들어온 CI 세트 (2026-07-30)

공식 CI 파일명을 그대로 유지합니다. 전부 **투명 배경 PNG**입니다.

| 파일 | 형태 | 원본 크기 | 용도 |
| --- | --- | --- | --- |
| `Wisebirds_CI_Horizontal_01_Color.png` | 가로 조합형 · 컬러 심볼 + 검정 글자 | 1000×130 | **상단 바 · 푸터** (기본) |
| `Wisebirds_CI_Horizontal_02_Mix.png` | 가로 조합형 · 컬러 심볼 + 흰 글자 | 1000×130 | 어두운 배경 |
| `Wisebirds_CI_Horizontal_03_White.png` | 가로 조합형 · 전체 흰색 | 1000×130 | 어두운 배경 · **og:image** |
| `Wisebirds_CI_Basic_01_Color.png` | 세로 조합형 · 컬러 + 검정 | 1000×342 | 정사각에 가까운 자리 |
| `Wisebirds_CI_Basic_02_Mix.png` | 세로 조합형 · 컬러 + 흰 글자 | 1000×342 | 어두운 배경 |
| `Wisebirds_CI_Basic_03_White.png` | 세로 조합형 · 전체 흰색 | 1000×342 | 어두운 배경 |
| `Wisebirds_CI_Signature_01_Color.png` | 심볼 단독 · 컬러 | 1000×538 | **favicon · apple-icon** |
| `Wisebirds_CI_Signature_02_White.png` | 심볼 단독 · 흰색 | 1000×538 | 어두운 배경 |
| `Wisebirds_CI_Signature_03_Line.png` | 심볼 단독 · 선 | 1006×542 | **페이지 헤더 워터마크** |

## 코드에서 쓰는 방법

파일 경로를 직접 쓰지 말고 [src/components/Logo.tsx](../../src/components/Logo.tsx) 를 쓰세요.
파일명이 바뀌면 그 파일의 `FILES` 만 고치면 전부 반영됩니다.

```tsx
<WisebirdsLogo />                                   // 가로형 컬러, 높이 20px (기본)
<WisebirdsLogo priority />                          // 최상단 로고 — 지연 로딩 끔
<WisebirdsLogo height={22} />                       // 높이 지정 (폭은 비율로 자동)
<WisebirdsLogo tone="white" />                      // 어두운 배경
<WisebirdsLogo tone="mix" />                        // 어두운 배경 + 컬러 심볼 유지
<WisebirdsLogo variant="stacked" />                 // 세로 조합형
<WisebirdsLogo variant="symbol" tone="line" height={230} />   // 워터마크
```

높이만 넘기면 원본 비율로 폭이 계산되어 들어갑니다(레이아웃 밀림·비율 왜곡 없음).

## 지금 적용된 곳

- **상단 바 · 푸터** — 가로형 컬러 (`Horizontal_01_Color`).
  상단 바는 사이트 전체에 하나뿐이라 라우트가 바뀌어도 같은 락업이 같은 자리에 옵니다.
- **favicon** — [src/app/icon.png](../../src/app/icon.png) (512×512, 심볼 컬러를 정사각 중앙 배치)
- **apple-touch-icon** — [src/app/apple-icon.png](../../src/app/apple-icon.png) (180×180, 흰 배경)
- **공유 미리보기** — [public/images/og/og-default.jpg](../images/og/og-default.jpg) (1200×630, 가로형 화이트 + 심볼 라인 워터마크)
- **목록 페이지 히어로 워터마크** — 심볼 라인 (`Signature_03_Line`, opacity 0.13).
  `PageHero` 가 그리므로 목록 페이지(`/wisebirds/edu` · `/wisebirds/library` · `/wisebirds/prototype` · `/hsad`)가
  모두 같은 자리에 같은 크기로 얹습니다.

## SVG 버전이 있으면 더 좋습니다

지금은 PNG라 아주 큰 크기(배너·인쇄)에서는 계단 현상이 생깁니다. SVG를 주시면 교체하겠습니다.
그때는 **글자를 패스로 변환(윤곽선 만들기)** 하고 **`viewBox` 를 포함**해 주세요
(`<text>` 로 남으면 폰트 없는 환경에서 서체가 바뀝니다).

최소 사용 크기·여백(clear space) 규정이 있으면 아래에 적어주시면 그대로 지켜 적용합니다.

## 참고 — 다른 로고는 여기 아님

교육 장표에 쓰는 **외부 도구 로고**(Node.js · VS Code · Claude · GitHub · Vercel 등)는
`public/dev-edu/` 에 있습니다. 이식한 장표가 그 경로를 참조하므로 옮기지 않습니다.
