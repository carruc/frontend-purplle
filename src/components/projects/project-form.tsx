"use client"

import { type FC, useState } from 'react'
import { type CreateProjectInput, type Project } from '@/lib/types/project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Plus, X } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: CreateProjectInput) => Promise<void>
  isLoading?: boolean
}

export const ProjectForm: FC<ProjectFormProps> = ({
  project,
  onSubmit,
  isLoading = false,
}) => {
  const [motivations, setMotivations] = useState<string[]>(project?.motivations || [])
  const [newMotivation, setNewMotivation] = useState('')
  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(
    project?.deadlineMilestone?.date
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data: CreateProjectInput = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      motivations,
      deadlineMilestone: {
        id: project?.deadlineMilestone?.id || '',
        title: 'Final Deadline',
        date: deadlineDate || new Date(),
        projectId: project?.id || '',
      },
      milestones: project?.milestones || [],
      difficulty: project?.difficulty || 50,
      interest: project?.interest || 50,
    }

    await onSubmit(data)
  }

  const handleAddMotivation = () => {
    if (newMotivation.trim()) {
      setMotivations([...motivations, newMotivation.trim()])
      setNewMotivation('')
    }
  }

  const handleRemoveMotivation = (index: number) => {
    setMotivations(motivations.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={project?.title}
          placeholder="Enter project title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project?.description}
          placeholder="Describe your project and learning objectives"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Deadline</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !deadlineDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {deadlineDate ? format(deadlineDate, "PPP") : "Select deadline"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={deadlineDate}
              onSelect={setDeadlineDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Motivations</Label>
        <div className="flex gap-2">
          <Input
            value={newMotivation}
            onChange={(e) => setNewMotivation(e.target.value)}
            placeholder="Add a motivation"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddMotivation}
            disabled={!newMotivation.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2 mt-2">
          {motivations.map((motivation, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-muted p-2 rounded-md"
            >
              <span className="flex-1">{motivation}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveMotivation(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  )
}
