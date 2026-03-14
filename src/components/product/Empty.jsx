const Empty = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-20 h-20 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        No products yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Start building your inventory by adding your first product. Your
        customers are waiting!
      </p>
      <button
        onClick={() => (window.location.href = "/products/add")}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-sm hover:shadow-md"
      >
        + Add Your First Product
      </button>
    </div>
  );
};

export default Empty;
