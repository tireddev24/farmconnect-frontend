import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { SearchAlert } from "lucide-react";
import { Link } from "react-router-dom";

const Nopage = () => {
  return (

    <Flex
      h={"100dvh"}
      justifyContent={"center"}
      alignItems={"center"}
      p={4}
      flexDirection={"column"}
      gap={"5"}
    >
      <VStack spaceY={10}>
        <SearchAlert className="size-[150px]" color={"red"} />
        <Heading fontSize={"5xl"} color={"red.500"}>
          404 | PAGE NOT FOUND
        </Heading>
        <Text fontWeight={"bold"}>
          The page you are looking for does not exist.
        </Text>

        <Link
          to={"/"}

        >
          <Button
            fontWeight={"bold"}
            p={3}
            colorPalette={{ base: "green", _dark: "yellow" }}
            size={"lg"}
          >

            Go to Homepage
          </Button>
        </Link>
      </VStack>
    </Flex>

  );
};

export default Nopage;
