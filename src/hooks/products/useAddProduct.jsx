import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_URLS } from "../../api/url";

const useAddProduct = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    categories: [],
    artisans: [],
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addProduct = async (payload) => {
    try {
      setIsLoading(true);

      const response = await fetch(PRODUCT_URLS.BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const parsedResponse = await response.json();

      if (!response.ok || !parsedResponse.status)
        throw new Error("Error: API error while creating new product!");

      navigate("/items/list");
    } catch (error) {
      console.log("Error: While creating new product", error);
      setError("Error: Unable to create new product!");
    } finally {
      setIsLoading(false);
    }
  };

  const loadOptions = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(PRODUCT_URLS.OPTIONS);

      const parsedResponse = await response.json();

      if (!response.ok || !parsedResponse.status)
        throw new Error("Error: API error while loading product options");

      const { data } = parsedResponse;
      setOptions(data);
    } catch (error) {
      console.log("Error: While loading product options", error);
      setError("Error: Unable to load product options!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  return {
    error,
    isLoading,
    options,
    addProduct,
  };
};

export default useAddProduct;
