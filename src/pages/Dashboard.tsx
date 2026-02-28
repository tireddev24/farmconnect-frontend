import React, { useState, useEffect, useMemo } from "react";
import { MOCK_PRODUCTS } from "../data/mockdata";
import { SearchX } from "lucide-react";

import { ProductCard } from "../components/productcard";
import { Header } from "../components/header";
import { Box } from "@chakra-ui/react";
import MarketBar from "../components/marketbar";

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
    <Box className="flex-1  flex-col" zIndex={50}>
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

      <MarketBar />

      {/* PRODUCT GRID */}

      <Box className="" m={2}>
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
