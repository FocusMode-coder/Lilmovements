'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

interface JoinFormProps {
  mode?: 'join' | 'signin';
}

export function JoinForm({ mode = 'join' }: JoinFormProps) {
  const [isSignIn, setIsSignIn] = useState(mode === 'signin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    membershipPlan: 'basic'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fast, smooth animations
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignIn) {
        // Sign in logic
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError('Invalid email or password');
        } else {
          setSuccess('Welcome back!');
          window.location.href = '/dashboard';
        }
      } else {
        // Registration logic
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            membershipPlan: formData.membershipPlan,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Registration failed');
        } else {
          setSuccess('Account created successfully! Please sign in.');
          setIsSignIn(true);
          setFormData({ ...formData, password: '', confirmPassword: '' });
        }
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible" 
        variants={fadeInVariants}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h2
            variants={fadeInVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl font-bold text-gray-900"
          >
            {isSignIn ? 'Welcome Back' : 'Join Lil Movements'}
          </motion.h2>
          <motion.p
            variants={fadeInVariants}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-2 text-gray-600"
          >
            {isSignIn ? 'Sign in to your account' : 'Start your movement journey today'}
          </motion.p>
        </div>

        <motion.div
          variants={fadeInVariants}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isSignIn && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isSignIn}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            {!isSignIn && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isSignIn}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                </div>

                <div>
                  <label htmlFor="membershipPlan" className="block text-sm font-medium text-gray-700 mb-2">
                    Membership Plan
                  </label>
                  <select
                    id="membershipPlan"
                    name="membershipPlan"
                    value={formData.membershipPlan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  >
                    <option value="basic">Basic - $29/month</option>
                    <option value="premium">Premium - $49/month</option>
                    <option value="unlimited">Unlimited - $79/month</option>
                  </select>
                </div>
              </>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Standardized button styling */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? 'Processing...' : (isSignIn ? 'Sign In' : 'Create Account')}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {isSignIn ? "Don't have an account? Join now" : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}