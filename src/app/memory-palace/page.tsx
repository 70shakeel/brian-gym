"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Archive, BookOpen, Clock, Plus } from "lucide-react"

const reviewItems = [
  { id: 1, term: "Hippocampus function", due: "Today", level: 3 },
  { id: 2, term: "Cattell-Horn-Carroll Theory", due: "Today", level: 2 },
  { id: 3, term: "Neuroplasticity mechanism", due: "Tomorrow", level: 4 },
  { id: 4, term: "Baddeley's Working Memory Model", due: "2 days", level: 5 },
]

export default function MemoryPalacePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Memory Palace</h2>
          <p className="text-muted-foreground">
            Manage your long-term knowledge using Spaced Repetition.
          </p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-primary/10 to-transparent border-none">
              <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold">2</CardTitle>
                  <CardDescription>Items due today</CardDescription>
              </CardHeader>
              <CardFooter>
                  <Button className="w-full">Start Review Session</Button>
              </CardFooter>
          </Card>
           <Card>
              <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold">85%</CardTitle>
                  <CardDescription>Retention Rate</CardDescription>
              </CardHeader>
          </Card>
           <Card>
              <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold">142</CardTitle>
                  <CardDescription>Total Learned Items</CardDescription>
              </CardHeader>
          </Card>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Review Queue</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="space-y-4">
                  {reviewItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                              <div className="p-2 bg-secondary rounded-full">
                                  <BookOpen className="h-4 w-4" />
                              </div>
                              <div>
                                  <div className="font-medium">{item.term}</div>
                                  <div className="text-xs text-muted-foreground">Level {item.level}</div>
                              </div>
                          </div>
                          <div className="flex items-center gap-4">
                              <Badge variant={item.due === "Today" ? "default" : "outline"}>
                                  <Clock className="mr-1 h-3 w-3" /> Due {item.due}
                              </Badge>
                              <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                      </div>
                  ))}
              </div>
          </CardContent>
          <CardFooter className="justify-center">
              <Button variant="link">
                  <Archive className="mr-2 h-4 w-4" /> View Archived Items
              </Button>
          </CardFooter>
      </Card>
    </div>
  )
}
