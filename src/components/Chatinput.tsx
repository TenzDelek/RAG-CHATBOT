"use client"

import { Button, Textarea } from "@nextui-org/react"
import { Send } from "lucide-react"
import { type useChat } from "ai/react"

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"]
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"]
type SetInput = ReturnType<typeof useChat>["setInput"]

interface ChatInputProps {
  input: string
  handleInputChange: HandleInputChange
  handleSubmit: HandleSubmit
  setInput: SetInput,
  isDisabled: boolean
}

export const ChatInput = ({ handleInputChange, handleSubmit, input, setInput, isDisabled }: ChatInputProps) => {
  return (
    <div className="z-10 bg-zinc-900 absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <form onSubmit={(e) => {
              e.preventDefault()
              if (!isDisabled) {
                handleSubmit(e)
                setInput("")
              }
            }} className="relative">
              <Textarea
                minRows={4}
                autoFocus
                disabled={isDisabled}
                onChange={handleInputChange}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !isDisabled) {
                    e.preventDefault()
                    handleSubmit(e as any)
                    setInput("")
                  }
                }}
                placeholder={isDisabled ? "Rate limit reached. Please wait..." : "Enter your question..."}
                className={`resize-none bg-zinc-800 hover:bg-zinc-900 rounded-xl text-base ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <Button
                size="sm"
                type="submit"
                disabled={isDisabled}
                className={`absolute z-10 border border-border bg-zinc-900 right-2 bottom-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}