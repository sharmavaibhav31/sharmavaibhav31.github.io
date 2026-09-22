import type { AlgorithmDefinition, AnimationStep } from '../../types';

export const selectionSort: AlgorithmDefinition = {
  id: 'selection-sort',
  name: 'Selection Sort',
  category: 'Sorting',
  timeComplexity: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)'
  },
  spaceComplexity: 'O(1)',
  description: 'An in-place comparison-based sorting algorithm. It divides the input list into two parts: a sorted sublist and an unsorted sublist, and repeatedly finds the minimum element from the unsorted part and puts it at the beginning.',
  pseudocode: [
    'for i = 0 to n-1',
    '  minIndex = i',
    '  for j = i+1 to n-1',
    '    if arr[j] < arr[minIndex]',
    '      minIndex = j',
    '  swap arr[i] and arr[minIndex]',
    '  mark arr[i] as sorted'
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
        highlight: [i],
        sorted: [...sortedIndices],
        variables: { i, minIndex: i, j: '-', comparisons, swaps, arrayState: arr.join(',') },
        message: `Starting pass i = ${i}. Setting initial minIndex to ${i}.`,
        activeLine: 0
      });

      let minIndex = i;
      steps.push({
        highlight: [i],
        pivot: [minIndex],
        sorted: [...sortedIndices],
        variables: { i, minIndex, j: '-', comparisons, swaps, arrayState: arr.join(',') },
        message: `Set minIndex = ${minIndex} (value: ${arr[minIndex]})`,
        activeLine: 1
      });

      for (let j = i + 1; j < n; j++) {
        comparisons++;
        
        steps.push({
          highlight: [j],
          pivot: [minIndex],
          sorted: [...sortedIndices],
          variables: { i, minIndex, j, comparisons, swaps, arrayState: arr.join(',') },
          message: `Comparing element at index ${j} (${arr[j]}) with current minimum at index ${minIndex} (${arr[minIndex]})`,
          activeLine: 3
        });

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          steps.push({
            highlight: [j],
            pivot: [minIndex],
            sorted: [...sortedIndices],
            variables: { i, minIndex, j, comparisons, swaps, arrayState: arr.join(',') },
            message: `Found smaller element! Update minIndex to ${minIndex} (value: ${arr[minIndex]})`,
            activeLine: 4
          });
        }
      }

      if (minIndex !== i) {
        swaps++;
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        steps.push({
          highlight: [i, minIndex],
          swap: [i, minIndex],
          pivot: [minIndex],
          sorted: [...sortedIndices],
          variables: { i, minIndex, j: '-', comparisons, swaps, arrayState: arr.join(',') },
          message: `Swapping element at index ${i} (${arr[minIndex]}) with minimum at index ${minIndex} (${arr[i]})`,
          activeLine: 5
        });
      } else {
        steps.push({
          highlight: [i],
          sorted: [...sortedIndices],
          variables: { i, minIndex, j: '-', comparisons, swaps, arrayState: arr.join(',') },
          message: `Element at index ${i} is already the minimum. No swap needed.`,
          activeLine: 5
        });
      }

      sortedIndices.push(i);
      steps.push({
        highlight: [i],
        sorted: [...sortedIndices],
        variables: { i, minIndex, j: '-', comparisons, swaps, arrayState: arr.join(',') },
        message: `Marking index ${i} (${arr[i]}) as sorted`,
        activeLine: 6
      });
    }

    return steps;
  }
};
