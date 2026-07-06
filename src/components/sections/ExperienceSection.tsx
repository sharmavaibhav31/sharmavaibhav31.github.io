// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';

export const ExperienceSection: React.FC = () => (
    <section id="experience" aria-label="Experience" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
        {/* SECTION HEADER BAR */}
        <div className="w-full h-[36px] border-y-[0.5px] px-4 md:px-8 flex justify-between items-center shrink-0"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] font-medium" style={{ color: 'var(--text-muted)' }}>
                DEPLOYMENT HISTORY
            </div>
            <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
                {resumeData.experience.length} entries
            </div>
        </div>

        {/* CONTENT */}
        <div className="w-full px-[16px] sm:px-8 py-0 sm:py-[2rem]">
            {resumeData.experience.map((exp, i) => (
                <article 
                    key={i}
                    className={`py-[16px] sm:py-0 ${i !== resumeData.experience.length - 1 ? 'border-b-[0.5px] border-[rgba(255,255,255,0.05)] sm:border-none' : ''}`}
                >
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
                                {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                            </h4>
                            
                            <div className="flex flex-col">
                                {exp.bullets.map((bullet, j) => (
                                    <div key={j} className="flex gap-[8px] sm:gap-[10px] items-start mb-[4px]">
                                        <span className="w-[4px] sm:w-[3px] h-[4px] sm:h-[3px] rounded-full shrink-0 mt-[6px] sm:mt-[7px]"
                                            style={{ background: '#4ade80' }}></span>
                                        <span className="font-sans sm:font-mono text-[11px] sm:text-[12px] leading-[1.6] sm:leading-[1.7]"
                                            style={{ color: '#c8c8c8' }}>
                                            {bullet}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Entry separator - Desktop only */}
                    {i !== resumeData.experience.length - 1 && (
                        <div className="hidden sm:block w-full h-px border-b-[0.5px] mt-[1rem] mb-[2rem]"
                            style={{ borderColor: 'var(--border-subtle)' }} />
                    )}
                </article>
            ))}
        </div>
    </section>
);
