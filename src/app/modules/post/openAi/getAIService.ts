import { approveStatus, Post } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../apiError/ApiError";
import prisma from "../../../share/prismaClient";
import { openai } from "../../../share/open-router";
import { extractJsonFromMessage } from "../../../share/extractJsonFromMessage";

const getAISuggestions = async (payload: { preference: string }) => {
  if (!(payload && payload.preference)) {
    throw new ApiError(httpStatus.BAD_GATEWAY, "preference is required!");
  }

  const post = await prisma.post.findMany({
    where: { status: approveStatus.approved },
  });
  const prompt = `
You are a Food Finder assistant AI. Based on the user preference, suggest the top 3 most favorite dish.

Symptoms: ${payload.preference}

Here is the doctor list (in JSON):
${JSON.stringify(post, null, 2)}

Return your response in JSON format with full individual doctor data. 
`;

  const completion = await openai.chat.completions.create({
    model: "z-ai/glm-4.5-air:free",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI medical assistant that provides doctor suggestions.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  console.log("Ai Suggesstions", completion);
  const result = await extractJsonFromMessage(completion.choices[0].message);
  return result;
};
export const getAiService = {
  getAISuggestions,
};
