import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, ChevronRight } from 'lucide-react';

interface PortfolioGuardProps {
    onAccessGranted: () => void;
}

type GuardState = 'idle' | 'tracking' | 'questioning' | 'processing' | 'granted';

export const PortfolioGuard: React.FC<PortfolioGuardProps> = ({ onAccessGranted }) => {
    const [guardState, setGuardState] = useState<GuardState>('idle');
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
    const [dialogue, setDialogue] = useState<string[]>([]);
    const eyeRef = useRef<SVGSVGElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const introRanRef = useRef(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [dialogue]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!eyeRef.current) return;
            const rect = eyeRef.current.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
            const distance = Math.min(8, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 12);
            setEyePosition({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Intro sequence — guarded against StrictMode double-render
    useEffect(() => {
        if (introRanRef.current || isMinimized) return;
        introRanRef.current = true;

        const t1 = setTimeout(() => setGuardState('tracking'), 500);
        const t2 = setTimeout(() => addToDialogue("UNIDENTIFIED USER DETECTED."), 800);
        const t3 = setTimeout(() => addToDialogue("INITIATING SECURITY PROTOCOL..."), 1800);
        const t4 = setTimeout(() => {
            setGuardState('questioning');
            setStep(1);
            addToDialogue("ENTER ALIAS:");
        }, 2800);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, [isMinimized]);

    const addToDialogue = (text: string) => {
        setDialogue(prev => [...prev, text]);
    };

    const SYSTEM_DATA = {
        user: "IDENTITY: Vaibhav Sharma\nCLASS: System Architect & Consultant\nSPECS: Backend Systems, ML Pipelines, High-Scale Infrastructure",
        bot: "IDENTITY: Portfolio Guardian v2.4\nFUNCTION: Filter traffic and assess visitor intent"
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        addToDialogue(`> ${inputValue}`);
        const input = inputValue.toLowerCase();
        setInputValue('');
        setGuardState('processing');

        setTimeout(() => {
            if (input.includes('skip') || input.includes('enter') || input.includes('portfolio') || input.includes('show')) {
                grantAccess();
                return;
            }

            if (input.includes('who is') || input.includes('about vaibhav') || input.includes('user') || input.includes('creator')) {
                addToDialogue(SYSTEM_DATA.user);
                setGuardState('questioning');
                return;
            }

            if (input.includes('who are you') || input.includes('what are you') || input.includes('bot') || input.includes('guard')) {
                addToDialogue(SYSTEM_DATA.bot);
                setGuardState('questioning');
                return;
            }

            if (step === 1) {
                addToDialogue(`GREETINGS, ${inputValue.toUpperCase()}.`);
                setTimeout(() => {
                    addToDialogue("STATE YOUR PURPOSE (e.g. Hiring, Browsing):");
                    setStep(2);
                    setGuardState('questioning');
                }, 600);
            } else if (step === 2) {
                addToDialogue("PURPOSE ACCEPTED.");
                grantAccess();
            } else {
                addToDialogue("INPUT RECEIVED. PROCEED OR STATE PURPOSE.");
                setGuardState('questioning');
            }
        }, 500);
    };

    const grantAccess = () => {
        addToDialogue("ACCESS GRANTED. WELCOME TO THE MAINFRAME.");
        setGuardState('granted');
        setTimeout(() => {
            setIsMinimized(true);
            onAccessGranted();
        }, 1000);
    };

    if (isMinimized) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 font-mono text-accent-cyan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Skip button — always visible */}
            <button
                onClick={grantAccess}
                className="absolute top-6 right-6 flex items-center gap-1.5 px-4 py-2 border border-accent-cyan/30 text-accent-cyan/70 hover:text-accent-cyan hover:border-accent-cyan text-xs font-mono transition-all hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] rounded-sm"
                aria-label="Skip intro"
            >
                SKIP <ChevronRight size={14} />
            </button>

            {/* Hints */}
            <div className="absolute top-6 left-6 p-3 border border-line-blueprint/50 bg-blueprint-dark/60 text-[10px] hidden md:block max-w-[200px]">
                <h4 className="text-white font-bold mb-1.5 flex items-center gap-1.5">
                    <Terminal size={10} /> HINTS
                </h4>
                <ul className="space-y-0.5 text-text-muted">
                    <li>• Answer the prompts</li>
                    <li>• Ask "Who is Vaibhav?"</li>
                    <li>• Type "Skip" to bypass</li>
                </ul>
            </div>

            <div className="max-w-md w-full space-y-6">
                {/* Eye */}
                <div className="flex justify-center mb-8">
                    <RobotEye ref={eyeRef} x={eyePosition.x} y={eyePosition.y} />
                </div>

                {/* Dialogue box */}
                <div className="bg-blueprint-dark/50 border border-line-blueprint p-5 rounded-sm min-h-[250px] flex flex-col backdrop-blur-sm shadow-[0_0_40px_rgba(6,182,212,0.08)]">
                    <div className="flex-1 space-y-1.5 mb-4 overflow-y-auto custom-scrollbar max-h-[250px]">
                        {dialogue.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.15 }}
                                className={line.startsWith('>') ? "text-slate-400 text-right text-sm" : "text-accent-cyan whitespace-pre-line text-sm"}
                            >
                                {line}
                            </motion.div>
                        ))}
                        {guardState === 'processing' && (
                            <div className="text-accent-cyan/40 animate-pulse text-sm">Processing...</div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {(guardState === 'questioning' || guardState === 'tracking') && (
                        <form onSubmit={handleCommand} className="flex gap-2">
                            <Terminal size={16} className="text-accent-cyan mt-2.5 shrink-0" />
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                className="flex-1 bg-black/30 border border-line-blueprint rounded-sm px-3 py-2 text-white text-sm focus:border-accent-cyan outline-none transition-colors"
                                placeholder="Type here..."
                                autoFocus
                            />
                            <button type="submit" className="p-2 text-blueprint-dark bg-accent-cyan rounded-sm hover:bg-cyan-400 transition-colors">
                                <Send size={16} />
                            </button>
                        </form>
                    )}
                </div>

                <div className="text-center text-[10px] text-text-muted uppercase tracking-[0.2em]">
                    Security Protocol Active
                </div>
            </div>
        </motion.div>
    );
};

const RobotEye = React.forwardRef<SVGSVGElement, { x: number; y: number }>(({ x, y }, ref) => (
    <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]" ref={ref}>
        <circle cx="50" cy="50" r="45" stroke="#1e293b" strokeWidth="2" fill="#0B1121" />
        <circle cx="50" cy="50" r="40" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="4 2" fill="none" className="animate-[spin_15s_linear_infinite]" />
        <circle cx="50" cy="50" r="20" fill="#06b6d4" fillOpacity="0.08" stroke="#06b6d4" strokeWidth="0.5" />
        <circle cx={50 + x} cy={50 + y} r="8" fill="#06b6d4" />
        <circle cx={50 + x} cy={50 + y} r="3.5" fill="#ffffff" />
        <circle cx="62" cy="38" r="2" fill="white" opacity="0.4" />
    </svg>
));

PortfolioGuard.displayName = 'PortfolioGuard';
RobotEye.displayName = 'RobotEye';
