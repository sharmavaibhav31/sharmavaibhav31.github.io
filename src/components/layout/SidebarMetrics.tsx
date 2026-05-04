import React, { useEffect, useRef, useState } from 'react';
import metricsData from '../../data/metrics.json';
import { Code, Server, Cpu, Layers, Wrench, Rocket } from 'lucide-react';

interface MetricItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    metricKey?: string;
    onHover?: (key: string | null) => void;
    isHighlighted?: boolean;
}

const MetricItem: React.FC<MetricItemProps> = ({ icon, label, value, metricKey, onHover, isHighlighted }) => (
    <div
        className={`flex items-center gap-3 group py-1 transition-opacity duration-300 ${isHighlighted ? 'opacity-100' : onHover ? 'opacity-70 hover:opacity-100' : ''}`}
        onMouseEnter={() => metricKey && onHover?.(metricKey)}
        onMouseLeave={() => onHover?.(null)}
    >
        <div className={`transition-colors duration-200 shrink-0 ${isHighlighted ? 'text-accent-cyan' : 'text-accent-cyan/60 group-hover:text-accent-cyan'}`}>
            {icon}
        </div>
        <div className="flex flex-col">
            <span className={`transition-colors duration-200 text-sm ${isHighlighted ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                {value}
            </span>
            <span className="text-text-muted text-[10px] uppercase tracking-wider">{label}</span>
        </div>
        {/* Subtle right indicator when highlighted */}
        {isHighlighted && (
            <div className="ml-auto w-1 h-4 bg-accent-cyan/40 rounded-full" />
        )}
    </div>
);

// Blinking status dot — pulses once every 3 seconds
const StatusDot: React.FC = () => {
    const [lit, setLit] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setLit(false);
            setTimeout(() => setLit(true), 200);
        }, 3000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    return (
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${lit ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]' : 'bg-emerald-900'}`} />
    );
};

interface SidebarMetricsProps {
    onMetricHover?: (key: string | null) => void;
}

export const SidebarMetrics: React.FC<SidebarMetricsProps> = ({ onMetricHover }) => {
    const [activeMetric, setActiveMetric] = useState<string | null>(null);

    const handleHover = (key: string | null) => {
        setActiveMetric(key);
        onMetricHover?.(key);
    };

    return (
        <aside
            className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 xl:w-80 bg-blueprint-dark/90 border-r border-line-blueprint flex-col p-6 xl:p-8 z-10 backdrop-blur-sm"
            aria-label="Sidebar metrics"
        >
            {/* Identity */}
            <div className="mb-10">
                <h1 className="text-xl xl:text-2xl font-mono text-slate-100 tracking-wider font-bold">
                    VAIBHAV SHARMA
                </h1>
                {/* ── Typography refinement: smaller, wider tracking, lower neon intensity */}
                <p className="text-accent-cyan/60 font-mono text-[11px] mt-1.5 tracking-[0.25em] uppercase">
                    Systems Engineer
                </p>
            </div>

            {/* Metrics */}
            <div className="space-y-8 font-mono text-sm flex-1">
                <div className="space-y-3">
                    <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] border-b border-line-blueprint pb-2">Experience</p>
                    <MetricItem icon={<Code size={16} />} label="Years Coding" value={metricsData.yearsCoding} />
                </div>

                <div className="space-y-3">
                    <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] border-b border-line-blueprint pb-2">Output</p>
                    <MetricItem
                        icon={<Layers size={16} />} label="Projects Shipped" value={metricsData.projectsShipped}
                        metricKey="projectsShipped" onHover={handleHover} isHighlighted={activeMetric === 'projectsShipped'}
                    />
                    <MetricItem
                        icon={<Server size={16} />} label="Systems Designed" value={metricsData.systemsDesigned}
                        metricKey="systemsDesigned" onHover={handleHover} isHighlighted={activeMetric === 'systemsDesigned'}
                    />
                    <MetricItem
                        icon={<Rocket size={16} />} label="Prod Deployments" value={metricsData.productionDeployments}
                        metricKey="productionDeployments" onHover={handleHover} isHighlighted={activeMetric === 'productionDeployments'}
                    />
                </div>

                <div className="space-y-3">
                    <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] border-b border-line-blueprint pb-2">Stack</p>
                    <MetricItem icon={<Wrench size={16} />} label="Primary Stack" value={metricsData.primaryStack} />
                    <MetricItem icon={<Cpu size={16} />} label="Current Focus" value={metricsData.currentFocus} />
                </div>
            </div>

            {/* Status */}
            <div className="mt-auto pt-6 border-t border-line-blueprint">
                <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                    <StatusDot />
                    System Status: ONLINE
                </div>
            </div>
        </aside>
    );
};
