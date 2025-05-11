import { type FC } from 'react'
import { type Project } from '@/lib/types/project'
import { Progress } from '@/components/ui/progress'
import { Brain, Target, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressMetricsProps {
  project: Project
  className?: string
}

export const ProgressMetrics: FC<ProgressMetricsProps> = ({
  project,
  className,
}) => {
  const metrics = [
    {
      label: 'Overall Progress',
      value: project.overallPerformance,
      icon: Target,
      color: 'text-blue-500',
      description: 'Your overall progress in this project',
    },
    {
      label: 'Difficulty Level',
      value: project.difficulty,
      icon: Brain,
      color: 'text-purple-500',
      description: 'How challenging this project is for you',
    },
    {
      label: 'Interest Level',
      value: project.interest,
      icon: Zap,
      color: 'text-yellow-500',
      description: 'How engaging you find this project',
    },
  ]

  return (
    <div className={cn("space-y-6", className)}>
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-2">
          <div className="flex items-center gap-2">
            <metric.icon className={cn("h-5 w-5", metric.color)} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{metric.label}</p>
                <span className="text-sm font-medium">
                  {Math.round(metric.value)}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {metric.description}
              </p>
            </div>
          </div>
          <Progress
            value={metric.value}
            className="h-2"
          />
        </div>
      ))}
    </div>
  )
}
