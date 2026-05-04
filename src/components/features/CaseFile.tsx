import React from 'react';
import { CheckCircle, ArrowRight, Server } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    context: string;
    problem: string;
    constraints: string;
    solution: string;
    architecture: string;
    impact: string;
    stack: string[];
    role: string;
}

interface CaseFileProps {
    project: Project;
}

export const CaseFile: React.FC<CaseFileProps> = ({ project }) => {
    return (
        <article className="space-y-7 font-mono text-slate-300 pb-8">
            {/* Header */}
            <div className="border-b border-line-blueprint pb-5">
                <h3 className="text-xl lg:text-2xl font-bold text-slate-100 leading-tight">
                    {project.title}
                </h3>
                <p className="mt-2 text-accent-cyan/70 text-xs tracking-wider uppercase">
                    CASE_ID: {project.id.toUpperCase()}
                </p>
            </div>

            {/* Context & Problem */}
            <div className="grid grid-cols-1 gap-6">
                <Section title="Context" content={project.context} />
                <Section title="Problem Statement" content={project.problem} isWarning />
            </div>

            {/* Constraints */}
            <Section title="Constraints" content={project.constraints} />

            {/* Solution Architecture */}
            <div className="bg-surface/50 border border-line-blueprint p-5 rounded-sm relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300">
                    <Server size={100} />
                </div>

                <h4 className="text-accent-cyan text-xs uppercase tracking-[0.15em] mb-3 font-semibold border-b border-accent-cyan/15 pb-2 inline-block">
                    Solution Architecture
                </h4>
                <p className="whitespace-pre-wrap leading-relaxed relative z-10 text-sm">
                    {project.solution}
                </p>

                {/* Architecture Snapshot */}
                <div className="mt-5 p-3 bg-black/40 border border-line-blueprint/50 rounded-sm font-mono text-xs text-emerald-400/90 overflow-x-auto">
                    <span className="text-emerald-600">{'>'} arch_snapshot:</span>
                    <br />
                    <span className="ml-2">{project.architecture}</span>
                </div>
            </div>

            {/* Impact */}
            <Section
                title="Impact & Results"
                content={project.impact}
                icon={<CheckCircle size={14} className="text-emerald-500" />}
            />

            {/* Tech Stack */}
            <div className="space-y-2.5">
                <h4 className="text-text-muted text-[10px] uppercase tracking-[0.15em]">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 bg-blueprint-dark border border-line-blueprint text-xs rounded-sm text-accent-cyan/80 hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors duration-200 cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Role */}
            <div className="space-y-1.5 pt-4 border-t border-line-blueprint">
                <h4 className="text-text-muted text-[10px] uppercase tracking-[0.15em]">Role</h4>
                <p className="text-sm">{project.role}</p>
            </div>
        </article>
    );
};

interface SectionProps {
    title: string;
    content: string;
    isWarning?: boolean;
    icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, content, isWarning, icon }) => (
    <div className="space-y-1.5">
        <h4 className="text-text-muted text-[10px] uppercase tracking-[0.15em] flex items-center gap-1.5">
            {icon || <ArrowRight size={10} className="text-accent-cyan/60" />} {title}
        </h4>
        <p className={`text-sm leading-relaxed ${isWarning ? 'text-amber-200/80' : 'text-slate-300'}`}>
            {content}
        </p>
    </div>
);
