// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';

const paragraphs = (resumeData as any).about?.paragraphs || [resumeData.philosophy, resumeData.summary].filter(Boolean);
const hobbies = (resumeData as any).hobbies || ["Systems Architecture", "Low-level Programming", "Open Source Contribution", "Cybersecurity Research"];

export const AboutSection: React.FC = () => (
    <section id="about" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
        {/* SECTION HEADER BAR */}
        <div className="w-full h-[36px] border-y-[0.5px] px-4 md:px-8 flex justify-between items-center shrink-0"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] font-medium" style={{ color: 'var(--text-muted)' }}>
                OPERATIVE PROFILE
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] font-bold"
                style={{ color: 'var(--accent-green)' }}>
                CLEARANCE: LEVEL 5
            </div>
        </div>

        {/* CONTENT */}
        <div className="w-full px-4 md:px-8 py-[3rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem]">
                
                {/* Left Column - Philosophy/Paragraphs */}
                <div className="flex flex-col gap-[1.5rem]">
                    <div className="font-mono text-[9px] tracking-[0.14em] mb-[4px]" style={{ color: 'var(--text-muted)' }}>
                        STATEMENT_OF_INTENT
                    </div>
                    {paragraphs.map((para: string, i: number) => (
                        <div key={i} className="font-mono text-[14px] leading-[1.8]"
                            style={{ color: 'var(--text-secondary)' }}>
                            {i === 0 && (
                                <span className="mr-2" style={{ color: 'var(--accent-green)' }}>{'>'}</span>
                            )}
                            {para}
                        </div>
                    ))}
                </div>

                {/* Right Column - Off-duty / Hobbies */}
                <div className="flex flex-col">
                    <div className="font-mono text-[9px] tracking-[0.14em] mb-[1.5rem]" style={{ color: 'var(--text-muted)' }}>
                        OFF_DUTY_LOGS
                    </div>
                    <div className="flex flex-col">
                        {hobbies.map((hobby: string, i: number) => (
                            <div key={i} className="flex items-center gap-[10px] mb-[12px]">
                                <span className="w-[3px] h-[3px] rounded-full shrink-0"
                                    style={{ background: 'var(--accent-red)' }}></span>
                                <span className="font-mono text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                                    {hobby}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="mt-[2rem] pt-[1.5rem] border-t-[0.5px] flex flex-wrap gap-[1rem]"
                        style={{ borderColor: 'var(--border-default)' }}>
                        {[
                            { label: '[EMAIL]', href: resumeData.socials.email },
                            { label: '[GITHUB]', href: resumeData.socials.github, external: true },
                            { label: '[LINKEDIN]', href: resumeData.socials.linkedin, external: true },
                        ].map(link => (
                            <a 
                                key={link.label}
                                href={link.href}
                                target={link.external ? '_blank' : undefined}
                                rel={link.external ? 'noopener noreferrer' : undefined}
                                className="font-mono text-[11px] transition-colors"
                                style={{ color: 'var(--text-muted)' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </section>
);
