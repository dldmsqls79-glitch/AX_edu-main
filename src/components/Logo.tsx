/**
 * 와이즈버즈 CI — public/brand 의 공식 에셋을 그대로 쓴다.
 *
 *  variant  horizontal 가로 조합형(심볼+워드마크) · stacked 세로 조합형 · symbol 심볼 단독
 *  tone     color 컬러 심볼+검정 글자(밝은 배경) · mix 컬러 심볼+흰 글자(어두운 배경)
 *           white 전체 흰색(어두운 배경) · line 선 버전(심볼 전용, 워터마크용)
 *
 * 파일명은 CI 원본 그대로 유지한다(출처가 분명해지고 브랜드킷과 대조하기 쉽다).
 * 경로가 바뀔 일이 있으면 이 파일의 FILES 만 고치면 된다.
 */

const BRAND = "/brand";

type LogoVariant = "horizontal" | "stacked" | "symbol";
type LogoTone = "color" | "mix" | "white" | "line";

const FILES: Record<LogoVariant, Partial<Record<LogoTone, string>>> = {
  horizontal: {
    color: "Wisebirds_CI_Horizontal_01_Color.png",
    mix: "Wisebirds_CI_Horizontal_02_Mix.png",
    white: "Wisebirds_CI_Horizontal_03_White.png",
  },
  stacked: {
    color: "Wisebirds_CI_Basic_01_Color.png",
    mix: "Wisebirds_CI_Basic_02_Mix.png",
    white: "Wisebirds_CI_Basic_03_White.png",
  },
  symbol: {
    color: "Wisebirds_CI_Signature_01_Color.png",
    white: "Wisebirds_CI_Signature_02_White.png",
    line: "Wisebirds_CI_Signature_03_Line.png",
  },
};

/** 원본 픽셀 비율 — 높이만 지정해도 폭이 확정되어 레이아웃이 밀리지 않는다 */
const RATIO: Record<LogoVariant, number> = {
  horizontal: 1000 / 130,
  stacked: 1000 / 342,
  symbol: 1000 / 538,
};

const DEFAULT_HEIGHT: Record<LogoVariant, number> = {
  horizontal: 20,
  stacked: 36,
  symbol: 26,
};

export function WisebirdsLogo({
  variant = "horizontal",
  tone = "color",
  height,
  className = "",
  priority = false,
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  /** 표시 높이(px). 폭은 원본 비율로 자동 계산된다 */
  height?: number;
  className?: string;
  /** 최상단에 보이는 로고면 true — 지연 로딩을 끈다 */
  priority?: boolean;
}) {
  const file = FILES[variant][tone] ?? FILES[variant].color!;
  const h = height ?? DEFAULT_HEIGHT[variant];
  const w = Math.round(h * RATIO[variant]);

  return (
    <img
      src={`${BRAND}/${file}`}
      alt="Wisebirds"
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={`block object-contain ${className}`}
      style={{ height: h, width: w }}
    />
  );
}
