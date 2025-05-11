'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ProjectListSidebar } from '@/components/projects/project-list-sidebar'
import { useProjects } from '@/lib/hooks/useProjects'
import { Skeleton } from '@/components/ui/skeleton'

type SortOrder = 'alphabetical' | 'recent' | 'deadline'

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder] = useState<SortOrder>('alphabetical')
  
  const { projects, isLoading } = useProjects({
    sort: sortOrder
  })
  
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleProjectSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`)
  }

  const handleCreateNew = () => {
    router.push('/projects/new')
  }

  return (
    <aside className="w-64 border-r hidden md:block h-full">
      <div className="flex flex-col h-full">
        {/* Fixed Header Section */}
        <div className="p-4 space-y-6 flex-shrink-0">
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
              <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className="h-4 w-4 text-gray-400 opacity-70" 
                data-testid="search-icon"
              />
            </div>
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-gray-100 border-transparent focus:border-primary pl-10"
            />
          </div>
        </div>

        {/* Scrollable Projects List */}
        <div className="flex-1 min-h-0 p-4 pt-0">
          <div className="w-[90%] ml-auto h-full">
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-8 rounded-md" />
                ))}
              </div>
            ) : (
              <ProjectListSidebar
                projects={filteredProjects}
                selectedProjectId={pathname.split('/')[2]}
                onProjectSelect={handleProjectSelect}
                onCreateNew={handleCreateNew}
              />
            )}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 flex-shrink-0">
          <span className="text-xs text-gray-400 block text-center">
            Copyright © PurpLLE LLC
          </span>
        </div>
      </div>
    </aside>
  )
}