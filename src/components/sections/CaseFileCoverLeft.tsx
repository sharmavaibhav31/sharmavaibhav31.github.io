// CaseFileCoverLeft.tsx
// Left side of the closed classified dossier binder cover.
// Theme: Restricted notice, security checksum, barcode, and portfolio owner identification.

import React from 'react';

interface CaseFileCoverLeftProps {
    isTablet?: boolean;
}

export const CaseFileCoverLeft: React.FC<CaseFileCoverLeftProps> = ({ isTablet = false }) => {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--bg-primary)',
                border: '0.5px solid var(--border-default)',
                borderRight: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: isTablet ? '20px 24px' : '28px 32px',
                overflow: 'hidden',
                userSelect: 'none',
            }}
        >
            {/* Header / Security Marking */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '0.5px solid var(--border-default)',
                    paddingBottom: 12,
                }}
            >
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8,
                        letterSpacing: '0.18em',
                        color: 'var(--accent-red)',
                    }}
                >
                    PROPERTY OF VAIBHAV SHARMA
                </span>
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8,
                        letterSpacing: '0.14em',
                        color: 'var(--text-muted)',
                    }}
                >
                    DOSSIER_BINDER_01
                </span>
            </div>

            {/* Central Warning / Seal Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
                <div
                    style={{
                        border: '1px dashed var(--accent-red-border)',
                        background: 'var(--accent-red-bg)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            color: 'var(--accent-red)',
                        }}
                    >
                        [!] NOTICE — RESTRICTED DOSSIER
                    </div>
                    <p
                        style={{
                            fontFamily: 'sans-serif',
                            fontSize: 11,
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                            margin: 0,
                        }}
                    >
                        This binder contains verified architectural case files, benchmark metrics, and system design specifications for engineering projects built by Vaibhav Sharma.
                    </p>
                </div>

                {/* Technical Specifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.14em' }}>
                        SECURITY CHECKSUM
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--accent-green)', letterSpacing: '0.08em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934c
                    </div>
                </div>
            </div>

            {/* Footer Barcode / Stamp */}
            <div
                style={{
                    borderTop: '0.5px solid var(--border-default)',
                    paddingTop: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.14em', color: 'var(--text-muted)' }}>
                    ||||| ||| |||||| | |||||||
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 8, letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
                    CLEARANCE: LEVEL 5
                </span>
            </div>
        </div>
    );
};
