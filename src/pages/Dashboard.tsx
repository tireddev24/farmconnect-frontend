import React, { useState, useEffect, useMemo } from "react";
import { MOCK_PRODUCTS } from "../data/mockdata";
import { SearchX } from "lucide-react";

import { ProductCard } from "../components/productcard";
import { Header } from "../components/header";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Dot } from "../components/ui/icons";

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

      <Box
        bg={{ base: "white", _dark: "black" }}
        borderY={"1px solid "}
        borderColor={"gray.100/10"}
        p={3}
        px={6}
        display={"flex"}
        alignItems={"center"}
        gap={4}
      >
        <HStack color={"green"}>
          <Dot color="green" />
          <Text co>Live Market</Text>
        </HStack>
        <HStack>
          <Text>Icon here</Text>
          <Text color={{ base: "black", _dark: "white" }}> 2,847</Text>
          <Text>Active Traders</Text>
        </HStack>
        <HStack>
          <Text>Icon here</Text>
          <Text color={{ base: "black", _dark: "white" }}> 2,847</Text>
          <Text>Tons Traded</Text>
        </HStack>
        <HStack>
          <Text>Icon here</Text>
          <Text>Updated</Text>
          <Text color={{ base: "black", _dark: "white" }}>Just now</Text>
        </HStack>
      </Box>

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
