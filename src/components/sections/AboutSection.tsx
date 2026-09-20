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
                style={{ borderColor: 'var(--border-subtle)' }}
            >
                {/* LEFT COLUMN — main narrative */}
                <div 
                    className="p-[20px_16px] sm:p-[28px_24px_28px_28px] border-b-[0.5px] lg:border-b-0 lg:border-r-[0.5px]"
                    style={{ borderColor: 'var(--border-subtle)' }}
                >
                    {/* ORIGIN BLOCK */}
                    <div 
                        className="mb-[24px] pb-[24px] border-b-[0.5px]"
                        style={{ borderColor: 'var(--border-subtle)' }}
                    >
                        <div 
                            className="font-mono text-[9px] tracking-[0.16em] mb-[10px]"
                            style={{ color: 'var(--accent-orange)' }}
                        >
                            // ORIGIN
                        </div>
                        <div 
                            className="font-sans text-[13px] sm:text-[14px] leading-[1.8] flex flex-col gap-[10px]"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <p className="m-0 font-[600]" style={{ color: 'var(--text-primary)' }}>
                                I didn't start as a backend engineer.
                            </p>
                            <p className="m-0">
                                My first year pulled me toward cybersecurity — Kali, ethical hacking, and security fundamentals. Interesting, but I wanted to build more than I was studying.
                            </p>
                            <p className="m-0">
                                I moved into mobile development, shipped code to a production app, and realized I was more interested in the systems behind the product than the product itself: APIs, data, reliability, and the decisions that make software work at scale.
                            </p>
                            <p className="m-0">
                                That curiosity eventually pulled me toward backend engineering.
                            </p>
                        </div>
                    </div>

                    {/* CURRENT BLOCK */}
                    <div className="mb-0">
                        <div 
                            className="font-mono text-[9px] tracking-[0.16em] mb-[10px]"
                            style={{ color: 'var(--accent-green)' }}
                        >
                            // CURRENT
                        </div>
                        <div 
                            className="font-sans text-[12px] sm:text-[13px] leading-[1.8] flex flex-col gap-[10px]"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <p className="m-0">
                                Backend engineering clicked because it forced me to think about tradeoffs, constraints, failure modes, state, and system boundaries.
                            </p>
                            <p className="m-0">
                                Currently a Backend Engineer Intern at LazyStudents.in, building Lazy Command — an AI orchestration layer that translates natural-language requests into actions across 100+ platform tools.
                            </p>
                            <p className="m-0">
                                Outside work, I maintain Arachnode, an open-source job discovery and outreach system with contributors across multiple open-source programs.
                            </p>
                            <p className="m-0">
                                My interest in security never disappeared; it now shows up in the systems I build, from vulnerability research to projects like a C-based local AI shell using Seccomp sandboxing and Linux isolation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN — data sidebar */}
                <div 
                    className="p-[20px_16px] bg-[var(--bg-surface)] flex flex-col sm:flex-row lg:flex-col gap-[20px]"
                >
                    {/* BLOCK 1 — EXPERIENCE */}
                    <div className="flex flex-col sm:flex-1 lg:flex-none">
                        <div 
                            className="font-mono text-[9px] tracking-[0.14em] mb-[10px]"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            EXPERIENCE
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <div>
                                <div 
                                    className="text-[18px] font-medium leading-[1.1] mb-[2px]"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    7+ Months
                                </div>
                                <div 
                                    className="font-mono text-[9.5px] leading-[1.3]"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    Total Industry Experience (Internships)
                                </div>
                            </div>

                            <div>
                                <div 
                                    className="text-[18px] font-medium leading-[1.1] mb-[2px]"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    5+ Months
                                </div>
                                <div 
                                    className="font-mono text-[9.5px] leading-[1.3]"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    Open Source Leadership
                                </div>
                            </div>

                            <div>
                                <div 
                                    className="text-[18px] font-medium leading-[1.1] mb-[2px]"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    9+ Projects
                                </div>
                                <div 
                                    className="font-mono text-[9.5px] leading-[1.3]"
                                    style={{ color: 'var(--text-muted)' }}
                                >
                                    Built & Shipped
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BLOCK 2 — LOOKING FOR */}
                    <div className="flex flex-col sm:flex-1 lg:flex-none">
                        <div 
                            className="font-mono text-[9px] tracking-[0.14em] mb-[8px]"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            LOOKING FOR
                        </div>
                        <div className="flex flex-col items-start gap-[3px]">
                            {["SDE-1", "Backend / Infra", "Startups / Scale", "Full-time"].map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-[10px] px-[8px] py-[4px] border-[0.5px]"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        borderColor: 'var(--border-default)',
                                        background: 'var(--bg-raised)'
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
                            style={{ color: 'var(--text-muted)' }}
                        >
                            STATUS
                        </div>
                        <div 
                            className="text-[13px] font-mono mb-[2px]"
                            style={{ color: 'var(--accent-green)' }}
                        >
                            ● ACTIVE
                        </div>
                        <div 
                            className="font-mono text-[10px]"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Graduating Jun 2027
                        </div>
                    </div>
                </div>
            </div>

            {/* DIRECTIVE BAR — full width below grid */}
            <div 
                className="w-full p-[16px_16px] sm:p-[18px_28px] border-t-[0.5px] flex flex-col sm:flex-row items-start gap-[10px] sm:gap-[14px]"
                style={{ borderColor: 'var(--border-subtle)' }}
            >
                <span 
                    className="font-mono text-[9px] tracking-[0.1em] shrink-0 mt-[2px] px-[7px] py-[2px] border-[0.5px]"
                    style={{
                        color: 'var(--accent-red)',
                        borderColor: 'var(--accent-red-border)',
                        background: 'var(--accent-red-bg)'
                    }}
                >
                    [DIRECTIVE]
                </span>
                <div 
                    className="font-sans text-[11.5px] sm:text-[12px] leading-[1.75] flex flex-col gap-[6px]"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <p className="m-0 font-[600]" style={{ color: 'var(--text-primary)' }}>
                        Building toward backend infrastructure where reliability, scalability, and security are first-class concerns.
                    </p>
                    <p className="m-0">
                        <span className="font-mono text-[10.5px] font-[600]" style={{ color: 'var(--accent-green)' }}>Near-term:</span> become a backend engineer capable of owning services end-to-end — from API design and data modeling to deployment, observability, and incident response.
                    </p>
                    <p className="m-0">
                        <span className="font-mono text-[10.5px] font-[600]" style={{ color: 'var(--accent-orange)' }}>Long-term:</span> work on distributed systems, data-intensive platforms, and secure architectures operating at meaningful scale, while continuing to deepen my understanding of cybersecurity and system security.
                    </p>
                </div>
            </div>
        </section>
    );
};
