'use client';

import { useState } from 'react';
import GlassButton from '@/components/GlassButton';

interface FormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface FormState {
  isLoading: boolean;
  message: string;
  isError: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    topic: '',
    message: ''
  });

  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    message: '',
    isError: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous messages
    setFormState({ isLoading: true, message: '', isError: false });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.ok) {
        setFormState({
          isLoading: false,
          message: 'Thank you! Your message has been sent successfully.',
          isError: false
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          topic: '',
          message: ''
        });
      } else {
        setFormState({
          isLoading: false,
          message: result.error || 'Something went wrong. Please try again.',
          isError: true
        });
      }
    } catch (error) {
      setFormState({
        isLoading: false,
        message: 'Network error. Please check your connection and try again.',
        isError: true
      });
    }
  };

  return (
    <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 
                     text-neutral-900 placeholder-neutral-500 
                     focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent
                     transition-all duration-200"
            placeholder="Your full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 
                     text-neutral-900 placeholder-neutral-500 
                     focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent
                     transition-all duration-200"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Topic Field */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-neutral-900 mb-2">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 
                     text-neutral-900 
                     focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent
                     transition-all duration-200"
          >
            <option value="">Select a topic (optional)</option>
            <option value="Membership">Membership Questions</option>
            <option value="Classes">Classes & Programs</option>
            <option value="Technical Support">Technical Support</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Partnerships">Partnerships</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-900 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 
                     text-neutral-900 placeholder-neutral-500 
                     focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent
                     transition-all duration-200 resize-vertical"
            placeholder="How can we help you?"
          />
        </div>

        {/* Status Message */}
        {formState.message && (
          <div className={`p-4 rounded-2xl ${
            formState.isError 
              ? 'bg-red-50/80 border border-red-200 text-red-800' 
              : 'bg-green-50/80 border border-green-200 text-green-800'
          }`}>
            {formState.message}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <GlassButton
            label={formState.isLoading ? "Sending..." : "Send Message"}
            onClick={() => {}} // Form submission is handled by onSubmit
            variant="primary"
            className="px-8 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </form>
    </div>
  );
}