// components/ChatBox.js
"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [speakReply, setSpeakReply] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("speakReply");
      return stored === null ? true : stored === "true";
    }
    return true;
  });
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  useEffect(() => {
    if (!speakReply && typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [speakReply]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("speakReply", speakReply.toString());
    }
  }, [speakReply]);

  const handleSend = async (messageOverride) => {
    const message = messageOverride || input;
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { user: message }]);
    setInput("");

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, I don’t have info on that. Try asking something else about Jarred’s work!";
      setMessages((prev) => [...prev, { bot: reply }]);

      if (speakReply && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error("API error:", err.message);
      setMessages((prev) => [...prev, { bot: "Sorry, something went wrong." }]);
    }
  };

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0].transcript)
        .join("");

      setInput(transcript);
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        recognition.stop();
        handleSend(transcript);
      }, 2000);
    };

    recognition.onerror = (e) => {
      console.error("Voice error:", e.error);
      clearTimeout(silenceTimerRef.current);
      setListening(false);
      alert(`Mic error: ${e.error}`);
    };

    recognition.onend = () => {
      clearTimeout(silenceTimerRef.current);
      setListening(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setListening(true);
    } catch (err) {
      console.error("Recognition start failed:", err.message);
      alert("Unable to start voice recognition. Check permissions.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex justify-end">
        <label className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <input
            type="checkbox"
            checked={speakReply}
            onChange={() => setSpeakReply(!speakReply)}
          />
          Voice replies
        </label>
      </div>

      <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-xl px-4 py-2 text-sm max-w-[75%] ${m.user ? "self-end bg-blue-100 text-black" : "self-start bg-gray-100 dark:bg-gray-800 text-black dark:text-white"}`}
          >
            {m.user || m.bot}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Jarred’s work..."
          className="flex-1 p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
<button onClick={() => handleSend()} className="px-4 py-2 bg-blue-600 text-white rounded-full">
  Send
</button>

      </div>

      <div className="text-center">
        <button
          onClick={handleVoice}
          className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
        >
          {listening ? "🛑 Stop Listening" : "🎤 Speak"}
        </button>
      </div>
    </div>
  );
}
