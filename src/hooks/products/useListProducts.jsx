import { useEffect } from "react";
import { useState } from "react";
import { PRODUCT_URLS } from "../../api/url";

const useListProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(PRODUCT_URLS.BASE);
      const parsedResponse = await response.json();

      if (!response.ok || !parsedResponse.status)
        throw new Error("Error: NETWORK ISSUE WITH PRODUCT LIST API!");

      const { data } = parsedResponse;
      setProducts(data);
    } catch (error) {
      console.log("ERROR: while loading products", error);
      setError("ERROR: unable to load products!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    isLoading,
    error,
    products,
  };
};

export default useListProduct;
