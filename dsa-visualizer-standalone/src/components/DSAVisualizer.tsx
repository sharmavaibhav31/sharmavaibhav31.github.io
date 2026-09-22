'use client';

import { useState, useEffect } from 'react';
import type { AlgorithmDefinition } from '../engine/types';
import { type PlaybackState, createPlaybackState, next, jumpTo } from '../engine/playback';
import { getAllAlgorithms } from '../engine/registry';
import { PlaybackControls } from './controls/PlaybackControls';
import { ComplexityPanel } from './panels/ComplexityPanel';
import { PseudocodePanel } from './panels/PseudocodePanel';
import { VariablePanel } from './panels/VariablePanel';
import { ExplanationPanel } from './panels/ExplanationPanel';
import { Timeline } from './timeline/Timeline';
import { InputControls } from './input/InputControls';
import { ArrayRenderer } from './renderers/ArrayRenderer';
import { StackRenderer } from './renderers/StackRenderer';
import { QueueRenderer } from './renderers/QueueRenderer';
import { Binary, ChevronRight, Menu, Plus, Trash } from 'lucide-react';

export function DSAVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmDefinition | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>(createPlaybackState([]));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [structureArray, setStructureArray] = useState<number[]>([]); // for stack/queue
  const [inputValue, setInputValue] = useState<string>('5');

  // Fetch all registered algorithms
  const algorithms = getAllAlgorithms();

  // Group algorithms by category
  const categories = algorithms.reduce((acc, algo) => {
    if (!acc[algo.category]) {
      acc[algo.category] = [];
    }
    acc[algo.category].push(algo);
    return acc;
  }, {} as Record<string, AlgorithmDefinition[]>);

  // Playback timer loop
  useEffect(() => {
    if (!playbackState.isPlaying) return;

    const intervalTime = 300 / playbackState.speed;

    const timer = setInterval(() => {
      setPlaybackState((prev) => {
        if (prev.currentIndex >= prev.steps.length - 1) {
          clearInterval(timer);
          return { ...prev, isPlaying: false };
        }
        return next(prev);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [playbackState.isPlaying, playbackState.speed]);

  const handleSelectAlgorithm = (algo: AlgorithmDefinition) => {
    setSelectedAlgorithm(algo);
    
    if (algo.category === 'Linear') {
      if (algo.id === 'circular-queue') {
        // [frontIndex, rearIndex, 8 empty slots]
        const defaultCircular = [-1, -1, -999, -999, -999, -999, -999, -999, -999, -999];
        setStructureArray(defaultCircular);
        const steps = algo.generate({ array: defaultCircular });
        setPlaybackState(createPlaybackState(steps));
      } else {
        setStructureArray([]);
        const steps = algo.generate({ array: [] });
        setPlaybackState(createPlaybackState(steps));
      }
    } else {
      let arr = originalArray;
      if (arr.length === 0) {
        arr = Array.from({ length: 16 }, () => Math.floor(Math.random() * 90) + 10);
        setOriginalArray(arr);
      }
      const steps = algo.generate({ array: arr });
      setPlaybackState(createPlaybackState(steps));
    }
  };

  const handleGenerateInput = (newArray: number[]) => {
    setOriginalArray(newArray);
    if (selectedAlgorithm) {
      const steps = selectedAlgorithm.generate({ array: newArray });
      setPlaybackState(createPlaybackState(steps));
    } else {
      setPlaybackState(createPlaybackState([]));
    }
  };

  // Perform Stack/Queue operations
  const handleLinearOperation = (opCode: number) => {
    if (!selectedAlgorithm) return;

    let targetVal = opCode;
    if (opCode === -100) { // Code for user-input value (Push/Enqueue)
      const parsed = parseInt(inputValue);
      if (isNaN(parsed) || parsed < 0 || parsed > 999) return;
      targetVal = parsed;
    }

    const steps = selectedAlgorithm.generate({ array: structureArray, target: targetVal });
    
    // Auto-save the final step array representation back to state
    if (steps.length > 0) {
      const finalStep = steps[steps.length - 1];
      if (finalStep.variables && finalStep.variables.arrayState) {
        const finalArr = (finalStep.variables.arrayState as string).split(',').map(Number);
        setStructureArray(finalArr);
      }
    }

    setPlaybackState({
      ...createPlaybackState(steps),
      isPlaying: true // Start animation immediately
    });
  };

  const activeStep = playbackState.steps[playbackState.currentIndex] || null;

  // Retrieve current active array representation for display
  const currentArray = (() => {
    if (selectedAlgorithm?.category === 'Linear') {
      return activeStep?.variables?.arrayState
        ? (activeStep.variables.arrayState as string).split(',').map(Number)
        : structureArray;
    }
    return activeStep?.variables?.arrayState
      ? (activeStep.variables.arrayState as string).split(',').map(Number)
      : originalArray;
  })();

  const displayVariables = (() => {
    if (!activeStep) return {};
    const { arrayState, ...rest } = activeStep.variables;
    return rest;
  })();

  const isLinear = selectedAlgorithm?.category === 'Linear';

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh',
      background: 'var(--surface-solid, #f8fafc)',
      overflow: 'hidden'
    }}>
      
      {/* Top Navigation / Toolbar */}
      <header style={{
        height: '64px',
        borderBottom: '1px solid var(--line, #e2e8f0)',
        background: 'var(--white, #ffffff)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '16px',
        zIndex: 10
      }}>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--ink, #0f172a)' }}
        >
          <Menu size={24} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 900, color: 'var(--ink, #0f172a)', fontSize: '1.2rem' }}>
          <Binary size={24} color="var(--blue, #3b82f6)" />
          DSA Visualizer
        </div>
        
        {selectedAlgorithm && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '24px', color: 'var(--muted, #64748b)', fontWeight: 600 }}>
            <ChevronRight size={16} />
            <span style={{ color: 'var(--ink, #0f172a)' }}>{selectedAlgorithm.name}</span>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Sidebar (Algorithms) */}
        {sidebarOpen && (
          <aside style={{
            width: '280px',
            borderRight: '1px solid var(--line, #e2e8f0)',
            background: 'var(--white, #ffffff)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 5
          }}>
            <div style={{ padding: '24px 16px', flex: 1, overflowY: 'auto' }}>
              <h2 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted, #64748b)', fontWeight: 800, marginBottom: '16px' }}>Algorithms</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {Object.entries(categories).map(([categoryName, algos]) => (
                  <div key={categoryName}>
                    <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--muted, #64748b)', marginBottom: '8px', paddingLeft: '8px' }}>{categoryName}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {algos.map((algo) => {
                        const isSelected = selectedAlgorithm?.id === algo.id;
                        return (
                          <button
                            key={algo.id}
                            onClick={() => handleSelectAlgorithm(algo)}
                            style={{
                              display: 'block',
                              width: '100%',
                              textAlign: 'left',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              border: 'none',
                              background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                              color: isSelected ? 'var(--blue-dark, #1d4ed8)' : 'var(--ink, #0f172a)',
                              fontWeight: isSelected ? 800 : 600,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              fontSize: '0.9rem'
                            }}
                          >
                            {algo.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Input / Control Panel footer */}
            <div style={{ padding: '16px', borderTop: '1px solid var(--line, #e2e8f0)', background: 'var(--white, #ffffff)' }}>
              {isLinear ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--ink, #0f172a)' }}>Operations</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Value"
                      style={{
                        width: '70px',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid var(--line, #e2e8f0)',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}
                    />
                    <button
                      onClick={() => handleLinearOperation(-100)} // Push/Enqueue
                      style={{
                        flex: 1,
                        background: 'var(--blue, #3b82f6)',
                        color: 'var(--white, #ffffff)',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Plus size={16} />
                      {selectedAlgorithm?.id === 'stack' ? 'Push' : 'Enqueue'}
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleLinearOperation(-1)} // Pop/Dequeue
                      style={{
                        flex: 1,
                        background: 'var(--white, #ffffff)',
                        border: '1px solid var(--line, #e2e8f0)',
                        borderRadius: '6px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        padding: '10px 0',
                        color: 'var(--ink, #0f172a)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash size={16} />
                      {selectedAlgorithm?.id === 'stack' ? 'Pop' : 'Dequeue'}
                    </button>
                    
                    {selectedAlgorithm?.id === 'stack' && (
                      <button
                        onClick={() => handleLinearOperation(-2)} // Peek
                        style={{
                          flex: 1,
                          background: 'var(--white, #ffffff)',
                          border: '1px solid var(--line, #e2e8f0)',
                          borderRadius: '6px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          color: 'var(--ink, #0f172a)'
                        }}
                      >
                        Peek
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <InputControls 
                  onGenerate={handleGenerateInput} 
                  disabled={!selectedAlgorithm} 
                />
              )}
            </div>
          </aside>
        )}

        {/* Center Canvas */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--surface-solid, #f8fafc)'
        }}>
          
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            overflow: 'auto'
          }}>
            {!selectedAlgorithm ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--muted, #64748b)', opacity: 0.7 }}>
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                  <line x1="15" y1="3" x2="15" y2="21"></line>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="3" y1="15" x2="21" y2="15"></line>
                </svg>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Select an algorithm to begin</p>
              </div>
            ) : (
              <div style={{ width: '100%', maxWidth: '800px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selectedAlgorithm.id === 'stack' ? (
                  <StackRenderer
                    array={currentArray}
                    step={activeStep || { highlight: [], variables: {}, message: '' }}
                  />
                ) : selectedAlgorithm.id === 'linear-queue' ? (
                  <QueueRenderer
                    array={currentArray}
                    step={activeStep || { highlight: [], variables: {}, message: '' }}
                    isCircular={false}
                  />
                ) : selectedAlgorithm.id === 'circular-queue' ? (
                  <QueueRenderer
                    array={currentArray}
                    step={activeStep || { highlight: [], variables: {}, message: '' }}
                    isCircular={true}
                  />
                ) : (
                  <div style={{ width: '100%', height: '350px' }}>
                    <ArrayRenderer
                      array={currentArray}
                      step={activeStep || { highlight: [], variables: {}, message: '' }}
                      steps={playbackState.steps}
                      currentIndex={playbackState.currentIndex}
                      originalArray={originalArray}
                      category={selectedAlgorithm.category}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Timeline & Playback */}
          <div style={{
            height: 'auto',
            minHeight: '120px',
            borderTop: '1px solid var(--line, #e2e8f0)',
            background: 'var(--white, #ffffff)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <Timeline 
              totalSteps={playbackState.steps.length} 
              currentStep={playbackState.currentIndex}
              onJumpToStep={(step) => setPlaybackState(jumpTo(playbackState, step))}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <PlaybackControls 
                state={playbackState}
                onStateChange={setPlaybackState}
              />
            </div>
          </div>
        </main>

        {/* Right Learning Panel */}
        <aside style={{
          width: '320px',
          borderLeft: '1px solid var(--line, #e2e8f0)',
          background: 'var(--surface-solid, #f8fafc)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          gap: '16px',
          zIndex: 5
        }}>
           <ExplanationPanel message={activeStep?.message} />
           <VariablePanel variables={displayVariables} />
           <PseudocodePanel algorithm={selectedAlgorithm} activeLine={activeStep?.activeLine} />
           <ComplexityPanel algorithm={selectedAlgorithm} />
        </aside>

      </div>
    </div>
  );
}
