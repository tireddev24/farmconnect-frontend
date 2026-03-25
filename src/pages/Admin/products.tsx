import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Table,
  TableBody,
} from "@chakra-ui/react";
import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/types";
import { useEffect, useState } from "react";
import { useAdminStore } from "store/store";
import Unexpected from "error/unexpected";
import Loader from "components/ui/load";
import { formatDate } from "helpers/function";
export default function AdminProducts() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { products, fetchProducts } = useAdminStore();

  useEffect(() => {
    const data = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  if (error) {
    return <Unexpected error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      minH="100vh"
      display={"flex"}
      flex={1}
      //   w={"full"}
      p={8}
      color={{ base: "black", _dark: "white" }}
      bg="#f8fafb"
    >
      <Box
        display={"flex"}
        flexDir={"row"}
        flex={1}
        justifyContent={"center"}
        mx={"auto"}
      >
        <Box display={"flex"} flexDir={"column"} gap={10} mt={10}>
          <HStack
            minW={"5xl"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            className=" font-sans "
          >
            <Box>
              <Heading size="xl" mb={1}>
                Product Management
              </Heading>
              <Text color="gray.500" fontSize="sm">
                Manage your product listings.
              </Text>
            </Box>
            <HStack spaceX={4}>
              <Box>
                <Button
                  mr={4}
                  colorPalette={"gray"}
                  variant={"outline"}
                  disabled
                  display={"none"}
                >
                  Support
                </Button>
                <Button
                  p={2}
                  display={"none"}
                  onClick={() => navigate("../newProduct")}
                  bg={{ base: "green.600", _dark: "#8a7557" }}
                >
                  List New Product
                </Button>
              </Box>
            </HStack>
          </HStack>{" "}
          {/* Active Deliveries Section */}
          <VStack display={"none"} align="stretch" spaceX={6} mb={12}>
            <HStack alignSelf={"flex-start"}>
              <Text
                fontWeight={"bold"}
                fontSize={20}
                color={{ base: "green.600", _dark: "yellow.400/80" }}
              >
                <Truck />
              </Text>
              <Text
                color={{ base: "green.600", _dark: "yellow.400/80" }}
                fontSize={18}
                fontWeight={"semibold"}
              >
                Outbound Shipments (2)
              </Text>
            </HStack>
          </VStack>
          {/* History Section */}
          <VStack align="stretch" spaceX={6}>
            <Box
              bg="#111"
              rounded="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              overflow="scroll"
            >
              <Table.Root>
                <Table.Header
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <Table.Row textTransform={"capitalize"}>
                    <Table.Cell color="gray.600" fontSize="xs">
                      Product Name
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      Farmer Name
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      unit
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      price per unit
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      Quantity Available
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      date added
                    </Table.Cell>
                  </Table.Row>
                </Table.Header>
                <TableBody>
                  {products
                    .filter((p: Product) => p.isAvailable == true)
                    .map((p: Product, index: number) => (
                      <ProductRow key={index} product={p} />
                    ))}
                </TableBody>
              </Table.Root>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

const ProductRow = ({ product, key }: { product: Product; key: number }) => {
  return (
    <Table.Row
      borderBottom="1px solid"
      borderColor="whiteAlpha.50"
      _last={{ border: 0 }}
      key={key}
    >
      <Table.Cell color="gray.500" fontSize="sm">
        {product.name}
      </Table.Cell>
      <Table.Cell color="gray.500" fontSize="sm">
        {product.farmerName}
      </Table.Cell>
      <Table.Cell color="gray.500" fontSize="sm">
        {product.unit}
      </Table.Cell>
      <Table.Cell fontWeight="bold" fontSize="sm">
        {product.pricePerUnit}
      </Table.Cell>
      <Table.Cell>{product.quantityAvailable}</Table.Cell>
      <Table.Cell>
        <Text>{formatDate(String(product.createdAt))}</Text>
      </Table.Cell>
    </Table.Row>
  );
};
