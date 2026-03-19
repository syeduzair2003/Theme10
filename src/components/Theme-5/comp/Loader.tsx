'use client'
import React from 'react'

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo/Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-400 border-l-purple-400 rounded-full animate-spin animation-delay-150"></div>
        </div>

        {/* Loading Text */}
        <div className="mt-6">
          <h2 className="text-white text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-300 text-sm">Please wait while we prepare your content</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader