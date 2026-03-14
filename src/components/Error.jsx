const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <div className="text-red-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 mb-6">
        {error?.message || "Failed to load categories. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
