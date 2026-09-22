'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface VariablePanelProps {
  variables: Record<string, string | number>;
}

export function VariablePanel({ variables }: VariablePanelProps) {
  const entries = Object.entries(variables);

  if (entries.length === 0) {
    return (
      <div style={{ padding: '16px', color: 'var(--muted, #64748b)', fontSize: '0.9rem', fontStyle: 'italic' }}>
        No active variables.
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 'var(--radius-lg, 12px)',
      padding: '16px',
      border: '1px solid var(--line, #e2e8f0)',
      boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.05))'
    }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink, #0f172a)', marginBottom: '12px' }}>Variables</h3>
      <div style={{ display: 'grid', gap: '8px' }}>
        {entries.map(([key, value]) => (
          <div key={key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            background: 'var(--white, #ffffff)',
            borderRadius: '8px',
            border: '1px solid var(--line, #e2e8f0)'
          }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--blue-dark, #1d4ed8)' }}>{key}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={String(value)}
                initial={{ opacity: 0, scale: 0.8, color: 'var(--blue, #3b82f6)' }}
                animate={{ opacity: 1, scale: 1, color: 'var(--ink, #0f172a)' }}
                exit={{ opacity: 0, scale: 1.2, position: 'absolute' }}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: 'monospace', fontWeight: 600, background: 'var(--surface-solid, #f8fafc)', padding: '2px 8px', borderRadius: '4px' }}
              >
                {value}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
