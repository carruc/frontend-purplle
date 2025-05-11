"use client"

import { type FC } from 'react'
import { type Project } from '@/lib/types/project'
import { ProjectCard } from './project-card'

interface ProjectListProps {
  projects: Project[]
  onProjectClick?: (projectId: string) => void
}

export const ProjectList: FC<ProjectListProps> = ({ projects, onProjectClick }) => {
  if (!projects.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No projects found. Create your first project to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={onProjectClick}
        />
      ))}
    </div>
  )
}
