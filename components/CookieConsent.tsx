"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "cookie_consent"; // "accepted" | "declined"

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostrar sólo si nunca decidió
    const v = getCookie(COOKIE_NAME);
    if (!v) setVisible(true);
  }, []);

  const accept = () => {
    setCookie(COOKIE_NAME, "accepted", 180); // 6 meses
    setVisible(false);
  };

  const decline = () => {
    setCookie(COOKIE_NAME, "declined", 180);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3">
      <div className="mx-auto w-full max-w-3xl rounded-xl border bg-white/95 p-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-700">
            This website uses cookies to improve your experience and for basic
            analytics. By using it, you agree to our{" "}
            <a href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </p>
          <div className="flex w-full gap-2 sm:w-auto">
            <button
              onClick={decline}
              className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 sm:flex-none"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="flex-1 rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white hover:opacity-90 sm:flex-none"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}