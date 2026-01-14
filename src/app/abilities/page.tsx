import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Clock, BookOpen, Layers, Target, Eye, Activity } from "lucide-react"

const abilities = [
  {
    title: "Fluid Intelligence",
    description: "Reasoning and novel problem solving independent of acquired knowledge.",
    icon: Brain,
    level: 75,
    status: "Improving",
    color: "text-blue-500",
  },
  {
    title: "Crystallized Intelligence",
    description: "Breadth and depth of acquired knowledge and vocabulary.",
    icon: BookOpen,
    level: 82,
    status: "Stable",
    color: "text-green-500",
  },
  {
    title: "Working Memory",
    description: "Capacity to hold and manipulate information in mind.",
    icon: Layers,
    level: 65,
    status: "Focus Area",
    color: "text-purple-500",
  },
  {
    title: "Processing Speed",
    description: "Ability to perform cognitive tasks automatically and fluently.",
    icon: Clock,
    level: 70,
    status: "Improving",
    color: "text-orange-500",
  },
  {
    title: "Executive Functions",
    description: "Goal-directed behavior, planning, and self-regulation.",
    icon: Target,
    level: 60,
    status: "Needs Work",
    color: "text-red-500",
  },
  {
    title: "Attention",
    description: "Capacity to sustain focus and ignore distractions.",
    icon: Zap,
    level: 78,
    status: "Stable",
    color: "text-yellow-500",
  },
  {
    title: "Visual-Spatial",
    description: "Perceive, analyze, and manipulate visual patterns.",
    icon: Eye,
    level: 88,
    status: "Strong",
    color: "text-indigo-500",
  },
  {
    title: "Long-Term Memory",
    description: "Ability to store and retrieve information over time.",
    icon: Activity,
    level: 90,
    status: "Strong",
    color: "text-teal-500",
  },
]

export default function AbilitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Cognitive Abilities</h2>
        <p className="text-muted-foreground">
          Explore and train specific domains of your cognition.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {abilities.map((ability) => (
          <Card key={ability.title} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-muted ${ability.color}/10`}>
                  <ability.icon className={`h-6 w-6 ${ability.color}`} />
                </div>
                <Badge variant={ability.status === "Needs Work" ? "destructive" : "secondary"}>
                  {ability.status}
                </Badge>
              </div>
              <CardTitle className="text-xl pt-4">{ability.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {ability.description}
              </CardDescription>
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Current Level</span>
                <span className="text-lg">{ability.level}</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${ability.level}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
