import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { marked } from "marked";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const markedDownToPlain = (text:string)=>{
  const htmlcontent = marked.parse(text).toString()
  const parse = new DOMParser()
  const paresed = parse.parseFromString(htmlcontent,"text/html")
  return paresed.body.textContent ||"Not Generated Yet"
}
