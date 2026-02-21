'use client'

import { resumeData } from './resume-data'
import { useState } from 'react'
import Image from 'next/image'

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
    <main className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-700/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-700/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8 relative z-10">
        
        {/* Header with Photo */}
        <header className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-10 mb-6 md:mb-8 border border-slate-600/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-700/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            {/* Photo */}
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-green-700/30 shadow-xl">
                <Image
                  src="/headshot.jpg"
                  alt="Evin Carr"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {resumeData.name}
              </h1>
              <p className="text-xl md:text-2xl text-green-600 mb-4 font-medium">
                {resumeData.title}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-slate-300 text-base">
                <span className="flex items-center gap-1">📍 {resumeData.location}</span>
                <a href={`mailto:${resumeData.email}`} className="flex items-center gap-1 text-green-600 hover:text-green-300 transition-colors">
  ✉️ {resumeData.email}
</a>
                <a href={`https://${resumeData.linkedin}`} target="_blank" className="text-green-600 hover:text-green-300 font-medium transition-colors flex items-center gap-1">
                  💼 LinkedIn
                </a>
                <a href="/Evin-Carr-Resume.pdf" download className="text-green-600 hover:text-green-300 font-medium transition-colors flex items-center gap-1">
                  📄 Resume PDF
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Quick Chat CTA */}
        {!chatOpen && (
<div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 text-white border border-green-700/30 relative overflow-hidden">            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mt-16 blur-2xl"></div>
            <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 relative z-10">
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold mb-2">💬 Want to know more?</h2>
                <p className="text-white/90 text-sm md:text-base">Chat with my AI assistant about my experience, projects, and skills</p>
              </div>
              <button
                onClick={() => setChatOpen(true)}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg whitespace-nowrap w-full md:w-auto"
              >
                Start Chat
              </button>
            </div>
          </div>
        )}

        {/* Chat Section - Expanded when open */}
        {chatOpen && (
          <section className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 border border-slate-600/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">💬 Chat with AI Evin</h2>
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
              <div className="bg-slate-900/50 rounded-xl p-4 md:p-6 mb-4 h-96 overflow-y-auto border border-slate-700/50 shadow-inner">
                {messages.length === 0 && (
                  <div className="text-center mt-12">
                    <p className="text-slate-400 mb-6 text-sm md:text-base">👋 Hey! Ask me anything about my experience and projects</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {suggestedQuestions.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => setInput(q)}
                          className="text-left p-3 bg-slate-800/80 rounded-lg border border-slate-700 hover:border-green-700 hover:shadow-md transition-all text-sm text-slate-300"
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
                      className={`inline-block p-3 md:p-4 rounded-xl max-w-[85%] md:max-w-[80%] text-sm md:text-base ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-green-700 to-green-600 text-white shadow-md'
                          : 'bg-slate-800 border border-slate-700 text-slate-200 shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="text-left">
                    <div className="inline-block p-3 md:p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-sm md:text-base">
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
                  className="flex-1 p-3 md:p-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all text-white placeholder-slate-500 text-sm md:text-base"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-br from-green-700 to-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:from-green-700 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed font-semibold shadow-lg transition-all text-sm md:text-base"
                >
                  Send
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Bio */}
        <section className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 border border-slate-600/50 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-700/5 rounded-full -mr-24 -mb-24 blur-2xl"></div>
          <div className="relative">
            <h2 className="text-2xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>👋</span> About Me
            </h2>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed whitespace-pre-line">
              {resumeData.bio}
            </p>
          </div>
        </section>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Automations */}
          <section className="bg-gradient-to-br from-green-700 to-green-600 rounded-2xl shadow-2xl p-6 md:p-8 text-white border border-green-700/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-5 flex items-center">
                <span className="text-2xl mr-2">⚡</span>
                Automation Projects
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {resumeData.highlights?.automations?.map((item, i) => (
                  <li key={i} className="flex items-start text-xs md:text-sm leading-relaxed">
                    <span className="mr-2 mt-0.5 text-white/90">→</span>
                    <span className="text-white/95">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Achievements */}
          <section className="bg-slate-800/90 backdrop-blur border-2 border-green-700/50 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-700/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
            <div className="relative">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-5 flex items-center">
                <span className="text-2xl mr-2">🏆</span>
                Career Highlights
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {resumeData.highlights?.achievements?.map((item, i) => (
                  <li key={i} className="flex items-start text-xs md:text-sm text-slate-300 leading-relaxed">
                    <span className="mr-2 mt-0.5 text-green-600">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Experience */}
        <section className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 border border-slate-600/50">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center gap-2">
            <span>💼</span> Experience
          </h2>
          <div className="space-y-6 md:space-y-8">
            {resumeData.experience?.map((job, index) => (
              <div key={index} className="border-l-4 border-green-700 pl-4 md:pl-6 py-2 hover:border-green-600 transition-all">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  {job.role}
                </h3>
                <p className="text-base md:text-lg text-green-600 font-semibold mb-1">
                  {job.company}
                </p>
                <p className="text-xs md:text-sm text-slate-400 mb-3">
                  {job.period} • {job.location}
                </p>
                <p className="text-slate-300 mb-3 italic text-xs md:text-sm">{job.description}</p>
                <ul className="space-y-2">
                  {job.achievements?.map((achievement, i) => (
                    <li key={i} className="flex items-start text-xs md:text-sm text-slate-300">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
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
          <section className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 border border-slate-600/50">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <span>🎓</span> Education
            </h2>
            <div className="border-l-4 border-green-700 pl-4 md:pl-6">
              <h3 className="text-lg md:text-xl font-bold text-white">
                {resumeData.education.degree}
              </h3>
              <p className="text-base md:text-lg text-green-600 font-semibold">
                {resumeData.education.school}
              </p>
              <p className="text-xs md:text-sm text-slate-400">{resumeData.education.status}</p>
            </div>
          </section>
        )}

        {/* Skills - REORGANIZED */}
        <section className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 border border-slate-600/50">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
            <span>🛠️</span> Skills & Tools
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* AI & Automation */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-green-600 mb-3 flex items-center gap-2">
                <span>🤖</span> AI & Automation
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.aiAutomation?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-900/50 text-slate-300 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border border-slate-700 hover:border-green-700 hover:shadow-lg transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-green-600 mb-3 flex items-center gap-2">
                <span>⚙️</span> Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.tools?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-900/50 text-slate-300 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border border-slate-700 hover:border-green-700 hover:shadow-lg transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-green-600 mb-3 flex items-center gap-2">
                <span>💻</span> Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.technical?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-900/50 text-slate-300 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border border-slate-700 hover:border-green-700 hover:shadow-lg transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Operations */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-green-600 mb-3 flex items-center gap-2">
                <span>📊</span> Operations & Management
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.operations?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-900/50 text-slate-300 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border border-slate-700 hover:border-green-700 hover:shadow-lg transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="text-center text-slate-400 text-sm py-8 border-t border-slate-700/50 mt-8">
          <p className="mb-2">© {new Date().getFullYear()} Evin Carr • Built with Claude AI</p>
          <p className="text-slate-500">
            Last updated: February 2026 • <a href={`mailto:${resumeData.email}`} className="text-green-600 hover:text-green-300 transition-colors">Get in touch</a>
          </p>
        </footer>
      </div>
    </main>
  )
}