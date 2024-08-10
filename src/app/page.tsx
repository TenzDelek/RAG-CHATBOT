'use client'
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callApi = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse("");

    try {
      const res = await axios.post("/api/demo", {
        prompt: input
      });

      setResponse(res.data.message);
    } catch (error) {
      console.error("Error calling API:", error);
      setResponse("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen w-full flex-col">
      <div>
        <form onSubmit={callApi}>
          <input 
            className="outline-none border p-2" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your prompt"
          />
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      
      {response && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="font-bold">Response:</h2>
          <p>{response}</p>
        </div>
      )}

      <div className="text-center space-y-2 mt-8">
        <p>User Guide</p>
        <p>we have two thing here: one is the question answer and RAG</p>
        <p>for RAG copy your url and paste it upfront of our url</p>
        https://rag-chatbot-self.vercel.app/https://en.wikipedia.org/wiki/Dalai_Lama
      </div>

      <Link
        href="https://github.com/TenzDelek/RAG-CHATBOT"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 p-2 bg-gray-700 rounded-md text-white"
      >
        GITHUB
      </Link>
    </main>
  );
}