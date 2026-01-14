"use client"

import { useState } from "react"
import { ActiveSession } from "@/components/exercise/active-session"
import { StroopTest } from "@/components/exercise/stroop-test"
import { QuickMath } from "@/components/exercise/quick-math"
import { PatternMatrix } from "@/components/exercise/pattern-matrix"
import { SpatialRecall } from "@/components/exercise/spatial-recall"
import { WordScramble } from "@/components/exercise/word-scramble"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Dumbbell, ArrowLeft, Box, Grid, Type } from "lucide-react"

export default function WorkoutPage() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)

  if (selectedExercise) {
      const renderExercise = () => {
          switch(selectedExercise) {
              case "n-back": return <ActiveSession />
              case "stroop": return <StroopTest />
              case "math": return <QuickMath />
              case "pattern": return <PatternMatrix />
              case "spatial": return <SpatialRecall />
              case "word": return <WordScramble />
              default: return null
          }
      }

      return (
        <div className="container py-8 max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => setSelectedExercise(null)} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
            </Button>
            {renderExercise()}
        </div>
      )
  }

  return (
    <div className="container py-8 max-w-6xl mx-auto space-y-8">
       <div>
         <h1 className="text-3xl font-bold">Workout Session</h1>
         <p className="text-muted-foreground">Select an exercise to begin training.</p>
       </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                     Challenge short-term memory by matching symbols in a sequence.
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

          <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setSelectedExercise("pattern")}>
             <CardHeader>
                 <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                     <Box className="h-6 w-6 text-blue-600" />
                 </div>
                 <CardTitle>Pattern Matrix</CardTitle>
                 <CardDescription>Fluid Intelligence</CardDescription>
             </CardHeader>
             <CardContent>
                 <p className="text-sm text-muted-foreground">
                     Identify logical patterns and complete the sequence.
                 </p>
             </CardContent>
          </Card>

          <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setSelectedExercise("spatial")}>
             <CardHeader>
                 <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-2">
                     <Grid className="h-6 w-6 text-orange-600" />
                 </div>
                 <CardTitle>Spatial Recall</CardTitle>
                 <CardDescription>Visual Memory</CardDescription>
             </CardHeader>
             <CardContent>
                 <p className="text-sm text-muted-foreground">
                     Memorize grid locations and reproduce the visual pattern.
                 </p>
             </CardContent>
          </Card>

          <Card className="hover:border-primary cursor-pointer transition-colors" onClick={() => setSelectedExercise("word")}>
             <CardHeader>
                 <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-2">
                     <Type className="h-6 w-6 text-yellow-600" />
                 </div>
                 <CardTitle>Word Scramble</CardTitle>
                 <CardDescription>Verbal Skills</CardDescription>
             </CardHeader>
             <CardContent>
                 <p className="text-sm text-muted-foreground">
                     Unscramble letters to find the hidden cognitive term.
                 </p>
             </CardContent>
          </Card>
       </div>
    </div>
  )
}
