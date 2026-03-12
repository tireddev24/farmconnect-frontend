import { Flex, Center, Icon, Box, Text } from "@chakra-ui/react";
import type { ElementType } from "react";

const StatCard = ({
  label,
  value,
  icon,
  iconColor,
  iconBg,
}: {
  label: string;
  value: string;
  icon: ElementType | undefined;
  iconColor: string;
  iconBg: string;
}) => (
  <Flex
    bg={{ base: "white", _dark: "gray.800" }}
    p={6}
    rounded="2xl"
    shadow="sm"
    border="1px solid"
    borderColor="gray.100"
    align="center"
    justify="space-between"
  >
    <Box>
      <Text
        color={{ base: "gray.500", _dark: "yellow.500" }}
        fontSize="xs"
        fontWeight="bold"
        mb={1}
      >
        {label}
      </Text>
      <Text
        fontSize="2xl"
        fontWeight="800"
        color={{ base: "black", _dark: "white" }}
      >
        {value}
      </Text>
    </Box>
    <Center boxSize="12" bg={iconBg} rounded="xl">
      <Icon as={icon} fontSize={24} color={iconColor} />
    </Center>
  </Flex>
);

export default StatCard;
