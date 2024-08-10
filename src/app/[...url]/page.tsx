import ChatWrapper from '@/components/ChatWrapper'
import { ragchat } from '@/lib/rag-chat'
import { redis } from '@/lib/redis'
import { cookies } from 'next/headers'
import React from 'react'
interface paramprop{
    params:{
        url:String | String[] | undefined
    }
}

function reconstructURL({url}:{url:string[]})
{
  const decodedurl=url.map((data)=>(
    decodeURIComponent(data)
  ))
  return decodedurl.join("/")
}
const page = async ({params}:paramprop) => {
  const sessionCookie=cookies().get("sessionId")?.value
  const reconstruct=reconstructURL({url:params.url as string[]} )
  const sessionId = (reconstruct + "--" + sessionCookie).replace(/\//g, "")
  const isindexed=await redis.sismember("index-urls",reconstruct)
  console.log("already index",isindexed)
  const initialMessages=await ragchat.history.getMessages({amount:10,sessionId})
  if (!isindexed)
  {
    await ragchat.context.add({
      type:"html",
      source:reconstruct,
    })
   await redis.sadd("index-urls",reconstruct)
  }
    console.log(params)
    console.log(`the reconstruct url is ${reconstruct}`)
  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
}

export default page