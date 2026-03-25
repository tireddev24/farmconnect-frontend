import { Header } from "../components/header";
import { TableBody, Table, Box } from "@chakra-ui/react";

const Market = () => {
  return (
    <div className="bg-[#0a0a0a] w-full text-gray-200 font-sans flex">
      <main className=" flex-col w-full">
        <Header
          title="Market Insights"
          subtitle="Price trends and predictions"
        />
        <Box alignSelf={"center"} p={2} rounded={"lg"}>
          <Table.Root border={"none"} p={2} bg={"whiteAlpha.100"}>
            <Table.Header>
              <Table.ColumnHeader
                color={"gray.500"}
                className="uppercase font-bold text-sm text-gray-500"
              >
                Product
              </Table.ColumnHeader>

              <Table.ColumnHeader
                color={"gray.500"}
                className="uppercase font-bold text-sm text-gray-500"
              >
                Current Price
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color={"gray.500"}
                className="uppercase font-bold text-sm text-gray-500"
              >
                Availability
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color={"gray.500"}
                className="uppercase font-bold text-sm text-gray-500"
              >
                7-Day Trend
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color={"gray.500"}
                className="uppercase font-bold text-sm text-gray-500"
              >
                Status
              </Table.ColumnHeader>
            </Table.Header>
            <TableBody></TableBody>
          </Table.Root>
        </Box>
      </main>
    </div>
  );
};

export default Market;
