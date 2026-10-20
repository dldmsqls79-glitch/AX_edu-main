import { expect, test, type Page } from "@playwright/test";
import { FLAT_LABS, labHref } from "../src/lib/lab-data";
import { wb } from "../src/lib/projects";

test.use({ permissions: ["clipboard-read", "clipboard-write"] });

const TOTAL_PROMPTS = FLAT_LABS.reduce((n, l) => n + l.prompts.length, 0);

const results = (page: Page) => page.locator("article");
const chip = (page: Page, name: string) =>
  page.getByRole("button", { name: new RegExp(`^${name}( \\d+)?$`) });

test.describe("프롬프트 라이브러리", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(wb("/library"));
  });

  test(`프롬프트 ${TOTAL_PROMPTS}개를 전부 보여준다`, async ({ page }) => {
    await expect(page.getByRole("heading", { name: `프롬프트 ${TOTAL_PROMPTS}개` })).toBeVisible();
    await expect(results(page)).toHaveCount(TOTAL_PROMPTS);
  });

  test("모듈 필터가 결과를 좁힌다", async ({ page }) => {
    await chip(page, "M3").click();

    const count = await results(page).count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(TOTAL_PROMPTS);
    // 남은 카드가 전부 M3 여야 한다
    await expect(results(page).getByText(/^M3 · /)).toHaveCount(count);
  });

  test("직무 필터가 결과를 좁힌다", async ({ page }) => {
    await chip(page, "크리에이티브").click();

    const count = await results(page).count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(TOTAL_PROMPTS);
  });

  test("두 축을 겹쳐도 0건이 되는 칩은 눌리지 않는다", async ({ page }) => {
    await chip(page, "M5").click();
    // 0건인 조합은 비활성이라 막다른 길이 생기지 않는다
    for (const btn of await page.getByRole("button", { name: / 0$/ }).all()) {
      await expect(btn).toBeDisabled();
    }
  });

  test("본문까지 검색한다", async ({ page }) => {
    const box = page.getByRole("searchbox");
    await box.fill("코호트 리텐션");

    const count = await results(page).count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(TOTAL_PROMPTS);
    // 4-4 가 리텐션·LTV 실습이다
    await expect(results(page).first()).toContainText("리텐션");
  });

  test("변수 기본값은 색인에 넣지 않는다", async ({ page }) => {
    /* 치환된 글을 색인하면 기본 광고주(커머스 A사)의 업종 설명
       "종합 이커머스 앱 — … 재구매 리텐션이 핵심" 이 거의 모든 프롬프트에 섞여
       "리텐션" 이 27개 중 21개를 잡는다. 원문을 색인해야 실제로 다루는 것만 걸린다. */
    await page.getByRole("searchbox").fill("리텐션");
    await expect(results(page)).toHaveCount(1);
    await expect(results(page).first()).toContainText("리텐션 · LTV");

    // 기본 광고주 이름·업종은 프롬프트의 내용이 아니므로 검색에 걸리지 않는다
    await page.getByRole("searchbox").fill("이커머스");
    await expect(results(page)).toHaveCount(0);
  });

  test("스니펫에 잘린 변수 토큰이 나오지 않는다", async ({ page }) => {
    await page.getByRole("searchbox").fill("코호트");
    const snippet = results(page).first().locator("p.font-mono");
    await expect(snippet).toBeVisible();
    await expect(snippet).not.toContainText("{");
    await expect(snippet).not.toContainText("}");
  });

  test("없는 말을 넣으면 빈 상태를 안내한다", async ({ page }) => {
    await page.getByRole("searchbox").fill("존재하지않는검색어xyz");
    await expect(results(page)).toHaveCount(0);
    await expect(page.getByText(/조건에 맞는 프롬프트가 없습니다/)).toBeVisible();
  });

  test("필터 초기화가 전부 되돌린다", async ({ page }) => {
    await page.getByRole("searchbox").fill("리포트");
    await chip(page, "M3").click();
    expect(await results(page).count()).toBeLessThan(TOTAL_PROMPTS);

    await page.getByRole("button", { name: "필터 초기화" }).click();
    await expect(results(page)).toHaveCount(TOTAL_PROMPTS);
    await expect(page.getByRole("searchbox")).toHaveValue("");
  });

  test("본문 보기로 전문을 펼친다", async ({ page }) => {
    const card = results(page).first();
    await expect(card.locator("pre")).toHaveCount(0);

    await card.getByRole("button", { name: "본문 보기" }).click();
    await expect(card.locator("pre")).toBeVisible();

    await card.getByRole("button", { name: "본문 접기" }).click();
    await expect(card.locator("pre")).toHaveCount(0);
  });

  test("실습에서 열기가 해당 실습으로 간다", async ({ page }) => {
    await page.getByRole("searchbox").fill("레드팀");
    await results(page).first().getByRole("link", { name: /실습에서 열기/ }).click();
    await expect(page).toHaveURL(/\/edu\/example\/3-3$/);
  });
});

test.describe("라이브러리 복사", () => {
  test("변수가 기본값으로 치환된 평문이 복사된다", async ({ page }) => {
    await page.goto(wb("/library"));
    await page.getByRole("searchbox").fill("같은 요청");

    await results(page).first().getByRole("button", { name: "프롬프트 복사" }).click();
    await expect(page.getByRole("button", { name: "복사됨 ✓" })).toBeVisible();

    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text.length).toBeGreaterThan(0);
    expect(text).not.toMatch(/\{(광고주|매체|핵심지표|직무|광고주_업종)\}/);
  });

  test("라이브러리와 실습이 같은 글을 복사한다", async ({ page }) => {
    /* 두 곳의 치환 규칙이 갈리면 "복사한 프롬프트"가 서로 다른 글이 된다 */
    await page.goto(wb("/library"));
    await page.getByRole("searchbox").fill("6단 구조");
    await results(page).first().getByRole("button", { name: "프롬프트 복사" }).click();
    await expect(page.getByRole("button", { name: "복사됨 ✓" })).toBeVisible();
    const fromLibrary = await page.evaluate(() => navigator.clipboard.readText());

    await page.goto(labHref("/1-1"));
    await page.getByRole("button", { name: "B. 6단 구조 프롬프트" }).click();
    await page.getByRole("button", { name: "복사", exact: true }).click();
    await expect(page.getByRole("button", { name: "복사됨 ✓" })).toBeVisible();
    const fromLab = await page.evaluate(() => navigator.clipboard.readText());

    expect(fromLibrary).toBe(fromLab);
  });
});

test.describe("전역 검색 (⌘K)", () => {
  const palette = (page: Page) => page.getByRole("dialog", { name: "프롬프트 검색" });

  test("단축키로 프로젝트 안 어디서든 열린다", async ({ page }) => {
    // 덱 셸에서도 살아 있어야 한다 (팔레트는 프로젝트 레이아웃에 붙어 있다)
    await page.goto(wb("/prototype/app-ads"));
    await page.keyboard.press("ControlOrMeta+k");
    await expect(palette(page)).toBeVisible();
  });

  test("상단 바 버튼으로도 열린다", async ({ page }) => {
    await page.goto(wb());
    await page.getByRole("banner").getByTitle("프롬프트 검색").click();
    await expect(palette(page)).toBeVisible();
  });

  test("검색하고 Enter 로 실습을 연다", async ({ page }) => {
    await page.goto(wb());
    await page.keyboard.press("ControlOrMeta+k");

    await palette(page).getByRole("textbox").fill("예산 재배분");
    // 인덱스는 처음 열 때 동적으로 받아온다
    await expect(palette(page).getByRole("button", { name: /4-3/ })).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${labHref("/4-3")}$`));
  });

  test("Esc 로 닫힌다", async ({ page }) => {
    await page.goto(wb());
    await page.keyboard.press("ControlOrMeta+k");
    await expect(palette(page)).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(palette(page)).toBeHidden();
  });

  /* 인덱스는 프롬프트 본문 전체를 담는다 — 잠금 밖으로 나가면 안 된다 */
  test("공개 포털에는 팔레트도 검색 버튼도 없다", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner").getByTitle("프롬프트 검색")).toHaveCount(0);

    await page.keyboard.press("ControlOrMeta+k");
    await expect(palette(page)).toHaveCount(0);
  });

  test("전체 라이브러리 링크가 있다", async ({ page }) => {
    await page.goto(wb("/edu"));
    await page.keyboard.press("ControlOrMeta+k");
    await palette(page).getByRole("link", { name: /전체 라이브러리/ }).click();
    await expect(page).toHaveURL(new RegExp(`${wb("/library")}$`));
  });
});
