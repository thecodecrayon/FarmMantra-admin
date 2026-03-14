const LoadingState = () => {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-9 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-12 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Loading Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Image Skeleton */}
            <div className="h-48 bg-gray-200 animate-pulse"></div>

            {/* Content Skeleton */}
            <div className="p-5 space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
