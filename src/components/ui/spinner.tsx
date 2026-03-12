import { VStack, Spinner } from "@chakra-ui/react";

const Spin = () => {
  return (
    <VStack>
      <Spinner
        color={{ base: "teal.500", _dark: "yellow.700" }}
        css={{ "--spinner-track-color": "colors.gray.200" }}
      />
    </VStack>
  );
};

export default Spin;
