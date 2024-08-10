"use client";

import { useState } from "react";
import { Message, useChat } from "ai/react";
import Messages from "./Messages";
import { ChatInput } from "./Chatinput";


const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  sessionId: string;
  initialMessages: Message[];
}) => {
  const [isRateLimited, setIsRateLimited] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages,
      onError: (error) => {
        if (error.message.includes("Rate limit exceeded")) {
          setIsRateLimited(true);
          // Reset the rate limit after 1 minute (you may want to adjust this time)
          setTimeout(() => setIsRateLimited(false), 60000);
        }
      },
    });

  return (
    <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
        {isRateLimited && (
          <div className="p-4  text-red-500 text-center">
            Rate limit reached. Please try again later.
          </div>
        )}
        <Messages messages={messages} />
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
        isDisabled={isRateLimited}
      />
    </div>
  );
};

export default ChatWrapper;