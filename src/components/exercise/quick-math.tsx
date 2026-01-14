"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, RotateCcw } from "lucide-react"

type GameState = "idle" | "playing" | "finished"

const DURATION = 45

interface Question {
    text: string
    answer: number
    options: number[]
}

export function QuickMath() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [question, setQuestion] = useState<Question | null>(null)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setTimeLeft(DURATION)
    nextQuestion()
    
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

  const generateQuestion = (): Question => {
      const ops = ['+', '-', '*']
      const op = ops[Math.floor(Math.random() * ops.length)]
      let a = Math.floor(Math.random() * 10) + 2
      let b = Math.floor(Math.random() * 10) + 2
      let ans = 0

      if (op === '+') ans = a + b
      if (op === '-') { 
          // Ensure positive results for simplicity
          if (a < b) [a, b] = [b, a]
          ans = a - b 
      }
      if (op === '*') {
          a = Math.floor(Math.random() * 5) + 2
          b = Math.floor(Math.random() * 5) + 2
          ans = a * b
      }

      // Generate options
      const options = new Set<number>()
      options.add(ans)
      while (options.size < 4) {
          const offset = Math.floor(Math.random() * 10) - 5
          const val = ans + (offset === 0 ? 1 : offset)
          if (val > 0) options.add(val)
      }

      return {
          text: `${a} ${op} ${b} = ?`,
          answer: ans,
          options: Array.from(options).sort(() => Math.random() - 0.5)
      }
  }

  const nextQuestion = () => {
      setQuestion(generateQuestion())
  }

  const endGame = () => {
    setGameState("finished")
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const handleAnswer = (val: number) => {
    if (gameState !== "playing" || !question) return

    if (val === question.answer) {
      setScore(s => s + 20)
    } else {
      setScore(s => Math.max(0, s - 10))
    }
    nextQuestion()
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto">
      {gameState === "idle" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">42</span>
             </div>
             <div>
                <h2 className="text-2xl font-bold">Quick Math</h2>
                <p className="text-muted-foreground mt-2">
                    Solve arithmetic problems as fast as possible.
                </p>
             </div>
             <Button size="lg" className="w-full" onClick={startGame}>
                <Play className="mr-2 h-4 w-4" /> Start Exercise
             </Button>
          </CardContent>
        </Card>
      )}

      {gameState === "playing" && question && (
        <div className="w-full space-y-8">
            <div className="flex justify-between items-center text-lg font-medium">
                <span>Score: {score}</span>
                <span>{timeLeft}s</span>
            </div>
            <Progress value={(timeLeft / DURATION) * 100} className="h-2" />
            
            <Card className="h-64 flex items-center justify-center">
                 <span className="text-6xl font-black">{question.text}</span>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                {question.options.map((opt) => (
                    <Button 
                        key={opt}
                        variant="outline" 
                        size="lg" 
                        className="h-24 text-4xl font-bold"
                        onClick={() => handleAnswer(opt)}
                    >
                        {opt}
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
                Processing speed training complete.
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
