"use client";
import Chatcontainer from "@/components/Chatcontainer";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";

const Home = () => {
  
  const onSubmit = () => {};
  const handleChange = () => {};
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col gap-10 w-full justify-center items-center">
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-[#EEEEEE]  tracking-tight">
          Welcome to AI Study Buddy
        </h2>
    <Chatcontainer/>
        <div className="w-full max-w-lg">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};
export default Home;
