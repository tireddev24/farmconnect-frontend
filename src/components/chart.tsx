/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { categories } from "@/lib/constants";

import { Chart, useChart } from "@chakra-ui/charts";
import { Legend, Pie, PieChart, Sector } from "recharts";

export const PieChartComp = ({ users }: { users: any }) => {

  const userCounts = users.reduce((acc: any, user: any) => {
    // acc stands for "accumulator" (the object we are building)
    const role = user.role; // e.g., 'Farmer', 'Buyer', or 'Admin'

    if (role.toLowerCase() === "admin") {
      return acc;
    }

    // Initialize the role in the object if it doesn't exist, then increment
    acc[role] = (acc[role] || 0) + 1;

    return acc;
  }, {});



  const chart = useChart({
    data: [
      { name: "Farmer", value: userCounts.Farmer, color: "teal.500" },
      { name: "Buyer", value: userCounts.Buyer, color: "orange.500" },
    ],
  });

  return (
    <Chart.Root boxSize="300px" mx="auto" chart={chart}>
      <PieChart responsive>
        <Legend content={<Chart.Legend />} />
        <Pie
          isAnimationActive={true}
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

export const AreaChart = ({ data }: { data: any }) => {

  const categoryCounts = data.reduce((acc: any, product: any) => {
    const category = product.categoryName;



    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});



  const chartData = categories.map((value) => ({
    name: value.name,
    value: categoryCounts[value.name],
    color: value.color
  })).filter((item) => item?.value !== undefined)


  const chart = useChart({
    data: chartData,
  });

  return (
    <Chart.Root boxSize="300px" w={"full"} mx="auto" chart={chart}>
      <PieChart responsive>
        <Legend content={<Chart.Legend />} />
        <Pie
          isAnimationActive={true}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
          // labelLine={false}
          label={({ name, index }) => {
            const { value } = chart.data[index ?? -1]
            const percent = value / chart.getTotal("value")
            return `${name}: ${(percent * 100).toFixed(1)}%`
          }}
          shape={(props) => (
            <Sector {...props} fill={chart.color(props.payload!.color)} />
          )}
        />
      </PieChart>
    </Chart.Root>
  );
};