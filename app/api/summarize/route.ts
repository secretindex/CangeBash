import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const { messages } = await req.json();

  try {
    console.log(messages);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `Resuma esta conversa, por favor: ${JSON.stringify(messages)}`,
      config: {
        systemInstruction:
          `Você vai resumir as mensagens nos atendimentos. Geralmente eles vão vir em um array para você, em string ou de outro jeito, mas ai você faz um resumo do que o cliente quer que seja atendido. O conteúdo das mensagens está no body de cada objeto. Poderá haver algumas imagens, mas elas não devem influenciar o resumo. Se for possível ouvir os áudios também, será interessante. O texto que você gerar deve ser em markdown.`,
      },
    });

    return NextResponse.json({
      aiMessage: response.text,
      status: "ok",
    });
  } catch (e) {
    return NextResponse.json({ message: e, status: "fail" });
  }
}
