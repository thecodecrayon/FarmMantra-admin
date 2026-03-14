import { useNavigate } from "react-router-dom";

const EmptyState = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/categories/add");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <div className="text-gray-400 mb-4">
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
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No categories yet
      </h3>
      <p className="text-gray-600 mb-6">
        Get started by creating your first category
      </p>
      <button
        onClick={handleNavigate}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
      >
        + Add Category
      </button>
    </div>
  );
};

export default EmptyState;
