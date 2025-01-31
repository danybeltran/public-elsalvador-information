"use client"
import copy from "copy-to-clipboard"
import { useEffect, useState } from "react"
import { BiCheck, BiCopy } from "react-icons/bi"
export default function CopyableText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])

  return (
    <div>
      <p
        className="p-2 border-2 rounded-lg cursor-pointer flex items-center gap-x-2 break-all whitespace-pre-wrap"
        onClick={(e) => {
          if (copied) return
          copy(text)
          getSelection()?.selectAllChildren(e.currentTarget.parentElement!)
          setCopied(true)
        }}
      >
        <span className="w-12">{copied ? <BiCheck /> : <BiCopy />}</span> {text}
      </p>
    </div>
  )
}
