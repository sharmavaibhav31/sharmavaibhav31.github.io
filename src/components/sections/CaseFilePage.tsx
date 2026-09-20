// CaseFilePage.tsx
// Open Dossier Binder Spread for a project.
// Left Page = CaseFileFront (Identity)
// Right Page = CaseFileBack (Depth)
// 3D Turning Leaf has dual faces:
//   - Front Face (0 to -90°): CaseFileBack (Depth for current project)
//   - Back Face (-90 to -180°): CaseFileFront (Identity for next project, rotated 180° so text is never mirrored!)

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { CaseFileFront } from './CaseFileFront';
import { CaseFileBack } from './CaseFileBack';
import { CaseFileEndBack } from './CaseFileEndBack';

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
    project: Project;         // current project
    nextProject?: Project | null; // next project in list (for turning leaf back face)
    index: number;            // 0-based position in the filtered list
    totalPages: number;       // total pages currently visible
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
    nextProject = null,
    index,
    totalPages,
    scrollYProgress,
    stageWidth,
    stageHeight,
    isTablet = false,
}) => {
    const i = index;
    const N = totalPages;
    const totalSteps = N + 1; // Step 0 = Cover, Steps 1..N = Projects 0..N-1

    const inputStart = (i + 1) / totalSteps;
    const inputEnd   = (i + 2) / totalSteps;

    const pageProgress = useTransform(
        scrollYProgress,
        [inputStart, inputEnd],
        [0, 1],
        { clamp: true }
    );

    // Paper-curl easing for turning right page:
    // Maps pageProgress [0, 0.3, 0.6, 0.85, 1] → rotateY [0, -22, -99, -158, -180]
    const rotateY = useTransform(
        pageProgress,
        [0,   0.3,  0.6,  0.85, 1  ],
        [0,  -22,  -99, -158, -180 ]
    );

    // Curl shadow: peaks when page is mid-turn
    const curlOpacity = useTransform(pageProgress, (p) => Math.sin(p * Math.PI));

    // Left Panel visibility & z-index:
    // Future projects (step < i + 1): opacity 0, zIndex 0 (prevents bleeding through)
    // Active/Past projects (step >= i + 1): opacity 1, zIndex (i + 1) * 10
    const leftPanelOpacity = useTransform(scrollYProgress, (progress) => {
        const currentStep = progress * totalSteps;
        return currentStep >= (i + 1) ? 1 : 0;
    });

    const leftPanelZIndex = useTransform(scrollYProgress, (progress) => {
        const currentStep = progress * totalSteps;
        if (currentStep >= (i + 1)) {
            return (i + 1) * 10;
        }
        return 0;
    });

    // Z-index stacking for turning right leaf:
    //   Turning  (0 < p < 1): (i + 1) * 10 + 5 (on top of active left panel)
    //   Turned   (p >= 1)   : (i + 1) * 10 + 2 (on top of static left panel i)
    //   Untouched(p <= 0)   : N - i
    const rightLeafZIndex = useTransform(pageProgress, (p) => {
        if (p > 0 && p < 1) return (i + 1) * 10 + 5;
        if (p >= 1)          return (i + 1) * 10 + 2;
        return N - i;
    });

    const halfWidth  = stageWidth / 2;
    const classLabel = getClassificationLabel(project);
    const caseNumber = String(i + 1).padStart(3, '0');

    const nextClassLabel = nextProject ? getClassificationLabel(nextProject) : '';
    const nextCaseNumber = String(i + 2).padStart(3, '0');

    const leftPanelPointerEvents = useTransform(leftPanelOpacity, (op) => (op > 0.1 ? 'auto' : 'none'));
    const rightLeafPointerEvents = useTransform(pageProgress, (p) => (p >= 0 && p < 0.95 ? 'auto' : 'none'));

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                width: stageWidth,
                height: stageHeight,
                pointerEvents: 'none',
            }}
        >
            {/* ── LEFT PANEL OF BINDER STAGE (Identity of project i) ───────────── */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: halfWidth,
                    height: stageHeight,
                    zIndex: leftPanelZIndex,
                    opacity: leftPanelOpacity,
                    pointerEvents: leftPanelPointerEvents,
                }}
            >
                <CaseFileFront
                    project={project}
                    caseNumber={caseNumber}
                    classificationLabel={classLabel}
                    isTablet={isTablet}
                />
            </motion.div>

            {/* ── TURNING RIGHT LEAF (Rotates 180° around spine) ─────────────────── */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',                  // anchored to center spine
                    width: halfWidth,
                    height: stageHeight,
                    transformOrigin: 'left center', // rotates around spine
                    transformStyle: 'preserve-3d',
                    rotateY,
                    zIndex: rightLeafZIndex,
                    pointerEvents: rightLeafPointerEvents,
                    willChange: 'transform',
                }}
            >
                {/* ── FRONT FACE OF LEAF (0 to -90°): Depth of Current Project ────── */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                >
                    <CaseFileBack
                        project={project}
                        caseNumber={caseNumber}
                    />
                </div>

                {/* ── BACK FACE OF LEAF (-90 to -180°): Identity of Next Project ──── */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                >
                    {nextProject ? (
                        <CaseFileFront
                            project={nextProject}
                            caseNumber={nextCaseNumber}
                            classificationLabel={nextClassLabel}
                            isTablet={isTablet}
                        />
                    ) : (
                        <CaseFileEndBack isTablet={isTablet} />
                    )}
                </div>

                {/* ── PAPER CURL SHADOW ────────────────────────────────── */}
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
            </motion.div>
        </div>
    );
};
