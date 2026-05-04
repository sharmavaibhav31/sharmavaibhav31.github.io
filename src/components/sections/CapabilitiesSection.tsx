// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React from 'react';
import skillsData from '../../data/skills.json';

type SkillItem = {
    name: string;
    tooltip?: string;
    projectRef?: string;
};

type CapabilityCategory = {
    category: string;
    items: SkillItem[];
};

const typedSkillsData = skillsData as { capabilities: CapabilityCategory[] };

const getCategoryGlyph = (category: string) => {
    if (category.includes('Backend')) return '{ }';
    if (category.includes('Distributed')) return '>_';
    if (category.includes('Infrastructure') || category.includes('DevOps')) return '[·]';
    if (category.includes('ML')) return '~>';
    return '[]';
};

export const CapabilitiesSection: React.FC = () => {
    const totalSkills = typedSkillsData.capabilities.reduce((acc, cat) => acc + cat.items.length, 0);

    return (
        <section id="capabilities" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
            {/* SECTION HEADER BAR */}
            <div className="w-full h-[36px] border-y-[0.5px] px-4 md:px-8 flex justify-between items-center shrink-0"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                    CAPABILITIES MANIFEST
                </div>
                <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {totalSkills} capabilities
                </div>
            </div>

            {/* CONTENT */}
            <div className="w-full px-4 md:px-8 py-[2rem]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[4rem] gap-y-[2.5rem]">
                    {typedSkillsData.capabilities.map((cap) => (
                        <div key={cap.category} className="border-t-[0.5px] flex flex-col"
                            style={{ borderColor: 'var(--border-default)' }}>
                            {/* Category Header */}
                            <div className="flex items-center gap-[10px] pt-[1rem] pb-[0.6rem]">
                                <span className="font-mono text-[12px]" style={{ color: 'var(--text-muted)' }}>
                                    {getCategoryGlyph(cap.category)}
                                </span>
                                <span className="font-sans text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>
                                    {cap.category}
                                </span>
                            </div>

                            {/* Skill Items */}
                            <div className="flex flex-col">
                                {cap.items.map((item, index) => (
                                    <div 
                                        key={index}
                                        className="group flex items-center justify-between py-[6px] border-b-[0.5px] transition-colors duration-150 cursor-default"
                                        style={{ borderColor: 'var(--border-subtle)' }}
                                        title={item.tooltip}
                                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                    >
                                        <span className="font-mono text-[12px] transition-colors duration-150"
                                            style={{ color: 'var(--text-secondary)' }}>
                                            {item.name}
                                        </span>
                                        {item.projectRef && (
                                            <a 
                                                href="#work"
                                                className="font-mono px-2 cursor-pointer transition-colors duration-150"
                                                style={{ color: 'var(--text-muted)' }}
                                                title="View related project"
                                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-green)')}
                                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                                            >
                                                →
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
