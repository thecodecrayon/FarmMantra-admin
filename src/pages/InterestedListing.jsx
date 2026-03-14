import { useState, useEffect } from "react";

const LoadingState = () => {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-9 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 space-y-3">
              <div className="flex justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InterestedListing = () => {
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, new, contacted, resolved

  // Dummy data (replace with API call later)
  useEffect(() => {
    setTimeout(() => {
      setQueries([
        {
          id: 1,
          name: "Priya Sharma",
          email: "priya.sharma@example.com",
          phone: "+91 9876543210",
          message:
            "I'm interested in bulk ordering these candles for my wedding. Can you provide customization options?",
          product: {
            id: 101,
            name: "Mint Meadow Candles",
            image: "https://via.placeholder.com/60",
          },
          status: "new",
          createdAt: "2024-02-14T10:30:00",
        },
        {
          id: 2,
          name: "Rahul Kumar",
          email: null,
          phone: "+91 9123456789",
          message:
            "What is the delivery time for Jaipur? Also, do you have gift wrapping available?",
          product: {
            id: 102,
            name: "Handwoven Textile Cushions",
            image: "https://via.placeholder.com/60",
          },
          status: "contacted",
          createdAt: "2024-02-13T15:45:00",
        },
        {
          id: 3,
          name: "Anjali Verma",
          email: "anjali.v@example.com",
          phone: "+91 9988776655",
          message:
            "I loved the pottery items! Can I visit the artisan workshop? I'm planning a trip to Khurja next month.",
          product: {
            id: 103,
            name: "Traditional Pottery Set",
            image: "https://via.placeholder.com/60",
          },
          status: "new",
          createdAt: "2024-02-13T09:20:00",
        },
        {
          id: 4,
          name: "Vikram Singh",
          email: "vikram.singh@example.com",
          phone: "+91 9876512345",
          message:
            "Are these products available for corporate gifting? I need around 50 units.",
          product: {
            id: 104,
            name: "Artisan Gift Box Collection",
            image: "https://via.placeholder.com/60",
          },
          status: "resolved",
          createdAt: "2024-02-12T14:10:00",
        },
        {
          id: 5,
          name: "Meera Nair",
          email: "meera.nair@example.com",
          phone: "+91 9345678901",
          message:
            "I want to know more about the artisan behind this product. Do you have a story or video I can share?",
          product: {
            id: 105,
            name: "Handcrafted Jewelry Box",
            image: "https://via.placeholder.com/60",
          },
          status: "contacted",
          createdAt: "2024-02-12T11:30:00",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "contacted":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "new":
        return "New";
      case "contacted":
        return "Contacted";
      case "resolved":
        return "Resolved";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleStatusChange = (id, newStatus) => {
    setQueries(
      queries.map((q) => (q.id === id ? { ...q, status: newStatus } : q)),
    );
    console.log(`Status changed for query ${id} to ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      setQueries(queries.filter((q) => q.id !== id));
      console.log(`Deleted query ${id}`);
    }
  };

  const filteredQueries =
    filter === "all" ? queries : queries.filter((q) => q.status === filter);

  const stats = {
    total: queries.length,
    new: queries.filter((q) => q.status === "new").length,
    contacted: queries.filter((q) => q.status === "contacted").length,
    resolved: queries.filter((q) => q.status === "resolved").length,
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            User Interest Queries
          </h1>
          <p className="text-gray-600 mt-1">
            Manage customer inquiries and interest requests
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">Total Queries</p>
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">New</p>
          <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">Contacted</p>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.contacted}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">Resolved</p>
          <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 px-4 py-3 font-medium transition ${
              filter === "all"
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter("new")}
            className={`flex-1 px-4 py-3 font-medium transition ${
              filter === "new"
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            New ({stats.new})
          </button>
          <button
            onClick={() => setFilter("contacted")}
            className={`flex-1 px-4 py-3 font-medium transition ${
              filter === "contacted"
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Contacted ({stats.contacted})
          </button>
          <button
            onClick={() => setFilter("resolved")}
            className={`flex-1 px-4 py-3 font-medium transition ${
              filter === "resolved"
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Resolved ({stats.resolved})
          </button>
        </div>

        {/* Queries List */}
        {filteredQueries.length > 0 ? (
          <div className="divide-y">
            {filteredQueries.map((query) => (
              <div key={query.id} className="p-5 hover:bg-gray-50 transition">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={query.product.image}
                      alt={query.product.name}
                      className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {query.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(query.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          query.status,
                        )}`}
                      >
                        {getStatusLabel(query.status)}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {query.phone}
                      </div>
                      {query.email && (
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {query.email}
                        </div>
                      )}
                    </div>

                    {/* Product */}
                    <div className="mb-2">
                      <span className="text-xs font-medium text-gray-500">
                        Product:
                      </span>
                      <span className="text-sm text-gray-700 ml-1">
                        {query.product.name}
                      </span>
                    </div>

                    {/* Message */}
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm mb-3">
                      {query.message}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {query.status === "new" && (
                        <button
                          onClick={() =>
                            handleStatusChange(query.id, "contacted")
                          }
                          className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition font-medium text-sm"
                        >
                          Mark as Contacted
                        </button>
                      )}
                      {query.status === "contacted" && (
                        <button
                          onClick={() =>
                            handleStatusChange(query.id, "resolved")
                          }
                          className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium text-sm"
                        >
                          Mark as Resolved
                        </button>
                      )}
                      {query.status === "resolved" && (
                        <button
                          onClick={() => handleStatusChange(query.id, "new")}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-sm"
                        >
                          Reopen
                        </button>
                      )}

                      <a
                        href={`tel:${query.phone}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                      >
                        Call
                      </a>
                      {query.email && (
                        <a
                          href={`mailto:${query.email}`}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                        >
                          Email
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(query.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm ml-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
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
              No queries found
            </h3>
            <p className="text-gray-600">
              {filter === "all"
                ? "No customer queries yet"
                : `No ${filter} queries at the moment`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestedListing;
