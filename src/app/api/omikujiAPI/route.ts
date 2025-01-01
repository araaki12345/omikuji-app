import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "あなたはお正月のおみくじを生成するアシスタントです。結果は大吉、中吉、小吉、凶から選び、日本語で説明文を生成してください。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message?.content || "結果が生成できませんでした。";
    const result = responseText.match(/大吉|中吉|小吉|凶/)?.[0] || "不明";

    return NextResponse.json({ result, message: responseText });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: "Failed to generate omikuji." }, { status: 500 });
  }
}
