import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.openRouterApiKey,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful restaurant assistant." },
        { role: "user", content: message },
      ],
    });

    return Response.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "AI request failed" }, { status: 500 });
  }
}
