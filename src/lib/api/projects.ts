import { type Project } from '@/lib/types/project'

// Helper function to create mock exam project
const createMockExam = (id: string, subject: string, examDate: string): Project => ({
  id,
  title: `${subject} Exam`,
  description: `Preparation for ${subject} final examination`,
  milestones: [
    {
      id: `m${id}_1`,
      title: "Complete Study Guide",
      date: new Date(examDate),
      projectId: id
    }
  ],
  deadlineMilestone: {
    id: `m${id}_2`,
    title: "Final Exam",
    date: new Date(examDate),
    projectId: id
  },
  documents: [
    {
      id: `d${id}`,
      projectId: id,
      filename: `${subject.toLowerCase()}_notes.pdf`,
      category: "Resource" as const,
      content: "",
      embeddings: []
    }
  ],
  motivations: [
    "Master the subject material",
    "Achieve excellent grade"
  ],
  learningSessions: [],
  overallPerformance: Math.floor(Math.random() * 30) + 60, // Random between 60-90
  difficulty: Math.floor(Math.random() * 40) + 50, // Random between 50-90
  interest: Math.floor(Math.random() * 30) + 60, // Random between 60-90
  createdAt: new Date(),
  updatedAt: new Date()
})

// Mock projects data
const mockProjects: Project[] = [
  // Original projects
  {
    id: "1",
    title: "Advanced Mathematics",
    description: "Covering calculus, linear algebra, and probability theory",
    milestones: [
      {
        id: "m1",
        title: "Complete Calculus Module",
        date: new Date("2024-06-15"),
        projectId: "1"
      }
    ],
    deadlineMilestone: {
      id: "m2",
      title: "Final Exam",
      date: new Date("2024-07-30"),
      projectId: "1"
    },
    documents: [
      {
        id: "d1",
        projectId: "1",
        filename: "calculus_notes.pdf",
        category: "Resource" as const,
        content: "",
        embeddings: []
      }
    ],
    motivations: [
      "Improve problem-solving skills",
      "Prepare for advanced courses"
    ],
    learningSessions: [],
    overallPerformance: 75,
    difficulty: 80,
    interest: 85,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Web Development",
    description: "Learning modern web development with React and Next.js",
    milestones: [
      {
        id: "m3",
        title: "Complete React Basics",
        date: new Date("2024-05-20"),
        projectId: "2"
      }
    ],
    deadlineMilestone: {
      id: "m4",
      title: "Project Submission",
      date: new Date("2024-08-15"),
      projectId: "2"
    },
    documents: [],
    motivations: [
      "Build modern web applications",
      "Enhance frontend skills"
    ],
    learningSessions: [],
    overallPerformance: 60,
    difficulty: 65,
    interest: 90,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Additional mock exam projects
  createMockExam("3", "Physics", "2024-06-20"),
  createMockExam("4", "Chemistry", "2024-06-25"),
  createMockExam("5", "Biology", "2024-07-01"),
  createMockExam("6", "History", "2024-07-05"),
  createMockExam("7", "Literature", "2024-07-10"),
  createMockExam("8", "Economics", "2024-07-15"),
  createMockExam("9", "Psychology", "2024-07-20"),
  createMockExam("10", "Sociology", "2024-07-25"),
  createMockExam("11", "Philosophy", "2024-08-01"),
  createMockExam("12", "Computer Science", "2024-08-05"),
  createMockExam("13", "Statistics", "2024-08-10"),
  createMockExam("14", "Linear Algebra", "2024-08-15"),
  createMockExam("15", "Organic Chemistry", "2024-08-20"),
  createMockExam("16", "Quantum Physics", "2024-08-25"),
  createMockExam("17", "World History", "2024-09-01"),
  createMockExam("18", "Art History", "2024-09-05"),
  createMockExam("19", "Music Theory", "2024-09-10"),
  createMockExam("20", "Environmental Science", "2024-09-15"),
  createMockExam("21", "Political Science", "2024-09-20"),
  createMockExam("22", "Anthropology", "2024-09-25")
]

export interface ProjectsQueryParams {
  userId: string
  limit?: number
  cursor?: string
  sort?: 'recent' | 'alphabetical' | 'deadline'
}

export interface ProjectsResponse {
  projects: Project[]
  nextCursor?: string
  total: number
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchProjects = async ({
  userId,
  limit = 20,
  cursor,
  sort = 'recent'
}: ProjectsQueryParams): Promise<ProjectsResponse> => {
  // Simulate API delay
  await delay(500)

  // In a real API, we would use these parameters for filtering and pagination
  // For now, we'll just return all mock projects
  let sortedProjects = [...mockProjects]

  // Apply sorting
  switch (sort) {
    case 'alphabetical':
      sortedProjects.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'deadline':
      sortedProjects.sort((a, b) => 
        a.deadlineMilestone.date.getTime() - b.deadlineMilestone.date.getTime()
      )
      break
    case 'recent':
    default:
      sortedProjects.sort((a, b) => 
        b.updatedAt.getTime() - a.updatedAt.getTime()
      )
  }

  // Simulate pagination
  const startIndex = cursor ? parseInt(cursor) : 0
  const paginatedProjects = sortedProjects.slice(startIndex, startIndex + limit)
  const nextCursor = startIndex + limit < sortedProjects.length 
    ? (startIndex + limit).toString() 
    : undefined

  return {
    projects: paginatedProjects,
    nextCursor,
    total: sortedProjects.length
  }
} 