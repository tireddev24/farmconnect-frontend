import { Box, Link, Text } from "@chakra-ui/react";

import React from "react";
import { LeftArrow } from "./ui/icons";
import { ColorModeButton } from "./ui/color-mode";

const ProductTab = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
    >
      <Link href="../dashboard">
        <LeftArrow />
        <Text>Back to Market</Text>
      </Link>
      <Text as={"h1"}>FARMCONNECT</Text>
      <ColorModeButton />
    </Box>
  );
};

export default ProductTab;
