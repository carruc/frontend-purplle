export interface Milestone {
  id: string
  title: string
  date: Date
  projectId: string
}

export interface Document {
  id: string
  projectId: string
  filename: string
  category: "Resource" | "Test"
  content: string
  embeddings: number[]
}

export interface LearningSession {
  id: string
  projectId: string
  timestamp: Date
  duration: {
    hours: number
    minutes: number
  }
  motivation: string
  learningObjective: string
  awarenessLevel: number
  confidenceLevel: number
  energyLevel: number
  performanceLevel: number
  satisfactionLevel: number
  resourceDocuments: string[]
  testDocuments: string[]
  questions: Question[]
}

export interface Question {
  id: string
  question: string
  answer: string
  correction: string
  testDocumentId: string
  sourceReferences: Array<{
    documentId: string
    lineNumber: number
  }>
  evaluation: number
}

export interface Project {
  id: string
  title: string
  description: string
  milestones: Milestone[]
  deadlineMilestone: Milestone
  documents: Document[]
  motivations: string[]
  learningSessions: LearningSession[]
  overallPerformance: number
  difficulty: number
  interest: number
  createdAt: Date
  updatedAt: Date
}

export type CreateProjectInput = Omit<
  Project,
  'id' | 'documents' | 'learningSessions' | 'overallPerformance' | 'createdAt' | 'updatedAt'
>
