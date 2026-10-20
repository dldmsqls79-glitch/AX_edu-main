/**
 * 라우트 목록은 콘텐츠 데이터에서 뽑는다 — 실습을 추가하면 테스트가 자동으로 따라온다.
 * (여기에 손으로 적어두면 목록이 늘 뒤처진다)
 *
 * 경로 접두사도 마찬가지로 `projects.ts` 에서 온다 — 프로젝트를 옮겨도 여기는 안 고친다.
 */
import { HSAD_SECTIONS, hs, SOLUTION_AREAS } from "../src/lib/hsad-data";
import { FLAT_LABS, labHref, LAB_BASE, MODULES } from "../src/lib/lab-data";
import { navOf, PROJECTS, wb } from "../src/lib/projects";

/** 비밀번호 없이 볼 수 있는 화면 */
export const PUBLIC_ROUTES = ["/", `/gate/${PROJECTS.wisebirds.id}`, `/gate/${PROJECTS.hsad.id}`];

/**
 * HSAD 기획서 — 목차·영역 목록에서 파생시킨다.
 * 상단 바 네비 href 도 함께 넣어, 네비가 없는 페이지를 가리키면 200 검사에서 걸리게 한다
 * (네비는 projects.ts, 섹션은 hsad-data.ts 라 둘이 어긋날 수 있다).
 */
const HSAD_ROUTES = [
  ...new Set([
    hs(),
    ...HSAD_SECTIONS.map((s) => hs(`/${s.slug}`)),
    ...SOLUTION_AREAS.map((a) => hs(`/framework/${a.slug}`)),
    ...navOf("hsad").map((n) => n.href),
  ]),
];

/** 게이트 뒤의 문서 스크롤 페이지 */
export const PAGE_ROUTES = [
  wb(),
  wb("/edu"),
  wb("/edu/session-1"),
  // 자료를 새로 만드는 중이라 뼈대만 있는 자리 — 그래도 200 이어야 한다
  wb("/edu/session-2"),
  LAB_BASE,
  wb("/library"),
  wb("/prototype"),
  wb("/prototype/app-ads"),
  ...HSAD_ROUTES,
];

export const MODULE_ROUTES = MODULES.map((m) => labHref(`/m${m.num}`));

export const LAB_ROUTES = FLAT_LABS.map((l) => labHref(`/${l.id}`));

export const ALL_ROUTES = [...PUBLIC_ROUTES, ...PAGE_ROUTES, ...MODULE_ROUTES, ...LAB_ROUTES];

/** 첨부 실습 파일 전체 (중복 제거) — `/` 로 시작하는 완성된 경로다 */
export const FILE_PATHS = [
  ...new Set(FLAT_LABS.flatMap((l) => l.files.map((f) => f.path))),
];

/** 모듈별 ZIP — 파일이 하나라도 있는 모듈만 노출된다 */
export const ZIP_PATHS = MODULES.filter((m) =>
  m.labs.some((l) => l.files.length > 0)
).map((m) => wb(`/실습파일/Module${m.num}_실습파일.zip`));
