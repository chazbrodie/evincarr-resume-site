import { resumeData } from './resume-data'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-emerald-50">
      <div className="max-w-5xl mx-auto p-8">
        
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-xl p-10 mb-8 border-l-8 border-orange-600">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 bg-clip-text text-transparent mb-3">
            {resumeData.name}
          </h1>
          <p className="text-2xl text-gray-700 mb-4 font-medium">
            {resumeData.title}
          </p>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <span>📍 {resumeData.location}</span>
            <span>📧 {resumeData.email}</span>
            <span>📱 {resumeData.phone}</span>
            <a href={`https://${resumeData.linkedin}`} target="_blank" className="text-orange-600 hover:text-orange-800">
              💼 LinkedIn
            </a>
          </div>
        </header>

        {/* Bio */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-emerald-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-4xl mr-3">👋</span>
            Hey there!
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {resumeData.bio}
          </p>
        </section>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Automations */}
          <section className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-4xl mr-3">⚡</span>
              Automation Wins
            </h2>
            <ul className="space-y-4">
              {resumeData.highlights?.automations?.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-2xl mr-3 flex-shrink-0">🚀</span>
                  <span className="text-white/95">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements */}
          <section className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-4xl mr-3">🏆</span>
              Key Achievements
            </h2>
            <ul className="space-y-4">
              {resumeData.highlights?.achievements?.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-2xl mr-3 flex-shrink-0">✨</span>
                  <span className="text-white/95">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Experience */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="text-4xl mr-3">💼</span>
            Experience
          </h2>
          <div className="space-y-8">
            {resumeData.experience?.map((job, index) => (
              <div key={index} className={`border-l-4 ${index % 2 === 0 ? 'border-orange-600' : 'border-emerald-700'} pl-6 py-2`}>
                <h3 className="text-2xl font-bold text-gray-900">
                  {job.role}
                </h3>
                <p className={`text-xl font-semibold mb-1 ${index % 2 === 0 ? 'text-orange-600' : 'text-emerald-700'}`}>
                  {job.company}
                </p>
                <p className="text-gray-600 mb-3">
                  {job.period} • {job.location}
                </p>
                <p className="text-gray-700 mb-4 italic">{job.description}</p>
                <ul className="space-y-2">
                  {job.achievements?.map((achievement, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <span className={`mr-2 mt-1 ${index % 2 === 0 ? 'text-orange-600' : 'text-emerald-700'}`}>▸</span>
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
          <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-4xl mr-3">🎓</span>
              Education
            </h2>
            <div className="border-l-4 border-emerald-700 pl-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {resumeData.education.degree}
              </h3>
              <p className="text-xl text-emerald-700 font-semibold">
                {resumeData.education.school}
              </p>
              <p className="text-gray-600">{resumeData.education.status}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-4xl mr-3">🛠️</span>
            Skills & Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills?.map((skill, index) => (
              <span
                key={index}
                className={`px-5 py-3 rounded-full text-base font-semibold border-2 transition-colors ${
                  index % 2 === 0 
                    ? 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200 hover:border-orange-400' 
                    : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200 hover:border-emerald-400'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CTA to Chat */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 rounded-2xl shadow-2xl p-10 text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Want to know more?
          </h2>
          <p className="text-xl text-white/90 mb-6">
            Chat with an AI version of me! Ask about my experience, projects, or anything else.
          </p>
          <Link
            href="/chat"
            className="inline-block bg-white text-orange-600 px-10 py-4 rounded-xl text-xl font-bold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
          >
            💬 Talk to AI Evin
          </Link>
        </div>
      </div>
    </main>
  )
}