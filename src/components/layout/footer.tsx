import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="border-t py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">PurpLLE</h3>
            <p className="text-sm text-muted-foreground">
              Purposeful Lifelong Learning Environment
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/dashboard" className="block text-sm text-muted-foreground hover:text-primary">
                Dashboard
              </Link>
              <Link href="/projects" className="block text-sm text-muted-foreground hover:text-primary">
                Projects
              </Link>
              <Link href="/sessions" className="block text-sm text-muted-foreground hover:text-primary">
                Sessions
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <nav className="space-y-2">
              <Link href="/help" className="block text-sm text-muted-foreground hover:text-primary">
                Help Center
              </Link>
              <Link href="/guides" className="block text-sm text-muted-foreground hover:text-primary">
                Learning Guides
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-primary">
                FAQ
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Legal</h4>
            <nav className="space-y-2">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PurpLLE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
