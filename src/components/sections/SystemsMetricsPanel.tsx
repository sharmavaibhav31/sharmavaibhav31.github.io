import React, { useEffect, useState, useRef } from 'react';

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

const AnimatedCounter: React.FC<{ target: number; duration: number }> = ({ target, duration }) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated.current) {
                hasAnimated.current = true;
                let startTime: number;
                
                const animate = (currentTime: number) => {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const easedProgress = easeOutCubic(progress);
                    setCount(Math.floor(easedProgress * target));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setCount(target);
                    }
                };
                
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.1 });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [target, duration]);

    return (
        <span ref={elementRef} className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
            {count}
        </span>
    );
};

export const SystemsMetricsPanel: React.FC = () => {
    return (
        <div className="w-full min-w-0 lg:min-w-[400px] bg-[#0a0e1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative flex flex-col pointer-events-auto">
            {/* 2-col grid for top cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-white/10">
                {/* Card 1: SYSTEMS BUILT */}
                <div className="bg-[#0a0e1a] p-5 sm:p-6 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00ffb4]/50" />
                    <div className="text-xs font-semibold text-white/50 tracking-wider mb-2">SYSTEMS BUILT</div>
                    <div className="mt-1 mb-2">
                        <AnimatedCounter target={6} duration={1200} />
                    </div>
                    <div className="text-sm text-white/40 mb-4">across 4 domains</div>
                    <div className="w-full h-[2px] bg-white/5 rounded-full mt-auto overflow-hidden">
                        <div className="h-full bg-[#00ffb4] rounded-full w-[75%]" />
                    </div>
                </div>

                {/* Card 2: PRODUCTION USERS */}
                <div className="bg-[#0a0e1a] p-5 sm:p-6 flex flex-col relative overflow-hidden">
                    <div className="text-xs font-semibold text-white/50 tracking-wider mb-2">PRODUCTION USERS</div>
                    <div className="mt-1 mb-2">
                        <AnimatedCounter target={8000} duration={1800} />
                    </div>
                    <div className="text-sm text-white/40 mb-4">via ClubChat mobile</div>
                    <div className="w-full h-[2px] bg-white/5 rounded-full mt-auto overflow-hidden">
                        <div className="h-full bg-[#4a9eff] rounded-full w-[60%]" />
                    </div>
                </div>

                {/* Card 3: CORE STACK */}
                <div className="bg-[#0a0e1a] p-5 sm:p-6 flex flex-col relative overflow-hidden">
                    <div className="text-xs font-semibold text-white/50 tracking-wider mb-4">CORE STACK</div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {['Java 17', 'Spring Boot', 'PostgreSQL', 'Docker', 'Python', 'Flask', 'PyTorch'].map(tag => (
                            <span key={tag} className="text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Card 4: CERTIFICATIONS */}
                <div className="bg-[#0a0e1a] p-5 sm:p-6 flex flex-col relative overflow-hidden">
                    <div className="text-xs font-semibold text-white/50 tracking-wider mb-2">CERTIFICATIONS</div>
                    <div className="mt-1 mb-2">
                        <AnimatedCounter target={7} duration={1200} />
                    </div>
                    <div className="text-sm text-white/40 mb-4">OCI · Google Cloud</div>
                    <div className="w-full h-[2px] bg-white/5 rounded-full mt-auto overflow-hidden">
                        <div className="h-full bg-[#f59e0b] rounded-full w-[85%]" />
                    </div>
                </div>
            </div>

            {/* Card 5: SYSTEM STATUS */}
            <div className="bg-[#0a0e1a] border-t border-white/10 p-5 sm:p-6 flex flex-col">
                <div className="text-xs font-semibold text-white/50 tracking-wider mb-4">SYSTEM STATUS</div>
                <div className="flex flex-col">
                    {[
                        'constraint-scheduler',
                        'distributed-url-shortener',
                        'offline-ai-shell',
                        'moodharmonics-ml'
                    ].map((sys, idx) => (
                        <div key={sys} className={`flex items-center justify-between py-2.5 ${idx !== 0 ? 'border-t border-white/5' : ''}`}>
                            <span className="text-[11px] sm:text-xs font-mono text-white/60 truncate pr-4">{sys}</span>
                            <span className="text-[11px] sm:text-xs font-mono text-[#00ffb4] flex-shrink-0">
                                SHIPPED<span className="animate-[sysBlink_1.4s_step-end_infinite]">_</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                @keyframes sysBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};
