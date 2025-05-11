import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '../header'

describe('Header', () => {
  it('renders the logo and navigation links', () => {
    render(<Header />)
    
    // Check logo
    expect(screen.getByText('PurpLLE')).toBeInTheDocument()
    
    // Check navigation links
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Sessions')).toBeInTheDocument()
  })

  it('renders the new session button', () => {
    render(<Header />)
    expect(screen.getByText('New Session')).toBeInTheDocument()
  })

  it('renders the account dropdown menu', async () => {
    render(<Header />)
    
    // Open dropdown
    const accountButton = screen.getByText('Account')
    await userEvent.click(accountButton)
    
    // Check dropdown items
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
}) 