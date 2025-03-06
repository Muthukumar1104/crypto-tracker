import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoins,
  toggleFavorite,
  reorderCoins,
} from "../redux/slices/cryptoSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Confetti from "react-confetti";
import DarkModeToggle from "../components/DarkModeToggle";

const HomePage = () => {
  const dispatch = useDispatch();
  const { coins, loading, error, favorites } = useSelector(
    (state) => state.crypto
  );

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const reorderedCoins = Array.from(coins);
    const [movedCoin] = reorderedCoins.splice(result.source.index, 1); // Remove the item from the old position
    reorderedCoins.splice(result.destination.index, 0, movedCoin); // Insert it into the new position

    dispatch(reorderCoins(reorderedCoins)); // Updates Redux state
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Top 10 Cryptocurrencies</h1>
        <DarkModeToggle />
      </div>
      {favorites.length > 0 && (
        <Confetti numberOfPieces={200} recycle={false} />
      )}{" "}
      {/* Confetti animation when a coin is favorited */}
      {loading ? (
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
          <ul className="space-y-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index} className="p-4 bg-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton circle width={48} height={48} />
                  <div>
                    <Skeleton width={150} height={20} />
                    <Skeleton width={100} height={15} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SkeletonTheme>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="coins">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {coins.map((coin, index) => (
                  <Draggable key={coin.id} draggableId={coin.id} index={index}>
                    {(provided) => (
                      <motion.li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={`/coin/${coin.id}`}
                          className="flex items-center space-x-4"
                        >
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h2 className="text-xl font-semibold">
                              {coin.name}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              €{coin.current_price.toLocaleString()}
                            </p>
                          </div>
                        </Link>
                        <button
                          className={`p-2 rounded-full ${
                            favorites.includes(coin.id)
                              ? "bg-yellow-500"
                              : "bg-gray-300 dark:bg-gray-700"
                          }`}
                          onClick={() => dispatch(toggleFavorite(coin.id))}
                        >
                          ⭐
                        </button>
                      </motion.li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default HomePage;
