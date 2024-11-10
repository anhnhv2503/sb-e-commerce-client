import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartData } from "@/data/chartData";

const chartConfig = {
  "T-Shirt": {
    label: "T-Shirt",
  },
  Blazer: {
    label: "Blazer",
  },
  Jacket: {
    label: "Jacket",
  },
  Polo: {
    label: "Polo",
  },
  Shirt: {
    label: "Shirt",
  },
  Pants: {
    label: "Pants",
  },
};

const Chart = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[100px] max-h-96 w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="T-Shirt" fill="#FF8000" radius={9} />
        <Bar dataKey="Blazer" fill="#4C1F7A" radius={9} />
        <Bar dataKey="Jacket" fill="#219B9D" radius={9} />
        <Bar dataKey="Polo" fill="#A2D2DF" radius={9} />
        <Bar dataKey="Shirt" fill="#BC7C7C" radius={9} />
        <Bar dataKey="Pants" fill="#E4C087" radius={9} />
      </BarChart>
    </ChartContainer>
  );
};

export default Chart;
