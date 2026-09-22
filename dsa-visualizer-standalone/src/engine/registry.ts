import type { AlgorithmDefinition } from './types';
import { bubbleSort } from './algorithms/sorting/bubbleSort';
import { selectionSort } from './algorithms/sorting/selectionSort';
import { insertionSort } from './algorithms/sorting/insertionSort';
import { stack } from './algorithms/linear/stack';
import { linearQueue, circularQueue } from './algorithms/linear/queue';

const registry = new Map<string, AlgorithmDefinition>();

// Register algorithms
registerAlgorithm(bubbleSort);
registerAlgorithm(selectionSort);
registerAlgorithm(insertionSort);
registerAlgorithm(stack);
registerAlgorithm(linearQueue);
registerAlgorithm(circularQueue);

export function registerAlgorithm(def: AlgorithmDefinition): void {
  registry.set(def.id, def);
}

export function getAlgorithm(id: string): AlgorithmDefinition | null {
  return registry.get(id) || null;
}

export function getAllAlgorithms(): AlgorithmDefinition[] {
  return Array.from(registry.values());
}
