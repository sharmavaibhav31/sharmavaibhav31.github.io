// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React from 'react';

const blocks = [
    {
        tag: '[ORIGIN]',
        tagColor: 'rgba(224, 92, 42, 0.85)',
        tagBg: 'rgba(224, 92, 42, 0.08)',
        tagBorder: 'rgba(224, 92, 42, 0.3)',
        text: "I didn't start as a backend engineer. First year pulled me toward cybersecurity — hands-on with Kali, ethical hacking, a few courses. Interesting, but I was consuming more than I was building. Then mobile development. Did an internship, shipped code to a real app. But I was only productive when someone told me exactly what to do. I couldn't design a system from scratch. That bothered me enough to change direction."
    },
    {
        tag: '[CURRENT]',
        tagColor: 'rgba(74, 222, 128, 0.85)',
        tagBg: 'rgba(74, 222, 128, 0.08)',
        tagBorder: 'rgba(74, 222, 128, 0.3)',
        text: "Backend engineering clicked because it required real thinking: tradeoffs, constraints, failure modes, state. Founding Backend Intern at LazyStudents.in. Open-sourced Arachnode — 26 ★, 47 forks, Project Admin for GSSoC 2026 and ELUSOC 2026. The security interest never left — my C shell with Seccomp sandboxing was me answering a question about running AI locally without exposing the system. Graduating 2027. Open to SDE-1 and Junior Backend Engineer roles."
    },
    {
        tag: '[DIRECTIVE]',
        tagColor: 'rgba(255, 80, 80, 0.85)',
        tagBg: 'rgba(255, 80, 80, 0.08)',
        tagBorder: 'rgba(255, 80, 80, 0.3)',
        text: "Want to work on backend infrastructure where reliability is the product — distributed systems, data pipelines, secure architectures. In 3–4 years: either a Senior Backend Engineer at a high-growth product company, or the person who helped a good startup go from 10 to 10 million requests a day. The cybersecurity interest is still live. An MS in Security is on the table."
    }
];

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
            <div className="max-w-[720px] mx-auto flex flex-col border-[0.5px] border-[rgba(255,255,255,0.08)]" style={{ background: 'var(--bg-surface)' }}>
                {blocks.map((block, i) => (
                    <div 
                        key={block.tag}
                        className={`flex gap-[12px] items-start p-[16px] ${i !== blocks.length - 1 ? 'border-b-[0.5px]' : ''}`}
                        style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                    >
                        <span 
                            className="font-mono text-[9.5px] sm:text-[10px] tracking-[0.14em] font-semibold shrink-0 uppercase px-[7px] py-[2px] mt-[1px]"
                            style={{
                                color: block.tagColor,
                                background: block.tagBg,
                                border: `0.5px solid ${block.tagBorder}`
                            }}
                        >
                            {block.tag}
                        </span>
                        <div className="font-sans text-[13px] sm:text-[13.5px] leading-[1.8]" style={{ color: '#c8c8c8' }}>
                            {block.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
