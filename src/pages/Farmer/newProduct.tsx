import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";

import CustomSelect from "../../components/customselect";
import { useState } from "react";
import { LeftArrow } from "components/ui/icons";
import { ProductCard } from "components/productcard";
import { type Product, type ProductUnit } from "types/types";
import { Toaster } from "components/ui/toaster";
import { toaster } from "@/hooks/useUI";
import { categories, MEASUREMENT_UNITS } from "@/lib/constants";
import { returnCategory, returnCategoryName } from "@/lib/helpers";
import { DateInput } from "@/components/date";
import { useNavigate } from "react-router-dom";
import { useFarmerStore } from "store/store";

export default function ListNewProduct() {


  const createProduct = useFarmerStore((state) => state.createProduct);

  const [produce, setProduce] = useState<Product>({
    id: "0",
    categoryId: 0,
    name: "",
    description: "",
    pricePerUnit: 3,
    unit: "kg",
    quantityAvailable: 100,
    location: "",
    harvestDate: new Date().toISOString(),
    longitude: null,
    latitude: null,
    expiryDate: null
  });


  const handleCreateProduct = async () => {
    if (produce.categoryId == 0) {
      toaster.create({
        type: "error",
        description: "You have not chosen a category",
      });
      return;
    }

    const { success, message } = await createProduct(produce);

    toaster.create({
      type: success ? "success" : "error",
      description: message,
    });

    if (success) {
      navigate("../products");
    }
  };

  const navigate = useNavigate();

  return (
    <Flex justifyContent={"center"} p={8}>
      <Toaster />
      {/* --- Main Content --- */}

      <Box w={"full"} mt={4}>


        <Flex alignItems={"center"} gap={1} _hover={{ color: "gray.700", cursor: "pointer" }} transition={"all 0.3s ease"} onClick={() => navigate(-1)}>
          <Text>
            <LeftArrow />
          </Text>
          <Text fontSize="sm">Back</Text>
        </Flex>

        <Heading size="lg" color="#1a202c" mt={4}>
          List New Product
        </Heading>
        <Text color="gray.500" fontSize="sm">
          Add a new product to the marketplace
        </Text>


        <SimpleGrid columns={3} p={4} mt={4}>

          {/* --- Input Form --- */}
          <GridItem colSpan={2} shadow={"lg"} rounded={"lg"} p={4}>

            <SimpleGrid columns={2} gap={4} w={"full"} p={2}>

              <Flex direction={"column"} gap={1}>

                <Text fontSize="sm" color="gray.500" >
                  Crop/Product Name
                </Text>
                <Input
                  bg="gray.50"
                  border="none"
                  outline={"1px solid "}
                  placeholder="Rice, Potato, Yam etc"
                  rounded="lg"
                  value={produce.name}
                  onChange={(e) =>
                    setProduce((prevProduce) => ({
                      ...prevProduce,
                      name: e.target.value,
                    }))
                  }
                />
              </Flex>

              <Box alignSelf={"end"}>

                <CustomSelect
                  defaultValue={categories[0].name}
                  options={categories.slice(1).map((cat) => cat.name)}
                  value={returnCategoryName(produce.categoryId)!}
                  onChange={(e) => {
                    returnCategory(e, setProduce);
                  }}
                />
              </Box>

              <Flex direction={"column"} gap={1}>
                <Text fontSize="sm" color="gray.500" >
                  Your Selling Price (₦)
                </Text>
                <Input
                  defaultValue="12000"
                  bg="gray.50"
                  border="none"
                  outline={"1px solid "}
                  rounded="lg"
                  value={produce.pricePerUnit}
                  onChange={(e) =>
                    setProduce((prevProduce) => ({
                      ...prevProduce,
                      pricePerUnit: Number(e.target.value),
                    }))
                  }
                />
              </Flex>

              <Flex direction={"column"} gap={1} >

                <Text fontSize="sm" color="gray.500">
                  Stock Level / Quantity
                </Text>
                <Input
                  bg="gray.50"
                  border="none"
                  type="number"
                  outline={"1px solid "}
                  rounded="lg"
                  value={produce.quantityAvailable}
                  onChange={(e) =>
                    setProduce((prevProduce) => ({
                      ...prevProduce,
                      quantityAvailable: Number(e.target.value),
                    }))
                  }
                />
              </Flex>


              <Flex direction={"column"} gap={1}>
                <Text fontSize="sm" color="gray.500">
                  Measurement Unit
                </Text>
                <CustomSelect
                  defaultValue={MEASUREMENT_UNITS[0].name}
                  options={MEASUREMENT_UNITS.slice(1).map((u) => u.name)}
                  value={produce.unit}
                  onChange={(value) => {
                    setProduce((prevProduce) => ({
                      ...prevProduce,
                      unit: value as ProductUnit,
                    }))
                  }}
                />

              </Flex>

              <Flex direction={"column"} gap={1}>
                <Text fontSize="sm" color="gray.500">
                  Harvest Date
                </Text>
                <DateInput
                  // label="Harvest Date"
                  value={produce.harvestDate}
                  onChange={(e) =>
                    setProduce((prevProduce) => ({
                      ...prevProduce,
                      harvestDate: e.target.value,
                    }))
                  }
                  helperText="When was this produce harvested?"
                  error={!produce.harvestDate ? "Please select a date" : undefined}
                />
              </Flex>

              <GridItem colSpan={2}  >
                <Flex direction={"column"} gap={1}>

                  <Text fontSize={"sm"} color="gray.500">
                    Product Description
                  </Text>
                  <Textarea
                    placeholder="Type your description here..."
                    bg="gray.100"
                    outline="1px solid gray"
                    border={"none"}
                    rounded="xl"
                    rows={4}
                    value={produce.description ?? ""}
                    onChange={(e) =>
                      setProduce((prevProduce) => ({
                        ...prevProduce,
                        description: e.target.value,
                      }))
                    }
                  />
                </Flex>
              </GridItem>

              <GridItem colSpan={2}>

                <Button
                  w={"full"}
                  bg="#10a37f"
                  color="white"
                  p={6}
                  rounded="2xl"
                  fontSize="md"
                  _hover={{ bg: "#0d8a6b" }}
                  onClick={handleCreateProduct}
                >
                  Publish Listing
                </Button>
              </GridItem>

            </SimpleGrid>
          </GridItem>

          {/* --- Live Card Preview --- */}
          <Box cursor={"not-allowed"}>
            <ProductCard product={produce} navigate={() => { }} canClick={false} />
          </Box>
        </SimpleGrid>
      </Box>

    </Flex >
  );
}

// Helper Center component for layout consistency
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Center = ({ children, ...props }: any) => (
  <Flex align="" w={"full"} justify="center" {...props}>
    {children}
  </Flex>
);
