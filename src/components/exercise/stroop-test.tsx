"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, RotateCcw } from "lucide-react"

type GameState = "idle" | "playing" | "finished"

const COLORS = [
  { name: "RED", value: "text-red-500" },
  { name: "BLUE", value: "text-blue-500" },
  { name: "GREEN", value: "text-green-500" },
  { name: "YELLOW", value: "text-yellow-500" },
]

const DURATION = 30

export function StroopTest() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [currentWord, setCurrentWord] = useState(COLORS[0])
  const [currentColor, setCurrentColor] = useState(COLORS[0])
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setTimeLeft(DURATION)
    nextRound()
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const nextRound = () => {
    const word = COLORS[Math.floor(Math.random() * COLORS.length)]
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    setCurrentWord(word)
    setCurrentColor(color)
  }

  const endGame = () => {
    setGameState("finished")
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const handleAnswer = (selectedColorName: string) => {
    if (gameState !== "playing") return

    // User must identify the COLOR of the text, not the word itself.
    if (selectedColorName === currentColor.name) {
      setScore(s => s + 10)
    } else {
      setScore(s => Math.max(0, s - 5))
    }
    nextRound()
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto">
      {gameState === "idle" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="mx-auto bg-red-100 w-20 h-20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-500">RED</span>
             </div>
             <div>
                <h2 className="text-2xl font-bold">Stroop Test</h2>
                <p className="text-muted-foreground mt-2">
                    Select the <strong>COLOR</strong> of the text, not the word itself.
                </p>
             </div>
             <Button size="lg" className="w-full" onClick={startGame}>
                <Play className="mr-2 h-4 w-4" /> Start Exercise
             </Button>
          </CardContent>
        </Card>
      )}

      {gameState === "playing" && (
        <div className="w-full space-y-8">
            <div className="flex justify-between items-center text-lg font-medium">
                <span>Score: {score}</span>
                <span>{timeLeft}s</span>
            </div>
            <Progress value={(timeLeft / DURATION) * 100} className="h-2" />
            
            <Card className="h-64 flex items-center justify-center">
                 <span className={`text-6xl font-black ${currentColor.value}`}>
                     {currentWord.name}
                 </span>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                {COLORS.map((color) => (
                    <Button 
                        key={color.name}
                        variant="outline" 
                        size="lg" 
                        className="h-16 text-lg font-bold"
                        onClick={() => handleAnswer(color.name)}
                    >
                        {color.name}
                    </Button>
                ))}
            </div>
        </div>
      )}

      {gameState === "finished" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="text-4xl font-bold text-primary">{score} pts</div>
             <p className="text-muted-foreground">
                Executive function training complete.
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
