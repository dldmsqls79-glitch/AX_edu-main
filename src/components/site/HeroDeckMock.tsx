/**
 * 히어로 우측 시각물 — 겹쳐 쌓인 자료 카드 + 앞쪽 브라우저 목업.
 * "교육 자료를 웹 프레젠테이션으로 만든다"를 한눈에 보여주고, 히어로의 빈 오른쪽을 채운다.
 */
export function HeroDeckMock() {
  return (
    <div aria-hidden className="relative h-[340px] w-full select-none">
      {/* 뒤쪽 카드 2장 — 살짝 회전시켜 겹쳐 둔다 */}
      <div className="absolute left-[13%] right-[3%] top-[16%] h-[210px] rotate-[5deg] rounded-2xl border border-line bg-white/70 shadow-e2" />
      <div className="absolute left-[8%] right-[7%] top-[10%] h-[220px] rotate-[2.5deg] rounded-2xl border border-line bg-white/85 shadow-e2" />

      {/* 앞쪽 브라우저 목업 */}
      <div className="absolute left-0 right-[11%] top-0 -rotate-[1.5deg] overflow-hidden rounded-2xl border border-line bg-white shadow-e3">
        {/* 타이틀 바 */}
        <div className="flex items-center gap-2 border-b border-line bg-surface-soft px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 flex-1 truncate rounded-md border border-line bg-white px-2.5 py-1 font-mono text-[10px] text-brand-faint">
            wisebirds-ax / edu / session-1
          </span>
        </div>

        {/* 슬라이드 내용 */}
        <div className="relative bg-page-a px-5 pb-6 pt-5">
          <span className="font-display text-[9px] font-bold tracking-[0.22em] text-brand-violet/80">
            PAGE 03
          </span>
          <div className="mt-2 text-[15px] font-extrabold leading-tight tracking-tight text-brand-ink">
            각 도구의 역할과 데이터 흐름
          </div>

          {/* 흐름도 미니 */}
          <div className="mt-4 flex items-center gap-1.5">
            {["VS Code", "Node", "Claude"].map((t) => (
              <span
                key={t}
                className="flex-1 rounded-lg border border-line bg-white px-1.5 py-2 text-center text-[8.5px] font-bold text-brand-sub shadow-e1"
              >
                {t}
              </span>
            ))}
            <span className="px-0.5 text-[10px] text-brand-faint">→</span>
            {["GitHub", "Vercel"].map((t) => (
              <span
                key={t}
                className="flex-1 rounded-lg border border-line bg-white px-1.5 py-2 text-center text-[8.5px] font-bold text-brand-sub shadow-e1"
              >
                {t}
              </span>
            ))}
          </div>

          {/* 본문 스켈레톤 — 오른쪽 아래는 프롬프트 칩이 덮으므로 왼쪽만 채운다 */}
          <div className="mt-4 space-y-1.5 pb-2">
            <span className="block h-1.5 w-[80%] rounded-full bg-brand-ink/10" />
            <span className="block h-1.5 w-[62%] rounded-full bg-brand-ink/[0.07]" />
            <span className="block h-1.5 w-[44%] rounded-full bg-brand-ink/[0.07]" />
          </div>
        </div>
      </div>

      {/* 앞쪽 떠 있는 프롬프트 칩 — 브라우저 아래 모서리에 살짝 걸쳐 깊이를 한 겹 더 만든다 */}
      <div className="absolute bottom-3 right-[2%] w-[58%] rotate-[1deg] overflow-hidden rounded-xl border border-white/10 bg-[#151a23] shadow-e3">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
          <span className="font-mono text-[9px] font-semibold text-white/40">prompt.txt</span>
          <span className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[8px] font-bold text-white">
            복사
          </span>
        </div>
        <div className="px-3 py-2.5 font-mono text-[9px] leading-[1.7] text-[#e9edf4]">
          <div>[역할] 시니어 매체 운영자</div>
          <div>
            - 광고주:{" "}
            <span className="rounded bg-white/15 px-1 font-semibold">커머스 A사</span>
          </div>
          <div>
            - 매체: <span className="rounded bg-white/15 px-1 font-semibold">Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
}
