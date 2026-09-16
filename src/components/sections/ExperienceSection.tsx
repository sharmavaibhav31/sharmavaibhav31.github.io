// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React, { useState } from 'react';

interface ExperienceEntry {
    role: string;
    company: string;
    type: string;
    period: string;
    bullets: string[];
}

const experienceEntries: ExperienceEntry[] = [
    {
        role: "Backend Engineer Intern (Founding Intern)",
        company: "LazyStudents.in (The Lazy Labs)",
        type: "Internship · Remote",
        period: "Jun 2026 – Present",
        bullets: [
            "Designed and built the core Workflows engine (Fetch, UseTool, Validation services) enabling users to chain tools on a single file without re-uploading between steps",
            "Built Lazy Command — an AI orchestration layer parsing natural-language requests into executable workflow graphs, routing intent to 100+ platform tools via Gemini with a complexity-based model router",
            "Root-caused a 4-cause production incident where multi-step workflow runs stalled after step one — traced to a dispatcher bug, metadata corruption, and an unvalidated-input crash; shipped recovery using SELECT FOR UPDATE SKIP LOCKED",
            "Found and reported an IDOR, login timing oracle, production HSTS misconfiguration, and a Next.js build-time auth bypass in a concurrent security audit",
            "Migrated the resuMATCH resume builder (React/Express/MongoDB) into the core platform (Next.js/PostgreSQL) with a rebuilt data layer and standalone Puppeteer PDF-generation service",
            "Shipped platform-wide dark mode, JSON Path Finder (CodeMirror), DSA visualizer, and edge-to-edge layout revamp across 9 Academic Tools"
        ]
    },
    {
        role: "Project Admin & Open Source Maintainer",
        company: "GirlScript Summer of Code (GSSoC 2026)",
        type: "Freelance · Remote",
        period: "May 2026 – Sep 2026",
        bullets: [
            "Served as Project Admin for Arachnode during GSSoC 2026 — managed 61+ repository issues and reviewed 12+ contributor PRs",
            "Guided implementations of semantic job matching (Sentence-BERT), Cutshort.io crawler integration, and platform-selective scraping workflows",
            "Maintained code quality, architecture consistency, and documentation standards across a growing multi-contributor open-source codebase",
            "Reviewed architecture proposals and enforced performance standards for Sentence-BERT semantic ranking, embedding caching, and match tier classification",
            "Established repository-wide Service README Standards requiring independent run guides, module boundaries, and environment configurations for all microservices",
            "Managed issue scoping, proposal evaluations, and PR reviews for features including Cutshort spider, platform selection chips, CSV export, and Ollama fallback routing"
        ]
    },
    {
        role: "Project Maintainer",
        company: "EduLinkUp (ELUSOC 2026)",
        type: "Freelance · Remote",
        period: "Jun 2026 – Aug 2026",
        bullets: [
            "Led development and maintenance of Arachnode, an open-source AI-powered job aggregation platform during ELUSOC 2026",
            "Managed repository operations across 61+ issues and contributor workflows, establishing contribution standards and issue templates",
            "Designed contributor-friendly project architecture, documentation standards, and service-level README guidelines",
            "Maintained backend infrastructure built on FastAPI, PostgreSQL, Redis Streams, and distributed crawler services",
            "Coordinated community contributions across scraping pipelines (LinkedIn, Naukri, Internshala, Cutshort), monitoring dashboards, and AI-powered workflows",
            "Oversaw repository growth to 26+ GitHub stars with active multi-contributor development, Ollama availability handling, and scheduler idempotency reviews"
        ]
    },
    {
        role: "AI/ML Backend Intern",
        company: "Infosys Springboard",
        type: "Internship · Remote",
        period: "Sep 2025 – Nov 2025",
        bullets: [
            "Orchestrated 3 heterogeneous ML models (MusicGen, fine-tuned GPT, YAMNet) behind a Flask API layer for MoodHarmonics",
            "Implemented model preloading and graceful fallback routing — cut initialization latency from ~2.2s to ~1.2s (45% reduction) over 300+ sequential requests",
            "Designed error-handling middleware for inference continuity; persisted metadata and classification results in MongoDB"
        ]
    },
    {
        role: "Mobile Application Developer",
        company: "ClubChat",
        type: "Internship · Remote",
        period: "Jul 2025 – Sep 2025",
        bullets: [
            "Shipped event-feed and real-time chat to a production app connecting 10,000+ college students across India",
            "Resolved 20+ bugs including 3 critical crash-on-launch regressions across two major feature releases"
        ]
    }
];

const ExperienceItem: React.FC<{ exp: ExperienceEntry; isLast: boolean }> = ({ exp, isLast }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasMore = exp.bullets.length > 3;
    const initialBullets = exp.bullets.slice(0, 3);
    const extraBullets = exp.bullets.slice(3);

    return (
        <article className="mb-[2rem]">
            <div className="flex flex-col sm:flex-row gap-0 sm:gap-6 lg:gap-8">
                {/* Left Column - Date */}
                <div className="w-full sm:w-[90px] lg:w-[140px] shrink-0 font-mono text-[9px] sm:text-[10px] tracking-[0.08em] sm:tracking-[0.06em] leading-[1.6] mb-[6px] sm:mb-0 text-[#6a6a6a] sm:text-[var(--text-muted)]">
                    {exp.period}
                </div>

                {/* Right Column - Details */}
                <div className="flex flex-col flex-1">
                    <h3 className="font-sans text-[14px] sm:text-[15px] font-[700] mb-[2px] text-[#f5f5f5] sm:text-[var(--text-primary)]">
                        {exp.role}
                    </h3>
                    <h4 className="font-mono text-[10px] sm:text-[11px] mb-[8px] sm:mb-[10px]" style={{ color: '#8e8e8e' }}>
                        {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                    </h4>
                    
                    <div className="flex flex-col">
                        {initialBullets.map((bullet, j) => (
                            <div key={j} className="flex gap-[8px] sm:gap-[10px] items-start mb-[4px]">
                                <span className="w-[4px] sm:w-[3px] h-[4px] sm:h-[3px] rounded-full shrink-0 mt-[6px] sm:mt-[7px]"
                                    style={{ background: '#4ade80' }}></span>
                                <span className="font-sans sm:font-mono text-[11px] sm:text-[12px] leading-[1.6] sm:leading-[1.7]"
                                    style={{ color: '#c8c8c8' }}>
                                    {bullet}
                                </span>
                            </div>
                        ))}

                        {hasMore && (
                            <div 
                                className="overflow-hidden transition-all duration-300 ease-in-out"
                                style={{ 
                                    maxHeight: isExpanded ? '500px' : '0px',
                                    opacity: isExpanded ? 1 : 0
                                }}
                            >
                                {extraBullets.map((bullet, j) => (
                                    <div key={j + 3} className="flex gap-[8px] sm:gap-[10px] items-start mb-[4px]">
                                        <span className="w-[4px] sm:w-[3px] h-[4px] sm:h-[3px] rounded-full shrink-0 mt-[6px] sm:mt-[7px]"
                                            style={{ background: '#4ade80' }}></span>
                                        <span className="font-sans sm:font-mono text-[11px] sm:text-[12px] leading-[1.6] sm:leading-[1.7]"
                                            style={{ color: '#c8c8c8' }}>
                                            {bullet}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {hasMore && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-[4px] mt-[6px] font-mono text-[10px] tracking-[0.06em] bg-transparent border-none p-0 cursor-pointer transition-colors duration-150 self-start"
                            style={{ color: 'rgba(255,255,255,0.3)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                        >
                            {isExpanded ? 'view less ▴' : `view more (+${extraBullets.length} more) ▾`}
                        </button>
                    )}
                </div>
            </div>

            {/* Entry separator */}
            {!isLast && (
                <div className="w-full h-px border-b-[0.5px] mt-[1.5rem]"
                    style={{ borderColor: 'var(--border-subtle)' }} />
            )}
        </article>
    );
};

export const ExperienceSection: React.FC = () => (
    <section id="experience" aria-label="Experience" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
        {/* SECTION HEADER BAR */}
        <div className="w-full h-[36px] border-y-[0.5px] px-4 md:px-8 flex justify-between items-center shrink-0"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] font-medium" style={{ color: 'var(--text-muted)' }}>
                DEPLOYMENT HISTORY
            </div>
            <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
                {experienceEntries.length} entries
            </div>
        </div>

        {/* CONTENT */}
        <div className="w-full px-[16px] sm:px-8 py-[1.5rem] sm:py-[2rem]">
            {experienceEntries.map((exp, i) => (
                <ExperienceItem 
                    key={i} 
                    exp={exp} 
                    isLast={i === experienceEntries.length - 1} 
                />
            ))}
        </div>
    </section>
);
