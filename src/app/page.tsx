import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>User Guide<br/>
      At the Url paste your website you want to question from<br/>
      
      https://rag-chatbot-self.vercel.app/ <br/>
      now above that put your url<br/>
      eq:
     
      </p>
      https://rag-chatbot-self.vercel.app/https://en.wikipedia.org/wiki/Dalai_Lama

<p>this website works on dynamic route</p>
      <Link href="https://github.com/TenzDelek/RAG-CHATBOT"  target="_blank"
                  rel="noopener noreferrer">GITHUB</Link>
    </main>
  );
}
