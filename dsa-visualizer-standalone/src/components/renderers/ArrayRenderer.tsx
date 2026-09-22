'use client';

import { motion } from 'framer-motion';
import type { AnimationStep } from '../../engine/types';

interface ArrayRendererProps {
  array: number[];
  step: AnimationStep;
  steps: AnimationStep[];
  currentIndex: number;
  originalArray: number[];
  category?: string;
}

export function ArrayRenderer({
  array,
  step,
  steps,
  currentIndex,
  originalArray,
  category = 'Sorting'
}: ArrayRendererProps) {
  const isSorting = category.toLowerCase() === 'sorting';
  const maxValue = Math.max(...(originalArray.length > 0 ? originalArray : [100]));

  const getPermutation = () => {
    const perm = Array.from({ length: originalArray.length }, (_, i) => i);
    for (let s = 0; s <= currentIndex; s++) {
      const currentStep = steps[s];
      if (currentStep && currentStep.swap) {
        const [a, b] = currentStep.swap;
        const temp = perm[a];
        perm[a] = perm[b];
        perm[b] = temp;
      }
    }
    return perm;
  };

  const permutation = getPermutation();

  const items = array.map((value, currentIndex) => {
    const originalIndex = permutation[currentIndex] !== undefined ? permutation[currentIndex] : currentIndex;
    
    let state: 'default' | 'highlight' | 'swap' | 'sorted' | 'pivot' = 'default';
    
    if (step.swap && step.swap.includes(currentIndex)) {
      state = 'swap';
    } else if (step.highlight && step.highlight.includes(currentIndex)) {
      state = 'highlight';
    } else if (step.pivot && step.pivot.includes(currentIndex)) {
      state = 'pivot';
    } else if (step.sorted && step.sorted.includes(currentIndex)) {
      state = 'sorted';
    }

    return {
      id: `element-${originalIndex}`,
      value,
      currentIndex,
      state
    };
  });

  const getColor = (state: 'default' | 'highlight' | 'swap' | 'sorted' | 'pivot') => {
    switch (state) {
      case 'highlight':
        return '#f59e0b';
      case 'swap':
        return '#ef4444';
      case 'sorted':
        return '#10b981';
      case 'pivot':
        return '#8b5cf6';
      default:
        return 'rgba(59, 130, 246, 0.4)';
    }
  };

  const transition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8
  };

  if (isSorting) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 'var(--radius-lg, 12px)',
        border: '1px solid var(--line, #e2e8f0)',
        minHeight: '300px'
      }}>
        {items.map((item) => {
          const heightPercent = Math.max(8, (item.value / maxValue) * 100);
          const widthPercent = 100 / items.length;
          
          return (
            <motion.div
              key={item.id}
              layout
              transition={transition}
              style={{
                width: `calc(${widthPercent}% - 4px)`,
                margin: '0 2px',
                height: `${heightPercent}%`,
                background: getColor(item.state),
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: item.state !== 'default' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {items.length <= 20 && (
                <span style={{
                  position: 'absolute',
                  top: '-24px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: item.state !== 'default' ? 'var(--ink, #0f172a)' : 'var(--muted, #64748b)'
                }}>
                  {item.value}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      justifyContent: 'center',
      padding: '24px',
      background: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 'var(--radius-lg, 12px)',
      border: '1px solid var(--line, #e2e8f0)',
      minHeight: '150px',
      alignItems: 'center'
    }}>
      {items.map((item) => (
        <motion.div
          key={item.id}
          layout
          transition={transition}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            background: getColor(item.state),
            border: '1px solid var(--line, #e2e8f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: item.state === 'default' ? 'var(--ink, #0f172a)' : 'var(--white, #ffffff)',
            boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.05))'
          }}>
            {item.value}
          </div>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--muted, #64748b)',
            fontWeight: 700
          }}>
            {item.currentIndex}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
