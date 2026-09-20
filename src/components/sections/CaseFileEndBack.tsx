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
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.2em', color: 'rgba(255,80,80,0.6)' }}>
                    DOSSIER // ARCHIVE COMPLETE
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.14em', color: '#4ade80' }}>
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
                        color: '#4ade80',
                        background: 'rgba(74,222,128,0.06)',
                        border: '0.5px solid rgba(74,222,128,0.2)',
                        padding: '4px 10px',
                        width: 'fit-content',
                    }}
                >
                    ALL 09 CASE FILES REVIEWED
                </div>

                <h3 style={{ fontFamily: 'sans-serif', fontSize: 18, fontWeight: 700, color: '#f5f5f5', margin: 0 }}>
                    Systems Architecture Portfolio
                </h3>

                <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#c8c8c8', lineHeight: 1.6, margin: 0 }}>
                    Looking for full-stack engineering, microservice development, or system architecture collaboration? Connect directly or explore source repositories.
                </p>

                <div
                    style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '0.5px solid rgba(255,255,255,0.06)',
                        padding: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                    }}
                >
                    <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
                        CONTACT & LINKS
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#f5f5f5' }}>
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
                    borderTop: '0.5px solid rgba(255,255,255,0.06)',
                    paddingTop: 8,
                }}
            >
                <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em' }}>
                    VAIBHAV SHARMA // 2026
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,80,80,0.5)', letterSpacing: '0.1em' }}>
                    CLOSED
                </span>
            </div>
        </div>
    );
};
