'use client';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Spinning circle */}
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* Pulsing dots */}
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-2">Loading Portfolio</h2>
        <p className="text-gray-400">Preparing an amazing experience...</p>
        
        {/* Progress bar */}
        <div className="w-64 bg-gray-700 rounded-full h-2 mx-auto mt-4">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}