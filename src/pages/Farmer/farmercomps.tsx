import { useNavigate } from "react-router-dom";

import { VStack, Box, Text, HStack, Separator } from "@chakra-ui/react";
import type {
  DashboardStat,
  OrderActivity,
  ProfileProductCard,
  Quicklink,
} from "types/types";
import { Leaf, RightChevron } from "components/ui/icons";
import Badge from "components/ui/badge";

import { Icon, Spacer, Circle, Flex, Table } from "@chakra-ui/react";

import { getStatusColor } from "helpers/function";

export const QuickLink = ({ icon, label, sub, link, disabled }: Quicklink) => {
  const navigate = useNavigate();
  return (
    <VStack
      bg={{ base: "white", _dark: "#121212" }}
      p={4}
      rounded="xl"
      border="1px solid #262626"
      align="start"
      cursor="pointer"
      _hover={{ bg: { _dark: "#1a1a1a" } }}
      onClick={() => link && navigate(`../${link}`)}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : "auto"}
    >
      <Box color={{ base: "green.400", _dark: "orange.400" }} mb={2}>
        {icon}
      </Box>
      <Text fontWeight="bold" fontSize="sm">
        {label}
      </Text>
      <Text fontSize="xs" color="gray.500">
        {sub}
      </Text>
    </VStack>
  );
};

export const ProductCard = ({ product }: { product: ProfileProductCard }) => {
  // Logic for stock status color
  const isLowStock = product.quantityAvailable < 10;
  const statusColor = isLowStock ? "red" : "green";
  const statusText = isLowStock ? "Low Stock" : "In Stock";

  return (
    <Box
      w={"full"}
      bg={{ base: "white", _dark: "#1a1a1a" }}
      rounded="xl"
      boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1)"
      borderColor={{ _dark: "#262626" }}
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)" }}
    >
      <HStack justifyContent="space-between" p={4}>
        <HStack gap={4}>
          {/* Icon Box - Swapped to Green/Nature theme */}
          <Box p={3} bg="green.500/10" rounded="lg">
            <Leaf color="green" />
          </Box>

          <VStack align="start" gap={0}>
            <Text fontWeight="bold" fontSize="lg">
              {product.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {product.category} • {product.unit}
            </Text>
          </VStack>
        </HStack>

        <HStack alignItems="center" gap={2}>
          {/* Badge now shows Stock Status instead of Order Status */}
          <Badge color={statusColor} text={statusText} />
          <RightChevron cursor={"pointer"} fontSize={"sm"} color="gray" />
        </HStack>
      </HStack>

      <Separator borderColor="gray.100" _dark={{ borderColor: "#262626" }} />

      <HStack justifyContent="space-between" p={4}>
        <VStack align="start" gap={0}>
          <Text fontSize="xs" color="gray.400" textTransform="uppercase">
            Available
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            {product.quantityAvailable} {product.unit}s
          </Text>
        </VStack>

        <VStack align="end" gap={0}>
          <Text fontSize="xs" color="gray.400" textTransform="uppercase">
            Price
          </Text>
          <Text fontWeight="bold" color="orange.500" fontSize="lg">
            ₦{product.pricePerUnit.toLocaleString()}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export const LegendItem = ({
  color,
  label,
}: {
  color: string;
  label: string;
}) => (
  <HStack spaceX={2}>
    <Circle size="2" bg={color} />
    <Text fontSize="xs" color="gray.500">
      {label}
    </Text>
  </HStack>
);

export const OrderRow = ({
  id,
  name,
  date,
  amount,
  status,
  tracking,
}: OrderActivity) => (
  <Table.Row textTransform={"capitalize"}>
    <Table.Cell fontSize="xs" fontWeight="bold" py={4}>
      {id}
    </Table.Cell>
    <Table.Cell fontSize="xs" color="gray.600">
      {name}
    </Table.Cell>
    <Table.Cell fontSize="xs" color="gray.500">
      {date}
    </Table.Cell>
    <Table.Cell fontSize="xs" fontWeight="bold">
      ₦{amount}
    </Table.Cell>
    <Table.Cell>
      <Badge text={status} color={getStatusColor(status)} />
    </Table.Cell>
    <Table.Cell fontSize="xs" color="gray.400" fontWeight="bold">
      {tracking}
    </Table.Cell>
  </Table.Row>
);

export const DeliveryItem = ({
  label,
  progress,
  icon,
}: {
  label: string;
  progress: string;
  icon: string;
}) => (
  <Box border="1px solid" borderColor="emerald.100" p={4} rounded="xl">
    <HStack mb={3}>
      <Icon name={icon} color="emerald.500" fontSize={16} />
      <Text fontSize="xs" fontWeight="bold">
        {label}
      </Text>
      <Spacer />
      <Text fontSize="xs" fontWeight="bold" color="emerald.500">
        {progress}%
      </Text>
    </HStack>
    {/* <Progresss value={progress} size="xs" colorScheme="emerald" rounded="full" /> */}
  </Box>
);

export const MetricCard = ({
  label,
  value,

  icon,
  color,
}: DashboardStat) => (
  <Box
    // bg="white"
    p={6}
    rounded="2xl"
    shadow="sm"
    border="1px solid"
    borderColor={{ base: "gray.50", _dark: "yellow.600" }}
  >
    <Flex
      justify="space-between"
      align="start"
      color={{ base: "gray.500", _dark: "white" }}
    >
      <VStack align="start" spaceX={1}>
        <Text fontSize="xs" fontWeight="bold">
          {label}
        </Text>
        <Text fontSize="xl" fontWeight="800">
          {value}
        </Text>
        <HStack spaceX={1}></HStack>
      </VStack>
      <Circle boxSize="10">
        <Icon as={icon} color={`${color}.400`} fontSize={20} />
      </Circle>
    </Flex>
  </Box>
);
