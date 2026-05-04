import React, { useEffect, useRef } from 'react';

interface BlueprintCanvasProps {
    visible?: boolean;
}

export const BlueprintCanvas: React.FC<BlueprintCanvasProps> = ({ visible = true }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const offsetRef = useRef({ x: 0, y: 0 });
    const opacityRef = useRef(0);
    const targetOpacityRef = useRef(0);

    useEffect(() => {
        targetOpacityRef.current = visible ? 1 : 0;
    }, [visible]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const gridSize = 40;
        const majorGridSize = 200;
        const driftSpeed = 0.15;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener('resize', resize);

        const drawGrid = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const ox = offsetRef.current.x % gridSize;
            const oy = offsetRef.current.y % gridSize;

            // Smoothly interpolate opacity
            const target = targetOpacityRef.current;
            opacityRef.current += (target - opacityRef.current) * 0.12;

            const alpha = opacityRef.current;

            ctx.clearRect(0, 0, w, h);

            if (alpha < 0.01) return; // Skip drawing if invisible

            ctx.globalAlpha = alpha;

            // Minor grid lines
            ctx.strokeStyle = 'rgba(30, 58, 138, 0.15)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            for (let x = ox; x < w; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
            }
            for (let y = oy; y < h; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
            ctx.stroke();

            // Major grid lines
            const majorOx = offsetRef.current.x % majorGridSize;
            const majorOy = offsetRef.current.y % majorGridSize;
            ctx.strokeStyle = 'rgba(30, 58, 138, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = majorOx; x < w; x += majorGridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
            }
            for (let y = majorOy; y < h; y += majorGridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
            ctx.stroke();

            // Center crosshairs
            const cx = w / 2;
            const cy = h / 2;
            ctx.strokeStyle = 'rgba(30, 58, 138, 0.2)';
            ctx.lineWidth = 0.5;
            ctx.setLineDash([10, 10]);
            ctx.beginPath();
            ctx.moveTo(cx, 0);
            ctx.lineTo(cx, h);
            ctx.moveTo(0, cy);
            ctx.lineTo(w, cy);
            ctx.stroke();
            ctx.setLineDash([]);

            // Technical labels
            ctx.font = '10px JetBrains Mono, monospace';
            ctx.fillStyle = 'rgba(30, 58, 138, 0.35)';
            ctx.fillText('ARCH_REF: #8841-A', 16, h - 16);
            ctx.fillText('SCALE: 1:1', w - 90, h - 16);
            ctx.fillText('GRID_SYS_RDY', 16, 24);
            ctx.fillText('RENDER_ENGINE: VITE', w - 170, 24);

            // Corner brackets
            const bracketLen = 30;
            ctx.strokeStyle = 'rgba(30, 58, 138, 0.25)';
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(8, 8 + bracketLen);
            ctx.lineTo(8, 8);
            ctx.lineTo(8 + bracketLen, 8);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(w - 8 - bracketLen, 8);
            ctx.lineTo(w - 8, 8);
            ctx.lineTo(w - 8, 8 + bracketLen);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(8, h - 8 - bracketLen);
            ctx.lineTo(8, h - 8);
            ctx.lineTo(8 + bracketLen, h - 8);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(w - 8 - bracketLen, h - 8);
            ctx.lineTo(w - 8, h - 8);
            ctx.lineTo(w - 8, h - 8 - bracketLen);
            ctx.stroke();

            // Vignette
            ctx.globalAlpha = 1; // Vignette always at full
            const gradient = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.25, cx, cy, Math.max(w, h) * 0.7);
            gradient.addColorStop(0, 'rgba(11, 17, 33, 0)');
            gradient.addColorStop(1, 'rgba(11, 17, 33, 0.6)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);
        };

        const animate = () => {
            if (!prefersReducedMotion) {
                offsetRef.current.x += driftSpeed;
                offsetRef.current.y += driftSpeed * 0.7;
            }
            drawGrid();
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-10"
            aria-hidden="true"
        />
    );
};
