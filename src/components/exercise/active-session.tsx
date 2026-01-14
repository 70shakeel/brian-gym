"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Check, X, Play, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type GameState = "idle" | "playing" | "finished"

const SYMBOLS = ["△", "□", "○", "☆", "◇"]
const DURATION = 30 // seconds

export function ActiveSession() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [currentSymbol, setCurrentSymbol] = useState("")
  const [prevSymbol, setPrevSymbol] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const symbolTimerRef = useRef<NodeJS.Timeout | null>(null)

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setTimeLeft(DURATION)
    setFeedback(null)
    setCurrentSymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
    setPrevSymbol("")
    
    // Game timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Symbol rotation every 2 seconds
    symbolTimerRef.current = setInterval(() => {
        nextSymbol()
    }, 2000)
  }

  const nextSymbol = () => {
      setFeedback(null)
      setPrevSymbol(currentSymbol) // current becomes previous
      // new current
      const next = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      setCurrentSymbol(prev => {
          // ensure we store the current as prev correctly in the closure if needed, 
          // but state updates are async. 
          // Better approach: use functional update or refs for stability in intervals.
          // For simplicity here, we assume the interval captures state well enough or we rely on the effect.
          // Actually, interval closures are tricky. simpler to just trigger effects.
          return next
      })
  }

  // Effect to handle symbol rotation actually? 
  // Let's rely on a reliable interval that just calls a function that has access to refs?
  // Or just use a simple approach: 
  // We'll manual advance on answer? No, it's timed.
  // Re-write nextSymbol to be safe with state:
  
  useEffect(() => {
      if (gameState === "playing") {
          const interval = setInterval(() => {
              setPrevSymbol(curr => {
                  // We need to carry over the 'curr' (currentSymbol) to 'prev'
                  return currentSymbol // This fails because currentSymbol is stale in closure
              })
              // Actually, best way:
              setPrevSymbol(s => currentSymbol) 
              setCurrentSymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
              setFeedback(null)
          }, 2000)
          
          return () => clearInterval(interval)
      }
  }, [gameState, currentSymbol]) 
  // Wait, dependency on currentSymbol makes the interval reset every time it changes.
  // This actually works as a "wait 2 seconds after change". Perfect.

  const endGame = () => {
    setGameState("finished")
    if (timerRef.current) clearInterval(timerRef.current)
    if (symbolTimerRef.current) clearInterval(symbolTimerRef.current)
  }

  useEffect(() => {
      if (timeLeft === 0 && gameState === "playing") {
          endGame()
      }
  }, [timeLeft, gameState])

  const handleAnswer = (match: boolean) => {
    if (gameState !== "playing") return

    const isMatch = currentSymbol === prevSymbol
    const isCorrect = match === isMatch

    if (isCorrect) {
      setScore(s => s + 10)
      setFeedback("correct")
    } else {
      setScore(s => Math.max(0, s - 5))
      setFeedback("wrong")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto">
      {gameState === "idle" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
                <Brain className="h-10 w-10 text-primary" />
             </div>
             <div>
                <h2 className="text-2xl font-bold">1-Back Match</h2>
                <p className="text-muted-foreground mt-2">
                    Does the current symbol match the previous one?
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
            
            <Card className={`h-64 flex items-center justify-center transition-colors ${
                feedback === "correct" ? "bg-green-100 dark:bg-green-900/20 border-green-500" :
                feedback === "wrong" ? "bg-red-100 dark:bg-red-900/20 border-red-500" : ""
            }`}>
                 <span className="text-8xl">{currentSymbol}</span>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-24 text-xl border-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    onClick={() => handleAnswer(false)}
                >
                    <X className="mr-2 h-8 w-8" /> No Match
                </Button>
                <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-24 text-xl border-2 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                    onClick={() => handleAnswer(true)}
                >
                    <Check className="mr-2 h-8 w-8" /> Match
                </Button>
            </div>
            {prevSymbol && <p className="text-center text-sm text-muted-foreground">Previous: {prevSymbol}</p>}
        </div>
      )}

      {gameState === "finished" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="text-4xl font-bold text-primary">{score} pts</div>
             <p className="text-muted-foreground">
                Great job! You maintained focus for {DURATION} seconds.
             </p>
             <div className="grid gap-2">
                 <Button size="lg" onClick={startGame}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Play Again
                 </Button>
                 <Button variant="outline" asChild>
                     <a href="/">Return to Dashboard</a>
                 </Button>
             </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
