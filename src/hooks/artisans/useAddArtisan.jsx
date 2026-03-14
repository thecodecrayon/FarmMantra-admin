import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ARTISAN_URLS, AUTH_URLS } from "../../api/url";

const useAddArtisan = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createArtisan = async (payload) => {
    try {
      setIsLoading(true);

      const response = await fetch(ARTISAN_URLS.BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const parsedResponse = await response.json();

      if (!response.ok || !parsedResponse.status)
        throw new Error("API ERROR: some issue with network request!");

      navigate("/artisans/list");
    } catch (error) {
      console.error("Error: while creating artisan", error);
      setError("ERROR: unable to create a new artisan!");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createArtisan,
  };
};

export default useAddArtisan;
