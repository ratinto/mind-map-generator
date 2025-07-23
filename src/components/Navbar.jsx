import React from "react";
import logo from "../assets/mind-tinker-logo.png";

export default function Navbar({ onCreate, onLogout }) {
  return (
    <nav className="w-full bg-white shadow-md flex items-center justify-between px-8 py-4 border-b border-gray-100">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Mind Tinker Logo"
          className="w-10 h-10 rounded-full object-cover shadow-sm"
        />
        <span className="text-2xl font-bold text-blue-800 tracking-tight hidden sm:inline">Mind Tinker</span>
      </div>
      {/* Logout Button */}
      <div className="flex items-center">
        <button
          className="border border-blue-500 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg font-semibold transition ml-4"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
} 