import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Spacer,
  Button,
  Input,
  Textarea,
  Container,
  Card,
  Badge,
  Separator,
} from "@chakra-ui/react";
import {
  Wheat,
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Settings,
  Users,
  Sun,
  LogOut,
  Package,
} from "lucide-react";
import CustomSelect from "../../components/customselect";
import { useState } from "react";
import { BackCaret, LeftArrow } from "components/ui/icons";
import { ProductCard } from "components/productcard";

export default function ListNewProduct() {
  const string = "string";
  const number = 10;
  const boolean = false;
  const [produce, setProduce] = useState({
    name: "",
    description: "",
    pricePerUnit: 1000, // In JS/TS, all numbers are 'number'
    unit: "string",
    quantityAvailable: number,
    isAvailable: boolean,

    createdAt: Date,
    categoryName: string,
    imageUrls: string, // Array of strings
  });

  return (
    <Flex minH="100vh" bg="#f8fafb">
      {/* --- Main Content --- */}
      <Container maxW="container.xl" py={12}>
        <VStack align="start" mb={10} spaceX={1}>
          <HStack
            color="gray.500"
            cursor="pointer"
            _hover={{ color: "gray.700" }}
          >
            <Text>
              <LeftArrow />
            </Text>
            <Text fontSize="sm">Back to Profile</Text>
          </HStack>
          <Heading size="lg" color="#1a202c">
            List New Product
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Add a new crop or product to the marketplace
          </Text>
        </VStack>

        <Flex gap={12} w={"full"} flexDirection={"column"}>
          {/* --- Input Form --- */}
          <Box
            flex={1.5}
            bg="white"
            p={10}
            rounded="3xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <VStack spaceX={8} align="stretch">
              <Box>
                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3}>
                  Select Crop/Product Base
                </Text>

                <CustomSelect
                  defaultValue="🥔 Puna Yam"
                  options={[
                    "🌽 Guinea Corn (Sorghum)",
                    "🥔 Puna Yam",
                    "🌾 Premium Rice",
                  ]}
                  value={produce}
                  onChange={(e) => setProduce(e)}
                />
                <Text fontSize="sm" color="gray.400" my={4}>
                  Choosing a base automatically fills standard market details.
                </Text>
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
                  />
                </Box>
                <Box flex={1}>
                  <Text fontWeight="bold" color="gray.500" mb={3}>
                    Stock Level / Quantity
                  </Text>
                  <Input
                    defaultValue="Medium"
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    h="12"
                  />
                </Box>
              </HStack>

              <Box>
                <Text fontWeight="bold" color="gray.500" mb={3}>
                  Measurement Unit
                </Text>
                <Input
                  defaultValue="100kg Bag"
                  bg="gray.50"
                  border="none"
                  rounded="xl"
                  h="12"
                />
              </Box>

              <Box>
                <Text fontWeight="bold" color="gray.500" mb={3}>
                  Farm Details & Quality Description
                </Text>
                <Textarea
                  defaultValue="Red sorghum, excellent for brewing or food."
                  bg="gray.50"
                  border="none"
                  rounded="xl"
                  rows={4}
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
          <ProductCard product={produce} />
        </Flex>
      </Container>
    </Flex>
  );
}

// Helper Center component for layout consistency
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Center = ({ children, ...props }: any) => (
  <Flex align="center" justify="center" {...props}>
    {children}
  </Flex>
);
