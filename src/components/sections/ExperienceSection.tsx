// ExperienceSection.tsx
// Theme: Classified Dossier × Deployment Timeline with Scroll-Driven Progress & Text Reveal
// Light/Dark mode compliant via CSS variables

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

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
    const itemRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start 90%", "start 45%"],
    });

    const [isExpanded, setIsExpanded] = useState(false);
    const hasMore = exp.bullets.length > 3;
    const initialBullets = exp.bullets.slice(0, 3);
    const extraBullets = exp.bullets.slice(3);

    // Scroll reveal transforms: opacity reveals from 0.2 to 1 as scrolled into view
    const contentOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
    const nodeScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.25]);
    const nodeGlow = useTransform(
        scrollYProgress,
        [0, 1],
        ['0px 0px 0px rgba(74, 222, 128, 0)', '0px 0px 12px rgba(74, 222, 128, 0.7)']
    );

    return (
        <article ref={itemRef} className="relative flex items-start pl-6 sm:pl-10">
            {/* Timeline Node Circle (Centered on the green line) */}
            <motion.div
                className="absolute left-[-5px] sm:left-[-6px] top-[6px] w-[12px] h-[12px] rounded-full bg-[var(--bg-primary)] border-[2px] border-[var(--accent-green)] z-10 shrink-0"
                style={reducedMotion ? undefined : { scale: nodeScale, boxShadow: nodeGlow }}
            />

            {/* Entry details container with scroll-driven opacity reveal */}
            <motion.div
                className="flex flex-col flex-1"
                style={reducedMotion ? undefined : { opacity: contentOpacity }}
            >
                {/* Header: Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="font-sans text-[14px] sm:text-[15px] font-[700]" style={{ color: 'var(--text-primary)' }}>
                        {exp.role}
                    </h3>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.08em] sm:tracking-[0.06em]" style={{ color: 'var(--text-muted)' }}>
                        {exp.period}
                    </span>
                </div>

                {/* Company & Type */}
                <h4 className="font-mono text-[10px] sm:text-[11px] mb-2" style={{ color: 'var(--accent-green)' }}>
                    {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                </h4>

                {/* Bullet Points */}
                <div className="flex flex-col">
                    {initialBullets.map((bullet, j) => (
                        <div key={j} className="flex gap-[8px] sm:gap-[10px] items-start mb-[4px]">
                            <span
                                className="w-[4px] sm:w-[3px] h-[4px] sm:h-[3px] rounded-full shrink-0 mt-[6px] sm:mt-[7px]"
                                style={{ background: 'var(--accent-green)' }}
                            />
                            <span
                                className="font-sans sm:font-mono text-[11px] sm:text-[12px] leading-[1.6] sm:leading-[1.7]"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {bullet}
                            </span>
                        </div>
                    ))}

                    {hasMore && (
                        <div
                            className="overflow-hidden transition-all duration-300 ease-in-out"
                            style={{
                                maxHeight: isExpanded ? '500px' : '0px',
                                opacity: isExpanded ? 1 : 0,
                            }}
                        >
                            {extraBullets.map((bullet, j) => (
                                <div key={j + 3} className="flex gap-[8px] sm:gap-[10px] items-start mb-[4px]">
                                    <span
                                        className="w-[4px] sm:w-[3px] h-[4px] sm:h-[3px] rounded-full shrink-0 mt-[6px] sm:mt-[7px]"
                                        style={{ background: 'var(--accent-green)' }}
                                    />
                                    <span
                                        className="font-sans sm:font-mono text-[11px] sm:text-[12px] leading-[1.6] sm:leading-[1.7]"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
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
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                        {isExpanded ? 'view less ▴' : `view more (+${extraBullets.length} more) ▾`}
                    </button>
                )}

                {/* Entry separator */}
                {!isLast && (
                    <div
                        className="w-full h-px border-b-[0.5px] my-[1.5rem]"
                        style={{ borderColor: 'var(--border-subtle)' }}
                    />
                )}
            </motion.div>
        </article>
    );
};

export const ExperienceSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 75%", "end 30%"],
    });

    return (
        <section id="experience" aria-label="Experience" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
            {/* SECTION HEADER BAR */}
            <div
                className="w-full h-[36px] border-y-[0.5px] px-4 md:px-8 flex justify-between items-center shrink-0"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
            >
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] font-medium" style={{ color: 'var(--text-muted)' }}>
                    DEPLOYMENT HISTORY
                </div>
                <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {experienceEntries.length} entries
                </div>
            </div>

            {/* TIMELINE SECTION CONTAINER */}
            <div ref={containerRef} className="relative w-full px-[16px] sm:px-8 py-[1.5rem] sm:py-[2rem]">
                {/* VERTICAL TIMELINE LINE WITH GREEN SCROLL PROGRESS */}
                <div className="absolute left-[20px] sm:left-[32px] top-[2rem] bottom-[2rem] w-[2px] bg-[var(--border-default)] z-0">
                    <motion.div
                        className="w-full h-full bg-[var(--accent-green)] origin-top"
                        style={{ scaleY: reducedMotion ? 1 : scrollYProgress }}
                    />
                </div>

                {/* ENTRIES LIST */}
                <div className="flex flex-col">
                    {experienceEntries.map((exp, i) => (
                        <ExperienceItem
                            key={i}
                            exp={exp}
                            isLast={i === experienceEntries.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
