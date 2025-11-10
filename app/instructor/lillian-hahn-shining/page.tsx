import { PRIMARY_INSTRUCTOR } from '../../../lib/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${PRIMARY_INSTRUCTOR} - Lead Instructor · Lil Movements`,
  description: `Meet ${PRIMARY_INSTRUCTOR}, your expert movement instructor at Lil Movements. Discover personalized fitness classes and transformational wellness programs.`,
  openGraph: {
    title: `${PRIMARY_INSTRUCTOR} - Lead Instructor · Lil Movements`,
    description: `Meet ${PRIMARY_INSTRUCTOR}, your expert movement instructor at Lil Movements.`,
    type: 'profile',
  }
}

export default function InstructorPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Image */}
        <div className="lg:col-span-1">
          <div className="aspect-square bg-gradient-to-br from-lmv-accent/10 to-lmv-accent/5 rounded-2xl flex items-center justify-center">
            <div className="w-24 h-24 bg-lmv-accent rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {PRIMARY_INSTRUCTOR.split(' ').map(name => name[0]).join('')}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-lmv-accent mb-4">{PRIMARY_INSTRUCTOR}</h1>
          <p className="text-lg text-lmv-base/80 mb-6">Lead Movement Instructor</p>
          
          <div className="prose prose-lg text-lmv-base/70">
            <p>
              Welcome to your movement journey with {PRIMARY_INSTRUCTOR}. As the lead instructor at Lil Movements, 
              she brings expertise, passion, and personalized guidance to every class.
            </p>
            
            <p>
              From strength training to mindful meditation, {PRIMARY_INSTRUCTOR} creates transformational 
              experiences that honor your body's wisdom and support your wellness goals.
            </p>

            <h3 className="text-xl font-semibold text-lmv-accent mt-8 mb-4">Teaching Philosophy</h3>
            <p>
              Movement is medicine. Every class is designed to meet you where you are and guide you toward 
              where you want to be, with compassion, expertise, and joy.
            </p>

            <h3 className="text-xl font-semibold text-lmv-accent mt-8 mb-4">Specialties</h3>
            <ul>
              <li>Strength & Conditioning</li>
              <li>Mindful Movement</li>
              <li>Meditation & Breathwork</li>
              <li>Beginner-Friendly Programs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-lmv-accent mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-lmv-base/80 mb-6">
          Join {PRIMARY_INSTRUCTOR} for personalized movement classes that transform your wellness.
        </p>
        <a 
          href="/login" 
          className="btn-primary inline-block px-8 py-3 text-lg"
        >
          Start Your First Class
        </a>
      </div>
    </main>
  )
}