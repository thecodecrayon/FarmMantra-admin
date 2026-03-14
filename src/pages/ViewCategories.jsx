import { useNavigate } from "react-router-dom";
import EmptyState from "../components/category/Empty";
import ErrorState from "../components/Error";
import LoadingState from "../components/category/Loading";
import useListCategories from "../hooks/categories/useListCategories";

const CategoriesList = () => {
  const { isLoading, error, categories } = useListCategories();
  const navigate = useNavigate();
  const handleEdit = (id) => {
    console.log("Edit category:", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = (id) => {
    console.log("Delete category:", id);
    // Show confirmation and delete
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Categories</h1>
          <p className="text-gray-600 mt-1">Manage your product categories</p>
        </div>
        <button
          onClick={() => navigate("/categories/add")}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-sm hover:shadow-md"
        >
          + Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
          >
            {/* Image with Overlay */}
            <div className="relative h-44 overflow-hidden bg-linear-to-br from-gray-900 to-gray-700">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Product Count Badge */}
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-white shadow-lg">
                {category?.totalItems || 0} Products
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1.5 line-clamp-1 group-hover:text-black transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 text-xs mb-4 line-clamp-2 min-h-[32px] leading-relaxed">
                {category.description}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category.id)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && <EmptyState />}
    </div>
  );
};

export default CategoriesList;
