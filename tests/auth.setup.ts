import { expect, test as setup } from "@playwright/test";
import { PROJECTS, PROJECT_IDS } from "../src/lib/projects";
import { STORAGE_STATE, TEST_PW } from "./gate-secrets";

/**
 * 나머지 스펙이 물려받을 "게이트를 통과한 상태"를 한 번만 만든다.
 *
 * 게이트를 **실제 폼으로** 지나간다 — 쿠키를 손으로 심으면 토큰 규칙이 바뀌어도
 * 테스트가 계속 통과해서, 정작 사람이 못 들어가는 상태를 못 잡는다.
 */
setup("두 프로젝트 게이트를 통과한 상태를 저장한다", async ({ page, context }) => {
  for (const id of PROJECT_IDS) {
    await page.goto(`/gate/${id}`);
    await page.getByLabel("진입 비밀번호").fill(TEST_PW[id]);
    await page.getByRole("button", { name: "들어가기" }).click();
    await expect(page).toHaveURL(PROJECTS[id].base);
  }

  await context.storageState({ path: STORAGE_STATE });
});
