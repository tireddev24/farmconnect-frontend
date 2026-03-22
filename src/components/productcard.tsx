import { TrendingUp, Package, TrendingDown } from "lucide-react";
import type { Product } from "types/types";
import { Box, Text } from "@chakra-ui/react";
import type { NavigateFunction } from "react-router-dom";

export const ProductCard = ({
  product,
  navigate,
}: {
  product: Product;
  navigate?: NavigateFunction;
}) => (
  <Box
    padding={4}
    bg={{ base: "white", _dark: "whiteAlpha.300/50" }}
    border={"1px solid"}
    borderColor={{ base: "gray.100", _dark: "gray.700" }}
    cursor={"pointer"}
    margin={4}
    rounded={"xl"}
    _hover={{ boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    onClick={() => navigate(`/product/${product.id}`)}
  >
    <Box className="flex items-center gap-4" mb={2}>
      <Box
        bg={{ base: "gray.300/40", _dark: "#252525" }}
        className="w-14 h-14 rounded-2xl  flex items-center justify-center text-2xl"
        fontSize={30}
      >
        {product.imageUrls ? product.imageUrls![0] || "🌽" : "🌽"}
      </Box>
      <Box className="flex flex-col items-start">
        <h3 className="font-semibold text-gray-200">
          <Text
            fontSize={"lg"}
            fontWeight={"semibold"}
            color={{ base: "#252525", _dark: "white" }}
            textTransform={"capitalize"}
          >
            {product.name}
          </Text>
        </h3>
        <Text
          fontSize={"sm"}
          color={{ base: "gray.400", _dark: "gray.500" }}
          textTransform={"capitalize"}
        >
          {product.unit}
        </Text>
        <Text
          rounded={"2xl"}
          bg={{ base: "gray.100", _dark: "#252525" }}
          color={{ base: "gray.400/70", _dark: "gray.500" }}
          w={"max-content"}
          p={1}
          mt={1}
          px={2}
          fontWeight={"bold"}
          fontSize={"xs"}
        >
          {product.categoryName}
        </Text>
      </Box>
    </Box>

    <Box mt={4} className="grid mt-10 grid-cols-1 gap-3 mb-4">
      <Box
        p={2}
        bg={{ base: "green.100/50", _dark: "green.300/10" }}
        border={"1px solid"}
        borderColor={{ base: "green.300/50", _dark: "green.400/30" }}
        rounded={"xl"}
      >
        <Text
          color={{ base: "#", _dark: "" }}
          fontSize={"xs"}
          fontWeight={"semibold"}
          className="capitalize"
        >
          Buy Now
        </Text>
        <Text
          color={{ base: "green.500", _dark: "" }}
          fontWeight={"semibold"}
          fontSize={"lg"}
        >
          ₦{product.pricePerUnit.toLocaleString()}
        </Text>
      </Box>
      <Box
        p={2}
        bg={{ base: "red.100/50", _dark: "red.300/10" }}
        border={"1px solid"}
        borderColor={{ base: "red.300/50", _dark: "red.400/30" }}
        rounded={"xl"}
        display={"none"}
      >
        <Text
          color={{ base: "", _dark: "" }}
          fontSize={"xs"}
          fontWeight={"semibold"}
        >
          Best Offer
        </Text>
        <Text
          color={{ base: "#e85d75", _dark: "" }}
          fontSize={"lg"}
          fontWeight={"semibold"}
        >
          ₦{(product.pricePerUnit * 0.95).toLocaleString()}
        </Text>
      </Box>
    </Box>

    <Box
      border={"1px solid"}
      borderColor={{ base: "gray.100", _dark: "gray.700/50" }}
      marginY={"4"}
    />

    <Box
      color={{ base: "gray.700", _dark: "gray.400" }}
      className="flex items-center justify-between  border-t border-[#252525]"
    >
      <span className="flex items-center gap-1">
        <Package size={14} /> {product.quantityAvailable} in stock
      </span>
      <span
        className={`text-xs hidden font-medium flex items-center gap-1 ${product.quantityAvailable > 0 ? "text-[#4ecca3]" : "text-[#e85d75]"}`}
      >
        {product.quantityAvailable > 0 ? (
          <TrendingUp size={14} />
        ) : (
          <TrendingDown size={14} />
        )}
        {product.quantityAvailable > 0 ? "Rising" : "Falling"}
      </span>
    </Box>
  </Box>
);
