import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.API_KEY
const genAI = new GoogleGenerativeAI("AIzaSyCqYIUk-6hCSJ-3VrEruebSWzDsfynDKkE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate_text = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
};

export default generate_text