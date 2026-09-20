// SkillsPanel.tsx
// Displays tech capabilities in a 2x2 grid, highlights active skills, and lists additional project-specific skills.

import React from 'react';

interface Project {
    id: string;
    title: string;
    [key: string]: unknown;
}

interface SkillsPanelProps {
    activeProject: Project | null;
}

const skillProjectMap: Record<string, string[]> = {
    'Java':           ['timetable-scheduler', 'appraisal-management', 'hpms'],
    'Python':         ['arachnode', 'moodharmonics', 'air-notepad', 'trailhead-tracker'],
    'Node.js':        ['hpms'],
    'C':              ['offline-ai-shell'],
    'Spring Boot':    ['timetable-scheduler', 'appraisal-management'],
    'FastAPI':        ['arachnode', 'trailhead-tracker'],
    'Flask':          ['moodharmonics'],
    'Express.js':     ['hpms'],
    'REST APIs':      ['arachnode', 'hpms', 'timetable-scheduler', 'appraisal-management', 'trailhead-tracker'],
    'JWT & RBAC':     ['hpms', 'appraisal-management'],
    'PostgreSQL':     ['arachnode', 'hpms', 'appraisal-management', 'timetable-scheduler'],
    'Redis Streams':  ['arachnode'],
    'MongoDB':        ['moodharmonics'],
    'Flyway':         ['timetable-scheduler', 'appraisal-management'],
    'Prisma':         ['hpms'],
    'Docker':         ['arachnode', 'hpms', 'appraisal-management', 'timetable-scheduler'],
    'Nginx':          ['hpms'],
    'GitHub Actions': ['arachnode'],
    'Linux':          ['offline-ai-shell', 'arachnode'],
    'Seccomp':        ['offline-ai-shell'],
    'Linux Namespaces':['offline-ai-shell'],
    'llama.cpp':      ['offline-ai-shell'],
    'EC2 / SSH':      ['arachnode'],
    'pytest':         ['arachnode'],
    'testcontainers': ['arachnode'],
    'H2 Integration': ['timetable-scheduler', 'appraisal-management'],
};

// ── CUSTOM OTHER SKILLS PLACEHOLDERS PER PROJECT ─────────────────────────────
// You can edit or add custom skills for each project ID here.
const otherSkillsMap: Record<string, string[]> = {
    'arachnode':           ['Scrapy', 'Playwright', 'APScheduler', 'Ollama', 'OSINT'],
    'hpms':                ['QR Codes', 'html5-qrcode', 'node-cron', 'SMTP'],
    'appraisal-management':['State Machine', 'Audit Trail', 'Immutability'],
    'timetable-scheduler': ['Constraint Propagation', 'Apache POI', 'H2 Ephemeral'],
    'trailhead-tracker':   ['OpenPyXL', 'RapidFuzz', 'Aura Client'],
    'offline-ai-shell':    ['TinyLlama-1.1B', 'CMake', 'rlimits'],
    'moodharmonics':       ['MusicGen', 'YAMNet', 'GTZAN Classifier'],
    'air-notepad':         ['OpenCV', 'MediaPipe', 'NumPy', 'Hand Landmarks'],
    'urlshortener':        ['Base62 Encoding', 'Cache-Aside', 'Connection Pooling'],
};

interface SkillCategory {
    category: string;
    skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
    {
        category: 'BACKEND',
        skills: ['Java', 'Python', 'Node.js', 'C', 'Spring Boot', 'FastAPI', 'Flask', 'Express.js', 'REST APIs', 'JWT & RBAC'],
    },
    {
        category: 'DATA',
        skills: ['PostgreSQL', 'Redis Streams', 'MongoDB', 'Flyway', 'Prisma'],
    },
    {
        category: 'INFRA & SYSTEMS',
        skills: ['Docker', 'Nginx', 'GitHub Actions', 'Linux', 'Seccomp', 'Linux Namespaces', 'llama.cpp', 'EC2 / SSH'],
    },
    {
        category: 'TESTING',
        skills: ['pytest', 'testcontainers', 'H2 Integration'],
    },
];

export const SkillsPanel: React.FC<SkillsPanelProps> = ({ activeProject }) => {
    const activeId = activeProject?.id ?? '';
    const otherSkills = activeId ? (otherSkillsMap[activeId] ?? []) : [];

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.3)',
                borderLeft: '0.5px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
            }}
        >
            <style dangerouslySetInnerHTML={{ __html: `
                .skills-panel-body::-webkit-scrollbar {
                    width: 2px;
                }
                .skills-panel-body::-webkit-scrollbar-track {
                    background: transparent;
                }
                .skills-panel-body::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                }
            `}} />

            {/* ── PANEL HEADER ────────────────────────────────────────────── */}
            <div
                style={{
                    height: 36,
                    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                    padding: '0 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                    boxSizing: 'border-box',
                    background: 'rgba(0,0,0,0.2)',
                }}
            >
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8,
                        letterSpacing: '0.14em',
                        color: 'rgba(255,255,255,0.4)',
                    }}
                >
                    CAPABILITIES USED
                </span>
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        color: '#4ade80',
                        opacity: 1,
                        transition: 'opacity 0.2s ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 160,
                    }}
                    title={activeProject ? activeProject.title : 'ALL'}
                >
                    {activeProject ? (activeProject.id ? activeProject.id.toUpperCase() : activeProject.title) : 'ALL'}
                </span>
            </div>

            {/* ── PANEL BODY ──────────────────────────────────────────────── */}
            <div
                className="skills-panel-body"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* ── 2x2 GRID FOR CORE CATEGORIES ─────────────────────────── */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 10,
                        padding: 10,
                        boxSizing: 'border-box',
                    }}
                >
                    {SKILL_CATEGORIES.map(({ category, skills }) => (
                        <div
                            key={category}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '0.5px solid rgba(255,255,255,0.06)',
                                padding: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                                boxSizing: 'border-box',
                            }}
                        >
                            {/* Category Label */}
                            <div
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: 8,
                                    letterSpacing: '0.12em',
                                    color: 'rgba(255,255,255,0.3)',
                                    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                                    paddingBottom: 4,
                                    marginBottom: 4,
                                }}
                            >
                                {category}
                            </div>

                            {/* Skill Rows */}
                            {skills.map(skill => {
                                const projectList = skillProjectMap[skill] ?? [];
                                const isProjectFocused = activeProject !== null;
                                const isActive = isProjectFocused && activeProject.id && projectList.includes(activeProject.id);

                                let rowBg = 'transparent';
                                let textColor = 'rgba(255,255,255,0.35)';
                                let dotOpacity = 0;

                                if (!isProjectFocused) {
                                    textColor = 'rgba(255,255,255,0.4)';
                                    dotOpacity = 0;
                                } else if (isActive) {
                                    rowBg = 'rgba(74,222,128,0.08)';
                                    textColor = '#f5f5f5';
                                    dotOpacity = 1;
                                } else {
                                    textColor = 'rgba(255,255,255,0.15)';
                                    dotOpacity = 0;
                                }

                                return (
                                    <div
                                        key={skill}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '3px 4px',
                                            borderRadius: 2,
                                            background: rowBg,
                                            borderLeft: isActive ? '2px solid #4ade80' : '2px solid transparent',
                                            transition: 'all 0.2s ease',
                                            boxSizing: 'border-box',
                                        }}
                                    >
                                        {/* Dot Indicator */}
                                        <div
                                            style={{
                                                width: 4,
                                                height: 4,
                                                minWidth: 4,
                                                borderRadius: '50%',
                                                background: '#4ade80',
                                                marginRight: 5,
                                                opacity: dotOpacity,
                                                transition: 'opacity 0.2s ease',
                                            }}
                                        />

                                        {/* Skill Name */}
                                        <span
                                            style={{
                                                fontFamily: 'monospace',
                                                fontSize: 10,
                                                fontWeight: isActive ? 600 : 400,
                                                color: textColor,
                                                transition: 'color 0.2s ease',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* ── OTHER SKILLS SECTION ───────────────────────────────── */}
                <div
                    style={{
                        margin: '0 10px 10px',
                        padding: '8px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '0.5px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        boxSizing: 'border-box',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 8,
                            letterSpacing: '0.12em',
                            color: 'rgba(255,255,255,0.3)',
                            borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                            paddingBottom: 4,
                        }}
                    >
                        OTHER SKILLS
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, paddingTop: 2 }}>
                        {otherSkills.length > 0 ? (
                            otherSkills.map(skill => (
                                <div
                                    key={skill}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '2px 6px',
                                        borderRadius: 2,
                                        background: activeProject ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.03)',
                                        border: '0.5px solid ' + (activeProject ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.06)'),
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 4,
                                            height: 4,
                                            borderRadius: '50%',
                                            background: '#4ade80',
                                            marginRight: 4,
                                            opacity: activeProject ? 1 : 0,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontFamily: 'monospace',
                                            fontSize: 9,
                                            color: activeProject ? '#f5f5f5' : 'rgba(255,255,255,0.3)',
                                        }}
                                    >
                                        {skill}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>
                                // Select a project to view specialized tech
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
