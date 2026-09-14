import { useState } from "react";
import {
  Box, Button, Container, Flex, Heading, Input, Stack, Checkbox, Text, Link, VStack, Spacer, Separator, InputElement,
} from "@chakra-ui/react";
import { Toaster } from "../../components/ui/toaster";
import { toaster } from "@/hooks/useUI";
import { Wheat } from "lucide-react";
import Spin from "../../components/ui/spinner";
import { useLogin } from "@/hooks/useAuthHooks";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading: load } = useAuth();
  const navigate = useNavigate()
  //implement for loading, awaiting data

  const { loading, loginUser } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { success, message } = await loginUser({ email, password });

      toaster.create({
        type: success ? "success" : "warning",
        description: message,
      });


    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  if (load)
    return (
      <div className="flex  justify-center items-center min-h-dvh">
        <Spin />
      </div>
    );

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <Flex
      minH="100dvh"
      bgGradient="radial(circle at center, #2aecbfff 0%, #175270ff 100%)"
      p={2}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={4}
      mx={"auto"}
      maxW={"lg"}
      color={{ base: "black", _dark: "white" }}

    >
      <Toaster />
      {/* Logo and Header */}
      <VStack spaceX={2} >
        <Box
          bgGradient={"to-r"}
          gradientFrom={{ base: "green.600/90", _dark: "#c9a962" }}
          gradientTo={{ base: "green.600/80", _dark: "#8a7557" }}
          h={12}
          rounded={"lg"}
          color={{ base: "white", _dark: "#0a0a0a" }}
          p={2}
        >
          <Wheat size={"sm"} />
        </Box>

        <Heading
          size="xl"
          fontWeight="800"
          letterSpacing="tight"
          color={{ base: "gray.800", _dark: "gray.200" }}
        >
          Welcome Back
        </Heading>
        <Text fontSize="md" color="gray.500">
          Access the Agricultural Marketplace
        </Text>
      </VStack>

      {/* Login Card */}
      <Container
        bg={{ base: "white", _dark: "gray.800" }}

        p={10}
        rounded="3xl"
        shadow="0 20px 25px -5px rgba(0, 0, 0, 0.05)"
        border="1px solid"
        borderColor={{ base: "gray.100", _dark: "gray.800" }}

      >
        <form>
          <Stack gap={6} >
            {/* Email */}
            <Box>
              <Text fontWeight="semibold" mb={2} ml={1}>
                Email
              </Text>
              <InputElement h="12">
                {/* <User /> */}
              </InputElement>
              <Input
                placeholder="Enter your email"

                rounded="lg"
                color={{ base: "black", _dark: "white" }}
                borderColor="gray.200"
                _focus={{
                  borderColor: { base: "#10a37f", _dark: "yellow.500" },
                  ring: "2px",
                  ringColor: { base: "emerald.50", _dark: "yellow.50" },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            {/* Password */}
            <Box>
              <Text fontWeight="semibold" mb={2} ml={1}>
                Password
              </Text>

              <InputElement h="12">

                {/* <Lock /> */}
              </InputElement>
              <Input

                type="password"
                placeholder="••••••••"
                color={{ base: "black", _dark: "white" }}
                p={3}
                rounded="lg"
                borderColor="gray.200"
                _focus={{
                  borderColor: { base: "#10a37f", _dark: "yellow.500" },
                  ring: "2px",
                  ringColor: { base: "emerald.50", _dark: "yellow.50" },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </Box>

            {/* Remember Me & Forgot Password */}
            <Flex align="center">
              <Checkbox.Root
                colorPalette={"emerald"}
                size={"sm"}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Remember me</Checkbox.Label>
              </Checkbox.Root>
              <Spacer />
              <Link
                // to="/forgot-password"
                fontSize="sm"
                fontWeight="bold"
                color={{ base: "#10a37f", _dark: "yellow.400" }}
              >
                Forgot Password?
              </Link>
            </Flex>

            <Button
              type="submit"
              py={6}
              fontSize="md"
              fontWeight="bold"
              rounded="2xl"
              bg={{ base: "#10a37f", _dark: "yellow.500" }}
              _hover={{
                bg: { base: "#0e8c6d", _dark: "yellow.600" },
                shadow: "md",
              }}
              _active={{ transform: "scale(0.98)" }}
              shadow={{
                base: "0 8px 15px rgba(16, 163, 127, 0.25)",
                _dark: "none",
              }}
              onClick={handleSubmit}
            >
              {loading ? <Spin /> : "Log In"}
            </Button>
          </Stack>
        </form>

        <Separator my={4} borderColor={{ base: "gray.100", _dark: "gray.800" }} />


        <Flex fontSize="sm" justify={"center"} color={{ base: "gray.700", _dark: "gray.300" }} textAlign={"center"}>
          Don't have an account?
          <Text ml={2} fontWeight={"bold"} color={"green.500"}>

            <Box
              onClick={() => navigate("register")}
              className="font-bold text-green-700 dark:text-yellow-400 cursor-pointer"
            >
              Create Account
            </Box>
          </Text>
        </ Flex>
      </Container>


    </Flex>
  );
}
