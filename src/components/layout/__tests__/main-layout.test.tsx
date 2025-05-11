import { render, screen } from '@testing-library/react'
import { MainLayout } from '../main-layout'

describe('MainLayout', () => {
  it('renders all layout components', () => {
    render(
      <MainLayout>
        <div data-testid="content">Test Content</div>
      </MainLayout>
    )

    // Check if header is rendered with logo
    const headerLogo = screen.getByRole('link', { name: 'PurpLLE' })
    expect(headerLogo).toBeInTheDocument()

    // Check if sidebar is rendered
    expect(screen.getByText('Create New Project')).toBeInTheDocument()

    // Check if footer is rendered
    expect(screen.getByText('Purposeful Lifelong Learning Environment')).toBeInTheDocument()

    // Check if content is rendered
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies correct layout classes', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    )

    // Check main container classes
    expect(screen.getByRole('main')).toHaveClass('flex-1 p-6')

    // Check if layout has correct structure
    const layout = screen.getByRole('main').parentElement?.parentElement
    expect(layout).toHaveClass('min-h-screen bg-background flex flex-col')
  })
}) 