
import React, { useMemo, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Building2, DollarSign, ShieldCheck, Users, ArrowUpRight } from 'lucide-react';
import InfoTip from './InfoTip';

const recoveryData = [
  { name: 'Sem 01', recovered: 220000, lost: 140000 },
  { name: 'Sem 02', recovered: 310000, lost: 160000 },
  { name: 'Sem 03', recovered: 285000, lost: 120000 },
  { name: 'Sem 04', recovered: 425000, lost: 90000 },
];

const Dashboard: React.FC = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);

  const reportData = useMemo(() => ({
    period: 'Mês atual',
    totalRecovered: 'R$ 1.240.000',
    activeMerchants: '312',
    avgRoi: 'R$ 3,80',
    totalDebt: 'R$ 1.750.000',
    totalLost: 'R$ 510.000',
    cdlRevenue: 'R$ 37.200',
    friendlyRate: '94%',
    complaintRate: '0,4%',
    satisfaction: '4,7/5',
  }), []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Painel CDL • Visão Macro</h1>
          <p className="text-slate-500">Resultados consolidados para presidentes e diretores.</p>
        </div>
        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2">
          <span className="font-bold text-sm">{reportData.period}</span>
          <ArrowUpRight size={16} className="text-emerald-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <span className="text-slate-500 text-xs font-bold uppercase">Valor total recuperado</span>
              <InfoTip text="Soma de tudo que foi pago pelos clientes no mês." />
            </div>
            <DollarSign size={18} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">{reportData.totalRecovered}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">+18% vs mês anterior</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <span className="text-slate-500 text-xs font-bold uppercase">Lojistas ativos</span>
              <InfoTip text="Quantidade de lojas com cobrança ativa no período." />
            </div>
            <Users size={18} className="text-blue-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">{reportData.activeMerchants}</p>
          <p className="text-xs text-blue-600 font-medium mt-1">+27 novas lojas</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <span className="text-slate-500 text-xs font-bold uppercase">ROI médio por lojista</span>
              <InfoTip text="Média de valor recuperado para cada R$ 1 investido." />
            </div>
            <ArrowUpRight size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">{reportData.avgRoi}</p>
          <p className="text-xs text-amber-600 font-medium mt-1">Recuperado para cada R$ 1</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <span className="text-slate-500 text-xs font-bold uppercase">Receita da CDL (3%)</span>
              <InfoTip text="Comissão da CDL sobre o total recuperado no mês." />
            </div>
            <Building2 size={18} className="text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">{reportData.cdlRevenue}</p>
          <p className="text-xs text-indigo-600 font-medium mt-1">Renda recorrente do mês</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center">
                <h3 className="font-bold text-slate-800">Dívidas recuperadas vs perdidas</h3>
                <InfoTip text="Comparação entre o que foi recuperado e o que ficou perdido no mês." />
              </div>
              <p className="text-xs text-slate-500">Total do mês: {reportData.totalDebt}</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-500">Recuperadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                <span className="text-slate-500">Perdidas</span>
              </div>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recoveryData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="recovered" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="lost" fill="#fb7185" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h3 className="font-bold text-slate-800">Indicadores de reputação</h3>
              <InfoTip text="Mede a qualidade das interações com clientes inadimplentes." />
            </div>
            <ShieldCheck size={18} className="text-emerald-500" />
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex items-center">
                <p className="text-xs text-slate-500 font-bold uppercase">Interações amigáveis</p>
                <InfoTip text="Percentual de conversas avaliadas como positivas." />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-black text-slate-900">{reportData.friendlyRate}</p>
                <span className="text-xs text-emerald-600 font-bold">Excelente</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[94%]"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <p className="text-xs text-slate-500 font-bold uppercase">Taxa de reclamação</p>
                <InfoTip text="Percentual de conversas que geraram reclamação." />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-black text-slate-900">{reportData.complaintRate}</p>
                <span className="text-xs text-emerald-600 font-bold">Baixíssima</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[8%]"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <p className="text-xs text-slate-500 font-bold uppercase">Satisfação pós-acordo</p>
                <InfoTip text="Nota média dada pelos clientes após fechar o acordo." />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-black text-slate-900">{reportData.satisfaction}</p>
                <span className="text-xs text-emerald-600 font-bold">Positiva</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[88%]"></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsReportOpen(true)}
            className="mt-6 w-full py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors text-sm"
          >
            Ver Relatório Detalhado
          </button>
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
                <h3 className="text-xl font-black text-slate-900">Desempenho CDL Consolidado</h3>
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
                    <InfoTip text="Soma de tudo que foi pago pelos clientes no mês." />
                  </div>
                  <p className="text-lg font-black text-slate-900">{reportData.totalRecovered}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Lojistas Ativos</p>
                    <InfoTip text="Quantidade de lojas com cobrança ativa no período." />
                  </div>
                  <p className="text-lg font-black text-slate-900">{reportData.activeMerchants}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">ROI Médio</p>
                    <InfoTip text="Média de valor recuperado para cada R$ 1 investido." />
                  </div>
                  <p className="text-lg font-black text-slate-900">{reportData.avgRoi}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Receita CDL (3%)</p>
                    <InfoTip text="Comissão da CDL sobre o total recuperado no mês." />
                  </div>
                  <p className="text-lg font-black text-slate-900">{reportData.cdlRevenue}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Dívidas</p>
                    <InfoTip text="Resumo do total do mês, recuperado e perdido." />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-slate-700 font-medium">Total do mês</span>
                        <InfoTip text="Soma de todas as dívidas vencidas no período." />
                      </div>
                      <span className="text-sm font-black text-slate-900">{reportData.totalDebt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-slate-700 font-medium">Recuperadas</span>
                        <InfoTip text="Valor efetivamente pago pelos clientes." />
                      </div>
                      <span className="text-sm font-black text-emerald-600">{reportData.totalRecovered}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-slate-700 font-medium">Perdidas</span>
                        <InfoTip text="Valor que ainda não foi recuperado." />
                      </div>
                      <span className="text-sm font-black text-rose-500">{reportData.totalLost}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center mb-3">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Reputação</p>
                    <InfoTip text="Indicadores de qualidade do atendimento." />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-slate-700 font-medium">Interações amigáveis</span>
                        <InfoTip text="Percentual de conversas avaliadas como positivas." />
                      </div>
                      <span className="text-sm font-black text-emerald-600">{reportData.friendlyRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-slate-700 font-medium">Reclamações</span>
                        <InfoTip text="Percentual de conversas que geraram reclamação." />
                      </div>
                      <span className="text-sm font-black text-emerald-600">{reportData.complaintRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-slate-700 font-medium">Satisfação</span>
                        <InfoTip text="Nota média dada pelos clientes após o acordo." />
                      </div>
                      <span className="text-sm font-black text-emerald-600">{reportData.satisfaction}</span>
                    </div>
                  </div>
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

export default Dashboard;
