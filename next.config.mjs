/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // 2026-08-02 포털 개편 — 사이트가 프로젝트 둘로 갈라지면서 와이즈버즈 자료가
      // 전부 `/wisebirds` 아래로 내려갔다. 그 전에 공유된 링크를 살린다.
      // (리다이렉트는 middleware 보다 먼저 도므로, 잠긴 자료도 새 경로로 옮겨진 뒤 게이트를 만난다)
      //
      // ⚠️ 2026-07-30 규칙들(`/edu/lab` 등)이 이 규칙보다 **위에** 있어야 한다.
      //    Next 는 첫 번째로 맞는 규칙만 적용하므로, `/edu/:path*` 가 먼저 오면
      //    `/edu/lab` 이 `/wisebirds/edu/lab`(없는 페이지)로 가버린다.
      { source: "/edu/lab", destination: "/wisebirds/edu/example", permanent: true },
      { source: "/edu/lab/:slug", destination: "/wisebirds/edu/example/:slug", permanent: true },
      { source: "/edu/dev-onboarding", destination: "/wisebirds/edu/session-1", permanent: true },

      // 2026-08-12 — 2회차 자료를 새로 만들기로 하면서, 그 자리에 있던 「AI 프롬프트 실습」이
      // `/edu/example`(예시)로 내려갔다. **하위 경로만** 넘긴다 —
      // `/wisebirds/edu/session-2` 자체는 새로 만드는 2회차 자리라 살아 있어야 한다.
      //
      // ⚠️ 개편 전 경로(`/edu/session-2/3-1`)도 여기서 **한 번에** 최종 목적지로 보낸다.
      //    아래 `/edu/:path*` 에 맡기면 `/wisebirds/edu/session-2/3-1` 을 거쳐 두 번 튕긴다.
      { source: "/edu/session-2/:slug", destination: "/wisebirds/edu/example/:slug", permanent: true },
      {
        source: "/wisebirds/edu/session-2/:slug",
        destination: "/wisebirds/edu/example/:slug",
        permanent: true,
      },
      // 앱 광고 덱은 원래 루트(/)에 있었다. 루트는 리다이렉트할 수 없으므로
      // 짧은 기간 쓰였던 하위 경로만 넘긴다.
      { source: "/app-ads", destination: "/wisebirds/prototype/app-ads", permanent: true },

      { source: "/edu", destination: "/wisebirds/edu", permanent: true },
      { source: "/edu/:path*", destination: "/wisebirds/edu/:path*", permanent: true },
      { source: "/library", destination: "/wisebirds/library", permanent: true },
      { source: "/prototype", destination: "/wisebirds/prototype", permanent: true },
      { source: "/prototype/:path*", destination: "/wisebirds/prototype/:path*", permanent: true },
      { source: "/실습파일/:path*", destination: "/wisebirds/실습파일/:path*", permanent: true },

      // 2026-08-04 HSAD 덱 통합 — 기획서 발표와 개발 기획이 `/hsad/deck` 한 벌로 합쳐졌다.
      // 경쟁하는 와일드카드가 없어 위치는 자유지만, 규칙은 날짜별로 묶어 둔다.
      { source: "/hsad/dev-deck", destination: "/hsad/deck", permanent: true },
    ];
  },
};

export default nextConfig;
