"use client"

import { type FC } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, BookOpenIcon, BarChart } from 'lucide-react'
import { type Project } from '@/lib/types/project'
import { formatDistanceToNow } from 'date-fns'

interface ProjectCardProps {
  project: Project
  onClick?: (projectId: string) => void
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, onClick }) => {
  const handleClick = () => {
    onClick?.(project.id)
  }

  const nextMilestone = project.milestones
    .filter(m => m.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0]

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
            <CardDescription className="mt-1">{project.description}</CardDescription>
          </div>
          <Badge variant={project.overallPerformance >= 70 ? "success" : "warning"}>
            {Math.round(project.overallPerformance)}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {nextMilestone 
                ? `Next milestone: ${nextMilestone.title} (${formatDistanceToNow(nextMilestone.date)})`
                : 'No upcoming milestones'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {project.documents.length} documents
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(project.overallPerformance)}%</span>
            </div>
            <Progress value={project.overallPerformance} className="h-2" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <BarChart className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {project.learningSessions.length} sessions completed
          </span>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">
            Difficulty: {Math.round(project.difficulty)}%
          </Badge>
          <Badge variant="outline">
            Interest: {Math.round(project.interest)}%
          </Badge>
        </div>
      </CardFooter>
    </Card>
  )
}
