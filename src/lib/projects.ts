/**
 * 프로젝트 레지스트리 — **경로 접두사의 단일 출처.**
 *
 * 사이트는 포털(`/`) 아래 프로젝트 두 개로 갈라진다. 각 프로젝트는 자기 경로 아래에
 * 전부 들어가 있고(`/wisebirds/**` · `/hsad/**`), 그 접두사가 곧 **비밀번호 게이트의 범위**다.
 * middleware · 상단 바 · 네비 · 테스트 라우트 목록이 전부 여기서 파생된다.
 *
 * 링크는 반드시 `p()`(또는 `wb()`)로 만든다 — `"/wisebirds/edu"` 를 손으로 적지 않는다.
 * App Router 폴더명은 리터럴이라 `base` 가 폴더를 만들지는 못하므로,
 * 폴더를 옮길 때는 여기 `base` 도 같이 고쳐야 한다(둘이 어긋나면 링크가 전부 깨져 바로 드러난다).
 */

export type ProjectId = "wisebirds" | "hsad";

export type Project = {
  id: ProjectId;
  /** 경로 접두사 — 게이트 범위이자 모든 링크의 뿌리 */
  base: string;
  /** 게이트·포털에 노출되는 이름 */
  name: string;
  /** 상단 바 로고 옆 칩 — 지금 어느 프로젝트 안인지를 이 하나로 말한다 */
  badge: string;
  /** 비밀번호가 들어 있는 환경변수 이름 (값은 소스에 두지 않는다) */
  pwEnv: string;
  /** 상단 바 우측 네비 — href 는 `base` 기준 상대경로 */
  nav: { href: string; label: string }[];
  /**
   * ⌘K 프롬프트 검색을 쓰는 프로젝트인지.
   * 인덱스는 와이즈버즈 실습 콘텐츠라 그 프로젝트 안에서만 붙인다
   * (다른 프로젝트나 공개 포털에 실리면 잠근 내용이 번들로 새어 나간다).
   */
  hasPromptSearch: boolean;
};

export const PROJECTS: Record<ProjectId, Project> = {
  wisebirds: {
    id: "wisebirds",
    base: "/wisebirds",
    name: "Wisebirds AX",
    badge: "AX",
    pwEnv: "AX_PW_WISEBIRDS",
    nav: [
      { href: "/edu", label: "사내 교육" },
      { href: "/library", label: "프롬프트" },
      { href: "/prototype", label: "교육 사례" },
    ],
    hasPromptSearch: true,
  },
  hsad: {
    id: "hsad",
    base: "/hsad",
    name: "AX with HSAD",
    badge: "AX × HSAD",
    pwEnv: "AX_PW_HSAD",
    // 기획서 목차와 같은 순서 — 라벨은 `HSAD_SECTIONS[].nav` 와 맞춰 둔다
    // (여기서 hsad-data 를 import 하면 순환 참조가 된다: hsad-data → projects)
    nav: [
      { href: "/background", label: "배경" },
      { href: "/framework", label: "기능 체계" },
      { href: "/pipeline", label: "R-PES" },
      { href: "/scope", label: "대상 · 효과" },
      // 기획서 발표와 개발 기획은 2026-08-04 에 `/deck` 한 벌로 합쳤다
      // (구 `/dev-deck` 은 next.config.mjs 에서 308 로 넘긴다).
      { href: "/deck", label: "프레젠테이션" },
    ],
    hasPromptSearch: false,
  },
};

export const PROJECT_IDS = Object.keys(PROJECTS) as ProjectId[];

export const isProjectId = (v: string): v is ProjectId => v in PROJECTS;

/** 프로젝트 안의 경로 — `p("hsad", "/edu")` → `/hsad/edu` */
export const p = (id: ProjectId, path = "") => `${PROJECTS[id].base}${path}`;

/** 와이즈버즈 프로젝트 경로 (가장 많이 쓰여서 짧은 이름을 둔다) */
export const wb = (path = "") => p("wisebirds", path);

/** 상단 바 네비 — 상대 href 를 절대 경로로 편다 */
export const navOf = (id: ProjectId) =>
  PROJECTS[id].nav.map((n) => ({ href: p(id, n.href), label: n.label }));

/** 경로가 어느 프로젝트에 속하는지 — 게이트 범위 판정의 단일 규칙 */
export function projectOfPath(pathname: string): ProjectId | null {
  for (const id of PROJECT_IDS) {
    const base = PROJECTS[id].base;
    if (pathname === base || pathname.startsWith(`${base}/`)) return id;
  }
  return null;
}

/** 게이트 화면 경로 — 프로젝트 접두사 **밖**에 있어야 무한 리다이렉트가 안 생긴다 */
export const gateHref = (id: ProjectId) => `/gate/${id}`;

/**
 * 게이트를 통과한 뒤 돌아갈 곳.
 *
 * `?next=` 는 주소창에서 오고, Server Action 에 묶인 인자도 클라이언트를 거쳐 오므로
 * **믿을 수 없다.** 그 프로젝트 안의 상대 경로일 때만 받고, 아니면 프로젝트 홈으로 떨어뜨린다.
 * 이걸 빼면 게이트가 오픈 리다이렉터가 된다.
 */
export function safeNext(id: ProjectId, next: string | undefined | null): string {
  const base = PROJECTS[id].base;
  if (!next) return base;
  // `//evil.com`(프로토콜 상대) · `https://…`(절대) · `\` 우회를 모두 막는다
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return base;
  const path = next.split(/[?#]/)[0];
  return path === base || path.startsWith(`${base}/`) ? next : base;
}
