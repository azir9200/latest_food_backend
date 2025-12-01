
import { Post } from "@prisma/client";
import httpStatus from "http-status";

const getAISuggestions = async (payload: { preference: string }) => {
  if (!(payload && payload.preference)) {
    throw new APIError(httpStatus.BAD_GATEWAY, "preference is required!");
  }
  const post = await prism.post.findMany({
    where: { isDeleted: false },
    
  });

  const prompt = `
You are a medical assistant AI. Based on the patient's symptoms, suggest the top 3 most suitable doctors.
Each doctor has specialties and years of experience.
Only suggest doctors who are relevant to the given symptoms.

Symptoms: ${payload.symptoms}

Here is the doctor list (in JSON):
${JSON.stringify(doctors, null, 2)}

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

  const result = await extractJsonFromMessage(completion.choices[0].message);
  return result;
};
export const getAiService = {
  getAISuggestions,
};
