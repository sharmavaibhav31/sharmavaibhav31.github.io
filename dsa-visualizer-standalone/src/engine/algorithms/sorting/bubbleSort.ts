import type { AlgorithmDefinition, AnimationStep } from '../../types';

export const bubbleSort: AlgorithmDefinition = {
  id: 'bubble-sort',
  name: 'Bubble Sort',
  category: 'Sorting',
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)'
  },
  spaceComplexity: 'O(1)',
  description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  pseudocode: [
    'for i = 0 to n-1',
    '  for j = 0 to n-i-2',
    '    if arr[j] > arr[j+1]',
    '      swap arr[j] and arr[j+1]',
    '  mark arr[n-i-1] as sorted'
  ],
  generate: ({ array }) => {
    if (!array) return [];
    const arr = [...array];
    const n = arr.length;
    const steps: AnimationStep[] = [];
    const sortedIndices: number[] = [];

    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n; i++) {
      steps.push({
        highlight: [],
        sorted: [...sortedIndices],
        variables: { i, j: '-', comparisons, swaps, arrayState: arr.join(',') },
        message: `Starting outer loop pass i = ${i}`,
        activeLine: 0
      });

      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          highlight: [j, j + 1],
          sorted: [...sortedIndices],
          variables: { i, j, comparisons, swaps, arrayState: arr.join(',') },
          message: `Checking if ${arr[j]} > ${arr[j + 1]}`,
          activeLine: 1
        });

        comparisons++;
        steps.push({
          highlight: [j, j + 1],
          sorted: [...sortedIndices],
          variables: { i, j, comparisons, swaps, arrayState: arr.join(',') },
          message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
          activeLine: 2
        });

        if (arr[j] > arr[j + 1]) {
          swaps++;
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          steps.push({
            highlight: [j, j + 1],
            swap: [j, j + 1],
            sorted: [...sortedIndices],
            variables: { i, j, comparisons, swaps, arrayState: arr.join(',') },
            message: `${arr[j + 1]} > ${arr[j]}, swapping them`,
            activeLine: 3
          });
        } else {
          steps.push({
            highlight: [j, j + 1],
            sorted: [...sortedIndices],
            variables: { i, j, comparisons, swaps, arrayState: arr.join(',') },
            message: `${arr[j]} ≤ ${arr[j + 1]}, no swap needed`,
            activeLine: 2
          });
        }
      }

      const sortedIdx = n - i - 1;
      sortedIndices.push(sortedIdx);
      
      steps.push({
        highlight: [sortedIdx],
        sorted: [...sortedIndices],
        variables: { i, j: '-', comparisons, swaps, arrayState: arr.join(',') },
        message: `${arr[sortedIdx]} is now in its final sorted position`,
        activeLine: 4
      });
    }

    return steps;
  }
};
