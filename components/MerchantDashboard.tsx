import React, { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import InfoTip from './InfoTip';

const data = [
  { name: 'Sem 01', recovered: 4500, lost: 1200 },
  { name: 'Sem 02', recovered: 8200, lost: 1800 },
  { name: 'Sem 03', recovered: 12500, lost: 900 },
  { name: 'Sem 04', recovered: 19800, lost: 1400 },
];

const MerchantDashboard: React.FC = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);

  const reportData = useMemo(() => ({
    period: 'Últimos 30 dias',
    totalRecovered: 'R$ 45.300',
    totalAgreements: '142',
    conversionRate: '82%',
    avgTicket: 'R$ 318,00',
    topChannels: [
      { label: 'WhatsApp', value: '68%' },
      { label: 'SMS', value: '22%' },
      { label: 'E-mail', value: '10%' },
    ],
    highlights: [
      'Pico de recuperação na Semana 04 (+58% vs Semana 03).',
      'PIX à vista representou 61% dos acordos.',
      'Tempo médio para fechar acordo: 2h 18m.',
    ],
  }), []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Performance de Recuperação 🚀</h1>
          <p className="text-slate-500">Transformando dívidas em lucro líquido automaticamente.</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl flex items-center gap-2">
          <span className="text-emerald-600 font-bold text-sm">ROI ATUAL: 14.2x</span>
          <InfoTip text="Quanto o valor recuperado representa em relação ao investimento." />
          <ArrowUpRight size={16} className="text-emerald-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <span className="text-slate-500 text-xs font-bold uppercase">Total Recuperado</span>
              <InfoTip text="Soma de tudo que foi pago pelos clientes no período." />
            </div>
            <DollarSign size={18} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">R$ 45.300</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">+18% este mês</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <span className="text-slate-500 text-xs font-bold uppercase">Acordos Firmados</span>
              <InfoTip text="Quantidade de acordos concluídos com sucesso." />
            </div>
            <CheckCircle2 size={18} className="text-blue-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">142</p>
          <p className="text-xs text-blue-600 font-medium mt-1">82% de conversão</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <span className="text-slate-500 text-xs font-bold uppercase">Em Negociação</span>
              <InfoTip text="Clientes que ainda estão em conversa ativa." />
            </div>
            <TrendingUp size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">58</p>
          <p className="text-xs text-amber-600 font-medium mt-1">Aguardando aceite</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <span className="text-slate-500 text-xs font-bold uppercase">Ticket Médio Acordo</span>
              <InfoTip text="Valor médio recuperado por acordo fechado." />
            </div>
            <AlertCircle size={18} className="text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">R$ 318,00</p>
          <p className="text-xs text-indigo-600 font-medium mt-1">Otimizado por IA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <h3 className="font-bold text-slate-800">Fluxo de Caixa Recuperado (Mensal)</h3>
              <InfoTip text="Evolução semanal do valor recuperado no mês." />
            </div>
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
          <div className="flex items-center mb-4">
            <h3 className="font-bold">Status de Atividade</h3>
            <InfoTip text="Visão rápida do status do agente e da lista atual." />
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <p className="text-sm font-bold">Agente Ativo</p>
                  <InfoTip text="Indica se o agente está operando neste momento." />
                </div>
                <p className="text-xs text-slate-400">Canal: WhatsApp / SMS</p>
              </div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <div className="flex items-center">
                  <span className="text-slate-400">Progresso da Lista Atual</span>
                  <InfoTip text="Percentual da lista de devedores já contatada." />
                </div>
                <span className="text-emerald-400">65%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[65%] h-full bg-emerald-500"></div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center mb-4">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Últimas Ações</p>
                <InfoTip text="Resumo das interações mais recentes do agente." />
              </div>
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

            <button
              onClick={() => setIsReportOpen(true)}
              className="w-full py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors text-sm"
            >
              Ver Relatório Detalhado
            </button>
          </div>
        </div>
      </div>

      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setIsReportOpen(false)}
          ></div>
          <div className="relative bg-white w-[92%] max-w-2xl rounded-3xl shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Relatório Detalhado</p>
                <h3 className="text-xl font-black text-slate-900">Desempenho da Loja</h3>
                <p className="text-sm text-slate-500">{reportData.period}</p>
              </div>
              <button
                onClick={() => setIsReportOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                Fechar
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Total Recuperado</p>
                    <InfoTip text="Soma de tudo que foi pago pelos clientes no período." />
                  </div>
                  <p className="text-lg font-black text-slate-900">{reportData.totalRecovered}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Acordos</p>
                    <InfoTip text="Quantidade de acordos concluídos com sucesso." />
                  </div>
                  <p className="text-lg font-black text-slate-900">{reportData.totalAgreements}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Conversão</p>
                    <InfoTip text="Percentual de negociações que viraram acordo." />
                  </div>
                  <p className="text-lg font-black text-slate-900">{reportData.conversionRate}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Ticket Médio</p>
                    <InfoTip text="Valor médio recuperado por acordo fechado." />
                  </div>
                  <p className="text-lg font-black text-slate-900">{reportData.avgTicket}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Canais com Melhor Conversão</p>
                    <InfoTip text="Ranking dos canais que mais fecham acordo." />
                  </div>
                  <div className="space-y-3">
                    {reportData.topChannels.map((channel) => (
                      <div key={channel.label} className="flex items-center justify-between">
                        <span className="text-sm text-slate-700 font-medium">{channel.label}</span>
                        <span className="text-sm font-black text-emerald-600">{channel.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Destaques do Período</p>
                    <InfoTip text="Eventos e resultados que marcaram o período." />
                  </div>
                  <ul className="space-y-2">
                    {reportData.highlights.map((item, index) => (
                      <li key={index} className="text-sm text-slate-700">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsReportOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900"
                >
                  Fechar
                </button>
                <button className="px-4 py-2 text-sm font-bold bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400">
                  Baixar PDF (fake)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantDashboard;
