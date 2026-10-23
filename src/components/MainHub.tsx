import React, { useState } from 'react';
import { 
  Lock, 
  Globe, 
  ArrowUpRight,
  Edit3, 
  Check, 
  X,
  Plus,
  Minus
} from 'lucide-react';
import { sound } from '../utils/audio';

interface OpenCardConfig {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  url: string;
  symbol: string;
  accent: 'indigo' | 'sky';
}

const DEFAULT_OPEN_CARDS: OpenCardConfig[] = [
  {
    id: 'box_addition_subtraction',
    title: 'Addition & Subtraction',
    subtitle: 'Mental Math, Vertical Arithmetic & Calculation Challenges',
    badge: 'ACTIVE · OPEN NOW',
    url: 'https://kids-center-pro2.vercel.app/',
    symbol: '+ −',
    accent: 'indigo',
  },
  {
    id: 'box_multiplication_division',
    title: 'Multiplication & Division',
    subtitle: 'Times Tables, Integer Division & Speed Operations',
    badge: 'ACTIVE · OPEN NOW',
    url: 'http://kids-center-pro.vercel.app/',
    symbol: '× ÷',
    accent: 'sky',
  },
];

export const MainHub: React.FC = () => {
  // Load saved custom links or default to the user's provided URLs
  const [openCards, setOpenCards] = useState<OpenCardConfig[]>(() => {
    try {
      const stored = localStorage.getItem('kidscenter_open_cards_links_v2');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignored
    }
    return DEFAULT_OPEN_CARDS;
  });

  // Modal to edit a link if needed
  const [editingCard, setEditingCard] = useState<OpenCardConfig | null>(null);
  const [tempUrl, setTempUrl] = useState('');
  const [tempTitle, setTempTitle] = useState('');

  const handleCardClick = (card: OpenCardConfig) => {
    sound.playClick();
    if (card.url && card.url !== '#') {
      window.open(card.url, '_blank', 'noopener,noreferrer');
    }
  };

  const openEditModal = (card: OpenCardConfig, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setEditingCard(card);
    setTempUrl(card.url);
    setTempTitle(card.title);
  };

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    sound.playVictory();
    const updated = openCards.map((c) =>
      c.id === editingCard.id ? { ...c, url: tempUrl.trim() || '#', title: tempTitle.trim() || c.title } : c
    );
    setOpenCards(updated);
    localStorage.setItem('kidscenter_open_cards_links_v2', JSON.stringify(updated));
    setEditingCard(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 animate-in fade-in duration-300">
      
      {/* Edit Link Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-[32px] w-full max-w-md p-6 card-soft-black-shadow">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-black text-slate-900">
                  Edit Box Link
                </h3>
              </div>
              <button
                onClick={() => setEditingCard(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLink} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Box Title:
                </label>
                <input
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Destination URL:
                </label>
                <input
                  type="url"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="https://kids-center-pro..."
                  required
                  autoFocus
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-2xl px-4 py-2.5 text-xs font-mono text-slate-900 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Hub Content: Two Active Open Boxes + Three Blank Locked Boxes */}
      <div className="space-y-8">
        
        {/* SECTION 1: TWO OPEN CLICKABLE BOXES */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Active Platforms
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any portal below to launch the live platform
              </p>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>2 Live</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {openCards.map((card, idx) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="group relative bg-white border border-slate-200/90 rounded-[32px] p-6 sm:p-7 card-soft-black-shadow hover:translate-y-[-2px] hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className={`absolute -right-12 -top-12 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300 ${
                  idx === 0 ? 'bg-indigo-500 group-hover:opacity-40' : 'bg-sky-500 group-hover:opacity-40'
                }`} />

                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>{card.badge}</span>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => openEditModal(card, e)}
                      title="Edit Link"
                      className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Symbol & Title */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-2xl font-black math-font ${
                      idx === 0 
                        ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                        : 'bg-sky-50 text-sky-600 border border-sky-100'
                    }`}>
                      {card.symbol}
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[220px]">
                    {card.url}
                  </span>

                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white group-hover:bg-indigo-600 font-bold text-xs shadow-md transition-all">
                    <span>Open</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: THREE LOCKED BOXES (COMPLETELY BLANK WITH LOCK ONLY) */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[1, 2, 3].map((num) => (
              <div
                key={`locked_blank_${num}`}
                className="group relative bg-slate-50/50 border border-slate-200/60 rounded-[32px] p-8 card-soft-black-shadow flex flex-col items-center justify-center min-h-[190px] select-none"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 text-slate-300 flex items-center justify-center shadow-xs group-hover:text-slate-400 group-hover:scale-105 transition-all">
                  <Lock className="w-6 h-6 stroke-[1.75]" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
