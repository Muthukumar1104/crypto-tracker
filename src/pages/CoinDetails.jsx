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
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/coins/${id}`
        );
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
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-lg text-gray-700 dark:text-gray-300">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mt-5 mb-5">
        <motion.div
          className="max-w-3xl w-full p-6 bg-white dark:bg-gray-800 text-black dark:text-gray-300 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-center text-blue-600 dark:text-yellow-400">
            {coin.name} ({coin.symbol.toUpperCase()})
          </h1>
          <p className="text-lg">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Market Cap:
            </span>{" "}
            €{coin.market_data.market_cap.eur.toLocaleString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Hashing Algorithm:
            </span>{" "}
            {coin.hashing_algorithm || "N/A"}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Description:
            </span>{" "}
            {coin.description?.en || "No description available."}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Homepage:
            </span>{" "}
            <a
              href={coin.links.homepage[0]}
              className="text-blue-500 dark:text-yellow-400 underline"
              target="_blank"
              rel="noreferrer"
            >
              Visit Official Site
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CoinDetails;
