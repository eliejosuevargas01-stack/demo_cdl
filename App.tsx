
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatAgent from './components/ChatAgent';
import CollectionsManager from './components/CollectionsManager';
import { Search, Bell, User } from 'lucide-react';
import { NegotiationRules } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'collections' | 'simulator'>('dashboard');
  
  // Estado global das regras de negociação
  const [rules, setRules] = useState<NegotiationRules>({
    maxDiscount: 15,
    maxInstallments: 6,
    paymentMethods: ['PIX', 'Cartão', 'Boleto']
  });

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar devedores ou acordos..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">Minha Loja CDL</p>
                <p className="text-[11px] text-slate-500 font-medium">Administrador</p>
              </div>
              <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center text-emerald-400 shadow-lg ring-2 ring-white ring-offset-2">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'collections' && (
            <CollectionsManager rules={rules} setRules={setRules} />
          )}
          {activeView === 'simulator' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Simulador de Agente</h2>
                  <p className="text-sm text-slate-500">O Agente ROI operando com {rules.maxDiscount}% de desc. e {rules.maxInstallments}x</p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Modo Teste</div>
              </div>
              <ChatAgent rules={rules} />
            </div>
          )}
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-emerald-400">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Motor de ROI Online
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
