import { useState, useEffect } from "react";

import { ProductCard } from "@/components/productcard";
import { Header } from "@/components/header";
import { Box, SimpleGrid } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useAuthStore, useProductStore } from "store/store";
import type { Product } from "types/types";
import Unexpected from "@/components/ui/error/unexpected";
import Spin from "@/components/ui/spinner";
import { filterProductsDisplay } from "@/lib/helpers";

const Dashboard = () => {
  const navigate = useNavigate();

  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const data = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoad(false);
      }
    };

    data();
  }, [fetchProducts]);

  const user = useAuthStore((state) => state.user);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  if (load) {
    return <Spin h="100dvh" />;
  }

  if (error) {
    return <Unexpected error={error} />;
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

      {/* <MarketBar /> */}

      {/* PRODUCT GRID */}

      <Box>
        {products && products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 4, }} gap={2}>
            {filterProductsDisplay(products, filter, searchQuery).map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                navigate={navigate}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Box
            minH="70vh"
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


    </Box >

  );
};

export default Dashboard;
