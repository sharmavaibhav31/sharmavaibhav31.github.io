'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { AnimationStep } from '../../engine/types';

interface QueueRendererProps {
  array: number[];
  step: AnimationStep;
  isCircular?: boolean;
}

export function QueueRenderer({ array, step, isCircular = false }: QueueRendererProps) {
  const isCircularMode = isCircular || array.length === 10;
  
  const isUnderflow = step.message.toLowerCase().includes('underflow');
  const isOverflow = step.message.toLowerCase().includes('overflow');

  const getCellColor = (isHighlighted: boolean, isEmptyCircularSlot: boolean) => {
    if (isUnderflow || isOverflow) return '#ef4444';
    if (isEmptyCircularSlot) return 'rgba(20, 32, 51, 0.05)';
    if (isHighlighted) return '#f59e0b';
    return 'var(--blue, #3b82f6)';
  };

  if (isCircularMode) {
    const front = array[0];
    const rear = array[1];
    const slots = array.slice(2);
    const capacity = 8;
    const radius = 100;
    const centerX = 150;
    const centerY = 150;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 'var(--radius-lg, 12px)',
        border: '1px solid var(--line, #e2e8f0)',
        minHeight: '380px',
        width: '100%'
      }}>
        <div style={{
          width: '320px',
          height: '320px',
          position: 'relative',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
          borderRadius: '50%'
        }}>
          <div style={{
            position: 'absolute',
            top: `${centerY - radius}px`,
            left: `${centerX - radius}px`,
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            border: '2px dashed var(--line, #e2e8f0)',
            borderRadius: '50%',
            pointerEvents: 'none',
            opacity: 0.5
          }} />

          {slots.map((value, idx) => {
            const angle = (idx * 360 / capacity) * (Math.PI / 180);
            const x = centerX + radius * Math.cos(angle) - 24;
            const y = centerY + radius * Math.sin(angle) - 24;
            
            const isEmpty = value === -999;
            const isFront = idx === front;
            const isRear = idx === rear;
            const isHighlighted = step.highlight && step.highlight.includes(idx + 2);

            return (
              <motion.div
                key={`circular-${idx}`}
                layout
                style={{
                  position: 'absolute',
                  left: `${x}px`,
                  top: `${y}px`,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: getCellColor(isHighlighted, isEmpty),
                  border: isFront || isRear ? '2px solid var(--ink, #0f172a)' : '1px solid var(--line, #e2e8f0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: isEmpty ? 'var(--muted, #64748b)' : 'var(--white, #ffffff)',
                  boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.05))',
                  zIndex: 2
                }}
              >
                {isEmpty ? '' : value}

                <span style={{
                  position: 'absolute',
                  fontSize: '0.65rem',
                  color: 'var(--muted, #64748b)',
                  top: '-16px',
                  fontWeight: 700
                }}>
                  [{idx}]
                </span>

                {isFront && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-22px',
                    background: 'var(--blue-dark, #1d4ed8)',
                    color: 'var(--white, #ffffff)',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    F
                  </div>
                )}
                {isRear && (
                  <div style={{
                    position: 'absolute',
                    bottom: isFront ? '-38px' : '-22px',
                    background: 'var(--mint, #10b981)',
                    color: 'var(--ink, #0f172a)',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    R
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '0.8rem', fontWeight: 700 }}>
          <span style={{ color: 'var(--blue-dark, #1d4ed8)' }}>F = FRONT</span>
          <span style={{ color: 'var(--mint, #10b981)' }}>R = REAR</span>
        </div>
      </div>
    );
  }

  const isDeletedPlaceholder = array.length > 0 && array[0] === -999;
  const displayQueue = array.filter(v => v !== -999);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 'var(--radius-lg, 12px)',
      border: '1px solid var(--line, #e2e8f0)',
      minHeight: '260px',
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80px',
        width: '100%',
        maxWidth: '600px',
        border: '3px solid var(--ink, #0f172a)',
        borderLeft: 'none',
        borderRight: 'none',
        padding: '12px',
        background: 'rgba(0,0,0,0.01)',
        position: 'relative',
        gap: '8px'
      }}>
        <div style={{ position: 'absolute', right: '-40px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted, #64748b)' }}>
          IN &rarr;
        </div>
        <div style={{ position: 'absolute', left: '-40px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted, #64748b)' }}>
          &larr; OUT
        </div>

        <AnimatePresence initial={false}>
          {displayQueue.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                color: isUnderflow ? '#ef4444' : 'var(--muted, #64748b)',
                fontStyle: 'italic',
                fontWeight: 650,
                fontSize: '0.95rem'
              }}
            >
              {isUnderflow ? 'Underflow State' : 'Queue is Empty'}
            </motion.div>
          ) : (
            displayQueue.map((value, idx) => {
              const isFront = idx === 0;
              const isRear = idx === displayQueue.length - 1;
              const isHighlighted = step.highlight && step.highlight.includes(isDeletedPlaceholder ? idx + 1 : idx);

              return (
                <motion.div
                  key={`linear-${idx}-${value}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '8px',
                    background: getCellColor(isHighlighted, false),
                    color: 'var(--white, #ffffff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    position: 'relative',
                    boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.05))',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {value}

                  <span style={{
                    position: 'absolute',
                    fontSize: '0.65rem',
                    color: 'var(--muted, #64748b)',
                    bottom: '-18px',
                    fontWeight: 700
                  }}>
                    [{idx}]
                  </span>

                  {isFront && (
                    <div style={{
                      position: 'absolute',
                      top: '-24px',
                      color: 'var(--blue-dark, #1d4ed8)',
                      fontWeight: 850,
                      fontSize: '0.7rem'
                    }}>
                      FRONT
                    </div>
                  )}
                  {isRear && (
                    <div style={{
                      position: 'absolute',
                      top: isFront ? '-38px' : '-24px',
                      color: 'var(--mint, #10b981)',
                      fontWeight: 850,
                      fontSize: '0.7rem'
                    }}>
                      REAR
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
