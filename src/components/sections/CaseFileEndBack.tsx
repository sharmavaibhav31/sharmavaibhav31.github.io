// CaseFileEndBack.tsx
// End page of dossier binder when final case file is turned.
// Theme: Classified Archive End Seal & Contact Details.

import React from 'react';

interface CaseFileEndBackProps {
    isTablet?: boolean;
}

export const CaseFileEndBack: React.FC<CaseFileEndBackProps> = ({ isTablet = false }) => {
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
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.2em', color: 'var(--accent-red)' }}>
                    DOSSIER // ARCHIVE COMPLETE
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.14em', color: 'var(--accent-green)' }}>
                    END OF FILES
                </span>
            </div>

            {/* Center Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: 'auto 0' }}>
                <div
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        color: 'var(--accent-green)',
                        background: 'var(--accent-green-bg)',
                        border: '0.5px solid var(--accent-green-border)',
                        padding: '4px 10px',
                        width: 'fit-content',
                    }}
                >
                    ALL 09 CASE FILES REVIEWED
                </div>

                <h3 style={{ fontFamily: 'sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Systems Architecture Portfolio
                </h3>

                <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    Looking for full-stack engineering, microservice development, or system architecture collaboration? Connect directly or explore source repositories.
                </p>

                <div
                    style={{
                        background: 'var(--bg-raised)',
                        border: '0.5px solid var(--border-subtle)',
                        padding: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                    }}
                >
                    <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                        CONTACT & LINKS
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--text-primary)' }}>
                        GitHub: github.com/sharmavaibhav31
                    </span>
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
                    VAIBHAV SHARMA // 2026
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'var(--accent-red)', letterSpacing: '0.1em' }}>
                    CLOSED
                </span>
            </div>
        </div>
    );
};

