const Loading = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          >
            {/* Image Skeleton */}
            <div className="h-64 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>

            {/* Content Skeleton */}
            <div className="p-5 space-y-4">
              {/* Tags Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
              </div>

              {/* Title Skeleton */}
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Price Skeleton */}
              <div className="space-y-1">
                <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Stock Info Skeleton */}
              <div className="pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Buttons Skeleton */}
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

export default Loading;
