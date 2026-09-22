'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { AnimationStep } from '../../engine/types';

interface StackRendererProps {
  array: number[];
  step: AnimationStep;
}

export function StackRenderer({ array, step }: StackRendererProps) {
  const isEmpty = array.length === 0;

  const isUnderflow = step.message.toLowerCase().includes('underflow');
  const isOverflow = step.message.toLowerCase().includes('overflow');

  const stackItems = [...array].reverse().map((value, idx) => {
    const originalIndex = array.length - 1 - idx;
    const isTop = originalIndex === array.length - 1;
    const isHighlighted = step.highlight && step.highlight.includes(originalIndex);
    
    return {
      key: `stack-item-${originalIndex}-${value}`,
      value,
      isTop,
      isHighlighted
    };
  });

  const getCellColor = (item: typeof stackItems[0]) => {
    if (isUnderflow) return '#ef4444';
    if (isOverflow) return '#ef4444';
    if (item.isHighlighted) return '#f59e0b';
    return 'var(--blue, #3b82f6)';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '100%',
      width: '100%',
      minHeight: '320px',
      padding: '24px',
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 'var(--radius-lg, 12px)',
      border: '1px solid var(--line, #e2e8f0)',
      position: 'relative'
    }}>
      <div style={{
        borderLeft: '4px solid var(--ink, #0f172a)',
        borderRight: '4px solid var(--ink, #0f172a)',
        borderBottom: '4px solid var(--ink, #0f172a)',
        borderRadius: '0 0 12px 12px',
        width: '180px',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '8px',
        gap: '8px',
        background: 'rgba(0, 0, 0, 0.02)',
        position: 'relative'
      }}>
        <AnimatePresence initial={false}>
          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isUnderflow ? '#ef4444' : 'var(--muted, #64748b)',
                fontStyle: 'italic',
                fontWeight: 600,
                textAlign: 'center',
                padding: '16px',
                fontSize: '0.9rem'
              }}
            >
              {isUnderflow ? 'Underflow State' : 'Stack is Empty'}
            </motion.div>
          ) : (
            stackItems.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  height: '44px',
                  width: '100%',
                  background: getCellColor(item),
                  color: 'var(--white, #ffffff)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  position: 'relative',
                  boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.05))',
                  border: '1px solid rgba(0, 0, 0, 0.1)'
                }}
              >
                {item.value}
                
                {item.isTop && (
                  <div style={{
                    position: 'absolute',
                    right: '105%',
                    whiteSpace: 'nowrap',
                    color: 'var(--blue-dark, #1d4ed8)',
                    fontWeight: 850,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    TOP &rarr;
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      <div style={{
        marginTop: '8px',
        fontSize: '0.85rem',
        fontWeight: 800,
        color: 'var(--muted, #64748b)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Stack Base
      </div>
    </div>
  );
}
