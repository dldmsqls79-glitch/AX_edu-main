/**
 * 클립보드 복사 — 실습 화면과 프롬프트 라이브러리가 같은 경로를 쓴다.
 * `navigator.clipboard` 는 안전하지 않은 출처(사내 IP 접속 등)에서 막히므로 대체 경로를 둔다.
 */
export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // 아래 대체 경로로 넘어간다
  }

  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}
