/* eslint-disable react/no-unescaped-entities */
import  { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: allPosts, isLoading } = useQuery('allPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-2">Search Posts</h1>
          <p className="text-gray-600 dark:text-black">
            Find the content you're looking for with our powerful search
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg"
              aria-label="Search input"
            />
          </div>
          
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}
          
          {/* Auto-suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                  onClick={() => {
                    setSearchTerm(suggestion.title);
                    setShowSuggestions(false);
                  }}
                >
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {suggestion.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
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
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Search Results
            </h2>
            <div className="space-y-6">
              {suggestions.map((result) => (
                <div 
                  key={result.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {result.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {result.body}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-1 rounded-full">
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