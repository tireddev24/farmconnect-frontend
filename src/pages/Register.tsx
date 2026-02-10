import { Box, Button, Input, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/customselect";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Farmer");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await register({ name, email, password, role });
      navigate("/dashboard");
    } catch (err: any) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spaceX={4} w="350px">
        <Heading>Register</Heading>
        <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />

        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <CustomSelect
          defaultValue="Select_Role"
          value={role}
          onChange={(value) => setRole(value)}
          options={["Farmer", "Buyer", "Admin"]}
        />

        <Button colorScheme="green" w="100%" onClick={handleSubmit}>
          Register
        </Button>
      </VStack>
    </Box>
  );
}
