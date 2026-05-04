// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React from 'react';
import certData from '../../data/certifications.json';

export const CertificationsSection: React.FC = () => {
    const allCerts = certData.flatMap(group => group.items);
    
    const sortedCerts = [...allCerts].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (!isNaN(dateA) && !isNaN(dateB)) return dateB - dateA;
        return 0;
    });

    return (
        <section id="certifications" className="w-full flex flex-col pt-0" style={{ background: 'var(--bg-primary)' }}>
            {/* SECTION HEADER BAR */}
            <div className="w-full h-[36px] border-y-[0.5px] px-4 md:px-8 flex justify-between items-center shrink-0"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>
                    CREDENTIALS VERIFIED
                </div>
                <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {sortedCerts.length} credentials
                </div>
            </div>

            {/* CONTENT */}
            <div className="w-full flex flex-col">
                {sortedCerts.map((cert, i) => (
                    <a 
                        key={i}
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-[12px_2rem] border-b-[0.5px] transition-colors duration-150 grid grid-cols-1 sm:grid-cols-[1fr_180px_100px] items-center gap-2 sm:gap-0"
                        style={{ borderColor: 'var(--border-subtle)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                        {/* Left: Name & Issuer */}
                        <div className="flex flex-col">
                            <span className="font-sans text-[13px] font-semibold mb-[2px]"
                                style={{ color: 'var(--text-primary)' }}>
                                {cert.title}
                            </span>
                            <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                                {cert.issuer}
                            </span>
                        </div>
                        
                        {/* Middle: Date */}
                        <div className="font-mono text-[11px] sm:text-center" style={{ color: 'var(--text-muted)' }}>
                            {cert.date}
                        </div>
                        
                        {/* Right: Badge */}
                        <div className="flex justify-start sm:justify-end">
                            <span className="font-mono text-[9px] tracking-[0.14em] font-bold border-[0.5px] px-[8px] py-[2px] text-center"
                                style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green-border)' }}>
                                VERIFIED
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};
