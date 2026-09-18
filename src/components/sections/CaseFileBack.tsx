// CaseFileBack.tsx
// Back face of a dossier page — each instance is bound to its own project.
// NEVER rendered with shared/fallthrough data; props are required and explicit.

import React from 'react';

interface Metrics {
    stars?: number;
    forks?: number;
    [key: string]: number | undefined;
}

interface Project {
    id: string;
    title: string;
    category?: string;
    architecture?: string;
    impact?: string;
    metrics?: Metrics;
    [key: string]: unknown;
}

interface CaseFileBackProps {
    project: Project;
    caseNumber: string; // e.g. "001"
}

export const CaseFileBack: React.FC<CaseFileBackProps> = ({ project, caseNumber }) => {
    // Normalize architecture field: may be a "→"-delimited string or already an array
    const archText: string = typeof project.architecture === 'string'
        ? project.architecture
        : Array.isArray(project.architecture)
            ? (project.architecture as string[]).join(' → ')
            : '';

    const hasMetrics =
        project.metrics &&
        typeof project.metrics === 'object' &&
        Object.keys(project.metrics).length > 0;

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
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    overflowY: 'auto',
                }}
            >
                {/* Section 1 — ARCHITECTURE */}
                {archText && (
                    <div>
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 9,
                                letterSpacing: '0.14em',
                                color: 'rgba(255,255,255,0.3)',
                                marginBottom: 8,
                            }}
                        >
                            ARCHITECTURE
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: 12,
                                color: '#c8c8c8',
                                lineHeight: 1.7,
                                margin: 0,
                            }}
                        >
                            {archText}
                        </p>
                    </div>
                )}

                {/* Section 2 — IMPACT */}
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
                                fontSize: 9,
                                letterSpacing: '0.14em',
                                color: 'rgba(255,255,255,0.3)',
                                marginBottom: 6,
                            }}
                        >
                            IMPACT
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: 11,
                                color: '#c8c8c8',
                                lineHeight: 1.7,
                                margin: 0,
                            }}
                        >
                            {project.impact}
                        </p>
                    </div>
                )}

                {/* Section 3 — METRICS (only when project has numeric metrics) */}
                {hasMetrics && (
                    <div>
                        <div
                            style={{
                                fontFamily: 'monospace',
                                fontSize: 9,
                                letterSpacing: '0.14em',
                                color: 'rgba(255,255,255,0.3)',
                                marginBottom: 10,
                            }}
                        >
                            METRICS
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                            {Object.entries(project.metrics!).map(([key, value]) => {
                                if (value === undefined || value === null) return null;
                                const label = key === 'stars' ? '★ Stars'
                                    : key === 'forks' ? 'Forks'
                                    : key.toUpperCase();
                                return (
                                    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <span
                                            style={{
                                                fontFamily: 'sans-serif',
                                                fontSize: 20,
                                                fontWeight: 700,
                                                color: '#f5f5f5',
                                                lineHeight: 1,
                                            }}
                                        >
                                            {value}
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: 'monospace',
                                                fontSize: 9,
                                                color: 'rgba(255,255,255,0.3)',
                                                letterSpacing: '0.1em',
                                            }}
                                        >
                                            {label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
