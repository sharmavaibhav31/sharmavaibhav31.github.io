export interface AnimationStep {
  // indices to highlight (element is "active/comparing")
  highlight: number[];
  // pairs to show as "swapping" with visual swap animation
  swap?: [number, number];
  // mark these indices as permanently "sorted/done"
  sorted?: number[];
  // mark these indices as "pivot" (sorting specific)
  pivot?: number[];
  // current variable values to show in variable panel
  variables: Record<string, string | number>;
  // human-readable explanation of this step
  message: string;
  // which line of pseudocode is active (0-indexed)
  activeLine?: number;
  // optional: tree/graph specific node states
  nodeStates?: Record<string, NodeState>;
  // optional: edge states for graphs
  edgeStates?: Record<string, EdgeState>;
}

export type NodeState =
  | 'default'
  | 'visiting'
  | 'visited'
  | 'current'
  | 'comparing'
  | 'inserted'
  | 'deleted';

export type EdgeState =
  | 'default'
  | 'traversed'
  | 'current';

export interface TreeNode {
  id: string;
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

export interface GraphDefinition {
  nodes: string[];
  edges: [string, string][];
}

export interface AlgorithmDefinition {
  id: string;
  name: string;
  category: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  pseudocode: string[];  // one line per index, matches activeLine
  description: string;
  // given input, return the full step sequence
  generate: (input: AlgorithmInput) => AnimationStep[];
}

export interface AlgorithmInput {
  array?: number[];
  tree?: TreeNode;
  graph?: GraphDefinition;
  target?: number;
}
