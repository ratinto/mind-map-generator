import React from "react";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/mind-tinker-logo.png";

export default function Navbar({ onCreate, onLogout }) {
  const { user } = useAuth();

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <img src={logo} alt="Mind Tinker Logo" className="w-8 h-8 rounded-full mr-3" />
            <h1 className="text-xl font-bold text-blue-800">Mind Tinker</h1>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-4">
            {/* User greeting */}
            {user && (
              <span className="text-gray-700">
                Welcome, <span className="font-semibold">{user.username}</span>
              </span>
            )}
            
            {/* Create new board button */}
            <button
              onClick={onCreate}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-semibold text-sm shadow"
            >
              + New Board
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold text-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 