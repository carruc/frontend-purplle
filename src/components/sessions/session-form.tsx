"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type Document, type Project } from "@/lib/types/project"

interface SessionFormProps {
  project: Project
  onSubmit: (sessionData: {
    duration: { hours: number; minutes: number }
    motivation: string
    learningObjective: string
    confidenceLevel: number
    resourceDocuments: string[]
    testDocuments: string[]
  }) => void
}

export function SessionForm({ project, onSubmit }: SessionFormProps) {
  const [duration, setDuration] = useState({ hours: 1, minutes: 0 })
  const [motivation, setMotivation] = useState("")
  const [learningObjective, setLearningObjective] = useState("")
  const [confidenceLevel, setConfidenceLevel] = useState(50)
  const [selectedResources, setSelectedResources] = useState<string[]>([])
  const [selectedTests, setSelectedTests] = useState<string[]>([])

  const resourceDocs = project.documents.filter(
    (doc) => doc.category === "Resource"
  )
  const testDocs = project.documents.filter((doc) => doc.category === "Test")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      duration,
      motivation,
      learningObjective,
      confidenceLevel,
      resourceDocuments: selectedResources,
      testDocuments: selectedTests,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Study Duration</Label>
          <div className="flex gap-4 items-center mt-2">
            <div className="flex-1">
              <Label htmlFor="hours" className="text-sm">
                Hours
              </Label>
              <Input
                id="hours"
                type="number"
                min={0}
                max={8}
                value={duration.hours}
                onChange={(e) =>
                  setDuration({ ...duration, hours: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="minutes" className="text-sm">
                Minutes
              </Label>
              <Input
                id="minutes"
                type="number"
                min={0}
                max={59}
                value={duration.minutes}
                onChange={(e) =>
                  setDuration({
                    ...duration,
                    minutes: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="motivation">Today's Motivation</Label>
          <Textarea
            id="motivation"
            placeholder="What's motivating you to study today?"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="objective">Learning Objective</Label>
          <Textarea
            id="objective"
            placeholder="What do you want to learn in this session?"
            value={learningObjective}
            onChange={(e) => setLearningObjective(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Initial Confidence Level</Label>
          <div className="pt-2">
            <Slider
              value={[confidenceLevel]}
              onValueChange={(value) => setConfidenceLevel(value[0])}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>Not Confident</span>
              <span>Very Confident</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Study Resources</Label>
          <Select
            value={selectedResources[0]}
            onValueChange={(value) => setSelectedResources([value])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a resource" />
            </SelectTrigger>
            <SelectContent>
              {resourceDocs.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.filename}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Test Materials</Label>
          <Select
            value={selectedTests[0]}
            onValueChange={(value) => setSelectedTests([value])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a test" />
            </SelectTrigger>
            <SelectContent>
              {testDocs.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.filename}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Start Learning Session
      </Button>
    </form>
  )
} 