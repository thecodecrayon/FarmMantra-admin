import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORY_URLS } from "../../api/url";

const useAddCategory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCategory = async (payload) => {
    try {
      setIsLoading(true);

      const response = await fetch(CATEGORY_URLS.BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const parsedResponse = await response.json();

      if (!response.ok || !parsedResponse.status)
        throw new Error("API ERROR: some issue with network request!");

      navigate("/categories/list");
    } catch (error) {
      console.error("Error: while creating category", error);
      setError("ERROR: unable to create a new category!");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createCategory,
  };
};

export default useAddCategory;
