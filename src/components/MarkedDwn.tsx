import { marked } from "marked";

const MarkedDwn = ({text}:{text:string})=>{
  const htmlContent = marked(text)
  return <div dangerouslySetInnerHTML={}/>
  
}

export default MarkedDwn