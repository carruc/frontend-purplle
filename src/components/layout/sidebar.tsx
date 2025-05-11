'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface Project {
  id: string
  name: string
  // Add other project properties as needed
}

type SortOrder = 'alphabetical' | 'recent' | 'deadline'

export const Sidebar = () => {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder] = useState<SortOrder>('alphabetical')
  
  // This would be replaced with actual project data from your data source
  const [projects] = useState<Project[]>([])
  
  const sortProjects = (projects: Project[], order: SortOrder) => {
    switch (order) {
      case 'alphabetical':
        return [...projects].sort((a, b) => a.name.localeCompare(b.name))
      case 'recent':
        // Implement recent sorting logic
        return projects
      case 'deadline':
        // Implement deadline sorting logic
        return projects
      default:
        return projects
    }
  }

  const filteredProjects = sortProjects(projects, sortOrder).filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <aside className="w-64 border-r hidden md:block">
      <div className="p-4 space-y-6">
        {/* Logo */}
        <Link href="/homepage" className="block">
          <h1 className="text-xl font-semibold">PurpLLE</h1>
        </Link>

        {/* Homepage Button */}
        <Button 
          asChild
          variant="ghost"
          className="w-full justify-start transition-all duration-300 ease-in-out
                     bg-transparent hover:bg-gray-100/80 
                     shadow-none hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        >
          <Link href="/homepage" className="flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-2 h-4 w-4 opacity-70" />
            Homepage
          </Link>
        </Button>

        {/* Searchbar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4 text-gray-400 opacity-70" />
          </div>
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full bg-gray-100 border-transparent focus:border-primary pl-10"
          />
        </div>

        {/* Projects List */}
        <div>
          <nav className="space-y-1">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className={`block px-3 py-2 rounded-md text-sm ${
                    pathname === `/projects/${project.id}`
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {project.name}
                </Link>
              ))
            ) : (
              <span className="block px-3 py-2 text-sm text-muted-foreground">
                {searchQuery ? 'No matching projects' : 'No projects yet'}
              </span>
            )}
          </nav>
        </div>

        {/* Create New Project Button */}
        <Button
          asChild
          variant="default"
          className="w-full"
        >
          <Link href="/projects/new">Create New Project</Link>
        </Button>
      </div>
    </aside>
  )
}