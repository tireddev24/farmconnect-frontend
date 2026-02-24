import React, { useState, useEffect, useMemo } from "react";
import { MOCK_PRODUCTS } from "../data/mockdata";
import { SearchX } from "lucide-react";

import { ProductCard } from "../components/productcard";
import { Header } from "../components/header";
import { Box } from "@chakra-ui/react";

const FarmConnect: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    isLoggedIn: boolean;
  } | null>(null);

  // Simulation of your localStorage auth logic
  useEffect(() => {
    const savedUser = localStorage.getItem("fc_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchesFilter = filter === "all" || p.category === filter;
      const matchesSearch = p.name.toLowerCase();
      // .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter]);

  return (
    <Box className="flex-1  flex-col" zIndex={50} marginTop={36}>
      {/* HEADER */}

      <Header
        title="FarmConnect"
        subtitle="Agricultural Marketplace"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        filter={filter}
        setFilter={setFilter}
      />

      <Box bg={"#1a1a1a"} mt={36} p={2} px={6}>
        <div className="px-4 lg:px-8 py-4 border-b border-gray-100 dark:border-dark-500/50">
          <div className="flex items-center gap-6 overflow-x-auto">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-gray-500 dark:text-gray-400">
                Live Market
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <i
                data-lucide="users"
                className="w-4 h-4 text-agri-500 dark:text-gold-400"
              ></i>
              <span className="text-gray-500 dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-200 font-medium">
                  2,847
                </span>{" "}
                Active Traders
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <i
                data-lucide="package"
                className="w-4 h-4 text-agri-500 dark:text-gold-400"
              ></i>
              <span className="text-gray-500 dark:text-gray-400">
                <span className="text-gray-900 dark:text-gray-200 font-medium">
                  15,234
                </span>{" "}
                Tons Traded
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <i
                data-lucide="clock"
                className="w-4 h-4 text-agri-500 dark:text-gold-400"
              ></i>
              <span className="text-gray-500 dark:text-gray-400">
                Updated{" "}
                <span className="text-gray-900 dark:text-gray-200">
                  just now
                </span>
              </span>
            </div>
          </div>
        </div>
      </Box>

      {/* <Box border={" 1px solid gray"} marginY={"4"} /> */}

      {/* PRODUCT GRID */}

      <Box className="">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <SearchX className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg text-gray-400">
              No products found matching "{searchQuery}"
            </h3>
          </div>
        )}
      </Box>
    </Box>
    // </div>
  );
};

export default FarmConnect;
