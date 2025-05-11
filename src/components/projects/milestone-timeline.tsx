import { type FC } from 'react'
import { type Milestone } from '@/lib/types/project'
import { format, isFuture, isPast } from 'date-fns'
import { CheckCircle2, Circle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MilestoneTimelineProps {
  milestones: Milestone[]
  className?: string
}

export const MilestoneTimeline: FC<MilestoneTimelineProps> = ({
  milestones,
  className,
}) => {
  const sortedMilestones = [...milestones].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  )

  return (
    <div className={cn("space-y-4", className)}>
      {sortedMilestones.map((milestone, index) => {
        const isCompleted = isPast(milestone.date)
        const isUpcoming = isFuture(milestone.date)

        return (
          <div
            key={milestone.id}
            className={cn(
              "flex items-start gap-4",
              index !== sortedMilestones.length - 1 && "pb-4 border-l-2 border-border ml-[11px]"
            )}
          >
            <div className="relative -left-[1px]">
              {isCompleted ? (
                <CheckCircle2 className="h-6 w-6 text-primary" />
              ) : isUpcoming ? (
                <Circle className="h-6 w-6 text-muted-foreground" />
              ) : (
                <Clock className="h-6 w-6 text-yellow-500" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{milestone.title}</p>
                <time className="text-sm text-muted-foreground">
                  {format(milestone.date, 'MMM d, yyyy')}
                </time>
              </div>
              <div
                className={cn(
                  "text-sm",
                  isCompleted
                    ? "text-muted-foreground"
                    : isUpcoming
                    ? "text-foreground"
                    : "text-yellow-500"
                )}
              >
                {isCompleted
                  ? "Completed"
                  : isUpcoming
                  ? "Upcoming"
                  : "In Progress"}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
