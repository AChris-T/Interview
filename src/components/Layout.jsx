/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle dark mode
  function handleDarkMode() {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Check if a nav link is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Navigation links configuration
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/data', label: 'Data' },
    { path: '/search', label: 'Search' },
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''} max-w-[1460px] mx-auto`}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Navigation */}
        <nav className="bg-white shadow-md dark:bg-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center justify-between w-full">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    My App
                  </h1>
                </div>
                <button
                  type="button"
                  className="md:hidden ml-4 p-2 rounded-md  text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="hidden md:flex md:items-center md:space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActivePath(link.path)
                        ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                        : 'text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Dark Mode Toggle */}
                <button
                  onClick={handleDarkMode}
                  className="ml-4 p-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-150"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden ${
              isMobileMenuOpen ? 'block' : 'hidden'
            } border-t border-gray-200 dark:border-gray-700`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                    isActivePath(link.path)
                      ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50'
                      : 'text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={handleDarkMode}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50"
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-md dark:bg-gray-800 mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Built with React & Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Layout; 