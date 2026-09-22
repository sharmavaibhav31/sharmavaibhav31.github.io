'use client';

import { useState } from 'react';
import { Settings, RefreshCw, AlertCircle } from 'lucide-react';

interface InputControlsProps {
  onGenerate: (input: number[]) => void;
  disabled?: boolean;
}

export function InputControls({ onGenerate, disabled }: InputControlsProps) {
  const [mode, setMode] = useState<'random' | 'manual' | 'sorted' | 'reverse'>('random');
  const [size, setSize] = useState(16);
  const [manualInput, setManualInput] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = () => {
    setError('');
    
    if (mode === 'manual') {
      const arr = manualInput.split(',').map(s => s.trim()).filter(s => s !== '');
      if (arr.length === 0) {
        setError('Please enter some numbers.');
        return;
      }
      
      const nums = arr.map(Number);
      if (nums.some(isNaN)) {
        setError('Input contains invalid numbers. Use comma-separated values.');
        return;
      }
      onGenerate(nums);
    } else {
      let arr = Array.from({ length: size }, () => Math.floor(Math.random() * 99) + 1);
      
      if (mode === 'sorted') {
        arr.sort((a, b) => a - b);
      } else if (mode === 'reverse') {
        arr.sort((a, b) => b - a);
      }
      
      onGenerate(arr);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '16px',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 'var(--radius-lg, 12px)',
      border: '1px solid var(--line, #e2e8f0)',
      boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.05))'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink, #0f172a)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} />
          Input Settings
        </h3>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {(['random', 'manual', 'sorted', 'reverse'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            disabled={disabled}
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              border: mode === m ? '1px solid var(--blue, #3b82f6)' : '1px solid var(--line, #e2e8f0)',
              background: mode === m ? 'var(--surface-solid, #f8fafc)' : 'var(--white, #ffffff)',
              color: mode === m ? 'var(--blue-dark, #1d4ed8)' : 'var(--muted, #64748b)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: disabled ? 'not-allowed' : 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === 'manual' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            disabled={disabled}
            placeholder="e.g. 5, 2, 9, 1, 5, 6"
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--line, #e2e8f0)',
              fontSize: '0.9rem',
              fontFamily: 'monospace',
              background: 'var(--white, #ffffff)'
            }}
          />
          {error && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={14} color="#ef4444"/> <span>{error}</span></span>}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted, #64748b)' }}>
            <span>Array Size</span>
            <span>{size} elements</span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            disabled={disabled}
            style={{ width: '100%', cursor: disabled ? 'not-allowed' : 'pointer' }}
          />
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={disabled}
        style={{
          marginTop: '8px',
          padding: '10px',
          borderRadius: '8px',
          background: 'var(--blue, #3b82f6)',
          color: 'var(--white, #ffffff)',
          border: 'none',
          fontWeight: 800,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.1))'
        }}
      >
        <RefreshCw size={18} />
        Generate Input
      </button>
    </div>
  );
}
