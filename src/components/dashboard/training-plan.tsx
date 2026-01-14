"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, ArrowRight, Brain, Zap } from "lucide-react"
import Link from "next/link"

const planItems = [
  {
    title: "Fluid Reasoning Alpha",
    type: "Reasoning",
    duration: "5 min",
    difficulty: "Medium",
    icon: Brain,
    color: "text-blue-500",
  },
  {
    title: "N-Back Memory Challenge",
    type: "Memory",
    duration: "8 min",
    difficulty: "Hard",
    icon: Zap,
    color: "text-amber-500",
  },
  {
    title: "Speed Pattern Match",
    type: "Speed",
    duration: "3 min",
    difficulty: "Easy",
    icon: Dumbbell,
    color: "text-green-500",
  },
]

export function TrainingPlan() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-primary" />
          Today's Training Plan
        </CardTitle>
        <CardDescription>
          Personalized based on your cognitive profile
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
         {planItems.map((item, index) => (
             <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-muted ${item.color}/10`}>
                          <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.type} • {item.duration} • {item.difficulty}</div>
                      </div>
                  </div>
                  <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-4 w-4" />
                  </Button>
             </div>
         ))}
      </CardContent>
      <CardFooter>
          <Button className="w-full" size="lg" asChild>
              <Link href="/workout">
                Start Full Workout (16 min)
              </Link>
          </Button>
      </CardFooter>
    </Card>
  )
}
