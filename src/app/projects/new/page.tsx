"use client"

import { ProjectForm } from "@/components/projects/project-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type CreateProjectInput } from "@/lib/types/project"

export default function NewProject() {
  const router = useRouter()

  const handleSubmit = async (data: CreateProjectInput) => {
    // TODO: Implement project creation
    console.log('Creating project:', data)
    router.push('/')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-muted-foreground mt-1">
            Set up a new learning project and define your goals
          </p>
        </div>
      </div>

      <ProjectForm onSubmit={handleSubmit} />
    </div>
  )
} 