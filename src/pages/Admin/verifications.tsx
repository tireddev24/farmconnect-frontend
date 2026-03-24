import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Table,
  TableBody,
  VStack,
} from "@chakra-ui/react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import type { OrderRecord } from "types/types";
import { useAdminStore } from "store/store";
import Unexpected from "error/unexpected";
import { formatDate } from "helpers/function";
import Spin from "components/ui/spinner";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { ColorModeButton } from "components/ui/color-mode";

const Verify = () => {
  const navigate = useNavigate();

  const handleView = (id: string) => {
    navigate(id);
  };
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const { orders, fetchOrders } = useAdminStore();

  useEffect(() => {
    const data = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, []);

  if (loading) {
    return (
      <VStack minH={"100dvh"} justifyContent={"center"}>
        <Spin />
      </VStack>
    );
  }

  if (error) {
    return <Unexpected error={error} />;
  }

  return (
    <Flex minH="100vh">
      {/* --- Main Content --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg" color={"green.600"}>
              Verify User Orders
            </Heading>
          </Box>
          <ColorModeButton />
        </Flex>

        <Box
          bg={{ base: "white", _dark: "gray.800" }}
          p={8}
          rounded="3xl"
          shadow="sm"
          border="1px solid"
          borderColor={{ base: "gray.100", _dark: "gray.800" }}
          mb={8}
          color={{ base: "gray.800", _dark: "white" }}
        >
          <HStack mb={6} color="emerald.600">
            <Icon as={Check} fontSize={20} />
            <Heading size="md">Pending Farmer Verifications</Heading>
          </HStack>

          <Table.Root size="sm">
            <Table.Header>
              {/* <Table.ColumnHeader color="gray.400" textTransform="none">
                Name
              </Table.ColumnHeader> */}
              {/* <Table.ColumnHeader color="gray.400" textTransform="none">
                    Location
                  </Table.ColumnHeader> */}
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Seller
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Order Id
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Date
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Amount
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="gray.400"
                textTransform="none"
                textAlign="right"
              >
                Action
              </Table.ColumnHeader>
            </Table.Header>
            <TableBody>
              {orders.map((o: OrderRecord) => (
                <VerificationRow
                  key={o.id}
                  //   name={o.items[0].productName}
                  seller={o.farmerName!}
                  status={o.status!}
                  orderId={o.orderNumber}
                  date={formatDate(o.createdAt!)}
                  amount={o.totalAmount}
                  handleView={handleView}
                />
              ))}
            </TableBody>
          </Table.Root>
        </Box>
      </Box>
    </Flex>
  );
};

export default Verify;

export const VerificationRow = ({
  status,
  orderId,
  amount,
  date,
  seller,
}: {
  name?: string;
  nin?: string;
  orderId: string;
  date: string;
  amount: string | number;
  status: string;
  handleView?: (arg0: string) => void;

  seller: string;
}) => (
  <Table.Row>
    {/* <Table.Cell fontWeight="bold" py={4}>
      {name}
    </Table.Cell> */}
    {/* <Table.Cell color="gray.500">{location}</Table.Cell> */}
    <Table.Cell color="gray.500">{orderId}</Table.Cell>
    <Table.Cell textTransform={"capitalize"} color="gray.500">
      {seller}
    </Table.Cell>
    <Table.Cell textTransform={"capitalize"} color="gray.500">
      {status.replace("-", " ")}
    </Table.Cell>
    <Table.Cell color="gray.500">{date}</Table.Cell>
    <Table.Cell color="gray.500">{amount}</Table.Cell>
    <Table.Cell textAlign={"right"}>
      <HStack
        justifyContent={"end"}
        _hover={{ color: { base: "green.500", _dark: "yellow.500" } }}
        cursor={"pointer"}
      >
        <Dialog.Root role="dialog">
          <Dialog.Trigger asChild>
            <Button variant="outline" size="sm">
              Approve
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Are you sure?</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    This action cannot be undone. This will approve order and
                    begin order processing.
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button colorPalette="green">Approve Order</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </HStack>
    </Table.Cell>
  </Table.Row>
);
