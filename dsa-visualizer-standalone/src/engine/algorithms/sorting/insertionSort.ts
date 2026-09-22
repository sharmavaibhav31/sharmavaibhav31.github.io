import type { AlgorithmDefinition, AnimationStep } from '../../types';

export const insertionSort: AlgorithmDefinition = {
  id: 'insertion-sort',
  name: 'Insertion Sort',
  category: 'Sorting',
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)'
  },
  spaceComplexity: 'O(1)',
  description: 'A simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms.',
  pseudocode: [
    'for i = 1 to n-1',
    '  key = arr[i]',
    '  j = i - 1',
    '  while j >= 0 and arr[j] > key',
    '    arr[j+1] = arr[j]',
    '    j = j - 1',
    '  arr[j+1] = key'
  ],
  generate: ({ array }) => {
    if (!array) return [];
    const arr = [...array];
    const n = arr.length;
    const steps: AnimationStep[] = [];
    const sortedIndices: number[] = [0];

    let comparisons = 0;
    let shifts = 0;

    steps.push({
      highlight: [0],
      sorted: [0],
      variables: { i: '-', key: '-', j: '-', comparisons, shifts, arrayState: arr.join(',') },
      message: 'The first element is already sorted by default.',
      activeLine: 0
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      
      steps.push({
        highlight: [i],
        pivot: [i],
        sorted: [...sortedIndices],
        variables: { i, key, j: '-', comparisons, shifts, arrayState: arr.join(',') },
        message: `Selecting key = ${key} at index ${i}`,
        activeLine: 1
      });

      let j = i - 1;

      steps.push({
        highlight: [j],
        pivot: [i],
        sorted: [...sortedIndices],
        variables: { i, key, j, comparisons, shifts, arrayState: arr.join(',') },
        message: `Comparing with element at index ${j} (${arr[j]})`,
        activeLine: 2
      });

      while (j >= 0) {
        comparisons++;
        
        steps.push({
          highlight: [j],
          pivot: [j + 1],
          sorted: [...sortedIndices],
          variables: { i, key, j, comparisons, shifts, arrayState: arr.join(',') },
          message: `Checking if arr[${j}] (${arr[j]}) > key (${key})`,
          activeLine: 3
        });

        if (arr[j] > key) {
          shifts++;
          arr[j + 1] = arr[j];
          
          steps.push({
            highlight: [j, j + 1],
            sorted: [...sortedIndices],
            variables: { i, key, j, comparisons, shifts, arrayState: arr.join(',') },
            message: `Shifting ${arr[j]} from index ${j} to ${j + 1}`,
            activeLine: 4
          });
          
          j--;
          
          steps.push({
            highlight: [j >= 0 ? j : 0],
            sorted: [...sortedIndices],
            variables: { i, key, j, comparisons, shifts, arrayState: arr.join(',') },
            message: `Decremented j to ${j}`,
            activeLine: 5
          });
        } else {
          break;
        }
      }

      arr[j + 1] = key;
      
      steps.push({
        highlight: [j + 1],
        pivot: [j + 1],
        sorted: [...sortedIndices],
        variables: { i, key, j, comparisons, shifts, arrayState: arr.join(',') },
        message: `Inserting key (${key}) at index ${j + 1}`,
        activeLine: 6
      });

      for (let k = 0; k <= i; k++) {
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k);
        }
      }
    }

    steps.push({
      highlight: [],
      sorted: Array.from({ length: n }, (_, idx) => idx),
      variables: { i: '-', key: '-', j: '-', comparisons, shifts, arrayState: arr.join(',') },
      message: 'Array is fully sorted!',
      activeLine: 0
    });

    return steps;
  }
};
