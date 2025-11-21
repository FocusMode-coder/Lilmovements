"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type JoinFormMode = "create" | "signin";

interface JoinFormProps {
  initialMode?: JoinFormMode;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const JoinForm: React.FC<JoinFormProps> = ({ initialMode = "create" }) => {
  const [mode, setMode] = useState<JoinFormMode>(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const endpoint =
        mode === "create" ? "/api/register" : "/api/auth/signin";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          (data && (data.error || data.message)) ||
          "There was a problem. Please try again.";
        throw new Error(message);
      }

      // TODO: redirect to dashboard or refresh page
      // for now just clear the form
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Unexpected error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-md bg-white shadow-xl rounded-3xl px-8 py-10 border border-neutral-100"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-neutral-100 p-1">
            <button
              type="button"
              onClick={() => setMode("create")}
              className={`px-4 py-1 text-sm font-medium rounded-full transition ${
                mode === "create"
                  ? "bg-black text-white"
                  : "text-neutral-500"
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`px-4 py-1 text-sm font-medium rounded-full transition ${
                mode === "signin"
                  ? "bg-black text-white"
                  : "text-neutral-500"
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center text-neutral-900">
          Join Lil Movements
        </h1>
        <p className="mt-2 text-sm text-center text-neutral-500">
          {mode === "create"
            ? "Create your account to start your movement journey."
            : "Sign in to continue your practice."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === "create" && (
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-neutral-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-1 block w-full rounded-xl border-neutral-200 shadow-sm focus:border-black focus:ring-black px-3 py-2 bg-neutral-50"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-xl border-neutral-200 shadow-sm focus:border-black focus:ring-black px-3 py-2 bg-neutral-50"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-xl border-neutral-200 shadow-sm focus:border-black focus:ring-black px-3 py-2 bg-neutral-50"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 inline-flex justify-center items-center rounded-full border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? mode === "create"
                ? "Creating account..."
                : "Signing in..."
              : mode === "create"
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-neutral-400">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default JoinForm;