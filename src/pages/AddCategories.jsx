import { useRef, useState } from "react";
import useAddCategory from "../hooks/categories/useAddCategory";

const AddCategories = () => {
  const { isLoading, createCategory } = useAddCategory();
  const [fieldError, setFieldError] = useState({
    name: "",
    image: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);

  // FUNTION THAT HANDLES IMAGE CONVERSION TO BASE64 URL;
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // VALIDATING FILE TYPE;
      if (!file.type.startsWith("image/")) {
        setFieldError((prev) => ({
          ...prev,
          image: "Please select a valid image file!",
        }));
        return;
      }

      // VALIDATING FILE SIZE (MAX. 5MB);
      if (file.size > 5 * 1024 * 1024) {
        setFieldError((prev) => ({
          ...prev,
          image: "Image size should not exceed 5MB!",
        }));
        return;
      }

      //CLEAR PREVIOUS ERRORS;
      setFieldError((prev) => ({
        ...prev,
        image: "",
      }));

      // CREATE PREVIEW;
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // RESET ERRORS;
    setFieldError({
      name: "",
      image: "",
      description: "",
      totalItems: "",
    });

    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const imageFile = imageRef.current.files[0];

    // VALIDATION;
    let hasError = false;

    if (!name) {
      setFieldError((prev) => ({
        ...prev,
        name: "Category name is required!",
      }));
      hasError = true;
    }

    if (!imageFile) {
      setFieldError((prev) => ({
        ...prev,
        image: "Category image is required!",
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

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      const payload = {
        name,
        image: base64String,
        description,
      };

      createCategory(payload);
    };

    reader.readAsDataURL(imageFile);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    imageRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <p className="text-gray-600 mt-1">Create and manage your categories</p>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Create New Category
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                ref={nameRef}
                placeholder="Enter category name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
              {fieldError.name && (
                <p className="text-red-500 text-sm mt-1.5">{fieldError.name}</p>
              )}
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              ref={descriptionRef}
              placeholder="Enter category description"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none transition"
            />
            {fieldError.description && (
              <p className="text-red-500 text-sm mt-1.5">
                {fieldError.description}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <input
              type="file"
              ref={imageRef}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition"
            />
            {fieldError.image && (
              <p className="text-red-500 text-sm mt-1.5">{fieldError.image}</p>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </p>
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
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

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium shadow-sm"
            >
              {isLoading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategories;
