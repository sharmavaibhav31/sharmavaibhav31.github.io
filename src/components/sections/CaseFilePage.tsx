// CaseFilePage.tsx
// Single page in the dossier — owns rotation, curl shadow, z-index.
// Front and back are bound to the SAME project instance via props.
//
// FIX: useTransform input ranges are derived from props (i, N).
// Each CaseFilePage receives a unique key (activeFilter + project.id + index)
// from ProjectsSection — this guarantees full remount when filter changes,
// preventing stale closure over old i/N values.

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { CaseFileFront } from './CaseFileFront';
import { CaseFileBack } from './CaseFileBack';

interface Project {
    id: string;
    title: string;
    category?: string;
    solution?: string;
    architecture?: string;
    impact?: string;
    stack?: string[];
    role?: string;
    github?: string | null;
    isPrivate?: boolean;
    metrics?: Record<string, number | undefined>;
    [key: string]: unknown;
}

interface CaseFilePageProps {
    project: Project;         // the specific project for this page
    index: number;            // 0-based position in the filtered list
    totalPages: number;       // total pages currently visible (may change on filter)
    scrollYProgress: MotionValue<number>;
    stageWidth: number;
    stageHeight: number;
    isTablet?: boolean;
}

// ── Classification label ──────────────────────────────────────────────────────
function getClassificationLabel(project: Project): string {
    if (project.isPrivate !== true && project.github) return 'PUBLIC · OPEN SOURCE';
    const cat = project.category ?? '';
    if (cat === 'Security')                                             return 'CLASSIFIED';
    if (cat === 'Enterprise Workflow System' || cat === 'Automation') return 'RESTRICTED';
    return 'UNCLASSIFIED';
}

// ── Component ─────────────────────────────────────────────────────────────────
export const CaseFilePage: React.FC<CaseFilePageProps> = ({
    project,
    index,
    totalPages,
    scrollYProgress,
    stageWidth,
    stageHeight,
    isTablet = false,
}) => {
    const i = index;
    const N = totalPages;

    // Each page occupies an equal slice of the overall scroll range [0, 1].
    // inputStart and inputEnd are the scroll progress values at which THIS
    // page begins and finishes turning.
    const inputStart = i / N;
    const inputEnd   = (i + 1) / N;

    // Local progress [0 → 1] for this specific page only.
    // Because we pass literal numbers — not MotionValues — as the input range,
    // useTransform creates a fresh mapping every time i or N changes.
    // The key prop on CaseFilePage (set in ProjectsSection) guarantees remount
    // when filter changes, so stale closures over old i/N are impossible.
    const pageProgress = useTransform(
        scrollYProgress,
        [inputStart, inputEnd],
        [0, 1],
        { clamp: true }
    );

    // Paper-curl easing: slow start → accelerates → snaps flat
    // Maps pageProgress [0, 0.3, 0.6, 0.85, 1] → rotateY [0, -22, -99, -158, -180]
    const rotateY = useTransform(
        pageProgress,
        [0,   0.3,  0.6,  0.85, 1  ],
        [0,  -22,  -99, -158, -180 ]
    );

    // Curl shadow: sin curve — peaks at p=0.5, zero at 0 and 1
    const curlOpacity = useTransform(pageProgress, (p) => Math.sin(p * Math.PI));

    // Z-index stacking:
    //   Turning  (0 < p < 1): 100  — always on top of everything
    //   Turned   (p >= 1)   : i + 1 — later turned pages sit ON TOP of earlier turned pages on left stack
    //   Untouched(p <= 0)   : N + (N - i) — top of right stack = highest z
    const zIndex = useTransform(pageProgress, (p) => {
        if (p > 0 && p < 1) return 100;
        if (p >= 1)          return i + 1;
        return N + (N - i);
    });

    const halfWidth  = stageWidth / 2;
    const classLabel = getClassificationLabel(project);
    const caseNumber = String(i + 1).padStart(3, '0');

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: 0,
                left: '50%',               // anchored to the center spine
                width: halfWidth,
                height: stageHeight,
                transformOrigin: 'left center', // rotates around the spine
                transformStyle: 'preserve-3d',
                rotateY,
                zIndex,
                willChange: 'transform',
            }}
        >
            {/* ── FRONT FACE ──────────────────────────────────────────────── */}
            {/* project prop passed directly — never shared across pages      */}
            <CaseFileFront
                project={project}
                caseNumber={caseNumber}
                classificationLabel={classLabel}
                isTablet={isTablet}
            />

            {/* ── PAPER CURL SHADOW (front face, right edge) ──────────────── */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to left, rgba(0,0,0,0.45) 0%, transparent 40%)',
                    zIndex: 10,
                    opacity: curlOpacity,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                }}
            />

            {/* ── BACK FACE ───────────────────────────────────────────────── */}
            {/* CRITICAL: same project instance as front — guaranteed by props */}
            <CaseFileBack
                project={project}
                caseNumber={caseNumber}
            />
        </motion.div>
    );
};
