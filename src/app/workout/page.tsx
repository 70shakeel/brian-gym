"use client"

import { useState } from "react"
import { ActiveSession } from "@/components/exercise/active-session"
import { StroopTest } from "@/components/exercise/stroop-test"
import { QuickMath } from "@/components/exercise/quick-math"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Dumbbell, ArrowLeft } from "lucide-react"

export default function WorkoutPage() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)

  if (selectedExercise === "n-back") {
    return (
        <div className="container py-8 max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => setSelectedExercise(null)} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
            </Button>
            <ActiveSession />
        </div>
    )
  }

  if (selectedExercise === "stroop") {
    return (
        <div className="container py-8 max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => setSelectedExercise(null)} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
            </Button>
            <StroopTest />
        </div>
    )
  }

  if (selectedExercise === "math") {
    return (
        <div className="container py-8 max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => setSelectedExercise(null)} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
            </Button>
            <QuickMath />
        </div>
    )
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-8">
       <div>
         <h1 className="text-3xl font-bold">Workout Session</h1>
         <p className="text-muted-foreground">Select an exercise to begin training.</p>
       </div>

       <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setSelectedExercise("n-back")}>
             <CardHeader>
                 <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                     <Brain className="h-6 w-6 text-purple-600" />
                 </div>
                 <CardTitle>N-Back Memory</CardTitle>
                 <CardDescription>Working Memory</CardDescription>
             </CardHeader>
             <CardContent>
                 <p className="text-sm text-muted-foreground">
                     Challenge your short-term memory by matching symbols in a sequence.
                 </p>
             </CardContent>
          </Card>

          <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setSelectedExercise("stroop")}>
             <CardHeader>
                 <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                     <Zap className="h-6 w-6 text-red-600" />
                 </div>
                 <CardTitle>Stroop Test</CardTitle>
                 <CardDescription>Executive Function</CardDescription>
             </CardHeader>
             <CardContent>
                 <p className="text-sm text-muted-foreground">
                     Train inhibitory control by filtering out conflicting information.
                 </p>
             </CardContent>
          </Card>

          <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setSelectedExercise("math")}>
             <CardHeader>
                 <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                     <Dumbbell className="h-6 w-6 text-green-600" />
                 </div>
                 <CardTitle>Quick Math</CardTitle>
                 <CardDescription>Processing Speed</CardDescription>
             </CardHeader>
             <CardContent>
                 <p className="text-sm text-muted-foreground">
                     Solve arithmetic problems rapidly to improve mental agility.
                 </p>
             </CardContent>
          </Card>
       </div>
    </div>
  )
}
