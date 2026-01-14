"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Play, RotateCcw } from "lucide-react"

type GameState = "idle" | "playing" | "finished"

const WORDS = [
    { original: "COGNITION", hint: "Mental action or process" },
    { original: "SYNAPSE", hint: "Junction between nerve cells" },
    { original: "MEMORY", hint: "Encoding, storage, retrieval" },
    { original: "NEURON", hint: "Fundamental unit of brain" },
    { original: "FOCUS", hint: "Center of interest" },
    { original: "LOGIC", hint: "Reasoning conducted validly" },
]

export function WordScramble() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [score, setScore] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [scrambled, setScrambled] = useState("")
  const [inputObj, setInputObj] = useState("")
  const [feedback, setFeedback] = useState<string>("")
  
  const scrambleWord = (word: string) => {
      const arr = word.split("")
      for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join("")
  }

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setCurrentWordIndex(0)
    setFeedback("")
    setInputObj("")
    setScrambled(scrambleWord(WORDS[0].original))
  }

  const nextWord = () => {
     if (currentWordIndex < WORDS.length - 1) {
         const nextIdx = currentWordIndex + 1
         setCurrentWordIndex(nextIdx)
         setScrambled(scrambleWord(WORDS[nextIdx].original))
         setInputObj("")
         setFeedback("")
     } else {
         setGameState("finished")
     }
  }

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const target = WORDS[currentWordIndex].original
      
      if (inputObj.toUpperCase().trim() === target) {
          setScore(s => s + 20)
          setFeedback("Correct!")
          setTimeout(nextWord, 1000)
      } else {
          setFeedback("Wrong, try again.")
      }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto">
      {gameState === "idle" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="mx-auto bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-yellow-600">Aa</span>
             </div>
             <div>
                <h2 className="text-2xl font-bold">Word Scramble</h2>
                <p className="text-muted-foreground mt-2">
                    Unscramble the letters to form a valid word related to cognition.
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
                <span>Word {currentWordIndex + 1}/{WORDS.length}</span>
            </div>

            <Card className="p-8 text-center space-y-6">
                 <div className="text-4xl font-bold tracking-widest uppercase">
                     {scrambled}
                 </div>
                 <p className="text-sm text-muted-foreground italic">
                     Hint: {WORDS[currentWordIndex].hint}
                 </p>

                 <form onSubmit={handleSubmit} className="space-y-4">
                     <Input 
                        value={inputObj} 
                        onChange={(e) => setInputObj(e.target.value)} 
                        className="text-center text-xl uppercase"
                        placeholder="Type answer..."
                        autoFocus
                     />
                     <Button type="submit" className="w-full">Submit Answer</Button>
                 </form>
                 
                 {feedback && (
                     <p className={`font-bold ${feedback.includes("Correct") ? "text-green-500" : "text-red-500"}`}>
                         {feedback}
                     </p>
                 )}
            </Card>
        </div>
      )}

      {gameState === "finished" && (
        <Card className="w-full text-center p-8">
          <CardContent className="space-y-6">
             <div className="text-4xl font-bold text-primary">{score} / {WORDS.length * 20}</div>
             <p className="text-muted-foreground">
                Verbal training complete.
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
