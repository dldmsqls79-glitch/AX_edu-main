import { NextResponse, type NextRequest } from "next/server";
import { cookieName, verifyToken } from "@/lib/gate";
import { gateHref, projectOfPath } from "@/lib/projects";

/**
 * 진입 게이트 — 프로젝트 경로에 들어오는 **모든** 요청을 여기서 먼저 본다.
 *
 * 페이지뿐 아니라 `public/wisebirds/실습파일/…` 다운로드도 같은 접두사를 쓰므로 함께 막힌다.
 * 판정은 [projects.ts](./lib/projects.ts) 의 `projectOfPath` 하나로만 한다 —
 * 접두사 목록을 여기에 다시 적으면 프로젝트를 추가할 때 한쪽만 고치게 된다.
 */
export async function middleware(req: NextRequest) {
  // `실습파일` 처럼 한글이 든 경로는 퍼센트 인코딩되어 온다. 접두사 판정 전에 되돌린다.
  let pathname = req.nextUrl.pathname;
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // 망가진 인코딩 — 원문 그대로 두고 판정한다 (어차피 프로젝트 접두사와 안 맞는다)
  }

  const project = projectOfPath(pathname);
  if (!project) return NextResponse.next();

  const ok = await verifyToken(project, req.cookies.get(cookieName(project))?.value);
  if (ok) return NextResponse.next();

  const gate = new URL(gateHref(project), req.url);
  // 통과한 뒤 원래 가려던 곳으로 돌려보낸다 (쿼리스트링까지 그대로)
  gate.searchParams.set("next", `${req.nextUrl.pathname}${req.nextUrl.search}`);
  return NextResponse.redirect(gate, 307);
}

export const config = {
  /**
   * 정적 산출물과 브랜드/OG 에셋은 제외한다 — 이걸 막으면 게이트 화면 자체가 그려지지 않는다.
   * (프로젝트 접두사 판정은 위 함수가 하므로, 여기서는 '볼 필요 없는 것'만 걸러낸다)
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|images/|brand/|dev-edu/|robots.txt|sitemap.xml).*)",
  ],
};
