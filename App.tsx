
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CdlDashboard from './components/Dashboard';
import MerchantDashboard from './components/MerchantDashboard';
import ChatAgent from './components/ChatAgent';
import CollectionsManager from './components/CollectionsManager';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { NegotiationRules } from './types';
import { DEMO_CDL_NAME } from './demoConfig';

const MOBILE_BREAKPOINT = '(max-width: 767px)';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'cdl' | 'merchant' | 'collections' | 'simulator'>('cdl');
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_BREAKPOINT).matches : false
  );
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  
  // Estado global das regras de negociação
  const [rules, setRules] = useState<NegotiationRules>({
    maxDiscount: 15,
    maxInstallments: 6,
    paymentMethods: ['PIX', 'Cartão', 'Boleto']
  });

  // Detectar viewport mobile e manter o menu colapsável apenas nesses casos
  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);

      if (!event.matches) {
        setIsSidebarOpenMobile(false);
      }
    };

    handleViewportChange(mediaQuery);

    const listener = (event: MediaQueryListEvent) => handleViewportChange(event);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }

    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    document.body.style.overflow = isSidebarOpenMobile ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isSidebarOpenMobile]);

  return (
    <div className="min-h-[100dvh] bg-[#f8fafc] md:flex">
      <div
        className={`fixed inset-0 z-30 bg-slate-950/55 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          isSidebarOpenMobile ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsSidebarOpenMobile(false)}
        aria-hidden={!isSidebarOpenMobile}
      />

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-screen max-w-full transform transition-transform duration-300 ease-out md:static md:h-[100dvh] md:w-64 md:max-w-none md:shrink-0 md:translate-x-0 ${
          isSidebarOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
        role={isMobile ? 'dialog' : undefined}
        aria-modal={isMobile ? true : undefined}
      >
        <Sidebar 
          activeView={activeView}
          onViewChange={(view) => {
            setActiveView(view);
            if (isMobile) {
              setIsSidebarOpenMobile(false);
            }
          }}
          onClose={() => setIsSidebarOpenMobile(false)}
          showCloseButton={isMobile}
        />
      </aside>

      <main className="relative z-10 flex min-h-[100dvh] flex-1 flex-col md:min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10">
          {/* Mobile Menu Button - Always visible on mobile */}
          <button
            onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg z-50 relative"
            aria-label="Abrir/fechar menu"
            aria-expanded={isSidebarOpenMobile}
            aria-controls="app-sidebar"
          >
            {isSidebarOpenMobile ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Search Bar - Responsive */}
          <div className="flex-1 max-w-md lg:max-w-sm xl:max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar devedores..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-2 lg:gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">{DEMO_CDL_NAME}</p>
                <p className="text-[11px] text-slate-500 font-medium">Administrador da operação</p>
              </div>
              <div className="w-8 h-8 lg:w-9 lg:h-9 bg-slate-900 rounded-full flex items-center justify-center text-emerald-400 shadow-lg ring-2 ring-white ring-offset-2">
                <User size={16} className="lg:w-[18px] lg:h-[18px]" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {activeView === 'cdl' && <CdlDashboard />}
          {activeView === 'merchant' && <MerchantDashboard />}
          {activeView === 'collections' && (
            <CollectionsManager rules={rules} setRules={setRules} />
          )}
          {activeView === 'simulator' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div>
                  <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Simulador de Agente</h2>
                  <p className="text-sm text-slate-500">Instalação {DEMO_CDL_NAME} operando com {rules.maxDiscount}% de desc. e {rules.maxInstallments}x</p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider self-start">Modo Teste</div>
              </div>
              <ChatAgent rules={rules} />
            </div>
          )}
        </div>

        <footer className="bg-white/80 border-t border-slate-200 text-center py-3 text-xs text-slate-500 px-4">
          © Dominus Labs – Agente CDL. É proibida a cópia não autorizada deste material
        </footer>

        <div className="fixed bottom-6 right-4 lg:right-6 z-50">
          <div className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-emerald-400">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="hidden sm:inline">Motor de ROI Online</span>
            <span className="sm:hidden">Online</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
