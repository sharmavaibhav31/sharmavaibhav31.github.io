// CapabilitiesSection.tsx
// Theme: Classified Dossier × Capabilities Manifest — CSS variables for light/dark support

import React from 'react';
import skillsData from '../../data/skills.json';

type SkillItem = {
    name: string;
    tier: number;
    tooltip?: string;
};

type CapabilityCategory = {
    category: string;
    glyph: string;
    items: SkillItem[];
};

const typedSkillsData = skillsData as { capabilities: CapabilityCategory[] };

export const CapabilitiesSection: React.FC = () => {
    const totalSkills = typedSkillsData.capabilities.reduce((acc, cat) => acc + cat.items.length, 0);

    const mainCategories = typedSkillsData.capabilities.filter(c => c.category !== 'Testing & Integration');
    const testingCategory = typedSkillsData.capabilities.find(c => c.category === 'Testing & Integration');

    return (
        <section id="capabilities" aria-label="Skills & Capabilities" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
            {/* SECTION HEADER BAR */}
            <div
                className="w-full h-[36px] border-y-[0.5px] px-[16px] sm:px-8 flex justify-between items-center shrink-0"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
            >
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] font-medium" style={{ color: 'var(--text-muted)' }}>
                    CAPABILITIES MANIFEST
                </div>
                <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {totalSkills} capabilities
                </div>
            </div>

            {/* CONTENT */}
            <div className="w-full px-[16px] sm:px-8 py-[2rem]">
                {/* 2-COLUMN GRID FOR TOP 4 CATEGORIES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[3rem] lg:gap-x-[4rem] gap-y-[2rem]">
                    {mainCategories.map((cap) => (
                        <div
                            key={cap.category}
                            role="group"
                            aria-label={cap.category}
                            className="border-t-[0.5px] flex flex-col pt-3"
                            style={{ borderColor: 'var(--border-default)' }}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-[8px] pb-3 border-b-[0.5px]" style={{ borderColor: 'var(--border-subtle)' }}>
                                <span className="font-mono text-[12px] font-bold" style={{ color: 'var(--accent-green)' }}>
                                    {cap.glyph}
                                </span>
                                <span className="font-sans text-[13px] font-[600]" style={{ color: 'var(--text-primary)' }}>
                                    {cap.category}
                                </span>
                            </div>

                            {/* Skill Items Grid (3 per row) */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2.5 pt-3">
                                {cap.items.map((item, index) => {
                                    const isTier1 = item.tier === 1;
                                    const isSpecialized = cap.category === 'Systems & Security' && !isTier1;

                                    const fontWeight = isTier1 ? 'font-[500]' : 'font-[400]';
                                    const opacityStyle = isTier1 ? 1 : isSpecialized ? 0.8 : 0.9;
                                    const textColor = isTier1 ? 'var(--text-primary)' : 'var(--text-secondary)';

                                    return (
                                        <div
                                            key={index}
                                            className="group flex items-center gap-1.5 py-1 px-1.5 rounded transition-all duration-150 ease hover:bg-[var(--bg-surface)]"
                                            style={{ opacity: opacityStyle }}
                                            title={item.tooltip}
                                        >
                                            <span
                                                className={`w-1 h-1 rounded-full shrink-0 ${isTier1 ? 'bg-[var(--accent-green)]' : 'bg-[var(--text-muted)]'}`}
                                            />
                                            <span
                                                className={`font-mono text-[11px] sm:text-[11.5px] ${fontWeight} group-hover:text-[var(--text-primary)] transition-colors duration-150 ease`}
                                                style={{ color: textColor }}
                                            >
                                                {item.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FULL-WIDTH ROW FOR TESTING & INTEGRATION */}
                {testingCategory && (
                    <div
                        className="border-t-[0.5px] flex flex-col pt-3 mt-[2rem]"
                        style={{ borderColor: 'var(--border-default)' }}
                        role="group"
                        aria-label={testingCategory.category}
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-[8px] pb-3 border-b-[0.5px]" style={{ borderColor: 'var(--border-subtle)' }}>
                            <span className="font-mono text-[12px] font-bold" style={{ color: 'var(--accent-green)' }}>
                                {testingCategory.glyph}
                            </span>
                            <span className="font-sans text-[13px] font-[600]" style={{ color: 'var(--text-primary)' }}>
                                {testingCategory.category}
                            </span>
                        </div>

                        {/* Skill Items (horizontal 3-column row) */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2.5 pt-3">
                            {testingCategory.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-1.5 py-1 px-1.5 rounded transition-all duration-150 ease hover:bg-[var(--bg-surface)]"
                                    style={{ opacity: 0.9 }}
                                    title={item.tooltip}
                                >
                                    <span className="w-1 h-1 rounded-full shrink-0 bg-[var(--text-muted)]" />
                                    <span
                                        className="font-mono text-[11px] sm:text-[11.5px] font-[400] group-hover:text-[var(--text-primary)] transition-colors duration-150 ease"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
