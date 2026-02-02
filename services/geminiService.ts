
import { GoogleGenAI } from "@google/genai";
import { NegotiationRules } from "../types";

type StreamChunk = { text: string };

const createMockStream = (text: string) => {
  async function* generator(): AsyncIterable<StreamChunk> {
    yield { text };
  }
  return generator();
};

export const getAgentResponseStream = async (
  userPrompt: string, 
  history: any[] = [], 
  rules: NegotiationRules
) => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const fallbackText = `✅ Modo demo (sem Gemini). Posso oferecer até ${rules.maxDiscount}% de desconto no PIX ou parcelar em até ${rules.maxInstallments}x. O que prefere? [BOTÃO: Aceitar Desconto] [BOTÃO: Ver Parcelas]`;
    return createMockStream(fallbackText);
  }

  const ai = new GoogleGenAI({ apiKey });
  const SYSTEM_INSTRUCTION = `
Você é o "Agente de Recuperação CDL", focado em WhatsApp e ROI. 
Sua missão é ser rápido, cordial e eficiente na cobrança.

REGRAS DE NEGOCIAÇÃO:
- Desconto máximo: ${rules.maxDiscount}% para PIX à vista.
- Parcelas: Máximo de ${rules.maxInstallments}x.

DIRETRIZES OBRIGATÓRIAS:
1. NUNCA envie apenas botões. Comece sempre com um texto explicativo claro.
2. Use emojis amigáveis (👋, ✅, 🚀).
3. Ao oferecer opções, use o formato [BOTÃO: Texto].
4. Se o cliente aceitar, gere um código fictício "PIX-CDL-..." imediatamente.

EXEMPLO DE RESPOSTA:
"Olá! Notei que você tem uma pendência. Consegui um desconto de ${rules.maxDiscount}% para você fechar agora no PIX. O que acha? [BOTÃO: Aceitar Desconto] [BOTÃO: Ver Parcelas]"
`;

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview', // Flash é muito mais rápido para chat em tempo real
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });

    return responseStream;
  } catch (error) {
    console.error("Erro no stream:", error);
    throw error;
  }
};
