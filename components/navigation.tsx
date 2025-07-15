import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavigationProps {
  currentPage?: string
}

export function Navigation({ currentPage = "" }: NavigationProps) {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Cybit</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors ${
                currentPage === "home" ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`transition-colors ${
                currentPage === "courses" ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Courses
            </Link>
            <Link
              href="/playground"
              className={`transition-colors ${
                currentPage === "playground" ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Playground
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                currentPage === "about" ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${
                currentPage === "contact" ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/profile"
              className={`transition-colors ${
                currentPage === "profile" ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Profile
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
