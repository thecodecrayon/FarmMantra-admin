import { useEffect } from "react";
import { useState } from "react";
import { CATEGORY_URLS } from "../../api/url";

const useListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(CATEGORY_URLS.BASE);
      const parsedResponse = await response.json();

      if (!response.ok || !parsedResponse.status)
        throw new Error("Error: NETWORK ISSUE WITH CATEGORY LIST API!");

      const { data } = parsedResponse;
      setCategories(data);
    } catch (error) {
      console.log("ERROR: while loading categories", error);
      setError("ERROR: unable to load categories!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    isLoading,
    error,
    categories,
  };
};

export default useListCategories;
