// CapabilitiesSection.tsx
// Theme: Linux Directory Tree (tree -C) — CLI Manifest with CSS variables for light/dark support

import React from 'react';

interface SkillNode {
    name: string;
    tier: number;
    tooltip: string;
    branchPrefix?: string;
}

interface TreeCategory {
    id: string;
    name: string;
    isLastCategory?: boolean;
    rows: SkillNode[][];
}

const treeCategories: TreeCategory[] = [
    {
        id: 'backend',
        name: 'backend',
        rows: [
            [
                { name: 'java', tier: 1, tooltip: 'Core backend language for scalable enterprise systems', branchPrefix: '├── ' },
                { name: 'spring-boot', tier: 1, tooltip: 'REST APIs, Security, Data JPA, Validation', branchPrefix: '├── ' },
                { name: 'rest-apis', tier: 1, tooltip: 'Clean resource modeling and stateless interface design', branchPrefix: '├── ' },
            ],
            [
                { name: 'python', tier: 1, tooltip: 'Language for microservices, scrapers, and ML pipelines', branchPrefix: '├── ' },
                { name: 'express.js', tier: 1, tooltip: 'Node.js web framework and REST services', branchPrefix: '├── ' },
                { name: 'jwt / rbac', tier: 1, tooltip: 'JSON Web Tokens and Role-Based Access Control', branchPrefix: '└── ' },
            ],
            [
                { name: 'fastapi', tier: 2, tooltip: 'Asynchronous Python web APIs', branchPrefix: '└── ' },
                { name: 'flask', tier: 2, tooltip: 'Lightweight Python web services and ML interfaces', branchPrefix: '└── ' },
            ],
        ],
    },
    {
        id: 'data-persistence',
        name: 'data & persistence',
        rows: [
            [
                { name: 'postgresql', tier: 1, tooltip: 'Relational schema design, constraints, and JSONB', branchPrefix: '├── ' },
                { name: 'mongodb', tier: 1, tooltip: 'Document storage for metadata and user states', branchPrefix: '├── ' },
                { name: 'redis-streams', tier: 1, tooltip: 'Event backbone and messaging consumer groups', branchPrefix: '└── ' },
            ],
            [
                { name: 'flyway', tier: 2, tooltip: 'Version-controlled SQL schema database migrations', branchPrefix: '└── ' },
                { name: 'prisma', tier: 2, tooltip: 'Type-safe database client and ORM', branchPrefix: '└── ' },
            ],
        ],
    },
    {
        id: 'infra-devops',
        name: 'infra & devops',
        rows: [
            [
                { name: 'docker', tier: 1, tooltip: 'Containerizing backend services for reproducible deployments', branchPrefix: '├── ' },
                { name: 'linux', tier: 1, tooltip: 'Operating system configuration, shell scripting, and administration', branchPrefix: '├── ' },
                { name: 'git', tier: 1, tooltip: 'Version control, branching strategies, and collaboration', branchPrefix: '├── ' },
            ],
            [
                { name: 'github-actions', tier: 1, tooltip: 'Automated linting, testing, and continuous deployment', branchPrefix: '├── ' },
                { name: 'nginx', tier: 2, tooltip: 'Reverse proxy, SSL termination, and static site serving', branchPrefix: '├── ' },
                { name: 'ec2 / ssh', tier: 2, tooltip: 'Cloud server provisioning and secure remote management', branchPrefix: '└── ' },
            ],
            [
                { name: 'render', tier: 2, tooltip: 'Cloud web service deployment and hosting', branchPrefix: '└── ' },
            ],
        ],
    },
    {
        id: 'systems-security',
        name: 'systems & security',
        rows: [
            [
                { name: 'seccomp', tier: 1, tooltip: 'Linux syscall filtering for process sandboxing', branchPrefix: '├── ' },
                { name: 'linux-namespaces', tier: 1, tooltip: 'Process, PID, and mount isolation for secure execution environments', branchPrefix: '├── ' },
                { name: 'cap-drop', tier: 1, tooltip: 'POSIX capabilities management for security hardening', branchPrefix: '└── ' },
            ],
            [
                { name: 'rlimits', tier: 2, tooltip: 'Linux resource limit enforcement (CPU, Memory, File Descriptors)', branchPrefix: '└── ' },
                { name: 'llama.cpp', tier: 2, tooltip: 'Running high-performance sandboxed LLMs locally in C/C++', branchPrefix: '└── ' },
            ],
        ],
    },
    {
        id: 'testing-integration',
        name: 'testing & integration',
        isLastCategory: true,
        rows: [
            [
                { name: 'pytest', tier: 2, tooltip: 'Testing framework for Python unit and integration tests' },
                { name: 'testcontainers', tier: 2, tooltip: 'Ephemeral Docker containers for database integration testing' },
                { name: 'h2-integration', tier: 2, tooltip: 'In-memory database testing for Java applications' },
            ],
        ],
    },
];

export const CapabilitiesSection: React.FC = () => {
    const totalLoaded = treeCategories.reduce(
        (acc, cat) => acc + cat.rows.reduce((rAcc, row) => rAcc + row.length, 0),
        0
    );

    return (
        <section
            id="capabilities"
            aria-label="Skills & Capabilities"
            className="w-full flex flex-col pt-0"
            style={{ background: 'var(--bg-primary)' }}
        >
            {/* SECTION HEADER BAR */}
            <div
                className="w-full h-[36px] border-y-[0.5px] px-[16px] sm:px-8 flex justify-between items-center shrink-0"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}
            >
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] font-medium" style={{ color: 'var(--text-muted)' }}>
                    CAPABILITIES_MANIFEST [{totalLoaded} loaded]
                </div>
                <div className="font-mono text-[9px] sm:text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    tree -C
                </div>
            </div>

            {/* CONTENT — LINUX DIRECTORY TREE CONTAINER */}
            <div className="w-full px-[16px] sm:px-8 py-[1.8rem] overflow-x-auto">
                <div className="min-w-[620px] font-mono text-[12.5px] sm:text-[13.5px] leading-[1.7] flex flex-col gap-4">
                    {/* TOP MANIFEST TITLE */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between" style={{ color: 'var(--text-muted)' }}>
                            <span className="font-bold tracking-[0.05em]" style={{ color: 'var(--text-primary)' }}>
                                CAPABILITIES_MANIFEST [{totalLoaded} loaded]
                            </span>
                            <span className="text-[10px]" style={{ color: 'var(--accent-green)' }}>
                                STATUS: LOADED
                            </span>
                        </div>
                        <div
                            className="w-full h-[0.5px] opacity-70"
                            style={{ background: 'var(--border-default)' }}
                        />
                    </div>

                    {/* TREE CATEGORIES */}
                    {treeCategories.map((cat) => (
                        <div key={cat.id} className="flex flex-col">
                            {/* Category Directory Line */}
                            <div className="flex items-center font-semibold py-0.5">
                                <span style={{ color: 'var(--text-muted)' }}>
                                    {cat.isLastCategory ? '└── ' : '├── '}
                                </span>
                                <span className="px-1.5 py-0.5 rounded" style={{ color: 'var(--accent-green)', background: 'var(--accent-green-bg)' }}>
                                    [{cat.name}]
                                </span>
                            </div>

                            {/* Standard categories with multiline tree rows */}
                            {!cat.isLastCategory && (
                                <div className="flex flex-col">
                                    {cat.rows.map((row, rIdx) => (
                                        <div key={rIdx} className="flex items-center py-0.5">
                                            {/* Vertical trunk line */}
                                            <span style={{ color: 'var(--text-muted)', width: '32px', flexShrink: 0 }}>
                                                │   
                                            </span>

                                            {/* Row items grid */}
                                            <div className="flex items-center gap-x-6 sm:gap-x-10">
                                                {row.map((item) => {
                                                    const isTier1 = item.tier === 1;
                                                    const isSpecialized = cat.id === 'systems-security' && !isTier1;
                                                    const fontWeight = isTier1 ? 'font-semibold' : 'font-normal';
                                                    const opacityStyle = isTier1 ? 1 : isSpecialized ? 0.8 : 0.88;

                                                    return (
                                                        <div
                                                            key={item.name}
                                                            className="group inline-flex items-center cursor-default py-0.5 px-1 rounded transition-colors duration-150 hover:bg-[var(--bg-surface)]"
                                                            style={{ opacity: opacityStyle }}
                                                            title={item.tooltip}
                                                        >
                                                            <span style={{ color: 'var(--text-muted)', marginRight: 4 }}>
                                                                {item.branchPrefix ?? '├── '}
                                                            </span>
                                                            <span
                                                                className={`${fontWeight} group-hover:text-[var(--accent-green)] transition-colors duration-150`}
                                                                style={{ color: isTier1 ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Testing & Integration category with inline tree connections */}
                            {cat.isLastCategory && (
                                <div className="flex items-center py-0.5">
                                    <span style={{ color: 'var(--text-muted)', width: '32px', flexShrink: 0 }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                    </span>
                                    <div className="flex items-center gap-x-1">
                                        <span style={{ color: 'var(--text-muted)', marginRight: 4 }}>
                                            └── 
                                        </span>
                                        {cat.rows[0]?.map((item, idx) => {
                                            return (
                                                <React.Fragment key={item.name}>
                                                    <span
                                                        className="group font-normal px-1 py-0.5 rounded transition-colors duration-150 cursor-default hover:bg-[var(--bg-surface)] hover:text-[var(--accent-green)]"
                                                        style={{ color: 'var(--text-secondary)', opacity: 0.88 }}
                                                        title={item.tooltip}
                                                    >
                                                        {item.name}
                                                    </span>
                                                    {idx < (cat.rows[0]?.length ?? 0) - 1 && (
                                                        <span style={{ color: 'var(--text-muted)', margin: '0 6px' }}>
                                                            ───
                                                        </span>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
