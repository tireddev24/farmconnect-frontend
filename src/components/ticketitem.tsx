import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";

const TicketItem = ({
  title,
  from,
  id,
  actionLabel,
}: {
  title: string;
  from: string;
  id: string;
  actionLabel: string;
}) => (
  <Flex
    p={6}
    rounded="2xl"
    border="1px solid"
    borderColor="gray.50"
    align="center"
    transition="0.2s"
    _hover={{ borderColor: "gray.200", shadow: "sm" }}
  >
    <Box>
      <Text fontWeight="bold" color="gray.800" fontSize="md">
        {title}
      </Text>
      <Text fontSize="xs" color="gray.400">
        From: {from} • ID: {id}
      </Text>
    </Box>
    <Spacer />
    <Button
      variant="outline"
      size="sm"
      px={6}
      rounded="xl"
      fontSize="xs"
      color="gray.600"
      borderColor="gray.200"
      _hover={{ bg: "gray.50" }}
    >
      {actionLabel}
    </Button>
  </Flex>
);

export default TicketItem;
