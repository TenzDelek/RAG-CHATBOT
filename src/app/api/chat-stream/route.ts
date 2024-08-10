import { ragchat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST=async(req:NextRequest)=>{
const {messages,sessionId}= await req.json(); // how we get access to body in next
const lastmessage=messages[messages.length-1].content

const response=await ragchat.chat(lastmessage,{streaming:true,sessionId})

return aiUseChatAdapter(response)
} 
