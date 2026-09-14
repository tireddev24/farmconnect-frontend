

import { VStack, Box, Text, HStack, Input } from "@chakra-ui/react";
import type {
  DashboardStat,
  Product,

} from "types/types";
import Badge from "components/ui/badge";

import { Icon, Spacer, Circle, Flex, Dialog, Button, Table, Portal, CloseButton } from "@chakra-ui/react";

import { formatPlural, getStatusColor } from "@/lib/helpers";
import { useFarmerStore } from "@/store/store";
import { useState } from "react";
import { toaster } from "@/hooks/useUI";
import { Ban, CheckLine } from "lucide-react";


export const ProductCard = ({ product }: { product: Product }) => {
  // Logic for stock status color
  const isLowStock = product.quantityAvailable < 10;
  const statusColor = isLowStock ? "red" : "green";
  const statusText = isLowStock ? "Low Stock" : "In Stock";

  return (
    <Box
      w={"full"}
      bg={{ base: "white", _dark: "#1a1a1a" }}
      rounded="xl"
      shadow={"sm"}
      borderColor={{ _dark: "#262626" }}
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)" }}
    >
      <HStack justifyContent="space-between" p={4}>
        <HStack gap={4}>
          {/* Icon Box - Swapped to Green/Nature theme */}
          <Box p={2} fontSize="2xl" bg="green.500/10" rounded="lg">
            🌽
          </Box>

          <VStack align="start" gap={0}>
            <Text fontWeight="semibold" >
              {product.name}
            </Text>
            <Text fontSize="sm" color="gray.500" textWrap={"nowrap"}>
              {product.categoryName}
            </Text>
          </VStack>
        </HStack>

        <Flex flexDirection="column" alignItems="end" gap={2}>
          {/* Badge now shows Stock Status instead of Order Status */}
          <Badge color={statusColor} text={statusText} />
          <Text fontSize="xs" fontWeight="semibold" textTransform={"capitalize"}>
            {product.quantityAvailable} {formatPlural(product.unit, product.quantityAvailable)}
          </Text>
        </Flex>
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

export const OrderRow = ({ ...order }) => (
  <Table.Row textTransform={"capitalize"} >
    <Table.Cell py={4} >
      {order.id}
    </Table.Cell>
    <Table.Cell  >
      {order.name}
    </Table.Cell>
    <Table.Cell >
      {order.date}
    </Table.Cell>
    <Table.Cell fontWeight="bold">
      ₦{order.amount}
    </Table.Cell>
    <Table.Cell>
      <Badge text={order.status.split("-").join(" ")} color={getStatusColor(order.status)} />
    </Table.Cell>
  </Table.Row>
);

export const DeliveryItem = ({ label, progress, icon, }: { label: string; progress: string; icon: string; }) => (
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
    {/* <Progress value={progress} size="xs" colorScheme="emerald" rounded="full" /> */}
  </Box>
);

export const MetricCard = ({ label, value, icon, color }: DashboardStat) => (
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



export const ApproveOrder = ({ id }: { id: string }) => {

  const acceptOrder = useFarmerStore((state) => state.acceptOrder);
  const [loading, setLoading] = useState(false);

  const handleAcceptOrder = async () => {
    setLoading(true);
    const { success, message } = await acceptOrder(id);
    setLoading(false);

    toaster.create({
      type: success ? "info" : "warning",
      description: message
    });

    if (success) {
      setOpen(false);
    }
  };

  const [open, setOpen] = useState(false);


  return (
    <Dialog.Root role="alertdialog" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button colorPalette={"green"} variant={"subtle"} >
          <CheckLine />
          <Text as={"span"} display={{ base: "none", md: "block" }}>
            Accept
          </Text>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header color={{ base: "black", _dark: "white" }}>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color={{ base: "black", _dark: "white" }}>
              <Text>This action cannot be undone. You will accept this order.</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="green" onClick={handleAcceptOrder} disabled={loading}>{loading ? "Processing..." : "Accept Order"}</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export const DeclineOrder = ({ id }: { id: string }) => {

  const declineOrder = useFarmerStore((state) => state.declineOrder);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeclineOrder = async () => {
    setLoading(true);
    if (!reason) {
      toaster.create({
        type: "warning",
        description: "Reason is required!",
      });
      setLoading(false)
      return;
    }

    const { success, message } = await declineOrder(id, { reason });

    setLoading(false);
    toaster.create({
      type: success ? "info" : "warning",
      description: message
    });

    if (success) {
      setOpen(false);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root role="alertdialog" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button colorPalette={"red"} variant={"subtle"}>
          <Ban />
          <Text as={"span"} display={{ base: "none", md: "block" }}>
            Decline
          </Text>
        </Button>
      </Dialog.Trigger>
      <Portal >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header color={{ base: "black", _dark: "white" }}>
              <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color={{ base: "black", _dark: "white" }}>
              <Text>Reason for declining</Text>
              <Input
                type="text"
                placeholder="Reason for declining"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <p>This action cannot be undone. You will decline this order.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleDeclineOrder} disabled={loading}>{loading ? "Processing..." : "Decline Order"}</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};