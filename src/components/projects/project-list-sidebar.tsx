"use client"

import { type FC, useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { type Project } from '@/lib/types/project'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProjectListSidebarProps {
  projects: Project[]
  selectedProjectId?: string
  onProjectSelect?: (projectId: string) => void
  onCreateNew?: () => void
}

export const ProjectListSidebar: FC<ProjectListSidebarProps> = ({
  projects,
  selectedProjectId,
  onProjectSelect,
  onCreateNew
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = useState(false)

  // Function to get a consistent emoji based on project title
  const getProjectEmoji = (title: string) => {
    const emojiList = ['📚', '📖', '📝', '✏️', '📓', '📔', '📒', '📕', '📗', '📘', '📙']
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return emojiList[hash % emojiList.length]
  }

  // Check if content is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        const listElement = containerRef.current.querySelector('.project-list')
        if (listElement) {
          const isContentScrollable = listElement.scrollHeight > listElement.clientHeight
          setIsScrollable(isContentScrollable)
        }
      }
    }

    // Initial check
    checkScrollable()

    // Add resize observer to check when container size changes
    const resizeObserver = new ResizeObserver(checkScrollable)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect()
    }
  }, [projects]) // Re-run when projects change

  return (
    <div ref={containerRef} className="flex flex-col h-full w-full">
      {/* Project List - Scrollable Container */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="project-list flex-1 overflow-y-auto pr-2">
          <div className="space-y-0.5">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectSelect?.(project.id)}
              className={cn(
                "w-full text-left px-2 py-1.5 rounded-md transition-colors",
                "hover:bg-muted text-sm",
                selectedProjectId === project.id ? "bg-muted" : "bg-transparent"
              )}
            >
              <span className="font-medium truncate block flex items-center gap-1.5">
                <span className="flex-shrink-0">{getProjectEmoji(project.title)}</span>
                <span className="truncate">{project.title}</span>
              </span>
            </button>
          ))}
          </div>
        </div>
        <div 
          className={cn(
            "pt-2 bg-white px-2",
            isScrollable ? "sticky bottom-0" : "mt-2"
          )}
        >
          <Button
            variant="secondary"
            className={cn(
              "w-full h-7 bg-gray-50/80 hover:bg-gray-100",
              "flex items-center justify-center",
              "transition-all duration-200 rounded-full",
              "border border-gray-200/50",
              "shadow-none hover:shadow-[0_2px_4px_rgba(229,231,235,0.2)]"
            )}
            onClick={onCreateNew}
          >
            <Plus className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  )
} 