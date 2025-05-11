import { useState, useEffect } from 'react'
import { type Project } from '@/lib/types/project'
import { fetchProjects, type ProjectsQueryParams } from '@/lib/api/projects'

interface UseProjectsOptions extends Omit<ProjectsQueryParams, 'userId'> {
  initialProjects?: Project[]
}

export const useProjects = (options: UseProjectsOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>(options.initialProjects ?? [])
  const [isLoading, setIsLoading] = useState(!options.initialProjects)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // In a real app, we would get the userId from an auth context
        const mockUserId = "user123"
        
        const response = await fetchProjects({
          userId: mockUserId,
          limit: options.limit,
          cursor: options.cursor,
          sort: options.sort
        })

        setProjects(response.projects)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch projects'))
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [options.limit, options.cursor, options.sort])

  return {
    projects,
    isLoading,
    error
  }
} 