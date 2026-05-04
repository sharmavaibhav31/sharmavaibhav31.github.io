import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import resumeData from '../../data/resume.json';
import { ThemeToggle } from '../ui/theme-toggle';

const NAV_LINKS = [
    { label: 'WORK', href: '#work' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SKILLS', href: '#capabilities' },
    { label: 'ABOUT', href: '#about' },
];

const SOCIAL_LINKS = [
    { href: resumeData.socials.github, icon: <Github size={14} />, label: 'GitHub', external: true },
    { href: resumeData.socials.linkedin, icon: <Linkedin size={14} />, label: 'LinkedIn', external: true },
    { href: resumeData.socials.email, icon: <Mail size={14} />, label: 'Email', external: false },
];

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-[100] w-full h-[48px] border-b-[0.5px] px-4 md:px-8 flex items-center justify-between" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-default)' }}>
            
            {/* Left: Logo */}
            <div className="font-mono text-[16px] tracking-[0.1em] shrink-0">
                <span style={{ color: 'var(--text-muted)' }}>// SHARMA, </span>
                <span className="font-bold" style={{ color: 'var(--text-primary)' }}>VAIBHAV</span>
            </div>

            {/* Center: Nav links (Hidden on small screens) */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                {NAV_LINKS.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="font-mono text-[13px] tracking-[0.16em] uppercase transition-colors duration-150"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                        {link.label}
                    </a>
                ))}
            </nav>

            {/* Right: Icons + Resume + Theme */}
            <div className="flex items-center gap-4 shrink-0">
                <div className="hidden sm:flex items-center gap-3">
                    {SOCIAL_LINKS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target={s.external ? '_blank' : undefined}
                            rel={s.external ? 'noopener noreferrer' : undefined}
                            className="transition-colors duration-150"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                            aria-label={s.label}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>

                <a
                    href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] tracking-[0.12em] px-[14px] py-[5px] bg-transparent border-[0.5px] transition-all duration-150 uppercase"
                    style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-default)' }}
                    onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--accent-red)';
                        e.currentTarget.style.borderColor = 'var(--accent-red-border)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                    }}
                >
                    RESUME
                </a>

                {/* Theme Toggle */}
                <div className="flex items-center">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};
