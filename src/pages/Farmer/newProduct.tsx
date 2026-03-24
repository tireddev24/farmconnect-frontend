import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  Textarea,
  Container,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";

import CustomSelect from "../../components/customselect";
import { useState } from "react";
import { LeftArrow } from "components/ui/icons";
import { ProductCard } from "components/productcard";
import { type Product } from "types/types";
import { Toaster, toaster } from "components/ui/toaster";
import { categories } from "data/constant";
import { returnCategory } from "helpers/function";

export default function ListNewProduct() {
  const date = new Date();

  const [produce, setProduce] = useState<Product>({
    categoryId: 0,
    name: "",
    description: "",
    pricePerUnit: 3,
    unit: "",
    isAvailable: true,
    quantityAvailable: 100,
    location: "string",
    harvestDate: date,
    expiryDate: date,
  });

  const [categoryName, setCategoryName] = useState(categories[0].name);

  const handleCreateProduct = () => {
    if (produce.categoryId == 0) {
      toaster.create({
        type: "error",
        description: "You have not chosen a category",
      });
      return;
    }
  };

  return (
    <Flex minH="100vh" bg="#f8fafb" justify={"center"}>
      <Toaster />
      {/* --- Main Content --- */}
      <Container py={12}>
        <VStack align="start" mb={10}>
          <HStack
            color="gray.500"
            cursor="pointer"
            _hover={{ color: "gray.700" }}
          >
            <Link href="../">
              <Text>
                <LeftArrow />
              </Text>
              <Text fontSize="sm">Back</Text>
            </Link>
          </HStack>
          <Heading size="lg" color="#1a202c">
            List New Product
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Add a new crop or product to the marketplace
          </Text>
        </VStack>

        <SimpleGrid columns={2} mb={8}>
          {/* --- Input Form --- */}
          <Box
            columnWidth={"initial"}
            flex={1.5}
            bg="white"
            p={10}
            rounded="3xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack align="stretch">
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3}>
                  Select Crop/Product Base
                </Text>

                <SimpleGrid columns={2} spaceX={4} mb={8}>
                  <Input
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    h="12"
                    value={produce.name}
                    onChange={(e) =>
                      setProduce((prevProduce) => ({
                        ...prevProduce,
                        name: e.target.value,
                      }))
                    }
                  />
                  <CustomSelect
                    defaultValue={"CATEGORY"}
                    options={categories.map((cat) => cat.name)}
                    value={categoryName}
                    onChange={(e) => {
                      returnCategory(e, setProduce);
                      setCategoryName(e);
                    }}
                  />
                </SimpleGrid>
                {/* <Text fontSize="sm" color="gray.400" my={4}>
                  Choosing a base automatically fills standard market details.
                </Text> */}
              </Box>

              <HStack spaceX={6}>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={3}>
                    Your Selling Price (₦)
                  </Text>
                  <Input
                    defaultValue="12000"
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    h="12"
                    value={produce.pricePerUnit}
                    onChange={(e) =>
                      setProduce((prevProduce) => ({
                        ...prevProduce,
                        pricePerUnit: Number(e.target.value),
                      }))
                    }
                  />
                </Box>
                <Box flex={1}>
                  <Text fontWeight="bold" color="gray.500" mb={3}>
                    Stock Level / Quantity
                  </Text>
                  <Input
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    h="12"
                    value={produce.quantityAvailable}
                    onChange={(e) =>
                      setProduce((prevProduce) => ({
                        ...prevProduce,
                        quantityAvailable: Number(e.target.value),
                      }))
                    }
                  />
                </Box>
              </HStack>

              <Box>
                <Text fontWeight="bold" color="gray.500" mb={3}>
                  Measurement Unit
                </Text>
                <Input
                  defaultValue="Bag"
                  bg="gray.50"
                  border="none"
                  rounded="xl"
                  h="12"
                  value={produce.unit}
                  onChange={(e) =>
                    setProduce((prevProduce) => ({
                      ...prevProduce,
                      unit: e.target.value,
                    }))
                  }
                />
              </Box>

              <Box>
                <Text fontWeight="bold" color="gray.500" mb={3}>
                  Product Description
                </Text>
                <Textarea
                  defaultValue="Red sorghum, excellent for brewing or food."
                  bg="gray.50"
                  border="none"
                  rounded="xl"
                  rows={4}
                  value={produce.description}
                  onChange={(e) =>
                    setProduce((prevProduce) => ({
                      ...prevProduce,
                      description: e.target.value,
                    }))
                  }
                />
              </Box>

              <Button
                // leftIcon={<CheckCircle2 size={18} />}
                bg="#10a37f"
                color="white"
                h="14"
                rounded="2xl"
                fontSize="md"
                _hover={{ bg: "#0d8a6b" }}
                onClick={handleCreateProduct}
              >
                Publish Listing
              </Button>
            </VStack>
          </Box>

          {/* --- Live Card Preview --- */}
          <Box>
            <ProductCard product={produce} />
          </Box>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

// Helper Center component for layout consistency
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Center = ({ children, ...props }: any) => (
  <Flex align="" w={"full"} justify="center" {...props}>
    {children}
  </Flex>
);
