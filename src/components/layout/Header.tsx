import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import resumeData from '../../data/resume.json';
import { ThemeToggle } from '../ui/theme-toggle';

const NAV_LINKS = [
    { label: 'WORK', href: '#work', isRoute: false },
    { label: 'EXPERIENCE', href: '#experience', isRoute: false },
    { label: 'SKILLS', href: '#capabilities', isRoute: false },
    { label: 'ABOUT', href: '#about', isRoute: false },
    { label: 'CV', href: '/cv', isRoute: true },
];

const SOCIAL_LINKS = [
    { href: resumeData.socials.github, icon: <Github size={14} />, label: 'GitHub', external: true },
    { href: resumeData.socials.linkedin, icon: <Linkedin size={14} />, label: 'LinkedIn', external: true },
    { href: resumeData.socials.email, icon: <Mail size={14} />, label: 'Email', external: false },
];

export const Header: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isDrawerOpen]);

    const handleLinkClick = (href: string) => {
        setIsDrawerOpen(false);
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <header className="sticky top-0 z-[100] w-full h-[48px] border-b-[0.5px] px-4 md:px-8 flex items-center justify-between" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-default)' }}>
                
                {/* Left: Logo */}
                <div className="font-mono text-[16px] tracking-[0.1em] shrink-0">
                    <span style={{ color: 'var(--text-muted)' }}>// SHARMA, </span>
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>VAIBHAV</span>
                </div>

                {/* Center: Nav links (Hidden on mobile/tablet) */}
                <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {NAV_LINKS.map((link) => (
                        link.isRoute ? (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="font-mono text-[13px] tracking-[0.16em] uppercase transition-colors duration-150"
                                style={{ color: 'var(--text-muted)' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                            >
                                {link.label}
                            </Link>
                        ) : (
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
                        )
                    ))}
                </nav>

                {/* Right: Icons + Resume + Theme + Hamburger */}
                <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden lg:flex items-center gap-3">
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

                    {/* Hamburger (Mobile/Tablet) */}
                    <div 
                        className="flex lg:hidden flex-col justify-between cursor-pointer w-[18px] h-[12px] ml-2"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <div style={{ width: '100%', height: '1.5px', background: 'rgba(255,255,255,0.7)' }}></div>
                        <div style={{ width: '100%', height: '1.5px', background: 'rgba(255,255,255,0.7)' }}></div>
                        <div style={{ width: '8px', height: '1.5px', background: 'rgba(255,255,255,0.7)' }}></div>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div 
                className="fixed top-0 right-0 w-[100vw] h-[100vh] z-[200] flex flex-col items-center justify-center"
                style={{
                    background: '#0d0d0d',
                    transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)'
                }}
                onClick={() => setIsDrawerOpen(false)}
            >
                {/* Close Button */}
                <button 
                    className="absolute top-[20px] right-[20px] cursor-pointer"
                    style={{ fontSize: '18px', color: 'rgba(255,255,255,0.4)' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsDrawerOpen(false);
                    }}
                >
                    ✕
                </button>

                {/* Drawer Content */}
                <div 
                    className="flex flex-col items-center w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Nav Links */}
                    <div className="flex flex-col w-[80%] max-w-[300px] text-center">
                        {NAV_LINKS.map((link) => (
                            link.isRoute ? (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="font-sans font-[700] block cursor-pointer transition-opacity active:opacity-70"
                                    style={{ 
                                        fontSize: '28px', 
                                        color: 'rgba(255,255,255,0.85)',
                                        letterSpacing: '-0.5px',
                                        padding: '16px 0',
                                        borderBottom: '0.5px solid rgba(255,255,255,0.06)'
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    key={link.label}
                                    onClick={() => handleLinkClick(link.href)}
                                    className="font-sans font-[700] block cursor-pointer transition-opacity active:opacity-70"
                                    style={{ 
                                        fontSize: '28px', 
                                        color: 'rgba(255,255,255,0.85)',
                                        letterSpacing: '-0.5px',
                                        padding: '16px 0',
                                        borderBottom: '0.5px solid rgba(255,255,255,0.06)'
                                    }}
                                >
                                    {link.label}
                                </a>
                            )
                        ))}
                    </div>

                    {/* Contact Row */}
                    <div 
                        className="flex justify-center"
                        style={{ 
                            marginTop: '2rem', 
                            gap: '1.5rem' 
                        }}
                    >
                        {SOCIAL_LINKS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target={s.external ? '_blank' : undefined}
                                rel={s.external ? 'noopener noreferrer' : undefined}
                                className="font-mono cursor-pointer transition-opacity active:opacity-70"
                                style={{ 
                                    fontSize: '11px',
                                    color: 'rgba(255,255,255,0.3)'
                                }}
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Tag */}
                <div 
                    className="absolute bottom-[40px] font-mono text-center w-full"
                    style={{
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.15)',
                        letterSpacing: '0.14em'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    // PERSONNEL FILE — ACTIVE
                </div>
            </div>
        </>
    );
};

