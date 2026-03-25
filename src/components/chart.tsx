/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Chart, useChart } from "@chakra-ui/charts";
import { Legend, Pie, PieChart, Sector } from "recharts";

const PieChartComp = ({ users }: { users: any }) => {
  console.log(users);
  const userCounts = users.reduce((acc: any, user: any) => {
    // acc stands for "accumulator" (the object we are building)
    const role = user.role; // e.g., 'Farmer', 'Buyer', or 'Admin'

    // Initialize the role in the object if it doesn't exist, then increment
    acc[role] = (acc[role] || 0) + 1;

    return acc;
  }, {});

  const chart = useChart({
    data: [
      { name: "Farmer", value: userCounts.Farmer, color: "teal.solid" },
      { name: "Buyer", value: userCounts.Buyer, color: "orange.solid" },
    ],
  });

  return (
    <Chart.Root boxSize="300px" mx="auto" chart={chart}>
      <PieChart responsive>
        <Legend content={<Chart.Legend />} />
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
          shape={(props) => (
            <Sector {...props} fill={chart.color(props.payload!.color)} />
          )}
        />
      </PieChart>
    </Chart.Root>
  );
};

export default PieChartComp;
