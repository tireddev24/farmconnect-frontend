import React, { useState, useMemo, useEffect } from "react";
import { MOCK_PRODUCTS } from "../data/mockdata";
import { SearchX } from "lucide-react";

import { ProductCard } from "../components/productcard";
import { Header } from "../components/header";
import { Box, Loader } from "@chakra-ui/react";
import MarketBar from "../components/marketbar";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/store";

const FarmConnect: React.FC = () => {
  const navigate = useNavigate();

  const { products, fetchProducts } = useProductStore();
  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    const data = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.log(error);
        // setError(true);
      } finally {
        setLoad(false);
      }
    };
    data();
  }, []);

  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulation of your localStorage auth logic

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchesFilter = filter === "all" || p.category === filter;
      const matchesSearch = p.name.toLowerCase();
      // .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter]);

  if (load) {
    return <Loader />;
  }

  return (
    <Box className="flex-1  flex-col" zIndex={50}>
      {/* HEADER */}

      <Header
        title="FarmConnect"
        subtitle="Agricultural Marketplace"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user!}
        filter={filter}
        setFilter={setFilter}
      />

      {products}

      <MarketBar />

      {/* PRODUCT GRID */}

      <Box className="" m={2}>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                navigate={navigate}
              />
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
