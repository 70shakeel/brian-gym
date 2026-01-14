"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts"

const weeklyData = [
  { name: 'Mon', fluid: 65, memory: 40, speed: 55 },
  { name: 'Tue', fluid: 68, memory: 45, speed: 58 },
  { name: 'Wed', fluid: 75, memory: 48, speed: 60 },
  { name: 'Thu', fluid: 72, memory: 50, speed: 65 },
  { name: 'Fri', fluid: 80, memory: 55, speed: 68 },
  { name: 'Sat', fluid: 85, memory: 60, speed: 72 },
  { name: 'Sun', fluid: 82, memory: 58, speed: 75 },
]

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Progress & Analytics</h2>
        <p className="text-muted-foreground">
          Track your cognitive growth over time.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="domains">By Domain</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
              <CardDescription>Average scores across core domains</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="fluid" name="Fluid Intelligence" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  <Line type="monotone" dataKey="memory" name="Working Memory" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                  <Line type="monotone" dataKey="speed" name="Processing Speed" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domains" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Relative Strengths</CardTitle>
                        <CardDescription>Your performance normalized against age-matched peers</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData.slice(-1)} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis dataKey="name" type="category" hide />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Legend />
                                <Bar dataKey="fluid" name="Fluid" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="memory" name="Memory" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="speed" name="Speed" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
