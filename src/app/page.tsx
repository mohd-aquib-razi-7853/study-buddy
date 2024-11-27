"use client";
import { ModeToggle } from "@/components/ThemeToggle";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Skeleton } from "@/components/ui/skeleton";
import generate_text from "@/lib/ai";
import { KeyboardEvent, useState, useRef } from "react";
import {marked} from "marked"
import { markedDownToPlain } from "@/lib/utils";
import MarkedDwn from "@/components/MarkedDwn";
interface Message {
  user: string;
  text: string;
  align: "left" | "right";
}

const Home = () => {
  const [chating, setChating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    
  ]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState<"You" | "AI">("You");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const onSubmit = () => {
    setChating(true);
    setIsTyping(true);
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: user, text: input, align: "right" },
      ]);
      setInput("");
    }
    setTimeout(async () => {
      setUser("AI");
      try {
        const result = await generate_text(input);
        const re = markedDownToPlain(result)
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: "AI", text: re, align: "left" },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            user: "AI",
            text: "Something went wrong. Please try again.",
            align: "left",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
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
    "Where is Andrew Laeddis hiding?",
    "Write a JavaScript method to reverse a string",
    "How to assemble your own PC?",
  ];

  return (
    <BackgroundBeamsWithCollision>
      {chating ? (
        <div className="flex flex-col w-full h-screen scroll-smooth">
          {/* Chat Messages */}
          <div className="flex-1 container overflow-y-auto scrollbar-hide px-4 py-6 space-y-4 h-[calc(100vh-100px)] max-w-screen-lg mx-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.align === "right" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative p-4 rounded-lg shadow-md text-lg ${
                    msg.align === "right"
                      ? "bg-gradient-to-br from-neutral-600 via-neutral-700 border-2 border-gray-800 to-neutral-800 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  } max-w-xs sm:max-w-md lg:max-w-2xl`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="w-full bg-gray-100 dark:bg-gray-800 border-t p-4 flex items-center justify-center space-x-2 sticky bottom-0">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full max-w-4xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-3 text-gray-700 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              onClick={onSubmit}
              className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105 text-sm sm:text-base"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 h-screen w-full justify-center items-center px-4">
          <div className="absolute right-4 top-2">
            <ModeToggle />
          </div>
          <h1
            className="relative z-10 text-3xl md:text-7xl text-center bg-clip-text text-transparent   bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 dark:from-gray-100 dark:via-gray-200 dark:to-gray-400 font-sans font-bold"
          >
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
