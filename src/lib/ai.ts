"use server"
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generate_text = async (prompt: string) => {
  try {
       const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
         contents: prompt,
         config:{
          thinkingConfig:{
            thinkingBudget:0,
          }
         }
       });
       if (!response) throw new Error("No data get");
       return response.text;
  } catch (error) {
    console.error("Error on AI", error)
  }   
};

export default generate_text
