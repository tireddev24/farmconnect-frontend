import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Icon,
  Circle,
  Button,
  Input,
  InputGroup,
  InputElement,
  Table,
  TableBody,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { Sun, Check, Search } from "lucide-react";

const UserManagement = () => {
  return (
    <Flex minH="100vh" bg="#f8fafb">
      {/* --- Main Content --- */}
      <Box flex={1} p={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">User Management</Heading>
            <Text color="gray.500" fontSize="sm">
              System status and key metrics.
            </Text>
          </Box>
          <Circle
            size="10"
            bg="white"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
          >
            <Icon as={Sun} fontSize={18} color="gray.400" />
          </Circle>
        </Flex>

        {/* 1. Pending Farmer Verifications Table */}
        <Box
          bg="white"
          p={8}
          rounded="3xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.100"
          mb={8}
        >
          <HStack mb={6} color="emerald.600">
            <Icon as={Check} fontSize={20} />
            <Heading size="md" color="gray.800">
              Pending Farmer Verifications
            </Heading>
          </HStack>

          <Table.Root size="sm">
            <Table.Header>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Name
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Location
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                NIN Number
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Date Applied
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="gray.400"
                textTransform="none"
                textAlign="right"
              >
                Action
              </Table.ColumnHeader>
            </Table.Header>
            <TableBody>
              <VerificationRow
                name="Musa Ibrahim"
                location="Kano State"
                nin="12903847561"
                date="Feb 20, 2026"
              />
              <VerificationRow
                name="Chinedu Okeke"
                location="Enugu State"
                nin="55403928172"
                date="Feb 21, 2026"
              />
              <VerificationRow
                name="Folake Adebayo"
                location="Ogun State"
                nin="99201837465"
                date="Feb 22, 2026"
              />
            </TableBody>
          </Table.Root>
        </Box>

        {/* 2. All Users Table */}
        <Box
          bg="white"
          p={8}
          rounded="3xl"
          shadow="sm"
          border="1px solid"
          borderColor="gray.100"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="md" color="gray.800">
              All Users
            </Heading>
            <InputGroup maxW="300px">
              <>
                <InputElement pointerEvents="none">
                  <Icon as={Search} color="gray.400" fontSize={18} />
                </InputElement>
                <Input
                  placeholder="Search users..."
                  bg="gray.50"
                  border="none"
                  rounded="lg"
                  fontSize="sm"
                />
              </>
            </InputGroup>
          </Flex>

          <Table.Root size="sm">
            <Table.Header>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                User
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Role
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.400" textTransform="none">
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="gray.400"
                textTransform="none"
                textAlign="right"
              >
                Manage
              </Table.ColumnHeader>
            </Table.Header>
            <TableBody>
              <UserRow name="Farmer John" role="Farmer" status="ACTIVE" />
              <UserRow name="Buyer Sarah" role="Buyer" status="ACTIVE" />
              <UserRow name="Logistics Co." role="Logistics" status="BANNED" />
              <UserRow name="Admin User" role="Admin" status="ACTIVE" />
              <UserRow name="Iya Basit" role="Buyer" status="ACTIVE" />
            </TableBody>
          </Table.Root>
        </Box>
      </Box>
    </Flex>
  );
};

// --- Sub-components to keep code clean ---

const VerificationRow = ({ name, location, nin, date }: any) => (
  <Table.Row>
    <Table.Cell fontWeight="bold" py={4}>
      {name}
    </Table.Cell>
    <Table.Cell color="gray.500">{location}</Table.Cell>
    <Table.Cell color="gray.500">{nin}</Table.Cell>
    <Table.Cell color="gray.500">{date}</Table.Cell>
    <Table.Cell textAlign="right">
      <HStack justify="flex-end" spaceX={2}>
        <IconButton
          size="xs"
          bg="emerald.50"
          color="emerald.500"
          //   icon={<Check size={14} />}
          aria-label="Approve"
        />
        <IconButton
          size="xs"
          bg="red.50"
          color="red.500"
          //   icon={<X size={14} />}
          aria-label="Reject"
        />
      </HStack>
    </Table.Cell>
  </Table.Row>
);

const UserRow = ({ name, role, status }: any) => {
  const isBanned = status === "BANNED";
  return (
    <Table.Row>
      <Table.Cell fontWeight="bold" py={4}>
        {name}
      </Table.Cell>
      <Table.Cell color="gray.500">{role}</Table.Cell>
      <Table.Cell>
        <Badge
          bg={isBanned ? "red.50" : "emerald.50"}
          color={isBanned ? "red.500" : "emerald.500"}
          fontSize="10px"
          px={2}
          rounded="md"
        >
          {status}
        </Badge>
      </Table.Cell>
      <Table.Cell textAlign="right">
        <Button
          variant="ghost"
          size="xs"
          color={isBanned ? "emerald.500" : "red.500"}
          fontWeight="bold"
        >
          {isBanned ? "Unban" : "Ban"}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default UserManagement;
