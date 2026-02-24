import { TrendingUp, Package, TrendingDown } from "lucide-react";
import type { Product } from "../types/productTypes";
import { Box, Text } from "@chakra-ui/react";

export const ProductCard = ({ product }: { product: Product }) => (
  <Box
    padding={5}
    bg={"whiteAlpha.100"}
    margin={4}
    rounded={"xl"}
    _hover={{ boxShadow: "" }}
  >
    <Box className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 rounded-2xl bg-[#252525] flex items-center justify-center text-2xl">
        {product.icon}
      </div>
      <Box className="flex flex-col items-start" my={1}>
        <h3 className="font-semibold text-gray-200">
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            {product.name}
          </Text>
        </h3>
        <p className="text-sm text-gray-500">{product.unit}</p>
        <Text
          rounded={"2xl"}
          bg={"#252525"}
          w={"max-content"}
          p={1}
          mt={1}
          px={2}
          fontWeight={"bold"}
          fontSize={"2xs"}
        >
          Tubers
        </Text>
      </Box>
    </Box>

    <Box mt={2} className="grid mt-10 grid-cols-2 gap-3 mb-4">
      <Box
        p={2}
        className="bg-[#4ecca3]/10 border border-[#4ecca3]/20 rounded-xl p-3"
      >
        <p className="text-[10px] text-gray-500 uppercase">Buy Now</p>
        <p className="text-[#4ecca3] font-bold text-lg">
          ₦{product.price.toLocaleString()}
        </p>
      </Box>
      <Box
        p={2}
        className="bg-[#e85d75]/10 border border-[#e85d75]/20 rounded-xl p-3"
      >
        <p className="text-[10px] text-gray-500 uppercase">Best Offer</p>
        <p className="text-[#e85d75] font-bold text-lg">
          ₦{(product.price * 0.95).toLocaleString()}
        </p>
      </Box>
    </Box>

    <Box border={" 1px solid gray"} marginY={"4"} />

    <div className="flex items-center justify-between pt-4 border-t border-[#252525]">
      <span className="text-xs text-gray-500 flex items-center gap-1">
        <Package size={14} /> {product.stock} in stock
      </span>
      <span
        className={`text-xs font-medium flex items-center gap-1 ${product.trend === "up" ? "text-[#4ecca3]" : "text-[#e85d75]"}`}
      >
        {product.trend === "up" ? (
          <TrendingUp size={14} />
        ) : (
          <TrendingDown size={14} />
        )}
        {product.trend === "up" ? "Rising" : "Falling"}
      </span>
    </div>
  </Box>
);
