import ChatWrapper from '@/components/ChatWrapper'
import { ragchat } from '@/lib/rag-chat'
import { redis } from '@/lib/redis'
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
  const sessionId="mocksession"
  const reconstruct=reconstructURL({url:params.url as string[]} )

  const isindexed=await redis.sismember("index-urls",reconstruct)
  console.log("already index",isindexed)
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
  return <ChatWrapper sessionId={sessionId}/>
}

export default page