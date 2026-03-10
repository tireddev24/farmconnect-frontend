import { Flex, Center, Icon, Box, Text } from "@chakra-ui/react";

const StatCard = ({ label, value, icon, iconColor, iconBg }: any) => (
  <Flex
    bg="white"
    p={6}
    rounded="2xl"
    shadow="sm"
    border="1px solid"
    borderColor="gray.100"
    align="center"
    justify="space-between"
  >
    <Box>
      <Text color="gray.500" fontSize="xs" fontWeight="bold" mb={1}>
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="800">
        {value}
      </Text>
    </Box>
    <Center boxSize="12" bg={iconBg} rounded="xl">
      <Icon as={icon} fontSize={24} color={iconColor} />
    </Center>
  </Flex>
);

export default StatCard;
