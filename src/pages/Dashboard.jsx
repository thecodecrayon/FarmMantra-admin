import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fake data for marketplace model
  const stats = {
    totalProducts: 245,
    totalCategories: 12,
    totalArtisans: 34,
    totalInquiries: 487, // Instead of orders
    activeListings: 218, // Products currently available
    lowStockProducts: 8,
    totalViews: 12450, // Product page views
    recentInquiries: [
      {
        id: 1234,
        productName: "Handwoven Basket Set",
        buyerName: "Rahul Sharma",
        artisanName: "Lakshmi Crafts",
        date: "2 hours ago",
        status: "pending", // pending, contacted, completed
      },
      {
        id: 1233,
        productName: "Organic Honey 500g",
        buyerName: "Priya Patel",
        artisanName: "Sundar Farms",
        date: "5 hours ago",
        status: "contacted",
      },
      {
        id: 1232,
        productName: "Clay Pottery Set",
        buyerName: "Amit Kumar",
        artisanName: "Vishwakarma Pottery",
        date: "1 day ago",
        status: "completed",
      },
      {
        id: 1231,
        productName: "Handmade Candles",
        buyerName: "Sneha Reddy",
        artisanName: "Diya Creations",
        date: "1 day ago",
        status: "pending",
      },
      {
        id: 1230,
        productName: "Traditional Wall Hanging",
        buyerName: "Vijay Singh",
        artisanName: "Heritage Handicrafts",
        date: "2 days ago",
        status: "contacted",
      },
    ],
    mostViewedProducts: [
      {
        id: 1,
        name: "Handwoven Basket Set",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        views: 342,
        inquiries: 28,
        artisan: "Lakshmi Crafts",
      },
      {
        id: 2,
        name: "Artisan Clay Pottery",
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400",
        views: 298,
        inquiries: 21,
        artisan: "Vishwakarma Pottery",
      },
      {
        id: 3,
        name: "Scented Soy Candles",
        image:
          "https://images.unsplash.com/photo-1602874801007-2c0686e6c4f8?w=400",
        views: 276,
        inquiries: 19,
        artisan: "Diya Creations",
      },
      {
        id: 4,
        name: "Traditional Wall Hanging",
        image:
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400",
        views: 254,
        inquiries: 17,
        artisan: "Heritage Handicrafts",
      },
    ],
    topCategories: [
      {
        id: 1,
        name: "Diyas & Candles",
        productCount: 45,
        inquiries: 127,
        percentage: 90,
      },
      {
        id: 2,
        name: "Home Furnishing",
        productCount: 38,
        inquiries: 98,
        percentage: 75,
      },
      {
        id: 3,
        name: "Handlooms",
        productCount: 32,
        inquiries: 85,
        percentage: 65,
      },
      {
        id: 4,
        name: "Bakery Items",
        productCount: 28,
        inquiries: 67,
        percentage: 55,
      },
      {
        id: 5,
        name: "Incense Sticks",
        productCount: 22,
        inquiries: 54,
        percentage: 45,
      },
    ],
    topArtisans: [
      {
        id: 1,
        name: "Lakshmi Crafts",
        totalProducts: 12,
        totalInquiries: 45,
        rating: 4.8,
      },
      {
        id: 2,
        name: "Vishwakarma Pottery",
        totalProducts: 8,
        totalInquiries: 38,
        rating: 4.7,
      },
      {
        id: 3,
        name: "Sundar Farms",
        totalProducts: 15,
        totalInquiries: 34,
        rating: 4.9,
      },
      {
        id: 4,
        name: "Diya Creations",
        totalProducts: 10,
        totalInquiries: 29,
        rating: 4.6,
      },
    ],
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's your marketplace overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <svg
                className="w-8 h-8"
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
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              +12%
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.activeListings}</h3>
          <p className="text-blue-100 text-sm">Active Listings</p>
          <p className="text-blue-200 text-xs mt-1">
            {stats.totalProducts} total products
          </p>
        </div>

        {/* Total Inquiries */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              +18%
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.totalInquiries}</h3>
          <p className="text-purple-100 text-sm">Total Inquiries</p>
          <p className="text-purple-200 text-xs mt-1">
            Buyer interest requests
          </p>
        </div>

        {/* Total Artisans */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              +8%
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.totalArtisans}</h3>
          <p className="text-green-100 text-sm">Total Artisans</p>
          <p className="text-green-200 text-xs mt-1">
            Active sellers on platform
          </p>
        </div>

        {/* Total Views */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              +24%
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">
            {stats.totalViews.toLocaleString()}
          </h3>
          <p className="text-orange-100 text-sm">Product Views</p>
          <p className="text-orange-200 text-xs mt-1">This month</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Recent Inquiries
            </h2>
            <button
              onClick={() => navigate("/inquiries")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {stats.recentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {inquiry.productName}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">{inquiry.buyerName}</span> →{" "}
                      {inquiry.artisanName}
                    </p>
                    <p className="text-xs text-gray-500">{inquiry.date}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      inquiry.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : inquiry.status === "contacted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Categories */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Top Categories
          </h2>

          <div className="space-y-4">
            {stats.topCategories.map((category, index) => (
              <div key={category.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate text-sm">
                    {category.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      {category.inquiries} inq
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Viewed Products */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Most Viewed Products
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.mostViewedProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-gray-800 text-sm truncate mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2 truncate">
                by {product.artisan}
              </p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>{product.views}</span>
                </div>
                <div className="flex items-center gap-1 text-purple-600 font-medium">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>{product.inquiries}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Artisans */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Top Performing Artisans
          </h2>
          <button
            onClick={() => navigate("/artisans")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.topArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/artisans/${artisan.id}`)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {artisan.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">
                    {artisan.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs text-gray-600">
                      {artisan.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Products:</span>
                  <span className="font-semibold text-gray-800">
                    {artisan.totalProducts}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Inquiries:</span>
                  <span className="font-semibold text-green-600">
                    {artisan.totalInquiries}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/products/add")}
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-left transition"
          >
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="font-medium">Add Product</p>
          </button>

          <button
            onClick={() => navigate("/categories/add")}
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-left transition"
          >
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <p className="font-medium">Add Category</p>
          </button>

          <button
            onClick={() => navigate("/artisans/add")}
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-left transition"
          >
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <p className="font-medium">Add Artisan</p>
          </button>

          <button
            onClick={() => navigate("/inquiries")}
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-left transition"
          >
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="font-medium">View Inquiries</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
