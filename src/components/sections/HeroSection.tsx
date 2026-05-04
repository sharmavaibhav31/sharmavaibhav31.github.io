// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';
import skillsData from '../../data/skills.json';
import projectsData from '../../data/projects.json';

export const HeroSection: React.FC = () => {
    const specialization = resumeData.tagline;
    
    const primaryStack = skillsData.capabilities
        .find(c => c.category === 'Backend Engineering')
        ?.items.slice(0, 5).map(i => i.name).join(' · ') || 'Java · Spring Boot · PostgreSQL · Docker';

    return (
        <section id="hero" className="w-full min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
            {/* DOCUMENT HEADER BAR */}
            <div className="w-full h-[36px] border-y-[0.5px] px-8 flex justify-between items-center z-10 shrink-0"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
                <div className="font-mono text-[11.5px] tracking-[0.22em]" style={{ color: 'var(--text-muted)' }}>
                    PERSONNEL FILE
                </div>
                <div className="font-mono text-[10.5px] font-bold tracking-[0.2em] -rotate-[1.5deg] inline-block border px-[10px] py-[2px]"
                    style={{ color: 'var(--accent-red)', borderColor: 'var(--accent-red-border)' }}>
                    ACTIVE
                </div>
            </div>

            {/* HERO BODY */}
            <div className="flex flex-col lg:flex-row flex-1">
                {/* LEFT COLUMN */}
                <div className="w-full lg:w-[65%] flex flex-col justify-center min-h-[calc(100vh-84px)] p-[3.5rem_3.5rem_3.5rem_3rem]">
                    
                    {/* Top section */}
                    <div>
                        <div className="font-mono text-[11px] tracking-[0.2em] mb-[0.5rem]" style={{ color: 'var(--text-muted)' }}>
                            // PERSONNEL FILE
                        </div>
                        <h1 className="font-sans text-[49px] lg:text-[73px] font-black leading-[0.88] tracking-[-2px] uppercase mb-2" style={{ color: 'var(--text-primary)' }}>
                            {resumeData.name.split(' ').map((n, i) => <React.Fragment key={i}>{n}<br className="hidden sm:block" /></React.Fragment>)}
                        </h1>
                        <div className="font-mono text-[11px] tracking-[0.16em] mb-[2.5rem] uppercase" style={{ color: 'var(--text-muted)' }}>
                            {resumeData.title}
                        </div>
                    </div>

                    {/* Middle section — FIELD ROWS */}
                    <div className="flex flex-col">
                        {[
                            { key: 'SPECIALIZATION', val: specialization },
                            { key: 'PRIMARY STACK',  val: primaryStack },
                            { key: 'CLEARANCE',      val: 'Java · C · Python · seccomp · llama.cpp' },
                            { key: 'SYSTEMS BUILT',  val: `${projectsData.length} active` },
                            { key: 'USERS SERVED',   val: '8,000+' },
                        ].map(row => (
                            <div key={row.key} className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] gap-[1.5rem]"
                                style={{ borderColor: 'var(--border-default)' }}>
                                <span className="min-w-[140px] shrink-0 font-mono text-[11.5px] tracking-[0.14em] uppercase"
                                    style={{ color: 'var(--text-muted)' }}>{row.key}</span>
                                <span className="font-mono text-[13.5px] leading-[1.6]"
                                    style={{ color: 'var(--text-secondary)' }}>{row.val}</span>
                            </div>
                        ))}

                        {/* LOCATION — redacted */}
                        <div className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] gap-[1.5rem]"
                            style={{ borderColor: 'var(--border-default)' }}>
                            <span className="min-w-[140px] shrink-0 font-mono text-[11.5px] tracking-[0.14em] uppercase"
                                style={{ color: 'var(--text-muted)' }}>LOCATION</span>
                            <span
                                className="font-mono text-[13.5px] leading-[1.6] select-none cursor-pointer px-[4px] py-[1px] min-w-[140px] inline-block transition-all duration-250"
                                style={{ background: 'var(--border-default)', color: 'transparent' }}
                                title="hover to reveal"
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'var(--border-default)';
                                    e.currentTarget.style.color = 'transparent';
                                }}
                            >Bengaluru, India</span>
                        </div>

                        {/* CONTACT — redacted */}
                        <div className="flex flex-row items-baseline pt-[9px] pb-[9px] border-b-[0.5px] gap-[1.5rem]"
                            style={{ borderColor: 'var(--border-default)' }}>
                            <span className="min-w-[140px] shrink-0 font-mono text-[11.5px] tracking-[0.14em] uppercase"
                                style={{ color: 'var(--text-muted)' }}>CONTACT</span>
                            <span
                                className="font-mono text-[13.5px] leading-[1.6] select-none cursor-pointer px-[4px] py-[1px] min-w-[140px] inline-block transition-all duration-250"
                                style={{ background: 'var(--border-default)', color: 'transparent' }}
                                title="hover to reveal"
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'var(--border-default)';
                                    e.currentTarget.style.color = 'transparent';
                                }}
                            >{resumeData.socials.email.replace('mailto:', '')}</span>
                        </div>

                        {/* STATUS */}
                        <div className="flex flex-row items-center pt-[9px] pb-[9px] border-b-[0.5px] gap-[1.5rem]"
                            style={{ borderColor: 'var(--border-default)' }}>
                            <span className="min-w-[140px] shrink-0 font-mono text-[11.5px] tracking-[0.14em] uppercase"
                                style={{ color: 'var(--text-muted)' }}>STATUS</span>
                            <div className="flex items-center">
                                <div className="w-[6px] h-[6px] rounded-full animate-pulse-dot mr-2 shrink-0"
                                    style={{ background: 'var(--accent-green)' }}></div>
                                <span className="font-mono text-[11px] tracking-[0.12em]"
                                    style={{ color: 'var(--accent-green)' }}>ACTIVE — AVAILABLE</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom section — buttons */}
                    <div className="flex flex-row gap-4 mt-[2.5rem]">
                        <a href="#work"
                            className="font-mono text-[11px] tracking-[0.08em] uppercase border-[0.5px] px-[22px] py-[9px] transition-all duration-150 rounded-none"
                            style={{ background: 'var(--accent-red-bg)', color: 'var(--accent-red)', borderColor: 'var(--accent-red-border)' }}>
                            VIEW PROJECTS
                        </a>
                        <a href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`} target="_blank" rel="noopener noreferrer"
                            className="font-mono text-[11px] tracking-[0.08em] uppercase bg-transparent border-[0.5px] px-[22px] py-[9px] transition-all duration-150 rounded-none"
                            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-default)' }}>
                            DOWNLOAD RESUME
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="group relative w-full lg:w-[35%] border-t-[0.5px] lg:border-t-0 lg:border-l-[0.5px] min-h-[300px] lg:min-h-[calc(100vh-84px)] p-[3rem_2.5rem] flex flex-col items-center justify-center"
                    style={{ background: 'var(--bg-raised)', borderColor: 'var(--border-default)' }}>
                    
                    <div className="relative w-full flex flex-col items-center justify-center">
                        
                        {/* Actual Photo — fades in on hover */}
                        <div className="flex flex-col items-center justify-center w-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out z-20">
                            <img 
                                src={`${import.meta.env.BASE_URL}vaibhav_sharma.png`} 
                                alt="Vaibhav Sharma" 
                                className="w-full h-auto max-h-[75vh] object-cover object-top block border-[0.5px]"
                                style={{ borderColor: 'var(--border-default)' }}
                            />
                            <div className="text-center mt-[10px] text-[10px] font-mono tracking-[0.14em]"
                                style={{ color: 'var(--text-muted)' }}>
                                // IDENTITY CONFIRMED
                            </div>
                        </div>

                        {/* Placeholder — fades out on hover */}
                        <div className="absolute inset-0 flex flex-col items-center transition-opacity duration-400 ease-in-out group-hover:opacity-0 z-10 pb-[22px]">
                            <div className="relative w-full h-full border-[0.5px] flex flex-col items-center justify-center p-1"
                                style={{ borderColor: 'var(--border-default)' }}>
                                <div className="absolute inset-1" style={{ background: 'var(--border-subtle)' }}></div>
                                
                                {/* Corner Markers */}
                                {[
                                    '-top-[1px] -left-[1px] border-t-[1px] border-l-[1px]',
                                    '-top-[1px] -right-[1px] border-t-[1px] border-r-[1px]',
                                    '-bottom-[1px] -left-[1px] border-b-[1px] border-l-[1px]',
                                    '-bottom-[1px] -right-[1px] border-b-[1px] border-r-[1px]',
                                ].map((pos, i) => (
                                    <div key={i} className={`absolute ${pos} w-[10px] h-[10px] z-20`}
                                        style={{ borderColor: 'var(--text-muted)' }}></div>
                                ))}

                                <div className="relative z-10 flex flex-col items-center">
                                    <span className="font-mono text-[9px] tracking-[0.2em]"
                                        style={{ color: 'var(--text-muted)' }}>PHOTO</span>
                                    <span className="font-mono text-[9px] tracking-[0.2em] mt-1"
                                        style={{ color: 'var(--accent-red)' }}>REDACTED</span>
                                </div>
                            </div>
                            <div className="absolute bottom-[-18px] font-mono text-[12px] tracking-[0.1em]"
                                style={{ color: 'var(--text-muted)' }}>
                                VS.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
