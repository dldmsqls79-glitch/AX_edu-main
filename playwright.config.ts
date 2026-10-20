import { defineConfig, devices } from "@playwright/test";
import { STORAGE_STATE, TEST_GATE_ENV } from "./tests/gate-secrets";

/**
 * 스모크 테스트는 **프로덕션 빌드**를 대상으로 돈다.
 * dev 서버와 `.next` 를 공유하면 산출물이 깨진다(README 경고 참고).
 *
 * 사이트 전체가 비밀번호 게이트 뒤에 있으므로 프로젝트를 셋으로 나눈다.
 *   setup    — 게이트를 폼으로 한 번 통과해 쿠키 상태를 저장한다
 *   gate     — 게이트 자체를 검사하므로 **비로그인**으로 돈다
 *   chromium — 나머지 전부, setup 이 만든 상태를 물려받는다
 */
const PORT = 3100;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },

  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "gate",
      testMatch: /gate\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium",
      testIgnore: /gate\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE },
      dependencies: ["setup"],
    },
  ],

  webServer: {
    // CI 는 앞 단계에서 이미 build 를 돌리므로 start 만 한다.
    command: process.env.CI
      ? `npx next start -p ${PORT}`
      : `npm run build && npx next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    // 개발자의 .env.local 이 무엇이든 테스트는 항상 같은 비번으로 돈다
    env: { ...TEST_GATE_ENV },
  },
});
