
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

const data = [
  { name: 'Sem 01', recovered: 4500, lost: 1200 },
  { name: 'Sem 02', recovered: 8200, lost: 1800 },
  { name: 'Sem 03', recovered: 12500, lost: 900 },
  { name: 'Sem 04', recovered: 19800, lost: 1400 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Performance de Recuperação 🚀</h1>
          <p className="text-slate-500">Transformando dívidas em lucro líquido automaticamente.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl flex items-center gap-2">
          <span className="text-emerald-600 font-bold text-sm">ROI ATUAL: 14.2x</span>
          <ArrowUpRight size={16} className="text-emerald-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 text-xs font-bold uppercase">Total Recuperado</span>
            <DollarSign size={18} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">R$ 45.300</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">+18% este mês</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 text-xs font-bold uppercase">Acordos Firmados</span>
            <CheckCircle2 size={18} className="text-blue-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">142</p>
          <p className="text-xs text-blue-600 font-medium mt-1">82% de conversão</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 text-xs font-bold uppercase">Em Negociação</span>
            <TrendingUp size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">58</p>
          <p className="text-xs text-amber-600 font-medium mt-1">Aguardando aceite</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 text-xs font-bold uppercase">Ticket Médio Acordo</span>
            <AlertCircle size={18} className="text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">R$ 318,00</p>
          <p className="text-xs text-indigo-600 font-medium mt-1">Otimizado por IA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">Fluxo de Caixa Recuperado (Mensal)</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-slate-500">Recuperado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <span className="text-xs text-slate-500">Projetado</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip />
                <Area type="monotone" dataKey="recovered" stroke="#10b981" fillOpacity={1} fill="url(#recoveredGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl text-white">
          <h3 className="font-bold mb-4">Status de Atividade</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">Agente Ativo</p>
                <p className="text-xs text-slate-400">Canal: WhatsApp / SMS</p>
              </div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Progresso da Lista Atual</span>
                <span className="text-emerald-400">65%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[65%] h-full bg-emerald-500"></div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-4 font-medium uppercase tracking-widest">Últimas Ações</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></div>
                  <p className="text-xs text-slate-300">Negociação aberta com <b>Marcos O.</b> (R$ 450,00)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5"></div>
                  <p className="text-xs text-slate-300">Acordo fechado: <b>Ana Paula</b> (À vista - 15% desc.)</p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors text-sm">
              Ver Relatório Detalhado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
