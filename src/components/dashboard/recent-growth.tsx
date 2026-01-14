"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "Mon", score: 186 },
  { day: "Tue", score: 205 },
  { day: "Wed", score: 210 },
  { day: "Thu", score: 198 },
  { day: "Fri", score: 220 },
  { day: "Sat", score: 235 },
  { day: "Sun", score: 240 },
]

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function RecentGrowth() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Weekly Growth</CardTitle>
        <CardDescription>Overall performance score (last 7 days)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="score"
              type="natural"
              stroke="var(--color-score)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm pt-4">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 12.5% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Consistency score: 95%
        </div>
      </CardFooter>
    </Card>
  )
}
