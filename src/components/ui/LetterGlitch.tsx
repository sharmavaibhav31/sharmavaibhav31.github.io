import { useRef, useEffect } from 'react';

const LetterGlitch = ({
    glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = true,
    smooth = true,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
}: {
    glitchColors?: string[];
    glitchSpeed?: number;
    centerVignette?: boolean;
    outerVignette?: boolean;
    smooth?: boolean;
    characters?: string;
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const letters = useRef<{ char: string; color: string; targetColor: string; colorProgress: number }[]>([]);
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const lastGlitchTime = useRef(Date.now());

    const lettersAndSymbols = Array.from(characters);
    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
    const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)];

    const hexToRgb = (hex: string) => {
        hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
            : null;
    };

    const interpolateColor = (
        start: { r: number; g: number; b: number },
        end: { r: number; g: number; b: number },
        factor: number
    ) => {
        return `rgb(${Math.round(start.r + (end.r - start.r) * factor)},${Math.round(start.g + (end.g - start.g) * factor)},${Math.round(start.b + (end.b - start.b) * factor)})`;
    };

    const initializeLetters = (columns: number, rows: number) => {
        grid.current = { columns, rows };
        letters.current = Array.from({ length: columns * rows }, () => ({
            char: getRandomChar(),
            color: getRandomColor(),
            targetColor: getRandomColor(),
            colorProgress: 1,
        }));
    };

    const drawLetters = () => {
        if (!context.current || !letters.current.length) return;
        const ctx = context.current;
        const { width, height } = canvasRef.current!.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';
        letters.current.forEach((letter, i) => {
            ctx.fillStyle = letter.color;
            ctx.fillText(letter.char, (i % grid.current.columns) * charWidth, Math.floor(i / grid.current.columns) * charHeight);
        });
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        if (!canvas || !parent) return;
        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        context.current?.setTransform(dpr, 0, 0, dpr, 0, 0);
        const columns = Math.ceil(rect.width / charWidth);
        const rows = Math.ceil(rect.height / charHeight);
        initializeLetters(columns, rows);
        drawLetters();
    };

    const updateLetters = () => {
        const count = Math.max(1, Math.floor(letters.current.length * 0.05));
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * letters.current.length);
            if (!letters.current[idx]) continue;
            letters.current[idx].char = getRandomChar();
            letters.current[idx].targetColor = getRandomColor();
            if (!smooth) {
                letters.current[idx].color = letters.current[idx].targetColor;
                letters.current[idx].colorProgress = 1;
            } else {
                letters.current[idx].colorProgress = 0;
            }
        }
    };

    const handleSmoothTransitions = () => {
        let needsRedraw = false;
        letters.current.forEach((letter) => {
            if (letter.colorProgress < 1) {
                letter.colorProgress = Math.min(1, letter.colorProgress + 0.05);
                const s = hexToRgb(letter.color);
                const e = hexToRgb(letter.targetColor);
                if (s && e) { letter.color = interpolateColor(s, e, letter.colorProgress); needsRedraw = true; }
            }
        });
        if (needsRedraw) drawLetters();
    };

    const animate = () => {
        const now = Date.now();
        if (now - lastGlitchTime.current >= glitchSpeed) {
            updateLetters();
            drawLetters();
            lastGlitchTime.current = now;
        }
        if (smooth) handleSmoothTransitions();
        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        context.current = canvas.getContext('2d');
        resizeCanvas();
        animate();

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                cancelAnimationFrame(animationRef.current!);
                resizeCanvas();
                animate();
            }, 100);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationRef.current!);
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [glitchSpeed, smooth]);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />
            {outerVignette && (
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]" />
            )}
            {centerVignette && (
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]" />
            )}
        </div>
    );
};

export default LetterGlitch;
