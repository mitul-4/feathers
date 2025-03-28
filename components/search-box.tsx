'use client'
import { useState } from "react"
import { Button } from "./ui/button"
import { Send } from "lucide-react";

export function SearchBox(){
  const [search, setSearch] = useState("")
  const Function = () => {}

  return (
    <div className="flex flex-row items-center gap-3 w-full max-w-3xl mx-auto">
      <input
        placeholder="Enter your Student ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-2 border-border rounded-full p-2 pl-5 mt-10 w-full focus:border-white focus:outline-none transition-colors duration-300"
      />
      <Button
        variant="outline"
        onClick={() => Function()}
      >
        <Send size={16}/>
      </Button>
    </div>
  )
}