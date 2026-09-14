import { type Quicklink } from "@/types/types"
import { useNavigate } from "react-router-dom"
import { Box, Flex, Text } from "@chakra-ui/react"

export const QuickLink = ({ icon, label, sub, link, disabled }: Quicklink) => {
    const navigate = useNavigate();
    return (

        <Flex

            bg={{ base: "white", _dark: "#121212" }}
            p={4}
            rounded="xl"
            border="1px solid"
            borderColor={"green.400"}
            cursor="pointer"
            _hover={{ bg: { _dark: "#1a1a1a" } }}
            onClick={() => link && navigate(`../${link}`)}
            opacity={disabled ? 0.5 : 1}
            pointerEvents={disabled ? "none" : "auto"}
        >
            <Flex gap={2} alignItems="center" justifyContent={"center"}>
                <Box>
                    <Text fontWeight="bold" fontSize="sm">
                        {label}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                        {sub}
                    </Text>
                </Box>
                <Box color={{ base: "green.400", _dark: "orange.400" }} mb={2}>
                    {icon}
                </Box>
            </Flex>
        </Flex >

    );
};      