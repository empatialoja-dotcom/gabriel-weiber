import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Clock, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  Check, 
  Trash2, 
  Info,
  Menu,
  Volume2,
  VolumeX
} from 'lucide-react';
import Card from './components/Card';
import { 
  GamePhase, 
  Player, 
  GameSettings, 
  RoundData, 
  CardState 
} from './types';
import { 
  CATEGORIES, 
  MIN_PLAYERS, 
  MAX_PLAYERS, 
  TIME_OPTIONS 
} from './constants';
import { audio } from './utils/audio';

const App: React.FC = () => {
  // --- STATE ---
  const [phase, setPhase] = useState<GamePhase>(GamePhase.SETUP);
  const [isMuted, setIsMuted] = useState(false);
  
  // Setup State
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [inputName, setInputName] = useState('');
  const [selectedTime, setSelectedTime] = useState<number>(5);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(CATEGORIES.map(c => c.id)); // Default all
  
  // Game Logic State
  const [players, setPlayers] = useState<Player[]>([]);
  const [roundData, setRoundData] = useState<RoundData | null>(null);
  
  // Card Pass State
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [cardState, setCardState] = useState<CardState>(CardState.CLOSED);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(0);

  // --- HELPERS ---

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    audio.setMute(newState);
    if (!newState) audio.playClick();
  };

  const addPlayer = () => {
    const trimmed = inputName.trim();
    if (!trimmed) return;
    if (playerNames.includes(trimmed)) {
      alert('Nome já existe!');
      return;
    }
    if (playerNames.length >= MAX_PLAYERS) return;
    
    audio.playClick();
    setPlayerNames([...playerNames, trimmed]);
    setInputName('');
  };

  const removePlayer = (name: string) => {
    audio.playClick();
    setPlayerNames(playerNames.filter(n => n !== name));
  };

  const toggleCategory = (id: string) => {
    audio.playClick();
    if (selectedCategories.includes(id)) {
      // Don't allow empty categories
      if (selectedCategories.length === 1) return;
      setSelectedCategories(selectedCategories.filter(c => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const startGame = () => {
    if (playerNames.length < MIN_PLAYERS) return;

    audio.playStart();

    // 1. Setup Players & Impostor
    const impostorIdx = Math.floor(Math.random() * playerNames.length);
    const newPlayers: Player[] = playerNames.map((name, idx) => ({
      id: `p-${idx}`,
      name,
      isImpostor: idx === impostorIdx
    }));

    // 2. Setup Round Data (Theme/Word)
    // Filter available categories
    const validCategories = CATEGORIES.filter(c => selectedCategories.includes(c.id));
    // Pick random category
    const randomCat = validCategories[Math.floor(Math.random() * validCategories.length)];
    // Pick random item
    const randomItem = randomCat.items[Math.floor(Math.random() * randomCat.items.length)];
    
    setPlayers(newPlayers);
    setRoundData({
      category: randomCat.label,
      word: randomItem.word,
      hint: randomItem.hint,
      impostorName: newPlayers[impostorIdx].name
    });
    
    // 3. Reset States
    setCurrentPlayerIdx(0);
    setCardState(CardState.CLOSED);
    setPhase(GamePhase.CARD_PASS);
  };

  const handleCardOpen = () => {
    audio.playFlip();
    setCardState(CardState.OPEN);
  };

  const handleCardClose = () => {
    audio.playFlip();
    setCardState(CardState.FINISHED);
  };

  const nextPlayer = () => {
    audio.playClick();
    if (currentPlayerIdx < players.length - 1) {
      setCurrentPlayerIdx(prev => prev + 1);
      setCardState(CardState.CLOSED);
    } else {
      // All players seen
      startTimerPhase();
    }
  };

  const startTimerPhase = () => {
    audio.playStart();
    setTimeLeft(selectedTime * 60);
    setPhase(GamePhase.TIMER);
  };

  // Timer Effect
  useEffect(() => {
    let interval: number;
    if (phase === GamePhase.TIMER && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => {
          // Play tick for last 10 seconds
          if (prev <= 11 && prev > 1) {
            audio.playTick();
          }
          
          if (prev <= 1) {
            setPhase(GamePhase.REVEAL);
            audio.playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const resetGame = () => {
    audio.playClick();
    setPhase(GamePhase.SETUP);
    setPlayers([]);
    setRoundData(null);
  };

  const playAgain = () => {
    // Keep names, just restart logic
    startGame();
  };

  const forceReveal = () => {
    audio.playWin();
    setPhase(GamePhase.REVEAL);
  };

  // --- RENDERS ---

  if (phase === GamePhase.SETUP) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col p-4 max-w-md mx-auto">
        <header className="mb-6 mt-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-tighter">
              IMPOSTOR
            </h1>
            <p className="text-slate-400 text-xs font-medium tracking-wide">JOGO DE DEDUÇÃO SOCIAL</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={toggleMute}
              className="bg-slate-800 p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="bg-slate-800 p-2 rounded-lg">
               <Menu className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          {/* Players Section */}
          <section className="mb-8">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">
              <Users className="w-4 h-4" /> Jogadores ({playerNames.length}/{MAX_PLAYERS})
            </h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Nome do jogador"
                className="flex-1 bg-slate-800 border-none rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
              />
              <button 
                onClick={addPlayer}
                disabled={!inputName.trim() || playerNames.length >= MAX_PLAYERS}
                className="bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 text-white p-3 rounded-xl transition-colors"
              >
                <Check className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {playerNames.map((name, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-800 rounded-lg pl-3 pr-2 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <span className="font-medium">{name}</span>
                  <button onClick={() => removePlayer(name)} className="text-slate-500 hover:text-red-400 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {playerNames.length === 0 && (
                <p className="text-slate-600 text-sm italic w-full text-center py-4">Adicione pelo menos 3 jogadores</p>
              )}
            </div>
          </section>

          {/* Time Section */}
          <section className="mb-8">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">
              <Clock className="w-4 h-4" /> Tempo de Partida
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {TIME_OPTIONS.map(time => (
                <button
                  key={time}
                  onClick={() => {
                    audio.playClick();
                    setSelectedTime(time);
                  }}
                  className={`py-3 rounded-xl font-bold transition-all ${
                    selectedTime === time 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50 scale-105' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {time} min
                </button>
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section className="mb-8">
             <h2 className="flex items-center gap-2 text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">
              <Menu className="w-4 h-4" /> Temas
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                    selectedCategories.includes(cat.id)
                      ? 'bg-emerald-900/30 border-emerald-500 text-emerald-400'
                      : 'bg-slate-800 border-transparent text-slate-400 opacity-60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Start Button */}
        <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-900 to-transparent">
          <button
            onClick={startGame}
            disabled={playerNames.length < MIN_PLAYERS}
            className="w-full max-w-md mx-auto bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-900/40 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale transition-transform active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            INICIAR PARTIDA
          </button>
        </div>
      </div>
    );
  }

  if (phase === GamePhase.CARD_PASS) {
    const currentPlayer = players[currentPlayerIdx];
    
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300" 
            style={{ width: `${((currentPlayerIdx) / players.length) * 100}%` }}
          />
        </div>

        <div className="w-full max-w-md">
          {cardState === CardState.FINISHED ? (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Carta Fechada</h2>
              <p className="text-slate-400 mb-8">Passe o dispositivo para o próximo jogador.</p>
              
              <button
                onClick={nextPlayer}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40"
              >
                {currentPlayerIdx === players.length - 1 ? 'INICIAR CRONÔMETRO' : 'PRÓXIMO JOGADOR'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h3 className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">
                Jogador {currentPlayerIdx + 1} de {players.length}
              </h3>
              
              <Card
                playerName={currentPlayer.name}
                isOpen={cardState === CardState.OPEN}
                onOpen={handleCardOpen}
                isImpostor={currentPlayer.isImpostor}
                theme={roundData!.category}
                word={roundData!.word}
                hint={roundData!.hint}
              />

              {cardState === CardState.OPEN && (
                <button
                  onClick={handleCardClose}
                  className="mt-6 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full border border-slate-500 transition-colors animate-in slide-in-from-bottom-4 fade-in"
                >
                  FECHAR CARTA
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === GamePhase.TIMER) {
    const isUrgent = timeLeft < 60;

    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center transition-colors duration-1000 ${isUrgent ? 'bg-red-950/30' : 'bg-slate-900'}`}>
        <div className="w-full max-w-md space-y-12">
          
          <div>
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Discussão</h2>
            <p className="text-slate-400 text-lg">
              Façam perguntas. Analisem as respostas.<br/>
              <span className="text-indigo-400 font-bold">Descubram o Impostor!</span>
            </p>
          </div>

          <div className="relative">
            {/* Pulsing circles behind timer */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full ${isUrgent ? 'bg-red-500/10 animate-ping' : 'bg-indigo-500/5'}`} />
            
            <div className={`text-8xl font-black tabular-nums tracking-tighter ${isUrgent ? 'text-red-500' : 'text-white'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
             <div className="flex items-center gap-3 mb-2 justify-center text-yellow-500">
                <Info className="w-5 h-5" />
                <span className="font-bold uppercase text-sm tracking-wide">Lembrete do Tema</span>
             </div>
             <p className="text-2xl font-bold text-white">{roundData?.category}</p>
          </div>

          <button
            onClick={forceReveal}
            className="text-slate-500 hover:text-white underline text-sm uppercase tracking-widest mt-8"
          >
            Encerrar votação agora
          </button>
        </div>
      </div>
    );
  }

  if (phase === GamePhase.REVEAL) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md">
          <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Fim de Jogo</h2>
          
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
            
            <p className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-4">O Impostor era</p>
            <div className="mb-8">
              <h1 className="text-4xl font-black text-white mb-2">{roundData?.impostorName}</h1>
              <div className="inline-block bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/20">
                IMPOSTOR
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-slate-950/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Palavra</p>
                <p className="text-lg font-bold text-emerald-400">{roundData?.word}</p>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Tema</p>
                <p className="text-lg font-bold text-indigo-400">{roundData?.category}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={playAgain}
              className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              JOGAR NOVAMENTE
            </button>
            
            <button
              onClick={resetGame}
              className="w-full bg-slate-800 text-slate-300 font-bold py-4 rounded-xl hover:bg-slate-700 transition-colors"
            >
              MENU INICIAL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;