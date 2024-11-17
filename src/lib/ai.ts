import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate_text = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
};

export default generate_text;
