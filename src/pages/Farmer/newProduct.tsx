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

export default function ListNewProduct() {
  const date = new Date();

  const [produce, setProduce] = useState<Product>({
    categoryId: 3,
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
  const categories = [
    { id: 3, name: "Fruits" },
    { id: 2, name: "Vegetables" },
    { id: 6, name: "Livestock and Poultry" },
  ];

  const [categoryName, setCategoryName] = useState(categories[0].name);

  const returnCategory = (text: string) => {
    const catName = categories.map((cat) => {
      if (cat.name == text) {
        setProduce((prevProduce) => ({
          ...prevProduce,
          categoryId: Number(cat.id),
        }));
      }
    });

    return catName;
  };

  return (
    <Flex minH="100vh" bg="#f8fafb" justify={"center"}>
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
                      setCategoryName(e);
                      returnCategory(categoryName);
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
const Center = ({ children, ...props }: any) => (
  <Flex align="" w={"full"} justify="center" {...props}>
    {children}
  </Flex>
);
