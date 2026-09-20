// CaseFileBack.tsx
// Back face of a dossier page — displays architecture, key decisions, prominent role, metrics, and impact.

import React from 'react';

interface Metrics {
    stars?: number;
    forks?: number;
    [key: string]: number | undefined;
}

interface Stats {
    stars?: number;
    forks?: number;
    commits?: number;
    issues?: number;
    prs?: string;
    [key: string]: string | number | undefined;
}

interface Project {
    id: string;
    title: string;
    category?: string;
    architecture?: string;
    impact?: string;
    bullets?: string[];
    role?: string;
    stats?: Stats;
    metrics?: Metrics;
    [key: string]: unknown;
}

interface CaseFileBackProps {
    project: Project;
    caseNumber: string; // e.g. "001"
}

const stripHtml = (s: string): string => s.replace(/<[^>]*>/g, '');

export const CaseFileBack: React.FC<CaseFileBackProps> = ({ project, caseNumber }) => {
    // Normalize architecture field: may be a "→"-delimited string or array
    const archText: string = typeof project.architecture === 'string'
        ? project.architecture
        : Array.isArray(project.architecture)
            ? (project.architecture as string[]).join(' → ')
            : '';

    const bullets = (project.bullets ?? []).slice(0, 3);

    // Extract metrics list from metrics object or stats object
    const metricItems: { label: string; value: string | number }[] = [];
    if (project.metrics) {
        if (project.metrics.stars !== undefined) metricItems.push({ label: '★ STARS', value: project.metrics.stars });
        if (project.metrics.forks !== undefined) metricItems.push({ label: 'FORKS', value: project.metrics.forks });
    } else if (project.stats) {
        if (project.stats.stars !== undefined) metricItems.push({ label: '★ STARS', value: project.stats.stars });
        if (project.stats.forks !== undefined) metricItems.push({ label: 'FORKS', value: project.stats.forks });
        if (project.stats.commits !== undefined) metricItems.push({ label: 'COMMITS', value: project.stats.commits });
        if (project.stats.issues !== undefined) metricItems.push({ label: 'ISSUES', value: project.stats.issues });
        if (project.stats.prs !== undefined) metricItems.push({ label: 'PRS', value: project.stats.prs });
    }

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: '#111111',
                border: '0.5px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* ── HEADER BAR ─────────────────────────────────────── */}
            <div
                style={{
                    height: 40,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 20px',
                    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                    flexShrink: 0,
                }}
            >
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        letterSpacing: '0.2em',
                        color: 'rgba(255,80,80,0.7)',
                    }}
                >
                    ARCHITECTURE — CASE {caseNumber}
                </span>
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8.5,
                        letterSpacing: '0.14em',
                        color: '#4ade80',
                    }}
                >
                    DEPTH // CASE {caseNumber}
                </span>
            </div>

            {/* ── BODY ───────────────────────────────────────────── */}
            <div
                style={{
                    flex: 1,
                    padding: '20px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    overflowY: 'auto',
                }}
            >
                {/* SECTION 1 — ARCHITECTURE */}
                {archText && (
                    <div>
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 9,
                                letterSpacing: '0.14em',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: 6,
                            }}
                        >
                            ARCHITECTURE
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: 12.5,
                                color: '#d4d4d4',
                                lineHeight: 1.68,
                                margin: 0,
                                display: '-webkit-box',
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {archText}
                        </p>
                    </div>
                )}

                {/* SECTION 2 — KEY DECISIONS */}
                {bullets.length > 0 && (
                    <div>
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 9,
                                letterSpacing: '0.14em',
                                color: 'rgba(255,255,255,0.35)',
                                marginBottom: 8,
                            }}
                        >
                            KEY DECISIONS
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {bullets.map((b, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                    <div
                                        style={{
                                            width: 4,
                                            height: 4,
                                            minWidth: 4,
                                            background: '#4ade80',
                                            borderRadius: '50%',
                                            marginTop: 6,
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: 'sans-serif',
                                            fontSize: 11.5,
                                            color: 'rgba(255,255,255,0.65)',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {stripHtml(b)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SECTION 3 — MY ROLE (Prominent Container) */}
                {project.role && (
                    <div
                        style={{
                            background: 'rgba(74,158,255,0.04)',
                            border: '0.5px solid rgba(74,158,255,0.15)',
                            borderLeft: '3px solid rgba(74,158,255,0.5)',
                            padding: '12px 14px',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 8.5,
                                letterSpacing: '0.14em',
                                color: 'rgba(74,158,255,0.7)',
                                marginBottom: 6,
                            }}
                        >
                            MY ROLE
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: 12.5,
                                color: '#d4d4d4',
                                lineHeight: 1.68,
                                margin: 0,
                                display: '-webkit-box',
                                WebkitLineClamp: 5,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {project.role}
                        </p>
                    </div>
                )}

                {/* METRICS ROW */}
                {metricItems.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                        {metricItems.map(m => (
                            <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <span
                                    style={{
                                        fontFamily: 'sans-serif',
                                        fontSize: 22,
                                        fontWeight: 700,
                                        color: '#f8fafc',
                                        lineHeight: 1,
                                    }}
                                >
                                    {m.value}
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: 8.5,
                                        color: 'rgba(255,255,255,0.3)',
                                        letterSpacing: '0.12em',
                                    }}
                                >
                                    {m.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* SECTION 4 — IMPACT */}
                {project.impact && (
                    <div
                        style={{
                            background: 'rgba(74,222,128,0.04)',
                            border: '0.5px solid rgba(74,222,128,0.15)',
                            padding: '10px 12px',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 8.5,
                                letterSpacing: '0.14em',
                                color: 'rgba(74,222,128,0.6)',
                                marginBottom: 4,
                            }}
                        >
                            IMPACT
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: 11.5,
                                color: 'rgba(255,255,255,0.6)',
                                lineHeight: 1.55,
                                margin: 0,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {project.impact}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
