import { render, screen, fireEvent } from '@testing-library/react'
import { Sidebar } from '../sidebar'

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: () => '/homepage'
}))

// Mock project data
const mockProjects = [
  { id: '1', name: 'Project A' },
  { id: '2', name: 'Project B' },
  { id: '3', name: 'Project C' },
]

describe('Sidebar', () => {
  it('renders the create new project button', () => {
    render(<Sidebar />)
    expect(screen.getByText('Create New Project')).toBeInTheDocument()
  })

  it('renders homepage link', () => {
    render(<Sidebar />)
    expect(screen.getByText('Homepage')).toBeInTheDocument()
  })

  it('displays empty projects message', () => {
    render(<Sidebar />)
    expect(screen.getByText('No projects yet')).toBeInTheDocument()
  })

  it('applies active styles to homepage route', () => {
    render(<Sidebar />)
    const homepageLink = screen.getByText('Homepage').closest('a')
    expect(homepageLink).toHaveClass('bg-transparent hover:bg-gray-100/80')
  })

  it('renders search input', () => {
    render(<Sidebar />)
    const searchInput = screen.getByPlaceholderText('Search projects...')
    expect(searchInput).toBeInTheDocument()
  })

  it('handles search input changes', () => {
    render(<Sidebar />)
    const searchInput = screen.getByPlaceholderText('Search projects...') as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: 'test search' } })
    expect(searchInput.value).toBe('test search')
  })

  it('displays correct message when no projects match search', () => {
    render(<Sidebar />)
    const searchInput = screen.getByPlaceholderText('Search projects...')
    fireEvent.change(searchInput, { target: { value: 'nonexistent project' } })
    expect(screen.getByText('No projects yet')).toBeInTheDocument()
  })

  it('renders logo with correct link', () => {
    render(<Sidebar />)
    const logo = screen.getByRole('heading', { name: 'PurpLLE' })
    const logoLink = logo.closest('a')
    expect(logoLink).toHaveAttribute('href', '/homepage')
  })

  it('renders homepage button with correct icon and link', () => {
    render(<Sidebar />)
    const homepageButton = screen.getByRole('link', { name: /homepage/i })
    expect(homepageButton).toHaveAttribute('href', '/homepage')
    expect(homepageButton.querySelector('svg')).toBeInTheDocument()
  })

  it('renders search icon', () => {
    render(<Sidebar />)
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toHaveClass('svg-inline--fa fa-magnifying-glass')
  })
}) 