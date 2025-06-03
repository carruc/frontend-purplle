interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = params

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Project Details
        </h1>
        <p className="mt-2 text-gray-600">
          Project ID: {projectId}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Overview
          </h2>
          <p className="text-gray-600">
            Project overview and details will be displayed here.
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Documents
          </h2>
          <p className="text-gray-600">
            Uploaded documents and resources will be listed here.
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Progress
          </h2>
          <p className="text-gray-600">
            Learning progress and analytics will be shown here.
          </p>
        </div>
      </div>
    </div>
  )
}
