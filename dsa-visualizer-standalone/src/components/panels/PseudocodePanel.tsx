'use client';

import { useEffect, useRef } from 'react';
import type { AlgorithmDefinition } from '../../engine/types';

interface PseudocodePanelProps {
  algorithm: AlgorithmDefinition | null;
  activeLine?: number;
}

export function PseudocodePanel({ algorithm, activeLine }: PseudocodePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeLine]);

  if (!algorithm || !algorithm.pseudocode || algorithm.pseudocode.length === 0) {
    return (
      <div style={{ padding: '16px', color: 'var(--muted, #64748b)', fontSize: '0.9rem', fontStyle: 'italic' }}>
        No pseudocode available.
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{
        background: '#1e1e1e',
        color: '#d4d4d4',
        borderRadius: 'var(--radius-lg, 12px)',
        padding: '12px 0',
        fontFamily: 'monospace',
        fontSize: '0.85rem',
        overflowY: 'auto',
        maxHeight: '300px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {algorithm.pseudocode.map((line, idx) => {
        const isActive = activeLine === idx;
        return (
          <div
            key={idx}
            ref={isActive ? activeLineRef : null}
            style={{
              display: 'flex',
              padding: '2px 16px',
              background: isActive ? 'rgba(85, 119, 255, 0.2)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--blue, #3b82f6)' : '4px solid transparent',
              transition: 'background 0.2s ease'
            }}
          >
            <span style={{ 
              color: '#858585', 
              minWidth: '24px', 
              display: 'inline-block', 
              userSelect: 'none',
              textAlign: 'right',
              marginRight: '16px'
            }}>
              {idx + 1}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>{line}</span>
          </div>
        );
      })}
    </div>
  );
}
