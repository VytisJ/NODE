import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAd } from "../api/ads";
import AdForm from "../components/AdForm";

const EditAd = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchAd(id)
        .then((response) => setAd(response))
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }, 2000);
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!ad) {
    return <div>Ad not found</div>;
  }

  return <AdForm ad={ad} />;
};

export default EditAd;
