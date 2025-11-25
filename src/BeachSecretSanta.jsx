import React, { useState } from 'react';
import {
  Palmtree,
  Sun,
  Waves,
  Gift,
  EyeOff,
  Shell,
  LogIn,
  Lock
} from 'lucide-react';

// Participantes com suas senhas
const USERS = {
  'Paula': 'praia2024',
  'Renato': 'sol4521',
  'Bruno': 'onda8837',
  'Cristina': 'areia1956',
  'Julia': 'coco7742',
  'Sthéfano': 'mar3318'
};

const PARTICIPANTS = Object.keys(USERS);

// Restrições: quem NÃO pode tirar quem
const RESTRICTIONS = {
  'Renato': ['Paula'] // Renato não pode tirar Paula
};

// Sorteio fixo e validado manualmente
// Regras: ninguém tira a si mesmo, Renato não tira Paula
const MATCHES = {
  'Paula': 'Julia',
  'Renato': 'Cristina',
  'Bruno': 'Renato',
  'Cristina': 'Sthéfano',
  'Julia': 'Paula',
  'Sthéfano': 'Bruno'
};

const BeachSecretSanta = () => {
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('login'); // 'login', 'reveal'
  const [isRevealed, setIsRevealed] = useState(false);
  const [error, setError] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);

  const handleLogin = () => {
    const inputPassword = password.trim();

    // Encontra o usuário pela senha
    const foundUser = PARTICIPANTS.find(
      p => USERS[p] === inputPassword
    );

    if (!foundUser) {
      setError('Senha incorreta! Verifique e tente novamente.');
      return;
    }

    setLoggedUser(foundUser);
    setStep('reveal');
    setError('');
  };

  const handleLogout = () => {
    setStep('login');
    setLoggedUser(null);
    setPassword('');
    setIsRevealed(false);
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans text-slate-800 selection:bg-orange-200 flex flex-col items-center">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <Waves className="absolute -top-10 -left-10 w-64 h-64 text-cyan-600" />
        <Sun className="absolute top-10 right-10 w-40 h-40 text-orange-500 animate-spin-slow" />
        <Palmtree className="absolute bottom-0 left-10 w-80 h-80 text-teal-700" />
      </div>

      <div className="z-10 w-full max-w-lg px-4 py-8 flex flex-col flex-grow">

        {/* Header */}
        <header className="text-center mb-8 relative">
          <div className="inline-block p-4 rounded-full bg-white shadow-xl ring-4 ring-orange-100 mb-4 transform hover:rotate-6 transition-transform cursor-pointer">
            <Shell className="w-12 h-12 text-orange-500 mx-auto" />
          </div>
          <h1 className="text-4xl font-extrabold text-teal-800 tracking-tight drop-shadow-sm">
            Amigo Secreto <br/>
            <span className="text-orange-500 font-serif italic">Tropical</span> 🌴
          </h1>
          <p className="mt-2 text-slate-500 font-medium">
            Digite sua senha para ver quem você tirou!
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden flex flex-col flex-grow relative">

          {/* Top Wave Decoration */}
          <div className="h-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 w-full" />

          <div className="p-6 flex-grow flex flex-col">

            {/* LOGIN SCREEN */}
            {step === 'login' && (
              <div className="space-y-6 flex flex-col items-center justify-center h-full">
                <div className="text-center space-y-2">
                  <Lock className="w-12 h-12 text-teal-500 mx-auto mb-2" />
                  <h2 className="text-2xl font-bold text-teal-800">Digite sua senha</h2>
                  <p className="text-slate-500 text-sm">
                    Cada participante tem uma senha única
                  </p>
                </div>

                <div className="w-full max-w-xs space-y-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="Sua senha secreta..."
                    className="w-full bg-amber-50/50 border-2 border-amber-100 text-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-slate-400 text-center text-lg"
                    autoFocus
                  />

                  {error && (
                    <p className="text-red-500 text-sm font-medium text-center animate-bounce">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={handleLogin}
                    className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg transform transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-teal-500 text-white hover:scale-[1.02] hover:shadow-teal-200/50 active:scale-95"
                  >
                    <LogIn size={24} />
                    Entrar
                  </button>
                </div>
              </div>
            )}

            {/* REVEAL SCREEN */}
            {step === 'reveal' && loggedUser && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center mb-6">
                  <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-1">
                    Olá, {loggedUser}!
                  </p>
                  <h2 className="text-2xl font-bold text-teal-800">
                    Descubra seu amigo secreto
                  </h2>
                </div>

                <div
                  className="w-full max-w-xs aspect-[3/4] perspective-1000 group cursor-pointer"
                  onClick={() => setIsRevealed(!isRevealed)}
                >
                  <div
                    className="relative w-full h-full duration-700 preserve-3d transition-transform"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >

                    {/* Front of Card */}
                    <div
                      className="absolute w-full h-full backface-hidden bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white p-6 border-4 border-white"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Gift size={64} className="mb-4 animate-bounce" />
                      <p className="font-bold text-xl text-center">
                        Toque para ver quem você tirou!
                      </p>
                      <p className="text-xs mt-4 opacity-80">
                        (Cuidado com os curiosos de plantão)
                      </p>
                    </div>

                    {/* Back of Card */}
                    <div
                      className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center p-6 border-4 border-teal-400"
                      style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                    >
                      <p className="text-slate-400 font-medium mb-2">
                        Seu amigo secreto é...
                      </p>
                      <div className="my-6">
                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 break-words leading-tight">
                          {MATCHES[loggedUser]}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 italic mt-4">
                        "Espero que não seja um par de meias!" 🧦
                      </p>
                      <div className="mt-8 flex gap-2 items-center text-orange-500 text-xs font-bold uppercase tracking-wider">
                        <EyeOff size={16} />
                        Toque para esconder
                      </div>
                    </div>

                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-8 text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                >
                  ← Sair (para outra pessoa ver)
                </button>
              </div>
            )}

          </div>
        </div>

        <footer className="mt-6 text-center text-slate-400 text-xs font-medium">
          <p>Feito com ❤️ e Areia Virtual.</p>
        </footer>
      </div>
    </div>
  );
};

export default BeachSecretSanta;
