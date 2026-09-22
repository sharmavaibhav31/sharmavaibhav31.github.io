'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ExplanationPanelProps {
  message?: string;
}

export function ExplanationPanel({ message }: ExplanationPanelProps) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 'var(--radius-lg, 12px)',
      padding: '16px',
      border: '1px solid var(--line, #e2e8f0)',
      boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.05))',
      minHeight: '100px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink, #0f172a)', marginBottom: '8px' }}>Explanation</h3>
      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'flex-start' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={message || 'empty'}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{ 
              color: message ? 'var(--text, #1e293b)' : 'var(--muted, #64748b)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              fontWeight: message ? 600 : 500,
              fontStyle: message ? 'normal' : 'italic'
            }}
          >
            {message || 'Select an algorithm and press play to see step-by-step explanations.'}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
