import { cookies } from "next/headers";
import Link from "next/link";
import { Reveal } from "@/components/slide-kit";
import { Eyebrow } from "@/components/site/chrome";
import { HeroCanvas } from "@/components/site/HeroCanvas";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { cookieName, verifyToken } from "@/lib/gate";
import { gateHref, PROJECTS, PROJECT_IDS, type ProjectId } from "@/lib/projects";

/**
 * 포털 — 사이트의 유일한 공개 화면.
 *
 * **이름과 잠금 상태까지만** 보여준다. 프로젝트 안에 무엇이 있는지(회차 수·실습 수·목차)는
 * 그 자체로 내용이므로 여기 두지 않는다 — 그래서 이 페이지는 `lab-data` 를 아예 import 하지 않는다.
 *
 * 레이아웃은 덱·실습과 같은 **셸**이다 — `fixed inset-0 flex flex-col` 에 바와 푸터가 `flex-none`,
 * 본문이 `flex-1`. 문서 스크롤이 아예 생기지 않아 한 화면에서 끝난다.
 * (본문에만 `overflow-y-auto` 를 둔다 — 아주 낮은 뷰포트에서 내용이 잘리지 않게 하는 안전판)
 *
 * 쿠키를 읽어 잠김/열림을 그리므로 이 페이지만 동적 렌더다 (나머지는 정적 프리렌더 유지).
 */
export default async function Portal() {
  const jar = await cookies();
  const open = Object.fromEntries(
    await Promise.all(
      PROJECT_IDS.map(
        async (id) => [id, await verifyToken(id, jar.get(cookieName(id))?.value)] as const
      )
    )
  ) as Record<ProjectId, boolean>;

  return (
    <div className="fixed inset-0 flex flex-col bg-surface-base font-sans text-brand-ink">
      <SiteHeader mode="shell" />

      <main className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-hero-spot">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid-fine mask-fade-y opacity-60" />
          <HeroCanvas className="absolute inset-0 h-full w-full" />
          <div className="absolute -right-40 -top-44 h-[420px] w-[420px] rounded-full bg-grad-violet opacity-[0.13] blur-[100px]" />
        </div>

        <div className="relative mx-auto flex min-h-full max-w-page flex-col justify-center px-6 py-12">
          <Reveal>
            <Eyebrow>WISEBIRDS · AI TRANSFORMATION</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 text-[34px] font-extrabold leading-[1.15] tracking-tight md:text-[44px]">
              Wisebirds <span className="text-grad-violet">AX</span>
            </h1>
            <p className="mt-3 max-w-[520px] text-[14.5px] leading-[1.7] text-brand-sub">
              AX 프로그램 포털입니다. 참여 중인 프로젝트를 전달받은 비밀번호로 여세요.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:max-w-[720px]">
            {PROJECT_IDS.map((id, i) => {
              const proj = PROJECTS[id];
              const unlocked = open[id];

              return (
                <Reveal key={id} delay={0.12 + 0.06 * i} className="h-full">
                  <Link
                    href={unlocked ? proj.base : gateHref(id)}
                    className="edge-top group flex h-full items-center gap-4 rounded-2xl border border-line bg-surface-raise px-6 py-5 shadow-raise transition-all duration-200 hover:-translate-y-1 hover:shadow-raiseHover"
                  >
                    <span className="min-w-0 flex-1">
                      <b className="block truncate text-[18px] font-extrabold tracking-tight">
                        {proj.name}
                      </b>
                      <span className="mt-1 flex items-center gap-1.5 text-[12.5px] font-bold text-brand-violet transition-transform group-hover:translate-x-0.5">
                        {unlocked ? "열기" : "비밀번호 입력"}
                        <span aria-hidden>→</span>
                      </span>
                    </span>

                    <span
                      className={`flex-none rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        unlocked
                          ? "bg-brand-teal/10 text-brand-tealDeep"
                          : "bg-surface-mist text-brand-mut"
                      }`}
                    >
                      {unlocked ? "열림" : "🔒 잠김"}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
