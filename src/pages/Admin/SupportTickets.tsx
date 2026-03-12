import { Box, Flex, Heading, Text, Stack } from "@chakra-ui/react";

import TicketItem from "../../components/ticketitem";

const SupportTickets = () => {
  return (
    <Flex minH="100vh" bg="#f8fafb">
      {/* --- Main Content Area --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">Support Tickets</Heading>
            <Text color="gray.500" fontSize="sm">
              System status and key metrics.
            </Text>
          </Box>
        </Flex>

        {/* --- Tickets Card --- */}
        <Box
          bg="white"
          p={10}
          rounded="3xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading size="md" mb={8} color="gray.800">
            Support Tickets
          </Heading>

          <Stack spaceX={4}>
            <TicketItem
              title="Payment failed but deducted"
              from="Buyer Sarah"
              id="T-992"
              actionLabel="Resolve"
            />
            <TicketItem
              title="Cannot update stock count"
              from="Farmer John"
              id="T-993"
              actionLabel="Archive"
            />
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default SupportTickets;
