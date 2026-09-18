import React from 'react';

export const AboutSection: React.FC = () => {
    return (
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

            {/* MAIN LAYOUT — two columns */}
            <div 
                className="w-full grid grid-cols-1 lg:grid-cols-[1fr_200px] border-b-[0.5px]"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
                {/* LEFT COLUMN — main narrative */}
                <div 
                    className="p-[20px_16px] sm:p-[28px_24px_28px_28px] border-b-[0.5px] lg:border-b-0 lg:border-r-[0.5px]"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                    {/* ORIGIN BLOCK */}
                    <div 
                        className="mb-[24px] pb-[24px] border-b-[0.5px]"
                        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                        <div 
                            className="font-mono text-[9px] tracking-[0.16em] mb-[10px]"
                            style={{ color: 'rgba(224,92,42,0.8)' }}
                        >
                            // ORIGIN
                        </div>
                        <p 
                            className="font-sans text-[13px] sm:text-[14px] leading-[1.85]"
                            style={{ color: 'rgba(255,255,255,0.55)' }}
                        >
                            I didn't start as a backend engineer. First year pulled me toward cybersecurity — hands-on with Kali, ethical hacking, a few courses. Interesting, but I was consuming more than I was building. Then mobile development. Did an internship, shipped code to a real app. But I was only productive when someone told me exactly what to do.{' '}
                            <span style={{ color: '#f5f5f5', fontWeight: 500 }}>
                                I couldn't design a system from scratch. That bothered me enough to change direction.
                            </span>
                        </p>
                    </div>

                    {/* CURRENT BLOCK */}
                    <div className="mb-0">
                        <div 
                            className="font-mono text-[9px] tracking-[0.16em] mb-[10px]"
                            style={{ color: 'rgba(74,222,128,0.8)' }}
                        >
                            // CURRENT
                        </div>
                        <p 
                            className="font-sans text-[11px] sm:text-[12px] leading-[1.8]"
                            style={{ color: 'rgba(255,255,255,0.45)' }}
                        >
                            Backend engineering clicked because it required real thinking: tradeoffs, constraints, failure modes, state. Founding Backend Intern at LazyStudents.in — building Lazy Command, an AI orchestration layer routing natural language to 100+ platform tools. Open-sourced Arachnode. The security interest never left — my C shell with Seccomp sandboxing was me answering a question about running AI locally without exposing the system.
                        </p>
                    </div>
                </div>

                {/* RIGHT COLUMN — data sidebar */}
                <div 
                    className="p-[20px_16px] bg-[rgba(255,255,255,0.01)] flex flex-col sm:flex-row lg:flex-col gap-[20px]"
                >
                    {/* BLOCK 1 — OPEN SOURCE */}
                    <div className="flex flex-col sm:flex-1 lg:flex-none">
                        <div 
                            className="font-mono text-[9px] tracking-[0.14em] mb-[8px]"
                            style={{ color: 'rgba(255,255,255,0.25)' }}
                        >
                            OPEN SOURCE
                        </div>
                        <div 
                            className="text-[22px] font-medium mb-[2px]"
                            style={{ color: '#f5f5f5' }}
                        >
                            26 ★
                        </div>
                        <div 
                            className="font-mono text-[10px]"
                            style={{ color: 'rgba(255,255,255,0.25)' }}
                        >
                            arachnode · 47 forks
                        </div>
                    </div>

                    {/* BLOCK 2 — LOOKING FOR */}
                    <div className="flex flex-col sm:flex-1 lg:flex-none">
                        <div 
                            className="font-mono text-[9px] tracking-[0.14em] mb-[8px]"
                            style={{ color: 'rgba(255,255,255,0.25)' }}
                        >
                            LOOKING FOR
                        </div>
                        <div className="flex flex-col items-start gap-[3px]">
                            {["SDE-1", "Backend / Infra", "Startups / Scale", "Full-time"].map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-[10px] px-[8px] py-[4px] border-[0.5px]"
                                    style={{
                                        color: 'rgba(255,255,255,0.4)',
                                        borderColor: 'rgba(255,255,255,0.08)',
                                        background: 'rgba(255,255,255,0.02)'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* BLOCK 3 — STATUS */}
                    <div className="flex flex-col sm:flex-1 lg:flex-none">
                        <div 
                            className="font-mono text-[9px] tracking-[0.14em] mb-[8px]"
                            style={{ color: 'rgba(255,255,255,0.25)' }}
                        >
                            STATUS
                        </div>
                        <div 
                            className="text-[13px] font-mono mb-[2px]"
                            style={{ color: '#4ade80' }}
                        >
                            ● ACTIVE
                        </div>
                        <div 
                            className="font-mono text-[10px]"
                            style={{ color: 'rgba(255,255,255,0.25)' }}
                        >
                            Graduating Jun 2027
                        </div>
                    </div>
                </div>
            </div>

            {/* DIRECTIVE BAR — full width below grid */}
            <div 
                className="w-full p-[14px_16px] sm:p-[14px_28px] border-t-[0.5px] flex flex-col sm:flex-row items-start gap-[8px] sm:gap-[12px]"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
                <span 
                    className="font-mono text-[9px] tracking-[0.1em] shrink-0 mt-[2px] px-[7px] py-[2px] border-[0.5px]"
                    style={{
                        color: 'rgba(255,80,80,0.7)',
                        borderColor: 'rgba(255,80,80,0.25)',
                        background: 'rgba(255,80,80,0.06)'
                    }}
                >
                    [DIRECTIVE]
                </span>
                <p 
                    className="font-sans text-[11px] leading-[1.6]"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                    Want to work on backend infrastructure where reliability is the product — distributed systems, data pipelines, secure architectures. In 3–4 years: Senior Backend Engineer at a high-growth product company, or the person who helped a startup go from 10 to 10 million requests a day. MS in Security is on the table.
                </p>
            </div>
        </section>
    );
};
