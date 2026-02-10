import { Box, Heading, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <Heading>Dashboard</Heading>
      <Text mt={2}>Welcome back, {user?.name}</Text>

      {user?.role === "FARMER" && <Box mt={4}>Farmer Controls Here</Box>}

      {user?.role === "BUYER" && <Box mt={4}>Buyer Marketplace Here</Box>}
    </Layout>
  );
}
