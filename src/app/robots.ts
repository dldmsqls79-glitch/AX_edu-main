import type { MetadataRoute } from "next";
import { PROJECTS, PROJECT_IDS } from "@/lib/projects";

/**
 * 공개된 것은 포털뿐이다. 프로젝트와 게이트는 색인하지 않는다.
 *
 * 잠긴 경로는 어차피 307 로 튕겨 크롤러가 내용을 못 보지만,
 * 경로 이름과 게이트 화면이 검색 결과에 남는 것도 원치 않는다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...PROJECT_IDS.map((id) => `${PROJECTS[id].base}/`), "/gate/"],
    },
  };
}
