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

  const suggestedQuestions = [
    "What automation projects have you built?",
    "Tell me about the RSVP dashboard",
    "How did you learn to code?",
    "What's your experience with Claude AI?"
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="max-w-5xl mx-auto p-8">
        
        {/* Header */}
        <header className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-10 mb-8 border-l-4 border-[#043927] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#043927]/5 rounded-full -mr-32 -mt-32"></div>
          <div className="relative">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              {resumeData.name}
            </h1>
            <p className="text-2xl text-[#043927] mb-4 font-medium">
              {resumeData.title}
            </p>
            <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
              <span className="flex items-center gap-1">📍 {resumeData.location}</span>
              <span className="flex items-center gap-1">✉️ {resumeData.email}</span>
              <a href={`https://${resumeData.linkedin}`} target="_blank" className="text-[#043927] hover:text-[#032419] font-medium transition-colors flex items-center gap-1">
                💼 LinkedIn →
              </a>
            </div>
          </div>
        </header>

        {/* Quick Chat CTA */}
        {!chatOpen && (
          <div className="bg-gradient-to-r from-[#043927] to-[#065a3a] rounded-2xl shadow-xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">💬 Want to know more?</h2>
                <p className="text-white/90">Chat with my AI assistant about my experience, projects, and skills</p>
              </div>
              <button
                onClick={() => setChatOpen(true)}
                className="bg-white text-[#043927] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg whitespace-nowrap"
              >
                Start Chat
              </button>
            </div>
          </div>
        )}

        {/* Chat Section - Expanded when open */}
        {chatOpen && (
          <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">💬 Chat with AI Evin</h2>
                <p className="text-gray-600 text-sm mt-1">Powered by Claude AI - ask me anything!</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-500 hover:text-gray-700 font-medium text-sm"
              >
                ✕ Close
              </button>
            </div>

            <div>
              {/* Chat Messages */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 mb-4 h-96 overflow-y-auto border border-gray-200 shadow-inner">
                {messages.length === 0 && (
                  <div className="text-center mt-12">
                    <p className="text-gray-500 mb-6">👋 Hey! Ask me anything about my experience and projects</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {suggestedQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => setInput(q)}
                          className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-[#043927] hover:shadow-md transition-all text-sm text-gray-700"
                        >
                          💡 {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block p-4 rounded-xl max-w-[80%] ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-[#043927] to-[#065a3a] text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="text-left">
                    <div className="inline-block p-4 rounded-xl bg-white border border-gray-200 text-gray-500">
                      <span className="inline-flex items-center gap-2">
                        <span className="animate-pulse">🤔</span> Thinking...
                      </span>
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
                  placeholder="Ask me anything..."
                  className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#043927] focus:border-transparent transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-br from-[#043927] to-[#065a3a] text-white px-8 py-4 rounded-xl hover:from-[#032419] hover:to-[#043927] disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold shadow-lg transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Bio */}
        <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>👋</span> About Me
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {resumeData.bio}
          </p>
        </section>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Automations */}
          <section className="bg-gradient-to-br from-[#043927] to-[#065a3a] rounded-2xl shadow-xl p-8 text-white">
            <h3 className="text-xl font-bold mb-5 flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              Automation Projects
            </h3>
            <ul className="space-y-3">
              {resumeData.highlights?.automations?.map((item, i) => (
                <li key={i} className="flex items-start text-sm leading-relaxed">
                  <span className="mr-2 mt-0.5 text-orange-300">→</span>
                  <span className="text-white/95">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements */}
          <section className="bg-gradient-to-br from-white to-gray-50 border-2 border-[#043927] rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              Career Highlights
            </h3>
            <ul className="space-y-3">
              {resumeData.highlights?.achievements?.map((item, i) => (
                <li key={i} className="flex items-start text-sm text-gray-700 leading-relaxed">
                  <span className="mr-2 mt-0.5 text-[#043927]">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Testimonials */}
        <section className="bg-gradient-to-br from-[#043927] via-[#054830] to-[#065a3a] rounded-2xl shadow-xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold mb-3 text-center">💬 What People Say</h2>
            <p className="text-center text-white/80 mb-8 italic">Anonymous feedback from amazing colleagues</p>
            <div className="grid md:grid-cols-2 gap-4">
              {resumeData.testimonials?.map((quote, i) => (
                <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <p className="text-white/95 italic">"{quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <span>💼</span> Experience
          </h2>
          <div className="space-y-8">
            {resumeData.experience?.map((job, index) => (
              <div key={index} className="border-l-4 border-[#043927] pl-6 py-2 hover:border-[#065a3a] transition-all">
                <h3 className="text-xl font-bold text-gray-900">
                  {job.role}
                </h3>
                <p className="text-lg text-[#043927] font-semibold mb-1">
                  {job.company}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {job.period} • {job.location}
                </p>
                <p className="text-gray-600 mb-3 italic text-sm">{job.description}</p>
                <ul className="space-y-2">
                  {job.achievements?.map((achievement, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <span className="text-[#043927] mr-2 mt-1">✓</span>
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
          <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>🎓</span> Education
            </h2>
            <div className="border-l-4 border-[#043927] pl-6">
              <h3 className="text-xl font-bold text-gray-900">
                {resumeData.education.degree}
              </h3>
              <p className="text-lg text-[#043927] font-semibold">
                {resumeData.education.school}
              </p>
              <p className="text-sm text-gray-500">{resumeData.education.status}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>🛠️</span> Skills & Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium border-2 border-gray-200 hover:border-[#043927] hover:shadow-md transition-all cursor-default"
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