'use client'

import { resumeData } from './resume-data'
import { useState } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-5xl mx-auto p-8">
        
        {/* Header */}
        <header className="bg-white rounded-xl shadow-lg p-10 mb-8 border-l-4 border-emerald-700">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            {resumeData.name}
          </h1>
          <p className="text-2xl text-emerald-700 mb-4 font-medium">
            {resumeData.title}
          </p>
          <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
            <span>📍 {resumeData.location}</span>
            <span>✉️ {resumeData.email}</span>
            <span>📞 {resumeData.phone}</span>
            <a href={`https://${resumeData.linkedin}`} target="_blank" className="text-emerald-700 hover:text-emerald-900 font-medium">
              LinkedIn →
            </a>
          </div>
        </header>

        {/* Bio */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {resumeData.bio}
          </p>
        </section>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Automations */}
          <section className="bg-emerald-700 rounded-xl shadow-lg p-8 text-white">
            <h3 className="text-xl font-bold mb-5 flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              Automation Projects
            </h3>
            <ul className="space-y-3">
              {resumeData.highlights?.automations?.map((item, i) => (
                <li key={i} className="flex items-start text-sm leading-relaxed">
                  <span className="mr-2 mt-0.5 text-orange-300">•</span>
                  <span className="text-white/95">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements */}
          <section className="bg-white border-2 border-emerald-700 rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              Career Highlights
            </h3>
            <ul className="space-y-3">
              {resumeData.highlights?.achievements?.map((item, i) => (
                <li key={i} className="flex items-start text-sm text-gray-700 leading-relaxed">
                  <span className="mr-2 mt-0.5 text-emerald-700">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Embedded Chat Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Chat with AI Evin</h2>
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="text-emerald-700 hover:text-emerald-900 font-medium"
            >
              {chatOpen ? 'Hide Chat' : 'Open Chat'}
            </button>
          </div>

          {chatOpen && (
            <div>
              {/* Chat Messages */}
              <div className="bg-gray-50 rounded-lg p-6 mb-4 h-96 overflow-y-auto border border-gray-200">
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 mt-20">
                    <p className="mb-2">Ask me anything about my experience!</p>
                    <p className="text-sm">Try: "What automation projects have you built?"</p>
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
                          ? 'bg-emerald-700 text-white'
                          : 'bg-white border border-gray-300 text-gray-800'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="text-left">
                    <div className="inline-block p-4 rounded-lg bg-white border border-gray-300 text-gray-500">
                      Thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me about my experience..."
                  className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-emerald-700 text-white px-8 py-4 rounded-lg hover:bg-emerald-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {!chatOpen && (
            <p className="text-gray-600 text-center">
              Click "Open Chat" to ask me questions about my experience and projects.
            </p>
          )}
        </section>

        {/* Experience */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience</h2>
          <div className="space-y-8">
            {resumeData.experience?.map((job, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-6 py-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {job.role}
                </h3>
                <p className="text-lg text-emerald-700 font-semibold mb-1">
                  {job.company}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {job.period} • {job.location}
                </p>
                <p className="text-gray-600 mb-3 italic text-sm">{job.description}</p>
                <ul className="space-y-2">
                  {job.achievements?.map((achievement, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <span className="text-emerald-700 mr-2 mt-1">→</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {resumeData.education && (
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Education</h2>
            <div className="border-l-2 border-gray-300 pl-6">
              <h3 className="text-xl font-bold text-gray-900">
                {resumeData.education.degree}
              </h3>
              <p className="text-lg text-emerald-700 font-semibold">
                {resumeData.education.school}
              </p>
              <p className="text-sm text-gray-500">{resumeData.education.status}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills & Tools</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:border-emerald-700 hover:bg-emerald-50 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}