import LoadingState from "../components/artisan/Loading";
import useListArtisans from "../hooks/artisans/useListArtisans";
import ErrorState from "../components/Error";
import { useNavigate } from "react-router-dom";

const ViewArtisans = () => {
  const navigate = useNavigate();
  const { error, isLoading, artisans } = useListArtisans();

  const handleEdit = (id) => {
    console.log("Edit artisan:", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = (id) => {
    console.log("Delete artisan:", id);
    // Show confirmation and delete
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K+";
    }
    return num;
  };

  if (error) {
    return <ErrorState />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Artisans</h1>
          <p className="text-gray-600 mt-1">
            Manage artisan profiles and collectives
          </p>
        </div>
        <button
          onClick={() => navigate("/artisans/add")}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-sm"
        >
          + Add Artisan
        </button>
      </div>

      {/* Artisans Grid */}
      {artisans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden bg-gray-200">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Header */}
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {artisan.name}
                </h3>
                <p className="text-sm text-gray-500 flex items-center mb-2">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {artisan.location}
                </p>
                <p className="text-sm text-gray-600 italic mb-3">
                  {artisan.tagline}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {artisan.description}
                </p>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center bg-gray-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-gray-800">
                      {artisan.numberOfArtisans}
                    </p>
                    <p className="text-xs text-gray-500">Artisans</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-gray-800">
                      {artisan.yearsActive}+
                    </p>
                    <p className="text-xs text-gray-500">Years</p>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-gray-800">
                      {formatNumber(artisan.productsSold)}
                    </p>
                    <p className="text-xs text-gray-500">Sold</p>
                  </div>
                </div>

                {/* Impact Points */}
                {artisan.impactPoints && artisan.impactPoints.length > 0 && (
                  <div className="mb-4 space-y-1.5">
                    <p className="text-xs font-semibold text-gray-700 uppercase">
                      Impact:
                    </p>
                    {artisan.impactPoints.slice(0, 2).map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start text-xs text-gray-600"
                      >
                        <span className="text-green-600 mr-1.5 mt-0.5">✓</span>
                        <span className="line-clamp-1">{point}</span>
                      </div>
                    ))}
                    {artisan.impactPoints.length > 2 && (
                      <p className="text-xs text-gray-500 ml-5">
                        +{artisan.impactPoints.length - 2} more
                      </p>
                    )}
                  </div>
                )}

                {/* Badges */}
                {artisan.badges && artisan.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {artisan.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(artisan.id)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(artisan.id)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No artisans yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by adding your first artisan profile
          </p>
          <button
            onClick={() => (window.location.href = "/artisans/add")}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
          >
            + Add Artisan
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewArtisans;
