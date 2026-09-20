// ProjectsSection.tsx — Scroll-driven dossier page-turn effect
// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useScroll, useMotionValueEvent, motion, useTransform, MotionValue } from 'framer-motion';
import projectsData from '../../data/projects.json';
import { CaseFilePage } from './CaseFilePage';
import { FRONT_CLAMP_STYLE, CaseFileFront } from './CaseFileFront';
import { SkillsPanel } from './SkillsPanel';
import { CaseFileCover } from './CaseFileCover';
import { CaseFileCoverLeft } from './CaseFileCoverLeft';
import { CaseFileEndRight } from './CaseFileEndRight';

type Project = typeof projectsData[0];

// ── Badge label helper for rail ───────────────────────────────────────────────
function getRailBadgeLabel(category: string): string {
    const map: Record<string, string> = {
        'Enterprise Workflow System': 'WFLOW',
        'IoT Systems': 'IOT',
        'ML Orchestration': 'ML',
        'Automation': 'AUTO',
        'Security': 'SEC',
        'Scalability': 'SCALE',
        'HCI': 'HCI',
    };
    return map[category] ?? category.toUpperCase();
}

// ── CoverLeftLeaf (Step 0 - Left Cover Panel) ────────────────────────────────
const CoverLeftLeaf: React.FC<{
    scrollYProgress: MotionValue<number>;
    totalSteps: number;
    stageWidth: number;
    stageHeight: number;
    isTablet?: boolean;
}> = ({ scrollYProgress, totalSteps, stageWidth, stageHeight, isTablet }) => {
    const inputStart = 0;
    const inputEnd = 1 / totalSteps;

    const pageProgress = useTransform(scrollYProgress, [inputStart, inputEnd], [0, 1], { clamp: true });
    const opacity = useTransform(pageProgress, [0, 0.8, 1], [1, 0.2, 0]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: stageWidth / 2,
                height: stageHeight,
                zIndex: 500,
                opacity,
            }}
        >
            <CaseFileCoverLeft isTablet={isTablet} />
        </motion.div>
    );
};

// ── CoverPageLeaf (Step 0 - Right Cover Panel) ───────────────────────────────
const CoverPageLeaf: React.FC<{
    totalProjects: number;
    firstProject: Project | null;
    scrollYProgress: MotionValue<number>;
    totalSteps: number;
    stageWidth: number;
    stageHeight: number;
    isTablet?: boolean;
}> = ({ totalProjects, firstProject, scrollYProgress, totalSteps, stageWidth, stageHeight, isTablet }) => {
    const inputStart = 0;
    const inputEnd = 1 / totalSteps;

    const pageProgress = useTransform(scrollYProgress, [inputStart, inputEnd], [0, 1], { clamp: true });
    const rotateY = useTransform(pageProgress, [0, 0.3, 0.6, 0.85, 1], [0, -22, -99, -158, -180]);
    const curlOpacity = useTransform(pageProgress, (p) => Math.sin(p * Math.PI));
    const zIndex = useTransform(pageProgress, (p) => (p >= 1 ? 0 : 500));

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: stageWidth / 2,
                height: stageHeight,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                rotateY,
                zIndex,
                willChange: 'transform',
            }}
        >
            {/* Front face (0 to -90°): Cover page */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                }}
            >
                <CaseFileCover totalProjects={totalProjects} isTablet={isTablet} />
            </div>

            {/* Back face (-90 to -180°): Identity of Project 1 */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                }}
            >
                {firstProject && (
                    <CaseFileFront
                        project={firstProject}
                        caseNumber="001"
                        classificationLabel={
                            firstProject.isPrivate !== true && firstProject.github
                                ? 'PUBLIC · OPEN SOURCE'
                                : 'RESTRICTED'
                        }
                        isTablet={isTablet}
                    />
                )}
            </div>

            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 40%)',
                    zIndex: 10,
                    opacity: curlOpacity,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                }}
            />
        </motion.div>
    );
};

// ── EndRightLeaf (Final Step - Right End Panel) ──────────────────────────────
const EndRightLeaf: React.FC<{
    scrollYProgress: MotionValue<number>;
    totalSteps: number;
    stageWidth: number;
    stageHeight: number;
    isTablet?: boolean;
}> = ({ scrollYProgress, totalSteps, stageWidth, stageHeight, isTablet }) => {
    const inputStart = (totalSteps - 1) / totalSteps;

    const opacity = useTransform(scrollYProgress, (progress) => {
        return progress >= inputStart ? 1 : 0;
    });

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: stageWidth / 2,
                height: stageHeight,
                zIndex: 1,
                opacity,
            }}
        >
            <CaseFileEndRight isTablet={isTablet} />
        </motion.div>
    );
};

// ── Mobile fallback card (IntersectionObserver fade-in) ───────────────────────
const MobileCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const archText = typeof project.architecture === 'string'
        ? project.architecture
        : Array.isArray(project.architecture)
            ? (project.architecture as string[]).join(' → ')
            : '';

    const isPrivate = (project as any).isPrivate === true || project.github === null;

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
                background: '#0d0d0d',
                border: '0.5px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 1,
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0 16px', height: 36,
                borderBottom: '0.5px solid rgba(255,255,255,0.06)',
            }}>
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.2em', color: 'rgba(255,80,80,0.6)' }}>
                    CASE FILE {String(index + 1).padStart(3, '0')}
                </span>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.16em', margin: 0 }}>
                    // SYSTEMS BUILT
                </p>
                <h3 style={{ fontFamily: 'sans-serif', fontSize: 15, fontWeight: 700, color: '#f5f5f5', margin: 0, lineHeight: 1.25 }}>
                    {project.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {(project.stack ?? []).slice(0, 4).map(t => (
                        <span key={t} style={{
                            fontFamily: 'monospace', fontSize: 9, padding: '1px 6px',
                            color: '#8e8e8e', background: 'rgba(255,255,255,0.04)',
                            border: '0.5px solid rgba(255,255,255,0.08)',
                        }}>{t}</span>
                    ))}
                </div>
                <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#c8c8c8', lineHeight: 1.7, margin: 0 }}>
                    {project.solution ?? ''}
                </p>
            </div>

            {/* Architecture accordion */}
            <div style={{ overflow: 'hidden', maxHeight: open ? 300 : 0, transition: 'max-height 0.3s ease' }}>
                {archText && (
                    <div style={{ padding: '12px 16px 0' }}>
                        <p style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', marginBottom: 6 }}>
                            ARCHITECTURE
                        </p>
                        <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#c8c8c8', lineHeight: 1.7, margin: 0 }}>
                            {archText}
                        </p>
                    </div>
                )}
                {project.impact && (
                    <div style={{
                        margin: '12px 16px 0',
                        background: 'rgba(74,222,128,0.04)',
                        border: '0.5px solid rgba(74,222,128,0.15)',
                        padding: '8px 12px',
                    }}>
                        <p style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', marginBottom: 4 }}>
                            IMPACT
                        </p>
                        <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#c8c8c8', lineHeight: 1.7, margin: 0 }}>
                            {project.impact}
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0 16px', height: 40,
                borderTop: '0.5px solid rgba(255,255,255,0.06)',
                marginTop: 12, gap: 12,
            }}>
                <button
                    onClick={() => setOpen(o => !o)}
                    style={{
                        fontFamily: 'monospace', fontSize: 9, padding: '3px 10px',
                        color: '#8e8e8e', background: 'transparent',
                        border: '0.5px solid rgba(255,255,255,0.12)', cursor: 'pointer',
                    }}
                >
                    Architecture {open ? '▴' : '▾'}
                </button>
                {isPrivate ? (
                    <span style={{
                        fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.1em',
                        padding: '2px 8px', color: 'rgba(255,255,255,0.2)',
                        border: '0.5px solid rgba(255,255,255,0.08)',
                    }}>PRIVATE</span>
                ) : (
                    <button
                        style={{
                            fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.1em',
                            padding: '3px 10px', color: 'rgba(255,80,80,0.8)',
                            background: 'rgba(255,65,65,0.08)',
                            border: '0.5px solid rgba(255,80,80,0.3)', cursor: 'pointer',
                        }}
                        onClick={() => window.open((project as any).github!, '_blank')}
                    >
                        {project.id === 'arachnode' ? 'GITHUB' : 'SRC'}
                    </button>
                )}
            </div>
        </div>
    );
};

// ── Scroll hint (pulsing, fades out after first page starts turning) ──────────
const ScrollHint: React.FC<{ visible: boolean }> = ({ visible }) => (
    <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'monospace',
        fontSize: 9,
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.25)',
        whiteSpace: 'nowrap',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        animation: visible ? 'dossier-pulse 2s ease-in-out infinite' : 'none',
        pointerEvents: 'none',
        zIndex: 600,
    }}>
        ↓ scroll to unseal dossier
    </div>
);

// ── Left-panel background (turned pages land here) ────────────────────────────
const LeftPanelBg: React.FC<{ width: number; height: number }> = ({ width, height }) => (
    <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width, height,
        background: '#111111',
        border: '0.5px solid rgba(255,255,255,0.06)',
        borderRight: 'none',
    }} />
);

// ── Right-panel background (unturned pages sit here) ─────────────────────────
const RightPanelBg: React.FC<{ stageWidth: number; height: number }> = ({ stageWidth, height }) => (
    <div style={{
        position: 'absolute',
        top: 0, left: stageWidth / 2,
        width: stageWidth / 2, height,
        background: '#0d0d0d',
        border: '0.5px solid rgba(255,255,255,0.06)',
    }} />
);

// ── FilterRail Component ───────────────────────────────────────────────────────
interface FilterRailProps {
    filters: string[];
    active: string;
    onChange: (f: string) => void;
}
const FilterRail: React.FC<FilterRailProps> = ({ filters, active, onChange }) => (
    <div
        style={{
            height: '100%',
            background: 'rgba(0,0,0,0.3)',
            borderRight: '0.5px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            overflowY: 'auto',
        }}
    >
        <span
            style={{
                display: 'block',
                fontFamily: 'monospace',
                fontSize: 7,
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.12)',
                textAlign: 'center',
                padding: '10px 4px 8px',
                borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
            }}
        >
            FILTER
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {filters.map(f => {
                const isActive = active === f;
                return (
                    <button
                        key={f}
                        onClick={() => onChange(f)}
                        className="filter-rail-btn"
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '8px 0',
                            fontFamily: 'monospace',
                            fontSize: 8,
                            letterSpacing: '0.1em',
                            textAlign: 'center',
                            color: isActive ? '#4ade80' : 'rgba(255,255,255,0.2)',
                            background: isActive ? 'rgba(74,222,128,0.04)' : 'transparent',
                            border: 'none',
                            borderRight: isActive ? '2px solid #4ade80' : '2px solid transparent',
                            borderBottom: '0.5px solid rgba(255,255,255,0.04)',
                            cursor: 'pointer',
                            transition: 'color 0.15s, background 0.15s',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {f === 'ALL' ? 'ALL' : getRailBadgeLabel(f)}
                    </button>
                );
            })}
        </div>
    </div>
);

// ── Main component ─────────────────────────────────────────────────────────────
export const ProjectsSection: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('ALL');
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [showHint, setShowHint] = useState(true);

    const [stageW, setStageW] = useState(1060);
    const [stageH, setStageH] = useState(660);

    const outerRef = useRef<HTMLDivElement>(null);

    // ── Breakpoint & dynamic stage dimension detection ──────────────────────
    useEffect(() => {
        const check = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const mobile = w < 640;
            const tablet = w >= 640 && w < 1024;
            setIsMobile(mobile);
            setIsTablet(tablet);

            if (mobile) return;

            // Compute available space in the middle column
            // Navbar = 48px, SectionHeader = 36px
            const sidePanelWidth = tablet ? 52 : (56 + 290); // FilterRail (56px) + SkillsPanel (290px)
            const availW = w - sidePanelWidth - 32; // stage padding left/right
            const availH = h - 48 - 36 - 24;        // sticky top (48) + header (36) + stage padding top/bottom (24)

            // Stage width: max 1420px on wide screens, min 640px
            const targetW = Math.min(1420, Math.max(640, availW));
            // Stage height: max 860px on high-res screens, min 500px
            const targetH = Math.min(860, Math.max(500, availH));

            setStageW(targetW);
            setStageH(targetH);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // ── Reduced motion ───────────────────────────────────────────────────────
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = () => setReducedMotion(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // ── Data / filter ────────────────────────────────────────────────────────
    const categories = Array.from(new Set(
        projectsData.map(p => p.category).filter(Boolean)
    )) as string[];
    const filters = ['ALL', ...categories];

    const sortedProjects = [...projectsData].sort((a, b) =>
        (((a as any).display_order ?? 0) - ((b as any).display_order ?? 0))
    );
    const filteredProjects = sortedProjects.filter(p =>
        activeFilter === 'ALL' || p.category === activeFilter
    ) as Project[];

    const N = filteredProjects.length;
    const totalSteps = N + 1; // Step 0 = Cover, Steps 1..N = Projects 0..N-1

    // ── Scroll tracking ──────────────────────────────────────────────────────
    const { scrollYProgress } = useScroll({
        target: outerRef,
        offset: ['start start', 'end end'],
    });

    const [activeProject, setActiveProject] = useState<Project | null>(null);

    // Active page index & active project for counter & SkillsPanel
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const stepIdx = Math.min(Math.floor(latest * totalSteps), totalSteps - 1);
        const safeStep = Math.max(0, stepIdx);
        setActivePageIndex(safeStep);

        if (safeStep === 0) {
            setActiveProject(null); // Cover page active -> SkillsPanel shows overview
        } else {
            const projIdx = safeStep - 1;
            setActiveProject(filteredProjects[projIdx] ?? null);
        }

        // Hide hint once user begins scrolling (progress > 0.5 / totalSteps)
        if (latest > 0.5 / totalSteps) setShowHint(false);
        else setShowHint(true);
    });

    // Reset hint and page index when filter changes
    const handleFilterChange = useCallback((f: string) => {
        setActiveFilter(f);
        setActivePageIndex(0);
        setShowHint(true);
        setActiveProject(null);
    }, []);

    // ── Reduced-motion static list ───────────────────────────────────────────
    if (reducedMotion) {
        return (
            <section id="work" aria-label="Projects" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
                <SectionHeader total={projectsData.length} />
                <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 1rem' }}>
                    {filteredProjects.map((p, i) => <MobileCard key={p.id} project={p} index={i} />)}
                </div>
            </section>
        );
    }

    // ── Mobile fallback ──────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <section id="work" aria-label="Projects" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
                <SectionHeader total={projectsData.length} />
                <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem 0' }}>
                    {filteredProjects.map((p, i) => <MobileCard key={p.id} project={p} index={i} />)}
                </div>
            </section>
        );
    }

    // ── Desktop / tablet — full dossier binder ──────────────────────────────
    const scrollHeight = totalSteps * 120; // vh units

    return (
        <section id="work" aria-label="Projects" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                ${FRONT_CLAMP_STYLE}
                @keyframes dossier-pulse {
                    0%, 100% { opacity: 0.25; }
                    50%       { opacity: 0.55; }
                }
                .filter-rail-btn:hover {
                    color: rgba(255,255,255,0.6) !important;
                }
            `}} />

            {/* ── OUTER SCROLL CONTAINER ─────────────────────────── */}
            <div
                ref={outerRef}
                style={{
                    position: 'relative',
                    height: `${scrollHeight}vh`,
                }}
            >
                {/* ── STICKY WRAPPER ───────────────────────────────── */}
                <div
                    style={{
                        position: 'sticky',
                        top: 48, // Sticky below fixed navbar (48px)
                        height: 'calc(100vh - 48px)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        background: 'var(--bg-primary)',
                        zIndex: 30,
                    }}
                >
                    {/* ── SECTION HEADER (Sticky top bar) ──────────── */}
                    <SectionHeader total={projectsData.length} />

                    {/* ── 3-COLUMN CONTENT GRID ─────────────────────── */}
                    <div
                        style={{
                            flex: 1,
                            display: 'grid',
                            gridTemplateColumns: isTablet ? '52px 1fr' : '56px 1fr 290px',
                            overflow: 'hidden',
                            height: 'calc(100% - 36px)',
                        }}
                    >
                        {/* ── COLUMN 1: FilterRail ─────────────────────── */}
                        <FilterRail filters={filters} active={activeFilter} onChange={handleFilterChange} />

                        {/* ── COLUMN 2: Book Stage ─────────────────────── */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                position: 'relative',
                                padding: '8px 12px',
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    width: stageW,
                                    height: stageH,
                                    perspective: 1600,
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {/* Left panel background (where turned pages land) */}
                                <LeftPanelBg width={stageW / 2} height={stageH} />

                                {/* Right panel background (where unturned pages sit) */}
                                <RightPanelBg stageWidth={stageW} height={stageH} />

                                {/* Center spine */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0, bottom: 0,
                                        left: '50%',
                                        width: 1,
                                        background: 'rgba(255,255,255,0.06)',
                                        zIndex: 650,
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* ── STEP 0: CLOSED CLASSIFIED DOSSIER COVER ────── */}
                                <CoverLeftLeaf
                                    scrollYProgress={scrollYProgress}
                                    totalSteps={totalSteps}
                                    stageWidth={stageW}
                                    stageHeight={stageH}
                                    isTablet={isTablet}
                                />
                                <CoverPageLeaf
                                    totalProjects={N}
                                    firstProject={filteredProjects[0] ?? null}
                                    scrollYProgress={scrollYProgress}
                                    totalSteps={totalSteps}
                                    stageWidth={stageW}
                                    stageHeight={stageH}
                                    isTablet={isTablet}
                                />

                                {/* ── END OF DOSSIER: RIGHT END PANEL ───────────── */}
                                <EndRightLeaf
                                    scrollYProgress={scrollYProgress}
                                    totalSteps={totalSteps}
                                    stageWidth={stageW}
                                    stageHeight={stageH}
                                    isTablet={isTablet}
                                />

                                {/* ── STEPS 1..N: PROJECT DOSSIER SPREADS ──────── */}
                                {filteredProjects.map((project, i) => (
                                    <CaseFilePage
                                        key={`${activeFilter}-${i}-${project.id}`}
                                        project={project as any}
                                        nextProject={(filteredProjects[i + 1] as any) ?? null}
                                        index={i}
                                        totalPages={N}
                                        scrollYProgress={scrollYProgress}
                                        stageWidth={stageW}
                                        stageHeight={stageH}
                                        isTablet={isTablet}
                                    />
                                ))}

                                {/* Page counter */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 20, right: 20,
                                        fontFamily: 'monospace',
                                        fontSize: 8,
                                        letterSpacing: '0.14em',
                                        color: activePageIndex === 0 ? 'rgba(255,80,80,0.8)' : 'rgba(255,255,255,0.3)',
                                        pointerEvents: 'none',
                                        zIndex: 700,
                                    }}
                                >
                                    {activePageIndex === 0
                                        ? 'DOSSIER SEALED // 09 CASE FILES'
                                        : `CASE FILE ${String(activePageIndex).padStart(3, '0')} OF ${String(N).padStart(3, '0')}`}
                                </div>

                                {/* Scroll hint */}
                                <ScrollHint visible={showHint} />
                            </div>
                        </div>

                        {/* ── COLUMN 3: SkillsPanel (Desktop only) ─────── */}
                        {!isTablet && (
                            <SkillsPanel activeProject={activeProject} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// ── Sub-component for header ──────────────────────────────────────────────────

const SectionHeader: React.FC<{ total: number }> = ({ total }) => (
    <div
        className="w-full h-[36px] border-y-[0.5px] px-4 md:px-8 flex justify-between items-center shrink-0"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
    >
        <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] font-medium" style={{ color: 'var(--text-muted)' }}>
            PROCESS TABLE — SELECTED WORK
        </div>
        <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
            {total} processes · 0 errors
        </div>
    </div>
);
