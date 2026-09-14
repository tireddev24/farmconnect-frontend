import { VStack, Spinner } from "@chakra-ui/react";

const Spin = ({ color = "teal.500", h = "max" }: { color?: string, h?: string }) => {
  return (
    <VStack minH={h} justifyContent={"center"}>
      <Spinner
        color={{ base: color, _dark: "yellow.700" }}
        css={{ "--spinner-track-color": "colors.gray.200" }}
      />
    </VStack >
  );
};

export default Spin;
