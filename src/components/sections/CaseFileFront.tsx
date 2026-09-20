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
                    padding: '16px 20px 12px 20px',
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
                        fontSize: fs(8),
                        letterSpacing: '0.16em',
                        color: 'rgba(255,255,255,0.25)',
                        marginBottom: 6,
                    }}
                >
                    // SYSTEMS BUILT
                </div>

                {/* 2. Title */}
                <h3
                    style={{
                        fontFamily: 'sans-serif',
                        fontSize: fs(15),
                        fontWeight: 700,
                        color: '#f5f5f5',
                        margin: '0 0 8px 0',
                        lineHeight: 1.25,
                    }}
                >
                    {project.title}
                </h3>

                {/* 3. Badge row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
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

                {/* 4. Stack tags (first 5) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
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

                {/* 5. WHY block */}
                {whyText && (
                    <div
                        style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '0.5px solid rgba(255,255,255,0.05)',
                            borderLeft: '2px solid rgba(255,80,80,0.3)',
                            padding: '8px 10px',
                            margin: '4px 0 8px 0',
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 8,
                                letterSpacing: '0.12em',
                                color: 'rgba(255,80,80,0.5)',
                                marginBottom: 4,
                                fontFamily: 'monospace',
                            }}
                        >
                            // WHY THIS WAS BUILT
                        </div>
                        <p
                            style={{
                                fontSize: 11,
                                fontFamily: 'sans-serif',
                                color: '#c8c8c8',
                                lineHeight: 1.6,
                                margin: 0,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {whyText}
                        </p>
                    </div>
                )}

                {/* 6. Solution / What was built */}
                {project.solution && (
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
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
                                    fontFamily: 'monospace',
                                    fontSize: 7,
                                    letterSpacing: '0.12em',
                                    color: 'rgba(255,255,255,0.25)',
                                }}
                            >
                                WHAT WAS BUILT
                            </span>
                            {isLongSolution && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setExpanded(!expanded);
                                    }}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: expanded ? '#4ade80' : 'rgba(74,222,128,0.85)',
                                        fontFamily: 'monospace',
                                        fontSize: 8,
                                        letterSpacing: '0.1em',
                                        cursor: 'pointer',
                                        padding: 0,
                                        lineHeight: 1,
                                    }}
                                >
                                    {expanded ? '[- LESS]' : '[+ READ MORE]'}
                                </button>
                            )}
                        </div>
                        <p
                            style={{
                                fontFamily: 'sans-serif',
                                fontSize: 11,
                                color: 'rgba(255,255,255,0.7)',
                                lineHeight: 1.6,
                                margin: 0,
                                ...(expanded
                                    ? { display: 'block', overflow: 'visible' }
                                    : {
                                          display: '-webkit-box',
                                          WebkitLineClamp: 5,
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
                {/* Identity hint — left */}
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8,
                        color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '0.1em',
                    }}
                >
                    IDENTITY // CASE {caseNumber}
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
