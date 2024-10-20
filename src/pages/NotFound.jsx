import React from 'react';

const NotFound = () => {
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Animated GIF */}
        <img
          src="https://i.pinimg.com/originals/3c/df/50/3cdf50bf2536bb0a51cb28e1a291e670.gif"
          alt="Not Found Animation"
          className="h-60 mx-auto"
        />

        <div className="mt-8">
          <a
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
