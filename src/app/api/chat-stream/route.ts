import { ragchat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const response = await ragchat.chat(lastMessage, { streaming: true, sessionId });

    return aiUseChatAdapter(response);
  } catch (error: any) {
    console.error("Error in chat stream:", error);

    if (error.message.includes("rate limit") || error.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
};