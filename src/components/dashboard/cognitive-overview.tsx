"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

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
  { ability: "Fluid", score: 85 },
  { ability: "Crystallized", score: 78 },
  { ability: "Working Memory", score: 65 },
  { ability: "LTM", score: 92 },
  { ability: "Speed", score: 70 },
  { ability: "Executive", score: 60 },
  { ability: "Attention", score: 75 },
  { ability: "Visual", score: 88 },
]

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function CognitiveOverview() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-4">
        <CardTitle>Cognitive Profile</CardTitle>
        <CardDescription>
          Your current ability scores across 8 domains
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={chartData}>
             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis dataKey="ability" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              dataKey="score"
              fill="var(--color-score)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-4">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Based on your last 15 sessions
        </div>
      </CardFooter>
    </Card>
  )
}
