"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { verifyGate, type GateState } from "../actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-grad-violet px-5 py-3 text-[14px] font-bold text-white shadow-glowViolet transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60"
    >
      {pending ? "확인 중…" : "들어가기"}
    </button>
  );
}

export function GateForm({ project, next }: { project: string; next: string }) {
  // project · next 는 여기서 묶여 서버로 돌아간다 — 서버가 다시 검증한다 (actions.ts 참고)
  const [state, action] = useActionState<GateState, FormData>(
    verifyGate.bind(null, project, next),
    {}
  );

  return (
    <form action={action}>
      <label htmlFor="gate-password" className="block text-[12.5px] font-bold text-brand-mut">
        진입 비밀번호
      </label>
      <input
        id="gate-password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        aria-describedby={state.error ? "gate-error" : undefined}
        className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-semibold outline-none transition-colors placeholder:font-medium placeholder:text-brand-faint focus:border-brand-violet/50"
        placeholder="전달받은 비밀번호"
      />

      {/* 자리를 늘 잡아두면 에러가 떠도 버튼이 아래로 튀지 않는다 */}
      <p
        id="gate-error"
        role="alert"
        aria-live="polite"
        className="mt-2 min-h-[18px] text-[12.5px] font-bold text-brand-coral"
      >
        {state.error}
      </p>

      <Submit />
    </form>
  );
}
