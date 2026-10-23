import React from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onSoundToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isMuted, setIsMuted] = React.useState(sound.getMuted());

  const toggleSound = () => {
    const nextState = !isMuted;
    sound.setMuted(nextState);
    setIsMuted(nextState);
    if (!nextState) sound.playClick();
  };

  return (
    <div className="sticky top-4 z-40 w-full px-4 flex justify-center">
      {/* 80% Floating Navbar with Circular Border & Black Shadow */}
      <header className="w-full sm:w-[85%] md:w-[80%] max-w-5xl bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-full px-6 py-2.5 navbar-floating-luxury transition-all flex items-center justify-between gap-4">
        
        {/* Zone 1: Wordmark "kidscenter" with "PRO" underneath */}
        <div className="flex items-center gap-3 cursor-pointer select-none group">
          <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-md group-hover:scale-105 transition-transform">
            <span className="font-mono text-xs">KC</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif] lowercase">
              kidscenter
            </span>
            <span className="text-[10px] font-black text-indigo-600 tracking-wider">
              PRO
            </span>
          </div>
        </div>

        {/* Zone 2: Middle Status or Tagline */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/80 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Smart Learning Hub</span>
          <span className="text-slate-300">|</span>
          <span className="text-indigo-600 font-bold">Mental Math & Practice</span>
        </div>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
          </button>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>2 Portals Online</span>
          </div>
        </div>

      </header>
    </div>
  );
};
