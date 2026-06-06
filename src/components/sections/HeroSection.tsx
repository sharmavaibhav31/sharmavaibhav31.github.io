// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React, { useState } from 'react';
import resumeData from '../../data/resume.json';
import skillsData from '../../data/skills.json';
import projectsData from '../../data/projects.json';

export const HeroSection: React.FC = () => {
    const [isPhotoRevealed, setIsPhotoRevealed] = useState(false);
    const [isLocationRevealed, setIsLocationRevealed] = useState(false);
    const [isContactRevealed, setIsContactRevealed] = useState(false);

    const specialization = resumeData.tagline;
    
    const primaryStack = skillsData.capabilities
        .find(c => c.category === 'Backend Engineering')
        ?.items.slice(0, 5).map(i => i.name).join(' · ') || 'Java · Spring Boot · PostgreSQL · Docker';

    return (
        <section id="hero" className="w-full min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
            {/* DOCUMENT HEADER BAR */}
            <div className="w-full h-[36px] border-y-[0.5px] px-4 sm:px-8 flex justify-between items-center z-10 shrink-0"
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
            <div className="flex flex-col sm:flex-row flex-1">
                {/* LEFT COLUMN */}
                <div className="w-full sm:w-[55%] lg:w-[65%] flex flex-col justify-center min-h-[calc(100vh-84px)] p-[20px_16px] sm:p-[3.5rem_3.5rem_3.5rem_3rem]">
                    
                    {/* Top section */}
                    <div>
                        <div className="font-mono text-[10px] tracking-[0.2em] mb-[0.5rem]" style={{ color: '#6a6a6a' }}>
                            // PERSONNEL FILE
                        </div>
                        <h1 className="font-sans text-[48px] sm:text-[56px] lg:text-[73px] font-black leading-[0.88] tracking-[-1.5px] sm:tracking-[-2px] uppercase mb-[6px] sm:mb-2" style={{ color: 'var(--text-primary)' }}>
                            {resumeData.name.split(' ').map((n, i) => <React.Fragment key={i}>{n}<br className="hidden sm:block" /></React.Fragment>)}
                        </h1>
                        <div className="font-mono text-[10.5px] tracking-[0.16em] mb-[1.5rem] sm:mb-[2.5rem] uppercase" style={{ color: 'var(--text-muted)' }}>
                            {resumeData.title}
                        </div>
                    </div>

                    {/* MOBILE PHOTO BLOCK */}
                    <div 
                        className="sm:hidden w-full aspect-[4/3] relative overflow-hidden my-[16px] cursor-pointer"
                        style={{ background: '#1a1a1a', border: '0.5px solid rgba(255,255,255,0.08)' }}
                        onClick={() => setIsPhotoRevealed(!isPhotoRevealed)}
                    >
                        {/* Tapped State: Image */}
                        <div 
                            className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-opacity duration-[350ms] ease-in-out"
                            style={{ opacity: isPhotoRevealed ? 1 : 0, pointerEvents: isPhotoRevealed ? 'auto' : 'none' }}
                        >
                            <img 
                                src={`${import.meta.env.BASE_URL}vaibhav_sharma.png`} 
                                alt="Vaibhav Sharma" 
                                className="w-full h-full object-cover object-top block"
                            />
                            <div 
                                className="absolute bottom-[10px] left-[10px] text-[9px] font-mono tracking-[0.14em]"
                                style={{ color: '#6a6a6a' }}
                            >
                                // IDENTITY CONFIRMED
                            </div>
                        </div>

                        {/* Default State: Placeholder */}
                        <div 
                            className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-opacity duration-[350ms] ease-in-out"
                            style={{ opacity: isPhotoRevealed ? 0 : 1, pointerEvents: isPhotoRevealed ? 'none' : 'auto' }}
                        >
                            {/* Corner Markers */}
                            {[
                                'top-0 left-0 border-t-[0.5px] border-l-[0.5px]',
                                'top-0 right-0 border-t-[0.5px] border-r-[0.5px]',
                                'bottom-0 left-0 border-b-[0.5px] border-l-[0.5px]',
                                'bottom-0 right-0 border-b-[0.5px] border-r-[0.5px]',
                            ].map((pos, i) => (
                                <div key={i} className={`absolute ${pos} w-[10px] h-[10px] z-20`}
                                    style={{ borderColor: 'rgba(255,255,255,0.15)' }}></div>
                            ))}

                            <span className="font-mono text-[9px] tracking-[0.2em]"
                                style={{ color: 'rgba(255,255,255,0.15)' }}>PHOTO</span>
                            <span className="font-mono text-[9px] tracking-[0.2em] mt-[4px]"
                                style={{ color: 'rgba(255,80,80,0.45)' }}>REDACTED</span>
                            <span className="font-mono text-[9px] mt-[8px] italic"
                                style={{ color: 'rgba(255,255,255,0.2)' }}>tap to reveal</span>
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
                            <div key={row.key} className="flex flex-row items-baseline py-[8px] sm:py-[9px] border-b-[0.5px] gap-[1.5rem]"
                                style={{ borderColor: 'var(--border-default)' }}>
                                <span className="min-w-[90px] sm:min-w-[110px] lg:min-w-[140px] shrink-0 font-mono text-[10.5px] font-medium tracking-[0.13em] uppercase"
                                    style={{ color: 'var(--text-muted)' }}>{row.key}</span>
                                <span className="font-mono text-[11px] sm:text-[11.5px] lg:text-[12.5px] font-normal leading-[1.6]"
                                    style={{ color: 'var(--text-secondary)' }}>{row.val}</span>
                            </div>
                        ))}

                        {/* LOCATION — redacted */}
                        <div className="flex flex-row items-baseline py-[8px] sm:py-[9px] border-b-[0.5px] gap-[1.5rem]"
                            style={{ borderColor: 'var(--border-default)' }}>
                            <span className="min-w-[90px] sm:min-w-[110px] lg:min-w-[140px] shrink-0 font-mono text-[10.5px] font-medium tracking-[0.13em] uppercase"
                                style={{ color: 'var(--text-muted)' }}>LOCATION</span>
                            <div className="flex flex-col">
                                <span
                                    className="font-mono text-[11px] sm:text-[11.5px] lg:text-[12.5px] font-normal leading-[1.6] select-none cursor-pointer px-[4px] py-[1px] min-w-[140px] inline-block transition-all duration-250"
                                    style={{ 
                                        background: isLocationRevealed ? 'transparent' : 'var(--border-default)', 
                                        color: isLocationRevealed ? 'var(--text-secondary)' : 'transparent' 
                                    }}
                                    onClick={() => setIsLocationRevealed(!isLocationRevealed)}
                                >Bengaluru, India</span>
                                <span className="sm:hidden font-mono text-[8px] italic mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>tap to reveal</span>
                            </div>
                        </div>

                        {/* CONTACT — redacted */}
                        <div className="flex flex-row items-baseline py-[8px] sm:py-[9px] border-b-[0.5px] gap-[1.5rem]"
                            style={{ borderColor: 'var(--border-default)' }}>
                            <span className="min-w-[90px] sm:min-w-[110px] lg:min-w-[140px] shrink-0 font-mono text-[10.5px] font-medium tracking-[0.13em] uppercase"
                                style={{ color: 'var(--text-muted)' }}>CONTACT</span>
                            <div className="flex flex-col">
                                <span
                                    className="font-mono text-[11px] sm:text-[11.5px] lg:text-[12.5px] font-normal leading-[1.6] select-none cursor-pointer px-[4px] py-[1px] min-w-[140px] inline-block transition-all duration-250"
                                    style={{ 
                                        background: isContactRevealed ? 'transparent' : 'var(--border-default)', 
                                        color: isContactRevealed ? 'var(--text-secondary)' : 'transparent' 
                                    }}
                                    onClick={() => setIsContactRevealed(!isContactRevealed)}
                                >{resumeData.socials.email.replace('mailto:', '')}</span>
                                <span className="sm:hidden font-mono text-[8px] italic mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>tap to reveal</span>
                            </div>
                        </div>

                        {/* STATUS */}
                        <div className="flex flex-row items-center py-[8px] sm:py-[9px] border-b-[0.5px] gap-[1.5rem]"
                            style={{ borderColor: 'var(--border-default)' }}>
                            <span className="min-w-[90px] sm:min-w-[110px] lg:min-w-[140px] shrink-0 font-mono text-[10.5px] font-medium tracking-[0.13em] uppercase"
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
                    <div className="flex flex-row gap-2 sm:gap-4 mt-[2.5rem]">
                        <a href="#work"
                            className="flex-1 sm:flex-none text-center font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase border-[0.5px] px-[12px] sm:px-[22px] py-[10px] sm:py-[9px] transition-all duration-150 rounded-none hover:bg-[rgba(255,65,65,0.20)] hover:border-[rgba(255,65,65,0.70)] hover:text-[#ff8080]"
                            style={{ background: 'rgba(255, 65, 65, 0.12)', color: '#ff6b6b', borderColor: 'rgba(255, 65, 65, 0.45)' }}>
                            VIEW PROJECTS
                        </a>
                        <a href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`} target="_blank" rel="noopener noreferrer"
                            className="flex-1 sm:flex-none text-center font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.08em] uppercase bg-transparent border-[0.5px] px-[12px] sm:px-[22px] py-[10px] sm:py-[9px] transition-all duration-150 rounded-none hover:text-[#f5f5f5] hover:border-[rgba(255,255,255,0.50)]"
                            style={{ color: '#c8c8c8', borderColor: 'rgba(255, 255, 255, 0.25)' }}>
                            DOWNLOAD RESUME
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN (Tablet/Desktop) */}
                <div 
                    className="hidden sm:flex relative w-[45%] lg:w-[35%] border-l-[0.5px] min-h-[calc(100vh-84px)] p-[3rem_2.5rem] flex-col items-center justify-center cursor-pointer"
                    style={{ background: 'var(--bg-raised)', borderColor: 'var(--border-default)' }}
                    onClick={() => setIsPhotoRevealed(!isPhotoRevealed)}
                >
                    
                    <div className="relative w-full flex flex-col items-center justify-center">
                        
                        {/* Actual Photo */}
                        <div 
                            className="flex flex-col items-center justify-center w-full transition-opacity duration-[350ms] ease-in-out z-20"
                            style={{ opacity: isPhotoRevealed ? 1 : 0 }}
                        >
                            <img 
                                src={`${import.meta.env.BASE_URL}vaibhav_sharma.png`} 
                                alt="Vaibhav Sharma" 
                                className="w-full h-auto max-h-[75vh] object-cover object-top block border-[0.5px]"
                                style={{ borderColor: 'var(--border-default)' }}
                            />
                            <div className="text-center mt-[10px] text-[9px] font-mono tracking-[0.14em]"
                                style={{ color: '#6a6a6a' }}>
                                // IDENTITY CONFIRMED
                            </div>
                        </div>

                        {/* Placeholder */}
                        <div 
                            className="absolute inset-0 flex flex-col items-center transition-opacity duration-[350ms] ease-in-out z-10 pb-[22px]"
                            style={{ opacity: isPhotoRevealed ? 0 : 1 }}
                        >
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

