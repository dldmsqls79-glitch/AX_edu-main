/**
 * 스모크 테스트용 게이트 설정.
 *
 * 이 값들은 **테스트가 띄우는 임시 서버만** 여는 것이라 비밀이 아니다 (그래서 커밋한다).
 * playwright.config 의 `webServer.env` 와 로그인 setup 이 같은 이 값을 본다 —
 * 한쪽만 바뀌면 전 테스트가 게이트에 막히므로 반드시 여기 하나에서 가져간다.
 *
 * 실제 비밀번호는 `.env.local`(로컬)과 Vercel 환경변수(배포)에 있고, 커밋되지 않는다.
 */
export const TEST_GATE_ENV = {
  AX_SESSION_SECRET: "0000000000000000000000000000000000000000000000000000000000000000",
  AX_PW_WISEBIRDS: "test-wisebirds-pw",
  AX_PW_HSAD: "test-hsad-pw",
} as const;

export const TEST_PW = {
  wisebirds: TEST_GATE_ENV.AX_PW_WISEBIRDS,
  hsad: TEST_GATE_ENV.AX_PW_HSAD,
} as const;

/** 게이트를 통과한 브라우저 상태 */
export const STORAGE_STATE = "playwright/.auth/state.json";
