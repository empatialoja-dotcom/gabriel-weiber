import React from 'react';
import { User, EyeOff, AlertTriangle } from 'lucide-react';

interface CardProps {
  playerName: string;
  isOpen: boolean;
  onOpen: () => void;
  isImpostor: boolean;
  theme: string;
  word?: string; // Undefined if impostor
  hint?: string; // Only for impostor
}

const Card: React.FC<CardProps> = ({ 
  playerName, 
  isOpen, 
  onOpen, 
  isImpostor, 
  theme, 
  word, 
  hint 
}) => {
  return (
    <div className="w-full max-w-sm aspect-[3/4] perspective-1000 mx-auto my-6 cursor-pointer" onClick={!isOpen ? onOpen : undefined}>
      <div 
        className={`relative w-full h-full text-center transition-transform duration-700 transform-style-3d ${
          isOpen ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT OF CARD (Closed) */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-indigo-600 to-blue-800 border-2 border-indigo-400/30 flex flex-col items-center justify-center p-6">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{playerName}</h2>
          <p className="text-indigo-200 text-sm mt-4 font-medium uppercase tracking-wider">
            Toque para revelar sua carta
          </p>
          <div className="absolute bottom-6 opacity-50">
            <EyeOff className="w-6 h-6 text-indigo-300" />
          </div>
        </div>

        {/* BACK OF CARD (Open) */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-2xl border-4 flex flex-col items-center justify-center p-6 ${
          isImpostor 
            ? 'bg-slate-800 border-red-500 shadow-red-900/20' 
            : 'bg-slate-800 border-emerald-500 shadow-emerald-900/20'
        }`}>
          {isImpostor ? (
            // IMPOSTOR VIEW
            <>
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-black text-red-500 mb-6 uppercase tracking-widest text-center">
                VOCÊ É O<br/>IMPOSTOR
              </h2>
              
              <div className="w-full bg-slate-700/50 rounded-xl p-4 mb-4 border border-slate-600">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Tema</p>
                <p className="text-xl font-bold text-white">{theme}</p>
              </div>

              <div className="w-full bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Dica Vaga</p>
                <p className="text-lg font-medium text-red-200 italic">"{hint}"</p>
              </div>
              
              <p className="text-xs text-red-400/60 mt-6 text-center px-4">
                Finja saber a palavra. Descubra a palavra secreta ouvindo os outros.
              </p>
            </>
          ) : (
            // REGULAR PLAYER VIEW
            <>
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8">
                <User className="w-10 h-10 text-emerald-500" />
              </div>
              
              <div className="w-full bg-slate-700/50 rounded-xl p-5 mb-6 border border-slate-600">
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Tema</p>
                <p className="text-xl font-bold text-white">{theme}</p>
              </div>

              <div className="w-full bg-emerald-900/20 rounded-xl p-6 border border-emerald-500/30">
                <p className="text-xs text-emerald-400 uppercase tracking-wide mb-1">Palavra Secreta</p>
                <p className="text-3xl font-black text-white">{word}</p>
              </div>

              <p className="text-xs text-slate-500 mt-8 text-center px-4">
                Dê dicas sobre a palavra sem revelar demais para não ajudar o impostor.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;