'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GlassButton from '@/components/GlassButton';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormState {
  isLoading: boolean;
  error: string;
  mode: 'register' | 'signin';
}

export default function JoinForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    error: '',
    mode: 'register'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isLoading: true, error: '' }));

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      // Auto sign in after successful registration
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error('Registration successful, but sign in failed. Please try signing in manually.');
      }

      router.push('/dashboard');
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      }));
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isLoading: true, error: '' }));

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Invalid email or password');
      }

      router.push('/dashboard');
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      }));
    }
  };

  const toggleMode = () => {
    setFormState(prev => ({ 
      ...prev, 
      mode: prev.mode === 'register' ? 'signin' : 'register',
      error: ''
    }));
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-md shadow-xl p-8 space-y-6">
      {/* Mode Toggle */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900">
          {formState.mode === 'register' ? 'Join Lil Movements' : 'Welcome Back'}
        </h1>
        <p className="text-neutral-600">
          {formState.mode === 'register' 
            ? 'Create your account to start your movement journey' 
            : 'Sign in to continue your practice'
          }
        </p>
      </div>

      {/* Tab Buttons */}
      <div className="flex rounded-2xl bg-white/50 p-1">
        <button
          onClick={() => formState.mode !== 'register' && toggleMode()}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
            formState.mode === 'register'
              ? 'bg-white shadow-sm text-neutral-900'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Create Account
        </button>
        <button
          onClick={() => formState.mode !== 'signin' && toggleMode()}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
            formState.mode === 'signin'
              ? 'bg-white shadow-sm text-neutral-900'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Sign In
        </button>
      </div>

      {/* Form */}
      <form onSubmit={formState.mode === 'register' ? handleRegister : handleSignIn} className="space-y-4">
        {/* Name field (only for registration) */}
        {formState.mode === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 
                       text-neutral-900 placeholder-neutral-500 
                       focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent
                       transition-all duration-200"
              placeholder="Enter your full name"
            />
          </div>
        )}

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 
                     text-neutral-900 placeholder-neutral-500 
                     focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent
                     transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>

        {/* Password field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-900 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={8}
            className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 
                     text-neutral-900 placeholder-neutral-500 
                     focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent
                     transition-all duration-200"
            placeholder={formState.mode === 'register' ? 'Create a password (8+ characters)' : 'Enter your password'}
          />
        </div>

        {/* Error Message */}
        {formState.error && (
          <div className="p-3 rounded-xl bg-red-50/80 border border-red-200 text-red-800 text-sm">
            {formState.error}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <GlassButton
            label={formState.isLoading 
              ? (formState.mode === 'register' ? 'Creating Account...' : 'Signing In...') 
              : (formState.mode === 'register' ? 'Create Account' : 'Sign In')
            }
            onClick={() => {}} // Form submission handled by onSubmit
            variant="primary"
            className="w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </form>

      {/* Alternative Action */}
      <div className="text-center text-sm text-neutral-600">
        {formState.mode === 'register' ? (
          <>
            Already have an account?{' '}
            <button onClick={toggleMode} className="text-neutral-900 font-medium hover:underline">
              Sign in
            </button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <button onClick={toggleMode} className="text-neutral-900 font-medium hover:underline">
              Create one
            </button>
          </>
        )}
      </div>
    </div>
  );
}