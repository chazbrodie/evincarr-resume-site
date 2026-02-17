'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages
        })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Resume
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h1 className="text-3xl font-bold mb-2">Chat with AI Evin</h1>
          <p className="text-gray-600">Ask me anything about my experience and background</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-4 h-96 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              <p>Ask me a question to get started!</p>
              <p className="text-sm mt-2">Try: "What automation projects have you worked on?"</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-4 rounded-lg max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="text-left">
              <div className="inline-block p-4 rounded-lg bg-gray-100 text-gray-500">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me about my experience..."
            className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}