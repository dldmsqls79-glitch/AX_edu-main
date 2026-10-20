import { expect, test, type Page } from "@playwright/test";
import { labHref } from "../src/lib/lab-data";

test.use({ permissions: ["clipboard-read", "clipboard-write"] });

/**
 * 프롬프트 안에 박힌 콤보 입력 — aria-label 이 "이름 — 설명" 형태다.
 * 같은 변수가 본문에 여러 번 나오면 입력칸도 그만큼 생기고 값은 서로 묶여 있다.
 */
const combos = (page: Page, name: string) =>
  page.getByRole("textbox", { name: new RegExp(`^${name} —`) });

const combo = (page: Page, name: string) => combos(page, name).first();

/** 콤보를 열어 목록에서 값을 고른다 */
async function pick(page: Page, name: string, value: string) {
  await combo(page, name).click();
  await page.getByRole("option", { name: value, exact: true }).click();
}

const clipboard = (page: Page) =>
  page.evaluate(() => navigator.clipboard.readText());

test.describe("프롬프트 카드", () => {
  test("탭을 바꾸면 본문이 바뀐다", async ({ page }) => {
    await page.goto(labHref("/1-1"));

    const simple = page.getByRole("button", { name: "A. 단순 요청" });
    const full = page.getByRole("button", { name: "B. 6단 구조 프롬프트" });
    await expect(simple).toBeVisible();
    await expect(full).toBeVisible();

    await expect(page.locator("pre")).not.toContainText("[역할]");
    await full.click();
    await expect(page.locator("pre")).toContainText("[역할]");
  });

  test("복사하면 변수가 선택값으로 치환된 평문이 들어간다", async ({ page }) => {
    await page.goto(labHref("/1-1"));
    await page.getByRole("button", { name: "B. 6단 구조 프롬프트" }).click();

    await page.getByRole("button", { name: "복사" }).click();
    await expect(page.getByRole("button", { name: "복사됨 ✓" })).toBeVisible();

    const text = await clipboard(page);
    expect(text).toContain("커머스 A사");
    // {광고주_업종} 은 선택값에서 자동으로 채워진다
    expect(text).toContain("종합 이커머스 앱");
    expect(text).toContain("Meta");
    // 미치환 토큰이 남아 있으면 그대로 AI 에 들어간다
    expect(text).not.toMatch(/\{(광고주|매체|광고주_업종)\}/);
  });

  test("광고주를 바꾸면 업종과 핵심지표가 함께 따라온다", async ({ page }) => {
    await page.goto(labHref("/3-1"));

    await expect(combo(page, "핵심지표")).toHaveValue("첫 구매 전환 CPA");

    await pick(page, "광고주", "게임 B사");

    await expect(combo(page, "광고주")).toHaveValue("게임 B사");
    await expect(combo(page, "핵심지표")).toHaveValue("D7 ROAS");
    await expect(page.locator("pre")).toContainText("모바일 RPG 퍼블리셔");
  });

  test("같은 변수가 여러 번 나와도 입력칸이 함께 움직인다", async ({ page }) => {
    await page.goto(labHref("/3-1"));

    const all = combos(page, "광고주");
    const count = await all.count();
    expect(count).toBeGreaterThan(1);

    await pick(page, "광고주", "여행 D사");
    for (let i = 0; i < count; i++) {
      await expect(all.nth(i)).toHaveValue("여행 D사");
    }
  });

  test("직접 고친 값은 광고주를 바꿔도 유지된다", async ({ page }) => {
    await page.goto(labHref("/3-1"));

    const kpi = combo(page, "핵심지표");
    await kpi.fill("설치 후 7일 잔존율");
    await page.keyboard.press("Escape");

    await pick(page, "광고주", "금융 C사");

    await expect(combo(page, "광고주")).toHaveValue("금융 C사");
    await expect(kpi).toHaveValue("설치 후 7일 잔존율");
  });

  test("목록에 없는 값을 직접 입력해도 복사에 반영된다", async ({ page }) => {
    await page.goto(labHref("/3-1"));

    await combo(page, "광고주").fill("우리회사 테스트 광고주");
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: "복사" }).click();
    expect(await clipboard(page)).toContain("우리회사 테스트 광고주");
  });
});

test.describe("실습 파일", () => {
  test("팝업의 파일과 ZIP 링크가 실제로 내려받힌다", async ({ page, request }) => {
    await page.goto(labHref("/3-1"));

    await page.getByRole("button", { name: /실습 파일/ }).click();
    const dialog = page.getByRole("dialog", { name: "실습 파일" });
    await expect(dialog).toBeVisible();

    const links = dialog.locator("a[download]");
    const count = await links.count();
    expect(count).toBeGreaterThan(1); // 파일 + 모듈 ZIP

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      const res = await request.get(href!);
      expect(res.status(), href!).toBe(200);
    }

    await dialog.getByRole("button", { name: "닫기" }).click();
    await expect(dialog).toBeHidden();
  });

  test("파일이 없는 실습에는 파일 버튼이 없다", async ({ page }) => {
    await page.goto(labHref("/1-1"));
    await expect(page.getByRole("button", { name: /실습 파일/ })).toHaveCount(0);
  });
});

test.describe("실습 이동", () => {
  test("← → 키로 이전·다음 실습으로 간다", async ({ page }) => {
    await page.goto(labHref("/3-1"));

    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveURL(/\/edu\/example\/3-2$/);

    await page.keyboard.press("ArrowLeft");
    await expect(page).toHaveURL(/\/edu\/example\/3-1$/);
  });

  test("콤보에 입력 중일 때는 방향키를 가로채지 않는다", async ({ page }) => {
    await page.goto(labHref("/3-1"));

    await combo(page, "광고주").click();
    await page.keyboard.press("ArrowRight");

    await expect(page).toHaveURL(/\/edu\/example\/3-1$/);
  });
});

test.describe("실습 목차 드로어", () => {
  const drawer = (page: Page) => page.locator('nav[aria-label="실습 목차"]');

  test("닫혀 있으면 tab 순서에서 빠진다", async ({ page }) => {
    await page.goto(labHref("/3-1"));
    /* aria-hidden 만으로는 포커스가 화면 밖 링크 30여 개로 들어간다 */
    await expect(drawer(page)).toHaveAttribute("inert", /.*/);
  });

  test("열고 · Esc 로 닫고 · 링크로 이동한다", async ({ page }) => {
    await page.goto(labHref("/3-1"));
    const toggle = page.getByRole("banner").getByTitle("실습 목차 열기");

    await toggle.click();
    await expect(drawer(page)).not.toHaveAttribute("inert", /.*/);

    await page.keyboard.press("Escape");
    await expect(drawer(page)).toHaveAttribute("inert", /.*/);

    await toggle.click();
    await drawer(page).getByRole("link", { name: /^5-5/ }).click();
    await expect(page).toHaveURL(/\/edu\/example\/5-5$/);
    // 라우트가 바뀌면 목차는 닫힌다
    await expect(drawer(page)).toHaveAttribute("inert", /.*/);
  });
});
