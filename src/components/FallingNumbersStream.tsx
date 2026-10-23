import React, { useEffect, useRef } from 'react';
import { Sparkles, Terminal } from 'lucide-react';

interface FallingNumbersStreamProps {
  className?: string;
}

export const FallingNumbersStream: React.FC<FallingNumbersStreamProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 240);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 580);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Characters pool: numbers and math symbols
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '×', '÷', '=', '%', 'π', '42', '7', '99', '100', '12', '88'];
    const fontSize = 14;
    const columns = Math.max(1, Math.floor(width / (fontSize + 4)));
    
    // Track drop positions for each column
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];

    const palette = [
      '#6366f1', // Indigo
      '#818cf8', // Light Indigo
      '#06b6d4', // Cyan
      '#10b981', // Emerald
      '#3b82f6', // Blue
      '#f59e0b', // Amber
    ];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50); // Stagger start above canvas
      speeds[i] = Math.random() * 1.5 + 1.2;      // Varied speed
      colors[i] = palette[Math.floor(Math.random() * palette.length)];
    }

    const render = () => {
      // Semi-transparent fade effect for glowing trails
      ctx.fillStyle = 'rgba(10, 15, 29, 0.22)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * (fontSize + 6) + 10;
        const y = drops[i] * fontSize;

        // Draw glowing head character
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = colors[i];
        ctx.fillText(text, x, y);

        // Draw trail character behind it
        if (drops[i] > 1) {
          ctx.fillStyle = colors[i];
          ctx.shadowBlur = 4;
          const trailText = chars[(i + Math.floor(drops[i])) % chars.length];
          ctx.fillText(trailText, x, y - fontSize);
        }

        ctx.shadowBlur = 0;

        // Reset drop when off screen
        if (y > height && Math.random() > 0.96) {
          drops[i] = 0;
          speeds[i] = Math.random() * 1.5 + 1.2;
        }

        drops[i] += speeds[i] * 0.45;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative flex flex-col justify-between overflow-hidden bg-slate-950 border border-slate-800 rounded-[32px] card-soft-black-shadow ${className}`}>
      {/* Top Header pill */}
      <div className="relative z-10 p-4 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-black tracking-wider text-slate-200 uppercase font-mono flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Math Stream</span>
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 font-mono">
          LIVE
        </span>
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1 w-full min-h-[380px] sm:min-h-[460px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        {/* Subtle center floating math emblem */}
        <div className="absolute inset-x-0 bottom-16 flex flex-col items-center pointer-events-none z-10 px-4 text-center">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-lg shadow-xl mb-2">
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent math-font">
              ∑ ∫ π 42
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-400 font-mono">
            kidscenter PRO Engine
          </span>
        </div>
      </div>

      {/* Bottom Footer bar */}
      <div className="relative z-10 p-3.5 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-md flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          <Sparkles className="w-3 h-3" />
          <span>Active Drop</span>
        </span>
        <span>60 FPS Cascading</span>
      </div>
    </div>
  );
};
