/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { FallingNumbersStream } from './components/FallingNumbersStream';
import { MainHub } from './components/MainHub';

export default function App() {
  // 1. Splash screen for exactly 2 seconds
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      
      {/* 80% Floating Navbar with circular border and black shadow */}
      <Navbar />

      {/* Main Container with Left Falling Numbers animation + Right Portals Hub */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1">
        
        {/* Responsive Grid: Left Falling Numbers Panel + Right Main Boxes Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDE: Falling Numbers Digital Rain Animation ("ديف في الجنب الشمال ارقام تسقط بي انميشن فاجر") */}
          <div className="lg:col-span-3 xl:col-span-3 lg:sticky lg:top-24">
            <FallingNumbersStream className="h-[520px] lg:h-[640px]" />
          </div>

          {/* RIGHT SIDE: 2 Open Clickable Boxes + 3 Locked Coming Soon Boxes */}
          <div className="lg:col-span-9 xl:col-span-9">
            <MainHub />
          </div>

        </div>

      </main>

      {/* Minimal clean footer */}
      <footer className="w-full py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-black font-['Outfit',sans-serif] text-slate-800">kids center</span>
            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              PRO
            </span>
          </div>
          <span>© 2026 kidscenter PRO · All Portals & Modules Reserved</span>
        </div>
      </footer>

    </div>
  );
}
