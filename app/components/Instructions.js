// components/Instructions.js
"use client";
import { useEffect, useState } from "react";

export default function Instructions() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("hideInstructions");
    if (dismissed) setShow(false);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("hideInstructions", "true");
    setShow(false);
  };

  if (!show) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="bg-blue-50 border border-blue-200 dark:bg-blue-900 dark:border-blue-700 text-sm text-gray-800 dark:text-gray-200 rounded-lg p-4 mb-4 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-white text-lg font-bold"
      >
        ×
      </button>

      <p className="leading-relaxed">
        <span role="img" aria-label="mic" className="mr-1">🎤</span>
        <strong>Ask about Jarred’s work.</strong><br />
        Type a question and hit <span className="font-medium">Enter</span> or <span className="font-medium">Send</span>.
        {isMobile ? (
          <><br />Tap the mic and speak — your message will submit automatically after a short pause.</>
        ) : (
          <><br />Or click the mic, speak, and pause for 2 seconds to auto-submit.</>
        )}
      </p>
    </div>
  );
} 
