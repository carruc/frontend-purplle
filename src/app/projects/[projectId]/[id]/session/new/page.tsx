"use client"

import { useParams, useRouter } from "next/navigation"
import { SessionForm } from "@/components/sessions/session-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { type Project } from "@/lib/types/project"

// Temporary mock data - this would be fetched from an API in a real application
const mockProjects: Record<string, Project> = {
  "1": {
    id: "1",
    title: "Advanced Mathematics",
    description: "Covering calculus, linear algebra, and probability theory",
    milestones: [
      {
        id: "m1",
        title: "Complete Calculus Module",
        date: new Date("2024-06-15"),
        projectId: "1"
      }
    ],
    deadlineMilestone: {
      id: "m2",
      title: "Final Exam",
      date: new Date("2024-07-30"),
      projectId: "1"
    },
    documents: [
      {
        id: "d1",
        projectId: "1",
        filename: "calculus_notes.pdf",
        category: "Resource" as const,
        content: "",
        embeddings: []
      }
    ],
    motivations: [
      "Improve problem-solving skills",
      "Prepare for advanced courses"
    ],
    learningSessions: [],
    overallPerformance: 75,
    difficulty: 80,
    interest: 85,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export default function NewSessionPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const project = mockProjects[id]

  if (!project) {
    throw new Error("Project not found")
  }

  const handleSubmit = async (sessionData: {
    duration: { hours: number; minutes: number }
    motivation: string
    learningObjective: string
    confidenceLevel: number
    resourceDocuments: string[]
    testDocuments: string[]
  }) => {
    // Here we would typically:
    // 1. Create the session in the database
    // 2. Generate initial assessment questions
    // 3. Redirect to the session page
    console.log("Creating new session:", sessionData)
    
    // For now, we'll just redirect back to the project page
    router.push(`/projects/${id}`)
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href={`/projects/${id}`}>
          <Button variant="ghost" size="icon" className="mb-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">New Learning Session</h1>
        <p className="text-muted-foreground mt-2">
          {project.title}
        </p>
      </div>

      <SessionForm project={project} onSubmit={handleSubmit} />
    </div>
  )
} 