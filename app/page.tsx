'use client';

import { Hero } from '@/components/Hero';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/ContactForm';
import { VideoModal } from '@/components/VideoModal';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [videoModal, setVideoModal] = useState<string | null>(null);

  // Fast, subtle animations with immediate visibility
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white">
      <Hero />
      
      {/* About Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
        transition={{ duration: 0.3 }}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                variants={fadeInVariants}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              >
                Meet Lily
              </motion.h2>
              <motion.p
                variants={fadeInVariants}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-lg text-gray-700 mb-6 leading-relaxed"
              >
                With over a decade of experience in dance and movement therapy, 
                Lily has helped thousands discover their inner strength through the power of movement.
              </motion.p>
              <motion.p
                variants={fadeInVariants}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-lg text-gray-700 mb-8 leading-relaxed"
              >
                Her unique approach combines contemporary dance, mindfulness, and personal growth 
                to create transformative experiences for students of all levels.
              </motion.p>
              <motion.button
                variants={fadeInVariants}
                transition={{ duration: 0.3, delay: 0.4 }}
                onClick={() => setVideoModal('/assets/howgotstarted.mp4')}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Watch Her Story
              </motion.button>
            </div>
            <motion.div
              variants={fadeInVariants}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/assets/Lily_BIO_picture.png"
                alt="Lily"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Classes Preview */}    
      <motion.section
        initial="hidden" 
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
        transition={{ duration: 0.3 }}
        className="py-20 px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            Movement Classes
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Contemporary Flow",
                description: "Fluid movements that connect mind, body, and spirit",
                video: "/assets/Lily_dancing1.mp4"
              },
              {
                title: "Mindful Movement", 
                description: "Gentle practices focused on awareness and presence",
                video: "/assets/Lily_dancing2.mp4"
              },
              {
                title: "Expressive Dance",
                description: "Freedom of expression through creative movement",
                video: "/assets/LM_recap1.mp4"
              }
            ].map((classItem, index) => (
              <motion.div
                key={classItem.title}
                variants={fadeInVariants}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <div className="relative">
                  <video
                    src={classItem.video}
                    className="w-full h-48 object-cover cursor-pointer"
                    muted
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                    onClick={() => setVideoModal(classItem.video)}
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-200" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{classItem.title}</h3>
                  <p className="text-gray-700 mb-4">{classItem.description}</p>
                  <button
                    onClick={() => setVideoModal(classItem.video)}
                    className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
                  >
                    Watch Preview →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
        transition={{ duration: 0.3 }}
        className="py-20 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            What Students Say
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                video: "/assets/testimonio1.mp4",
                name: "Sarah M.",
                title: "Student since 2022"
              },
              {
                video: "/assets/testimonio2.mp4", 
                name: "Maria L.",
                title: "Student since 2021"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInVariants}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <video
                  src={testimonial.video}
                  className="w-full h-64 object-cover cursor-pointer"
                  muted
                  onClick={() => setVideoModal(testimonial.video)}
                />
                <div className="p-6">
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
        transition={{ duration: 0.3 }}
        className="py-20 px-6 bg-gray-900 text-white"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeInVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Start Your Journey
          </motion.h2>
          
          <motion.div
            variants={fadeInVariants}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.section>

      {/* Video Modal */}
      {videoModal && (
        <VideoModal
          isOpen={!!videoModal}
          onClose={() => setVideoModal(null)}
          videoSrc={videoModal}
        />
      )}
    </div>
  );
}