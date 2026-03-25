import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { logout } from "../api/auth";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <Box>
      <Flex
        bg="green.600"
        p={4}
        color="white"
        justify="space-between"
        align="center"
      >
        <Heading size="md">FarmConnect</Heading>
        <Button size="sm" onClick={() => handleLogout()}>
          Logout
        </Button>
      </Flex>

      <Box p={6}>{children}</Box>
    </Box>
  );
}
