"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MilestoneTimeline } from "@/components/projects/milestone-timeline"
import { ProgressMetrics } from "@/components/projects/progress-metrics"
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
  },
  "2": {
    id: "2",
    title: "Web Development",
    description: "Learning modern web development with React and Next.js",
    milestones: [
      {
        id: "m3",
        title: "Complete React Basics",
        date: new Date("2024-05-20"),
        projectId: "2"
      }
    ],
    deadlineMilestone: {
      id: "m4",
      title: "Project Submission",
      date: new Date("2024-08-15"),
      projectId: "2"
    },
    documents: [],
    motivations: [
      "Build modern web applications",
      "Enhance frontend skills"
    ],
    learningSessions: [],
    overallPerformance: 60,
    difficulty: 65,
    interest: 90,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

export default function ProjectPage() {
  const { id } = useParams() as { id: string }
  const project = mockProjects[id]

  if (!project) {
    throw new Error("Project not found")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link href="/homepage">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>
        <Link href={`/projects/${id}/session/new`}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Start Learning Session
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Progress & Metrics</h2>
            <ProgressMetrics project={project} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Motivations</h2>
            <ul className="space-y-2">
              {project.motivations.map((motivation, index) => (
                <li
                  key={index}
                  className="bg-muted p-3 rounded-md text-sm"
                >
                  {motivation}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Timeline</h2>
          <MilestoneTimeline 
            milestones={[...project.milestones, project.deadlineMilestone]} 
          />
        </div>
      </div>
    </div>
  )
} 