import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UpLink } from "@/components/site/chrome";
import { ACCENTS } from "@/lib/theme";
import { FilesButton } from "@/components/lab/FilesButton";
import { LabPager } from "@/components/lab/LabPager";
import { PromptCard } from "@/components/lab/PromptCard";
import {
  FLAT_LABS,
  MODULES,
  findLab,
  findModule,
  labHref,
  moduleHasFiles,
  moduleZip,
  type FlatLab,
  type LabModule,
} from "@/lib/lab-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return [
    ...MODULES.map((m) => ({ slug: `m${m.num}` })),
    ...FLAT_LABS.map((l) => ({ slug: l.id })),
  ];
}

/** "m3" → 모듈 개요, "3-1" → 개별 실습 */
function resolve(slug: string) {
  const mod = slug.match(/^m(\d+)$/);
  if (mod) return { module: findModule(Number(mod[1])) };
  if (/^\d+-\d+$/.test(slug)) return { lab: findLab(slug) };
  return {};
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { module: m, lab } = resolve(slug);
  if (m) return { title: `Module ${m.num}. ${m.subject}`, description: m.tagline };
  if (lab) return { title: `실습 ${lab.id}. ${lab.title}`, description: lab.goal };
  return {};
}

export default async function LabSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const { module: m, lab } = resolve(slug);
  if (m) return <ModuleView m={m} />;
  if (lab) return <LabView lab={lab} />;
  notFound();
}

/* ─────────────── 모듈 개요 ─────────────── */

function ModuleView({ m }: { m: LabModule }) {
  const a = ACCENTS[m.accent];

  return (
    <div className="mx-auto max-w-page px-6 pb-20">
      <div className="mt-6">
        <UpLink href={labHref()} label="전체 모듈" collapse={false} />
      </div>

      {/* 상단 바가 유일한 banner 랜드마크여야 하므로 페이지 내부는 header 를 쓰지 않는다 */}
      <div className="edge-top relative mt-4 overflow-hidden rounded-2xl border border-line bg-surface-raise shadow-raise">
        <span aria-hidden className="block h-1" style={{ background: a.gradCss }} />
        <div className="px-7 py-7">
          <span
            className="rounded-md px-2 py-0.5 font-display text-[11.5px] font-bold tracking-wide"
            style={{ background: a.soft, color: a.deep }}
          >
            MODULE {m.num}
          </span>
          <h1 className="mt-3.5 text-[30px] font-extrabold leading-tight tracking-tight md:text-[36px]">
            {m.subject}
          </h1>
          <p className="mt-2.5 text-[15px] font-semibold" style={{ color: a.deep }}>
            {m.tagline}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1.35fr_1fr] md:items-start">
        <section className="edge-top relative overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise">
          <h2 className="text-[14px] font-extrabold tracking-tight">모듈 소개</h2>
          <p className="mt-3 text-[14px] leading-[1.85] text-brand-sub">{m.desc}</p>
        </section>

        <section className="edge-top relative overflow-hidden rounded-2xl border border-line bg-surface-raise p-6 shadow-raise">
          <h2 className="text-[14px] font-extrabold tracking-tight">
            이 모듈에서 배우는 것
          </h2>
          <ul className="mt-3 space-y-2.5">
            {m.points.map((p) => (
              <li key={p} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-brand-sub">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full" style={{ background: a.main }} />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-line pt-4">
            <span className="text-[11.5px] font-bold text-brand-faint">사용 도구</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {m.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-2.5 py-0.5 text-[11.5px] font-bold"
                  style={{ borderColor: `${a.main}44`, color: a.deep, background: a.soft }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {moduleHasFiles(m) && (
            <a
              href={encodeURI(moduleZip(m.num))}
              download
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: a.main }}
            >
              ⬇ 이 모듈 실습 파일 전체 ZIP
            </a>
          )}
        </section>
      </div>

      <section className="mt-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[18px] font-extrabold tracking-tight">
            실습 {m.labs.length}개
          </h2>
          <span className="text-[12px] font-semibold text-brand-mut">
            순서대로 진행하는 것을 권장합니다
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          {m.labs.map((l) => (
            <Link
              key={l.id}
              href={labHref(`/${l.id}`)}
              className="group flex items-start gap-4 edge-top relative overflow-hidden rounded-2xl border border-line bg-surface-raise px-5 py-4 shadow-raise transition-all hover:-translate-y-0.5 hover:shadow-cardHover"
            >
              <span
                className="mt-0.5 flex-none rounded-lg px-2 py-1 font-display text-[12px] font-bold"
                style={{ background: a.soft, color: a.deep }}
              >
                {l.id}
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-[15.5px] font-extrabold tracking-tight">
                  {l.title}
                </b>
                <span className="mt-1 block text-[13px] leading-[1.65] text-brand-mut">
                  {l.goal}
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-1.5">
                  {l.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2 py-0.5 text-[10.5px] font-bold text-brand-faint"
                    >
                      {t}
                    </span>
                  ))}
                  {l.files.length > 0 && (
                    <span className="text-[10.5px] font-bold text-brand-faint">
                      📎 파일 {l.files.length}
                    </span>
                  )}
                </span>
              </span>
              <span
                aria-hidden
                className="mt-1 flex-none text-[15px] transition-transform group-hover:translate-x-1"
                style={{ color: a.main }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────── 개별 실습 ─────────────── */

function LabView({ lab }: { lab: FlatLab }) {
  const a = ACCENTS[lab.mod.accent];

  return (
    <div className="mx-auto flex h-full max-w-page flex-col px-6">
      {/* 상단 바가 유일한 banner 랜드마크 — 여기는 페이지 제목 줄이므로 div */}
      <div className="flex flex-none flex-wrap items-center gap-x-3 gap-y-2 pb-3 pt-5">
        <UpLink href={labHref(`/m${lab.mod.num}`)} label={`M${lab.mod.num}`} collapse={false} />
        <h1 className="flex-none text-[17px] font-extrabold tracking-tight">
          실습 {lab.id}. {lab.title}
        </h1>
        <p className="min-w-0 flex-1 truncate text-[12.5px] text-brand-mut" title={lab.goal}>
          {lab.goal}
        </p>
        <span className="flex flex-none flex-wrap items-center gap-1.5">
          {lab.tools.map((t) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{ background: a.soft, color: a.deep }}
            >
              {t}
            </span>
          ))}
        </span>
        <FilesButton
          files={lab.files}
          labId={lab.id}
          labTitle={lab.title}
          moduleNum={lab.mod.num}
          accent={a.main}
        />
      </div>

      <PromptCard lab={lab} accent={a.main} />
      <LabPager labId={lab.id} />
    </div>
  );
}
