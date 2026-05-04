// Theme: Redacted × Kernel/Log — new branch
// Data source: resume.json — untouched

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';


export const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'WORK', href: '#work' },
        { label: 'EXPERIENCE', href: '#experience' },
        { label: 'SKILLS', href: '#skills' },
        { label: 'ABOUT', href: '#about' },
    ];

    return (
        <nav
            className="fixed top-0 left-0 w-full h-[48px] flex items-center justify-between px-4 lg:px-8 z-50 bg-bg-primary border-b-[0.5px] border-border-default"
            aria-label="Main navigation"
        >
            {/* Left: Logo */}
            <div className="font-mono text-sm tracking-widest whitespace-nowrap">
                <span className="text-text-muted">{'// '}</span>
                <span className="text-text-primary">SHARMA</span>
                <span className="text-text-muted">, VAIBHAV</span>
            </div>

            {/* Mobile hamburger */}
            <button
                className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
            >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Center: nav links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="text-[9px] font-mono tracking-[0.16em] text-text-muted hover:text-text-primary transition-colors duration-150"
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            {/* Right: RESUME button */}
            <div className="hidden lg:flex items-center">
                <a
                    href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-text-secondary px-4 py-1.5 border-[0.5px] border-border-default hover:border-accent-red-border hover:text-accent-red transition-colors duration-150"
                >
                    RESUME
                </a>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-[48px] left-0 w-full bg-bg-primary border-b-[0.5px] border-border-default p-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block text-[11px] font-mono tracking-[0.16em] text-text-muted hover:text-text-primary transition-colors duration-150"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="pt-3 mt-1 border-t-[0.5px] border-border-subtle">
                        <a
                            href={`${import.meta.env.BASE_URL}Vaibhav_Sharma_resume.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block font-mono text-[10px] text-text-secondary px-4 py-2 border-[0.5px] border-border-default hover:border-accent-red-border hover:text-accent-red transition-colors duration-150 w-full text-center"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            RESUME
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};
