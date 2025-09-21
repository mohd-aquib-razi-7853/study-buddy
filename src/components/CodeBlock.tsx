import { markedDownToPlain } from "@/lib/utils";
import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeBLockProps = {
  code: string;
  language?: string;
};

const CodeBlock: React.FC<CodeBLockProps> = ({
  code,
  language = "javascript",
}) => {
  return (
    <div className="w-full h-full rounded-xl"> 
      <h1 className="text-base font-medium text-gray-500 bg-gray-950 text-left p-2 w-full">{language}</h1>
    <SyntaxHighlighter language={language} style={a11yDark}>
      
      {code}
    </SyntaxHighlighter>
    </div>
  );
};

type ResponseRenderProps = {
  response: string ;
};
const ResponseRenderer: React.FC<ResponseRenderProps> = ({ response }) => {
  const codeReg = /```(.*?)\n([\s\S]*?)```/g;
  const parts = [];
  let match;
  let lastIndex = 0;
  while ((match = codeReg.exec(response)) !== null) {
    const [fullMatch, langauge, code] = match;
    if (lastIndex < match.index) {
      parts.push({
        type: "text",
        content: response.substring(lastIndex, match.index),
      });
    }
    parts.push({ type: "code", langauge, content: code });
    lastIndex = codeReg.lastIndex;
  }
  if (lastIndex < response.length) {
    parts.push({ type: "text", content: response.substring(lastIndex) });
  }
  return (
    <div>
      {parts.map((parts, index) =>
        parts.type === "text" ? (
          <p key={index} className="whitespace-pre-wrap leading-relaxed">{markedDownToPlain(parts.content)}</p>
        ) : (
          <CodeBlock
            key={index}
            code={parts.content}
            language={parts.langauge}
          />
        ),
      )}
    </div>
  );
};
export default ResponseRenderer