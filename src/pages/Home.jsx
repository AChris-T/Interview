import {  NavLink } from 'react-router-dom';

function Home() {
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
      <div className="py-10 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-black">
          Welcome to My App
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-gray-600 dark:text-black">
          A simple and modern web application built with React and Tailwind CSS.
          Check out our features and try them out!
        </p>
        
        <div className="flex justify-center gap-4">
          <NavLink
            to="/data"
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            View Data
          </NavLink>
          <NavLink
            to="/search"
            className="px-6 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Search
          </NavLink>
        </div>
      </div>

      <div className="py-10 bg-white dark:bg-gray-800">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-900 dark:text-white">
          Features
        </h2>
        <div className="grid max-w-6xl gap-6 px-4 mx-auto md:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 text-center bg-gray-100 rounded-lg dark:bg-gray-700"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-10 text-white bg-blue-600">
        <div className="grid max-w-6xl grid-cols-2 gap-4 px-4 mx-auto text-center md:grid-cols-4">
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