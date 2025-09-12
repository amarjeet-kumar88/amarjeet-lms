"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

const dummyEnrollmentData = [
  { date: "2025-09-12", enrollments: 12 },
  { date: "2025-09-13", enrollments: 8 },
  { date: "2025-09-14", enrollments: 15 },
  { date: "2025-09-15", enrollments: 23 },
  { date: "2025-09-16", enrollments: 18 },
  { date: "2025-09-17", enrollments: 12 },
  { date: "2025-09-18", enrollments: 25 },
  { date: "2025-09-19", enrollments: 38 },
  { date: "2025-09-20", enrollments: 32 },
  { date: "2025-09-21", enrollments: 51 },
  { date: "2025-09-22", enrollments: 5 },
  { date: "2025-09-23", enrollments: 17 },
  { date: "2025-09-24", enrollments: 29 },
  { date: "2025-09-25", enrollments: 51 },
  { date: "2025-09-26", enrollments: 47 },
  { date: "2025-09-27", enrollments: 11 },
  { date: "2025-09-28", enrollments: 31 },
  { date: "2025-09-29", enrollments: 57 },
  { date: "2025-09-30", enrollments: 16 },
  { date: "2025-10-01", enrollments: 24 },
  { date: "2025-10-02", enrollments: 39 },
  { date: "2025-10-03", enrollments: 13 },
  { date: "2025-10-04", enrollments: 17 },
  { date: "2025-10-05", enrollments: 52 },
  { date: "2025-10-06", enrollments: 46 },
  { date: "2025-10-07", enrollments: 35 },
  { date: "2025-10-08", enrollments: 4 },
  { date: "2025-10-09", enrollments: 66 },
  { date: "2025-10-10", enrollments: 41 },
  { date: "2025-10-11", enrollments: 61 },
  { date: "2025-10-12", enrollments: 43 },
  { date: "2025-10-13", enrollments: 19 },
];

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartAreaInteractiveProps {
  data: { date: string; enrollments: number }[];
}

export function ChartAreaInteractive({data}: ChartAreaInteractiveProps) {

  const totalEnrollments = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.enrollments, 0), [data]
  )
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Enrollments</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total Enrollments for the last 30 days: {totalEnrollments}
          </span>
          <span className="@[540px]/card:hidden">Last 30 days: {totalEnrollments}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleTimeString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />

            <Bar dataKey={"enrollments"} fill="var(--color-enrollments" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
