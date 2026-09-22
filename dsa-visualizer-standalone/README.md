# Data Structures & Algorithms (DSA) Visualizer

An interactive, step-by-step visualizer for core Data Structures and Algorithms built with React, TypeScript, and Framer Motion.

## Features

- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort with animated bar height swap mechanics.
- **Linear Data Structures**:
  - **Stack**: Push, Pop, Peek operations with overflow/underflow detection and vertical bucket visualization.
  - **Linear Queue**: Enqueue, Dequeue with FIFO left-shift animations.
  - **Circular Queue**: Wrapped index circular track rendering.
- **Playback Engine**: Play, Pause, Jump to Step, Variable tracking, Step explanation timeline, Pseudocode line highlighting, Time & Space Complexity indicators.
- **Zero Platform Lock-in**: Completely standalone and pluggable into any React, Next.js, or Vite application.

## Installation & Setup

1. Copy or install `dsa-visualizer-standalone` into your project directory.
2. Install required peer & core dependencies:

```bash
npm install framer-motion lucide-react
```

## Usage

Simply import and render `<DSAVisualizer />` in any React / Next.js client component or page:

```tsx
'use client';

import { DSAVisualizer } from './dsa-visualizer-standalone';

export default function VisualizerPage() {
  return <DSAVisualizer />;
}
```

## Extending / Adding New Algorithms

To add a new sorting or data structure algorithm:

1. Create a new definition file under `src/engine/algorithms/`.
2. Implement the `AlgorithmDefinition` interface (`id`, `name`, `category`, `pseudocode`, `timeComplexity`, `spaceComplexity`, `generate`).
3. Register it in `src/engine/registry.ts` via `registerAlgorithm(yourNewAlgorithm)`.

## Technical Stack

- **React 18 / 19**
- **TypeScript**
- **Framer Motion** (smooth spring layouts and component animations)
- **Lucide React** (icons)
