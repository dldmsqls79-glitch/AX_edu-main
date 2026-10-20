"use client";

/**
 * 라이브러리 필터 한 줄 — [라벨] [전체][칩][칩]…
 * 세 축(모듈·직무·도구)이 같은 모양을 쓰도록 한 곳에만 둔다.
 */
export function FilterRow<T extends string | number>({
  label,
  options,
  value,
  onChange,
  colorOf,
}: {
  label: string;
  options: { value: T; label: string; count: number }[];
  /** 선택 없음 = 전체 */
  value: T | undefined;
  onChange: (v: T | undefined) => void;
  /** 선택됐을 때 쓸 색 (없으면 violet) */
  colorOf?: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
      <span className="w-[42px] flex-none text-[12px] font-bold text-brand-faint">
        {label}
      </span>

      <div className="flex flex-wrap gap-1.5">
        <Chip on={value === undefined} onClick={() => onChange(undefined)}>
          전체
        </Chip>

        {options.map((o) => (
          <Chip
            key={String(o.value)}
            on={value === o.value}
            color={colorOf?.(o.value)}
            disabled={o.count === 0}
            onClick={() => onChange(value === o.value ? undefined : o.value)}
          >
            {/* 라벨과 개수 사이에 공백을 넣는다 — 없으면 접근 이름이 "M35" 로 붙어 읽힌다 */}
            {o.label}{" "}
            <span className="opacity-55">{o.count}</span>
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  on,
  color = "#7c3aed",
  disabled,
  onClick,
  children,
}: {
  on: boolean;
  color?: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={on}
      className={`rounded-full border px-3 py-1 text-[12.5px] font-bold transition-colors ${
        on
          ? "text-white"
          : disabled
            ? "cursor-not-allowed border-line bg-white/50 text-brand-faint opacity-55"
            : "border-line bg-white text-brand-sub hover:border-brand-violet/40 hover:text-brand-violet"
      }`}
      style={on ? { background: color, borderColor: color } : undefined}
    >
      {children}
    </button>
  );
}
