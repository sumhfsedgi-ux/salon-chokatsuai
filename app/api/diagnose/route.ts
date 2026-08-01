import { NextResponse } from "next/server";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import {
  buildDiagnosisUserPrompt,
  DIAGNOSIS_SYSTEM_PROMPT,
  getOpenAIClient,
} from "@/lib/openai";
import { QUESTIONS } from "@/lib/questions";
import { DiagnosisResultSchema } from "@/lib/types";

const GENERIC_ERROR_MESSAGE =
  "診断結果の生成に失敗しました。時間をおいて再度お試しください。";

const AnswersSchema = z.object(
  Object.fromEntries(
    QUESTIONS.map((question): [string, z.ZodString] => [
      question.id,
      z.string().min(1),
    ])
  )
);

const RequestSchema = z.object({ answers: AnswersSchema });

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set");
    return NextResponse.json({ error: GENERIC_ERROR_MESSAGE }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "リクエストの形式が正しくありません。" },
      { status: 400 }
    );
  }

  const parsedRequest = RequestSchema.safeParse(body);
  if (!parsedRequest.success) {
    return NextResponse.json(
      { error: "回答がすべて揃っていません。" },
      { status: 400 }
    );
  }

  const { answers } = parsedRequest.data;

  try {
    const client = getOpenAIClient();
    const completion = await client.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: DIAGNOSIS_SYSTEM_PROMPT },
        { role: "user", content: buildDiagnosisUserPrompt(answers) },
      ],
      response_format: zodResponseFormat(
        DiagnosisResultSchema,
        "diagnosis_result"
      ),
    });

    const message = completion.choices[0]?.message;

    if (!message || message.refusal || !message.parsed) {
      console.error(
        "OpenAI did not return a parsed diagnosis result",
        message?.refusal
      );
      return NextResponse.json({ error: GENERIC_ERROR_MESSAGE }, { status: 502 });
    }

    return NextResponse.json(message.parsed);
  } catch (error) {
    console.error("Failed to generate diagnosis result", error);
    return NextResponse.json({ error: GENERIC_ERROR_MESSAGE }, { status: 500 });
  }
}
