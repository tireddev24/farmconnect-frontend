import { Box, Button, Input, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { getMe, login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await login({ email, password });
      // await getMe();
      navigate("/dashboard");
    } catch (err: any) {
      alert("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <Box
      h="100vh"
      display="flex"
      w={"svw"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack justifyContent={"center"}>
        <Heading>Login</Heading>
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color={"black"} w="100%" onClick={handleSubmit}>
          Login
        </Button>
      </VStack>
    </Box>
  );
}
