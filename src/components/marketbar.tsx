import { Box, HStack, Text } from "@chakra-ui/react";
import { Dot, Clock4, ClosedBox, Users } from "../components/ui/icons";

const MarketBar = () => {
  return (
    <Box
      // bg={{ base: "gray.50", _dark: "black" }}
      borderY={"1px solid "}
      borderColor={{ base: "gray.200", _dark: "gray.100/10" }}
      p={3}
      px={6}
      display={"flex"}
      alignItems={"center"}
      gap={6}
      fontSize={"sm"}
    >
      <HStack color={"green.300"}>
        <Dot color="green" />
        <Text color={{ base: "black", _dark: "gray.400" }}>Live Market</Text>
      </HStack>
      <HStack>
        <Text color={{ base: "green.500", _dark: "yellow.300/70" }}>
          <Users />
        </Text>
        <Text color={{ base: "black", _dark: "white" }}>2,847</Text>
        <Text>Active Traders</Text>
      </HStack>
      <HStack>
        <Text color={{ base: "green.500", _dark: "yellow.300/70" }}>
          <ClosedBox />
        </Text>
        <Text color={{ base: "black", _dark: "white" }}> 2,847</Text>
        <Text>Tons Traded</Text>
      </HStack>
      <HStack>
        <Text color={{ base: "green.500", _dark: "yellow.300/70" }}>
          <Clock4 />
        </Text>
        <Text>Updated</Text>
        <Text color={{ base: "black", _dark: "white" }}>Just now</Text>
      </HStack>
    </Box>
  );
};

export default MarketBar;
