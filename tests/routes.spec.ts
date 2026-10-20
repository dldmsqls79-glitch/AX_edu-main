import { expect, test } from "@playwright/test";
import { hs } from "../src/lib/hsad-data";
import { labHref, LAB_BASE } from "../src/lib/lab-data";
import { wb } from "../src/lib/projects";
import {
  ALL_ROUTES,
  FILE_PATHS,
  LAB_ROUTES,
  MODULE_ROUTES,
  PAGE_ROUTES,
  PUBLIC_ROUTES,
  ZIP_PATHS,
} from "./routes";

test.describe("라우트", () => {
  test(`전체 ${ALL_ROUTES.length}개 라우트가 200 을 준다`, async ({ request }) => {
    const bad: string[] = [];
    for (const route of ALL_ROUTES) {
      const res = await request.get(route);
      if (res.status() !== 200) bad.push(`${route} → ${res.status()}`);
    }
    expect(bad, `실패 라우트:\n${bad.join("\n")}`).toEqual([]);
  });

  test("없는 실습 slug 는 404 를 준다", async ({ request }) => {
    const res = await request.get(labHref("/9-9"));
    expect(res.status()).toBe(404);
  });

  /* 구조 개편 전에 공유된 링크가 살아 있어야 한다 (next.config.mjs).
     옛 경로는 **한 번에** 새 목적지로 가야 한다 — 두 번 튀면 링크가 느려지고
     리다이렉트 규칙 순서가 잘못됐다는 신호다. */
  const REDIRECTS: [string, string][] = [
    ["/edu", wb("/edu")],
    ["/edu/session-2/3-1", labHref("/3-1")],
    ["/library", wb("/library")],
    ["/prototype", wb("/prototype")],
    ["/prototype/app-ads", wb("/prototype/app-ads")],
    // 2026-07-30 개편분 — 새 목적지를 직접 겨눈다
    ["/edu/lab", LAB_BASE],
    ["/edu/lab/3-1", labHref("/3-1")],
    ["/edu/dev-onboarding", wb("/edu/session-1")],
    ["/app-ads", wb("/prototype/app-ads")],
    // 2026-08-12 실습 자료가 '예시'로 내려갔다. 하위 경로만 넘어가고
    // `/edu/session-2` 자체는 새 2회차 자리라 200 이어야 한다(위 라우트 목록이 검사한다).
    [wb("/edu/session-2/3-1"), labHref("/3-1")],
    [wb("/edu/session-2/m3"), labHref("/m3")],
    // 2026-08-04 HSAD 덱 통합 — 개발 기획이 통합 덱으로 들어갔다.
    // 리다이렉트가 middleware 보다 먼저 도므로 게이트 없이도 308 이 먼저 나온다.
    ["/hsad/dev-deck", hs("/deck")],
  ];

  for (const [from, to] of REDIRECTS) {
    test(`${from} → ${to} 로 영구 리다이렉트한다`, async ({ request }) => {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status()).toBe(308);
      expect(res.headers()["location"]).toBe(to);
    });
  }
});

test.describe("실습 첨부 파일", () => {
  test(`참조된 파일 ${FILE_PATHS.length}개가 모두 내려받힌다`, async ({ request }) => {
    const bad: string[] = [];
    for (const path of FILE_PATHS) {
      const res = await request.get(encodeURI(path));
      if (res.status() !== 200) bad.push(`${path} → ${res.status()}`);
    }
    expect(bad, `없는 파일:\n${bad.join("\n")}`).toEqual([]);
  });

  test(`모듈 ZIP ${ZIP_PATHS.length}개가 모두 내려받힌다`, async ({ request }) => {
    for (const path of ZIP_PATHS) {
      const res = await request.get(encodeURI(path));
      expect(res.status(), path).toBe(200);
      // 빈 ZIP 이 올라가 있으면 눈으로는 안 보인다
      expect((await res.body()).byteLength, path).toBeGreaterThan(200);
    }
  });
});

test.describe("상단 바 — 사이트에 단 하나", () => {
  /* 라우트 종류별 대표 하나씩 — 공개(포털·게이트) · 문서 · 셸 · 실습 */
  const SAMPLES = [
    ...PUBLIC_ROUTES,
    ...PAGE_ROUTES,
    MODULE_ROUTES[0],
    LAB_ROUTES[0],
  ];

  for (const route of SAMPLES) {
    test(`${route} — banner 는 정확히 하나, main 도 하나`, async ({ page }) => {
      await page.goto(route);
      await expect(page.getByRole("banner")).toHaveCount(1);
      await expect(page.getByRole("main")).toHaveCount(1);
      // 로고는 어느 라우트에서도 같은 자리에 있다
      await expect(
        page.getByRole("banner").getByRole("link", { name: "Wisebirds-AX 홈" })
      ).toBeVisible();
    });
  }

  test("바 높이는 모든 라우트에서 같다", async ({ page }) => {
    // 라우트를 한 테스트에서 전부 돈다 — 덱 라우트가 무거워 기본 30초로는 모자란다
    test.setTimeout(SAMPLES.length * 6_000);
    const heights: number[] = [];
    for (const route of SAMPLES) {
      await page.goto(route);
      const box = await page.getByRole("banner").boundingBox();
      heights.push(box!.height);
    }
    expect(new Set(heights).size, `높이가 갈렸다: ${heights.join(", ")}`).toBe(1);
  });

  test("문서 폭에서 가로 스크롤이 생기지 않는다", async ({ page }) => {
    const routes = [...PUBLIC_ROUTES, ...PAGE_ROUTES];
    // 위 '바 높이' 테스트와 같은 이유 — 라우트를 한 테스트에서 전부 돌고 덱이 무겁다
    test.setTimeout(routes.length * 6_000);
    await page.setViewportSize({ width: 360, height: 720 });
    for (const route of routes) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `${route} 에서 가로로 ${overflow}px 넘쳤다`).toBeLessThanOrEqual(0);
    }
  });
});
