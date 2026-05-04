import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import projectsData from '../../data/projects.json';
import resumeData from '../../data/resume.json';

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenProject: (projectId: string) => void;
}

const COMMANDS = ['help', 'ls', 'open', 'cat', 'cd', 'clear', 'exit', 'whoami'];
const FILES = ['about_me.txt', 'contact.md', 'resume.txt'];

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onOpenProject }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([
        '╔═══════════════════════════════════════╗',
        '║  SYSTEM TERMINAL v1.0.0               ║',
        '║  Type "help" for available commands    ║',
        '╚═══════════════════════════════════════╝',
        ''
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentDir, setCurrentDir] = useState('~');
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const getAutoComplete = useCallback((partial: string): string | null => {
        const parts = partial.split(' ');
        const cmd = parts[0].toLowerCase();

        if (parts.length === 1) {
            // Autocomplete commands
            const match = COMMANDS.find(c => c.startsWith(cmd) && c !== cmd);
            return match || null;
        }

        if (parts.length === 2) {
            const arg = parts[1];
            if (cmd === 'open') {
                const match = projectsData.find(p => p.id.startsWith(arg) && p.id !== arg);
                return match ? `${cmd} ${match.id}` : null;
            }
            if (cmd === 'cat') {
                const match = FILES.find(f => f.startsWith(arg) && f !== arg);
                return match ? `${cmd} ${match}` : null;
            }
            if (cmd === 'cd') {
                const dirs = ['projects', '~'];
                const match = dirs.find(d => d.startsWith(arg) && d !== arg);
                return match ? `${cmd} ${match}` : null;
            }
        }

        return null;
    }, []);

    if (!isOpen) return null;

    const handleCommand = (cmd: string) => {
        if (!cmd.trim()) return;

        const parts = cmd.trim().split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        const newHistory = [...history, `${getPrompt()} ${cmd}`];
        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        switch (command) {
            case 'help':
                newHistory.push(
                    '',
                    '  COMMAND         DESCRIPTION',
                    '  ─────────────   ─────────────────────────────',
                    '  ls              List visible nodes/projects',
                    '  cd <dir>        Change directory (projects, ~)',
                    '  open <id>       Open a project case file',
                    '  cat <file>      Read a text file',
                    '  whoami          Display user identity',
                    '  clear           Clear terminal history',
                    '  exit            Exit terminal mode',
                    '',
                    '  Tab             Autocomplete commands',
                    '  ↑ / ↓           Navigate command history',
                    '  Escape          Exit terminal',
                    ''
                );
                break;

            case 'ls':
                if (currentDir === '~/projects') {
                    newHistory.push(
                        '',
                        '  DIRECTORY: /projects',
                        ...projectsData.map(p => `  📁 ${p.id.padEnd(24)} [${p.title}]`),
                        ''
                    );
                } else {
                    newHistory.push(
                        '',
                        '  DIRECTORY: ~',
                        '  📁 projects/',
                        '  📄 about_me.txt',
                        '  📄 contact.md',
                        '  📄 resume.txt',
                        ''
                    );
                }
                break;

            case 'cd':
                if (args.length === 0 || args[0] === '~') {
                    setCurrentDir('~');
                    newHistory.push('');
                } else if (args[0] === 'projects') {
                    setCurrentDir('~/projects');
                    newHistory.push('');
                } else if (args[0] === '..') {
                    setCurrentDir('~');
                    newHistory.push('');
                } else {
                    newHistory.push(`  cd: ${args[0]}: No such directory`);
                }
                break;

            case 'open':
                if (args.length === 0) {
                    newHistory.push('  Usage: open <project_id>');
                    newHistory.push(`  Available: ${projectsData.map(p => p.id).join(', ')}`);
                } else {
                    const project = projectsData.find(p => p.id === args[0]);
                    if (project) {
                        newHistory.push(`  Opening project: ${project.title}...`);
                        setTimeout(() => onOpenProject(project.id), 500);
                    } else {
                        newHistory.push(`  Error: Project '${args[0]}' not found.`);
                        newHistory.push(`  Available: ${projectsData.map(p => p.id).join(', ')}`);
                    }
                }
                break;

            case 'cat':
                if (!args[0]) {
                    newHistory.push('  Usage: cat <filename>');
                } else if (args[0] === 'about_me.txt') {
                    newHistory.push(
                        '',
                        '  ┌──────────────────────────────────────┐',
                        '  │  ABOUT_ME.TXT                        │',
                        '  └──────────────────────────────────────┘',
                        `  ${resumeData.summary}`,
                        ''
                    );
                } else if (args[0] === 'contact.md') {
                    newHistory.push(
                        '',
                        `  Email:    ${resumeData.socials.email.replace('mailto:', '')}`,
                        `  GitHub:   ${resumeData.socials.github}`,
                        `  LinkedIn: ${resumeData.socials.linkedin}`,
                        ''
                    );
                } else if (args[0] === 'resume.txt') {
                    newHistory.push(
                        '',
                        '  ┌──────────────────────────────────────┐',
                        '  │  RESUME                              │',
                        '  └──────────────────────────────────────┘',
                        ...resumeData.experience.map(exp =>
                            `  ${exp.role} @ ${exp.company} (${exp.period})\n    ${exp.bullets.join('\n    ')}`
                        ),
                        ''
                    );
                } else {
                    newHistory.push(`  Error: File '${args[0]}' not found.`);
                }
                break;

            case 'whoami':
                newHistory.push(
                    '',
                    '  Name:     Vaibhav Sharma',
                    '  Role:     Systems Engineer',
                    '  Stack:    Java / Python',
                    '  Status:   Available',
                    ''
                );
                break;

            case 'clear':
                setHistory([]);
                setInput('');
                return;

            case 'exit':
                onClose();
                return;

            default:
                newHistory.push(`  Command not found: ${command}. Type "help" for assistance.`);
        }

        setHistory(newHistory);
        setInput('');
    };

    const getPrompt = () => {
        return `user@system:${currentDir}$`;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        } else if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const completion = getAutoComplete(input);
            if (completion) setInput(completion);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col font-mono text-sm text-emerald-400 p-4 lg:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Terminal mode"
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <TerminalIcon size={16} />
                        <span className="text-xs text-emerald-600">TERMINAL_MODE</span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:text-white transition-colors"
                    aria-label="Close terminal"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Output */}
            <div
                className="flex-1 overflow-y-auto custom-scrollbar space-y-0.5 pb-4"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap leading-relaxed">{line}</div>
                ))}

                {/* Input line */}
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-emerald-600 shrink-0">{getPrompt()}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none flex-1 text-emerald-400 caret-emerald-400 focus:ring-0"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                        aria-label="Terminal input"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
