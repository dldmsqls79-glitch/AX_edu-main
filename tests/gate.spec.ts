import { expect, test } from "@playwright/test";
import { labHref } from "../src/lib/lab-data";
import { PROJECTS } from "../src/lib/projects";
import { TEST_PW } from "./gate-secrets";
import { FILE_PATHS, PUBLIC_ROUTES } from "./routes";

/**
 * 게이트 스펙만 **비로그인 상태**로 돈다 (playwright.config 의 별도 프로젝트).
 * 나머지 스펙은 auth.setup 이 만든 통과 상태를 물려받는다.
 */

const WB = PROJECTS.wisebirds.base;
const HSAD = PROJECTS.hsad.base;

test.describe("공개 화면", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route} 은 비밀번호 없이 200`, async ({ request }) => {
      expect((await request.get(route)).status()).toBe(200);
    });
  }

  test("없는 프로젝트의 게이트는 404", async ({ request }) => {
    expect((await request.get("/gate/nope")).status()).toBe(404);
  });

  test("포털은 두 프로젝트를 모두 잠김으로 보여준다", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /Wisebirds AX/ })).toContainText("잠김");
    await expect(page.getByRole("link", { name: /HSAD/ })).toContainText("잠김");
  });
});

test.describe("잠긴 경로", () => {
  // 실습 경로는 `labHref` 로 잡는다 — 구 `/edu/session-2/3-1` 은 리다이렉트가
  // middleware 보다 먼저 돌아 307(게이트)이 아니라 308 이 나온다
  const LOCKED = [WB, `${WB}/edu`, labHref("/3-1"), `${WB}/library`, HSAD];

  for (const route of LOCKED) {
    test(`${route} 는 게이트로 튕긴다`, async ({ request }) => {
      const res = await request.get(route, { maxRedirects: 0 });
      expect(res.status()).toBe(307);
      const loc = res.headers()["location"];
      const gate = route.startsWith(HSAD) ? "/gate/hsad" : "/gate/wisebirds";
      expect(loc).toContain(gate);
      // 통과 후 돌아갈 곳을 잃지 않는다
      expect(loc).toContain(`next=${encodeURIComponent(route)}`);
    });
  }

  test("실습 파일 다운로드도 막힌다 — 페이지만 막으면 자료가 그대로 샌다", async ({ request }) => {
    const res = await request.get(encodeURI(FILE_PATHS[0]), { maxRedirects: 0 });
    expect(res.status()).toBe(307);
    expect(res.headers()["location"]).toContain("/gate/wisebirds");
  });

  test("모듈 ZIP 도 막힌다", async ({ request }) => {
    const res = await request.get(encodeURI(`${WB}/실습파일/Module1_실습파일.zip`), {
      maxRedirects: 0,
    });
    expect(res.status()).toBe(307);
  });
});

test.describe("비밀번호 입력", () => {
  test("틀리면 들어가지 못하고 이유만 알려준다", async ({ page }) => {
    await page.goto("/gate/wisebirds");
    await page.getByLabel("진입 비밀번호").fill("틀린비번");
    await page.getByRole("button", { name: "들어가기" }).click();

    // Next 의 라우트 announcer 도 role=alert 라 게이트 쪽만 집는다
    await expect(page.locator("#gate-error")).toHaveText("비밀번호가 맞지 않습니다.");
    await expect(page).toHaveURL(/\/gate\/wisebirds/);
  });

  test("맞으면 원래 가려던 실습으로 바로 간다", async ({ page }) => {
    const target = labHref("/3-1");
    await page.goto(target);
    await expect(page).toHaveURL(new RegExp("/gate/wisebirds"));

    await page.getByLabel("진입 비밀번호").fill(TEST_PW.wisebirds);
    await page.getByRole("button", { name: "들어가기" }).click();

    await expect(page).toHaveURL(target);
  });

  test("한 프로젝트를 열어도 다른 프로젝트는 그대로 잠겨 있다", async ({ page }) => {
    await page.goto("/gate/wisebirds");
    await page.getByLabel("진입 비밀번호").fill(TEST_PW.wisebirds);
    await page.getByRole("button", { name: "들어가기" }).click();
    await expect(page).toHaveURL(WB);

    await page.goto(HSAD);
    await expect(page).toHaveURL(/\/gate\/hsad/);
  });

  test("통과하면 포털 카드가 열림으로 바뀐다", async ({ page }) => {
    await page.goto("/gate/wisebirds");
    await page.getByLabel("진입 비밀번호").fill(TEST_PW.wisebirds);
    await page.getByRole("button", { name: "들어가기" }).click();
    await expect(page).toHaveURL(WB);

    await page.goto("/");
    await expect(page.getByRole("link", { name: /Wisebirds AX/ })).toContainText("열림");
    await expect(page.getByRole("link", { name: /HSAD/ })).toContainText("잠김");
  });

  test("이미 통과했으면 게이트가 다시 묻지 않는다", async ({ page }) => {
    await page.goto("/gate/wisebirds");
    await page.getByLabel("진입 비밀번호").fill(TEST_PW.wisebirds);
    await page.getByRole("button", { name: "들어가기" }).click();
    await expect(page).toHaveURL(WB);

    await page.goto("/gate/wisebirds");
    await expect(page).toHaveURL(WB);
  });
});

test.describe("next 파라미터 — 오픈 리다이렉터가 되지 않는다", () => {
  const BAD = [
    "https://example.com/",
    "//example.com/",
    "/\\example.com",
    "/hsad", // 다른 프로젝트로는 못 보낸다
    "/gate/hsad",
  ];

  for (const bad of BAD) {
    test(`next=${bad} 는 무시하고 프로젝트 홈으로 보낸다`, async ({ page }) => {
      await page.goto(`/gate/wisebirds?next=${encodeURIComponent(bad)}`);
      await page.getByLabel("진입 비밀번호").fill(TEST_PW.wisebirds);
      await page.getByRole("button", { name: "들어가기" }).click();

      await expect(page).toHaveURL(WB);
    });
  }
});
