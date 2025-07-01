import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.API_KEY
const genAI = new GoogleGenerativeAI("AIzaSyB7YhQlkiIF6rlcLGFykiUgtBjWSnt-uOE");
const model = genAI.getGenerativeModel({ model:  "gemini-2.0-flash" });

const generate_text = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
};

export default generate_text
