'use client';

import type { AlgorithmDefinition } from '../../engine/types';

interface ComplexityPanelProps {
  algorithm: AlgorithmDefinition | null;
}

export function ComplexityPanel({ algorithm }: ComplexityPanelProps) {
  if (!algorithm) return null;

  const getComplexityColor = (comp: string) => {
    if (comp.includes('1') || comp.includes('log n')) return 'var(--success, #10b981)';
    if (comp.includes('n') && !comp.includes('^2') && !comp.includes('^')) return '#f59e0b';
    return '#ef4444';
  };

  const { timeComplexity, spaceComplexity } = algorithm;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 'var(--radius-lg, 12px)',
      padding: '16px',
      border: '1px solid var(--line, #e2e8f0)',
      boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.05))'
    }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink, #0f172a)', marginBottom: '12px' }}>Complexity</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted, #64748b)', fontWeight: 700 }}>Best</span>
          <span style={{ fontFamily: 'monospace', fontWeight: 600, color: getComplexityColor(timeComplexity.best) }}>{timeComplexity.best}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted, #64748b)', fontWeight: 700 }}>Average</span>
          <span style={{ fontFamily: 'monospace', fontWeight: 600, color: getComplexityColor(timeComplexity.average) }}>{timeComplexity.average}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--muted, #64748b)', fontWeight: 700 }}>Worst</span>
          <span style={{ fontFamily: 'monospace', fontWeight: 600, color: getComplexityColor(timeComplexity.worst) }}>{timeComplexity.worst}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--line, #e2e8f0)', paddingTop: '12px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--muted, #64748b)', fontWeight: 700 }}>Space Complexity</span>
        <span style={{ fontFamily: 'monospace', fontWeight: 600, color: getComplexityColor(spaceComplexity) }}>{spaceComplexity}</span>
      </div>
    </div>
  );
}
