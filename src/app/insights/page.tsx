import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Lightbulb, TrendingUp, Brain, AlertCircle } from "lucide-react"

export default function InsightsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Insights</h2>
        <p className="text-muted-foreground">
          Deep analysis of your cognitive performance and trends.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                    <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                     <CardTitle>Top Insight: Neuroplasticity Detected</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="leading-relaxed">
                    Based on your performance in <strong>Fluid Intelligence</strong> tasks over the last 14 days, you have shown a 
                    consistent response time improvement of <strong>12%</strong>. This suggests successful consolidation of 
                    pattern recognition strategies. To maximize this growth, we recommend increasing the complexity 
                    of your <em>Inductive Reasoning</em> exercises.
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Cognitive Profile Analysis
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Strengths
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Your <strong>Long-Term Memory</strong> is performing in the top <strong>92nd percentile</strong>. 
                        You demonstrate exceptional ability in meaningful association tasks.
                    </p>
                </div>
                <Separator />
                <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Areas for Improvement
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        <strong>Executive Functions</strong>, specifically task-switching, shows signs of fatigue after 5 minutes. 
                        Short, high-intensity intervals of the <em>Stroop Test</em> (coming soon) are recommended to build stamina.
                    </p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Prioritize sleep: Your performance drops by 15% on evening sessions compared to mornings.</li>
                    <li>Try the "Method of Loci" in the Memory Palace to leverage your strong visual-spatial skills.</li>
                    <li>Increase hydration before "Speed" workouts to improve reaction time consistency.</li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
