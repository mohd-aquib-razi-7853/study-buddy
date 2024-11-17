"use client";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import generate_text from "@/lib/ai";
import { KeyboardEvent,  useState } from "react";

interface Message {
  user: string;
  text: string;
  align: "left" | "right";
}

const Home = () => {
  const [chating, setChating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { user: "ai", text: "Hi there, what can i do for you", align: "left" },
  ]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState<"You" | "AI">("You");
  const [isTyping, setIsTyping] = useState(false);

  const onSubmit = () => {
    setChating(true);
    setIsTyping(true);
    if (input.trim()) {
      setMessages([
        ...(messages ?? []),
        { user: user, text: input, align: "right" },
      ]);
      setInput("");
    }
    setTimeout(async () => {
      setUser("AI");
      const result = await generate_text(input);

      setMessages([...messages, { user: user, text: result, align: "left" }]);
      setIsTyping(false);
    }, 1500);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
  return (
    <BackgroundBeamsWithCollision>
      {chating ? (
        <div className="flex flex-col gap-10 w-full h-screen  justify-center">
          <div className="flex flex-col h-screen  text-gray-800 dark:text-gray-100">
            <div className="flex-1 container overflow-y-auto scrollbar-hide p-4 space-y-4 h-full">
              {messages?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.align === "right" ? "justify-end" : ""
                  }`}
                >
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-sm">
                        <span>Typing...</span>
                      </div>
                    </div>
                  )}
                  <div
                    className={`relative p-4 rounded-lg shadow-md text-lg ${
                      msg.align === "right"
                        ? "bg-gradient-to-br  from-neutral-600 via-neutral-700  border-2 border-gray-800 to-neutral-800 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    } max-w-2xl`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 border-t p-4 flex items-center space-x-2 sticky bottom-0 justify-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full max-w-5xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-3 text-gray-700 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 text-lg "
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={onSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 h-screen w-full justify-center items-center">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400  text-center font-sans font-bold">
            Welcome to AI Study Buddy
          </h1>
          <div className="w-full max-w-lg">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(e) => setInput(e.target.value)}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      )}
    </BackgroundBeamsWithCollision>
  );
};
export default Home;
