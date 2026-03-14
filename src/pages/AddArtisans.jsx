import { useRef, useState } from "react";
import useAddArtisan from "../hooks/artisans/useAddArtisan";

const AddArtisans = () => {
  const { isLoading, error, createArtisan } = useAddArtisan();
  const [fieldError, setFieldError] = useState({
    name: "",
    location: "",
    image: "",
    tagline: "",
    description: "",
    numberOfArtisans: "",
    yearsActive: "",
    productsSold: "",
    impactPoints: "",
    badges: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [impactPoints, setImpactPoints] = useState([""]);
  const [badges, setBadges] = useState([""]);

  const nameRef = useRef(null);
  const locationRef = useRef(null);
  const imageRef = useRef(null);
  const taglineRef = useRef(null);
  const descriptionRef = useRef(null);
  const numberOfArtisansRef = useRef(null);
  const yearsActiveRef = useRef(null);
  const productsSoldRef = useRef(null);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setFieldError((prev) => ({
          ...prev,
          image: "Please select a valid image file!",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFieldError((prev) => ({
          ...prev,
          image: "Image size should not exceed 5MB!",
        }));
        return;
      }

      // Clear previous error
      setFieldError((prev) => ({
        ...prev,
        image: "",
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    imageRef.current.value = "";
  };

  // Impact Points handlers
  const addImpactPoint = () => {
    setImpactPoints([...impactPoints, ""]);
  };

  const removeImpactPoint = (index) => {
    setImpactPoints(impactPoints.filter((_, i) => i !== index));
  };

  const updateImpactPoint = (index, value) => {
    const updated = [...impactPoints];
    updated[index] = value;
    setImpactPoints(updated);
  };

  // Badges handlers
  const addBadge = () => {
    setBadges([...badges, ""]);
  };

  const removeBadge = (index) => {
    setBadges(badges.filter((_, i) => i !== index));
  };

  const updateBadge = (index, value) => {
    const updated = [...badges];
    updated[index] = value;
    setBadges(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setFieldError({
      name: "",
      location: "",
      image: "",
      tagline: "",
      description: "",
      numberOfArtisans: "",
      yearsActive: "",
      productsSold: "",
      impactPoints: "",
      badges: "",
    });

    const name = nameRef.current.value;
    const location = locationRef.current.value;
    const tagline = taglineRef.current.value;
    const description = descriptionRef.current.value;
    const numberOfArtisans = numberOfArtisansRef.current.value;
    const yearsActive = yearsActiveRef.current.value;
    const productsSold = productsSoldRef.current.value;
    const imageFile = imageRef.current.files[0];

    // Validation
    let hasError = false;

    if (!name) {
      setFieldError((prev) => ({
        ...prev,
        name: "Artisan/Collective name is required!",
      }));
      hasError = true;
    }

    if (!location) {
      setFieldError((prev) => ({
        ...prev,
        location: "Location is required!",
      }));
      hasError = true;
    }

    if (!imageFile) {
      setFieldError((prev) => ({
        ...prev,
        image: "Artisan image is required!",
      }));
      hasError = true;
    }

    if (!tagline) {
      setFieldError((prev) => ({
        ...prev,
        tagline: "Tagline is required!",
      }));
      hasError = true;
    }

    if (!description) {
      setFieldError((prev) => ({
        ...prev,
        description: "Description is required!",
      }));
      hasError = true;
    }

    if (hasError) {
      console.log("Validation errors present!");
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      const payload = {
        name,
        location,
        image: base64String,
        tagline,
        description,
        numberOfArtisans: numberOfArtisans ? Number(numberOfArtisans) : null,
        yearsActive: yearsActive ? Number(yearsActive) : null,
        productsSold: Number(productsSold) || null,
        impactPoints: impactPoints.filter((p) => p.trim() !== ""),
        badges: badges.filter((b) => b.trim() !== ""),
      };

      createArtisan(payload);
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Artisans</h1>
        <p className="text-gray-600 mt-1">Create and manage artisan profiles</p>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add New Artisan/Collective
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Artisan/Collective Name
                </label>
                <input
                  type="text"
                  ref={nameRef}
                  placeholder="e.g., Priya's Craft Collective"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
                {fieldError.name && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {fieldError.name}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  ref={locationRef}
                  placeholder="e.g., Jaipur, Rajasthan"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
                {fieldError.location && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {fieldError.location}
                  </p>
                )}
              </div>

              {/* Tagline */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tagline
                </label>
                <input
                  type="text"
                  ref={taglineRef}
                  placeholder="e.g., A women's collective creating sustainable livelihoods..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
                {fieldError.tagline && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {fieldError.tagline}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  ref={descriptionRef}
                  placeholder="Brief description about the artisan or collective..."
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none transition"
                />
                {fieldError.description && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {fieldError.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Artisan Image */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Artisan Image
            </h3>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Image (Artisan at work)
              </label>
              <input
                type="file"
                ref={imageRef}
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition"
              />
              {fieldError.image && (
                <p className="text-red-500 text-sm mt-1.5">
                  {fieldError.image}
                </p>
              )}

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Image Preview
                  </p>
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-64 h-48 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition shadow-md"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Number of Artisans */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Number of Artisans
                </label>
                <input
                  type="number"
                  ref={numberOfArtisansRef}
                  placeholder="45"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
              </div>

              {/* Years Active */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Years Active
                </label>
                <input
                  type="number"
                  ref={yearsActiveRef}
                  placeholder="6"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
              </div>

              {/* Products Sold */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Products Sold
                </label>
                <input
                  type="number"
                  ref={productsSoldRef}
                  placeholder="15000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Purchase Impact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Your Purchase Impact
            </h3>
            <div className="space-y-3">
              {impactPoints.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updateImpactPoint(index, e.target.value)}
                    placeholder="e.g., Provides fair wages to women artisans in rural India"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                  />
                  {impactPoints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImpactPoint(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImpactPoint}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                + Add Impact Point
              </button>
            </div>
          </div>

          {/* Badges/Certifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Badges/Certifications
            </h3>
            <div className="space-y-3">
              {badges.map((badge, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => updateBadge(index, e.target.value)}
                    placeholder="e.g., Fair Trade Certified"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                  />
                  {badges.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBadge(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addBadge}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                + Add Badge
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-sm"
            >
              {isLoading ? "Adding..." : "Add Artisan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArtisans;
