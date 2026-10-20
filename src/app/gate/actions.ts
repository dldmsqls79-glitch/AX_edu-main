"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cookieName, cookieOptions, isHttps, issueToken } from "@/lib/gate";
import { isProjectId, PROJECTS, safeNext } from "@/lib/projects";

export type GateState = { error?: string };

/** 틀렸을 때 잠깐 쉰다 — 스크립트로 비번을 훑는 속도를 떨어뜨린다 */
const FAIL_DELAY_MS = 400;

/**
 * 비밀번호 확인 → 쿠키 발급 → 원래 가려던 곳으로.
 *
 * `project` 와 `next` 는 폼에 **묶인 인자**라 클라이언트를 거쳐 돌아온다 —
 * 서버에서 다시 검증한다. 특히 `next` 는 `safeNext` 를 통과해야 오픈 리다이렉트가 안 된다.
 */
export async function verifyGate(
  project: string,
  next: string,
  _prev: GateState,
  formData: FormData
): Promise<GateState> {
  if (!isProjectId(project)) return { error: "알 수 없는 프로젝트입니다." };

  const password = String(formData.get("password") ?? "");
  const token = await issueToken(project, password);

  if (!token) {
    await new Promise((r) => setTimeout(r, FAIL_DELAY_MS));
    // 비번이 틀린 것과 환경변수가 비어 있는 것을 구분해 말하지 않는다 (설정 상태를 흘리지 않게)
    return { error: "비밀번호가 맞지 않습니다." };
  }

  const h = await headers();
  const jar = await cookies();
  jar.set(cookieName(project), token, cookieOptions(isHttps(h.get("x-forwarded-proto"))));

  // redirect 는 예외를 던져 흐름을 끊는다 — try 안에서 부르지 않는다
  redirect(safeNext(project, next) || PROJECTS[project].base);
}
