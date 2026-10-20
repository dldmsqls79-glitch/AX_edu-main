'use client'
/**
 * 오픈 프리젠테이션 (공개형 · 로그인 불필요) — /beta/presentation.
 *
 * 교육 자료: "개발 인프라 구축 가이드" — Windows · macOS 양쪽 가이드 제공.
 *   ① Node.js  ② 에디터 비교  ③ VS Code  ④ Claude Code 확장  ⑤ GitHub 연동  ⑥ Vercel 배포
 *
 * SlideDeck 을 open(게이트 없음) + backHref="/beta" 로 사용. 각 슬라이드 label = 상단 우측 짧은 제목.
 * 로고 이미지는 /public/beta-edu/* (공식 브랜드 에셋, 로컬 동일 출처 → CSP·next/image 무관).
 * 숨김 /presentation (platform_admin 전속) 과 완전 분리.
 */
import { Deck, type SlideDef } from '@/components/Deck'
import { PROJECTS, wb } from '@/lib/projects'

/** 원본 SlideDeck 의 슬라이드 타입 — 장표 정의를 그대로 두기 위해 유지한다. */
type DeckSlide = { content: React.ReactNode; bg?: string; dark?: boolean; label?: string }

/** 원본 SlideDeck 의 기본 배경(짝/홀 교차) — bg 미지정 슬라이드에 그대로 적용한다. */
const ALT_BG_A = 'linear-gradient(165deg,#ffffff 0%,#f8fafc 100%)'
const ALT_BG_B = 'linear-gradient(165deg,#f1f5f9 0%,#e2e8f0 100%)'

/* ══ 색상 토큰 (라이트 톤) ══ */
const INK = '#0f172a', SUB = '#334155', MUT = '#64748b', LINE = 'rgba(15,23,42,0.1)'
const EDU = '/dev-edu'
const CLAUDE = `${EDU}/claude.svg`, VERCEL = `${EDU}/vercel.svg`

/* 섹션별 액센트 */
const AC = {
  node:    { main: '#43853d', soft: 'rgba(67,133,61,0.1)', grad: 'linear-gradient(135deg,#6cc24a 0%,#43853d 100%)' },
  compare: { main: '#6366f1', soft: 'rgba(99,102,241,0.1)', grad: 'linear-gradient(135deg,#8b5cf6 0%,#4f46e5 100%)' },
  vscode:  { main: '#0078d4', soft: 'rgba(0,120,212,0.1)', grad: 'linear-gradient(135deg,#29b6f6 0%,#0078d4 100%)' },
  claude:  { main: '#d97757', soft: 'rgba(217,119,87,0.12)', grad: 'linear-gradient(135deg,#f0a58a 0%,#d97757 100%)' },
  github:  { main: '#1f2328', soft: 'rgba(31,35,40,0.08)', grad: 'linear-gradient(135deg,#57606a 0%,#1f2328 100%)' },
  vercel:  { main: '#000000', soft: 'rgba(0,0,0,0.05)', grad: 'linear-gradient(135deg,#555 0%,#000 100%)' },
}

/* ══ 재사용 프리미티브 ══ */
function Frame({ children, w = 1160 }: { children: React.ReactNode; w?: number }) {
  return <div style={{ width: '100%', maxWidth: w, padding: '0 48px', margin: '0 auto' }}>{children}</div>
}
function Logo({ src, alt, size = 52 }: { src: string; alt: string; size?: number }) {
  return <img src={src} alt={alt} width={size} height={size} style={{ objectFit: 'contain', display: 'block' }} />
}
function Kicker({ children, color = '#6366f1' }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.14em', color, fontFamily: 'var(--font-space), sans-serif' }}>{children}</div>
}
function Title({ children }: { children: React.ReactNode }) {
  return <h2 style={{ margin: '10px 0 0', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: INK, lineHeight: 1.15 }}>{children}</h2>
}
function Sub({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: '14px 0 0', fontSize: 17, color: SUB, lineHeight: 1.75, maxWidth: 780 }}>{children}</p>
}
function Em({ children, c = '#4f46e5' }: { children: React.ReactNode; c?: string }) {
  return <b style={{ color: c, fontWeight: 700 }}>{children}</b>
}
function Mono({ children }: { children: React.ReactNode }) {
  return <code style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.92em', background: 'rgba(15,23,42,0.06)', padding: '2px 7px', borderRadius: 6, color: '#0f172a' }}>{children}</code>
}

/* 공식 사이트 링크 칩 (새 탭) */
function LinkChip({ href, label, color, filled = true }: { href: string; label: string; color: string; filled?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', gap: 7, textDecoration: 'none',
      padding: '10px 18px', borderRadius: 100, fontSize: 14.5, fontWeight: 700,
      color: filled ? '#fff' : color, background: filled ? color : '#fff',
      border: `1px solid ${color}${filled ? '' : '55'}`,
      boxShadow: filled ? '0 6px 18px rgba(0,0,0,0.14)' : '0 2px 8px rgba(15,23,42,0.06)',
    }}>{label} <span aria-hidden style={{ fontSize: 13 }}>↗</span></a>
  )
}
function LinkRow({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>{children}</div>
}

/* 터미널 목업 (명령은 Windows·macOS 동일) */
function Terminal({ lines, w = 620, title = 'Windows PowerShell · macOS Terminal' }: { lines: { t: string; c?: string; dim?: boolean }[]; w?: number; title?: string }) {
  return (
    <div style={{ width: '100%', maxWidth: w, borderRadius: 12, overflow: 'hidden', boxShadow: '0 18px 40px rgba(15,23,42,0.18)', border: '1px solid rgba(15,23,42,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 14px', background: '#1e232b' }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: '#8b95a5', fontFamily: 'var(--font-mono, monospace)' }}>{title}</span>
      </div>
      <div style={{ background: '#0d1117', padding: '16px 18px', fontFamily: 'var(--font-mono, monospace)', fontSize: 13.5, lineHeight: 1.85 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.c ?? (l.dim ? '#6e7681' : '#e6edf3'), whiteSpace: 'pre-wrap' }}>{l.t}</div>
        ))}
      </div>
    </div>
  )
}

/* 브라우저 목업 */
function Browser({ url, children, w = 560 }: { url: string; children: React.ReactNode; w?: number }) {
  return (
    <div style={{ width: '100%', maxWidth: w, borderRadius: 12, overflow: 'hidden', boxShadow: '0 18px 40px rgba(15,23,42,0.16)', border: '1px solid rgba(15,23,42,0.12)', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#eef1f5', borderBottom: '1px solid rgba(15,23,42,0.08)' }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
        <span style={{ flex: 1, marginLeft: 8, padding: '5px 12px', borderRadius: 100, background: '#fff', border: '1px solid rgba(15,23,42,0.1)', fontSize: 12, color: MUT, fontFamily: 'var(--font-mono, monospace)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
      </div>
      <div style={{ padding: '22px 20px' }}>{children}</div>
    </div>
  )
}

/* 큰 다운로드/액션 버튼(목업용) */
function DlButton({ label, sub, color }: { label: string; sub: string; color: string }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '14px 28px', borderRadius: 12, background: color, color: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
      <span style={{ fontSize: 16, fontWeight: 800 }}>⭳ {label}</span>
      <span style={{ fontSize: 11, opacity: 0.9 }}>{sub}</span>
    </div>
  )
}

/* OS 별 카드 (Windows / macOS 병기) */
function OsCard({ os, accent, items }: { os: 'win' | 'mac'; accent: string; items: React.ReactNode[] }) {
  const label = os === 'win' ? 'Windows' : 'macOS'
  const icon = os === 'win' ? '🪟' : '🍎'
  return (
    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(15,23,42,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 18px', borderBottom: `1px solid ${LINE}`, background: `${accent}0d` }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 16, fontWeight: 800, color: INK, fontFamily: 'var(--font-space), sans-serif' }}>{label}</span>
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 11 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 7, background: accent, color: '#fff', fontSize: 12.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-space), sans-serif', marginTop: 1 }}>{i + 1}</span>
            <div style={{ fontSize: 14.5, color: SUB, lineHeight: 1.5 }}>{it}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}
function OsGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>{children}</div>
}
/* Windows·macOS 공통 표기 배지 */
function SameBadge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 100, background: 'rgba(15,23,42,0.05)', border: `1px solid ${LINE}`, fontSize: 13, color: SUB, fontWeight: 600 }}>
      <span>🪟 + 🍎</span> {children}
    </div>
  )
}

/* 단계 리스트 */
function Steps({ items, accent }: { items: { h: React.ReactNode; d?: React.ReactNode }[]; accent: string }) {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 9, background: accent, color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-space), sans-serif', marginTop: 1 }}>{i + 1}</span>
          <div>
            <div style={{ fontSize: 16.5, fontWeight: 700, color: INK, lineHeight: 1.45 }}>{it.h}</div>
            {it.d && <div style={{ fontSize: 14, color: MUT, lineHeight: 1.55, marginTop: 3 }}>{it.d}</div>}
          </div>
        </li>
      ))}
    </ol>
  )
}

/* 섹션 표지 */
function SectionCover({ no, title, sub, accent, logos, osBadge = true }: { no: string; title: string; sub: React.ReactNode; accent: typeof AC.node; logos?: { src: string; alt: string }[]; osBadge?: boolean }) {
  return (
    <Frame w={1040}>
      <div style={{ textAlign: 'center' }}>
        {logos && (
          <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 26 }}>
            {logos.map(l => <Logo key={l.src} src={l.src} alt={l.alt} size={64} />)}
          </div>
        )}
        <div style={{ fontSize: 'clamp(64px,10vw,120px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'var(--font-space), sans-serif', backgroundImage: accent.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{no}</div>
        <h2 style={{ margin: '6px 0 0', fontSize: 'clamp(30px,5vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', color: INK }}>{title}</h2>
        <p style={{ margin: '16px auto 0', fontSize: 18, color: SUB, lineHeight: 1.7, maxWidth: 700 }}>{sub}</p>
        {osBadge && (
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, background: accent.soft, color: accent.main, fontSize: 13, fontWeight: 700 }}>🪟 Windows · 🍎 macOS 가이드 제공</span>
          </div>
        )}
      </div>
    </Frame>
  )
}

/* 카드(불릿) */
function Card({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 12px rgba(15,23,42,0.05)', borderTop: `3px solid ${accent}` }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: INK, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14.5, color: SUB, lineHeight: 1.7 }}>{children}</div>
    </div>
  )
}

/* 마켓플레이스 스타일 확장 항목 (rec = 👍 추천 배지) */
function ExtItem({ emoji, name, pub, desc, id, accent, rec = false }: { emoji: string; name: string; pub: string; desc: React.ReactNode; id: string; accent: string; rec?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 12, background: rec ? 'rgba(34,197,94,0.04)' : '#fff', border: `1px solid ${rec ? 'rgba(22,163,74,0.4)' : LINE}`, boxShadow: '0 1px 6px rgba(15,23,42,0.04)' }}>
      <div style={{ width: 40, height: 40, borderRadius: 9, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 21, flexShrink: 0 }}>{emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14.5, fontWeight: 800, color: INK, lineHeight: 1.3 }}>{name}</span>
          {rec && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '1px 8px', borderRadius: 100, fontSize: 11, fontWeight: 800, color: '#15803d', background: 'rgba(34,197,94,0.14)', border: '1px solid rgba(22,163,74,0.35)' }}>👍 추천</span>}
        </div>
        <div style={{ fontSize: 12, color: MUT, display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
          <span style={{ color: '#2f81f7' }}>☑</span>{pub}
        </div>
        <div style={{ fontSize: 12.5, color: SUB, marginTop: 4, lineHeight: 1.45 }}>{desc}</div>
        <div style={{ fontSize: 11, color: MUT, marginTop: 5, fontFamily: 'var(--font-mono, monospace)' }}>{id}</div>
      </div>
    </div>
  )
}
function ExtGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 14 }}>{children}</div>
}

const EDITORS = { vscode: `${EDU}/vscode.svg`, intellij: `${EDU}/intellij.png`, cursor: `${EDU}/cursor.png` }

/* ── 전체 그림(역할·흐름) 전용 ── */
function RoleMini({ logo, name, role }: { logo: string; name: string; role: string }) {
  return (
    <div style={{ width: 122, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', borderRadius: 12, background: '#fff', border: `1px solid ${LINE}` }}>
      <img src={logo} alt={name} width={30} height={30} style={{ objectFit: 'contain' }} />
      <div style={{ fontSize: 13, fontWeight: 800, color: INK, textAlign: 'center' }}>{name}</div>
      <div style={{ fontSize: 11.5, color: MUT, fontWeight: 600 }}>{role}</div>
    </div>
  )
}
function FlowArrow({ label }: { label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, minWidth: 62 }}>
      {label && <span style={{ fontSize: 11, fontWeight: 700, color: '#475569', fontFamily: 'var(--font-mono, monospace)', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 100, padding: '2px 8px', whiteSpace: 'nowrap' }}>{label}</span>}
      <span aria-hidden style={{ fontSize: 26, color: '#cbd5e1', fontWeight: 800 }}>→</span>
    </div>
  )
}
function RoleCard({ logo, name, role, why, accent }: { logo: string; name: string; role: string; why: React.ReactNode; accent: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${LINE}`, borderTop: `3px solid ${accent}`, padding: '15px 16px', boxShadow: '0 2px 10px rgba(15,23,42,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <img src={logo} alt={name} width={26} height={26} style={{ objectFit: 'contain' }} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>{name}</div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: accent }}>{role}</div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: SUB, lineHeight: 1.6 }}>{why}</div>
    </div>
  )
}
const ROLE_INFO = [
  { logo: `${EDU}/vscode.svg`, name: 'VS Code', role: '작업 공간', accent: AC.vscode.main, why: <>코드를 쓰고 고치는 “책상”.<br />모든 작업이 여기서 이뤄집니다.</> },
  { logo: `${EDU}/node.svg`, name: 'Node.js', role: '실행 엔진', accent: AC.node.main, why: <>코드가 실제로 돌아가게 하는 힘.<br />없으면 만든 것이 작동하지 않습니다.</> },
  { logo: CLAUDE, name: 'Claude Code', role: 'AI 개발 동료', accent: AC.claude.main, why: <>요청하면 코드를 대신 쓰고<br />설명·수정해 주는 조수입니다.</> },
  { logo: `${EDU}/github.svg`, name: 'GitHub', role: '온라인 창고', accent: AC.github.main, why: <>작업물을 안전하게 보관·백업하고,<br />되돌리고, 여럿이 함께 작업합니다.</> },
  { logo: VERCEL, name: 'Vercel', role: '웹 발행소', accent: AC.vercel.main, why: <>완성한 결과물을<br />실제 인터넷 주소로 자동 공개해 줍니다.</> },
]

/* ════════════════════════════════════════════════════════
   슬라이드 — Node → 비교 → VS Code → Claude → GitHub → Vercel
   (label = 상단 우측 짧은 제목, 10자 이내)
   ════════════════════════════════════════════════════════ */
/* ── 코딩 가이드(부록) 전용 — 정본 docs/coding-guidelines.md 를 클라 Blob 으로 다운로드 ── */
const GUIDE_MD = [
  '# 코딩 시 필수 규칙',
  '',
  '> [CLAUDE.md](../CLAUDE.md) §협업 방식의 부속 정본. 흔한 LLM 코딩 실수를 줄이기 위한 행동 가이드라인. 필요 시 프로젝트별 지침과 병합해 적용한다.',
  '',
  '**트레이드오프:** 이 가이드라인은 속도보다 신중함에 치우쳐 있다. 사소한 작업에는 판단력으로 적용한다.',
  '',
  '---',
  '',
  '## 1. 코딩 전에 생각하라',
  '',
  '**가정하지 마라. 혼란을 숨기지 마라. 트레이드오프를 드러내라.**',
  '',
  '구현 전에:',
  '- 가정을 명시적으로 말한다. 불확실하면 묻는다.',
  '- 해석이 여러 가지라면 모두 제시한다 — 혼자 조용히 정하지 마라.',
  '- 더 단순한 접근이 있으면 말한다. 정당한 근거가 있을 때는 반론을 제시한다.',
  '- 불분명하면 멈춘다. 무엇이 혼란스러운지 짚어내고 묻는다.',
  '',
  '## 2. 단순함이 우선',
  '',
  '**문제를 해결하는 최소한의 코드. 추측성 코드 금지.**',
  '',
  '- 요청 범위 밖의 기능 추가 금지.',
  '- 한 번만 쓰이는 코드에 추상화 금지.',
  '- 요청되지 않은 "유연성"·"설정 가능성" 금지.',
  '- 일어날 수 없는 시나리오에 대한 에러 핸들링 금지.',
  '- 200줄로 짠 코드가 50줄로 가능하면, 다시 짜라.',
  '',
  '스스로에게 물어라: "시니어 엔지니어가 이 코드를 보면 과하게 복잡하다고 할까?" 그렇다면 단순화하라.',
  '',
  '## 3. 외과적 변경',
  '',
  '**필요한 것만 건드린다. 자기가 만든 흔적만 정리한다.**',
  '',
  '기존 코드 수정 시:',
  '- 인접한 코드·주석·포맷을 "개선"하지 마라.',
  '- 망가지지 않은 것을 리팩터링하지 마라.',
  '- 자기 스타일과 다르더라도 기존 스타일을 따른다.',
  '- 무관한 데드 코드를 발견하면 알리되, 직접 지우지 마라.',
  '',
  '자기 변경이 고아 코드를 만든 경우:',
  '- 자기 변경으로 인해 사용되지 않게 된 import·변수·함수만 제거한다.',
  '- 사전에 존재하던 데드 코드는 요청 없이 제거하지 마라.',
  '',
  '테스트: 변경된 모든 줄이 사용자 요청과 직접 연결되어야 한다.',
  '',
  '## 4. 목표 주도 실행',
  '',
  '**성공 기준을 정의하고, 검증될 때까지 반복하라.**',
  '',
  '작업을 검증 가능한 목표로 변환한다:',
  '- "검증 추가" → "잘못된 입력에 대한 테스트를 짜고, 통과시킨다"',
  '- "버그 수정" → "버그를 재현하는 테스트를 짜고, 통과시킨다"',
  '- "X 리팩터링" → "리팩터 전후 테스트가 모두 통과하는지 확인한다"',
  '',
  '다단계 작업은 짧은 계획을 명시한다:',
  '```',
  '1. [단계] → 검증: [확인]',
  '2. [단계] → 검증: [확인]',
  '3. [단계] → 검증: [확인]',
  '```',
  '',
  '강한 성공 기준은 독립적으로 루프(반복 검증)할 수 있게 해준다. 약한 기준("그냥 동작하게만")은 끊임없는 재확인을 요구한다.',
  '',
  '---',
  '',
  '**이 가이드라인이 작동하고 있다는 신호:** diff 에 불필요한 변경이 줄어든다 / 과도한 복잡도로 인한 재작성이 줄어든다 / 실수 이후가 아닌 구현 이전에 질문이 나온다.',
  '',
].join('\n')

function downloadGuide() {
  const blob = new Blob([GUIDE_MD], { type: 'text/markdown;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'coding-guidelines.md'
  a.click()
  URL.revokeObjectURL(a.href)
}
function GuideDownload() {
  return (
    <button onClick={downloadGuide} style={{
      display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 100,
      border: `1px solid ${AC.compare.main}`, background: AC.compare.main, color: '#fff',
      fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-sans)',
    }}>📄 코딩 가이드 .md 다운로드</button>
  )
}
function GuideCard({ no, title, tagline, children }: { no: string; title: string; tagline: string; children: React.ReactNode }) {
  return (
    <Frame w={1040}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 'clamp(44px,6vw,68px)', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-space), sans-serif', backgroundImage: AC.compare.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', flexShrink: 0 }}>{no}</span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Kicker color={AC.compare.main}>CODING GUIDE</Kicker>
          <h2 style={{ margin: '4px 0 0', fontSize: 'clamp(26px,3.6vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: INK }}>{title}</h2>
        </div>
        <div style={{ flexShrink: 0 }}><GuideDownload /></div>
      </div>
      <div style={{ marginTop: 18, padding: '13px 18px', borderRadius: 12, background: AC.compare.soft, border: `1px solid ${AC.compare.main}33`, fontSize: 'clamp(15px,1.8vw,18px)', fontWeight: 800, color: '#4338ca', lineHeight: 1.55 }}>{tagline}</div>
      <div style={{ marginTop: 18 }}>{children}</div>
    </Frame>
  )
}
function GuideList({ head, items }: { head?: string; items: React.ReactNode[] }) {
  return (
    <div>
      {head && <div style={{ fontSize: 14.5, fontWeight: 800, color: INK, marginBottom: 9 }}>{head}</div>}
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, fontSize: 15, color: SUB, lineHeight: 1.55 }}>
            <span style={{ color: AC.compare.main, fontWeight: 800, flexShrink: 0 }}>·</span><span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
function GuideNote({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: 16, padding: '11px 16px', borderRadius: 10, background: 'rgba(15,23,42,0.04)', border: `1px solid ${LINE}`, fontSize: 14, color: SUB, lineHeight: 1.6 }}>{children}</div>
}

const slides: DeckSlide[] = [
  /* 00 표지 */
  {
    label: '시작',
    content: (
      <Frame w={1040}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 22, justifyContent: 'center', marginBottom: 30, flexWrap: 'wrap' }}>
            <Logo src={CLAUDE} alt="Claude" size={54} />
            <Logo src={`${EDU}/vscode.svg`} alt="VS Code" size={54} />
            <Logo src={`${EDU}/github.svg`} alt="GitHub" size={54} />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18, padding: '5px 14px', borderRadius: 100, background: AC.compare.soft, border: `1px solid ${AC.compare.main}55`, color: AC.compare.main, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', fontFamily: 'var(--font-space), sans-serif' }}>
            Wisebirds-AX · 개발 온보딩
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(40px,7vw,76px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.08, color: INK }}>
            개발 인프라 구축 가이드
          </h1>
          <p style={{ margin: '22px auto 0', fontSize: 'clamp(16px,2vw,20px)', color: SUB, lineHeight: 1.75, maxWidth: 780 }}>
            처음부터 따라 하는 개발 환경 세팅<br />
            <Em>Node.js</Em> · <Em>VS Code</Em> · <Em>Claude Code</Em> · <Em>GitHub</Em> · <Em>Vercel 배포</Em>까지
          </p>
          <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center' }}>
            <SameBadge>Windows · macOS 모두 지원</SameBadge>
          </div>
        </div>
      </Frame>
    ),
  },

  /* 01 목차 */
  {
    label: '목차',
    bg: 'linear-gradient(165deg,#f1f5f9 0%,#e2e8f0 100%)',
    content: (
      <Frame w={1240}>
        <Kicker color={AC.compare.main}>AGENDA</Kicker>
        <Title>이 자료에서 다루는 것</Title>
        <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { n: '①', t: 'Node.js 설치', d: '런타임 · npm 준비', a: AC.node.main },
            { n: '②', t: '에디터 비교', d: 'VS Code를 택한 이유', a: AC.compare.main },
            { n: '③', t: 'VS Code 설치', d: '메인 코드 에디터', a: AC.vscode.main },
            { n: '④', t: 'Claude Code 확장', d: 'AI 페어 프로그래밍', a: AC.claude.main },
            { n: '⑤', t: 'GitHub 연동', d: 'Git · 버전 관리 · 협업', a: AC.github.main },
            { n: '⑥', t: 'Vercel 배포', d: '무료로 웹에 공개', a: AC.vercel.main },
          ].map(x => (
            <div key={x.t} style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', border: `1px solid ${LINE}`, borderLeft: `4px solid ${x.a}`, boxShadow: '0 2px 10px rgba(15,23,42,0.05)' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: x.a, fontFamily: 'var(--font-space), sans-serif', lineHeight: 1 }}>{x.n}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginTop: 8 }}>{x.t}</div>
              <div style={{ fontSize: 13.5, color: MUT, marginTop: 4 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },

  /* 전체 그림 — 역할 & 데이터 흐름 (비개발자용) */
  {
    label: '로직 이해',
    bg: 'linear-gradient(165deg,#ffffff 0%,#f4f6fb 100%)',
    content: (
      <Frame w={1340}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <Kicker color={AC.compare.main}>Understand the logic</Kicker>
          <Title>각 도구의 역할과 데이터 흐름</Title>
          <p style={{ margin: '12px auto 0', fontSize: 16, color: SUB, lineHeight: 1.7, maxWidth: 840 }}>
            웹사이트를 만들어 세상에 공개하기까지,<br /><Em c={AC.compare.main}>다섯 도구가 릴레이처럼</Em> 이어집니다.<br />비개발자는 큰 그림만 잡아도 충분합니다.
          </p>
        </div>

        {/* 흐름 밴드 */}
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          {/* ① 로컬 개발 */}
          <div style={{ position: 'relative', border: `1.5px dashed ${AC.vscode.main}66`, background: '#fff', borderRadius: 16, padding: '28px 18px 18px', boxShadow: '0 2px 12px rgba(15,23,42,0.05)' }}>
            <span style={{ position: 'absolute', top: -11, left: 18, background: AC.vscode.main, color: '#fff', fontSize: 11.5, fontWeight: 800, padding: '2px 10px', borderRadius: 100 }}>① 내 컴퓨터에서 개발</span>
            <div style={{ display: 'flex', gap: 10 }}>
              <RoleMini logo={`${EDU}/vscode.svg`} name="VS Code" role="작업 공간" />
              <RoleMini logo={`${EDU}/node.svg`} name="Node.js" role="실행 엔진" />
              <RoleMini logo={CLAUDE} name="Claude Code" role="AI 동료" />
            </div>
          </div>

          <FlowArrow label="git push" />

          {/* ② 온라인 저장 → 배포 */}
          <div style={{ position: 'relative', border: `1.5px dashed ${AC.github.main}44`, background: '#fff', borderRadius: 16, padding: '28px 18px 18px', boxShadow: '0 2px 12px rgba(15,23,42,0.05)' }}>
            <span style={{ position: 'absolute', top: -11, left: 18, background: AC.github.main, color: '#fff', fontSize: 11.5, fontWeight: 800, padding: '2px 10px', borderRadius: 100 }}>② 온라인 저장 → 자동 배포</span>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <RoleMini logo={`${EDU}/github.svg`} name="GitHub" role="온라인 창고" />
              <span aria-hidden style={{ fontSize: 20, color: '#cbd5e1', fontWeight: 800 }}>→</span>
              <RoleMini logo={VERCEL} name="Vercel" role="웹 발행소" />
            </div>
          </div>

          <FlowArrow />

          {/* ③ 사용자 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 6px' }}>
            <div style={{ width: 62, height: 62, borderRadius: 16, background: AC.compare.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🌐</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: INK }}>사용자</div>
            <div style={{ fontSize: 12, color: MUT }}>브라우저로 접속</div>
          </div>
        </div>

        {/* 비유 콜아웃 */}
        <div style={{ margin: '22px auto 0', maxWidth: 1040, padding: '13px 20px', borderRadius: 12, background: AC.compare.soft, border: `1px solid ${AC.compare.main}33`, fontSize: 14, color: SUB, lineHeight: 1.7, textAlign: 'center' }}>
          🍳 <Em c={AC.compare.main}>비유하면</Em> — <b>주방(VS Code)</b>에서 <b>불·도구(Node)</b>와 <b>보조 요리사(Claude Code)</b>로 요리하고,<br />
          완성품을 <b>창고(GitHub)</b>에 보관했다가,<br /><b>배달(Vercel)</b>로 <b>손님(사용자)</b>에게 전달하는 셈입니다.
        </div>

        {/* 5 역할 상세 (왜 필요한가) */}
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px,1fr))', gap: 14 }}>
          {ROLE_INFO.map(r => <RoleCard key={r.name} logo={r.logo} name={r.name} role={r.role} why={r.why} accent={r.accent} />)}
        </div>
      </Frame>
    ),
  },

  /* ═══ ① Node.js ═══ */
  {
    label: 'Node.js',
    content: <SectionCover no="01" title="Node.js 설치" sub={<>자바스크립트 실행 환경.<br />npm(패키지 매니저)이 함께 설치되어 개발의 토대가 됩니다.</>} accent={AC.node} logos={[{ src: `${EDU}/node.svg`, alt: 'Node.js' }]} />,
  },
  {
    label: 'Node 다운로드',
    content: (
      <Frame w={1340}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Kicker color={AC.node.main}>DOWNLOAD</Kicker>
          <Title>공식 사이트에서 내려받기</Title>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <Steps accent={AC.node.main} items={[
              { h: <>공식 사이트 접속 — <Mono>nodejs.org</Mono></> },
              { h: <><Em c={AC.node.main}>LTS 버전</Em> 다운로드 (2026년 7월 기준 24.x)</>, d: '페이지가 OS를 자동 감지합니다.' },
              { h: <>OS별 설치 파일</>, d: '🪟 Windows: .msi  ·  🍎 macOS: .pkg  (Apple Silicon/Intel 자동)' },
              { h: <>“Current” 대신 <Em c={AC.node.main}>LTS</Em> 선택</>, d: 'LTS = 장기 지원 버전. 팀 표준 맞추기 좋음.' },
            ]} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Browser url="https://nodejs.org/en/download">
              <div style={{ textAlign: 'center' }}>
                <Logo src={`${EDU}/node.svg`} alt="Node.js" size={64} />
                <div style={{ margin: '16px 0 6px', fontSize: 15, fontWeight: 700, color: INK }}>Download Node.js</div>
                <div style={{ fontSize: 12, color: MUT, marginBottom: 16 }}>Run JavaScript Everywhere</div>
                <DlButton label="LTS 24.x" sub="Windows · macOS" color={AC.node.main} />
              </div>
            </Browser>
          </div>
        </div>
        <LinkRow>
          <LinkChip href="https://nodejs.org/en/download" label="nodejs.org — 다운로드" color={AC.node.main} />
        </LinkRow>
      </Frame>
    ),
  },
  {
    label: 'Node 설치',
    bg: 'linear-gradient(165deg,#f8fafc 0%,#eef4ee 100%)',
    content: (
      <Frame w={1340}>
        <Kicker color={AC.node.main}>INSTALL & VERIFY</Kicker>
        <Title>설치와 확인</Title>
        <div style={{ marginTop: 22 }}>
          <OsGrid>
            <OsCard os="win" accent={AC.node.main} items={[
              <><Mono>.msi</Mono> 실행 → <Em c={AC.node.main}>Next</Em>로 진행</>,
              <><Mono>Add to PATH</Mono> 옵션 유지 (기본 체크)</>,
              <>완료 후 <Em c={AC.node.main}>PowerShell 재시작</Em></>,
            ]} />
            <OsCard os="mac" accent={AC.node.main} items={[
              <><Mono>.pkg</Mono> 실행 → 안내 따라 진행</>,
              <>PATH <Em c={AC.node.main}>자동 등록</Em> (별도 설정 불필요)</>,
              <>완료 후 <Em c={AC.node.main}>터미널 재시작</Em></>,
            ]} />
          </OsGrid>
        </div>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <SameBadge>검증 명령은 Windows·macOS 동일</SameBadge>
          <Terminal w={560} lines={[
            { t: '> node -v', c: '#7ee787' },
            { t: 'v24.5.0', dim: true },
            { t: '> npm -v', c: '#7ee787' },
            { t: '11.3.0', dim: true },
            { t: '' },
            { t: '# 버전이 출력되면 설치 완료 ✔', c: '#8b949e' },
          ]} />
        </div>
      </Frame>
    ),
  },

  /* ═══ ② 에디터 비교 (VS Code 설치 전) ═══ */
  {
    label: '에디터 비교',
    content: <SectionCover no="02" title="에디터 비교" sub={<>VS Code · IntelliJ IDEA · Cursor — 세 에디터는 무엇이 다를까?<br />설치에 앞서, 우리가 왜 VS Code를 택했는지 먼저 짚어봅니다.</>} accent={AC.compare} osBadge={false} logos={[{ src: EDITORS.vscode, alt: 'VS Code' }, { src: EDITORS.intellij, alt: 'IntelliJ' }, { src: EDITORS.cursor, alt: 'Cursor' }]} />,
  },
  {
    label: '에디터 비교',
    content: (
      <Frame w={1340}>
        <Kicker color={AC.compare.main}>COMPARISON</Kicker>
        <Title>세 에디터 장단점</Title>
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {[
            {
              logo: EDITORS.vscode, name: 'VS Code', tag: '무료 · 오픈소스', c: AC.vscode.main,
              pros: ['가볍고 빠른 실행', '방대한 확장 생태계', '다언어 범용 · 커뮤니티/자료 풍부', 'AI 도구를 자유롭게 선택(Claude 등)'],
              cons: ['JVM 심층 리팩터링은 IntelliJ보다 약함'],
            },
            {
              logo: EDITORS.intellij, name: 'IntelliJ IDEA', tag: '부분 유료(Ultimate)', c: '#f97316',
              pros: ['Java/Kotlin 심층 지원 최강', '리팩터링·정적분석 강력', '올인원 통합 툴'],
              cons: ['무겁고 리소스 많이 사용', '유료 · JS/웹엔 다소 과함'],
            },
            {
              logo: EDITORS.cursor, name: 'Cursor', tag: 'AI 네이티브', c: '#111827',
              pros: ['VS Code 기반 + AI 내장', '강력한 에이전트 편집'],
              cons: ['유료 구독 중심 · 별도 앱', '데이터·비용 정책 고려 필요'],
            },
          ].map(e => (
            <div key={e.name} style={{ background: '#fff', borderRadius: 16, border: `1px solid ${LINE}`, borderTop: `4px solid ${e.c}`, boxShadow: '0 4px 16px rgba(15,23,42,0.06)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${LINE}` }}>
                <img src={e.logo} alt={e.name} width={34} height={34} style={{ objectFit: 'contain' }} />
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: INK }}>{e.name}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: e.c }}>{e.tag}</div>
                </div>
              </div>
              <div style={{ padding: '14px 18px' }}>
                {e.pros.map(p => (
                  <div key={p} style={{ display: 'flex', gap: 7, fontSize: 13.5, color: SUB, lineHeight: 1.5, marginBottom: 6 }}>
                    <span style={{ color: '#16a34a', fontWeight: 800 }}>＋</span><span>{p}</span>
                  </div>
                ))}
                {e.cons.map(p => (
                  <div key={p} style={{ display: 'flex', gap: 7, fontSize: 13.5, color: MUT, lineHeight: 1.5, marginBottom: 6 }}>
                    <span style={{ color: '#dc2626', fontWeight: 800 }}>－</span><span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    label: '왜 VS Code',
    bg: 'linear-gradient(165deg,#f5f3ff 0%,#e0e7ff 100%)',
    content: (
      <Frame w={1140}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <Logo src={EDITORS.vscode} alt="VS Code" size={60} />
        </div>
        <Kicker color={AC.compare.main}>OUR CHOICE</Kicker>
        <Title>왜 VS Code인가</Title>
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px,1fr))', gap: 16 }}>
          <Card title="💸 무료 · 표준화" accent={AC.compare.main}>라이선스 비용 없이 팀 전원 동일 환경 —<br />온보딩·표준화가 쉽습니다.</Card>
          <Card title="🧩 확장의 자유" accent={AC.compare.main}>Claude Code 등 원하는 AI·도구를 골라 조합.<br />특정 벤더에 묶이지 않습니다.</Card>
          <Card title="🌐 우리 스택에 최적" accent={AC.compare.main}>Next.js·TypeScript 웹 개발에 가볍고 충분.<br />IntelliJ의 JVM 심층기능은 과합니다.</Card>
          <Card title="🤖 AI도 커버" accent={AC.compare.main}>Cursor의 AI 편집은<br />VS Code + Claude 확장으로 대체 가능합니다.</Card>
        </div>
        <div style={{ marginTop: 22, textAlign: 'center', fontSize: 15, color: SUB }}>
          → 그래서 다음 단계에서 <Em c={AC.vscode.main}>VS Code</Em>를 설치합니다.
        </div>
      </Frame>
    ),
  },

  /* ═══ ③ VS Code ═══ */
  {
    label: 'VS Code',
    content: <SectionCover no="03" title="VS Code 설치" sub={<>가볍고 확장성 뛰어난 메인 코드 에디터.<br />이번에 스터디할 개발 도구입니다.</>} accent={AC.vscode} logos={[{ src: `${EDU}/vscode.svg`, alt: 'VS Code' }]} />,
  },
  {
    label: 'VS Code 설치',
    content: (
      <Frame w={1340}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <Kicker color={AC.vscode.main}>DOWNLOAD & INSTALL</Kicker>
          <Title>내려받아 설치</Title>
        </div>
        <OsGrid>
          <OsCard os="win" accent={AC.vscode.main} items={[
            <><Mono>code.visualstudio.com</Mono> → <Em c={AC.vscode.main}>User Installer (.exe)</Em></>,
            <>설치 중 <Mono>PATH 추가</Mono> · <Mono>Code로 열기</Mono> 체크</>,
            <>실행 → 필요 시 <Em c={AC.vscode.main}>한국어 언어팩</Em> 설치</>,
          ]} />
          <OsCard os="mac" accent={AC.vscode.main} items={[
            <><Mono>.dmg</Mono> 다운로드 → 더블클릭해 열기</>,
            <><Em c={AC.vscode.main}>응용 프로그램</Em> 폴더로 <Mono>Visual Studio Code.app</Mono> 드래그</>,
            <>실행 → <Mono>⇧⌘P</Mono> → <Em c={AC.vscode.main}>Shell Command: Install &apos;code&apos;</Em> (터미널에서 code 명령)</>,
          ]} />
        </OsGrid>
        <LinkRow>
          <LinkChip href="https://code.visualstudio.com/download" label="code.visualstudio.com — 다운로드" color={AC.vscode.main} />
        </LinkRow>
      </Frame>
    ),
  },
  {
    label: '확장 기능',
    bg: 'linear-gradient(165deg,#f8fafc 0%,#eef4fb 100%)',
    content: (
      <Frame w={1180}>
        <Kicker color={AC.vscode.main}>EXTENSIONS</Kicker>
        <Title>확장(Extensions)이 핵심</Title>
        <Sub>VS Code는 <Em c={AC.vscode.main}>확장</Em>으로 기능을 더합니다. 언어 지원·포매터·AI 도구까지 필요한 것만 골라 설치 — 다음 단계의 <Em c={AC.claude.main}>Claude Code</Em>도 확장으로 붙입니다.</Sub>
        <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 16 }}>
          <Card title="🧩 확장 마켓" accent={AC.vscode.main}>확장 뷰 열기 — <Mono>Ctrl+Shift+X</Mono> (mac <Mono>⇧⌘X</Mono>) → 검색 → Install.</Card>
          <Card title="🎨 언어·포매터" accent={AC.vscode.main}>Prettier 같은 포매터로 코드 스타일을 저장 시 자동 정리.</Card>
          <Card title="🤖 AI 도구" accent={AC.claude.main}>Claude Code 등 AI 확장을 자유롭게 선택·조합.</Card>
        </div>
      </Frame>
    ),
  },
  {
    label: '권장 확장',
    content: (
      <Frame w={1340}>
        <Kicker color={AC.vscode.main}>RECOMMENDED EXTENSIONS</Kicker>
        <Title>권장 확장 프로그램</Title>
        <div style={{ marginTop: 12, fontSize: 14.5, color: MUT, lineHeight: 1.6, maxWidth: 940 }}>
          확장 뷰(<Mono>Ctrl+Shift+X</Mono> / mac <Mono>⇧⌘X</Mono>)에서 <Em c={AC.vscode.main}>아래 이름 그대로 검색</Em> → Install.<br />
          회색 <Mono>ID</Mono>(게시자.확장명)로 정확히 찾을 수 있습니다.<br /><b style={{ color: '#15803d' }}>👍 추천</b> 5종은 우선 설치 권장.
        </div>
        <ExtGrid>
          <ExtItem rec emoji="✻" accent={AC.claude.main} name="Claude Code for VS Code" pub="Anthropic" id="anthropic.claude-code"
            desc={<>에디터를 벗어나지 않고 코드 생성·수정·설명을 AI에게 맡기고,<br />변경을 diff로 검토한 뒤 적용.<br />열린 파일·터미널 맥락을 그대로 이해합니다.</>} />
          <ExtItem rec emoji="🇰🇷" accent={AC.vscode.main} name="Korean Language Pack for Visual Studio Code" pub="Microsoft" id="MS-CEINTL.vscode-language-pack-ko"
            desc={<>메뉴·설정·명령 팔레트를 한국어로 표시.<br />처음 접하는 팀원이 어떤 기능인지 바로 이해해 진입 장벽을 낮춥니다.</>} />
          <ExtItem rec emoji="⚛️" accent="#61dafb" name="ES7+ React/Redux/React-Native snippets" pub="dsznajder" id="dsznajder.es7-react-js-snippets"
            desc={<>rafce 같은 짧은 약어로 컴포넌트·훅 골격을 즉시 생성.<br />반복되는 상용구 타이핑을 줄여 작성 흐름이 끊기지 않습니다.</>} />
          <ExtItem rec emoji="🎨" accent="#dd3a0a" name="PostCSS Language Support" pub="csstools" id="csstools.postcss"
            desc={<>Tailwind 등 최신 CSS 문법(@tailwind·@apply)을 오류로 오인하지 않게 인식.<br />근거 없는 빨간 밑줄을 없애고 구문 강조를 정상화합니다.</>} />
          <ExtItem rec emoji="🎀" accent="#c596c7" name="Prettier - Code formatter" pub="Prettier" id="esbenp.prettier-vscode"
            desc={<>저장하는 순간 들여쓰기·따옴표·줄바꿈을 규칙대로 자동 정리.<br />사람마다 다른 스타일 논쟁을 없애고 diff를 깔끔하게 유지합니다.</>} />
          <ExtItem emoji="⚙️" accent={AC.github.main} name="GitHub Actions" pub="GitHub" id="github.vscode-github-actions"
            desc={<>워크플로(.yml) 자동완성·검증과 실행 결과(성공/실패)를 에디터에서 바로 확인.<br />CI 상태를 보려 브라우저를 오갈 필요가 없습니다.</>} />
          <ExtItem emoji="🧜" accent="#00b3a4" name="Markdown Preview Mermaid Support" pub="Matt Bierner" id="bierner.markdown-mermaid"
            desc={<>마크다운 미리보기에서 Mermaid 다이어그램(플로우차트·시퀀스)을 그대로 렌더.<br />문서 속 그림을 이미지 대신 코드로 관리할 수 있습니다.</>} />
        </ExtGrid>
      </Frame>
    ),
  },

  /* ═══ ④ Claude Code ═══ */
  {
    label: 'Claude',
    content: <SectionCover no="04" title="Claude Code 확장" sub={<>VS Code 안에서 바로 쓰는 AI 페어 프로그래머.<br />계획 검토·파일 편집·터미널 실행까지.</>} accent={AC.claude} logos={[{ src: CLAUDE, alt: 'Claude' }]} />,
  },
  {
    label: 'Claude 설치',
    content: (
      <Frame w={1340}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Kicker color={AC.claude.main}>INSTALL</Kicker>
          <Title>확장 설치</Title>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <SameBadge>설치 과정은 Windows·macOS 동일 (단축키만 다름)</SameBadge>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <Steps accent={AC.claude.main} items={[
              { h: <>확장 뷰 열기 — <Mono>Ctrl+Shift+X</Mono> / mac <Mono>⇧⌘X</Mono></> },
              { h: <>검색창에 <Em c={AC.claude.main}>Claude Code</Em> 입력</> },
              { h: <>게시자 <Mono>anthropic.claude-code</Mono> 확인 후 <Em c={AC.claude.main}>Install</Em></>, d: '동명 확장이 많으니 게시자가 Anthropic인지 꼭 확인.' },
              { h: <>설치 후 좌측 사이드바에 <Em c={AC.claude.main}>Claude 아이콘</Em> 생성</> },
            ]} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 480, borderRadius: 12, overflow: 'hidden', boxShadow: '0 18px 40px rgba(15,23,42,0.16)', border: '1px solid rgba(15,23,42,0.12)', background: '#1e1e1e' }}>
              <div style={{ padding: '10px 14px', background: '#252526', color: '#cccccc', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>EXTENSIONS: MARKETPLACE</div>
              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 7, background: '#3c3c3c', color: '#cccccc', fontSize: 13, fontFamily: 'var(--font-mono, monospace)' }}>
                  🔍 Claude Code
                </div>
                <div style={{ marginTop: 12, display: 'flex', gap: 12, padding: 12, borderRadius: 8, background: '#2a2d2e', border: '1px solid #ffffff14' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src={CLAUDE} alt="Claude" width={30} height={30} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Claude Code for VS Code</div>
                    <div style={{ fontSize: 12, color: '#9d9d9d' }}>Anthropic</div>
                    <div style={{ fontSize: 11.5, color: '#8b8b8b', marginTop: 3, lineHeight: 1.4 }}>Harness the power of Claude Code without leaving your IDE.</div>
                  </div>
                  <div style={{ alignSelf: 'flex-start', padding: '5px 14px', borderRadius: 6, background: AC.claude.main, color: '#fff', fontSize: 12, fontWeight: 700 }}>Install</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LinkRow>
          <LinkChip href="https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code" label="Marketplace — Claude Code" color={AC.claude.main} />
          <LinkChip href="https://code.claude.com/docs/en/vs-code" label="설치 가이드" color={AC.claude.main} filled={false} />
        </LinkRow>
      </Frame>
    ),
  },
  {
    label: 'Claude 사용',
    bg: 'linear-gradient(165deg,#fdfaf8 0%,#f7ede8 100%)',
    content: (
      <Frame w={1340}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <Kicker color={AC.claude.main}>SIGN IN & USE</Kicker>
          <Title>로그인하고 VS Code에서 사용</Title>
          <p style={{ margin: '14px auto 0', fontSize: 16, color: SUB, lineHeight: 1.7, maxWidth: 760 }}>
            브라우저로 <Em c={AC.claude.main}>Anthropic 계정 로그인</Em> → VS Code 사이드바 Claude 패널과 연동 →<br />채팅으로 코드 작업.<br />
            <span style={{ color: MUT }}>(유료 구독 Pro/Max/Team 또는 Console 계정 필요)</span>
          </p>
        </div>

        {/* VS Code + Claude Code 실사용 목업 */}
        <div style={{ width: '100%', maxWidth: 1120, margin: '0 auto', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(15,23,42,0.18)', boxShadow: '0 24px 54px rgba(15,23,42,0.22)', background: '#1e1e1e' }}>
          {/* 타이틀 바 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', background: '#323233' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
            <span style={{ marginLeft: 10, fontSize: 12, color: '#cccccc', fontFamily: 'var(--font-mono, monospace)' }}>my-project — Visual Studio Code</span>
          </div>
          <div style={{ display: 'flex', height: 430 }}>
            {/* 액티비티 바 */}
            <div style={{ width: 52, background: '#333333', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, gap: 16, fontSize: 18, color: '#858585' }}>
              <span>🗂️</span><span>🔍</span><span>⑂</span><span>▷</span>
              {/* Claude 활성 */}
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
                <span aria-hidden style={{ position: 'absolute', left: 0, top: 2, bottom: 2, width: 2, background: '#d97757' }} />
                <img src={CLAUDE} alt="Claude" width={22} height={22} />
              </div>
            </div>
            {/* 에디터 */}
            <div style={{ flex: 1, minWidth: 0, background: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', background: '#252526', borderBottom: '1px solid #1a1a1a' }}>
                <div style={{ padding: '8px 16px', background: '#1e1e1e', color: '#d4d4d4', fontSize: 12.5, borderTop: '2px solid #d97757', fontFamily: 'var(--font-mono, monospace)' }}>Button.tsx</div>
              </div>
              <div style={{ padding: '14px 16px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12.5, lineHeight: 1.85, color: '#d4d4d4' }}>
                {[
                  'export function Button({ label }) {',
                  '  const [loading, setLoading] = useState(false)',
                  '  return (',
                  '    <button>{label}</button>',
                  '  )',
                  '}',
                ].map((l, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, background: i === 3 ? 'rgba(217,119,87,0.1)' : 'transparent' }}>
                    <span style={{ color: '#6e7681', width: 16, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ whiteSpace: 'pre' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Claude Code 패널 */}
            <div style={{ width: 384, flexShrink: 0, background: '#252526', borderLeft: '1px solid #141414', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid #333' }}>
                <img src={CLAUDE} alt="Claude" width={18} height={18} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#cccccc', letterSpacing: '0.06em' }}>CLAUDE CODE</span>
                <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#3fb950' }}>● 로그인됨</span>
              </div>
              <div style={{ padding: '6px 14px', fontSize: 11, color: '#8b8b8b', borderBottom: '1px solid #2a2a2a' }}>you@team.com · Pro</div>
              {/* 대화 */}
              <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
                <div style={{ alignSelf: 'flex-end', maxWidth: '86%', background: '#37373d', color: '#e6e6e6', padding: '8px 12px', borderRadius: 10, fontSize: 12.5, lineHeight: 1.5 }}>
                  이 버튼에 <b style={{ color: '#fff' }}>로딩 상태</b> 처리 추가해줘
                </div>
                <div style={{ alignSelf: 'flex-start', width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ background: '#2d2d30', borderRadius: 10, padding: '10px 12px', border: '1px solid #3a3a3a' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#d97757', marginBottom: 6 }}>계획(Plan)</div>
                    <div style={{ fontSize: 12, color: '#cfcfcf', lineHeight: 1.6 }}>
                      • <Mono>loading</Mono> 상태로 스피너 표시<br />• 중복 클릭 방지 <Mono>disabled</Mono> 처리
                    </div>
                    <div style={{ marginTop: 8, fontFamily: 'var(--font-mono, monospace)', fontSize: 11, borderRadius: 6, overflow: 'hidden', border: '1px solid #333' }}>
                      <div style={{ background: 'rgba(248,81,73,0.12)', color: '#f85149', padding: '2px 8px', whiteSpace: 'pre' }}>{'- <button>{label}</button>'}</div>
                      <div style={{ background: 'rgba(63,185,80,0.12)', color: '#3fb950', padding: '2px 8px', whiteSpace: 'pre' }}>{'+ <button disabled={loading}>…</button>'}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ padding: '5px 14px', borderRadius: 6, background: '#d97757', color: '#fff', fontSize: 12, fontWeight: 700 }}>✓ 수락</span>
                    <span style={{ padding: '5px 14px', borderRadius: 6, background: 'transparent', border: '1px solid #4a4a4a', color: '#bdbdbd', fontSize: 12, fontWeight: 600 }}>✕ 거절</span>
                  </div>
                </div>
              </div>
              {/* 입력 */}
              <div style={{ padding: '10px 12px', borderTop: '1px solid #333' }}>
                <div style={{ background: '#3c3c3c', borderRadius: 8, padding: '9px 12px', fontSize: 12, color: '#8b8b8b' }}>
                  무엇이든 물어보세요…  <span style={{ color: '#6a9be0' }}>@파일</span> 로 범위 지정
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 흐름 스텝 */}
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, flexWrap: 'wrap', fontSize: 14, color: SUB, fontWeight: 600 }}>
          <span><b style={{ color: AC.claude.main }}>①</b> 브라우저 로그인</span>
          <span style={{ color: '#cbd5e1' }}>→</span>
          <span><b style={{ color: AC.claude.main }}>②</b> VS Code 패널 연동</span>
          <span style={{ color: '#cbd5e1' }}>→</span>
          <span><b style={{ color: AC.claude.main }}>③</b> 채팅으로 코드 작업(계획·편집 승인)</span>
        </div>
      </Frame>
    ),
  },

  /* ═══ ⑤ GitHub ═══ */
  {
    label: 'GitHub',
    content: <SectionCover no="05" title="GitHub 연동" sub={<>Git으로 코드 이력을 관리하고,<br />GitHub로 원격 백업·협업합니다.</>} accent={AC.github} logos={[{ src: `${EDU}/git.svg`, alt: 'Git' }, { src: `${EDU}/github.svg`, alt: 'GitHub' }]} />,
  },
  {
    label: 'Git 설치',
    content: (
      <Frame w={1340}>
        <Kicker color={AC.github.main}>SETUP</Kicker>
        <Title>Git 설치 & 계정 연결</Title>
        <div style={{ marginTop: 22 }}>
          <OsGrid>
            <OsCard os="win" accent={AC.github.main} items={[
              <><Mono>git-scm.com</Mono>에서 설치 파일 다운로드</>,
              <>기본 옵션으로 진행 (기본 에디터 <Em c={AC.github.main}>VS Code</Em> 선택 가능)</>,
            ]} />
            <OsCard os="mac" accent={AC.github.main} items={[
              <>택1: <Mono>xcode-select --install</Mono> (가장 간단)</>,
              <>또는 <Mono>brew install git</Mono> / <Mono>git-scm.com</Mono> 설치 파일</>,
            ]} />
          </OsGrid>
        </div>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <SameBadge>계정 연결·검증은 Windows·macOS 동일</SameBadge>
          <Terminal w={620} lines={[
            { t: '> git --version', c: '#7ee787' },
            { t: 'git version 2.49.0', dim: true },
            { t: '' },
            { t: '> git config --global user.name  "내이름"', c: '#7ee787' },
            { t: '> git config --global user.email "me@team.com"', c: '#7ee787' },
            { t: '' },
            { t: '# github.com 가입 후 VS Code 좌하단 Accounts → GitHub 로그인', c: '#8b949e' },
          ]} />
        </div>
        <LinkRow>
          <LinkChip href="https://git-scm.com/downloads" label="git-scm.com — Git 다운로드" color={AC.github.main} />
          <LinkChip href="https://github.com/signup" label="github.com — 회원가입" color={AC.github.main} filled={false} />
        </LinkRow>
      </Frame>
    ),
  },
  {
    label: '작업 흐름',
    bg: 'linear-gradient(165deg,#f8fafc 0%,#eef1f5 100%)',
    content: (
      <Frame w={1340}>
        <Kicker color={AC.github.main}>WORKFLOW</Kicker>
        <Title>기본 작업 흐름</Title>
        <div style={{ marginTop: 34, display: 'flex', alignItems: 'stretch', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: '⬇', t: 'Clone', d: '원격 저장소를 로컬로 복제', c: '#0969da' },
            { icon: '✎', t: 'Edit', d: 'VS Code에서 코드 수정', c: AC.vscode.main },
            { icon: '＋', t: 'Stage & Commit', d: '변경을 이력으로 기록', c: '#8250df' },
            { icon: '⬆', t: 'Push', d: '로컬 → GitHub 업로드', c: '#1a7f37' },
            { icon: '↻', t: 'Pull', d: '팀원 변경을 내려받기', c: AC.github.main },
          ].map((s, i, arr) => (
            <div key={s.t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 190, background: '#fff', borderRadius: 14, padding: '20px 16px', textAlign: 'center', border: `1px solid ${LINE}`, borderTop: `3px solid ${s.c}`, boxShadow: '0 2px 12px rgba(15,23,42,0.06)' }}>
                <div style={{ width: 40, height: 40, margin: '0 auto 10px', borderRadius: 10, background: `${s.c}18`, color: s.c, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>{s.t}</div>
                <div style={{ fontSize: 12, color: MUT, marginTop: 4, lineHeight: 1.4 }}>{s.d}</div>
              </div>
              {i < arr.length - 1 && <span style={{ color: '#cbd5e1', fontSize: 22, fontWeight: 700 }}>→</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 26, textAlign: 'center', fontSize: 14, color: SUB }}>
          VS Code에서 <Em c={AC.claude.main}>클로드 코드와의 대화</Em>로 모든 작업을 처리할 수 있습니다.
        </div>
      </Frame>
    ),
  },

  /* ═══ ⑥ Vercel 배포 ═══ */
  {
    label: 'Vercel',
    content: <SectionCover no="06" title="Vercel 배포" sub={<>GitHub에 올린 프로젝트를 무료로 인터넷에 공개.<br />도메인을 사지 않아도 .vercel.app 주소가 자동 발급됩니다.</>} accent={AC.vercel} osBadge={false} logos={[{ src: VERCEL, alt: 'Vercel' }]} />,
  },
  {
    label: '무료 배포',
    content: (
      <Frame w={1340}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <Kicker color={AC.vercel.main}>DEPLOY (FREE)</Kicker>
          <Title>GitHub 저장소를 그대로 배포</Title>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <Steps accent={AC.vercel.main} items={[
              { h: <><Mono>vercel.com</Mono> 접속 → <Em c={AC.vercel.main}>GitHub 계정</Em>으로 로그인</> },
              { h: <><Mono>Add New… → Project</Mono> → 내 저장소 <Em c={AC.vercel.main}>Import</Em></>, d: 'GitHub 접근 권한을 한 번 승인합니다.' },
              { h: <>프레임워크 자동 감지(Next.js 등) → <Em c={AC.vercel.main}>Deploy</Em></>, d: '기본 설정 그대로 두면 됩니다.' },
              { h: <>완료 → <Mono>프로젝트명.vercel.app</Mono> 무료 주소 자동 발급</>, d: '도메인 구매 불필요. 바로 공유 가능한 URL.' },
              { h: <>이후 <Em c={AC.vercel.main}>git push</Em> 하면 자동 재배포</>, d: '코드만 올리면 사이트가 갱신됩니다 (CI/CD).' },
            ]} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Browser url="https://vercel.com/new">
              <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 12 }}>Import Git Repository</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9, border: `1px solid ${LINE}`, marginBottom: 14 }}>
                <img src={`${EDU}/github.svg`} alt="repo" width={20} height={20} />
                <span style={{ fontSize: 13, color: INK, fontWeight: 600, flex: 1 }}>my-team/<b>my-project</b></span>
                <span style={{ padding: '5px 12px', borderRadius: 6, background: AC.vercel.main, color: '#fff', fontSize: 12, fontWeight: 700 }}>Import</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 9, background: AC.vercel.main, color: '#fff' }}>
                <img src={VERCEL} alt="Vercel" width={16} height={16} style={{ filter: 'invert(1)' }} />
                <span style={{ fontSize: 14, fontWeight: 800 }}>Deploy</span>
              </div>
              <div style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: MUT, fontFamily: 'var(--font-mono, monospace)' }}>→ my-project.vercel.app</div>
            </Browser>
          </div>
        </div>
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 100, background: AC.vercel.soft, border: `1px solid ${LINE}`, fontSize: 13, color: SUB, fontWeight: 600 }}>
            💡 <b>Hobby(무료)</b> 플랜 — 개인·비상업 프로젝트에 무료. 도메인 구매 없이 <Mono>.vercel.app</Mono> 사용.
          </span>
        </div>
        <LinkRow>
          <LinkChip href="https://vercel.com/new" label="vercel.com — 프로젝트 배포" color={AC.vercel.main} />
        </LinkRow>
      </Frame>
    ),
  },
  {
    label: 'Claude 배포',
    bg: 'linear-gradient(165deg,#f8fafc 0%,#f1f2f4 100%)',
    content: (
      <Frame w={1340}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
            <img src={CLAUDE} alt="Claude" width={34} height={34} />
            <span style={{ color: '#cbd5e1', fontSize: 20 }}>＋</span>
            <img src={VERCEL} alt="Vercel" width={30} height={30} />
          </div>
          <Kicker color={AC.vercel.main}>WITH CLAUDE CODE</Kicker>
          <Title>VS Code의 Claude Code로 배포하기</Title>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 40, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card title="🅐 자동 배포 (권장)" accent={AC.vercel.main}>
              Claude Code에 <Em c={AC.vercel.main}>“변경사항 커밋하고 GitHub에 push해줘”</Em>라고 요청 →<br />push되면 Vercel이 <b>자동 재배포</b>.<br />위 GitHub 연동을 한 번 해두면 코드만 올리면 끝.
            </Card>
            <Card title="🅑 CLI 직접 배포" accent={AC.vercel.main}>
              Claude Code에 <Em c={AC.vercel.main}>“Vercel CLI로 배포해줘”</Em>라고 하면<br />오른쪽 명령들을 대신 실행하고 <b>배포 URL</b>을 알려줍니다.<br />실행 전 계획을 검토·승인합니다.
            </Card>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Terminal w={560} title="VS Code 통합 터미널 (Claude Code)" lines={[
              { t: '> npm i -g vercel', c: '#7ee787' },
              { t: '> vercel login', c: '#7ee787' },
              { t: '# 브라우저로 인증', dim: true },
              { t: '> vercel', c: '#7ee787' },
              { t: '# 프로젝트 연결 + 미리보기 배포', dim: true },
              { t: '> vercel --prod', c: '#7ee787' },
              { t: '✔ Production: https://my-project.vercel.app', c: '#58a6ff' },
            ]} />
          </div>
        </div>
      </Frame>
    ),
  },

  /* 마무리 */
  {
    label: '마무리',
    content: (
      <Frame w={1000}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 26, flexWrap: 'wrap' }}>
            <Logo src={CLAUDE} alt="Claude" size={46} />
            <Logo src={`${EDU}/vscode.svg`} alt="VS Code" size={46} />
            <Logo src={`${EDU}/github.svg`} alt="GitHub" size={46} />
          </div>
          <Title>이제 개발하고 배포할 준비가 끝났습니다</Title>
          <Sub>Node로 실행 환경을, VS Code로 편집 환경을, Claude Code로 AI 페어를,<br />GitHub로 협업을, Vercel로 배포를 갖췄습니다.<br /><span style={{ color: MUT }}>— Windows·macOS 어디서든.</span></Sub>
          <div style={{ marginTop: 26, display: 'inline-flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Node.js LTS', 'VS Code', 'Claude Code', 'Git & GitHub', 'Vercel 배포'].map(t => (
              <span key={t} style={{ padding: '8px 16px', borderRadius: 100, background: '#fff', border: `1px solid ${LINE}`, fontSize: 13.5, fontWeight: 700, color: INK, boxShadow: '0 2px 8px rgba(15,23,42,0.05)' }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </Frame>
    ),
  },

  /* 맺음말 — 격려 */
  {
    label: '맺음말',
    bg: 'linear-gradient(165deg,#f5f3ff 0%,#e0e7ff 100%)',
    content: (
      <Frame w={980}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 58, marginBottom: 26, lineHeight: 1 }}>🪽</div>
          <p style={{ margin: 0, fontSize: 'clamp(22px,3.2vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.55, color: INK }}>
            처음은 어려울 수 있지만<br />한 번만 구축해두면<br />
            <span style={{ backgroundImage: AC.compare.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>상상의 나래</span>를 펼칠 수 있습니다.
          </p>
          <p style={{ margin: '30px auto 0', fontSize: 'clamp(15px,2vw,20px)', color: SUB, lineHeight: 1.8, maxWidth: 720 }}>
            실무를 하시는 분들이 이 날개를 달았을 때<br />더 많고, 좋은 결과물들이 나오길 희망합니다.
          </p>
        </div>
      </Frame>
    ),
  },

  /* ═══ 부록: 코딩 가이드 4원칙 (맺음말 뒤) ═══ */
  {
    label: '가이드 ①',
    content: (
      <GuideCard no="1" title="코딩 전에 생각하라" tagline="가정하지 마라. 혼란을 숨기지 마라. 트레이드오프를 드러내라.">
        <GuideList head="구현 전에:" items={[
          '가정을 명시적으로 말한다. 불확실하면 묻는다.',
          '해석이 여러 가지라면 모두 제시한다 — 혼자 조용히 정하지 마라.',
          '더 단순한 접근이 있으면 말한다. 정당한 근거가 있을 때는 반론을 제시한다.',
          '불분명하면 멈춘다. 무엇이 혼란스러운지 짚어내고 묻는다.',
        ]} />
      </GuideCard>
    ),
  },
  {
    label: '가이드 ②',
    bg: 'linear-gradient(165deg,#f8fafc 0%,#eef1fb 100%)',
    content: (
      <GuideCard no="2" title="단순함이 우선" tagline="문제를 해결하는 최소한의 코드. 추측성 코드 금지.">
        <GuideList items={[
          '요청 범위 밖의 기능 추가 금지.',
          '한 번만 쓰이는 코드에 추상화 금지.',
          '요청되지 않은 “유연성”·“설정 가능성” 금지.',
          '일어날 수 없는 시나리오에 대한 에러 핸들링 금지.',
          '200줄로 짠 코드가 50줄로 가능하면, 다시 짜라.',
        ]} />
        <GuideNote>스스로에게 물어라: <b style={{ color: INK }}>“시니어 엔지니어가 이 코드를 보면 과하게 복잡하다고 할까?”</b> 그렇다면 단순화하라.</GuideNote>
      </GuideCard>
    ),
  },
  {
    label: '가이드 ③',
    content: (
      <GuideCard no="3" title="외과적 변경" tagline="필요한 것만 건드린다. 자기가 만든 흔적만 정리한다.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px,1fr))', gap: 24 }}>
          <GuideList head="기존 코드 수정 시:" items={[
            '인접한 코드·주석·포맷을 “개선”하지 마라.',
            '망가지지 않은 것을 리팩터링하지 마라.',
            '자기 스타일과 다르더라도 기존 스타일을 따른다.',
            '무관한 데드 코드를 발견하면 알리되, 직접 지우지 마라.',
          ]} />
          <GuideList head="고아 코드가 생긴 경우:" items={[
            '자기 변경으로 사용되지 않게 된 import·변수·함수만 제거한다.',
            '사전에 존재하던 데드 코드는 요청 없이 제거하지 마라.',
          ]} />
        </div>
        <GuideNote>테스트: <b style={{ color: INK }}>변경된 모든 줄이 사용자 요청과 직접 연결</b>되어야 한다.</GuideNote>
      </GuideCard>
    ),
  },
  {
    label: '가이드 ④',
    bg: 'linear-gradient(165deg,#f8fafc 0%,#eef1fb 100%)',
    content: (
      <GuideCard no="4" title="목표 주도 실행" tagline="성공 기준을 정의하고, 검증될 때까지 반복하라.">
        <GuideList head="작업을 검증 가능한 목표로 변환한다:" items={[
          <><Mono>검증 추가</Mono> → “잘못된 입력에 대한 테스트를 짜고, 통과시킨다”</>,
          <><Mono>버그 수정</Mono> → “버그를 재현하는 테스트를 짜고, 통과시킨다”</>,
          <><Mono>X 리팩터링</Mono> → “리팩터 전후 테스트가 모두 통과하는지 확인한다”</>,
        ]} />
        <div style={{ marginTop: 14, fontSize: 14, color: SUB }}>다단계 작업은 짧은 계획을 명시한다:</div>
        <pre style={{ marginTop: 8, padding: '14px 16px', borderRadius: 10, background: '#0d1117', color: '#e6edf3', fontFamily: 'var(--font-mono, monospace)', fontSize: 13, lineHeight: 1.7, overflowX: 'auto' }}>
{`1. [단계] → 검증: [확인]
2. [단계] → 검증: [확인]
3. [단계] → 검증: [확인]`}
        </pre>
        <GuideNote>강한 성공 기준은 독립적으로 루프(반복 검증)할 수 있게 해준다. 약한 기준(“그냥 동작하게만”)은 끊임없는 재확인을 요구한다.</GuideNote>
      </GuideCard>
    ),
  },
]

export function DevOnboardingDeck() {
  // 원본은 자체 SlideDeck(eyebrow="교육 중", backHref="/beta")을 썼다.
  // 여기서는 프로젝트 공용 Deck 을 쓰고, 원본의 배경·라벨을 그대로 옮긴다.
  const SLIDES: SlideDef[] = slides.map((s, i) => ({
    id: `dev-${String(i + 1).padStart(2, '0')}`,
    nav: s.label ?? `PAGE ${String(i + 1).padStart(2, '0')}`,
    accent: 'violet' as const,
    bgCss: s.bg ?? (i % 2 === 0 ? ALT_BG_A : ALT_BG_B),
    node: s.content,
  }))
  return (
    <Deck
      slides={SLIDES}
      badge={PROJECTS.wisebirds.badge}
      backHref={wb("/edu")}
      backLabel="교육 목록"
      eyebrow="개발 인프라 구축 가이드"
      chip="1회차"
    />
  )
}
