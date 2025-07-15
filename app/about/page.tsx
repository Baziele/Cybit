"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, BookOpen, Award, Target, Heart, Mail, LinkedinIcon, GithubIcon } from "lucide-react"
import { Navigation } from "@/components/navigation"

const patrons = [
  {
    name: "Dr. Emily Roberts",
    title: "Dean of Computer Science",
    organization: "Tech University",
    image: "/placeholder.svg?height=150&width=150",
    description: "Leading advocate for student tech education and innovation",
  },
  {
    name: "Prof. Michael Chen",
    title: "Head of AI Research",
    organization: "Innovation Labs",
    image: "/placeholder.svg?height=150&width=150",
    description: "Pioneering research in machine learning and artificial intelligence",
  },
  {
    name: "Sarah Johnson",
    title: "CTO",
    organization: "TechCorp Solutions",
    image: "/placeholder.svg?height=150&width=150",
    description: "Industry leader supporting student development and mentorship",
  },
]

const currentExecutives = [
  {
    name: "Alex Rivera",
    title: "President",
    year: "Final Year CS",
    image: "/placeholder.svg?height=120&width=120",
    bio: "Passionate about fostering tech community and organizing workshops",
    social: {
      linkedin: "#",
      github: "#",
      email: "alex.rivera@cybit.club",
    },
  },
  {
    name: "Maya Patel",
    title: "Vice President",
    year: "Third Year SE",
    image: "/placeholder.svg?height=120&width=120",
    bio: "Specializes in web development and leads our project teams",
    social: {
      linkedin: "#",
      github: "#",
      email: "maya.patel@cybit.club",
    },
  },
  {
    name: "Jordan Kim",
    title: "Technical Lead",
    year: "Final Year CS",
    image: "/placeholder.svg?height=120&width=120",
    bio: "Full-stack developer with expertise in modern web technologies",
    social: {
      linkedin: "#",
      github: "#",
      email: "jordan.kim@cybit.club",
    },
  },
  {
    name: "Priya Sharma",
    title: "Events Coordinator",
    year: "Second Year IT",
    image: "/placeholder.svg?height=120&width=120",
    bio: "Organizes hackathons, workshops, and networking events",
    social: {
      linkedin: "#",
      github: "#",
      email: "priya.sharma@cybit.club",
    },
  },
]

const pastExecutives = [
  {
    name: "David Liu",
    title: "Former President",
    year: "2022-2023",
    currentRole: "Software Engineer at Google",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Amanda Rodriguez",
    title: "Former Vice President",
    year: "2022-2023",
    currentRole: "Product Manager at Microsoft",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Ryan Thompson",
    title: "Former Technical Lead",
    year: "2021-2022",
    currentRole: "Senior Developer at Meta",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sofia Gonzalez",
    title: "Former Events Coordinator",
    year: "2021-2022",
    currentRole: "UX Designer at Adobe",
    image: "/placeholder.svg?height=100&width=100",
  },
]

const achievements = [
  { number: "500+", label: "Active Members", icon: Users },
  { number: "50+", label: "Courses Delivered", icon: BookOpen },
  { number: "25+", label: "Industry Partners", icon: Award },
  { number: "100+", label: "Projects Completed", icon: Target },
]

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("patrons")

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation currentPage="about" />

      {/* Hero Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">About Cybit Tech Club</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Empowering students to excel in technology through community, learning, and innovation. Join us in
              building the future of tech education.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <img src="/placeholder.svg?height=400&width=600" alt="Cybit Tech Club" className="rounded-lg shadow-xl" />
            </div>
            <div className="space-y-8 animate-slide-in-right">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To create an inclusive community where students can learn, grow, and excel in technology. We provide
                  free, high-quality education and mentorship to bridge the gap between academic learning and industry
                  requirements.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be the leading student-driven tech community that produces industry-ready professionals and
                  innovative solutions for tomorrow's challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Celebrating our achievements and milestones</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow animate-scale-in">
                <CardContent className="pt-6">
                  <achievement.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                  <div className="text-gray-600">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Tabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership</h2>
            <p className="text-xl text-gray-600">Meet the people who make Cybit possible</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("patrons")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "patrons" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Patrons
              </button>
              <button
                onClick={() => setActiveTab("current")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "current" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Current Executives
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "past" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Past Executives
              </button>
            </div>
          </div>

          {/* Patrons */}
          {activeTab === "patrons" && (
            <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
              {patrons.map((patron, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                      <AvatarImage src={patron.image || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">
                        {patron.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{patron.name}</CardTitle>
                    <CardDescription className="text-base">
                      {patron.title}
                      <br />
                      <span className="text-blue-600 font-medium">{patron.organization}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{patron.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Current Executives */}
          {activeTab === "current" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {currentExecutives.map((exec, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={exec.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {exec.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{exec.name}</CardTitle>
                    <Badge className="mb-2">{exec.title}</Badge>
                    <CardDescription>{exec.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{exec.bio}</p>
                    <div className="flex justify-center space-x-3">
                      <a href={exec.social.linkedin} className="text-blue-600 hover:text-blue-800">
                        <LinkedinIcon className="h-4 w-4" />
                      </a>
                      <a href={exec.social.github} className="text-gray-600 hover:text-gray-800">
                        <GithubIcon className="h-4 w-4" />
                      </a>
                      <a href={`mailto:${exec.social.email}`} className="text-red-600 hover:text-red-800">
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Past Executives */}
          {activeTab === "past" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {pastExecutives.map((exec, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={exec.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {exec.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{exec.name}</CardTitle>
                    <CardDescription>
                      {exec.title} ({exec.year})
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-blue-600 font-medium">{exec.currentRole}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Club Photos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Club Life</h2>
            <p className="text-xl text-gray-600">Capturing our moments together</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform"
              >
                <img
                  src={`/placeholder.svg?height=300&width=300&text=Club Photo ${index}`}
                  alt={`Club Photo ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Become part of a thriving tech community where learning never stops and opportunities abound.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                <Heart className="mr-2 h-5 w-5" />
                Join Cybit Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-gray-900"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
