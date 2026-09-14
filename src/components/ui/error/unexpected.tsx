import { VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Unexpected = ({ error }: { error: boolean }) => {
  const [count, setCount] = useState<number>(30);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (error && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    if (count === 0) {
      window.location.reload();
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [error, count]);

  return (
    <VStack
      w={"full"}
      bg={"whiteALpha.100"}
      spaceX={4}
      align="center"
      justify="center"
      height="100vh"
    >
      <Text fontSize={"3xl"} color={"red.300"} fontWeight={"bold"}>
        Oops!
      </Text>
      <Text fontSize="xl">An unexpected runtime error occurred.</Text>
      <Text fontSize="lg">
        {count > 0
          ? `Retrying in ${count} second${count !== 1 ? "s" : ""}...`
          : "Reloading..."}
      </Text>
    </VStack>
  );
};

export default Unexpected;
