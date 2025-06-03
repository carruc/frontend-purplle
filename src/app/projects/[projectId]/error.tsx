'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4">
      <div className="text-center">
        <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Something went wrong!
        </h2>
        <p className="mb-6 max-w-md text-gray-600">
          We apologize for the inconvenience. An error occurred while loading this project.
        </p>
        <div className="space-y-3">
          <Button 
            onClick={reset}
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <div className="text-sm text-gray-500">
            If the problem persists, please contact support.
          </div>
        </div>
      </div>
    </div>
  )
}
