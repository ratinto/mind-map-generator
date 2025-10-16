import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiLogOut, FiChevronDown } from "react-icons/fi";
import logo from "../assets/mind-tinker-logo.png";

export default function Navbar({ onCreate, onLogout }) {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowUserMenu(false);
    if (onLogout) onLogout();
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div 
              className="flex items-center cursor-pointer hover:opacity-75 transition-opacity"
              onClick={() => navigate('/dashboard')}
            >
              <img src={logo} alt="Mind Tinker" className="w-8 h-8 rounded-lg mr-3" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Mind Tinker</h1>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* New Board Button - Desktop */}
              {/* <button
                onClick={onCreate}
                className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                New Board
              </button> */}

              {/* New Board Button - Mobile */}
              <button
                onClick={onCreate}
                className="sm:hidden p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                title="Create New Board"
              >
                <FiPlus className="w-5 h-5" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                >
                  {/* User Avatar */}
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  
                  {/* User Name - Desktop Only */}
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.username || 'User'}
                  </span>
                  
                  {/* Dropdown Arrow */}
                  <FiChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.username || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors duration-200"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </>
  );
} 