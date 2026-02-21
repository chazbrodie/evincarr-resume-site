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

  const handleSuggestedQuestion = async (question: string) => {
    if (isLoading) return
    
    setMessages(prev => [...prev, { role: 'user', content: question }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
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
  "What's your experience with Claude AI?",
  "What do your coworkers call you?",
  "What was your RV life like?"
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8 relative z-10">
        
        <header className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-10 mb-6 md:mb-8 border border-slate-600/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-cyan-500/30 shadow-xl">
                <Image
                  src="/headshot.jpg"
                  alt="Evin Carr"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {resumeData.name}
              </h1>
              <p className="text-xl md:text-2xl text-cyan-400 mb-4 font-medium">
                {resumeData.title}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-slate-300 text-base">
                <span className="flex items-center gap-1">📍 {resumeData.location}</span>
                <a href={`mailto:${resumeData.email}`} className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors">
                  ✉️ {resumeData.email}
                </a>
                <a href={`https://${resumeData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-1">
                  💼 LinkedIn →
                </a>
                <a href="/Evin-Carr-Resume.pdf" download className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-1">
                  📄 Resume
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Quick Chat CTA */}
        {!chatOpen && (
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 text-white border border-cyan-500/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mt-16 blur-3xl"></div>
            <div className="relative flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-8">
              <div className="flex-1 text-center md:text-left">
  <h2 className="text-xl md:text-2xl font-bold mb-2">💬 Questions? Chat with my AI bot!</h2>
  <p className="text-white/90 text-sm md:text-base">Ask about automations, RV solar systems, or why I'm obsessed with Claude AI. It knows the nerdy details.</p>
</div>
<button
  onClick={() => setChatOpen(true)}
  className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all text-lg shadow-lg"
>
  Ask Away
</button>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        {chatOpen && (
          <div className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl mb-6 md:mb-8 border border-slate-600/50 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  💬
                </div>
                <div>
                  <h3 className="font-bold text-white">Chat with AI Assistant</h3>
                  <p className="text-white/80 text-sm">Ask me about Evin's experience</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/80 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center mt-12">
                  <p className="text-slate-400 mb-6 text-sm md:text-base">👋 Hey! Ask me anything about my experience and projects</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestedQuestion(q)}
                        className="text-left p-3 bg-slate-800/80 rounded-lg border border-slate-700 hover:border-cyan-600 hover:shadow-md transition-all text-sm text-slate-300"
                      >
                        💡 {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 md:p-4 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-700 text-slate-100'
                      }`}
                    >
                      <p className="text-sm md:text-base whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 text-slate-100 p-3 md:p-4 rounded-2xl">
                    <p className="text-sm md:text-base">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-slate-900/50 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 text-sm md:text-base"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        <section className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 border border-slate-600/50">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
            <span>👋</span> About Me
          </h2>
          <div className="text-slate-300 space-y-4 text-sm md:text-base leading-relaxed">
            {resumeData.bio.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Automation Projects */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-2xl p-6 md:p-8 text-white border border-cyan-700/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="relative">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                <span>⚡</span> Automation Projects
              </h3>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                {resumeData.highlights.automations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-white/80 mt-1">→</span>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Career Highlights */}
          <div className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-600/50">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
              <span>🏆</span> Career Highlights
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-slate-300">
              {resumeData.highlights.achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Experience */}
        <section className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 border border-slate-600/50">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center gap-2">
            <span>💼</span> Experience
          </h2>
          <div className="space-y-6 md:space-y-8">
            {resumeData.experience.map((job, index) => (
              <div key={index} className="border-l-4 border-cyan-500 pl-4 md:pl-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">{job.role}</h3>
                    <p className="text-cyan-400 font-medium text-sm md:text-base">{job.company}</p>
                  </div>
                  <div className="text-slate-400 text-xs md:text-sm">
                    <p>{job.period}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-3 text-sm md:text-base italic">{job.description}</p>
                <ul className="space-y-2 text-sm md:text-base text-slate-300">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 border border-slate-600/50">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
            <span>🎓</span> Education
          </h2>
          <div className="border-l-4 border-cyan-500 pl-4 md:pl-6">
            <h3 className="text-lg md:text-xl font-bold text-white mb-1">{resumeData.education.degree}</h3>
            <p className="text-cyan-400 font-medium text-sm md:text-base mb-2">{resumeData.education.school}</p>
            <p className="text-slate-400 text-xs md:text-sm">{resumeData.education.status}</p>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-slate-800/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 mb-6 md:mb-8 border border-slate-600/50">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center gap-2">
            <span>🔧</span> Skills & Tools
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* AI & Automation */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <span>🤖</span> AI & Automation
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.aiAutomation?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-900/50 text-slate-300 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border border-slate-700 hover:border-cyan-500 hover:shadow-lg transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <span>🛠️</span> Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.tools?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-900/50 text-slate-300 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border border-slate-700 hover:border-cyan-500 hover:shadow-lg transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <span>💻</span> Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.technical?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-900/50 text-slate-300 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border border-slate-700 hover:border-cyan-500 hover:shadow-lg transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Operations */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <span>📊</span> Operations & Management
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.operations?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-900/50 text-slate-300 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium border border-slate-700 hover:border-cyan-500 hover:shadow-lg transition-all cursor-default"
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
            Last updated: February 2026 • <a href={`mailto:${resumeData.email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors">Get in touch</a>
          </p>
        </footer>

      </div>
    </main>
  )
}