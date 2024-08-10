import { RAGChat, upstash } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragchat= new RAGChat({
    model:upstash("meta-llama/Meta-Llama-3-8B-Instruct"),
    redis:redis
})