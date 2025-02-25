import  { useState } from 'react';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon, FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

function DataPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const [filterText, setFilterText] = useState('');

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return response.data;
    }
  });

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(filterText.toLowerCase()) ||
    post.body.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedPosts = filteredPosts?.sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return a.id - b.id;
  });

  const postsPerPage = 6;
  const totalPages = Math.ceil((sortedPosts?.length || 0) / postsPerPage);
  const currentPosts = sortedPosts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="space-y-8 animate-pulse">
          <div className="w-1/4 h-8 bg-gray-200 rounded dark:bg-gray-700"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
                <div className="w-1/4 h-4 mb-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="w-3/4 h-8 mb-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex items-center px-4 py-2 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-900/50 dark:text-red-400">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Error loading data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
          Explore Posts
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Filter posts..."
              className="w-full py-2 pl-10 pr-4 transition-shadow duration-200 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <FunnelIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2 pl-4 pr-10 transition-shadow duration-200 border rounded-lg appearance-none sm:w-auto focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="title">Sort by Title</option>
              <option value="id">Sort by ID</option>
            </select>
            <ArrowsUpDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts?.map((post, index) => (
          <div
            key={post.id}
            className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg group dark:bg-gray-800 rounded-xl hover:shadow-xl hover:-translate-y-1"
            style={{
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              opacity: 0,
            }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 text-xs font-semibold text-indigo-600 transition-colors duration-200 bg-indigo-100 rounded-full dark:text-indigo-400 dark:bg-indigo-900/50 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50">
                  Post #{post.id}
                </span>
              </div>
              <h2 className="mb-3 text-xl font-semibold text-gray-900 transition-colors duration-200 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {post.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <nav className="relative z-0 inline-flex -space-x-px overflow-hidden rounded-lg shadow-sm" aria-label="Pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 first:rounded-l-lg"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 last:rounded-r-lg"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </nav>
      </div>

      <style >{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default DataPage; 