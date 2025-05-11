"use client"

import { ProjectList } from "@/components/projects/project-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type Project } from "@/lib/types/project"

// Temporary mock data for development
const mockProjects: Project[] = [
  {
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
  {
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
]

export default function Homepage() {
  const router = useRouter()

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Learning Projects</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your learning journey
          </p>
        </div>
        <Link href="/projects/new">
          <Button variant="solid">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      <ProjectList 
        projects={mockProjects} 
        onProjectClick={handleProjectClick}
      />
    </div>
  )
} 