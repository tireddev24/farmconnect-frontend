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
import { login } from "../api/auth";
import { toaster } from "../components/ui/toaster";
import { Wheat } from "lucide-react";
import Spin from "../components/ui/spinner";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { success, message } = await login({ username, password });

      toaster.create({
        type: success ? "success" : "warning",
        description: message,
      });

      if (success) {
        setTimeout(() => navigate("/dashboard"), 500);
      }
    } catch (err) {
      alert("Invalid credentials");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="radial(circle at center, #f0fdfa 0%, #f8fafb 100%)"
      position="relative"
      p={6}
    >
      <Box
        position="absolute"
        top="-10%"
        left="-10%"
        w="500px"
        h="500px"
        bg="green.200"
        filter="blur(80px)"
        opacity={0.6}
        rounded="full"
      />
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
            color="gray.800"
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
          bg="white"
          p={10}
          rounded="3xl"
          shadow="0 20px 25px -5px rgba(0, 0, 0, 0.05)"
          border="1px solid"
          borderColor="gray.100"
        >
          <form>
            <Stack gap={6}>
              {/* Username */}
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.500"
                  mb={2}
                  ml={1}
                >
                  Username
                </Text>
                <InputGroup>
                  <>
                    <InputElement h="12">
                      <Icon as={User} color="gray.400" />
                    </InputElement>
                    <Input
                      placeholder="Enter your username"
                      pl="11"
                      h="12"
                      rounded="xl"
                      bg="white"
                      borderColor="gray.200"
                      _focus={{
                        borderColor: "#10a37f",
                        ring: "2px",
                        ringColor: "emerald.50",
                      }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </>
                </InputGroup>
              </Box>

              {/* Password */}
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.500"
                  mb={2}
                  ml={1}
                >
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
                      pl="11"
                      h="12"
                      rounded="xl"
                      bg="white"
                      borderColor="gray.200"
                      _focus={{
                        borderColor: "#10a37f",
                        ring: "2px",
                        ringColor: "emerald.50",
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
                  color="#10a37f"
                >
                  Forgot Password?
                </Link>
              </Flex>

              <Button
                type="submit"
                bg="#10a37f"
                color="white"
                h="14"
                fontSize="md"
                fontWeight="bold"
                rounded="2xl"
                _hover={{ bg: "#0e8c6d", shadow: "lg" }}
                _active={{ transform: "scale(0.98)" }}
                shadow="0 8px 15px rgba(16, 163, 127, 0.25)"
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
                color="#10a37f"
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
