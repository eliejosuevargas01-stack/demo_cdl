
import React, { useState } from 'react';
import { Upload, Play, Pause, Search, MessageCircle, Check, Clock, AlertCircle, X, Settings, Shield, Smartphone } from 'lucide-react';
import { NegotiationRules, Debtor } from '../types';

const DEBTORS_DATA: Debtor[] = [
  { id: '1', name: 'Carlos Eduardo Santos', amount: 1250.00, days: 45, status: 'negotiating', phone: '(11) 98765-4321', historyType: 'unemployed' },
  { id: '2', name: 'Mariana Lima', amount: 340.00, days: 12, status: 'pending', phone: '(11) 91234-5678', historyType: 'forgot' },
  { id: '3', name: 'Roberto Alencar', amount: 2100.00, days: 120, status: 'negotiating', phone: '(21) 99988-7766', historyType: 'aggressive' },
  { id: '4', name: 'Júlia Ferreira', amount: 890.00, days: 62, status: 'paid', phone: '(31) 98877-6655', historyType: 'cooperative' },
];

const getMockHistory = (debtor: Debtor, rules: NegotiationRules) => {
  const discountVal = (debtor.amount * (rules.maxDiscount / 100)).toFixed(2);
  const finalVal = (debtor.amount * (1 - rules.maxDiscount / 100)).toFixed(2);
  const installmentVal = (debtor.amount / rules.maxInstallments).toFixed(2);

  switch (debtor.historyType) {
    case 'unemployed':
      return [
        { role: 'assistant', content: `Olá ${debtor.name}! 👋 Sou o assistente digital da CDL. \n\nNotamos um débito de R$ ${debtor.amount.toFixed(2)}. Consegui liberar ${rules.maxDiscount}% de desconto para quitarmos isso hoje por apenas R$ ${finalVal}. \n\nVamos aproveitar? [BOTÃO: Quero o Desconto] [BOTÃO: Parcelar Dívida]`, time: '09:00' },
        { role: 'user', content: 'Estou desempregado agora, não consigo pagar nem com esse desconto.', time: '09:45' },
        { role: 'assistant', content: `Entendo perfeitamente sua situação. 🙏 O importante é não deixar seu crédito bloqueado. \n\nPodemos fazer em ${rules.maxInstallments}x de R$ ${installmentVal}. Fica melhor assim? [BOTÃO: Aceitar Parcelas] [BOTÃO: Falar com Humano]`, time: '09:46' },
      ];
    case 'forgot':
      return [
        { role: 'assistant', content: `Oi ${debtor.name}! Passando para te lembrar da fatura de R$ ${debtor.amount.toFixed(2)} que venceu. \n\nConsegue regularizar agora via PIX? [BOTÃO: Gerar PIX Agora] [BOTÃO: Já paguei]`, time: '10:00' },
        { role: 'user', content: 'Nossa, esqueci totalmente com a correria! Pode mandar o código?', time: '10:05' },
        { role: 'assistant', content: `Sem problemas! ✅ Aqui está seu código PIX Copia e Cola:\n\n00020101021126580014br.gov.bcb.pix0136CDL-RECUPERA-PROD-${debtor.id}\n\nO comprovante é validado automaticamente. [BOTÃO: Copiar Código]`, time: '10:06' },
      ];
    case 'aggressive':
      return [
        { role: 'assistant', content: `Olá ${debtor.name}, tudo bem? 👋\n\nSou o Agente ROI. Identificamos um atraso de ${debtor.days} dias. Gostaria de evitar que seu CPF seja negativado com uma oferta especial? [BOTÃO: Ver Oferta] [BOTÃO: Ignorar]`, time: '14:20' },
        { role: 'user', content: 'Não vou pagar juros abusivos. Se quiser tirar os juros eu pago.', time: '14:35' },
        { role: 'assistant', content: `Entendo sua frustração. Por isso, apliquei o desconto máximo de ${rules.maxDiscount}% removendo todos os juros e multas. \n\nO valor total cai para R$ ${finalVal}. Podemos fechar? [BOTÃO: Sim, Gerar Guia] [BOTÃO: Não tenho interesse]`, time: '14:36' },
      ];
    case 'cooperative':
      return [
        { role: 'assistant', content: `Olá ${debtor.name}! Temos uma excelente notícia para você hoje. 🚀\n\nLiberamos um plano de parcelamento em até ${rules.maxInstallments}x para sua dívida de R$ ${debtor.amount.toFixed(2)}. Vamos conferir? [BOTÃO: Sim, conferir]`, time: '08:15' },
        { role: 'user', content: 'Sim, por favor. Se as parcelas forem baixas eu aceito.', time: '08:20' },
        { role: 'assistant', content: `Excelente! ✅ Acordo fechado em ${rules.maxInstallments}x de R$ ${installmentVal}. \n\nA primeira parcela vence hoje. Obrigado por confiar na CDL! [BOTÃO: Baixar Carnê Digital]`, time: '08:22' },
      ];
    default:
      return [
        { role: 'assistant', content: `Olá ${debtor.name}! Vamos regularizar sua situação? Proposta especial hoje.\n\n[BOTÃO: Ver Proposta]`, time: '08:30' },
      ];
  }
};

const CollectionsManager: React.FC<{ rules: NegotiationRules, setRules: (r: NegotiationRules) => void }> = ({ rules, setRules }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDebtor, setSelectedDebtor] = useState<Debtor | null>(null);

  const handleRuleChange = (key: keyof NegotiationRules, value: any) => {
    setRules({ ...rules, [key]: value });
  };

  const renderHistoryMessage = (content: string) => {
    const buttonRegex = /\[BOTÃO: (.*?)\]/g;
    const parts = content.split(buttonRegex);
    const buttons = [...content.matchAll(buttonRegex)].map(match => match[1]);

    return (
      <div className="space-y-2">
        <p className="text-[13px] leading-tight text-slate-800 font-medium whitespace-pre-wrap">
          {parts[0].trim()}
        </p>
        {buttons.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-1">
            {buttons.map((btnText, i) => (
              <div 
                key={i}
                className="w-full py-2 px-3 bg-blue-50/50 border border-blue-100 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-tight text-center opacity-80"
              >
                {btnText}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Painel de Regras */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <Settings size={16} className="text-emerald-500" />
            Configuração de ROI
          </h3>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Desconto Máx. (À Vista)</label>
                <span className="text-xs font-black text-emerald-600">{rules.maxDiscount}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="90" step="5"
                value={rules.maxDiscount}
                onChange={(e) => handleRuleChange('maxDiscount', parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Parcelamento Máximo</label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 12, 24].map(num => (
                  <button
                    key={num}
                    onClick={() => handleRuleChange('maxInstallments', num)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${rules.maxInstallments === num ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
                  >
                    {num}x
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl border border-blue-100">
                <Shield size={18} className="text-blue-500 shrink-0" />
                <p className="text-[10px] text-blue-700 font-medium leading-tight">
                  A IA utiliza estas regras para gerar as ofertas automaticamente nos chats ao lado.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Devedores */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
             <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Lista de Recuperação</h3>
             <button 
               onClick={() => setIsRunning(!isRunning)}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                 isRunning ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-600 text-white shadow-md'
               }`}
             >
               {isRunning ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
               {isRunning ? 'Pausar Disparos' : 'Iniciar Agente'}
             </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 text-[10px] font-bold text-slate-400 uppercase">
                <tr>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Dívida</th>
                  <th className="px-6 py-3 text-center">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {DEBTORS_DATA.map(debtor => (
                  <tr key={debtor.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{debtor.name}</div>
                      <div className="text-[10px] text-emerald-600 font-medium">{debtor.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-black text-slate-700 leading-none">R$ {debtor.amount.toFixed(2)}</div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase mt-1">{debtor.days} dias de atraso</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedDebtor(debtor)}
                        className="p-2.5 bg-slate-100 hover:bg-emerald-100 text-slate-500 hover:text-emerald-600 rounded-xl transition-all active:scale-95"
                        title="Ver conversa no WhatsApp"
                      >
                        <MessageCircle size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Histórico Estilo WhatsApp */}
      {selectedDebtor && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-100 w-full max-w-[360px] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[650px] border-[8px] border-slate-900 relative">
            
            {/* Cabeçalho do Chat */}
            <div className="bg-[#075E54] pt-7 pb-3 px-5 text-white flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center font-black text-emerald-800 text-sm">
                {selectedDebtor.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-[14px] leading-tight">{selectedDebtor.name}</p>
                <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Online</p>
              </div>
              <button onClick={() => setSelectedDebtor(null)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            
            {/* Corpo das Mensagens */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#e5ddd5] custom-scrollbar">
              <div className="flex justify-center mb-4">
                <span className="bg-white/60 text-[9px] px-3 py-1 rounded-full text-slate-500 font-black uppercase tracking-widest border border-white/20">Chat Log Automático</span>
              </div>
              
              {getMockHistory(selectedDebtor, rules).map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[88%] p-3 rounded-2xl shadow-sm relative ${m.role === 'user' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
                    {m.role === 'assistant' ? renderHistoryMessage(m.content) : (
                      <p className="text-[13px] text-slate-800 font-medium">{m.content}</p>
                    )}
                    <p className="text-[9px] text-slate-400 text-right mt-1 font-black">{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Rodapé Fictício */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <div className="flex-1 bg-slate-50 rounded-full px-5 py-2 text-[11px] text-slate-400 italic font-bold text-center">
                Histórico de Negociação Real
              </div>
            </div>

            {/* Home Bar Indicator */}
            <div className="h-1.5 w-24 bg-slate-900/10 mx-auto rounded-full mb-1 opacity-20 shrink-0"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionsManager;
