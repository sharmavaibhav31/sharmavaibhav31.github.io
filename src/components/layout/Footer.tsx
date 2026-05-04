// Theme: Redacted × Kernel/Log hybrid — CSS variables for light/dark support
// Data: untouched — presentation layer only

import React from 'react';
import resumeData from '../../data/resume.json';

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    
    return (
        <footer className="w-full h-[48px] border-t-[0.5px] px-4 md:px-8 flex items-center justify-between mt-auto"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            
            {/* Left: System log end */}
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase"
                style={{ color: 'var(--text-muted)' }}>
                © {year} VAIBHAV SHARMA. SYSTEM_LOG_END.
            </div>

            {/* Right: Social Links */}
            <div className="flex items-center gap-[1rem]">
                {[
                    { label: '[GITHUB]', href: resumeData.socials.github, external: true },
                    { label: '[LINKEDIN]', href: resumeData.socials.linkedin, external: true },
                    { label: '[EMAIL]', href: resumeData.socials.email },
                ].map(link => (
                    <a
                        key={link.label}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="font-mono text-[10px] tracking-[0.12em] transition-colors duration-150"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
            
        </footer>
    );
};
