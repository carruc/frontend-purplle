'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export const Sidebar = () => {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname?.startsWith(path)
  
  return (
    <aside className="w-64 border-r hidden md:block">
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <Button 
            asChild
            variant="default"
            className="w-full justify-start"
          >
            <Link href="/projects/new">
              Create New Project
            </Link>
          </Button>
        </div>

        <nav className="space-y-1">
          <Link 
            href="/dashboard"
            className={`block px-3 py-2 rounded-md text-sm ${
              isActive('/dashboard') 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            Overview
          </Link>
          <Link 
            href="/projects"
            className={`block px-3 py-2 rounded-md text-sm ${
              isActive('/projects') 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            My Projects
          </Link>
          <Link 
            href="/sessions"
            className={`block px-3 py-2 rounded-md text-sm ${
              isActive('/sessions') 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-muted'
            }`}
          >
            Learning Sessions
          </Link>
        </nav>

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Recent Projects</h3>
          <nav className="space-y-1">
            {/* This will be populated dynamically */}
            <span className="block px-3 py-2 text-sm text-muted-foreground">
              No recent projects
            </span>
          </nav>
        </div>
      </div>
    </aside>
  )
}
