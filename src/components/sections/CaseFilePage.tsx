// CaseFilePage.tsx
// Single page in the dossier — owns rotation, curl shadow, z-index.
// Front and back are bound to the SAME project instance via props.

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
    project: Project;
    index: number;          // 0-based
    totalPages: number;
    scrollYProgress: MotionValue<number>;
    stageWidth: number;     // full stage width in px (e.g. 780)
    stageHeight: number;    // full stage height in px (e.g. 520)
    isTablet?: boolean;
}

// ── Classification label map ──────────────────────────────────────────────────
function getClassificationLabel(project: Project): string {
    if (project.isPrivate !== true && project.github) return 'PUBLIC · OPEN SOURCE';
    const cat = project.category ?? '';
    if (cat === 'Security')                             return 'CLASSIFIED';
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
    const N = totalPages;
    const i = index;

    // Local scroll progress for this page: 0→1 during its own scroll window
    const pageProgress = useTransform(
        scrollYProgress,
        [i / N, (i + 1) / N],
        [0, 1],
        { clamp: true }
    );

    // Paper-curl easing: slow start, accelerates, snaps flat
    // [0, 0.3, 0.6, 0.85, 1] → [0°, -22°, -99°, -158°, -180°]
    const rotateY = useTransform(
        pageProgress,
        [0, 0.3, 0.6, 0.85, 1],
        [0, -22, -99, -158, -180]
    );

    // Curl shadow opacity: sin curve peaks at p=0.5
    const curlOpacity = useTransform(pageProgress, (p) => Math.sin(p * Math.PI));

    // Z-index:
    //   - While turning (0 < p < 1): 100 (always on top)
    //   - Fully turned (p = 1):      N - i  (earlier pages deeper in left stack)
    //   - Untouched (p = 0):         N + (N - i) (top of right stack = highest)
    const zIndex = useTransform(pageProgress, (p) => {
        if (p > 0 && p < 1) return 100;
        if (p >= 1)          return N - i;
        return N + (N - i);   // p === 0
    });

    const halfWidth = stageWidth / 2;
    const classLabel = getClassificationLabel(project);
    const caseNumber = String(i + 1).padStart(3, '0');

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: 0,
                left: '50%',          // anchored to the center spine
                width: halfWidth,
                height: stageHeight,
                transformOrigin: 'left center',   // rotates around the spine
                transformStyle: 'preserve-3d',
                rotateY,
                zIndex,
                willChange: 'transform',
            }}
        >
            {/* ── FRONT FACE ──────────────────────────────────────── */}
            <CaseFileFront
                project={project}
                caseNumber={caseNumber}
                classificationLabel={classLabel}
                isTablet={isTablet}
            />

            {/* ── PAPER CURL SHADOW (on front face, right edge) ──── */}
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

            {/* ── BACK FACE ───────────────────────────────────────── */}
            <CaseFileBack
                project={project}
                caseNumber={caseNumber}
            />
        </motion.div>
    );
};
