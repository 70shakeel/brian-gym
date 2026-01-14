"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, RotateCcw, Box } from "lucide-react"

type GameState = "idle" | "playing" | "finished"

interface Pattern {
    sequence: number[] // 0=Empty, 1=Filled
    options: number[][]
    correctIndex: number
    explanation: string
}

const PATTERNS: Pattern[] = [
    {
        sequence: [1, 0, 1, 0, 1, 0, 1, 0], // Alternating
        options: [
            [1], // A: Filled
            [0], // B: Empty
        ],
        correctIndex: 0,
        explanation: "The pattern alternates between Filled and Empty. Valid usage: Filled (1) -> Empty (0)."
    },
    // Simple mock patterns for demo - ideally these would be visual matrices
    // Let's make it a number sequence for easier implementation without complex SVG logic for now
]

// Re-designing for a simpler visual sequence suitable for a "Matrix" vibe.
// Grid of 3x3 items. 8 shown, 1 missing.

interface MatrixProblem {
    grid: (string | null)[] // 9 items, last is null (to be guessed)
    options: string[]
    correctOption: string
}

const PROBLEMS: MatrixProblem[] = [
    {
        grid: ["O", "O", "O", "X", "X", "X", "O", "O", null],
        options: ["O", "X", "△", "□"],
        correctOption: "O",
    },
    {
        grid: ["1", "2", "3", "2", "3", "4", "3", "4", null],
        options: ["1", "3", "5", "6"],
        correctOption: "5",
    },
    {
        grid: ["↗", "→", "↘", "↑", "·", "↓", "↖", "←", null],
        options: ["↙", "↘", "↑", "↔"],
        correctOption: "↙",
    }
]

export function PatternMatrix() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [score, setScore] = useState(0)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  
  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setCurrentProblemIndex(0)
  }

  const handleAnswer = (option: string) => {
    const problem = PROBLEMS[currentProblemIndex]
    if (option === problem.correctOption) {
        setScore(s => s + 10)
    }
    
    if (currentProblemIndex < PROBLEMS.length - 1) {
        setCurrentProblemIndex(prev => prev + 1)
    } else {
        setGameState("finished")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto">
      {gameState === "idle" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="mx-auto bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center">
                <Box className="h-10 w-10 text-blue-600" />
             </div>
             <div>
                <h2 className="text-2xl font-bold">Pattern Matrix</h2>
                <p className="text-muted-foreground mt-2">
                    Identify the missing piece to complete the logical pattern.
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
                <span>Problem {currentProblemIndex + 1}/{PROBLEMS.length}</span>
            </div>

            <Card className="p-6">
                 <div className="grid grid-cols-3 gap-4">
                     {PROBLEMS[currentProblemIndex].grid.map((item, idx) => (
                         <div key={idx} className="aspect-square bg-secondary rounded-lg flex items-center justify-center text-3xl font-bold border-2 border-transparent">
                             {item === null ? <span className="text-blue-500">?</span> : item}
                         </div>
                     ))}
                 </div>
            </Card>

            <div className="grid grid-cols-4 gap-4">
                {PROBLEMS[currentProblemIndex].options.map((opt, idx) => (
                    <Button key={idx} variant="outline" className="h-16 text-2xl" onClick={() => handleAnswer(opt)}>
                        {opt}
                    </Button>
                ))}
            </div>
        </div>
      )}

      {gameState === "finished" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="text-4xl font-bold text-primary">{score} / {PROBLEMS.length * 10}</div>
             <p className="text-muted-foreground">
                Logic training complete.
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
