import { GoogleGenAI, Type } from "@google/genai";

// Initialize client directly with environment variable as per guidelines.
// Assumes process.env.API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStudyResponse = async (
  prompt: string, 
  history: { role: string; content: string }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview'; // Optimized for speed/chat
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are Student Nexus, a hyper-intelligent, futuristic study companion. Keep answers concise, structured, and encouraging. Focus on engineering and academic concepts."
      }
    });

    return response.text || "I processed that, but the visual interface blocked the text return.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to Nexus Core interrupted. Please try again.";
  }
};

export const generateProjectStructure = async (domain: string): Promise<string> => {
   try {
     const model = 'gemini-3-flash-preview';
     const prompt = `Generate a unique, advanced student project idea for the domain: ${domain}.`;
     
     const response = await ai.models.generateContent({
       model,
       contents: prompt,
       config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            features: { type: Type.ARRAY, items: { type: Type.STRING } },
            difficulty: { type: Type.STRING }
          }
        }
       }
     });
     
     return response.text || "{}";
   } catch (error) {
     return JSON.stringify({ title: "Offline Generation", description: "Could not connect to AI core.", features: ["Manual Mode"], difficulty: "Unknown" });
   }
};

export const generateVivaQuestions = async (title: string, desc: string): Promise<Array<{question: string, answer: string}>> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `Generate 4 challenging viva voce (oral exam) questions and short, precise answers for a student project titled "${title}". Description: "${desc}".`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    // response.text is already a JSON string representation of the schema.
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Viva Gen Error", error);
    return [
      { question: "Can you explain the core algorithm used?", answer: "We implemented a custom heuristic..." },
      { question: "What were the main challenges faced?", answer: "Latency optimization was the primary bottleneck..." }
    ];
  }
};