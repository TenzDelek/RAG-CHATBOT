import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const genai=new GoogleGenerativeAI(process.env.API_KEY!)
    const model=genai.getGenerativeModel({model:"gemini-pro"})
    const {prompt}=await req.json() //we past it in our call
    const result=await model.generateContent(prompt)
    const response=await result.response;
    const text=response.text()
    console.log(text)
    // const data= await req.json()
    // console.log(data)
    return NextResponse.json({message:text})
}