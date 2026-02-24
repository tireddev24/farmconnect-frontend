import { useEffect, useMemo, useState } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  Search,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

import { products, type Product } from "../data/products";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Dark Mode Init
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === "all" || p.category === filter;

      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, filter]);

  const renderTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="text-red-500 w-4 h-4" />;
    if (trend === "down")
      return <TrendingDown className="text-green-500 w-4 h-4" />;
    return <Minus className="text-gray-400 w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
      {/* NAVBAR */}
      <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">FarmConnect</h1>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme}>
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700 dark:text-white" />
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
            )}
          </button>
        </div>
      </header>

      {/* SEARCH & FILTER */}
      <section className="p-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="tubers">Tubers</option>
          <option value="grains">Grains</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="oils">Oils & Cash Crops</option>
        </select>
      </section>

      {/* PRODUCTS GRID */}
      <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:scale-105 transition"
          >
            <div className="text-4xl">{product.icon}</div>

            <h2 className="text-lg font-semibold mt-2 dark:text-white">
              {product.name}
            </h2>

            <p className="text-gray-500 text-sm">{product.location}</p>

            <p className="text-green-600 font-bold mt-2">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="text-sm text-gray-500">{product.unit}</p>

            <div className="flex items-center gap-2 mt-2">
              {renderTrendIcon(product.trend)}
              <span className="text-sm capitalize text-gray-400">
                {product.trend}
              </span>
            </div>

            <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
