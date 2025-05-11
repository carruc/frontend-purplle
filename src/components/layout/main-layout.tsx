import { type ReactNode } from 'react'
import { Sidebar } from './sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>Purposeful Lifelong Learning Environment</p>
      </footer>
    </div>
  )
}
