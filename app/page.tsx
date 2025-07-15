import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Code, Users, BookOpen, Trophy, ArrowRight, Play, Star } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { coursesData } from "@/lib/courses-data"

export default function HomePage() {
  // Get featured courses (first 3 courses)
  const featuredCourses = coursesData.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-primary/5">
        {/* Background geometric lines */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <path d="M200 400L400 200L600 400L800 200L1000 400" stroke="currentColor" strokeWidth="2" />
            <path d="M100 500L300 300L500 500L700 300L900 500L1100 300" stroke="currentColor" strokeWidth="2" />
            <circle cx="400" cy="200" r="4" fill="currentColor" />
            <circle cx="600" cy="400" r="4" fill="currentColor" />
            <circle cx="800" cy="200" r="4" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Special Offer Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-primary">Get Exclusive Offers 🎯</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Improve your
                  <br />
                  <span className="text-primary">skills easily</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Our courses are carefully curated to provide you with the latest industry knowledge and expertise. We
                  work with experts in their fields to ensure that our courses are up-to-date and relevant.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Input
                  placeholder="Find your passion right now"
                  className="border-2 rounded-full pl-6 pr-14 py-6 text-lg placeholder:text-muted-foreground"
                />
                <Button size="icon" className="absolute right-2 top-2 rounded-full w-10 h-10">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Content - Floating UI Elements */}
            <div className="relative lg:h-[600px]">
              {/* Main Student Image */}
              <div className="absolute top-0 right-0 w-80 h-96 rounded-2xl overflow-hidden border-2 border-border">
                <img src="/images/student-hero.png" alt="Student learning" className="w-full h-full object-cover" />
              </div>

              {/* Floating Course Card 1 */}
              <Card className="absolute top-16 left-0 w-64 shadow-2xl transform -rotate-3">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Explore Course Library</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Course Card 2 */}
              <Card className="absolute top-32 right-16 w-56 shadow-2xl transform rotate-2">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Play className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-sm">Create New Course</span>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Video Call Card */}
              <Card className="absolute bottom-32 left-8 w-72 bg-primary shadow-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-background rounded-full overflow-hidden">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Instructor"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-primary-foreground text-sm font-medium">Hi, I'm Mira, welcome to the course</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button size="sm" variant="secondary" className="rounded-full px-3 py-1">
                          Mira
                        </Button>
                        <div className="flex items-center space-x-1">
                          <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                            <Play className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-1 h-4 bg-primary-foreground/60 rounded-full"></div>
                            <div className="w-1 h-6 bg-primary-foreground rounded-full"></div>
                            <div className="w-1 h-4 bg-primary-foreground/60 rounded-full"></div>
                            <div className="w-1 h-5 bg-primary-foreground/80 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2">
                    <p className="text-primary-foreground/80 text-xs">Hi, I'm Mira, welcome to the course!</p>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="absolute bottom-0 right-0 w-64 bg-primary shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary-foreground mb-2">150+</div>
                  <div className="text-primary-foreground/80 text-sm font-medium mb-4">FIELDS OF STUDY</div>
                  <div className="space-y-2">
                    <h3 className="text-primary-foreground font-semibold">Choose what you want to learn with us!</h3>
                    <p className="text-primary-foreground/80 text-sm">
                      We offer a vast range of courses on a variety of topics, so you can choose the ones that interest
                      you the most.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Floating geometric shape */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/20 rounded-2xl transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{coursesData.length}+</div>
              <div className="text-muted-foreground">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Cybit?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to excel in the tech industry
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Expert-Led Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Learn from industry professionals with real-world experience in cutting-edge technologies.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Collaborative Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect with like-minded peers, work on projects together, and build lasting professional
                  relationships.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Career Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get mentorship, portfolio reviews, and job placement assistance to accelerate your tech career.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular courses designed to boost your tech skills
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary">
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <CardDescription>by {course.instructor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{course.duration}</span>
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{course.rating}</span>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <Button size="sm">View Course</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button size="lg" variant="outline">
                View All Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Tech Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students who have transformed their careers with Cybit
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Cybit</span>
              </div>
              <p className="text-muted-foreground">
                Empowering the next generation of tech professionals through quality education and community.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/courses" className="hover:text-foreground transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Cybit Tech Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
