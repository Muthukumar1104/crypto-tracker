import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/coins/${id}`);
        setCoin(response.data);
      } catch (err) {
        setError("Failed to load coin details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg mt-8"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h1 className="text-3xl font-bold mb-4">
        {coin.name} ({coin.symbol.toUpperCase()})
      </h1>
      <p className="text-lg">
        <span className="font-semibold">Market Cap:</span> €
        {coin.market_data.market_cap.eur.toLocaleString()}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Hashing Algorithm:</span>{" "}
        {coin.hashing_algorithm || "N/A"}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Description:</span>{" "}
        {coin.description?.en || "No description available."}
      </p>
      <p className="text-lg">
        <span className="font-semibold">Homepage:</span>{" "}
        <a
          href={coin.links.homepage[0]}
          className="text-blue-400 underline"
          target="_blank"
          rel="noreferrer"
        >
          Visit Official Site
        </a>
      </p>
    </motion.div>
  );
};

export default CoinDetails;
