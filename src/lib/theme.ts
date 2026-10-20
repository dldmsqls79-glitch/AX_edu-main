/** Shared design tokens — light violet tone-and-manner. */

export type Accent = "violet" | "blue" | "teal" | "coral" | "navy";

interface AccentTokens {
  main: string;
  deep: string;
  dot: string;
  soft: string; // rgba background tint
  grad: string; // tailwind bg-* gradient class
  gradCss: string; // raw linear-gradient() for inline style
  text: string; // tailwind text-* class
  ring: string; // rgba for focus ring / glow
  pageBg: string; // tailwind bg-* page background class
}

export const ACCENTS: Record<Accent, AccentTokens> = {
  violet: {
    main: "#7c3aed",
    deep: "#6d28d9",
    dot: "#8b5cf6",
    soft: "rgba(124,58,237,0.10)",
    grad: "bg-grad-violet",
    gradCss: "linear-gradient(135deg,#a78bfa 0%,#7c3aed 100%)",
    text: "text-brand-violet",
    ring: "rgba(124,58,237,0.24)",
    pageBg: "bg-page-a",
  },
  blue: {
    main: "#2563eb",
    deep: "#1d4ed8",
    dot: "#3b82f6",
    soft: "rgba(37,99,235,0.10)",
    grad: "bg-grad-blue",
    gradCss: "linear-gradient(135deg,#60a5fa 0%,#2563eb 100%)",
    text: "text-brand-blue",
    ring: "rgba(37,99,235,0.24)",
    pageBg: "bg-page-b",
  },
  teal: {
    main: "#0d9488",
    deep: "#0f766e",
    dot: "#14b8a6",
    soft: "rgba(13,148,136,0.12)",
    grad: "bg-grad-teal",
    gradCss: "linear-gradient(135deg,#5eead4 0%,#0d9488 100%)",
    text: "text-brand-teal",
    ring: "rgba(13,148,136,0.24)",
    pageBg: "bg-page-c",
  },
  coral: {
    main: "#f0576d",
    deep: "#e23e5a",
    dot: "#f0576d",
    soft: "rgba(240,87,109,0.10)",
    grad: "bg-grad-coral",
    gradCss: "linear-gradient(135deg,#fbb18a 0%,#f0576d 100%)",
    text: "text-brand-coral",
    ring: "rgba(240,87,109,0.24)",
    pageBg: "bg-page-plain",
  },
  navy: {
    main: "#4f46e5",
    deep: "#4338ca",
    dot: "#6366f1",
    soft: "rgba(79,70,229,0.10)",
    grad: "bg-grad-violet",
    gradCss: "linear-gradient(135deg,#818cf8 0%,#4f46e5 100%)",
    text: "text-brand-indigo",
    ring: "rgba(79,70,229,0.22)",
    pageBg: "bg-page-alt",
  },
};
