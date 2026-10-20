import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { WisebirdsLogo } from "@/components/Logo";
import { Eyebrow, UpLink } from "@/components/site/chrome";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { cookieName, isConfigured, verifyToken } from "@/lib/gate";
import { isProjectId, PROJECTS, safeNext } from "@/lib/projects";
import { GateForm } from "./GateForm";

export const metadata: Metadata = {
  title: "진입 비밀번호",
  robots: { index: false, follow: false },
};

/**
 * 진입 게이트.
 *
 * 프로젝트 접두사 **밖**(`/gate/…`)에 있어야 한다 — 안에 있으면 middleware 가
 * 게이트 자신을 다시 게이트로 보내 무한 리다이렉트가 된다.
 */
export default async function GatePage({
  params,
  searchParams,
}: {
  params: Promise<{ project: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { project } = await params;
  if (!isProjectId(project)) notFound();

  const sp = await searchParams;
  const raw = Array.isArray(sp.next) ? sp.next[0] : sp.next;
  const next = safeNext(project, raw);

  // 이미 통과한 사람에게 비밀번호를 다시 묻지 않는다 (뒤로가기로 게이트에 되돌아온 경우)
  const jar = await cookies();
  if (await verifyToken(project, jar.get(cookieName(project))?.value)) redirect(next);

  const proj = PROJECTS[project];
  const configured = isConfigured(project);

  return (
    /* 포털과 같은 셸 — 문서 스크롤 없이 한 화면에서 끝난다 (자세한 이유는 app/page.tsx) */
    <div className="fixed inset-0 flex flex-col bg-surface-base font-sans text-brand-ink">
      <SiteHeader mode="shell" />

      <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-y-auto bg-hero-spot px-6 py-10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid-fine mask-fade-y opacity-50" />
          <div className="absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-grad-violet opacity-[0.14] blur-[90px]" />
        </div>

        <div className="edge-top relative w-full max-w-[420px] rounded-2xl border border-line bg-surface-raise p-7 shadow-raise">
          <WisebirdsLogo height={22} />

          <span className="mt-5 block">
            <Eyebrow>{proj.badge}</Eyebrow>
          </span>

          <h1 className="mt-3.5 text-[24px] font-extrabold leading-tight tracking-tight">
            {proj.name}
          </h1>
          <p className="mt-2 text-[13.5px] leading-[1.7] text-brand-mut">
            {configured
              ? "이 프로젝트는 비밀번호로 잠겨 있습니다. 전달받은 비밀번호를 입력하세요."
              : "게이트가 아직 설정되지 않았습니다. 관리자에게 문의하세요."}
          </p>

          <div className="mt-6">
            {configured ? (
              <GateForm project={project} next={next} />
            ) : (
              /* 설정이 비면 게이트는 닫는 쪽으로 실패한다 — 입력창을 아예 그리지 않는다 */
              <p className="rounded-xl border border-dashed border-line bg-white/50 px-4 py-3 text-[12.5px] font-semibold text-brand-faint">
                환경변수 <code className="font-mono">{proj.pwEnv}</code> ·{" "}
                <code className="font-mono">AX_SESSION_SECRET</code> 가 필요합니다.
              </p>
            )}
          </div>

          <div className="mt-6 border-t border-line pt-4">
            <UpLink href="/" label="포털로 돌아가기" collapse={false} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
