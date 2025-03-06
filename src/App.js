import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinDetails from "./pages/CoinDetails";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
