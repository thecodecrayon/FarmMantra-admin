import { useNavigate } from "react-router-dom";
import EmptyState from "../components/product/Empty";
import ErrorState from "../components/Error";
import LoadingState from "../components/product/Loading";
import useListProducts from "../hooks/products/useListProducts";

const ViewItems = () => {
  const { isLoading, error, products } = useListProducts();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete product:", id);
    // Show confirmation and delete
  };

  const handleView = (id) => {
    navigate(`/products/${id}`);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price - (price * discount) / 100);
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
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your product inventory ({products.length} items)
          </p>
        </div>
        <button
          onClick={() => navigate("/products/add")}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-sm hover:shadow-md"
        >
          + Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
          >
            {/* Image with Overlay */}
            <div
              className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
              onClick={() => handleView(product.id)}
            >
              <img
                src={product.images?.[0] || "/placeholder-product.jpg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Discount Badge */}
              {product.discountInPercent > 0 && (
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg flex items-center gap-1">
                  <span>{product.discountInPercent}%</span>
                  <span className="text-xs">Saved</span>
                </div>
              )}

              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleView(product.id);
                  }}
                  className="bg-white text-gray-800 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg"
                >
                  Quick View
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Product Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-black transition-colors">
                {product.name}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                {product.subtitle}
              </p>

              {/* Category & Artisan Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md font-medium border border-purple-100">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  {product.Category?.name || "Uncategorized"}
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium border border-blue-100">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {product.Artisan?.name || "No Artisan"}
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                {product.discountInPercent > 0 ? (
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹
                        {calculateDiscountedPrice(
                          product.price,
                          product.discountInPercent,
                        ).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">
                      You save ₹
                      {(
                        product.price -
                        calculateDiscountedPrice(
                          product.price,
                          product.discountInPercent,
                        )
                      ).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  {product.quantityNote}
                </p>
              </div>

              {/* Stock Info */}
              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Stock:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded ${
                      product.defaultQuantity > 10
                        ? "bg-green-50 text-green-700"
                        : product.defaultQuantity > 0
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.defaultQuantity > 0
                      ? `${product.defaultQuantity} units`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="flex-1 px-3 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 px-3 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && <EmptyState />}
    </div>
  );
};

export default ViewItems;
