"use client";
import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">Jarred Geller</a>
        <button
          className="sm:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className="hidden sm:flex space-x-4 text-sm font-medium">
          <a href="/product" className="text-gray-600 hover:text-gray-900">Product</a>
          <a href="/marketing" className="text-gray-600 hover:text-gray-900">Marketing</a>
          <a href="/operations" className="text-gray-600 hover:text-gray-900">Operations</a>
          <a href="/projects" className="text-gray-600 hover:text-gray-900">Projects</a>
          <a href="/teaching" className="text-gray-600 hover:text-gray-900">Teaching & Curriculum</a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">About Me</a>
          <a href="/chat" className="text-gray-600 hover:text-gray-900">Chat</a>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 text-sm font-medium">
          <a href="/product" className="block text-gray-600 hover:text-gray-900">Product</a>
          <a href="/marketing" className="block text-gray-600 hover:text-gray-900">Marketing</a>
          <a href="/operations" className="block text-gray-600 hover:text-gray-900">Operations</a>
          <a href="/projects" className="block text-gray-600 hover:text-gray-900">Projects</a>
          <a href="/teaching" className="block text-gray-600 hover:text-gray-900">Teaching & Curriculum</a>
          <a href="/about" className="block text-gray-600 hover:text-gray-900">About Me</a>
          <a href="/chat" className="block text-gray-600 hover:text-gray-900">Chat</a>
        </div>
      )}
    </nav>
  );
}
