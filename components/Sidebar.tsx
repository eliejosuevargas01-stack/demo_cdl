
import React from 'react';
import { LayoutDashboard, Users, MessageSquare, Calculator, Building2, LogOut, X } from 'lucide-react';

interface SidebarProps {
  activeView: 'cdl' | 'merchant' | 'collections' | 'simulator';
  onViewChange: (view: 'cdl' | 'merchant' | 'collections' | 'simulator') => void;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onClose, showCloseButton = false }) => {
  const menuItems = [
    { id: 'cdl', label: 'Painel CDL', icon: Building2 },
    { id: 'merchant', label: 'Painel Lojista', icon: LayoutDashboard },
    { id: 'collections', label: 'Lista de Devedores', icon: Users },
    { id: 'simulator', label: 'Simular Cobrança', icon: MessageSquare },
  ];

  return (
    <div className="flex h-[100dvh] min-h-[100dvh] w-full flex-col overflow-y-auto border-r border-slate-800/80 bg-slate-900 text-slate-300 shadow-2xl md:h-full md:min-h-0 md:shadow-none">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/95 p-6 backdrop-blur-sm md:p-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-900 font-black shadow-lg shadow-emerald-500/20">
            $
          </div>
          <span className="font-black text-xl text-white tracking-tighter uppercase">Agente ROI</span>
        </div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-700"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Operação Automática</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
              activeView === item.id
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 translate-x-1'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={18} strokeWidth={2.5} />
            {item.label}
          </button>
        ))}
        
        <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mt-10 mb-4">Configurações</p>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold hover:bg-slate-800 hover:text-white transition-all">
          <Calculator size={18} />
          Regras de Desconto
        </button>
      </nav>

      <div className="mt-auto p-4 border-t border-slate-800 space-y-1 bg-slate-900">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-rose-400 hover:bg-rose-500/10">
          <LogOut size={18} />
          Sair do Painel
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
