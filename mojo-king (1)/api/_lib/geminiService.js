import { GoogleGenAI } from "@google/genai";

// This check now happens on the serverless function environment.
// The function will fail if the API_KEY is not set in Vercel's environment variables.
if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set. The application will not be able to generate reports.");
}

// Initialize client once, only if the API key exists.
const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

const systemInstruction = `You are an AI health analyst for the 'MOJO KING' app. Your role is to estimate a user's vitality and 'social mojo', metaphorically linked to testosterone levels, based on their self-reported biometrics and lifestyle. You MUST respond in a specific JSON format. Do not use markdown fences. Your analysis should be positive, encouraging, and engaging. Based on the user data, assign one of four dating archetypes: 'The Magnetic Leader', 'The Charismatic Connector', 'The Adventurous Explorer', or 'The Steadfast Guardian'. Also provide a 'Mojo Score' from 1 to 100 and a detailed, personalized analysis. The higher the HRV values (RMSSD and SDNN), the better. Higher age might slightly lower the score, while regular exercise and good sleep should increase it. High stress should lower it.`;

export const generateMojoReport = async (profile) => {
  if (!ai) {
    throw new Error("AI service is not configured. Missing API_KEY.");
  }
  
  const prompt = `
    Analyze the following user profile and generate their MOJO KING report.
    User data: ${JSON.stringify(profile, null, 2)}

    Respond ONLY with a valid JSON object matching this structure, without any markdown formatting:
    {
      "archetype": "string",
      "mojoScore": number,
      "title": "string",
      "summary": "string",
      "detailedAnalysis": [
        { "area": "Vitality & Drive", "feedback": "string" },
        { "area": "Social Energy", "feedback": "string" },
        { "area": "Stress Resilience", "feedback": "string" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    // In a serverless environment, it's good to be defensive against malformed JSON from the API.
    let result;
    try {
        result = JSON.parse(jsonText);
    } catch (parseError) {
        console.error("Failed to parse JSON response from AI:", jsonText);
        throw new Error("AI returned an invalid data format. Please try again.");
    }

    if (!result.archetype || !result.mojoScore || !result.detailedAnalysis) {
        throw new Error("Invalid response structure from AI model.");
    }

    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes("JSON")) {
       throw new Error("AI failed to generate a valid report. Please try again.");
    }
    throw new Error("Could not connect to the analysis service.");
  }
};
