// CaseFileEndRight.tsx
// Right panel of binder stage when dossier archive complete.
// Theme: Confidential archive seal, system audit status, scroll-up hint.

import React from 'react';

interface CaseFileEndRightProps {
    isTablet?: boolean;
}

export const CaseFileEndRight: React.FC<CaseFileEndRightProps> = ({ isTablet = false }) => {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: '#0d0d0d',
                border: '0.5px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: isTablet ? '20px' : '24px',
                overflow: 'hidden',
                userSelect: 'none',
            }}
        >
            {/* Header */}
            <div
                style={{
                    height: 36,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                    paddingBottom: 8,
                }}
            >
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>
                    CLASSIFIED ARCHIVE // END
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.14em', color: '#4ade80' }}>
                    SEALED
                </span>
            </div>

            {/* Center Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                    <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.4)' }}>
                        DOSSIER BINDER SEALED
                    </span>
                </div>

                <div
                    style={{
                        border: '1px dashed rgba(74,222,128,0.25)',
                        background: 'rgba(74,222,128,0.02)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                    }}
                >
                    <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#4ade80', letterSpacing: '0.14em' }}>
                        SYSTEM AUDIT COMPLETE
                    </div>
                    <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: 0 }}>
                        All 9 production systems and case files have been audited. No structural errors found.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div
                style={{
                    height: 36,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '0.5px solid rgba(255,255,255,0.06)',
                    paddingTop: 8,
                }}
            >
                <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em' }}>
                    ↑ SCROLL UP TO RE-EXAMINE
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
                    FILE 009/009
                </span>
            </div>
        </div>
    );
};
