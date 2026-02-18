import { resumeData } from './resume-data'
import Link from 'next/link'

export default function Home() {
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

        {/* CTA to Chat */}
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Let's Connect
          </h2>
          <p className="text-emerald-100 mb-6">
            Chat with an AI version of me to learn more about my experience and projects.
          </p>
          <Link
            href="/chat"
            className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-lg text-base font-bold hover:bg-emerald-50 transition-all shadow-md"
          >
            Start Conversation →
          </Link>
        </div>
      </div>
    </main>
  )
}