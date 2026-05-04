import React from 'react';
import { useTheme } from '../../context/ThemeContext';

// Each star: { top%, left%, width(px), duration(s), delay(s), opacity }
const STARS = [
    { top: 8, left: 72, width: 120, duration: 6, delay: 0, opacity: 0.45 },
    { top: 18, left: 55, width: 80, duration: 8, delay: 2.5, opacity: 0.30 },
    { top: 5, left: 88, width: 100, duration: 7, delay: 5, opacity: 0.40 },
    { top: 30, left: 65, width: 60, duration: 9, delay: 1.2, opacity: 0.25 },
    { top: 12, left: 40, width: 140, duration: 5.5, delay: 7, opacity: 0.35 },
    { top: 22, left: 80, width: 90, duration: 10, delay: 3.8, opacity: 0.20 },
    { top: 3, left: 95, width: 110, duration: 7.5, delay: 9, opacity: 0.38 },
    { top: 40, left: 50, width: 70, duration: 8.5, delay: 4.5, opacity: 0.22 },
    { top: 15, left: 30, width: 95, duration: 6.5, delay: 11, opacity: 0.30 },
    { top: 7, left: 60, width: 130, duration: 7.2, delay: 0.8, opacity: 0.28 },
    { top: 50, left: 85, width: 55, duration: 11, delay: 6.3, opacity: 0.18 },
    { top: 35, left: 20, width: 105, duration: 9.5, delay: 13, opacity: 0.25 },
];

export const ShootingStars: React.FC = () => {
    const { isDark } = useTheme();
    return (
        <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ zIndex: 2 }}
    >
        {STARS.map((star, i) => (
            <span
                key={i}
                style={{
                    position: 'absolute',
                    top: `${star.top}%`,
                    left: `${star.left}%`,
                    width: `${star.width}px`,
                    height: '1.5px',
                    borderRadius: '999px',
                    background: isDark 
                        ? 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(200,220,255,0.6) 100%)'
                        : 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.5) 100%)',
                    transform: 'rotate(35deg)',
                    opacity: 0,
                    animation: `shootingStar ${star.duration}s ease-in ${star.delay}s infinite`,
                    maxOpacity: star.opacity,
                } as React.CSSProperties}
            />
        ))}
        </div>
    );
};
