import { Text, VStack } from "@chakra-ui/react";
import { MdError } from "react-icons/md";

const Notauthorized = () => {
  return (
    <VStack
      minH={"80vh"}
      justifyContent={"center"}
      color={"red.600"}
      minW={"md"}
      mx={"auto"}
    >
      <Text fontSize={"8xl"}>
        <MdError />
      </Text>
      <Text fontWeight={"bolder"} fontSize={"5xl"}>
        You are not authorized to view this page!
      </Text>
    </VStack>
  );
};

export default Notauthorized;
