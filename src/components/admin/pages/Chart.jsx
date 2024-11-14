import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { getChartData } from "@/components/service/ApiFunctions";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

const chartConfig = {
  Quantity: {
    label: "Quantity",
    format: (value) => value,
  },
};

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getChartData();
      setData(response.data?.data);
    };
    fetchData();
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[100px] max-h-96 w-full"
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="quantity" fill="#4A628A" radius={5} />
      </BarChart>
    </ChartContainer>
  );
};

export default Chart;
