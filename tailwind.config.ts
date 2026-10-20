import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-grad-violet",
    "bg-grad-blue",
    "bg-grad-teal",
    "bg-grad-coral",
    "bg-page-a",
    "bg-page-b",
    "bg-page-c",
    "bg-page-plain",
    "bg-page-alt",
  ],
  theme: {
    extend: {
      colors: {
        // ── Light violet tone-and-manner (ref: zqendix / stardive #8800ff) ──
        brand: {
          violet: "#7c3aed", // primary
          violetDeep: "#6d28d9",
          indigo: "#4f46e5",
          // per-section supporting accents
          blue: "#2563eb", // B · iOS SKAN
          blueDeep: "#1d4ed8",
          teal: "#0d9488", // C · 웹투앱/앱투웹
          tealDeep: "#0f766e",
          coral: "#f0576d", // supporting / legacy Wisebirds
          // text ramp
          ink: "#0f172a",
          sub: "#334155",
          mut: "#64748b",
          faint: "#94a3b8",
        },
        line: "rgba(15,23,42,0.09)",
        surface: {
          base: "#f7f8fc",
          card: "#ffffff",
          soft: "#f4f6fb",
          mist: "#eef1f8",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        display: ["Space Grotesk", "Pretendard Variable", "Pretendard", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 2px 14px rgba(15,23,42,0.05)",
        cardHover: "0 16px 40px rgba(15,23,42,0.12)",
        float: "0 18px 44px rgba(15,23,42,0.16)",
        mock: "0 24px 60px rgba(15,23,42,0.22)",
        glowViolet: "0 8px 24px rgba(124,58,237,0.34)",

        // ── 입체감 단계 (elevation) ──
        // 여러 겹을 쌓아 가까운 그림자는 진하고 좁게, 먼 그림자는 옅고 넓게 둔다.
        e1: "0 1px 2px rgba(15,23,42,0.05), 0 2px 8px -2px rgba(15,23,42,0.06)",
        e2: "0 1px 2px rgba(15,23,42,0.05), 0 6px 16px -4px rgba(15,23,42,0.10), 0 14px 32px -12px rgba(15,23,42,0.12)",
        e3: "0 2px 4px rgba(15,23,42,0.06), 0 12px 28px -6px rgba(15,23,42,0.13), 0 30px 60px -14px rgba(15,23,42,0.18)",
        // 위쪽 1px 하이라이트를 얹어 표면이 떠 있는 느낌을 만든다
        raise:
          "inset 0 1px 0 rgba(255,255,255,0.95), 0 1px 2px rgba(15,23,42,0.05), 0 6px 16px -4px rgba(15,23,42,0.10), 0 14px 32px -12px rgba(15,23,42,0.12)",
        raiseHover:
          "inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 4px rgba(15,23,42,0.06), 0 14px 30px -6px rgba(15,23,42,0.14), 0 34px 64px -16px rgba(15,23,42,0.20)",
        // 작은 칩 — 위쪽 하이라이트 + 얕은 그림자
        pill: "inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 6px rgba(15,23,42,0.07)",
      },
      backgroundImage: {
        "grad-violet": "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)",
        "grad-blue": "linear-gradient(135deg,#60a5fa 0%,#2563eb 100%)",
        "grad-teal": "linear-gradient(135deg,#5eead4 0%,#0d9488 100%)",
        "grad-coral": "linear-gradient(135deg,#fbb18a 0%,#f0576d 100%)",
        "page-a": "linear-gradient(165deg,#ffffff 0%,#f5f3ff 100%)",
        "page-b": "linear-gradient(165deg,#ffffff 0%,#f0f5ff 100%)",
        "page-c": "linear-gradient(165deg,#ffffff 0%,#effcf9 100%)",
        "page-plain": "linear-gradient(165deg,#ffffff 0%,#f7f8fc 100%)",
        "page-alt": "linear-gradient(165deg,#f5f3ff 0%,#e9e4ff 100%)",

        // ── 표면 (입체감) ──
        // 위가 밝고 아래로 어두워지는 카드 면 → 광원이 위에 있는 것처럼 읽힌다
        "surface-raise": "linear-gradient(180deg,#ffffff 0%,#f8f9fd 100%)",
        // 가라앉은 면 (섹션 배경)
        "surface-sunken": "linear-gradient(180deg,#eef0f7 0%,#f6f7fc 60%,#f7f8fc 100%)",
        // 히어로 스포트라이트
        "hero-spot":
          "radial-gradient(1100px 520px at 18% -10%, rgba(139,92,246,0.20), transparent 62%), radial-gradient(760px 420px at 88% 8%, rgba(37,99,235,0.14), transparent 60%), linear-gradient(170deg,#faf9ff 0%,#eeeaff 100%)",
      },
      backgroundSize: {
        grid: "34px 34px",
      },
      spacing: {
        // 상단 바 높이의 단일 출처 — globals.css 의 --topbar-h.
        // height 가 아니라 spacing 에 넣어 h-topbar · top-topbar · pt-topbar · min-h-topbar 가
        // 한 번에 생기게 한다 (좌표를 arbitrary calc 로 흩뿌리지 않도록).
        topbar: "var(--topbar-h)",
      },
      maxWidth: {
        // 페이지 콘텐츠 폭의 단일 출처 — 상단 바·본문·푸터가 모두 이 값을 쓴다.
        // 리터럴 max-w-[1160px] 을 흩뿌리면 폭을 바꿀 때 반드시 한두 곳이 남는다.
        page: "1160px",
      },
      zIndex: {
        // 적층 순서를 이름으로 고정한다. 예전에 바(30)·레일(40)·오버레이(40)·진행바(40) 가
        // 같은 값을 써서 드로어 오버레이가 상단 바를 덮는 버그가 났다.
        bar: "30",
        rail: "40",
        overlay: "20",
        sheet: "50",
        modal: "70",
        pop: "80",
      },
      // 여기 keyframes 는 짝이 되는 animation 유틸리티를 **쓰는 곳이 있어야** 출력된다.
      // 손으로 쓴 CSS 클래스가 참조할 키프레임은 globals.css 에 직접 둔다(.flow-dash 참고).
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        bob: "bob 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
