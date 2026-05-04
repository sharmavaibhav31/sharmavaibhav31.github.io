import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Node } from '../ui/Node';
import type { AssemblyState } from '../../hooks/useBlueprintAssembly';

export interface MapNode {
    id: string;
    label: string;
    x: number;
    y: number;
    icon?: React.ReactNode;
    type?: 'primary' | 'secondary' | 'root';
    tooltip?: string;
}

export interface Connection {
    from: string;
    to: string;
    strength?: 'strong' | 'medium' | 'light' | 'subtle';
}

// Visual properties per connection strength
const STRENGTH_STYLE = {
    strong: { baseOpacity: 0.45, dasharray: 'none', strokeWidth: 1.5, highlightOpacity: 0.85 },
    medium: { baseOpacity: 0.28, dasharray: '8,6', strokeWidth: 1, highlightOpacity: 0.75 },
    light: { baseOpacity: 0.16, dasharray: '5,8', strokeWidth: 0.75, highlightOpacity: 0.6 },
    subtle: { baseOpacity: 0.08, dasharray: '3,10', strokeWidth: 0.5, highlightOpacity: 0.4 },
};

interface BlueprintMapProps {
    nodes: MapNode[];
    connections: Connection[];
    activeNodeId: string | null;
    onNodeClick: (id: string) => void;
    assembly: AssemblyState;
    hoveredNode: string | null;
    onNodeHover: (id: string | null) => void;
    softHighlights: string[];
}

export const BlueprintMap: React.FC<BlueprintMapProps> = ({
    nodes, connections, activeNodeId, onNodeClick, assembly,
    hoveredNode, onNodeHover, softHighlights,
}) => {
    const connectionPaths = useMemo(() => {
        return connections.map((conn) => {
            const start = nodes.find(n => n.id === conn.from);
            const end = nodes.find(n => n.id === conn.to);
            if (!start || !end) return null;
            return { conn, start, end };
        }).filter(Boolean) as { conn: Connection; start: MapNode; end: MapNode }[];
    }, [connections, nodes]);

    const centralNode = nodes.find(n => n.type === 'root');
    const peripheralNodes = nodes.filter(n => n.type !== 'root');

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* SVG Connections Layer — z-0, below nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {connectionPaths.map(({ conn, start, end }, index) => {
                    const strength = conn.strength ?? 'light';
                    const style = STRENGTH_STYLE[strength];

                    const isActiveRelated = activeNodeId &&
                        (activeNodeId === conn.from || activeNodeId === conn.to);

                    // Hover highlight: line brightens when either endpoint is hovered or softHighlighted
                    const isHoverRelated = hoveredNode &&
                        (hoveredNode === conn.from || hoveredNode === conn.to);
                    const isSoftRelated = softHighlights.length > 0 &&
                        (softHighlights.includes(conn.from) || softHighlights.includes(conn.to));

                    // Compute final line opacity
                    let lineOpacity = style.baseOpacity;
                    if (isActiveRelated) lineOpacity = style.highlightOpacity;
                    else if (isHoverRelated || isSoftRelated) lineOpacity = Math.min(style.baseOpacity * 2.5, 0.7);

                    const dx = end.x - start.x;
                    const dy = end.y - start.y;
                    const length = Math.sqrt(dx * dx + dy * dy) * 10;

                    const lineVariants = assembly.reducedMotion
                        ? { hidden: { strokeDashoffset: 0, opacity: lineOpacity }, visible: { strokeDashoffset: 0, opacity: lineOpacity } }
                        : {
                            hidden: { strokeDashoffset: length, opacity: 0 },
                            visible: {
                                strokeDashoffset: 0,
                                opacity: style.baseOpacity,
                                transition: { duration: 0.3, delay: 0.02 * index, ease: 'easeOut' as const },
                            },
                        };

                    const highlightColor = isActiveRelated ? '#06b6d4' : '#2563eb';

                    return (
                        <React.Fragment key={`${conn.from}-${conn.to}`}>
                            {/* Base line — always present after assembly */}
                            <motion.line
                                x1={`${start.x}%`} y1={`${start.y}%`}
                                x2={`${end.x}%`} y2={`${end.y}%`}
                                stroke="#1e3a8a"
                                strokeWidth={style.strokeWidth}
                                strokeDasharray={style.dasharray === 'none' ? undefined : style.dasharray}
                                variants={lineVariants}
                                initial={assembly.reducedMotion ? 'visible' : 'hidden'}
                                animate={assembly.linesDrawing ? 'visible' : 'hidden'}
                            />

                            {/* Hover / active highlight overlay */}
                            <motion.line
                                x1={`${start.x}%`} y1={`${start.y}%`}
                                x2={`${end.x}%`} y2={`${end.y}%`}
                                stroke={highlightColor}
                                strokeWidth={style.strokeWidth + 0.5}
                                strokeDasharray={style.dasharray === 'none' ? undefined : style.dasharray}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: (isActiveRelated || isHoverRelated || isSoftRelated) ? lineOpacity : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                filter={isActiveRelated ? 'url(#line-glow)' : undefined}
                            />
                        </React.Fragment>
                    );
                })}
            </svg>

            {/* Peripheral Nodes — z-10 */}
            {peripheralNodes.map((node, index) => (
                <Node
                    key={node.id}
                    {...node}
                    isActive={activeNodeId === node.id}
                    onClick={onNodeClick}
                    onHover={onNodeHover}
                    isSoftHighlighted={softHighlights.includes(node.id)}
                    assemblyVisible={assembly.peripheralNodes}
                    assemblyDelay={assembly.reducedMotion ? 0 : 0.04 * index}
                    reducedMotion={assembly.reducedMotion}
                    isCentral={false}
                />
            ))}

            {/* Central Node — z-20, appears last */}
            {centralNode && (
                <Node
                    key={centralNode.id}
                    {...centralNode}
                    isActive={activeNodeId === centralNode.id}
                    onClick={onNodeClick}
                    onHover={onNodeHover}
                    isSoftHighlighted={false}
                    assemblyVisible={assembly.centralNode}
                    assemblyDelay={0}
                    reducedMotion={assembly.reducedMotion}
                    isCentral={true}
                />
            )}
        </div>
    );
};
