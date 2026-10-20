/**
 * 프롬프트 본문의 {변수} 치환 — 실습 화면과 프롬프트 라이브러리가 **같은 규칙**을 쓴다.
 *
 * 이 규칙이 두 곳으로 갈라지면 "라이브러리에서 복사한 프롬프트"와
 * "실습에서 복사한 프롬프트"가 서로 다른 글이 된다.
 */
import { AUTO_VARS, type LabVar } from "./lab-data";

/** `{광고주}` `{광고주_업종}` — 공백이 없는 중괄호 토큰 */
export const TOKEN = /\{([^}\s]+)\}/g;

type Vals = Record<string, string>;

/** 변수의 기본값 — 사용자가 아무것도 고르지 않은 상태 */
export const defaultVals = (vars: LabVar[]): Vals =>
  Object.fromEntries(vars.map((v) => [v.name, v.default]));

/**
 * 다른 선택값에서 자동으로 채워지는 변수의 현재 값.
 * 자동 변수가 아니면 `null`, 자동 변수인데 대응값이 없으면 `""`.
 */
export function autoValue(name: string, vals: Vals): string | null {
  const spec = AUTO_VARS[name];
  if (!spec) return null;
  return spec.map[vals[spec.from] ?? ""] ?? "";
}

/** 값이 비어 있는 자동 변수가 들어간 줄은 통째로 뺀다 */
export function visibleLines(text: string, vals: Vals): string[] {
  return text.split("\n").filter((line) => {
    for (const [, name] of line.matchAll(TOKEN)) {
      if (name in AUTO_VARS && !autoValue(name, vals)) return false;
    }
    return true;
  });
}

/**
 * 선택값이 반영된 평문 — 복사 버튼이 클립보드에 넣는 내용.
 * `known` 에 없는 토큰은 손대지 않고 그대로 남긴다(프롬프트가 의도한 자리표시자일 수 있다).
 */
export function plainPrompt(text: string, vals: Vals, known: Set<string>): string {
  return visibleLines(text, vals)
    .map((line) =>
      line.replace(TOKEN, (whole, name: string) => {
        if (name in AUTO_VARS) return autoValue(name, vals) || whole;
        if (known.has(name)) return vals[name] || whole;
        return whole;
      })
    )
    .join("\n");
}

/** 변수 기본값으로 치환한 평문 — 라이브러리처럼 값을 고르는 UI 가 없는 곳에서 쓴다 */
export const plainWithDefaults = (text: string, vars: LabVar[]): string =>
  plainPrompt(text, defaultVals(vars), new Set(vars.map((v) => v.name)));
