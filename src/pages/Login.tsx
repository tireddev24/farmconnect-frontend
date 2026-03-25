import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  Stack,
  Checkbox,
  Text,
  Icon,
  Link,
  VStack,
  Center,
  Spacer,
  Separator,
  InputElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowLeft } from "lucide-react";
import { Toaster, toaster } from "../components/ui/toaster";
import { Wheat } from "lucide-react";
import Spin from "../components/ui/spinner";
import useLogin from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading: load } = useAuth();
  //implement for loading, awaiting data

  const { loading, loginUser } = useLogin();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { success, message } = await loginUser({ email, password });

      toaster.create({
        type: success ? "success" : "warning",
        description: message,
      });

      if (success) {
        window.location.reload();
        // setTimeout(() => navigate("/dashboard"), 500);
      }
    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  // if (user) {
  //   navigate("../dashboard");
  //   // window.location.reload();
  // }
  if (load)
    return (
      <div className="flex  justify-center items-center min-h-dvh">
        <Spin />
      </div>
    );
  return (
    <Box
      minH="100vh"
      bgGradient="radial(circle at center, #f0fdfa 0%, #f8fafb 100%)"
      position="relative"
      p={6}
    >
      <Toaster />

      <Center flexDirection="column" mt={10}>
        {/* Logo and Header */}
        <VStack spaceX={2} mb={10}>
          <Box
            bgGradient={"to-r"}
            gradientFrom={{ base: "green.600/90", _dark: "#c9a962" }}
            gradientTo={{ base: "green.600/80", _dark: "#8a7557" }}
            className=" w-10 h-10 rounded-xl  flex items-center justify-center"
            color={{ base: "white", _dark: "#0a0a0a" }}
          >
            <Wheat className="w-5 h-5 " />
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
          maxW="md"
          bg={{ base: "white", _dark: "gray.800" }}
          p={10}
          rounded="3xl"
          shadow="0 20px 25px -5px rgba(0, 0, 0, 0.05)"
          border="1px solid"
          borderColor={{ base: "gray.100", _dark: "gray.800" }}
        >
          <form>
            <Stack gap={6} color={"white"}>
              {/* Username */}
              <Box>
                <Text fontSize="xs" fontWeight="bold" mb={2} ml={1}>
                  Email
                </Text>
                <InputGroup>
                  <>
                    <InputElement h="12">
                      <Icon as={User} color="gray.400" />
                    </InputElement>
                    <Input
                      placeholder="Enter your email"
                      pl="11"
                      h="12"
                      rounded="xl"
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
                  </>
                </InputGroup>
              </Box>

              {/* Password */}
              <Box>
                <Text fontSize="xs" fontWeight="bold" mb={2} ml={1}>
                  Password
                </Text>
                <InputGroup>
                  <>
                    <InputElement h="12">
                      <Icon as={Lock} color="gray.400" />
                    </InputElement>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      color={{ base: "black", _dark: "white" }}
                      pl="11"
                      h="12"
                      rounded="xl"
                      borderColor="gray.200"
                      _focus={{
                        borderColor: { base: "#10a37f", _dark: "yellow.500" },
                        ring: "2px",
                        ringColor: { base: "emerald.50", _dark: "yellow.50" },
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </>
                </InputGroup>
              </Box>

              {/* Remember Me & Forgot Password */}
              <Flex align="center">
                <Checkbox.Root
                  colorPalette={"emerald"}
                  size={"sm"}
                  color={"gray.600"}
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
                color={{ base: " white", _dark: "black" }}
                h="14"
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

          <Separator mt={8} borderColor="gray.100" />

          <Center mt={6}>
            <Text fontSize="sm" color="gray.500">
              Don't have an account?{" "}
              <Link
                as={Link}
                href="/register"
                color={{ base: "#10a37f", _dark: "yellow.400" }}
                fontWeight="bold"
              >
                Create Account
              </Link>
            </Text>
          </Center>
        </Container>

        {/* Footer Link */}
        <Link
          as={Link}
          href="/dashboard"
          mt={10}
          display="flex"
          alignItems="center"
          gap={2}
          color="gray.500"
          fontSize="sm"
          fontWeight="medium"
          _hover={{ color: "gray.800", textDecoration: "none" }}
        >
          <Icon as={ArrowLeft} fontSize={16} />
          Back to Market
        </Link>
      </Center>
    </Box>
  );
}
