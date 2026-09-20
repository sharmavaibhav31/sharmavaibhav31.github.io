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
                background: 'var(--bg-surface)',
                border: '0.5px solid var(--border-default)',
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
                    borderBottom: '0.5px solid var(--border-subtle)',
                    paddingBottom: 8,
                }}
            >
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.2em', color: 'var(--text-muted)' }}>
                    CLASSIFIED ARCHIVE // END
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.14em', color: 'var(--accent-green)' }}>
                    SEALED
                </span>
            </div>

            {/* Center Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)' }} />
                    <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.16em', color: 'var(--text-muted)' }}>
                        DOSSIER BINDER SEALED
                    </span>
                </div>

                <div
                    style={{
                        border: '1px dashed var(--accent-green-border)',
                        background: 'var(--accent-green-bg)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                    }}
                >
                    <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--accent-green)', letterSpacing: '0.14em' }}>
                        SYSTEM AUDIT COMPLETE
                    </div>
                    <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
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
                    borderTop: '0.5px solid var(--border-subtle)',
                    paddingTop: 8,
                }}
            >
                <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                    ↑ SCROLL UP TO RE-EXAMINE
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                    FILE 009/009
                </span>
            </div>
        </div>
    );
};

