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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-5xl mx-auto p-8">
        
        {/* Header */}
        <header className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-10 mb-8 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative">
            <h1 className="text-5xl font-bold text-white mb-2">
              {resumeData.name}
            </h1>
            <p className="text-2xl text-amber-400 mb-4 font-medium">
              {resumeData.title}
            </p>
            <div className="flex flex-wrap gap-4 text-slate-300 text-sm">
              <span className="flex items-center gap-1">📍 {resumeData.location}</span>
              <span className="flex items-center gap-1">✉️ {resumeData.email}</span>
              <a href={`https://${resumeData.linkedin}`} target="_blank" className="text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1">
                💼 LinkedIn →
              </a>
            </div>
          </div>
        </header>

        {/* Quick Chat CTA */}
        {!chatOpen && (
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-8 mb-8 text-white border border-amber-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">💬 Want to know more?</h2>
                <p className="text-white/90">Chat with my AI assistant about my experience, projects, and skills</p>
              </div>
              <button
                onClick={() => setChatOpen(true)}
                className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg whitespace-nowrap"
              >
                Start Chat
              </button>
            </div>
          </div>
        )}

        {/* Chat Section - Expanded when open */}
        {chatOpen && (
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white">💬 Chat with AI Evin</h2>
                <p className="text-slate-400 text-sm mt-1">Powered by Claude AI - ask me anything!</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-slate-300 font-medium text-sm"
              >
                ✕ Close
              </button>
            </div>

            <div>
              {/* Chat Messages */}
              <div className="bg-slate-950 rounded-xl p-6 mb-4 h-96 overflow-y-auto border border-slate-800 shadow-inner">
                {messages.length === 0 && (
                  <div className="text-center mt-12">
                    <p className="text-slate-400 mb-6">👋 Hey! Ask me anything about my experience and projects</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {suggestedQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => setInput(q)}
                          className="text-left p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-amber-500 hover:shadow-md transition-all text-sm text-slate-300"
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
                          ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-md'
                          : 'bg-slate-800 border border-slate-700 text-slate-200 shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="text-left">
                    <div className="inline-block p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-400">
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
                  className="flex-1 p-4 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-white placeholder-slate-500"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-br from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-amber-500 hover:to-orange-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed font-semibold shadow-lg transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Bio */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span>👋</span> About Me
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-line">
            {resumeData.bio}
          </p>
        </section>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Automations */}
          <section className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl shadow-2xl p-8 text-white border border-amber-500/20">
            <h3 className="text-xl font-bold mb-5 flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              Automation Projects
            </h3>
            <ul className="space-y-3">
              {resumeData.highlights?.automations?.map((item, i) => (
                <li key={i} className="flex items-start text-sm leading-relaxed">
                  <span className="mr-2 mt-0.5 text-white/90">→</span>
                  <span className="text-white/95">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements */}
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-500 rounded-2xl shadow-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-5 flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              Career Highlights
            </h3>
            <ul className="space-y-3">
              {resumeData.highlights?.achievements?.map((item, i) => (
                <li key={i} className="flex items-start text-sm text-slate-300 leading-relaxed">
                  <span className="mr-2 mt-0.5 text-amber-400">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Testimonials */}
        <section className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold mb-3 text-center text-white">💬 What People Say</h2>
            <p className="text-center text-slate-400 mb-8 italic">Anonymous feedback from amazing colleagues</p>
            <div className="grid md:grid-cols-2 gap-4">
              {resumeData.testimonials?.map((quote, i) => (
                <div key={i} className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all">
                  <p className="text-slate-300 italic">"{quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <span>💼</span> Experience
          </h2>
          <div className="space-y-8">
            {resumeData.experience?.map((job, index) => (
              <div key={index} className="border-l-4 border-amber-500 pl-6 py-2 hover:border-amber-400 transition-all">
                <h3 className="text-xl font-bold text-white">
                  {job.role}
                </h3>
                <p className="text-lg text-amber-400 font-semibold mb-1">
                  {job.company}
                </p>
                <p className="text-sm text-slate-400 mb-3">
                  {job.period} • {job.location}
                </p>
                <p className="text-slate-300 mb-3 italic text-sm">{job.description}</p>
                <ul className="space-y-2">
                  {job.achievements?.map((achievement, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-300">
                      <span className="text-amber-400 mr-2 mt-1">✓</span>
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
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🎓</span> Education
            </h2>
            <div className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-xl font-bold text-white">
                {resumeData.education.degree}
              </h3>
              <p className="text-lg text-amber-400 font-semibold">
                {resumeData.education.school}
              </p>
              <p className="text-sm text-slate-400">{resumeData.education.status}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🛠️</span> Skills & Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-slate-900 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium border-2 border-slate-700 hover:border-amber-500 hover:shadow-lg transition-all cursor-default"
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