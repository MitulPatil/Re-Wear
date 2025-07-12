import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import {
  Menu,
  X,
  User,
  LogOut,
  Sun,
  Moon,
  Recycle,
  Sparkles,
  Gift,
  Settings,
} from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 sticky top-0 z-50 transition-all duration-300 shadow-2xl">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative p-2 rounded-2xl bg-gradient-primary shadow-xl group-hover:shadow-glow transition-all duration-300">
              <Recycle className="h-8 w-8 text-white" />
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-gradient-primary font-display">
              ReWear
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              to="/browse"
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive("/browse")
                  ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
              }`}
            >
              Browse Items
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive("/dashboard")
                      ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-item"
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive("/add-item")
                      ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  List Item
                </Link>
                <Link
                  to="/points-marketplace"
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive("/points-marketplace")
                      ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Gift className="h-4 w-4" />
                    <span>Rewards</span>
                  </div>
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive("/admin")
                        ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive("/login")
                      ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                  }`}
                >
                  Login
                </Link>
                <Link to="/signup" className="btn-primary px-6 py-3 text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-gentle"></div>
                  <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {user.points} points
                  </span>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-3 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="text-sm font-semibold">{user.name}</span>
                  </button>

                  <div className="absolute right-0 mt-4 w-56 bg-white/90 dark:bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 dark:border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-3">
                      <Link
                        to="/dashboard"
                        className="block px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 rounded-xl mx-2"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/edit-profile"
                        className="block px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 rounded-xl mx-2 flex items-center space-x-2"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </Link>
                      <hr className="my-3 border-white/30 dark:border-white/20 mx-4" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-6 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-all duration-200 flex items-center space-x-2 rounded-xl mx-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 shadow-lg"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 shadow-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-2xl">
            <div className="px-6 py-8 space-y-3">
              <Link
                to="/browse"
                className={`block py-4 px-4 text-base font-medium rounded-xl transition-all duration-300 ${
                  isActive("/browse")
                    ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Items
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`block py-4 px-4 text-base font-medium rounded-xl transition-all duration-300 ${
                      isActive("/dashboard")
                        ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/edit-profile"
                    className={`block py-4 px-4 text-base font-medium rounded-xl transition-all duration-300 ${
                      isActive("/edit-profile")
                        ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </div>
                  </Link>
                  <Link
                    to="/add-item"
                    className={`block py-4 px-4 text-base font-medium rounded-xl transition-all duration-300 ${
                      isActive("/add-item")
                        ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Item
                  </Link>
                  <Link
                    to="/points-marketplace"
                    className={`block py-4 px-4 text-base font-medium rounded-xl transition-all duration-300 ${
                      isActive("/points-marketplace")
                        ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <Gift className="h-4 w-4" />
                      <span>Rewards</span>
                    </div>
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className={`block py-4 px-4 text-base font-medium rounded-xl transition-all duration-300 ${
                        isActive("/admin")
                          ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <div className="pt-6 mt-6 border-t border-white/30 dark:border-white/20">
                    <div className="flex items-center space-x-4 mb-6 p-4 rounded-xl bg-white/20 dark:bg-white/10">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-500/50"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                          <User className="h-6 w-6 text-white" />
                        </div>
                      )}
                      <div>
                        <div className="text-base font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                            {user.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full py-4 px-4 text-base font-medium rounded-xl transition-all duration-300 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3 pt-6 mt-6 border-t border-white/30 dark:border-white/20">
                  <Link
                    to="/login"
                    className={`block py-4 px-4 text-base font-medium rounded-xl transition-all duration-300 ${
                      isActive("/login")
                        ? "bg-primary-500/20 text-primary-600 dark:text-primary-400 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block btn-primary text-center py-4 px-4 rounded-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
