import { render, screen } from '@testing-library/react'
import { Sidebar } from '../sidebar'

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: () => '/homepage'
}))

describe('Sidebar', () => {
  it('renders the create new project button', () => {
    render(<Sidebar />)
    expect(screen.getByText('Create New Project')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Sidebar />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('My Projects')).toBeInTheDocument()
    expect(screen.getByText('Learning Sessions')).toBeInTheDocument()
  })

  it('renders the recent projects section', () => {
    render(<Sidebar />)
    expect(screen.getByText('Recent Projects')).toBeInTheDocument()
    expect(screen.getByText('No recent projects')).toBeInTheDocument()
  })

  it('applies active styles to current route', () => {
    render(<Sidebar />)
    const dashboardLink = screen.getByText('Overview').closest('a')
    expect(dashboardLink).toHaveClass('bg-primary text-primary-foreground')
  })
}) 