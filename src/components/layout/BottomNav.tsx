import React, { useState, useEffect } from 'react';

const SECTIONS = [
    { id: 'work', label: 'WORK' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'capabilities', label: 'SKILLS' },
    { id: 'about', label: 'ABOUT' }
];

export const BottomNav: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.4,
            }
        );

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            SECTIONS.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav 
            className="fixed bottom-0 left-0 right-0 flex sm:hidden z-[100]"
            style={{ 
                height: '52px', 
                background: '#0d0d0d', 
                borderTop: '0.5px solid rgba(255,255,255,0.08)' 
            }}
        >
            {SECTIONS.map(({ id, label }, index) => {
                const isActive = activeSection === id;
                const isLast = index === SECTIONS.length - 1;

                return (
                    <div 
                        key={id}
                        className="flex-1 flex flex-col items-center justify-center gap-[3px] cursor-pointer"
                        style={{
                            borderRight: isLast ? 'none' : '0.5px solid rgba(255,255,255,0.05)'
                        }}
                        onClick={() => handleScroll(id)}
                    >
                        <div 
                            style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: isActive ? '#4ade80' : 'rgba(255,255,255,0.15)',
                                transition: 'background-color 0.2s ease'
                            }}
                        />
                        <span 
                            className="font-mono font-[600]"
                            style={{
                                fontSize: '8px',
                                letterSpacing: '0.12em',
                                color: isActive ? '#4ade80' : '#6a6a6a',
                                transition: 'color 0.2s ease'
                            }}
                        >
                            {label}
                        </span>
                    </div>
                );
            })}
        </nav>
    );
};
