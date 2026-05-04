import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface NodeProps {
    id: string;
    label: string;
    x: number;  // % of parent container — shared with SVG coordinate space
    y: number;  // % of parent container — shared with SVG coordinate space
    isActive?: boolean;
    onClick: (id: string) => void;
    onHover: (id: string | null) => void;
    icon?: React.ReactNode;
    tooltip?: string;
    isSoftHighlighted?: boolean;
    assemblyVisible?: boolean;
    assemblyDelay?: number;
    reducedMotion?: boolean;
    isCentral?: boolean;
}

export const Node: React.FC<NodeProps> = ({
    id, label, x, y, isActive, onClick, onHover, icon, tooltip,
    isSoftHighlighted = false, assemblyVisible = true, assemblyDelay = 0,
    reducedMotion = false, isCentral = false,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => { setShowTooltip(true); onHover(id); };
    const handleMouseLeave = () => { setShowTooltip(false); onHover(null); };

    // ── Assembly variants — peripheral: subtle Y drift, central: scale lock ──
    // Applied on the **anchor** div. The circle is always geometrically centered
    // on (x%, y%) regardless of animation, so SVG lines stay aligned.
    const variants = reducedMotion
        ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
        : isCentral
            ? {
                hidden: { opacity: 0, scale: 0.98 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.15, ease: 'easeOut' as const, delay: assemblyDelay } },
            }
            : {
                hidden: { opacity: 0, y: 4 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.12, ease: 'easeOut' as const, delay: assemblyDelay } },
            };

    // Ring size — central node is ~8% larger, border is thicker
    const ringSize = isCentral ? 'w-[74px] h-[74px] lg:w-[86px] lg:h-[86px]' : 'w-12 h-12 lg:w-16 lg:h-16';
    // Pixel radius for positioning label/tooltip below/above the ring center
    // Central: 43px on sm, 43px on lg; Peripheral: 24px sm, 32px lg
    const ringRadius = isCentral ? 43 : 32;

    const ringClass = isCentral
        ? isActive
            ? 'border-[3px] border-accent-cyan bg-gradient-to-br from-accent-cyan/15 to-transparent shadow-[0_0_32px_rgba(6,182,212,0.45),inset_0_0_16px_rgba(6,182,212,0.08)]'
            : 'border-[3px] border-line-blueprint/80 bg-gradient-to-br from-white/5 to-transparent shadow-[0_0_18px_rgba(30,58,138,0.4),inset_0_0_12px_rgba(30,58,138,0.1)] hover:border-accent-cyan/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.2)]'
        : isActive
            ? 'border-2 border-accent-cyan bg-accent-cyan/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            : isSoftHighlighted
                ? 'border-2 border-accent-cyan/40 bg-accent-cyan/5 shadow-[0_0_10px_rgba(6,182,212,0.12)]'
                : 'border-2 border-line-blueprint/60 bg-blueprint-dark/60 hover:border-accent-cyan/40 hover:bg-accent-cyan/5';

    const iconClass = isActive
        ? 'text-accent-cyan'
        : isSoftHighlighted
            ? 'text-accent-cyan/70'
            : 'text-slate-500 group-hover:text-accent-cyan/70';

    const labelClass = isActive
        ? 'text-accent-cyan font-semibold border border-accent-cyan/20'
        : isSoftHighlighted
            ? 'text-slate-300 border border-transparent'
            : 'text-text-dim border border-transparent group-hover:text-slate-300';

    return (
        /**
         * ANCHOR — zero-size, positioned at the exact (x%, y%) shared with SVG.
         * All children are absolutely positioned relative to this anchor,
         * so the circle center is mathematically at (x%, y%).
         */
        <motion.div
            className="absolute"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                // No width/height — pure anchor point
                zIndex: isCentral ? 20 : 10,
            }}
            variants={variants}
            initial="hidden"
            animate={assemblyVisible ? 'visible' : 'hidden'}
        >
            {/* ── Tooltip: above the ring center ── */}
            {tooltip && showTooltip && !isActive && (
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="absolute left-0 -translate-x-1/2 pointer-events-none z-30"
                    style={{ bottom: `${ringRadius + 10}px` }}
                >
                    <div className="px-3 py-1.5 bg-black/90 border border-line-blueprint text-[10px] font-mono text-slate-300 whitespace-nowrap rounded-sm shadow-lg">
                        {tooltip}
                    </div>
                    <div className="mx-auto w-0 h-0 border-4 border-transparent border-t-line-blueprint/60" />
                </motion.div>
            )}

            {/* ── Circle: EXACTLY centered on the anchor via -50%/-50% ── */}
            <div
                className={clsx(
                    'absolute -translate-x-1/2 -translate-y-1/2',
                    'rounded-full flex items-center justify-center backdrop-blur-sm',
                    'cursor-pointer transition-all duration-200 group',
                    ringSize, ringClass
                )}
                onClick={() => onClick(id)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                role="button"
                tabIndex={0}
                aria-label={`Navigate to ${label}`}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(id); }}
            >
                {icon && (
                    <div className={clsx('transition-colors duration-200', iconClass, isCentral && 'scale-110')}>
                        {icon}
                    </div>
                )}
            </div>

            {/* ── Label: below the ring ── */}
            <span
                className={clsx(
                    'absolute left-0 -translate-x-1/2 whitespace-nowrap',
                    'font-mono text-[10px] lg:text-xs tracking-wider uppercase',
                    'transition-colors duration-200 bg-blueprint-dark/80 px-2 py-0.5 rounded-sm',
                    labelClass
                )}
                style={{ top: `${ringRadius + 8}px` }}
            >
                {label}
            </span>
        </motion.div>
    );
};
