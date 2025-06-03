import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-600" />
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          Loading project...
        </h2>
        <p className="text-sm text-gray-600">
          Please wait while we fetch your project details.
        </p>
      </div>
    </div>
  )
}
