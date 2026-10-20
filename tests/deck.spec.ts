import zlib from "node:zlib";
import { expect, test, type Page } from "@playwright/test";
import { hs } from "../src/lib/hsad-data";
import { wb } from "../src/lib/projects";

/** 슬라이드 수는 덱마다 다르다 — 장수가 바뀌면 여기도 같이 고친다 (의도치 않은 증감을 잡는 값) */
const DECKS = [
  { route: wb("/prototype/app-ads"), name: "앱 광고 중급편", count: 28 },
  { route: wb("/edu/session-1"), name: "개발 인프라 구축 가이드", count: 28 },
  // 표지 1 + 복습 5(목록 1·화면 3·클론 1) + API 3 + MCP 6(표지 1·연결 3·활용 1·결과 1) + 키값 3 + 마무리 1
  { route: wb("/edu/session-2"), name: "API · MCP · 키값 관리", count: 19 },
  // 통합 덱 — 표지 1 + 개요 2 + 기획서 본문 12 + 아이디어 파트 37(연계도 1·우선순위 7·아이디어 28·구성 1) + 마무리 1
  { route: hs("/deck"), name: "HSAD 통합 프레젠테이션", count: 53 },
];

/** 우측 도트 네비의 활성 항목 — aria-label 이 "표지 (1)" 형태다 */
const activeDot = (page: Page) =>
  page.locator('nav[aria-label="슬라이드 네비게이션"] button[aria-current="true"]');

const slideCount = (page: Page) => page.locator("#deck-scroll section[data-index]");

/**
 * Deck 은 부드러운 스크롤이 도는 동안 520ms 간 입력을 잠근다(연속 입력으로 슬라이드를 건너뛰지 않게).
 * 활성 표시는 IntersectionObserver 라 스크롤 도중에 먼저 바뀌므로, 잠금이 풀릴 때까지 기다렸다 다음 키를 넣는다.
 */
async function press(page: Page, key: string) {
  await page.keyboard.press(key);
  await page.waitForTimeout(600);
}

for (const deck of DECKS) {
  test.describe(`덱 — ${deck.name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(deck.route);
      await expect(slideCount(page).first()).toBeVisible();
    });

    test(`${deck.count}장이 있고 1번에서 시작한다`, async ({ page }) => {
      await expect(slideCount(page)).toHaveCount(deck.count);
      await expect(activeDot(page)).toHaveAttribute("aria-label", /\(1\)$/);
    });

    test("↓ · ↑ · End · Home 으로 이동한다", async ({ page }) => {
      await press(page, "ArrowDown");
      await expect(activeDot(page)).toHaveAttribute("aria-label", /\(2\)$/);

      await press(page, "ArrowUp");
      await expect(activeDot(page)).toHaveAttribute("aria-label", /\(1\)$/);

      await press(page, "End");
      await expect(activeDot(page)).toHaveAttribute(
        "aria-label",
        new RegExp(`\\(${deck.count}\\)$`)
      );

      await press(page, "Home");
      await expect(activeDot(page)).toHaveAttribute("aria-label", /\(1\)$/);
    });

    test("목차를 클릭하면 그 슬라이드로 점프한다", async ({ page }) => {
      const target = page
        .locator('nav[aria-label="슬라이드 네비게이션"] button')
        .nth(9);
      await target.click();
      await expect(activeDot(page)).toHaveAttribute("aria-label", /\(10\)$/);
    });

    test("슬라이드는 바 아래 남은 높이에 정확히 맞는다", async ({ page }) => {
      /* 셸에서 바를 fixed 로 바꾸면 본문이 뷰포트 전체를 먹어 슬라이드가 바 높이만큼 밀린다.
         덱 스냅이 clientHeight 로 계산되므로 이 관계가 깨지면 슬라이드 중간에서 멈춘다. */
      const bar = (await page.getByRole("banner").boundingBox())!;
      const viewport = page.viewportSize()!;
      const scroller = await page.locator("#deck-scroll").boundingBox();
      expect(Math.round(scroller!.height)).toBe(Math.round(viewport.height - bar.height));
    });

    test("덱은 문서 스크롤을 잠근다", async ({ page }) => {
      await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    });

    test("목차 토글이 라벨을 접었다 편다", async ({ page }) => {
      /* 활성·hover 항목은 토글과 무관하게 라벨을 유지하므로 비활성 도트로 확인한다 */
      const idleDot = page
        .locator('nav[aria-label="슬라이드 네비게이션"] button')
        .nth(5);
      const toggle = page.getByRole("banner").getByTitle("목차 표시/숨기기");

      await expect(toggle).toHaveAttribute("aria-pressed", "true");
      // 라벨이 보이면 도트만 있을 때보다 버튼이 넓다
      const wide = (await idleDot.boundingBox())!.width;

      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-pressed", "false");
      await expect
        .poll(async () => (await idleDot.boundingBox())!.width)
        .toBeLessThan(wide);
    });

    /* ── PDF 저장 (상단 바 PDF 버튼 = window.print()) ──
       인쇄 규칙이 깨지는 방식이 조용하다 — 화면은 멀쩡한데 PDF 만 망가진다.
       그래서 실제로 PDF 를 뽑아 두 가지를 본다: 쪽수와 색.
       page.pdf 는 Chrome 인쇄 **대화상자**가 아니라 헤드리스 경로다.
       대화상자의 '색상: 흑백' 선택까지는 여기서 잡히지 않는다.

       ⚠️ 슬라이드를 전부 종이로 굽는 작업이라 기본 30초로는 모자란다(느린 PC 에서 특히).
          장수에 비례해 예산을 준다 — 넘치면 `Printing failed` 대신 테스트 타임아웃으로 먼저 죽어
          원인이 인쇄 규칙인지 성능인지 헷갈린다. */
    const PDF_TIMEOUT = 30_000 + deck.count * 3_000;

    test("PDF 로 저장하면 슬라이드 1장이 1페이지가 된다", async ({ page }) => {
      test.setTimeout(PDF_TIMEOUT);
      const pdf = await page.pdf({
        format: "A4",
        landscape: true,
        // 인쇄 대화상자에서 '배경 그래픽' 을 끈 상태와 같다 —
        // print-color-adjust:exact 가 이걸 이기는지까지 함께 검사한다
        printBackground: false,
        margin: { top: "8mm", right: "8mm", bottom: "8mm", left: "8mm" },
      });
      expect(countPdfPages(pdf), `${deck.name} 의 PDF 쪽수`).toBe(deck.count);
    });

    test("PDF 에 색이 남는다 — 회색조로 떨어지지 않는다", async ({ page }) => {
      test.setTimeout(PDF_TIMEOUT);
      const pdf = await page.pdf({
        format: "A4",
        landscape: true,
        printBackground: false,
        margin: { top: "8mm", right: "8mm", bottom: "8mm", left: "8mm" },
      });
      /* globals.css 의 `print-color-adjust: exact` 를 지우거나 좁히면 여기서 걸린다.
         컬러 채움 연산자(rg)가 회색(r=g=b)이 아닌 것으로 충분히 있어야 한다. */
      expect(countColorFills(pdf), `${deck.name} 의 비회색 채움 수`).toBeGreaterThan(100);
    });
  });
}

/** PDF 쪽수 — `/Type /Page` 객체를 센다 (주석의 /Pages 는 제외) */
function countPdfPages(pdf: Buffer): number {
  return (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
}

/** 콘텐츠 스트림을 풀어 비회색 RGB 채움(`r g b rg`)을 센다 */
function countColorFills(pdf: Buffer): number {
  const raw = pdf.toString("latin1");
  let n = 0;
  for (const m of raw.matchAll(/stream\r?\n([\s\S]*?)endstream/g)) {
    let text: string;
    try {
      text = zlib.inflateSync(Buffer.from(m[1], "latin1")).toString("latin1");
    } catch {
      continue; // 이미지 등 flate 가 아닌 스트림
    }
    for (const c of text.matchAll(/([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+rg\b/g)) {
      const [r, g, b] = [c[1], c[2], c[3]].map(Number);
      if (r !== g || g !== b) n++;
    }
  }
  return n;
}
