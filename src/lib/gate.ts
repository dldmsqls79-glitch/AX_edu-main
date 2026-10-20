/**
 * 진입 비밀번호 게이트 — 토큰과 쿠키 규칙의 단일 출처.
 *
 * middleware(Edge 런타임)와 Server Action 이 **같은 함수**를 쓴다.
 * 그래서 여기서는 Web Crypto 만 쓴다 — `node:crypto` 를 부르면 middleware 에서 터진다.
 *
 * 이 게이트는 **사람 단위 인증이 아니다.** 프로젝트마다 공유 비밀번호 하나이고,
 * 누가 언제 봤는지 남지 않는다. 그 이상이 필요해지면 여기가 아니라 인증 자체를 바꿔야 한다.
 */
import { PROJECTS, type ProjectId } from "./projects";

const COOKIE_PREFIX = "ax_gate_";

/** 30일 — 교육 기간 한 번은 다시 안 묻는 길이 */
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const cookieName = (id: ProjectId) => `${COOKIE_PREFIX}${id}`;

const enc = new TextEncoder();

const toHex = (buf: ArrayBuffer) =>
  Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

/**
 * 쿠키에 넣을 토큰.
 *
 * 비밀번호를 **재료로** 쓰기 때문에 비번을 바꾸면 토큰이 달라져 기존 쿠키가 저절로 무효가 된다
 * (따로 세션을 무효화할 곳이 없다). 프로젝트 id 를 섞어 한 프로젝트의 쿠키가
 * 다른 프로젝트에서 통하지 않게 한다.
 */
async function tokenFor(id: ProjectId, secret: string, password: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return toHex(await crypto.subtle.sign("HMAC", key, enc.encode(`${id}:${password}`)));
}

/** 길이·내용 모두 시간에 새지 않게 비교한다 */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

type Secrets = { secret: string; password: string };

/**
 * 환경변수를 읽는다. 하나라도 비어 있으면 `null` — 부르는 쪽은 **닫는 쪽으로** 실패해야 한다.
 * (설정 누락이 사이트를 여는 방향으로 끝나면 안 된다)
 */
function secretsOf(id: ProjectId): Secrets | null {
  const secret = process.env.AX_SESSION_SECRET;
  const password = process.env[PROJECTS[id].pwEnv];
  if (!secret || !password) return null;
  return { secret, password };
}

/** 게이트 설정이 갖춰져 있는지 — 게이트 화면이 "설정이 안 됐다"고 말해주려고 쓴다 */
export const isConfigured = (id: ProjectId) => secretsOf(id) !== null;

/** 입력한 비밀번호가 맞으면 쿠키에 넣을 토큰을, 아니면 `null` */
export async function issueToken(id: ProjectId, input: string): Promise<string | null> {
  const s = secretsOf(id);
  if (!s) return null;
  if (!safeEqual(input, s.password)) return null;
  return tokenFor(id, s.secret, s.password);
}

/** 쿠키에 담겨 온 토큰이 유효한지 */
export async function verifyToken(id: ProjectId, token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const s = secretsOf(id);
  if (!s) return false;
  return safeEqual(token, await tokenFor(id, s.secret, s.password));
}

/**
 * 쿠키 옵션.
 *
 * `secure` 는 `NODE_ENV` 가 아니라 **들어온 요청의 프로토콜**로 정한다.
 * 프로덕션 빌드를 http 로 띄우는 경우(로컬 `next start`, 스모크 테스트)가 있는데,
 * 거기서 Secure 를 켜면 쿠키가 되돌아오지 않아 게이트를 영영 못 지나간다.
 */
export const cookieOptions = (secure: boolean) =>
  ({
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  }) as const;

/**
 * `x-forwarded-proto` 로 https 여부를 본다 (Vercel 이 붙여준다).
 * 헤더가 없으면 프록시 없는 로컬 실행이므로 http 로 본다 — 그쪽이 안전한 기본값이다
 * (없는 https 를 가정해 Secure 를 켜면 쿠키가 안 돌아와 게이트를 못 지나간다).
 */
export const isHttps = (proto: string | null) =>
  (proto ?? "").split(",")[0].trim() === "https";
