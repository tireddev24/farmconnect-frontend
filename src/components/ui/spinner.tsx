import { VStack, Spinner } from "@chakra-ui/react";

const Spin = ({ color = "teal.500" }: { color?: string }) => {
  return (
    <VStack>
      <Spinner
        color={{ base: color, _dark: "yellow.700" }}
        css={{ "--spinner-track-color": "colors.gray.200" }}
      />
    </VStack>
  );
};

export default Spin;
