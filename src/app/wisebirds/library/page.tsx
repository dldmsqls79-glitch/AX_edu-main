import type { Metadata } from "next";
import { LibraryBrowser } from "@/components/library/LibraryBrowser";
import { PageHero } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { LAB_STATS } from "@/lib/lab-data";
import { PROJECTS, wb } from "@/lib/projects";

export const metadata: Metadata = {
  title: "프롬프트 라이브러리",
  description:
    "광고 실무에서 검증된 프롬프트를 모듈·직무·도구로 찾아 바로 복사해 쓰는 공용 저장소.",
};

export default function LibraryPage() {
  return (
    <>
      {/* 네비의 '프롬프트'가 활성 표시되므로 자료명 슬롯은 비운다 */}
      <SiteHeader project="wisebirds" />

      <main className="bg-surface-sunken">
        <PageHero
          parent={{ href: wb(), label: PROJECTS.wisebirds.name }}
          crumb="프롬프트 라이브러리"
          eyebrow="PROMPT LIBRARY"
          title="프롬프트 라이브러리"
          desc={`2회차 실습의 프롬프트 ${LAB_STATS.prompts}개를 모듈·직무·도구로 좁혀 찾습니다. 본문까지 검색하고, 그대로 복사해 쓸 수 있습니다. 모든 프롬프트는 역할·맥락·과업·지침·제약조건·출력형식 6단 구조입니다.`}
        />

        <section className="bg-white">
          <div className="mx-auto max-w-page px-6 py-12 md:py-14">
            <LibraryBrowser />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
