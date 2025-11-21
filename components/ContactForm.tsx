'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    topic: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Standardized fade-in for form elements
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We\'ll get back to you soon.'
        });
        setFormData({
          name: '',
          email: '',
          topic: 'general',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.form
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={staggerItem}>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
              placeholder="Your full name"
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
              placeholder="your@email.com"
            />
          </motion.div>
        </div>

        <motion.div variants={staggerItem}>
          <label htmlFor="topic" className="block text-sm font-medium text-white mb-2">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
          >
            <option value="general" className="text-gray-900">General Inquiry</option>
            <option value="classes" className="text-gray-900">Classes & Schedules</option>
            <option value="membership" className="text-gray-900">Membership</option>
            <option value="private" className="text-gray-900">Private Sessions</option>
            <option value="events" className="text-gray-900">Events & Workshops</option>
            <option value="other" className="text-gray-900">Other</option>
          </select>
        </motion.div>

        <motion.div variants={staggerItem}>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Tell us about your interest in movement classes, questions about membership, or anything else you'd like to know..."
          />
        </motion.div>

        {submitStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}
          >
            {submitStatus.message}
          </motion.div>
        )}

        <motion.div
          variants={staggerItem}
          className="flex justify-center"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}