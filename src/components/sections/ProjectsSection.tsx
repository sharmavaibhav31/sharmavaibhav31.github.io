// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React, { useState, useRef, useEffect } from 'react';
import projectsData from '../../data/projects.json';

type Project = typeof projectsData[0];

const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setMaxHeight('0px');
        }
    }, [isOpen]);

    const pid = 1042 + (index * 65);
    const desc = project.solution ? (project.solution.length > 60 ? project.solution.slice(0, 60) + '...' : project.solution) : '';
    const stack = (project.stack || []).slice(0, 3);
    const isRun = project.category && (project.category.toUpperCase().includes('SECURITY') || project.category.toUpperCase().includes('ML') || project.category.toUpperCase().includes('AI'));

    const archPoints = typeof project.architecture === 'string' 
        ? project.architecture.split('→').map(s => s.trim()).filter(Boolean)
        : Array.isArray(project.architecture) ? project.architecture : [];

    return (
        <>
            <div 
                className="grid grid-cols-2 sm:grid-cols-[60px_1fr_90px_70px] md:grid-cols-[60px_1fr_220px_90px_70px] gap-x-4 gap-y-3 px-[2rem] py-[14px] border-b-[0.5px] cursor-pointer transition-colors duration-150 items-center"
                style={{ borderColor: 'var(--border-subtle)' }}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={e => (e.currentTarget.style.background = '#1a1a1a')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
                {/* PID */}
                <div className="hidden sm:block font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {pid}
                </div>

                {/* PROCESS */}
                <div className="col-span-2 sm:col-span-1 flex flex-col">
                    <div className="font-sans text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {project.title}
                    </div>
                    <div className="font-mono text-[11px] mt-[2px]" style={{ color: 'var(--text-muted)' }}>
                        {desc}
                    </div>
                </div>

                {/* STACK */}
                <div className="hidden md:flex flex-row flex-wrap gap-[4px]">
                    {stack.map(tech => (
                        <span key={tech} className="font-mono text-[10px] px-[6px] py-[1px] border-[0.5px]"
                            style={{ color: 'var(--text-muted)', background: 'var(--bg-raised)', borderColor: 'var(--border-default)' }}>
                            {tech}
                        </span>
                    ))}
                </div>

                {/* STATUS */}
                <div className="flex items-center">
                    {isRun ? (
                        <span className="font-mono text-[9px] font-bold px-[8px] py-[2px] border-[0.5px]"
                            style={{ background: 'var(--accent-orange-bg)', color: 'var(--accent-orange)', borderColor: 'var(--accent-orange-border)' }}>RUN</span>
                    ) : (
                        <span className="font-mono text-[9px] font-bold px-[8px] py-[2px] border-[0.5px]"
                            style={{ background: 'var(--bg-raised)', color: 'var(--text-muted)', borderColor: 'var(--border-default)' }}>SLP</span>
                    )}
                </div>

                {/* SRC */}
                <div className="flex items-center justify-end">
                    {project.github && (
                        <button 
                            className="font-mono text-[10px] px-[10px] py-[4px] border-[0.5px] transition-colors hover:bg-[rgba(255,65,65,0.18)]"
                            style={{ background: 'var(--accent-red-bg)', color: 'var(--accent-red)', borderColor: 'var(--accent-red-border)' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.github, '_blank', 'noopener,noreferrer');
                            }}
                        >
                            SRC
                        </button>
                    )}
                </div>
            </div>

            {/* ACCORDION ROW */}
            <div 
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight, background: 'var(--bg-surface)' }}
            >
                <div ref={contentRef} className="border-b-[0.5px]" style={{ borderColor: 'var(--border-default)' }}>
                    <div className="p-6 md:p-[1.5rem_2rem_1.5rem_60px] grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
                        
                        {/* Left column */}
                        <div className="flex flex-col">
                            <div className="font-mono text-[9px] tracking-[0.14em] mb-[6px]" style={{ color: 'var(--text-muted)' }}>ROLE</div>
                            <div className="font-mono text-[12px] border-l-[2px] px-[10px] py-[8px] leading-[1.7]"
                                style={{ color: 'var(--text-secondary)', borderColor: 'var(--accent-green-border)', background: 'var(--accent-green-bg)' }}>
                                {project.role}
                            </div>

                            {project.solution && (
                                <>
                                    <div className="font-mono text-[9px] tracking-[0.14em] mb-[6px] mt-[1rem]" style={{ color: 'var(--text-muted)' }}>PROBLEM</div>
                                    <div className="font-mono text-[12px] border-l-[2px] px-[10px] py-[8px] leading-[1.7]"
                                        style={{ color: 'var(--text-secondary)', borderColor: 'var(--accent-green-border)', background: 'var(--accent-green-bg)' }}>
                                        {project.solution}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right column */}
                        <div className="flex flex-col">
                            <div className="font-mono text-[9px] tracking-[0.14em] mb-[6px]" style={{ color: 'var(--text-muted)' }}>ARCHITECTURE</div>
                            <div className="flex flex-col">
                                {archPoints.map((pt, i) => (
                                    <div key={i} className="flex items-start gap-[8px] py-[5px] border-b-[0.5px]"
                                        style={{ borderColor: 'var(--border-subtle)' }}>
                                        <span className="w-[3px] h-[3px] rounded-full shrink-0 mt-[6px]"
                                            style={{ background: 'var(--accent-green)' }}></span>
                                        <span className="font-mono text-[12px] leading-[1.6]"
                                            style={{ color: 'var(--text-secondary)' }}>{pt}</span>
                                    </div>
                                ))}
                            </div>

                            {project.impact && (
                                <>
                                    <div className="font-mono text-[9px] tracking-[0.14em] mb-[8px] mt-[1rem]" style={{ color: 'var(--text-muted)' }}>IMPACT</div>
                                    <div className="border-[0.5px] px-[10px] py-[8px] font-mono text-[12px] leading-[1.6]"
                                        style={{ background: 'var(--accent-green-bg)', borderColor: 'var(--accent-green-border)', color: 'var(--text-secondary)' }}>
                                        {project.impact}
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export const ProjectsSection: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('ALL');

    const categories = Array.from(new Set(
        projectsData.map(p => p.category).filter(Boolean)
    )) as string[];

    const filters = ['ALL', ...categories.map(c => c.toUpperCase())];

    const filteredProjects = projectsData.filter(p => 
        activeFilter === 'ALL' || (p.category && p.category.toUpperCase() === activeFilter)
    );

    return (
        <section id="work" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
            {/* SECTION HEADER BAR */}
            <div className="w-full h-[36px] border-y-[0.5px] px-4 md:px-8 flex justify-between items-center shrink-0"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] font-medium" style={{ color: 'var(--text-muted)' }}>
                    PROCESS TABLE — SELECTED WORK
                </div>
                <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {projectsData.length} processes · 0 errors
                </div>
            </div>

            {/* FILTER ROW */}
            <div className="w-full px-4 md:px-8 py-[1rem] flex flex-wrap gap-0 border-b-[0.5px]"
                style={{ borderColor: 'var(--border-default)' }}>
                {filters.map(filter => {
                    const isActive = activeFilter === filter;
                    return (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className="font-mono text-[10px] tracking-[0.12em] px-[16px] py-[6px] bg-transparent cursor-pointer transition-all duration-150 border-b-[2px]"
                            style={{
                                color: isActive ? 'var(--accent-green)' : 'var(--text-muted)',
                                borderBottomColor: isActive ? 'var(--accent-green)' : 'transparent',
                            }}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>

            {/* TABLE COLUMN HEADERS */}
            <div className="hidden sm:grid sm:grid-cols-[60px_1fr_90px_70px] md:grid-cols-[60px_1fr_220px_90px_70px] gap-4 px-[2rem] py-[8px] border-b-[0.5px] items-center"
                style={{ borderColor: 'var(--border-default)' }}>
                {['PID', 'PROCESS', null, 'STATUS', 'SRC'].map((h, i) => (
                    <div key={i} className={`font-mono text-[9px] tracking-[0.16em] ${i === 4 ? 'text-right' : ''} ${i === 2 ? 'hidden md:block' : ''}`}
                        style={{ color: 'var(--text-muted)' }}>
                        {h === null ? 'STACK' : h}
                    </div>
                ))}
            </div>

            {/* PROJECT ROWS */}
            <div className="w-full flex flex-col">
                {filteredProjects.map((project, index) => (
                    <ProjectRow key={project.id} project={project as Project} index={index} />
                ))}
            </div>

        </section>
    );
};
