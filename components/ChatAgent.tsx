
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smartphone, Loader2, ShieldCheck } from 'lucide-react';
import { Message, NegotiationRules } from '../types';
import { getAgentResponseStream } from '../services/geminiService';

const ChatAgent: React.FC<{ rules: NegotiationRules }> = ({ rules }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Início automático do agente
  useEffect(() => {
    const startAgent = async () => {
      if (messages.length > 0) return;
      handleSend("Olá, inicie a conversa de cobrança comigo.");
    };
    startAgent();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async (customInput?: string) => {
    const text = customInput || input;
    if (!text.trim() || isLoading) return;

    // Se for o comando inicial interno, não mostramos a mensagem do usuário
    const isInternalInit = text === "Olá, inicie a conversa de cobrança comigo.";
    
    if (!isInternalInit) {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMsg]);
    }

    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: m.content }]
    }));

    try {
      const stream = await getAgentResponseStream(text, history, rules);
      
      // Cria uma mensagem vazia para o assistente que será preenchida pelo stream
      const assistantMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }]);

      let fullContent = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullContent += chunkText;
        setMessages(prev => prev.map(m => 
          m.id === assistantMsgId ? { ...m, content: fullContent } : m
        ));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContentWithButtons = (content: string) => {
    // Regex para encontrar botões [BOTÃO: Texto]
    const buttonRegex = /\[BOTÃO: (.*?)\]/g;
    const parts = content.split(buttonRegex);
    const buttons = [...content.matchAll(buttonRegex)].map(match => match[1]);

    return (
      <div className="space-y-3">
        {/* Mostra apenas a parte que não é botão no corpo da mensagem */}
        <p className="text-[14px] leading-tight text-slate-800 font-medium whitespace-pre-wrap">
          {parts[0].trim()}
        </p>
        
        {/* Renderiza os botões de forma destacada */}
        {buttons.length > 0 && !isLoading && (
          <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 mt-2">
            {buttons.map((btnText, i) => (
              <button
                key={i}
                onClick={() => handleSend(btnText)}
                className="w-full py-2.5 px-4 bg-white border border-blue-100 text-blue-600 rounded-xl text-[12px] font-black uppercase tracking-tight hover:bg-blue-50 transition-all text-center shadow-sm active:scale-95"
              >
                {btnText}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[700px] bg-[#e5ddd5] rounded-[3rem] border-[10px] border-slate-900 shadow-2xl overflow-hidden max-w-[380px] mx-auto relative">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-xl z-20"></div>

      {/* Header WhatsApp */}
      <div className="bg-[#075E54] pt-7 pb-3 px-4 text-white flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-black text-sm">
          CDL
        </div>
        <div className="flex-1">
          <p className="font-bold text-[14px] flex items-center gap-1">
            Agente Recupera 
            <ShieldCheck size={14} className="text-emerald-400" />
          </p>
          <p className="text-[10px] text-emerald-300 font-bold uppercase">Online</p>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        <div className="flex justify-center my-2">
          <span className="bg-white/60 text-[10px] px-3 py-1 rounded-lg text-slate-500 font-bold uppercase tracking-widest">Criptografia CDL Ativa</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[88%] p-3 rounded-2xl shadow-sm relative ${
              msg.role === 'user' ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'
            }`}>
              {msg.role === 'assistant' ? renderContentWithButtons(msg.content) : (
                <p className="text-[14px] text-slate-800 font-medium">{msg.content}</p>
              )}
              <div className="flex items-center justify-end gap-1 mt-1">
                <p className="text-[9px] text-slate-400 font-bold">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {msg.role === 'user' && <div className="flex"><ShieldCheck size={10} className="text-blue-400" /></div>}
              </div>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1]?.content === '' && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-[#f0f2f5] border-t border-slate-200">
        <div className="flex gap-2 items-center bg-white rounded-full px-4 py-1.5 shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Responda o agente..."
            className="flex-1 bg-transparent py-1.5 text-[14px] focus:outline-none text-slate-700"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-[#075E54] text-white rounded-full hover:bg-emerald-800 disabled:bg-slate-300 transition-all shadow active:scale-90"
          >
            <Send size={16} fill="currentColor" />
          </button>
        </div>
      </div>
      
      {/* Home Indicator */}
      <div className="h-1 w-24 bg-slate-300 mx-auto rounded-full mb-1.5 opacity-30"></div>
    </div>
  );
};

export default ChatAgent;
