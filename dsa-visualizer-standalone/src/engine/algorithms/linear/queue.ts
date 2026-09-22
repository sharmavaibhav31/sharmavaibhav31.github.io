import type { AlgorithmDefinition, AnimationStep } from '../../types';

// Standard Linear Queue
export const linearQueue: AlgorithmDefinition = {
  id: 'linear-queue',
  name: 'Linear Queue',
  category: 'Linear',
  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)'
  },
  spaceComplexity: 'O(n)',
  description: 'A linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are inserted at the Rear and removed from the Front.',
  pseudocode: [
    'Enqueue(value):',
    '  if isFull then Overflow',
    '  rear = rear + 1',
    '  queue[rear] = value',
    'Dequeue():',
    '  if isEmpty then Underflow',
    '  value = queue[front]',
    '  front = front + 1',
    '  shift elements left',
    '  return value'
  ],
  generate: ({ array, target }) => {
    const queue = array ? [...array] : [];
    const steps: AnimationStep[] = [];
    const size = queue.length;
    const MAX_SIZE = 8;

    if (target === undefined) {
      steps.push({
        highlight: [],
        variables: { front: size > 0 ? 0 : '-', rear: size > 0 ? size - 1 : '-', size },
        message: 'Interactive Queue: Use the panel controls to Enqueue or Dequeue.',
        activeLine: 0
      });
      return steps;
    }

    if (target >= 0) {
      // Enqueue
      steps.push({
        highlight: [],
        variables: { front: size > 0 ? 0 : '-', rear: size > 0 ? size - 1 : '-', size, value: target, arrayState: queue.join(',') },
        message: `Enqueue operation started: Attempting to add ${target} to the rear.`,
        activeLine: 0
      });

      if (size >= MAX_SIZE) {
        steps.push({
          highlight: Array.from({ length: size }, (_, i) => i),
          variables: { front: 0, rear: size - 1, size, value: target, arrayState: queue.join(',') },
          message: `Queue Overflow! Cannot enqueue because the queue is full (max size ${MAX_SIZE}).`,
          activeLine: 1
        });
      } else {
        steps.push({
          highlight: [],
          variables: { front: 0, rear: size - 1, size, value: target, arrayState: queue.join(',') },
          message: `Moving rear to index ${size} and placing ${target}.`,
          activeLine: 2
        });

        const newQueue = [...queue, target];
        steps.push({
          highlight: [size],
          variables: { front: 0, rear: size, size: size + 1, value: target, arrayState: newQueue.join(',') },
          message: `Enqueued ${target} at the rear index ${size}.`,
          activeLine: 3
        });
      }
    } else if (target === -1) {
      // Dequeue
      steps.push({
        highlight: [],
        variables: { front: size > 0 ? 0 : '-', rear: size > 0 ? size - 1 : '-', size, arrayState: queue.join(',') },
        message: 'Dequeue operation started: Attempting to remove the front element.',
        activeLine: 4
      });

      if (size === 0) {
        steps.push({
          highlight: [],
          variables: { front: '-', rear: '-', size: 0, arrayState: queue.join(',') },
          message: 'Queue Underflow! Cannot dequeue from an empty queue.',
          activeLine: 5
        });
      } else {
        const frontVal = queue[0];
        
        steps.push({
          highlight: [0],
          variables: { front: 0, rear: size - 1, size, dequeued: frontVal, arrayState: queue.join(',') },
          message: `Retrieving front element: ${frontVal} at index 0.`,
          activeLine: 6
        });

        const intermediateQueue = [...queue];
        intermediateQueue[0] = -999;
        steps.push({
          highlight: [0],
          variables: { front: 1, rear: size - 1, size, dequeued: frontVal, arrayState: intermediateQueue.join(',') },
          message: `Removed ${frontVal} from front. Now shifting remaining elements left.`,
          activeLine: 7
        });

        const newQueue = queue.slice(1);
        steps.push({
          highlight: Array.from({ length: newQueue.length }, (_, i) => i),
          variables: { front: 0, rear: newQueue.length - 1, size: newQueue.length, dequeued: frontVal, arrayState: newQueue.join(',') },
          message: 'Elements shifted left. Front pointer reset to index 0.',
          activeLine: 8
        });
      }
    }

    return steps;
  }
};

// Circular Queue
export const circularQueue: AlgorithmDefinition = {
  id: 'circular-queue',
  name: 'Circular Queue',
  category: 'Linear',
  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1)'
  },
  spaceComplexity: 'O(n)',
  description: 'A circular queue avoids wasting space in a linear queue by wrapping pointers around to the beginning when capacity is reached.',
  pseudocode: [
    'Enqueue(value):',
    '  if isFull then Overflow',
    '  rear = (rear + 1) % capacity',
    '  queue[rear] = value',
    'Dequeue():',
    '  if isEmpty then Underflow',
    '  value = queue[front]',
    '  queue[front] = null',
    '  front = (front + 1) % capacity'
  ],
  generate: ({ array, target }) => {
    const capacity = 8;
    let queue = array ? [...array] : Array(capacity).fill(-999);
    const steps: AnimationStep[] = [];

    let front = queue[0];
    let rear = queue[1];
    const slots = queue.slice(2);
    
    let size = 0;
    for (let i = 0; i < capacity; i++) {
      if (slots[i] !== -999) size++;
    }

    if (target === undefined) {
      steps.push({
        highlight: [],
        variables: { front, rear, size, arrayState: queue.join(',') },
        message: 'Circular Queue: Uses a wrapping circular array to conserve memory.',
        activeLine: 0
      });
      return steps;
    }

    if (target >= 0) {
      steps.push({
        highlight: [],
        variables: { front, rear, size, value: target, arrayState: queue.join(',') },
        message: `Attempting to circular enqueue ${target}.`,
        activeLine: 0
      });

      if (size === capacity) {
        steps.push({
          highlight: Array.from({ length: capacity }, (_, i) => i + 2),
          variables: { front, rear, size, value: target, arrayState: queue.join(',') },
          message: 'Circular Queue Overflow! Queue is completely full.',
          activeLine: 1
        });
      } else {
        const nextRear = front === -1 ? 0 : (rear + 1) % capacity;
        const nextFront = front === -1 ? 0 : front;

        steps.push({
          highlight: [],
          variables: { front, rear: nextRear, size, value: target, arrayState: queue.join(',') },
          message: `Calculating next rear pointer: (${rear} + 1) % ${capacity} = ${nextRear}.`,
          activeLine: 2
        });

        const newSlots = [...slots];
        newSlots[nextRear] = target;
        const newQueue = [nextFront, nextRear, ...newSlots];

        steps.push({
          highlight: [nextRear + 2],
          variables: { front: nextFront, rear: nextRear, size: size + 1, value: target, arrayState: newQueue.join(',') },
          message: `Enqueued ${target} at wrapped index ${nextRear}.`,
          activeLine: 3
        });
      }
    } else if (target === -1) {
      steps.push({
        highlight: [],
        variables: { front, rear, size, arrayState: queue.join(',') },
        message: 'Attempting to dequeue element from circular queue.',
        activeLine: 4
      });

      if (size === 0) {
        steps.push({
          highlight: [],
          variables: { front: -1, rear: -1, size: 0, arrayState: queue.join(',') },
          message: 'Circular Queue Underflow! Queue is empty.',
          activeLine: 5
        });
      } else {
        const dequeuedVal = slots[front];
        
        steps.push({
          highlight: [front + 2],
          variables: { front, rear, size, dequeued: dequeuedVal, arrayState: queue.join(',') },
          message: `Retrieving front element ${dequeuedVal} at index ${front}.`,
          activeLine: 6
        });

        const newSlots = [...slots];
        newSlots[front] = -999;

        let nextFront = -1;
        let nextRear = -1;

        if (size > 1) {
          nextFront = (front + 1) % capacity;
          nextRear = rear;
        }

        const newQueue = [nextFront, nextRear, ...newSlots];

        steps.push({
          highlight: [front + 2],
          variables: { front: nextFront, rear: nextRear, size: size - 1, dequeued: dequeuedVal, arrayState: newQueue.join(',') },
          message: `Cleared index ${front}. Advancing front to (${front} + 1) % ${capacity} = ${nextFront}.`,
          activeLine: 8
        });
      }
    }

    return steps;
  }
};
