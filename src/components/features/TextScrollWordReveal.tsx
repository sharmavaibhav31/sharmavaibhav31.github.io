// TextScrollWordReveal.tsx
// Scroll-driven word highlight reveal for Deployment History section.

import { Fragment, useRef } from 'react';
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
} from 'framer-motion';

const DEFAULT_STATEMENT =
    "Animation should never make you wait. It should reveal the next idea at exactly the moment you are ready to read it.";
const START_OPACITY = 0.15;
const SPREAD = 0.8;
const WORD_DURATION = 0.2;

export interface WordProgressRange {
    start: number;
    end: number;
}

export function getWordProgressRange(
    index: number,
    count: number,
): WordProgressRange {
    const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;

    return {
        start,
        end: Math.min(1, start + WORD_DURATION),
    };
}

export function getWordOpacity(
    progress: number,
    { start, end }: WordProgressRange,
    startOpacity = START_OPACITY,
): number {
    if (progress <= start) return startOpacity;
    if (progress >= end) return 1;

    const wordProgress = (progress - start) / (end - start);
    return startOpacity + (1 - startOpacity) * wordProgress;
}

function Word({
    children,
    progress,
    index,
    count,
    reducedMotion,
}: {
    children: string;
    progress: MotionValue<number>;
    index: number;
    count: number;
    reducedMotion: boolean;
}) {
    const range = getWordProgressRange(index, count);
    const opacity = useTransform(progress, (latest) =>
        getWordOpacity(latest, range),
    );

    return (
        <motion.span
            aria-hidden="true"
            style={reducedMotion ? undefined : { opacity }}
        >
            {children}
        </motion.span>
    );
}

interface TextScrollWordRevealProps {
    statement?: string;
    kicker?: string;
    className?: string;
}

export default function TextScrollWordReveal({
    statement = DEFAULT_STATEMENT,
    kicker = "// DEPLOYMENT PHILOSOPHY",
    className = "",
}: TextScrollWordRevealProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "end 20%"],
    });
    const words = statement.split(" ");

    return (
        <>
            <section
                ref={sectionRef}
                className={`scroll-word-reveal ${className}`}
                aria-labelledby="scroll-word-reveal-heading"
            >
                <div className="scroll-word-reveal__stage">
                    <div className="scroll-word-reveal__layout">
                        <div className="scroll-word-reveal__progress" aria-hidden="true">
                            <motion.span
                                style={{ scaleY: reducedMotion ? 1 : scrollYProgress }}
                            />
                        </div>

                        <div className="scroll-word-reveal__content">
                            <p className="scroll-word-reveal__kicker">{kicker}</p>
                            <h2
                                id="scroll-word-reveal-heading"
                                className="scroll-word-reveal__heading"
                                aria-label={statement}
                            >
                                {words.map((word, index) => (
                                    <Fragment key={`${word}-${index}`}>
                                        <Word
                                            progress={scrollYProgress}
                                            index={index}
                                            count={words.length}
                                            reducedMotion={Boolean(reducedMotion)}
                                        >
                                            {word}
                                        </Word>
                                        {index < words.length - 1 ? " " : null}
                                    </Fragment>
                                ))}
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
            <Stylesheet />
        </>
    );
}

function Stylesheet() {
    return (
        <style>{`
      .scroll-word-reveal {
        width: 100%;
        padding: 24px 0 16px 0;
        background: transparent;
        color: var(--text-primary);
        font-family: inherit;
        -webkit-font-smoothing: antialiased;
      }

      .scroll-word-reveal__stage {
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        padding: 12px 0;
      }

      .scroll-word-reveal__layout {
        width: 100%;
        display: grid;
        grid-template-columns: 2px minmax(0, 1fr);
        align-items: start;
        gap: 20px;
        margin: 0;
      }

      .scroll-word-reveal__progress {
        position: relative;
        width: 2px;
        height: 100%;
        min-height: 70px;
        overflow: hidden;
        background: var(--border-default);
      }

      .scroll-word-reveal__progress span {
        position: absolute;
        inset: 0;
        display: block;
        background: var(--accent-green);
        transform-origin: top;
      }

      .scroll-word-reveal__content {
        max-width: 900px;
      }

      .scroll-word-reveal__kicker {
        margin: 0 0 12px;
        color: var(--accent-green);
        font-family: monospace;
        font-size: 10px;
        letter-spacing: 0.16em;
        line-height: 1;
        text-transform: uppercase;
      }

      .scroll-word-reveal__heading {
        margin: 0;
        color: var(--text-primary);
        font-family: sans-serif;
        font-size: clamp(20px, 2.8vw, 32px);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.3;
      }

      @media (max-width: 600px) {
        .scroll-word-reveal__stage {
          padding: 8px 0;
        }

        .scroll-word-reveal__layout {
          grid-template-columns: 1fr;
          gap: 0;
        }

        .scroll-word-reveal__progress {
          display: none;
        }

        .scroll-word-reveal__kicker {
          margin-bottom: 10px;
        }
      }
    `}</style>
    );
}
