"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, RotateCcw, Grid } from "lucide-react"

type GameState = "idle" | "memorize" | "recall" | "finished"

export function SpatialRecall() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [pattern, setPattern] = useState<number[]>([]) // Indices of highlighted cells
  const [userPattern, setUserPattern] = useState<number[]>([])
  
  const gridSize = 3
  const totalCells = gridSize * gridSize

  const startLevel = (currentLevel: number) => {
    setGameState("memorize")
    setUserPattern([])
    
    // Generate random pattern
    const cellsToHighlight = Math.min(3 + currentLevel, 8)
    const newPattern: number[] = []
    while(newPattern.length < cellsToHighlight) {
        const idx = Math.floor(Math.random() * totalCells)
        if (!newPattern.includes(idx)) newPattern.push(idx)
    }
    setPattern(newPattern)

    // Switch to recall after 2 seconds
    setTimeout(() => {
        setGameState("recall")
    }, 2000)
  }

  const startGame = () => {
      setScore(0)
      setLevel(1)
      startLevel(1)
  }

  const handleCellClick = (index: number) => {
      if (gameState !== "recall") return
      
      // Toggle selection
      const newUserPattern = userPattern.includes(index) 
          ? userPattern.filter(i => i !== index)
          : [...userPattern, index]
      
      setUserPattern(newUserPattern)

      // Check if done selection (same number of items)
      // For simplicity in this demo, we verify on every click or add a "Submit" button?
      // Let's do instant fail/check. Or wait for user to match count.
      
      if (newUserPattern.length === pattern.length) {
          verifyPattern(newUserPattern)
      }
  }

  const verifyPattern = (attempt: number[]) => {
      // Check if set equality
      const sortedAttempt = [...attempt].sort()
      const sortedPattern = [...pattern].sort()
      const isCorrect = JSON.stringify(sortedAttempt) === JSON.stringify(sortedPattern)

      if (isCorrect) {
          setScore(s => s + (pattern.length * 10))
          if (level < 5) {
              setTimeout(() => {
                  setLevel(l => l + 1)
                  startLevel(level + 1)
              }, 500)
          } else {
              setGameState("finished")
          }
      } else {
          // Wrong pattern
          setGameState("finished")
      }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto">
      {gameState === "idle" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="mx-auto bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center">
                <Grid className="h-10 w-10 text-purple-600" />
             </div>
             <div>
                <h2 className="text-2xl font-bold">Spatial Recall</h2>
                <p className="text-muted-foreground mt-2">
                    Memorize the highlighted grid cells and reproduce the pattern.
                </p>
             </div>
             <Button size="lg" className="w-full" onClick={startGame}>
                <Play className="mr-2 h-4 w-4" /> Start Exercise
             </Button>
          </CardContent>
        </Card>
      )}

      {(gameState === "memorize" || gameState === "recall") && (
        <div className="w-full space-y-8">
             <div className="flex justify-between items-center text-lg font-medium">
                <span>Score: {score}</span>
                <span>Level {level}</span>
            </div>

            <Card className="p-6">
                 <div className="grid grid-cols-3 gap-4 aspect-square max-w-[300px] mx-auto">
                     {Array.from({ length: totalCells }).map((_, idx) => {
                         let isActive = false
                         if (gameState === "memorize") {
                             isActive = pattern.includes(idx)
                         } else if (gameState === "recall") {
                             isActive = userPattern.includes(idx)
                         }

                         return (
                             <div 
                                key={idx} 
                                onClick={() => handleCellClick(idx)}
                                className={`rounded-xl transition-all duration-200 cursor-pointer border-2
                                    ${isActive 
                                        ? "bg-purple-500 border-purple-600 scale-95" 
                                        : "bg-secondary border-transparent hover:bg-secondary/80"
                                    }
                                `}
                             />
                         )
                     })}
                 </div>
                 <p className="text-center mt-4 text-sm text-muted-foreground min-h-[20px]">
                     {gameState === "memorize" ? "Memorize the pattern..." : "Tap the cells to recall"}
                 </p>
            </Card>
        </div>
      )}

      {gameState === "finished" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="text-4xl font-bold text-primary">{score} pts</div>
             <p className="text-muted-foreground">
                Visual memory training complete.
             </p>
             <div className="grid gap-2">
                 <Button size="lg" onClick={startGame}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Play Again
                 </Button>
                 <Button variant="outline" onClick={() => window.location.reload()}>
                     Choose Another Exercise
                 </Button>
             </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
