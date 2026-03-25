import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Table,
  TableBody,
  Dialog,
  Portal,
  CloseButton,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";
import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/types";
import { useEffect, useState } from "react";
import { useFarmerStore } from "store/store";
import Unexpected from "error/unexpected";
import Loader from "components/ui/load";
import { formatDate, returnCategoryId } from "helpers/function";
import { Pen, Trash } from "components/ui/icons";
import { Toaster, toaster } from "components/ui/toaster";

export default function FarmerProducts() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { products, fetchProducts } = useFarmerStore();

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
      color={{ base: "black", _dark: "white" }}
    >
      <Toaster />
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
              overflow="hidden"
            >
              <Table.Root size="lg">
                <Table.Header
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <Table.Row textTransform={"capitalize"}>
                    <Table.Cell color="gray.600" fontSize="xs">
                      Product Name
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      Category
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
                      date
                    </Table.Cell>
                    <Table.Cell color="gray.600" fontSize="xs">
                      Actions
                    </Table.Cell>
                  </Table.Row>
                </Table.Header>
                <TableBody>
                  {products
                    .filter((p: Product) => p.isAvailable == true)
                    .map((p: Product) => (
                      <ProductRow product={p} />
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

const ProductRow = ({ product }: { product: Product }) => {
  return (
    <Table.Row
      borderBottom="1px solid"
      borderColor="whiteAlpha.50"
      _last={{ border: 0 }}
      key={product.id}
    >
      <Table.Cell color="gray.500" fontSize="sm">
        {product.name}
      </Table.Cell>
      <Table.Cell fontWeight="bold" fontSize="sm">
        {product.categoryName}
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
      <Table.Cell>
        <HStack gap={2}>
          <Text bg={"green.200"} rounded={"lg"} cursor={"pointer"}>
            <Edit prod={product} />
          </Text>
          <Text bg={"red.300"} rounded={"lg"} cursor={"pointer"}>
            <Delete prod={product} />
          </Text>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

const Edit = ({ prod }: { prod: Product }) => {
  const [editedProduce, setEditProduce] = useState<Product>({
    ...prod,
    categoryId: returnCategoryId(prod.categoryName!)!,
  });

  const { editProduct } = useFarmerStore();
  const handleEdit = async (id: string, data: Product) => {
    const { success, message } = await editProduct(id, data);

    toaster.create({
      type: success ? "info" : "warning",
      description: success ? `${prod.name} details changed! ` : `${message}`,
    });

    if (success) {
      setOpen(false);
    }
  };

  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root
      role="dialog"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" _hover={{ bg: "green.300" }}>
          <Pen />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit {prod.name} ?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <SimpleGrid gap={6} columns={2}>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={3}>
                    Product Name (₦)
                  </Text>
                  <Input
                    defaultValue="12000"
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    h="12"
                    value={editedProduce.name}
                    disabled
                  />
                </Box>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={3}>
                    Product Category
                  </Text>
                  <Input
                    defaultValue="12000"
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    h="12"
                    value={editedProduce.categoryName}
                    disabled
                  />
                </Box>
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
                    value={editedProduce.pricePerUnit}
                    onChange={(e) =>
                      setEditProduce((prevProduce) => ({
                        ...prevProduce,
                        pricePerUnit: Number(e.target.value),
                      }))
                    }
                  />
                </Box>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={3}>
                    Quantity Available (₦)
                  </Text>
                  <Input
                    defaultValue="12000"
                    bg="gray.50"
                    border="none"
                    rounded="xl"
                    h="12"
                    type="number"
                    value={editedProduce.quantityAvailable}
                    onChange={(e) =>
                      setEditProduce((prevProduce) => ({
                        ...prevProduce,
                        quantityAvailable: Number(e.target.value),
                      }))
                    }
                  />
                </Box>
              </SimpleGrid>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="red"
                onClick={() => handleEdit(prod.id!, editedProduce)}
              >
                Update Product Details
              </Button>
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

const Delete = ({ prod }: { prod: Product }) => {
  const { deleteProduct } = useFarmerStore();

  const [open, setOpen] = useState(false);
  const handleDelete = async (id: string) => {
    const { success, message } = await deleteProduct(id);

    toaster.create({
      type: success ? "success" : "warning",
      description: success ? `${prod.name} deleted successfully! ` : message,
    });

    if (success) {
      setOpen(false);
    }
  };
  return (
    <Dialog.Root
      role="alertdialog"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" _hover={{ bg: "red.500" }}>
          <Trash />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete Product</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Are you sure you want to remove {prod.name} from your product
              listings?
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">No</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={() => handleDelete(prod.id!)}>
                Yes
              </Button>
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
