import { useState, useEffect } from "react";
import { ARTISAN_URLS } from "../../api/url";

const useListArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadArtisans = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(ARTISAN_URLS.BASE);

      const parsedResponse = await response.json();

      if (!response.ok || !parsedResponse.status)
        throw new Error("API ERROR: some issue with network request!");

      const { data } = parsedResponse;
      setArtisans(data);
    } catch (error) {
      console.error("Error: while fetchin the list of artisans", error);
      setError("ERROR: unable to fetch the list of artisans!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArtisans();
  }, []);

  return {
    isLoading,
    error,
    artisans,
  };
};

export default useListArtisans;
