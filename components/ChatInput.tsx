"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSwR from "swr";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  // Similar to useState --> to do caching or default select
  const { data: model, mutate: setModel } = useSwR("model", {
    fallbackData: "text-davinci-003",
  });

  // To Get Model --> useSwR

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    // Toast Notification To Say Loading
    const notification = toast.loading("ChatGPT Is Thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast Notification To Say Successful
      toast.success("ChatGPT Has Responded!", {
        id: notification,
      });
    });

    // Scroll To Bottom
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm active:outline-none ">
      <form className="p-5 space-x-5 flex" onSubmit={sendMessage}>
        <input
          className="bg-transparent text-lg focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 placeholder:text-lg font-semibold "
          disabled={!session}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type ur Message Here..."
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded 
          disabled:bg-gray-300 disabled:cursor-not-allowed "
        >
          <PaperAirplaneIcon className="h6 w-6 -rotate-45" />
        </button>
      </form>

      {/* Mobile Section */}
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
