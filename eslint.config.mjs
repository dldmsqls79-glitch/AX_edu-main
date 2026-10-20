import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// eslint-config-next 는 아직 eslintrc 형식이라 FlatCompat 로 감싼다.
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "public/**",
      "next-env.d.ts",
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      /* 로고·아이콘은 모두 public/ 의 정적 에셋이고 크기를 코드에서 고정해 쓴다.
         next/image 의 최적화 파이프라인이 필요 없으므로 <img> 를 허용한다.
         (원래는 파일마다 eslint-disable 주석을 달아 두고 있었다) */
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
