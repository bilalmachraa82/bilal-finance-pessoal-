
import { GoogleGenAI, Type } from "@google/genai";
import type { UserProfile, ReceiptData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development environments where the key might not be set.
  // In a production environment, the key is expected to be present.
  console.warn("Gemini API key not found. Using a placeholder key. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "placeholder_key" });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const getFinancialInsight = async (prompt: string, userProfile: UserProfile): Promise<string> => {
  if (!API_KEY) return "AI service is currently unavailable. API key is missing.";
  try {
    const fullPrompt = `
      Contexto Financeiro do Utilizador (Bilal Machraa):
      ${JSON.stringify(userProfile, null, 2)}

      ---

      Pergunta do Utilizador: "${prompt}"

      ---
      
      Responda em Português (Portugal) de forma amigável, profissional e concisa, como um assistente financeiro de IA.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching financial insight from Gemini:", error);
    return "Desculpe, não consegui obter uma resposta da IA. Tente novamente mais tarde.";
  }
};

export const analyzeReceipt = async (imageFile: File): Promise<ReceiptData> => {
    if (!API_KEY) {
        throw new Error("AI service is currently unavailable. API key is missing.");
    }
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: "Analise este recibo e extraia o nome do vendedor, o valor total, a data e uma lista de itens com nome, preço e quantidade. Responda apenas com o JSON." },
                    imagePart,
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        vendor: { type: Type.STRING, description: "O nome do estabelecimento comercial." },
                        totalAmount: { type: Type.NUMBER, description: "O valor total do recibo." },
                        date: { type: Type.STRING, description: "A data da transação (YYYY-MM-DD)." },
                        items: {
                            type: Type.ARRAY,
                            description: "Lista de itens comprados.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    price: { type: Type.NUMBER },
                                    quantity: { type: Type.NUMBER },
                                },
                            },
                        },
                    },
                },
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as ReceiptData;
    } catch (error) {
        console.error("Error analyzing receipt with Gemini:", error);
        throw new Error("Não foi possível analisar o recibo. Tente uma imagem mais nítida.");
    }
};
