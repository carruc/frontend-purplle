import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../card'

describe('Card', () => {
  it('renders basic card', () => {
    render(<Card>Card Content</Card>)
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('renders card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Description')).toBeInTheDocument()
    expect(screen.getByText('Card Content')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })

  it('applies custom className to card', () => {
    render(<Card className="custom-class">Card Content</Card>)
    const card = screen.getByText('Card Content').parentElement
    expect(card).toHaveClass('custom-class')
  })

  it('renders card header with custom className', () => {
    render(
      <CardHeader className="custom-header">
        Header Content
      </CardHeader>
    )
    const header = screen.getByText('Header Content').parentElement
    expect(header).toHaveClass('custom-header')
  })

  it('renders card footer with custom className', () => {
    render(
      <CardFooter className="custom-footer">
        Footer Content
      </CardFooter>
    )
    const footer = screen.getByText('Footer Content').parentElement
    expect(footer).toHaveClass('custom-footer')
  })

  it('renders card content with custom className', () => {
    render(
      <CardContent className="custom-content">
        Content
      </CardContent>
    )
    const content = screen.getByText('Content').parentElement
    expect(content).toHaveClass('custom-content')
  })

  it('renders card title with custom className', () => {
    render(
      <CardTitle className="custom-title">
        Title
      </CardTitle>
    )
    const title = screen.getByText('Title')
    expect(title).toHaveClass('custom-title')
  })

  it('renders card description with custom className', () => {
    render(
      <CardDescription className="custom-desc">
        Description
      </CardDescription>
    )
    const desc = screen.getByText('Description')
    expect(desc).toHaveClass('custom-desc')
  })
}) 