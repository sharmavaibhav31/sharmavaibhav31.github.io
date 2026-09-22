import type { AlgorithmDefinition, AnimationStep } from '../../types';

const MAX_STACK_SIZE = 10;

export const stack: AlgorithmDefinition = {
  id: 'stack',
  name: 'Stack',
  category: 'Linear',
  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)'
  },
  spaceComplexity: 'O(n)',
  description: 'A linear data structure that follows the Last-In-First-Out (LIFO) principle. Operations are performed only at the top of the stack.',
  pseudocode: [
    'Push(value):',
    '  if size >= MAX_SIZE then Overflow',
    '  top = top + 1',
    '  stack[top] = value',
    'Pop():',
    '  if isEmpty then Underflow',
    '  value = stack[top]',
    '  top = top - 1',
    '  return value'
  ],
  generate: ({ array, target }) => {
    const currentStack = array ? [...array] : [];
    const steps: AnimationStep[] = [];
    const size = currentStack.length;

    if (target === undefined) {
      steps.push({
        highlight: [],
        variables: { top: size - 1, size, max_size: MAX_STACK_SIZE },
        message: 'Interactive Stack: Use the panel controls to Push, Pop, or Peek.',
        activeLine: 0
      });
      return steps;
    }

    if (target >= 0) {
      steps.push({
        highlight: [],
        variables: { top: size - 1, size, value: target, max_size: MAX_STACK_SIZE, arrayState: currentStack.join(',') },
        message: `Push operation started: Attempting to push ${target} onto the stack.`,
        activeLine: 0
      });

      if (size >= MAX_STACK_SIZE) {
        steps.push({
          highlight: Array.from({ length: size }, (_, i) => i),
          variables: { top: size - 1, size, value: target, max_size: MAX_STACK_SIZE, arrayState: currentStack.join(',') },
          message: `Stack Overflow! Cannot push ${target} because the stack has reached its maximum capacity of ${MAX_STACK_SIZE}.`,
          activeLine: 1
        });
      } else {
        steps.push({
          highlight: [],
          variables: { top: size - 1, size, value: target, max_size: MAX_STACK_SIZE, arrayState: currentStack.join(',') },
          message: `Incrementing stack pointer 'top' and preparing slot at index ${size}.`,
          activeLine: 2
        });

        const newStack = [...currentStack, target];
        steps.push({
          highlight: [size],
          variables: { top: size, size: size + 1, value: target, max_size: MAX_STACK_SIZE, arrayState: newStack.join(',') },
          message: `Successfully pushed ${target} onto the top of the stack.`,
          activeLine: 3
        });
      }
    } else if (target === -1) {
      steps.push({
        highlight: [],
        variables: { top: size - 1, size, max_size: MAX_STACK_SIZE, arrayState: currentStack.join(',') },
        message: 'Pop operation started: Attempting to remove the top element.',
        activeLine: 4
      });

      if (size === 0) {
        steps.push({
          highlight: [],
          variables: { top: -1, size: 0, max_size: MAX_STACK_SIZE, arrayState: currentStack.join(',') },
          message: 'Stack Underflow! Cannot pop because the stack is completely empty.',
          activeLine: 5
        });
      } else {
        const topVal = currentStack[size - 1];
        
        steps.push({
          highlight: [size - 1],
          variables: { top: size - 1, size, popped: topVal, max_size: MAX_STACK_SIZE, arrayState: currentStack.join(',') },
          message: `Retrieving top element: ${topVal} at index ${size - 1}.`,
          activeLine: 6
        });

        const newStack = currentStack.slice(0, -1);
        steps.push({
          highlight: [],
          variables: { top: size - 2, size: size - 1, popped: topVal, max_size: MAX_STACK_SIZE, arrayState: newStack.join(',') },
          message: `Popped ${topVal} off the stack and decremented top.`,
          activeLine: 7
        });
      }
    } else if (target === -2) {
      steps.push({
        highlight: [],
        variables: { top: size - 1, size, max_size: MAX_STACK_SIZE, arrayState: currentStack.join(',') },
        message: 'Peek operation started: Looking at the top element without removing it.',
        activeLine: 4
      });

      if (size === 0) {
        steps.push({
          highlight: [],
          variables: { top: -1, size: 0, max_size: MAX_STACK_SIZE, arrayState: currentStack.join(',') },
          message: 'Stack is empty. Nothing to peek.',
          activeLine: 5
        });
      } else {
        const topVal = currentStack[size - 1];
        steps.push({
          highlight: [size - 1],
          variables: { top: size - 1, size, peeked: topVal, max_size: MAX_STACK_SIZE, arrayState: currentStack.join(',') },
          message: `Top element is ${topVal} at index ${size - 1}.`,
          activeLine: 6
        });
      }
    }

    return steps;
  }
};
