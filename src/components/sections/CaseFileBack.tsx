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
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* ── HEADER BAR ─────────────────────────────────────── */}
            <div
                style={{
                    height: 36,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 16px',
                    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                    flexShrink: 0,
                }}
            >
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8,
                        letterSpacing: '0.2em',
                        color: 'rgba(255,80,80,0.6)',
                    }}
                >
                    ARCHITECTURE — CASE {caseNumber}
                </span>
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8,
                        letterSpacing: '0.14em',
                        color: 'rgba(255,255,255,0.2)',
                    }}
                >
                    BACK
                </span>
            </div>

            {/* ── BODY ───────────────────────────────────────────── */}
            <div
                style={{
                    flex: 1,
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    overflowY: 'auto',
                }}
            >
                {/* SECTION 1 — ARCHITECTURE */}
                {archText && (
                    <div>
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 8,
                                letterSpacing: '0.12em',
                                color: 'rgba(255,255,255,0.25)',
                                marginBottom: 6,
                            }}
                        >
                            ARCHITECTURE
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: 11,
                                color: '#c8c8c8',
                                lineHeight: 1.65,
                                margin: 0,
                                display: '-webkit-box',
                                WebkitLineClamp: 4,
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
                                fontSize: 8,
                                letterSpacing: '0.12em',
                                color: 'rgba(255,255,255,0.25)',
                                marginBottom: 6,
                            }}
                        >
                            KEY DECISIONS
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {bullets.map((b, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                                    <div
                                        style={{
                                            width: 3,
                                            height: 3,
                                            minWidth: 3,
                                            background: '#4ade80',
                                            borderRadius: '50%',
                                            marginTop: 5,
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: 'sans-serif',
                                            fontSize: 10,
                                            color: 'rgba(255,255,255,0.5)',
                                            lineHeight: 1.5,
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
                            border: '0.5px solid rgba(74,158,255,0.12)',
                            borderLeft: '2px solid rgba(74,158,255,0.4)',
                            padding: '10px 12px',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 7,
                                letterSpacing: '0.14em',
                                color: 'rgba(74,158,255,0.6)',
                                marginBottom: 5,
                            }}
                        >
                            MY ROLE
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: 11,
                                color: '#c8c8c8',
                                lineHeight: 1.65,
                                margin: 0,
                                display: '-webkit-box',
                                WebkitLineClamp: 4,
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
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {metricItems.map(m => (
                            <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <span
                                    style={{
                                        fontFamily: 'sans-serif',
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: '#f5f5f5',
                                        lineHeight: 1,
                                    }}
                                >
                                    {m.value}
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: 8,
                                        color: 'rgba(255,255,255,0.25)',
                                        letterSpacing: '0.1em',
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
                            border: '0.5px solid rgba(74,222,128,0.12)',
                            padding: '8px 10px',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 7,
                                letterSpacing: '0.14em',
                                color: 'rgba(74,222,128,0.5)',
                                marginBottom: 4,
                            }}
                        >
                            IMPACT
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: 10,
                                color: 'rgba(255,255,255,0.45)',
                                lineHeight: 1.5,
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
