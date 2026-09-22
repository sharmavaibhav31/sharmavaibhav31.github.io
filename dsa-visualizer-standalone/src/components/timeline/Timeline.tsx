'use client';

import { useRef, useEffect } from 'react';

interface TimelineProps {
  totalSteps: number;
  currentStep: number;
  onJumpToStep: (step: number) => void;
}

export function Timeline({ totalSteps, currentStep, onJumpToStep }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isCondensed = totalSteps > 100;

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [currentStep]);

  if (totalSteps === 0) {
    return null;
  }

  const dots = isCondensed 
    ? Array.from({ length: 100 }, (_, i) => Math.floor(i * (totalSteps / 100)))
    : Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div style={{
      width: '100%',
      overflowX: 'auto',
      padding: '16px 0',
      display: 'flex',
      alignItems: 'center',
      gap: isCondensed ? '2px' : '8px',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    }} ref={scrollRef}>
      {dots.map((stepIndex, i) => {
        const isPast = stepIndex < currentStep;
        const isActive = stepIndex === currentStep || (isCondensed && currentStep >= stepIndex && currentStep < (dots[i+1] || totalSteps));
        
        let bgColor = 'var(--line, #e2e8f0)';
        if (isActive) bgColor = 'var(--blue, #3b82f6)';
        else if (isPast) bgColor = 'var(--mint, #10b981)';
        
        return (
          <button
            key={i}
            data-active={isActive}
            onClick={() => onJumpToStep(stepIndex)}
            style={{
              flex: '0 0 auto',
              width: isCondensed ? '4px' : '12px',
              height: isActive ? '16px' : (isCondensed ? '8px' : '12px'),
              borderRadius: '999px',
              background: bgColor,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: (isPast && !isActive) ? 0.6 : 1,
            }}
            title={`Step ${stepIndex + 1}`}
          />
        );
      })}
    </div>
  );
}
