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

export default function ListNewProduct() {
  const [produce, setProduce] = useState("");

  return (
    <Flex minH="100vh" bg="#f8fafb">
      {/* --- Global Farmer Sidebar --- */}
      <VStack
        w="80px"
        bg="white"
        borderRight="1px solid"
        borderColor="gray.100"
        py={8}
        align="center"
        spaceX={8}
      >
        <Center bg="#10a37f" p={2} rounded="lg">
          <Icon as={Wheat} color="white" fontSize={24} />
        </Center>
        <VStack spaceX={6}>
          <Icon
            as={LayoutDashboard}
            color="gray.400"
            fontSize={20}
            cursor="pointer"
          />
          <Icon
            as={TrendingUp}
            color="gray.400"
            fontSize={20}
            cursor="pointer"
          />
          <Icon
            as={BarChart3}
            color="gray.400"
            fontSize={20}
            cursor="pointer"
          />
          <Icon as={Settings} color="gray.400" fontSize={20} cursor="pointer" />
          <Icon as={Users} color="#10a37f" fontSize={20} cursor="pointer" />
        </VStack>
        <Spacer />
        <VStack spaceX={6}>
          <Icon as={Sun} color="gray.400" fontSize={20} cursor="pointer" />
          <Icon as={LogOut} color="red.400" fontSize={20} cursor="pointer" />
        </VStack>
      </VStack>

      {/* --- Main Content --- */}
      <Container maxW="container.xl" py={12}>
        <VStack align="start" mb={10} spaceX={1}>
          <HStack
            color="gray.500"
            cursor="pointer"
            _hover={{ color: "gray.700" }}
          >
            <Icon as={LayoutDashboard} fontSize={14} />
            <Text fontSize="sm">Back to Profile</Text>
          </HStack>
          <Heading size="lg" color="#1a202c">
            List New Product
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Add a new crop or product to the marketplace
          </Text>
        </VStack>

        <Flex gap={12}>
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
                <Text fontSize="10px" color="gray.400" mt={2}>
                  Choosing a base automatically fills standard market details.
                </Text>
              </Box>

              <HStack spaceX={6}>
                <Box flex={1}>
                  <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3}>
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
                  <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3}>
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
                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3}>
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
                <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={3}>
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
          <Box flex={1}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="gray.500"
              mb={6}
              letterSpacing="widest"
            >
              LIVE CARD PREVIEW
            </Text>
            <Card.Root
              maxW="320px"
              rounded="3xl"
              overflow="hidden"
              shadow="xl"
              border="1px solid"
              borderColor="gray.100"
            >
              <Box p={6}>
                <HStack spaceX={4} mb={6}>
                  <Center bg="gray.50" boxSize="12" rounded="xl">
                    <Icon as={Wheat} color="#10a37f" fontSize={24} />
                  </Center>
                  <Box>
                    <Text fontWeight="bold" fontSize="md">
                      Guinea Corn (Sorghum)
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      per 100kg Bag
                    </Text>
                    <Badge
                      colorScheme="gray"
                      variant="subtle"
                      fontSize="10px"
                      px={2}
                      rounded="full"
                      mt={1}
                    >
                      Grains
                    </Badge>
                  </Box>
                </HStack>

                <Box
                  bg="emerald.50"
                  p={4}
                  rounded="2xl"
                  border="1px solid"
                  borderColor="emerald.100"
                  mb={6}
                >
                  <Text fontSize="10px" fontWeight="bold" color="emerald.600">
                    Buy Now
                  </Text>
                  <Text fontSize="xl" fontWeight="800" color="#10a37f">
                    ₦12,000
                  </Text>
                </Box>

                <Separator mb={4} />
                <HStack color="gray.500">
                  <Icon as={Package} fontSize={14} />
                  <Text fontSize="xs">Medium in stock</Text>
                </HStack>
              </Box>
            </Card.Root>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
}

// Helper Center component for layout consistency
const Center = ({ children, ...props }: any) => (
  <Flex align="center" justify="center" {...props}>
    {children}
  </Flex>
);
