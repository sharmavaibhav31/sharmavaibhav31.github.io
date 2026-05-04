import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';

type CardNavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    autoOpen?: boolean;
    logoContent: React.ReactNode;
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    onClose?: () => void;
}

const CardNav: React.FC<CardNavProps> = ({
    logoContent,
    items,
    className = '',
    ease = 'circ.out',
    baseColor = '#fff',
    menuColor,
    buttonBgColor,
    buttonTextColor,
    onClose,
    autoOpen = false,
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';
                contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
        tl.to(
            cardsRef.current,
            { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
            '-=0.1'
        );

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;
        if (autoOpen && tl) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        }
        return () => {
            tl?.kill();
            tlRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;
            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) tlRef.current = newTl;
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => {
                setIsExpanded(false);
                onClose?.();
            });
            tl.reverse();
        }
    };

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div
            className={`card-nav-container ${className}`}
            style={{ position: 'relative', zIndex: 99 }}
        >
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''}`}
                style={{
                    backgroundColor: baseColor,
                    height: 60,
                    overflow: 'hidden',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
                    position: 'relative',
                    willChange: 'height',
                    minWidth: 280,
                }}
            >
                {/* Top bar */}
                <div
                    style={{
                        position: 'absolute',
                        insetInline: 0,
                        top: 0,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 1rem 0 1.1rem',
                        zIndex: 2,
                    }}
                >
                    {/* Logo / trigger content */}
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        {logoContent}
                    </div>

                    {/* Hamburger */}
                    <div
                        onClick={toggleMenu}
                        role="button"
                        tabIndex={0}
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            gap: 6,
                            color: menuColor || '#0F172A',
                            userSelect: 'none',
                            padding: '0 4px',
                        }}
                    >
                        <span
                            style={{
                                display: 'block',
                                width: 28,
                                height: 2,
                                backgroundColor: 'currentColor',
                                borderRadius: 2,
                                transformOrigin: '50% 50%',
                                transition: 'transform 0.25s ease, opacity 0.25s ease',
                                transform: isHamburgerOpen ? 'translateY(4px) rotate(45deg)' : 'none',
                            }}
                        />
                        <span
                            style={{
                                display: 'block',
                                width: 28,
                                height: 2,
                                backgroundColor: 'currentColor',
                                borderRadius: 2,
                                transformOrigin: '50% 50%',
                                transition: 'transform 0.25s ease, opacity 0.25s ease',
                                transform: isHamburgerOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
                            }}
                        />
                    </div>

                    {/* Optional CTA */}
                    {buttonBgColor && (
                        <button
                            type="button"
                            style={{
                                marginLeft: 12,
                                backgroundColor: buttonBgColor,
                                color: buttonTextColor || '#fff',
                                border: 'none',
                                borderRadius: 10,
                                padding: '0 16px',
                                height: 40,
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 14,
                            }}
                        >
                            Get Started
                        </button>
                    )}
                </div>

                {/* Cards content */}
                <div
                    className="card-nav-content"
                    role="menu"
                    aria-hidden={!isExpanded}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 60,
                        bottom: 0,
                        padding: 8,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        gap: 8,
                        zIndex: 1,
                        visibility: isExpanded ? 'visible' : 'hidden',
                        pointerEvents: isExpanded ? 'auto' : 'none',
                    }}
                >
                    {items.slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            ref={setCardRef(idx)}
                            role="menuitem"
                            style={{
                                flex: '1 1 0%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                                padding: '12px 16px',
                                borderRadius: 10,
                                backgroundColor: item.bgColor,
                                color: item.textColor,
                                height: '100%',
                                boxSizing: 'border-box',
                                userSelect: 'none',
                            }}
                        >
                            <div style={{ fontSize: 22, fontWeight: 400, letterSpacing: '-0.03em' }}>
                                {item.label}
                            </div>
                            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        href={lnk.href}
                                        aria-label={lnk.ariaLabel}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            color: 'inherit',
                                            textDecoration: 'none',
                                            fontSize: 15,
                                            opacity: 1,
                                            transition: 'opacity 0.2s',
                                        }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.65'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                                    >
                                        <GoArrowUpRight aria-hidden="true" style={{ flexShrink: 0 }} />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
