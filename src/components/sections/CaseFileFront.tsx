// CaseFileFront.tsx
// Front face of a dossier page — project-specific content only.
// Renders classification label, title, badges, stack tags, WHY block, WHAT WAS BUILT (solution), and footer hint.

import React, { useState } from 'react';

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
    solution?: string;
    problem?: string;
    why?: string;
    story?: string;
    architecture?: string;
    impact?: string;
    bullets?: string[];
    stack?: string[];
    role?: string;
    github?: string | null;
    isPrivate?: boolean;
    stats?: Stats;
    metrics?: Metrics;
    [key: string]: unknown;
}

interface CaseFileFrontProps {
    project: Project;
    caseNumber: string;          // e.g. "001"
    classificationLabel: string; // e.g. "CLASSIFIED", "RESTRICTED", etc.
    isTablet?: boolean;          // reduces font sizes by ~1px
}

// ── Badge helpers ─────────────────────────────────────────────────────────────

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
        case 'Automation':              return { color: 'var(--accent-green)',  background: 'var(--accent-green-bg)',  borderColor: 'var(--accent-green-border)' };
        case 'Security':                return { color: 'var(--accent-purple)', background: 'var(--accent-purple-bg)', borderColor: 'var(--accent-purple-border)' };
        case 'ML Orchestration':        return { color: 'var(--accent-green)',  background: 'var(--accent-green-bg)',  borderColor: 'var(--accent-green-border)' };
        case 'Scalability':             return { color: 'var(--accent-amber)',  background: 'var(--accent-amber-bg)',  borderColor: 'var(--accent-amber-border)' };
        case 'HCI':                     return { color: 'var(--accent-green)',  background: 'var(--accent-green-bg)',  borderColor: 'var(--accent-green-border)' };
        case 'IoT Systems':             return { color: 'var(--accent-orange)', background: 'var(--accent-orange-bg)', borderColor: 'var(--accent-orange-border)' };
        case 'Enterprise Workflow System': return { color: 'var(--accent-orange)', background: 'var(--accent-orange-bg)', borderColor: 'var(--accent-orange-border)' };
        default:                        return { color: 'var(--text-muted)',     background: 'transparent',             borderColor: 'var(--border-default)' };
    }
}

// ── Shared CSS for line-clamp ────────────────────────────────────────────────
export const FRONT_CLAMP_STYLE = `
    .casefile-solution-clamp {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
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
    const [expanded, setExpanded] = useState(false);

    const badgeStyle = getBadgeStyle(project.category);
    const isOpenSource = project.isPrivate !== true && project.github !== null && project.github !== undefined;
    const isPrivateProject = project.isPrivate === true || project.github === null || project.github === undefined;

    const whyText = (project.why ?? project.story ?? null) as string | null;

    // Stack tags: first 5 on desktop, 4 on tablet
    const maxTags = isTablet ? 4 : 5;
    const stackTags = (project.stack ?? []).slice(0, maxTags);

    // Font sizes: reduce by 1px on tablet
    const fs = (base: number) => base - (isTablet ? 1 : 0);

    const isLongSolution = (project.solution?.length ?? 0) > 120;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--bg-primary)',
                border: '0.5px solid var(--border-default)',
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
                    height: 40,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 20px',
                    borderBottom: '0.5px solid var(--border-default)',
                    flexShrink: 0,
                }}
            >
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 9.5,
                        letterSpacing: '0.2em',
                        color: 'var(--accent-red)',
                    }}
                >
                    CASE FILE {caseNumber}
                </span>
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        letterSpacing: '0.14em',
                        color: 'var(--text-muted)',
                    }}
                >
                    {classificationLabel}
                </span>
            </div>

            {/* ── BODY ───────────────────────────────────────────── */}
            <div
                style={{
                    flex: 1,
                    padding: '20px 24px 16px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                    overflowY: 'auto',
                    minHeight: 0,
                }}
            >
                {/* 1. Eyebrow */}
                <div
                    style={{
                        fontFamily: 'monospace',
                        fontSize: fs(10),
                        letterSpacing: '0.18em',
                        color: 'var(--text-muted)',
                        marginBottom: 6,
                    }}
                >
                    // SYSTEMS BUILT
                </div>

                {/* 2. Title */}
                <h3
                    style={{
                        fontFamily: 'sans-serif',
                        fontSize: fs(20),
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: '0 0 10px 0',
                        lineHeight: 1.25,
                    }}
                >
                    {project.title}
                </h3>

                {/* 3. Badge row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                    {project.category && (
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: fs(10.5),
                                letterSpacing: '0.1em',
                                padding: '3px 10px',
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
                                fontSize: fs(9.5),
                                letterSpacing: '0.1em',
                                padding: '3px 9px',
                                color: 'var(--accent-green)',
                                border: '0.5px solid var(--accent-green-border)',
                                background: 'var(--accent-green-bg)',
                            }}
                        >
                            OPEN SOURCE
                        </span>
                    )}
                </div>

                {/* 4. Stack tags (first 5) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {stackTags.map(tech => (
                        <span
                            key={tech}
                            style={{
                                fontFamily: 'monospace',
                                fontSize: fs(10.5),
                                padding: '2px 8px',
                                color: 'var(--text-secondary)',
                                background: 'var(--bg-surface)',
                                border: '0.5px solid var(--border-default)',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* 5. WHY block — Entire red container is an interactive button link */}
                {whyText && (
                    (project.github || (project.liveUrl ?? project.demo)) ? (
                        <a
                            href={(project.github ?? project.liveUrl ?? project.demo) as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                display: 'block',
                                textDecoration: 'none',
                                background: 'var(--accent-red-bg)',
                                border: '0.5px solid var(--accent-red-border)',
                                borderLeft: '3px solid var(--accent-red)',
                                padding: '10px 14px',
                                margin: '4px 0 12px 0',
                                flexShrink: 0,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                pointerEvents: 'auto',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--accent-red-border)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--accent-red-bg)';
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 4,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 9.5,
                                        letterSpacing: '0.14em',
                                        color: 'var(--accent-red)',
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                    }}
                                >
                                    // WHY THIS WAS BUILT
                                </span>
                                <span
                                    style={{
                                        fontSize: 9.5,
                                        fontFamily: 'monospace',
                                        color: 'var(--accent-red)',
                                        letterSpacing: '0.1em',
                                        fontWeight: 700,
                                        padding: '2px 6px',
                                        background: 'var(--accent-red-bg)',
                                        border: '0.5px solid var(--accent-red-border)',
                                        borderRadius: '2px',
                                    }}
                                >
                                    OPEN REPO ↗
                                </span>
                            </div>
                            <p
                                style={{
                                    fontSize: fs(13.5),
                                    fontFamily: 'sans-serif',
                                    color: 'var(--text-primary)',
                                    lineHeight: 1.65,
                                    margin: 0,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {whyText}
                            </p>
                        </a>
                    ) : (
                        <div
                            style={{
                                background: 'var(--accent-red-bg)',
                                border: '0.5px solid var(--accent-red-border)',
                                borderLeft: '3px solid var(--accent-red)',
                                padding: '10px 14px',
                                margin: '4px 0 12px 0',
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 9.5,
                                    letterSpacing: '0.14em',
                                    color: 'var(--accent-red)',
                                    marginBottom: 4,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                }}
                            >
                                // WHY THIS WAS BUILT
                            </div>
                            <p
                                style={{
                                    fontSize: fs(13.5),
                                    fontFamily: 'sans-serif',
                                    color: 'var(--text-primary)',
                                    lineHeight: 1.65,
                                    margin: 0,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {whyText}
                            </p>
                        </div>
                    )
                )}

                {/* 6. Solution / What was built */}
                {project.solution && (
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 6,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: 9.5,
                                    letterSpacing: '0.14em',
                                    color: 'var(--text-muted)',
                                }}
                            >
                                WHAT WAS BUILT
                            </span>
                            {project.github ? (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--accent-green)',
                                        fontFamily: 'monospace',
                                        fontSize: 10,
                                        letterSpacing: '0.1em',
                                        cursor: 'pointer',
                                        padding: 0,
                                        lineHeight: 1,
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '3px',
                                    }}
                                >
                                    <span>[+ READ MORE]</span>
                                    <span style={{ fontSize: 9 }}>↗</span>
                                </a>
                            ) : isLongSolution ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setExpanded(!expanded);
                                    }}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--accent-green)',
                                        fontFamily: 'monospace',
                                        fontSize: 10,
                                        letterSpacing: '0.1em',
                                        cursor: 'pointer',
                                        padding: 0,
                                        lineHeight: 1,
                                    }}
                                >
                                    {expanded ? '[- LESS]' : '[+ READ MORE]'}
                                </button>
                            ) : null}
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: fs(13.5),
                                color: 'var(--text-primary)',
                                lineHeight: 1.68,
                                margin: 0,
                                ...(expanded
                                    ? { display: 'block', overflow: 'visible' }
                                    : {
                                          display: '-webkit-box',
                                          WebkitLineClamp: 6,
                                          WebkitBoxOrient: 'vertical',
                                          overflow: 'hidden',
                                      }),
                            }}
                        >
                            {project.solution}
                        </p>
                    </div>
                )}
            </div>

            {/* ── FOOTER BAR (pinned to bottom) ─────────────────── */}
            <div
                style={{
                    height: 44,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 20px',
                    borderTop: '0.5px solid var(--border-default)',
                    flexShrink: 0,
                    gap: 12,
                }}
            >
                {/* Identity hint — left */}
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 9.5,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.12em',
                    }}
                >
                    IDENTITY // CASE {caseNumber}
                </span>

                {/* Right button group: GITHUB/SRC + LIVE DEMO */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* LIVE DEMO button (if available) */}
                    {((project.liveUrl ?? project.demo ?? null) as string | null) && (
                        <a
                            href={(project.liveUrl ?? project.demo) as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                fontFamily: 'monospace',
                                fontSize: fs(10),
                                letterSpacing: '0.12em',
                                padding: '4px 12px',
                                color: 'var(--accent-green)',
                                background: 'var(--accent-green-bg)',
                                border: '0.5px solid var(--accent-green-border)',
                                borderRadius: '2px',
                                cursor: 'pointer',
                                flexShrink: 0,
                                lineHeight: 1,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <span>LIVE DEMO</span>
                            <span style={{ fontSize: 9 }}>↗</span>
                        </a>
                    )}

                    {/* SRC/GITHUB button or PRIVATE label */}
                    {isPrivateProject ? (
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: fs(9.5),
                                letterSpacing: '0.1em',
                                padding: '3px 10px',
                                color: 'var(--text-muted)',
                                border: '0.5px solid var(--border-default)',
                                flexShrink: 0,
                            }}
                        >
                            PRIVATE
                        </span>
                    ) : (
                        <a
                            href={project.github!}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                fontFamily: 'monospace',
                                fontSize: fs(10),
                                letterSpacing: '0.12em',
                                padding: '4px 12px',
                                color: 'var(--accent-red)',
                                background: 'var(--accent-red-bg)',
                                border: '0.5px solid var(--accent-red-border)',
                                borderRadius: '2px',
                                cursor: 'pointer',
                                flexShrink: 0,
                                lineHeight: 1,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <span>{project.id === 'arachnode' ? 'GITHUB' : 'SRC'}</span>
                            <span style={{ fontSize: 9 }}>↗</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
