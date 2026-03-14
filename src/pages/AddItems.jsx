import { useRef, useState } from "react";
import useAddProduct from "../hooks/products/useAddProduct";

const AddItems = () => {
  const { isLoading, error, options, addProduct } = useAddProduct();
  const [fieldError, setFieldError] = useState({
    name: "",
    subtitle: "",
    description: "",
    price: "",
    discountInPercent: "",
    categoryId: "",
    defaultQuantity: "",
    quantityNote: "",
    images: "",
    keyFeatures: "",
    artisanId: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [keyFeatures, setKeyFeatures] = useState([""]);

  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const discountInPercentRef = useRef(null);
  const categoryIdRef = useRef(null);
  const defaultQuantityRef = useRef(null);
  const quantityNoteRef = useRef(null);
  const imagesRef = useRef(null);
  const artisanIdRef = useRef(null);

  // Handle multiple images
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length < 2) {
      setFieldError((prev) => ({
        ...prev,
        images: "Minimum 2 images required!",
      }));
      setImagePreviews([]);
      return;
    }

    if (files.length > 4) {
      setFieldError((prev) => ({
        ...prev,
        images: "Maximum 4 images allowed!",
      }));
      setImagePreviews([]);
      return;
    }

    // Validate all files are images
    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/"),
    );
    if (invalidFiles.length > 0) {
      setFieldError((prev) => ({
        ...prev,
        images: "All files must be images!",
      }));
      setImagePreviews([]);
      return;
    }

    setFieldError((prev) => ({
      ...prev,
      images: "",
    }));

    const previews = [];
    let loadedCount = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        loadedCount++;
        if (loadedCount === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);

    if (newPreviews.length < 2) {
      setFieldError((prev) => ({
        ...prev,
        images: "Minimum 2 images required!",
      }));
    }
  };

  // Dynamic field handlers
  const addKeyFeature = () => {
    setKeyFeatures([...keyFeatures, ""]);
  };

  const removeKeyFeature = (index) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  const updateKeyFeature = (index, value) => {
    const updated = [...keyFeatures];
    updated[index] = value;
    setKeyFeatures(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setFieldError({
      name: "",
      subtitle: "",
      description: "",
      price: "",
      discountInPercent: "",
      categoryId: "",
      defaultQuantity: "",
      quantityNote: "",
      images: "",
      keyFeatures: "",
      artisanId: "",
    });

    const name = nameRef.current.value;
    const subtitle = subtitleRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const discountInPercent = discountInPercentRef.current.value;
    const categoryId = categoryIdRef.current.value;
    const defaultQuantity = defaultQuantityRef.current.value;
    const quantityNote = quantityNoteRef.current.value;
    const artisanId = artisanIdRef.current.value;

    // Validation
    let hasError = false;

    if (!name) {
      setFieldError((prev) => ({ ...prev, name: "Product name is required!" }));
      hasError = true;
    }

    if (!subtitle) {
      setFieldError((prev) => ({
        ...prev,
        subtitle: "Subtitle is required!",
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

    if (!price) {
      setFieldError((prev) => ({ ...prev, price: "Price is required!" }));
      hasError = true;
    }

    if (!categoryId) {
      setFieldError((prev) => ({
        ...prev,
        categoryId: "Category is required!",
      }));
      hasError = true;
    }

    if (!artisanId) {
      setFieldError((prev) => ({ ...prev, artisanId: "Artisan is required!" }));
      hasError = true;
    }

    if (imagePreviews.length < 2) {
      setFieldError((prev) => ({
        ...prev,
        images: "Minimum 2 images required!",
      }));
      hasError = true;
    }

    if (imagePreviews.length > 4) {
      setFieldError((prev) => ({
        ...prev,
        images: "Maximum 4 images allowed!",
      }));
      hasError = true;
    }

    if (hasError) {
      console.log("Validation errors present!");
      return;
    }

    const payload = {
      name,
      subtitle,
      description,
      price: Number(price),
      discountInPercent: discountInPercent ? Number(discountInPercent) : null,
      categoryId: Number(categoryId),
      defaultQuantity: defaultQuantity ? Number(defaultQuantity) : 1,
      quantityNote: quantityNote || null,
      images: imagePreviews,
      artisanId: Number(artisanId),
      keyFeatures: keyFeatures.filter((f) => f.trim() !== ""),
    };

    addProduct(payload);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Add New Item</h1>
        <p className="text-gray-600 mt-1">Create a new product listing</p>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  ref={nameRef}
                  placeholder="e.g., Mint Meadow"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
                {fieldError.name && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {fieldError.name}
                  </p>
                )}
              </div>

              {/* Subtitle */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Subtitle
                </label>
                <input
                  type="text"
                  ref={subtitleRef}
                  placeholder="e.g., Handcrafted Scented Candles"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
                {fieldError.subtitle && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {fieldError.subtitle}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  ref={categoryIdRef}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                >
                  <option value="">Select category</option>
                  {options.categories?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {fieldError.categoryId && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {fieldError.categoryId}
                  </p>
                )}
              </div>

              {/* Artisan */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Artisan
                </label>
                <select
                  ref={artisanIdRef}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                >
                  <option value="">Select artisan</option>
                  {options.artisans.map((artisan) => (
                    <option key={artisan.id} value={artisan.id}>
                      {artisan.name}
                    </option>
                  ))}
                </select>
                {fieldError.artisanId && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {fieldError.artisanId}
                  </p>
                )}
              </div>

              {/* Quantity Note */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Quantity Note
                </label>
                <input
                  type="text"
                  ref={quantityNoteRef}
                  placeholder="e.g., Pack of 6 pcs."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Default Quantity
                </label>
                <input
                  type="number"
                  ref={defaultQuantityRef}
                  placeholder="1"
                  min="1"
                  defaultValue="1"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <input
                  type="number"
                  ref={priceRef}
                  placeholder="200"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
                {fieldError.price && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {fieldError.price}
                  </p>
                )}
              </div>

              {/* Discount In Percent */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Discount In Percent (%)
                </label>
                <input
                  type="number"
                  ref={discountInPercentRef}
                  placeholder="5 (don't include % sign)"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  ref={descriptionRef}
                  placeholder="Describe the product..."
                  rows="5"
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

          {/* Product Images */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Product Images
            </h2>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Images (Min 2, Max 4)
              </label>
              <input
                type="file"
                ref={imagesRef}
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition"
              />
              {fieldError.images && (
                <p className="text-red-500 text-sm mt-1.5">
                  {fieldError.images}
                </p>
              )}

              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Image Previews ({imagePreviews.length}/4)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition shadow-md text-lg leading-none"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Key Features
            </h2>
            <div className="space-y-3">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateKeyFeature(index, e.target.value)}
                    placeholder="e.g., 100% Natural Soy Wax"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                  />
                  {keyFeatures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeKeyFeature(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addKeyFeature}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                + Add Feature
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-sm"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
