import React, { useState, useEffect } from "react";

import { ProductCard } from "../components/productcard";
import { Header } from "../components/header";
import { Box, Loader } from "@chakra-ui/react";
import MarketBar from "../components/marketbar";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/store";
import Unexpected from "error/unexpected";
import type { Product } from "types/types";

const FarmConnect: React.FC = () => {
  const navigate = useNavigate();

  const { products, fetchProducts } = useProductStore();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const data = async () => {
      try {
        await fetchProducts();

        // if ("res" in data && data.res === 401) {
        //   setError(true);
        // }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoad(false);
      }
    };

    // setTimeout(() => {
    data();
    // }, 700);
  }, []);

  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulation of your localStorage auth logic

  // Filter Logic
  // const filteredProducts = useMemo(() => {
  //   return MOCK_PRODUCTS.filter((p) => {
  //     const matchesFilter = filter === "all" || p.category === filter;
  //     const matchesSearch = p.name.toLowerCase();
  //     // .includes(searchQuery.toLowerCase());
  //     return matchesFilter && matchesSearch;
  //   });
  // }, [filter]);

  if (load) {
    return <Loader />;
  }

  // if (error) {
  //   return <Unexpected error={error} />;
  // }

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

      <MarketBar />

      {/* PRODUCT GRID */}

      <Box className="" m={2}>
        {products && products.totalCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
            {products.items.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                navigate={navigate}
              />
            ))}
          </div>
        ) : (
          <Box
            mt={44}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"full"}
          >
            {/* <SearchX className="w-16 h-16 mx-auto text-gray-600 mb-4" /> */}
            <h3 className="text-lg text-gray-400">No products found</h3>
          </Box>
        )}
      </Box>
    </Box>
    // </div>
  );
};

export default FarmConnect;
