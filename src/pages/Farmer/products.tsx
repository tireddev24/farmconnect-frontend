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
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/types";
import { useEffect, useState } from "react";
import { useFarmerStore } from "store/store";
import Unexpected from "@/components/ui/error/unexpected";
import { formatDate } from "@/lib/helpers";
import { Pen, Trash } from "components/ui/icons";
import { Toaster } from "components/ui/toaster";
import { toaster } from "@/hooks/useUI";
import Spin from "@/components/ui/spinner";

export default function FarmerProducts() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const products = useFarmerStore((state) => state.products)
  const fetchProducts = useFarmerStore((state) => state.fetchProducts)

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
    return <Spin h="100dvh" />
  }

  return (
    <Flex p={8}
    >
      <Toaster />
      <Box display={"flex"} flexDir={"column"} w={"full"} gap={4} mt={4}>
        <HStack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box>
            <Heading size="2xl">
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
                variant={{ base: "outline", _dark: "surface" }}
                colorPalette={{ base: "green", _dark: "yellow" }}
              >
                List New Product
              </Button>
            </Box>
          </HStack>
        </HStack>

        {/* History Section */}
        <VStack align="stretch" mt={4} spaceX={6}>
          <Box
            rounded="2xl"
            overflow="hidden"
            shadow={"md"}
            p={4}
            minH={"60vh"}
          >
            <Table.Root >
              <Table.Header
                borderBottom="1px solid"
                borderColor="whiteAlpha.100"
              >
                <Table.Row textTransform={"capitalize"} fontWeight={"bold"}>
                  <Table.Cell>
                    Product Name
                  </Table.Cell>
                  <Table.Cell >
                    Category
                  </Table.Cell>
                  <Table.Cell>
                    unit
                  </Table.Cell>
                  <Table.Cell>
                    rice per unit
                  </Table.Cell>
                  <Table.Cell>
                    Quantity Available
                  </Table.Cell>
                  <Table.Cell>
                    Date Harvested
                  </Table.Cell>
                  <Table.Cell>
                    Actions
                  </Table.Cell>
                </Table.Row>
              </Table.Header>
              <TableBody>
                {products
                  .map((product) => (
                    <ProductRow {...product} />
                  ))}
              </TableBody>
            </Table.Root>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

const ProductRow = (product: Product) => {

  return (
    <Table.Row key={product.id}>
      <Table.Cell >
        {product.name}
      </Table.Cell>
      <Table.Cell >
        {product.categoryName}
      </Table.Cell>
      <Table.Cell >
        {product.unit}
      </Table.Cell>
      <Table.Cell >
        {product.pricePerUnit}
      </Table.Cell>
      <Table.Cell>{product.quantityAvailable}</Table.Cell>
      <Table.Cell>
        <Text>{formatDate(String(product.harvestDate))}</Text>
      </Table.Cell>
      <Table.Cell>
        <HStack gap={2}>
          <Text rounded={"lg"} cursor={"pointer"}>
            <Edit {...product} />
          </Text>
          <Text rounded={"lg"} cursor={"pointer"}>
            <Delete {...product} />
          </Text>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

const Edit = (prod: Product) => {
  const [editedProduce, setEditProduce] = useState(prod);

  const editProduct = useFarmerStore((state) => state.editProduct);

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
        <Button variant="subtle" size="sm" colorPalette={"green"}>
          <Pen />
          <Text as={"span"} display={{ base: "none", md: "block" }}>
            Edit
          </Text>
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
                  <Input bg="gray.50" border="none" rounded="xl" h="12" value={editedProduce.name} disabled />
                </Box>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={3}>
                    Category
                  </Text>
                  <Input bg="gray.50" border="none" rounded="xl" h="12" value={editedProduce.categoryName} disabled />
                </Box>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={3}>
                    Your Selling Price (₦)
                  </Text>
                  <Input
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
                onClick={() => handleEdit(prod.id, editedProduce)}
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

const Delete = (prod: Product) => {
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
        <Button variant="subtle" size="sm" colorPalette={"red"} >
          <Trash />
          <Text as={"span"} display={{ base: "none", md: "block" }}>
            Delete
          </Text>
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
              <Button colorPalette="red" onClick={() => handleDelete(prod.id)}>
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
