// CaseFileFront.tsx
// Front face of a dossier page — project-specific content only.
// Renders classification label, title, badge, stack tags, solution, field rows, footer.

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
    solution?: string;
    problem?: string;
    impact?: string;
    stack?: string[];
    role?: string;
    github?: string | null;
    isPrivate?: boolean;
    metrics?: Metrics;
    [key: string]: unknown;
}

interface CaseFileFrontProps {
    project: Project;
    caseNumber: string;       // e.g. "001"
    classificationLabel: string; // e.g. "CLASSIFIED", "RESTRICTED", etc.
    isTablet?: boolean;       // reduces font sizes by ~1px
}

// ── Badge helpers (same logic as ProjectsSection) ───────────────────────────

function getBadgeLabel(category: string): string {
    const map: Record<string, string> = {
        'Enterprise Workflow System': 'WORKFLOW',
        'IoT Systems': 'IOT',
        'ML Orchestration': 'ML',
        'Automation': 'AUTOMATION',
        'Security': 'SECURITY',
        'Scalability': 'SCALABILITY',
        'HCI': 'HCI',
    };
    return map[category] ?? category.toUpperCase();
}

function getBadgeStyle(category?: string): { color: string; background: string; borderColor: string } {
    switch (category) {
        case 'Automation':              return { color: '#4a9eff', background: 'rgba(74,158,255,0.1)',   borderColor: '#4a9eff' };
        case 'Security':                return { color: '#a78bfa', background: 'rgba(167,139,250,0.1)', borderColor: '#a78bfa' };
        case 'ML Orchestration':        return { color: '#4ade80', background: 'rgba(74,222,128,0.08)', borderColor: '#4ade80' };
        case 'Scalability':             return { color: '#fbbf24', background: 'rgba(251,191,36,0.08)', borderColor: '#fbbf24' };
        case 'HCI':                     return { color: '#34d399', background: 'rgba(52,211,153,0.08)', borderColor: '#34d399' };
        case 'IoT Systems':             return { color: '#f472b6', background: 'rgba(244,114,182,0.08)', borderColor: '#f472b6' };
        case 'Enterprise Workflow System': return { color: '#e05c2a', background: 'rgba(224,92,42,0.08)', borderColor: '#e05c2a' };
        default:                        return { color: '#8e8e8e', background: 'transparent',           borderColor: '#8e8e8e' };
    }
}

// ── Shared CSS for line-clamp (injected once via a style tag in parent) ──────
export const FRONT_CLAMP_STYLE = `
    .casefile-desc {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
    }
`;

// ── Component ────────────────────────────────────────────────────────────────

export const CaseFileFront: React.FC<CaseFileFrontProps> = ({
    project,
    caseNumber,
    classificationLabel,
    isTablet = false,
}) => {
    const badgeStyle = getBadgeStyle(project.category);
    const isOpenSource = project.isPrivate !== true && project.github !== null && project.github !== undefined;
    const isPrivateProject = project.isPrivate === true || project.github === null || project.github === undefined;

    // Stack tags: 5 on desktop/tablet (caller trims to 4 by passing isTablet, but we keep logic here)
    const maxTags = isTablet ? 4 : 5;
    const stackTags = (project.stack ?? []).slice(0, maxTags);

    // Field rows: prefer metrics, then problem snippet, then impact snippet
    const fieldRows: { key: string; value: string }[] = [];
    if (project.metrics && Object.keys(project.metrics).length > 0) {
        const m = project.metrics;
        if (m.stars !== undefined)  fieldRows.push({ key: 'STARS',  value: String(m.stars) });
        if (m.forks !== undefined)  fieldRows.push({ key: 'FORKS',  value: String(m.forks) });
    } else {
        if (project.problem) {
            // Show first ~80 chars of problem
            const snippet = project.problem.length > 80
                ? project.problem.slice(0, 80).trim() + '…'
                : project.problem;
            fieldRows.push({ key: 'PROBLEM', value: snippet });
        }
        if (project.impact) {
            const snippet = project.impact.length > 80
                ? project.impact.slice(0, 80).trim() + '…'
                : project.impact;
            fieldRows.push({ key: 'IMPACT', value: snippet });
        }
    }
    const visibleRows = fieldRows.slice(0, 3);

    // Font sizes: reduce by 1px on tablet
    const fs = (base: number) => base - (isTablet ? 1 : 0);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: '#0d0d0d',
                border: '0.5px solid rgba(255,255,255,0.08)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
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
                    CASE FILE {caseNumber}
                </span>
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8,
                        letterSpacing: '0.14em',
                        color: 'rgba(255,255,255,0.2)',
                    }}
                >
                    {classificationLabel}
                </span>
            </div>

            {/* ── BODY ───────────────────────────────────────────── */}
            <div
                style={{
                    flex: 1,
                    padding: '20px 20px 0 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                    overflow: 'hidden',
                    minHeight: 0,
                }}
            >
                {/* Eyebrow */}
                <div
                    style={{
                        fontFamily: 'monospace',
                        fontSize: fs(8),
                        letterSpacing: '0.16em',
                        color: 'rgba(255,255,255,0.25)',
                        marginBottom: 8,
                    }}
                >
                    // SYSTEMS BUILT
                </div>

                {/* Title */}
                <h3
                    style={{
                        fontFamily: 'sans-serif',
                        fontSize: fs(16),
                        fontWeight: 700,
                        color: '#f5f5f5',
                        margin: '0 0 8px 0',
                        lineHeight: 1.25,
                    }}
                >
                    {project.title}
                </h3>

                {/* Badge row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                    {project.category && (
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: fs(9),
                                letterSpacing: '0.1em',
                                padding: '2px 8px',
                                color: badgeStyle.color,
                                background: badgeStyle.background,
                                border: `0.5px solid ${badgeStyle.borderColor}`,
                            }}
                        >
                            {getBadgeLabel(project.category)}
                        </span>
                    )}
                    {isOpenSource && (
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: fs(8),
                                letterSpacing: '0.1em',
                                padding: '2px 7px',
                                color: '#4ade80',
                                border: '0.5px solid rgba(74,222,128,0.3)',
                                background: 'rgba(74,222,128,0.06)',
                            }}
                        >
                            OPEN SOURCE
                        </span>
                    )}
                </div>

                {/* Stack tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                    {stackTags.map(tech => (
                        <span
                            key={tech}
                            style={{
                                fontFamily: 'monospace',
                                fontSize: fs(9),
                                padding: '1px 6px',
                                color: '#8e8e8e',
                                background: 'rgba(255,255,255,0.04)',
                                border: '0.5px solid rgba(255,255,255,0.08)',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p
                    className="casefile-desc"
                    style={{
                        fontFamily: 'sans-serif',
                        fontSize: fs(12),
                        color: '#c8c8c8',
                        lineHeight: 1.7,
                        margin: '0 0 12px 0',
                        flexShrink: 0,
                    }}
                >
                    {project.solution ?? ''}
                </p>

                {/* Field rows */}
                {visibleRows.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 12 }}>
                        {visibleRows.map(row => (
                            <div
                                key={row.key}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: 12,
                                    padding: '5px 0',
                                    borderBottom: '0.5px solid rgba(255,255,255,0.04)',
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: fs(9),
                                        color: 'rgba(255,255,255,0.3)',
                                        letterSpacing: '0.1em',
                                        flexShrink: 0,
                                    }}
                                >
                                    {row.key}
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: fs(11),
                                        color: '#c8c8c8',
                                        textAlign: 'right',
                                    }}
                                >
                                    {row.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── FOOTER BAR ─────────────────────────────────────── */}
            <div
                style={{
                    height: 40,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 16px',
                    borderTop: '0.5px solid rgba(255,255,255,0.06)',
                    flexShrink: 0,
                    gap: 12,
                }}
            >
                {/* Role — left, truncated */}
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: fs(9),
                        fontStyle: 'italic',
                        color: 'rgba(255,255,255,0.25)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    {project.role ?? ''}
                </span>

                {/* SRC button or PRIVATE label — right */}
                {isPrivateProject ? (
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: fs(9),
                            letterSpacing: '0.1em',
                            padding: '2px 8px',
                            color: 'rgba(255,255,255,0.2)',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                            flexShrink: 0,
                        }}
                    >
                        PRIVATE
                    </span>
                ) : (
                    <button
                        style={{
                            fontFamily: 'monospace',
                            fontSize: fs(9),
                            letterSpacing: '0.1em',
                            padding: '3px 10px',
                            color: 'rgba(255,80,80,0.8)',
                            background: 'rgba(255,65,65,0.08)',
                            border: '0.5px solid rgba(255,80,80,0.3)',
                            cursor: 'pointer',
                            flexShrink: 0,
                            lineHeight: 1,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.github!, '_blank');
                        }}
                    >
                        {project.id === 'arachnode' ? 'GITHUB' : 'SRC'}
                    </button>
                )}
            </div>
        </div>
    );
};
