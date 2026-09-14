import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Table,
  TableBody,
  Flex,
} from "@chakra-ui/react";
import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAdminStore } from "store/store";
import Unexpected from "@/components/ui/error/unexpected";
import { formatDate } from "@/lib/helpers";
import Spin from "@/components/ui/spinner";
export default function AdminProducts() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const products = useAdminStore((state) => state.products);
  const fetchProducts = useAdminStore((state) => state.fetchProducts);

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
  }, [fetchProducts]);

  if (error) {
    return <Unexpected error={error} />;
  }

  if (loading) {
    return <Spin h="100dvh" />;
  }

  return (

    <Flex justify="center" p="4">
      <Box flex={1} >
        <HStack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box m={2}>
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
        </HStack>

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

        <Box
          rounded="2xl"
          bg={{ base: "white", _dark: "gray.800" }}
          p={8}

          shadow="sm"
          border="1px solid"
          borderColor={{ base: "gray.100", _dark: "gray.800" }}
          mb={8}
          color={{ base: "gray.800", _dark: "white" }}

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
                .map((p) => (
                  <ProductRow key={p.id} {...p} />
                ))}
            </TableBody>
          </Table.Root>
        </Box>
      </Box>

    </Flex>
  );
}

const ProductRow = ({ ...props }) => {

  return (
    <Table.Row
      borderBottom="1px solid"
      borderColor="whiteAlpha.50"
      _last={{ border: 0 }}
      key={props.id}
    >
      <Table.Cell color="gray.500" fontSize="sm">
        {props.name}
      </Table.Cell>
      <Table.Cell color="gray.500" fontSize="sm">
        {props.farmerName}
      </Table.Cell>
      <Table.Cell color="gray.500" fontSize="sm">
        {props.unit}
      </Table.Cell>
      <Table.Cell fontWeight="bold" fontSize="sm">
        {props.pricePerUnit}
      </Table.Cell>
      <Table.Cell>{props.quantityAvailable}</Table.Cell>
      <Table.Cell>
        <Text>{formatDate(props.createdAt)}</Text>
      </Table.Cell>
    </Table.Row>
  );
};
