// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React, { useState, useRef, useEffect } from 'react';
import projectsData from '../../data/projects.json';

type Project = typeof projectsData[0];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
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

    const formattedIndex = String(index + 1).padStart(2, '0');
    const stack = (project.stack || []).slice(0, 4);
    
    const archPoints = typeof project.architecture === 'string' 
        ? project.architecture.split('→').map(s => s.trim()).filter(Boolean)
        : Array.isArray(project.architecture) ? project.architecture : [];

    const getBadgeStyle = (category?: string) => {
        const cat = category || '';
        switch(cat) {
            case 'Automation': return { color: '#4a9eff', background: 'rgba(74,158,255,0.1)', borderColor: '#4a9eff' };
            case 'Security': return { color: '#a78bfa', background: 'rgba(167,139,250,0.1)', borderColor: '#a78bfa' };
            case 'ML Orchestration': return { color: '#4ade80', background: 'rgba(74,222,128,0.08)', borderColor: '#4ade80' };
            case 'Scalability': return { color: '#fbbf24', background: 'rgba(251,191,36,0.08)', borderColor: '#fbbf24' };
            case 'HCI': return { color: '#34d399', background: 'rgba(52,211,153,0.08)', borderColor: '#34d399' };
            case 'IoT Systems': return { color: '#f472b6', background: 'rgba(244,114,182,0.08)', borderColor: '#f472b6' };
            case 'Enterprise Workflow System': return { color: '#e05c2a', background: 'rgba(224,92,42,0.08)', borderColor: '#e05c2a' };
            default: return { color: '#8e8e8e', background: 'transparent', borderColor: '#8e8e8e' };
        }
    };

    const badgeStyle = getBadgeStyle(project.category);

    return (
        <div 
            className="flex flex-col p-[16px] sm:p-[14px] lg:p-6 border-b-[0.5px] border-[rgba(255,255,255,0.06)] sm:border-b-0" 
            style={{ background: '#0d0d0d' }}
        >
            {/* Top row */}
            <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-[#6a6a6a]">{formattedIndex}</span>
                {project.category && (
                    <span 
                        className="font-mono text-[9px] tracking-[0.1em] px-[8px] py-[2px]"
                        style={{
                            color: badgeStyle.color,
                            backgroundColor: badgeStyle.background,
                            border: `0.5px solid ${badgeStyle.borderColor}`
                        }}
                    >
                        {project.category.toUpperCase()}
                    </span>
                )}
            </div>

            {/* Title */}
            <h3 className="font-sans text-[14px] font-semibold text-[#f5f5f5] leading-[1.3] mb-[6px]">
                {project.title}
            </h3>

            {/* Description */}
            <div 
                className="project-desc-clamp font-sans text-[12px] text-[#c8c8c8] leading-[1.6] mb-[10px]"
            >
                {project.solution}
            </div>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-[4px] mb-[12px]">
                {stack.map(tech => (
                    <span 
                        key={tech} 
                        className="font-mono text-[9px] px-[6px] py-[1px]"
                        style={{
                            color: '#8e8e8e',
                            background: 'rgba(255,255,255,0.04)',
                            border: '0.5px solid rgba(255,255,255,0.08)'
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Architecture Drawer */}
            <div 
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight }}
            >
                <div ref={contentRef} className="pb-4 flex flex-col gap-3">
                    {/* Architecture */}
                    <div>
                        <div className="font-mono text-[9px] text-[#6a6a6a] tracking-[0.12em] mb-2">ARCHITECTURE</div>
                        <div className="flex flex-col gap-1">
                            {archPoints.map((pt, i) => (
                                <div key={i} className="font-mono text-[11px] text-[#c8c8c8] leading-[1.7]">
                                    {typeof project.architecture === 'string' ? `→ ${pt}` : `• ${pt}`}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Impact */}
                    {project.impact && (
                        <div className="mt-2">
                            <div className="font-mono text-[9px] text-[#6a6a6a] tracking-[0.12em] mb-2">IMPACT</div>
                            <div 
                                className="font-mono text-[11px] text-[#c8c8c8] leading-[1.7] p-[8px]"
                                style={{
                                    borderLeft: '2px solid rgba(74,222,128,0.25)',
                                    background: 'rgba(74,222,128,0.04)'
                                }}
                            >
                                {project.impact}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div 
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-auto pt-[10px] gap-3 sm:gap-0"
                style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}
            >
                <div className="font-mono text-[9px] text-[#6a6a6a] italic whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[55%]">
                    {project.role}
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex-1 sm:flex-none flex items-center justify-center font-mono text-[10px] sm:text-[9px] px-[10px] h-[36px] sm:h-auto sm:py-[3px] bg-transparent transition-colors hover:bg-[rgba(255,255,255,0.05)] cursor-pointer"
                        style={{ color: '#8e8e8e', border: '0.5px solid rgba(255,255,255,0.12)' }}
                    >
                        Architecture {isOpen ? '▴' : '▾'}
                    </button>
                    {project.github && (
                        <button 
                            className="shrink-0 flex items-center justify-center font-mono text-[10px] sm:text-[9px] px-[20px] sm:px-[10px] h-[36px] sm:h-auto sm:py-[3px] transition-colors hover:bg-[rgba(255,65,65,0.15)] cursor-pointer"
                            style={{ 
                                color: 'rgba(255,80,80,0.8)', 
                                background: 'rgba(255,65,65,0.08)',
                                border: '0.5px solid rgba(255,80,80,0.3)'
                            }}
                            onClick={() => window.open(project.github, '_blank')}
                        >
                            SRC
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ProjectsSection: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('ALL');

    const categories = Array.from(new Set(
        projectsData.map(p => p.category).filter(Boolean)
    )) as string[];

    const getDisplayLabel = (cat: string) => {
        if (cat === 'Enterprise Workflow System') return 'WORKFLOW';
        if (cat === 'ML Orchestration') return 'ML';
        if (cat === 'IoT Systems') return 'IOT';
        return cat.toUpperCase();
    };

    const filters = ['ALL', ...categories];

    const filteredProjects = projectsData.filter(p => 
        activeFilter === 'ALL' || p.category === activeFilter
    );

    return (
        <section id="work" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
            <style dangerouslySetInnerHTML={{__html: `
                .project-desc-clamp {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    -webkit-line-clamp: 4;
                }
                @media (min-width: 640px) {
                    .project-desc-clamp {
                        -webkit-line-clamp: 3;
                    }
                }
                .filter-scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}} />

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
            <div className="filter-scrollbar-hide w-full px-4 md:px-8 py-[1rem] flex flex-row sm:flex-wrap gap-0 border-b-[0.5px] overflow-x-auto overflow-y-hidden"
                style={{ 
                    borderColor: 'var(--border-default)',
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}>
                {filters.map(filter => {
                    const isActive = activeFilter === filter;
                    const displayLabel = filter === 'ALL' ? 'ALL' : getDisplayLabel(filter);
                    return (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className="font-mono text-[10px] tracking-[0.12em] px-[14px] sm:px-[16px] py-[6px] bg-transparent cursor-pointer transition-all duration-150 border-b-[2px] whitespace-nowrap shrink-0"
                            style={{
                                color: isActive ? '#4ade80' : '#6a6a6a',
                                borderBottomColor: isActive ? '#4ade80' : 'transparent',
                            }}
                        >
                            {displayLabel}
                        </button>
                    );
                })}
            </div>

            {/* PROJECT GRID */}
            <div 
                className="w-full grid grid-cols-1 sm:grid-cols-2 sm:gap-[1px] bg-transparent sm:bg-[#1a1a1a]"
            >
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project as Project} index={index} />
                ))}
            </div>
        </section>
    );
};
