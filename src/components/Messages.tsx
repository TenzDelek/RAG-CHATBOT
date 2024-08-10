import { type Message as TMessage } from "ai/react";
import Message from "./Message";
import { MessageSquare, MountainSnow } from "lucide-react";
//here we only import the type
interface MessageProps {
  messages: TMessage[];
}
const Messages = ({ messages }: MessageProps) => {
  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
      {messages.length ? (
        messages.map((message, i) => (
          <Message key={i} content={message.content} isUserMessage={message.role === "user"} />
        ))
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MountainSnow className="size-8 text-green-500" />
          <h3 className="font-semibold text-xl text-white">Ask your Question here</h3>
          <p className="text-zinc-500 text-sm">Ask your first question to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
