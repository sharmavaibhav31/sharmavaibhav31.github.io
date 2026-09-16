// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';

const infoText = "Backend and systems engineering student specializing in event-driven microservices, enterprise workflow backends, and secure Linux-level programming. Founding Backend Intern at LazyStudents.in, building Lazy Command — an AI orchestration layer routing natural language to 100+ platform tools. Open-sourced Arachnode (26 ★, 47 forks), a distributed job-discovery platform, and served as Project Admin mentoring GSSoC 2026 contributors. Graduating 2027. Open to SDE-1 and Junior Backend Engineer roles.";

const philosophyText = resumeData.philosophy;

export const AboutSection: React.FC = () => (
    <section id="about" aria-label="About" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
        {/* SECTION HEADER BAR */}
        <div className="w-full h-[36px] border-y-[0.5px] px-[16px] sm:px-8 flex justify-between items-center shrink-0"
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
        <div className="w-full px-[16px] sm:px-8 py-[2rem] sm:py-[3rem]">
            <div className="max-w-[720px] mx-auto flex flex-col gap-[1.8rem]">
                
                {/* [INFO] Block */}
                <div className="flex flex-col gap-[0.5rem]">
                    <div className="font-mono text-[9px] tracking-[0.14em] mb-[4px]" style={{ color: 'var(--text-muted)' }}>
                        STATEMENT_OF_INTENT
                    </div>
                    <div className="font-mono text-[13.5px] sm:text-[14px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                        <span className="mr-2" style={{ color: 'var(--accent-green)' }}>{'>'}</span>
                        {infoText}
                    </div>
                </div>

                {/* [PHILOSOPHY] Block */}
                <div className="flex flex-col gap-[0.5rem]">
                    <div className="font-mono text-[9px] tracking-[0.14em] mb-[4px]" style={{ color: 'var(--text-muted)' }}>
                        PHILOSOPHY
                    </div>
                    <div className="font-mono text-[13.5px] sm:text-[14px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                        <span className="mr-2" style={{ color: 'var(--accent-green)' }}>{'>'}</span>
                        {philosophyText}
                    </div>
                </div>

            </div>
        </div>
    </section>
);
