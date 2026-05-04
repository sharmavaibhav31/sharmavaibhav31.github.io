import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, Mail } from 'lucide-react';
import architectureData from '../../data/architecture.json';
import resumeData from '../../data/resume.json';

type NodeId = 'center' | 'projects' | 'experience' | 'skills' | 'about' | 'contact';

type ArchitectureNode = {
    id: NodeId;
    title: string;
    attributes: string[];
    methods: string[];
    color: string;
    cx: number;
    cy: number;
    width: number;
    height: number;
    description: string;
};

const ARCHITECTURE_NODES = architectureData as ArchitectureNode[];

export const ArchitectureDiagram: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<ArchitectureNode | null>(null);
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id === 'work') setActiveNodeId('projects');
                    else if (id === 'experience') setActiveNodeId('experience');
                    else if (id === 'skills') setActiveNodeId('skills');
                    else if (id === 'about') setActiveNodeId('about');
                    else if (id === 'contact') setActiveNodeId('contact');
                    else if (id === 'hero') setActiveNodeId('center');
                }
            });
        }, { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' });

        ['hero', 'work', 'experience', 'skills', 'about', 'contact'].forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const centerNode = ARCHITECTURE_NODES.find(n => n.id === 'center')!;
    const peripheralNodes = ARCHITECTURE_NODES.filter(n => n.id !== 'center');

    const generateOrthogonalPath = (n1: ArchitectureNode, n2: ArchitectureNode) => {
        // Paths match the original 1200x900 absolute coordinate system.
        if (n2.id === 'projects') {
            const startY = n1.cy - (n1.height / 2);
            const endY = n2.cy + (n2.height / 2);
            return `M ${n1.cx} ${startY} L ${n2.cx} ${endY}`;
        }
        if (n2.id === 'experience') {
            const startX = n1.cx - (n1.width / 2);
            const endX = n2.cx + (n2.width / 2);
            const midX = endX + (startX - endX) / 2;
            return `M ${startX} ${n1.cy} H ${midX} V ${n2.cy} H ${endX}`;
        }
        if (n2.id === 'skills') {
            const startX = n1.cx + (n1.width / 2);
            const endX = n2.cx - (n2.width / 2);
            const midX = startX + (endX - startX) / 2;
            return `M ${startX} ${n1.cy} H ${midX} V ${n2.cy} H ${endX}`;
        }
        if (n2.id === 'about' || n2.id === 'contact') {
            const startY = n1.cy + (n1.height / 2);
            const endY = n2.cy - (n2.height / 2);
            const midY = startY + (endY - startY) / 2;
            return `M ${n1.cx} ${startY} V ${midY} H ${n2.cx} V ${endY}`;
        }
        return '';
    };

    const NodeCard = ({ node }: { node: ArchitectureNode }) => {
        const isCenter = node.id === 'center';
        const isHovered = hoveredNode?.id === node.id;
        const isActive = activeNodeId === node.id;
        // Hover takes precedence, or if active and nothing is hovered
        const shined = isHovered || (isActive && !hoveredNode);

        return (
            <div
                className={`w-full h-full flex flex-col relative pointer-events-auto transition-all duration-300 overflow-hidden ${isCenter ? 'bg-white dark:bg-[#0B1120]' : 'bg-slate-50 dark:bg-[#0F172A] cursor-pointer'} rounded-lg`}
                style={{
                    border: `1px solid ${shined ? node.color : isCenter ? 'rgba(148, 163, 184, 0.4)' : 'rgba(148, 163, 184, 0.15)'}`,
                    boxShadow: shined
                        ? `0 8px 20px -5px ${node.color}30`
                        : '0 2px 4px -1px rgba(0,0,0,0.2)',
                    transform: isHovered && !isCenter ? 'translateY(-4px) scale(1.02)' : (isActive && !isCenter ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)'),
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                    if (!isCenter) {
                        if (node.id === 'contact') {
                            setIsContactModalOpen(true);
                        } else {
                            const mappings: Record<string, string> = {
                                'projects': 'work',
                                'experience': 'experience',
                                'skills': 'capabilities',
                                'about': 'about'
                            };
                            const targetId = mappings[node.id];
                            if (targetId) {
                                const el = document.getElementById(targetId);
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    }
                }}
            >
                <div
                    className="w-full flex items-center justify-center py-3 px-4 border-b border-border/40 dark:border-white/5 relative z-10"
                    style={{ backgroundColor: isCenter ? 'transparent' : `${node.color}10` }}
                >
                    <span className={`font-display font-black text-[14px] tracking-[0.15em] uppercase text-primary dark:text-white/90`} style={{ color: isCenter ? 'inherit' : node.color }}>
                        {node.title}
                    </span>
                </div>
                <div className="flex flex-col flex-1 p-4 bg-transparent justify-center relative z-10">
                    {node.attributes.map((attr, idx) => (
                        <span key={idx} className="font-mono text-[11.5px] font-medium text-secondary dark:text-slate-400 leading-relaxed mb-2 last:mb-0 whitespace-normal break-words flex items-start gap-2 pt-0.5">
                            <span className="w-1.5 h-1.5 rounded-[2px] opacity-70 flex-shrink-0 mt-[6px]" style={{ backgroundColor: node.color }}></span>
                            <span className="flex-1">{attr.replace(/\* /g, '').replace(/- /g, '').trim()}</span>
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full flex items-center justify-center pointer-events-none">

            {/* Desktop & Tablet Graph (md and above) */}
            <motion.svg
                className="hidden md:block w-full max-w-[1000px] h-auto pointer-events-none origin-center"
                viewBox="0 0 1200 900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.6 }}
                style={{ overflow: 'visible' }}
            >
                <defs>
                    {peripheralNodes.map((node) => (
                        <marker
                            key={`arrow-${node.id}`}
                            id={`arrow-${node.id}`}
                            viewBox="0 0 10 10"
                            refX="10"
                            refY="5"
                            markerWidth="5"
                            markerHeight="5"
                            orient="auto-start-reverse"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill={node.color} />
                        </marker>
                    ))}
                </defs>

                {peripheralNodes.map((node) => {
                    const isHovered = hoveredNode?.id === node.id || hoveredNode?.id === 'center';
                    const isActive = activeNodeId === node.id || activeNodeId === 'center';
                    const shinedLine = isHovered || (isActive && !hoveredNode);

                    const isDimmed = (hoveredNode && !isHovered && hoveredNode.id !== 'center')
                        || (!hoveredNode && activeNodeId && !isActive && activeNodeId !== 'center');

                    const pathD = generateOrthogonalPath(centerNode, node);

                    return (
                        <g key={`connection-${node.id}`}>
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke={node.color}
                                strokeWidth={shinedLine ? 4 : 2}
                                markerEnd={`url(#arrow-${node.id})`}
                                style={{
                                    filter: shinedLine ? `drop-shadow(0 0 8px ${node.color}80)` : 'none',
                                    transition: 'stroke-width 0.3s ease, filter 0.3s ease'
                                }}
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: isDimmed ? 0.15 : (isHovered ? 1 : 0.6) }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            />
                            {!isDimmed && (
                                <circle r="4.5" fill={node.color} style={{ filter: `drop-shadow(0 0 5px ${node.color})`, opacity: shinedLine ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
                                    <animateMotion dur={`${2.5 + Math.random() * 1.5}s`} repeatCount="indefinite" path={pathD} />
                                </circle>
                            )}
                        </g>
                    );
                })}

                {/* Draw HTML Nodes inside SVG via foreignObject */}
                {ARCHITECTURE_NODES.map((node, i) => {
                    const isHovered = hoveredNode?.id === node.id;
                    const isActive = activeNodeId === node.id;
                    const shinedNode = isHovered || (isActive && !hoveredNode);

                    const isDimmedNode = (hoveredNode && !isHovered && node.id !== 'center')
                        || (!hoveredNode && activeNodeId && !isActive && node.id !== 'center');

                    // Provide extra padding around foreignObject to prevent tooltip/shadow clipping
                    const paddingX = 100;
                    const paddingY = 150;

                    return (
                        <foreignObject
                            key={node.id}
                            x={node.cx - (node.width / 2) - paddingX}
                            y={node.cy - (node.height / 2) - paddingY}
                            width={node.width + paddingX * 2}
                            height={node.height + paddingY * 2}
                            style={{ overflow: 'visible' }}
                        >
                            <div className="w-full h-full flex justify-center items-center pointer-events-none">
                                <motion.div
                                    className="pointer-events-auto"
                                    style={{ width: node.width, height: node.height }}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    animate={{ opacity: isDimmedNode ? 0.3 : 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                                >
                                    <motion.div
                                        className="w-full h-full"
                                        animate={{ y: shinedNode ? -5 : [0, -3, 0] }}
                                        transition={{
                                            y: {
                                                duration: shinedNode ? 0.2 : 4 + (i % 3),
                                                repeat: shinedNode ? 0 : Infinity,
                                                ease: "easeInOut"
                                            }
                                        }}
                                    >
                                        <NodeCard node={node} />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </foreignObject>
                    )
                })}
            </motion.svg>

            {/* Mobile Vertical Simplified Layout (sm and below) */}
            <div className="flex md:hidden flex-col items-center w-full space-y-0 pointer-events-auto max-w-[340px] relative z-10 opacity-90">
                <div style={{ width: '100%', height: centerNode.height * 0.9 }}>
                    <NodeCard node={centerNode} />
                </div>

                {peripheralNodes.map((node, i) => (
                    <React.Fragment key={`mobile-${node.id}`}>
                        <div className="relative flex flex-col items-center justify-center py-3">
                            {/* Vertical connector */}
                            <motion.div
                                className="w-0.5 h-6 opacity-60 rounded-full bg-slate-400 dark:bg-slate-600"
                                initial={{ height: 0, opacity: 0 }}
                                whileInView={{ height: 24, opacity: 0.7 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            />
                            {/* Traveling dot simulation */}
                            <motion.div
                                className="absolute w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: node.color }}
                                animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                            />
                        </div>
                        <div className="w-full" style={{ height: node.height * 0.9 }}>
                            <NodeCard node={node} />
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* Contact Modal Layer via Portal to escape transform containing blocks */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isContactModalOpen && (
                        <motion.div
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsContactModalOpen(false)}
                        >
                            <motion.div
                                className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden relative"
                                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                                transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-800/30">
                                    <h3 className="font-display font-bold text-lg text-primary dark:text-white tracking-tight">Connect with Me</h3>
                                    <button
                                        onClick={() => setIsContactModalOpen(false)}
                                        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                                        aria-label="Close Contact Modal"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="p-5 flex flex-col gap-3">
                                    <a
                                        href={resumeData.socials.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 transition-colors group"
                                    >
                                        <div className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md group-hover:scale-110 transition-transform">
                                            <Github size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">GitHub</span>
                                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">View code & contributions</span>
                                        </div>
                                    </a>
                                    <a
                                        href={resumeData.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 transition-colors group"
                                    >
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md group-hover:scale-110 transition-transform">
                                            <Linkedin size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">LinkedIn</span>
                                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Professional network</span>
                                        </div>
                                    </a>
                                    <a
                                        href={resumeData.socials.email}
                                        className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 transition-colors group"
                                    >
                                        <div className="p-2 bg-accent/10 text-accent dark:text-[#10B981] rounded-md group-hover:scale-110 transition-transform">
                                            <Mail size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">Email</span>
                                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Direct inquiries</span>
                                        </div>
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};
