/* eslint-disable react/no-unescaped-entities */
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: allPosts, isLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return response.data;
    }
  });

  useEffect(() => {
    if (searchTerm.length >= 2 && allPosts) {
      const filtered = allPosts
        .filter(post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allPosts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-black">Search Posts</h1>
          <p className="text-gray-600 dark:text-black">
            Find the content you're looking for with our powerful search
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full py-3 pl-10 pr-4 text-lg border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              aria-label="Search input"
            />
          </div>
          
          {isLoading && (
            <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
              <div className="w-5 h-5 border-t-2 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Auto-suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className="block w-full px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => {
                    setSearchTerm(suggestion.title);
                    setShowSuggestions(false);
                  }}
                >
                  <p className="font-medium text-gray-900 truncate dark:text-white">
                    {suggestion.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 truncate dark:text-gray-400">
                    {suggestion.body}
                  </p>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Search Results */}
        {searchTerm && !showSuggestions && suggestions.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Search Results
            </h2>
            <div className="space-y-6">
              {suggestions.map((result) => (
                <div 
                  key={result.id}
                  className="p-6 transition-shadow duration-200 bg-white rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        {result.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {result.body}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full dark:text-indigo-400 dark:bg-indigo-900/50">
                      Post #{result.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchTerm && !showSuggestions && suggestions.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No results found for "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage; 