import { resumeData } from './resume-data'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-8">
        
        {/* Header */}
        <header className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            {resumeData.name}
          </h1>
          <p className="text-2xl text-gray-600 mb-6">
            {resumeData.title}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {resumeData.bio}
          </p>
        </header>

        {/* Experience */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience</h2>
          {resumeData.experience?.map((job, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <h3 className="text-2xl font-semibold text-gray-900">
                {job.role}
              </h3>
              <p className="text-xl text-gray-600 mb-2">
                {job.company} • {job.period}
              </p>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <ul className="list-disc list-inside space-y-2">
                {job.achievements?.map((achievement, i) => (
                  <li key={i} className="text-gray-700">{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CTA to Chat */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to know more?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Chat with an AI version of me that can answer questions about my experience
          </p>
          <Link
            href="/chat"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Talk to AI Me
          </Link>
        </div>

        {/* Contact */}
        <footer className="mt-8 text-center text-gray-600">
          <p>{resumeData.contact?.email} • {resumeData.contact?.location}</p>
        </footer>
      </div>
    </main>
  )
}