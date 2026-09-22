import type { AnimationStep } from './types';

export interface PlaybackState {
  steps: AnimationStep[];
  currentIndex: number;
  isPlaying: boolean;
  speed: number;  // 0.25 | 0.5 | 1 | 2 | 4
}

export function createPlaybackState(steps: AnimationStep[]): PlaybackState {
  return {
    steps: [...steps], // Copy to ensure immutability
    currentIndex: 0,
    isPlaying: false,
    speed: 1,
  };
}

export function next(state: PlaybackState): PlaybackState {
  const nextIndex = Math.min(state.currentIndex + 1, state.steps.length - 1);
  return {
    ...state,
    currentIndex: nextIndex,
    isPlaying: nextIndex === state.steps.length - 1 ? false : state.isPlaying
  };
}

export function previous(state: PlaybackState): PlaybackState {
  return {
    ...state,
    currentIndex: Math.max(state.currentIndex - 1, 0)
  };
}

export function jumpTo(state: PlaybackState, index: number): PlaybackState {
  const targetIndex = Math.max(0, Math.min(index, state.steps.length - 1));
  return {
    ...state,
    currentIndex: targetIndex,
    isPlaying: targetIndex === state.steps.length - 1 ? false : state.isPlaying
  };
}

export function setSpeed(state: PlaybackState, speed: number): PlaybackState {
  return {
    ...state,
    speed
  };
}
