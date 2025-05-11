"use client"

import { ProjectList } from "@/components/projects/project-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useProjects } from "@/lib/hooks/useProjects"
import { Skeleton } from "@/components/ui/skeleton"

export default function Homepage() {
  const router = useRouter()
  const { projects, isLoading, error } = useProjects()

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`)
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load projects. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Learning Projects</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your learning journey
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] rounded-xl" />
            ))}
          </div>
        ) : (
          <ProjectList 
            projects={projects} 
            onProjectClick={handleProjectClick}
          />
        )}
      </div>
    </div>
  )
} 