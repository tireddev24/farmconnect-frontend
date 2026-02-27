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
  Text,
  SimpleGrid,
  Icon,
  Link,
  VStack,
  Center,
  InputElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

import { Wheat } from "lucide-react";
import {
  LeftArrow,
  PadLock,
  User,
  Location as MapPin,
  ShieldCheck,
} from "../components/ui/icons";
import CustomSelect from "../components/customselect";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [nin, setNin] = useState("");
  const [role, setRole] = useState("Buyer (Retail/Wholesale)");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        firstname,
        lastname,
        password,
        role,
        address,
        nin,
        username,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <Box
      minH="100vh"
      bg="#f8fafb"
      position="relative"
      overflow="hidden"
      py={10}
    >
      {/* Decorative Background Elements */}
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        w="500px"
        h="500px"
        bg="emerald.50"
        filter="blur(80px)"
        opacity={0.6}
        rounded="full"
      />

      <Center flexDirection="column" zIndex={1}>
        {/* Logo Section */}
        <VStack spaceX={1} mb={8}>
          <Flex align="center" gap={2}>
            <Box
              bgGradient={"to-r"}
              gradientFrom={{ base: "green.600/90", _dark: "#c9a962" }}
              gradientTo={{ base: "green.600/80", _dark: "#8a7557" }}
              className=" w-10 h-10 rounded-xl  flex items-center justify-center"
              color={{ base: "white", _dark: "#0a0a0a" }}
            >
              <Wheat className="w-5 h-5 " />
            </Box>
            <Heading size="md" fontWeight={"bold"} color="gray.800">
              FARMCONNECT
            </Heading>
          </Flex>
          <Text fontSize="sm" color="gray.500">
            Create your trading account
          </Text>
        </VStack>

        {/* Form Card */}
        <Container
          maxW="lg"
          bg="white"
          p={10}
          rounded="3xl"
          boxShadow="sm"
          border="1px solid"
          borderColor="gray.100"
        >
          <form onSubmit={handleSubmit}>
            <Stack spaceX={0}>
              {/* Names Row */}
              <SimpleGrid columns={2} spaceX={4}>
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="gray.500"
                    mb={1}
                    ml={1}
                  >
                    First Name
                  </Text>
                  <Input
                    placeholder="John"
                    variant="outline"
                    h="12"
                    rounded="xl"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Box>
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="gray.500"
                    mb={1}
                    ml={1}
                  >
                    Last Name
                  </Text>
                  <Input
                    placeholder="Doe"
                    h="12"
                    rounded="xl"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Box>
              </SimpleGrid>

              {/* DOB and Phone */}
              <SimpleGrid columns={2} spaceX={4}>
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="gray.500"
                    mb={1}
                    ml={1}
                  >
                    Date of Birth
                  </Text>
                  <InputGroup>
                    <>
                      <Input
                        type="date"
                        h="12"
                        rounded="xl"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </>
                  </InputGroup>
                </Box>
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="gray.500"
                    mb={1}
                    ml={1}
                  >
                    Phone Number
                  </Text>
                  <InputGroup>
                    <>
                      <Input
                        placeholder="080..."
                        h="12"
                        rounded="xl"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />
                    </>
                  </InputGroup>
                </Box>
              </SimpleGrid>

              {/* Residential Address */}
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.500"
                  mb={1}
                  ml={1}
                >
                  Residential Address
                </Text>
                <InputGroup>
                  <>
                    <InputElement h="12">
                      <Icon as={MapPin} fontSize={"xl"} color="gray.400" />
                    </InputElement>
                    <Input
                      placeholder="Street, City, State"
                      pl="10"
                      h="12"
                      rounded="xl"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </>
                </InputGroup>
              </Box>

              {/* NIN */}
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.500"
                  mb={1}
                  ml={1}
                >
                  NIN (Verification)
                </Text>
                <InputGroup>
                  <>
                    <InputElement h="12">
                      <Icon as={ShieldCheck} fontSize={"xl"} color="gray.400" />
                    </InputElement>
                    <Input
                      placeholder="11-digit NIN"
                      pl="10"
                      h="12"
                      rounded="xl"
                      value={nin}
                      onChange={(e) => setNin(e.target.value)}
                    />
                  </>
                </InputGroup>
              </Box>

              {/* Account Role */}
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.500"
                  mb={1}
                  ml={1}
                >
                  Account Role
                </Text>
                <InputGroup>
                  <>
                    <CustomSelect
                      defaultValue="BUYER"
                      options={["Buyer", "Farmer", "Transporter"]}
                      value={role}
                      onChange={(e) => setRole(e)}
                    />
                  </>
                </InputGroup>
              </Box>

              {/* Username */}
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.500"
                  mb={1}
                  ml={1}
                >
                  Username
                </Text>
                <InputGroup>
                  <>
                    <InputElement h="12">
                      <Icon as={User} fontSize={"md"} color="gray.400" />
                    </InputElement>
                    <Input
                      placeholder="Create a username"
                      pl="10"
                      h="12"
                      rounded="xl"
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
                  mb={1}
                  ml={1}
                >
                  Password
                </Text>
                <InputGroup>
                  <>
                    <InputElement h="12">
                      <Icon as={PadLock} fontSize={"xl"} color="gray.400" />
                    </InputElement>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      pl="10"
                      h="12"
                      rounded="xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </>
                </InputGroup>
              </Box>

              <Button
                type="submit"
                bg="#10a37f"
                color="white"
                h="14"
                fontSize="md"
                fontWeight="bold"
                rounded="xl"
                _hover={{ bg: "#0e8c6d" }}
                _active={{ transform: "scale(0.98)" }}
                boxShadow="0 4px 14px 0 rgba(16, 163, 127, 0.39)"
                mt={4}
              >
                Create Account
              </Button>
            </Stack>
          </form>

          <Center mt={8}>
            <Text fontSize="sm" color="gray.500" fontWeight={"semibold"}>
              Already have an account? <Link color="green.600">Log In</Link>
            </Text>
          </Center>
        </Container>

        {/* Footer Link */}
        <Link
          href="../dashboard"
          mt={8}
          display="flex"
          alignItems="center"
          gap={2}
          color="gray.500"
          fontSize="sm"
          _hover={{ color: "gray.800", textDecoration: "none" }}
        >
          <LeftArrow />
          Back to Market
        </Link>
      </Center>
    </Box>
  );
}
