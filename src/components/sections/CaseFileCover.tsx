// CaseFileCover.tsx
// Classified dossier cover page — initial hook before unsealing project files.
// Aesthetic: Redacted stencil stamp, dark folder background, technical metadata table.

import React from 'react';

interface CaseFileCoverProps {
    totalProjects: number;
    isTablet?: boolean;
}

export const CaseFileCover: React.FC<CaseFileCoverProps> = ({ totalProjects, isTablet = false }) => {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: '#0a0a0a',
                border: '0.5px solid rgba(255,255,255,0.12)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: isTablet ? '20px 24px' : '28px 32px',
                overflow: 'hidden',
                userSelect: 'none',
            }}
        >
            {/* Corner classification watermark */}
            <div
                style={{
                    position: 'absolute',
                    top: 24,
                    right: -40,
                    transform: 'rotate(35deg)',
                    fontFamily: 'monospace',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    color: 'rgba(255,80,80,0.18)',
                    border: '1.5px dashed rgba(255,80,80,0.2)',
                    padding: '4px 48px',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            >
                TOP SECRET
            </div>

            {/* ── HEADER BAR ─────────────────────────────────────── */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '0.5px solid rgba(255,255,255,0.08)',
                    paddingBottom: 12,
                    zIndex: 1,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#4ade80',
                            boxShadow: '0 0 8px #4ade80',
                        }}
                    />
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 9,
                            letterSpacing: '0.2em',
                            color: 'rgba(255,255,255,0.4)',
                        }}
                    >
                        CLASSIFIED DOSSIER // FILE #2026-VS
                    </span>
                </div>
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8,
                        letterSpacing: '0.14em',
                        color: 'rgba(255,80,80,0.8)',
                        background: 'rgba(255,80,80,0.08)',
                        border: '0.5px solid rgba(255,80,80,0.3)',
                        padding: '2px 8px',
                    }}
                >
                    RESTRICTED — LEVEL 5
                </span>
            </div>

            {/* ── CENTER HERO SECTION ────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, zIndex: 1, margin: 'auto 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 9,
                            letterSpacing: '0.22em',
                            color: '#4ade80',
                            background: 'rgba(74,222,128,0.06)',
                            border: '0.5px solid rgba(74,222,128,0.25)',
                            padding: '3px 10px',
                        }}
                    >
                        CONFIDENTIAL WORKS
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
                        SYS_ARCHIVE_V2.6
                    </span>
                </div>

                <h2
                    style={{
                        fontFamily: 'sans-serif',
                        fontSize: isTablet ? 26 : 32,
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: 1.1,
                        textTransform: 'uppercase',
                    }}
                >
                    Selected Systems <br />
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>& Architectural Dossier</span>
                </h2>

                <p
                    style={{
                        fontFamily: 'sans-serif',
                        fontSize: isTablet ? 12 : 13,
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: 520,
                        lineHeight: 1.6,
                        margin: 0,
                    }}
                >
                    Production microservices, enterprise permission systems, constraint-satisfaction schedulers, and high-concurrency event-driven backends.
                </p>

                {/* Metadata Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 12,
                        background: 'rgba(255,255,255,0.02)',
                        border: '0.5px solid rgba(255,255,255,0.06)',
                        padding: 12,
                        marginTop: 4,
                    }}
                >
                    <div>
                        <div style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
                            CASE FILES INDEXED
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#4ade80', marginTop: 2 }}>
                            {String(totalProjects).padStart(2, '0')} DOSSIERS
                        </div>
                    </div>
                    <div>
                        <div style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
                            SECURITY CLEARANCE
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#ffffff', marginTop: 2 }}>
                            LEVEL 5 — GRANTED
                        </div>
                    </div>
                    <div>
                        <div style={{ fontFamily: 'monospace', fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
                            SYSTEM STATUS
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#38bdf8', marginTop: 2 }}>
                            0 ERRORS / NOMINAL
                        </div>
                    </div>
                </div>
            </div>

            {/* ── FOOTER SCROLL HINT ─────────────────────────────── */}
            <div
                style={{
                    borderTop: '0.5px solid rgba(255,255,255,0.08)',
                    paddingTop: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,80,80,0.6)' }}>[!]</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)' }}>
                        SEAL INTEGRITY: ACTIVE
                    </span>
                </div>

                <div
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        letterSpacing: '0.14em',
                        color: '#4ade80',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        animation: 'dossier-pulse 2s ease-in-out infinite',
                    }}
                >
                    <span>↓ SCROLL TO UNSEAL DOSSIER & OPEN CASE FILES</span>
                </div>
            </div>
        </div>
    );
};
