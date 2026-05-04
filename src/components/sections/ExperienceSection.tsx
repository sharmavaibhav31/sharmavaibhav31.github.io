// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';

export const ExperienceSection: React.FC = () => (
    <section id="experience" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
        {/* SECTION HEADER BAR */}
        <div className="w-full h-[36px] border-y-[0.5px] px-4 md:px-8 flex justify-between items-center shrink-0"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                DEPLOYMENT HISTORY
            </div>
            <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
                {resumeData.experience.length} entries
            </div>
        </div>

        {/* CONTENT */}
        <div className="w-full px-4 md:px-8 py-[2rem]">
            {resumeData.experience.map((exp, i) => (
                <div key={i}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                        {/* Left Column - Date */}
                        <div className="w-full sm:w-[90px] lg:w-[140px] shrink-0 font-mono text-[10px] tracking-[0.06em] leading-[1.6]"
                            style={{ color: 'var(--text-muted)' }}>
                            {exp.period}
                        </div>

                        {/* Right Column - Details */}
                        <div className="flex flex-col flex-1">
                            <h3 className="font-sans text-[15px] font-bold mb-[2px]" style={{ color: 'var(--text-primary)' }}>
                                {exp.role}
                            </h3>
                            <div className="font-mono text-[11px] mb-[10px]" style={{ color: 'var(--text-muted)' }}>
                                {exp.company}
                            </div>
                            
                            <div className="flex flex-col">
                                {exp.bullets.map((bullet, j) => (
                                    <div key={j} className="flex gap-[10px] items-start mb-[4px]">
                                        <span className="w-[3px] h-[3px] rounded-full shrink-0 mt-[7px]"
                                            style={{ background: 'var(--accent-green)' }}></span>
                                        <span className="font-mono text-[12px] leading-[1.7]"
                                            style={{ color: 'var(--text-secondary)' }}>
                                            {bullet}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Entry separator */}
                    {i !== resumeData.experience.length - 1 && (
                        <div className="w-full h-px border-b-[0.5px] my-[1.5rem]"
                            style={{ borderColor: 'var(--border-subtle)' }} />
                    )}
                </div>
            ))}
        </div>
    </section>
);
