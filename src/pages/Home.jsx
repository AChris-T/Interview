import { Link } from 'react-router-dom';

function Home() {
  // List of features
  const features = [
    {
      title: 'Real-time Data',
      description: 'Access and analyze data in real-time',
      icon: '📊'
    },
    {
      title: 'Smart Search',
      description: 'Find what you need quickly',
      icon: '🔍'
    },
    {
      title: 'Dark Mode',
      description: 'Easy on your eyes',
      icon: '🌙'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-black mb-4">
          Welcome to My App
        </h1>
        <p className="text-gray-600 dark:text-black max-w-2xl mx-auto mb-8">
          A simple and modern web application built with React and Tailwind CSS.
          Check out our features and try them out!
        </p>
        
        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            to="/data"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            View Data
          </Link>
          <Link
            to="/search"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
          >
            Search
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 text-center">
          <div>
            <div className="text-3xl font-bold">1000+</div>
            <div>Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold">50k+</div>
            <div>Data Points</div>
          </div>
          <div>
            <div className="text-3xl font-bold">99%</div>
            <div>Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24/7</div>
            <div>Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 