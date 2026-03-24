import { Flex, Center, Icon, Box, Text } from "@chakra-ui/react";
import { AlertTriangle, Info } from "lucide-react";
const AlertItem = ({
  type,
  title,
  desc,
  time,
}: {
  type: string;
  title: string;
  desc: string;
  time: string;
}) => {
  const isWarning = type === "warning";
  return (
    <Flex
      p={4}
      rounded="2xl"
      bg={isWarning ? "orange.50" : "blue.50"}
      border="1px solid"
      borderColor={isWarning ? "orange.100" : "blue.100"}
      gap={4}
    >
      <Center boxSize="10" bg="white" rounded="lg">
        <Icon
          as={isWarning ? AlertTriangle : Info}
          color={isWarning ? "orange.400" : "blue.400"}
          fontSize={20}
        />
      </Center>
      <Box flex={1}>
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="sm">
            {title}
          </Text>
          <Text fontSize="xs" color="gray.400">
            {time}
          </Text>
        </Flex>
        <Text fontSize="xs" color="gray.500">
          {desc}
        </Text>
      </Box>
    </Flex>
  );
};

export default AlertItem;
