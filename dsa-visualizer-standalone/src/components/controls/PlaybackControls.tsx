'use client';

import { type PlaybackState, next, previous, jumpTo, setSpeed } from '../../engine/playback';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface PlaybackControlsProps {
  state: PlaybackState;
  onStateChange: (newState: PlaybackState) => void;
}

export function PlaybackControls({ state, onStateChange }: PlaybackControlsProps) {
  const handlePlayPause = () => {
    onStateChange({
      ...state,
      isPlaying: !state.isPlaying
    });
  };

  const handlePrevious = () => {
    onStateChange(previous(state));
  };

  const handleNext = () => {
    onStateChange(next(state));
  };

  const handleRestart = () => {
    onStateChange(jumpTo({ ...state, isPlaying: false }, 0));
  };

  const speeds = [0.25, 0.5, 1, 2, 4];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleRestart}
          title="Restart"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--ink, #0f172a)'
          }}
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={handlePrevious}
          disabled={state.currentIndex === 0}
          title="Previous Step"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: state.currentIndex === 0 ? 'not-allowed' : 'pointer',
            padding: '8px',
            color: state.currentIndex === 0 ? 'var(--muted, #64748b)' : 'var(--ink, #0f172a)'
          }}
        >
          <SkipBack size={20} />
        </button>
        <button
          onClick={handlePlayPause}
          title={state.isPlaying ? "Pause" : "Play"}
          style={{
            background: 'var(--blue, #3b82f6)',
            border: 'none',
            borderRadius: '999px',
            cursor: 'pointer',
            padding: '12px',
            color: 'var(--white, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            boxShadow: 'var(--soft-shadow, 0 4px 6px -1px rgba(0,0,0,0.1))'
          }}
        >
          {state.isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>
        <button
          onClick={handleNext}
          disabled={state.currentIndex >= state.steps.length - 1}
          title="Next Step"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: state.currentIndex >= state.steps.length - 1 ? 'not-allowed' : 'pointer',
            padding: '8px',
            color: state.currentIndex >= state.steps.length - 1 ? 'var(--muted, #64748b)' : 'var(--ink, #0f172a)'
          }}
        >
          <SkipForward size={20} />
        </button>
      </div>

      <div style={{ fontSize: '0.9rem', color: 'var(--muted, #64748b)', fontWeight: 600, minWidth: '100px' }}>
        Step {state.currentIndex + 1} of {Math.max(1, state.steps.length)}
      </div>

      <div style={{
        display: 'flex',
        background: 'var(--surface-solid, #f8fafc)',
        borderRadius: '999px',
        padding: '4px',
        gap: '2px',
        border: '1px solid var(--line, #e2e8f0)'
      }}>
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => onStateChange(setSpeed(state, s))}
            style={{
              background: state.speed === s ? 'var(--white, #ffffff)' : 'transparent',
              border: 'none',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: state.speed === s ? 'var(--blue-dark, #1d4ed8)' : 'var(--muted, #64748b)',
              boxShadow: state.speed === s ? 'var(--soft-shadow, 0 1px 3px rgba(0,0,0,0.1))' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
