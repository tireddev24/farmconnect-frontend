import { Box } from "@chakra-ui/react";
import Spin from "./spinner";

const Loader = () => {
  return (
    <Box
      minH={"100vh"}
      minW={"full"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spin />
    </Box>
  );
};

export default Loader;
