"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import {
  Calendar,
  MapPin,
  LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Star,
  Clock,
  BookOpen,
  Zap,
  Settings,
  Edit,
  Trophy,
  Code,
  Brain,
  Flame,
} from "lucide-react"

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  bio: string
  location: string
  website: string
  github: string
  linkedin: string
  twitter: string
  joinDate: string
  avatar: string
  skills: string[]
  interests: string[]
  achievements: Achievement[]
  courseHistory: CourseProgress[]
  stats: UserStats
  recentActivity: Activity[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  dateEarned: string
  category: "course" | "skill" | "community" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface CourseProgress {
  courseId: number
  title: string
  instructor: string
  progress: number
  status: "in-progress" | "completed" | "not-started"
  startDate: string
  completionDate?: string
  grade?: number
  certificate?: boolean
  thumbnail: string
}

interface UserStats {
  totalCourses: number
  completedCourses: number
  totalHours: number
  currentStreak: number
  longestStreak: number
  averageGrade: number
  rank: string
  xp: number
  level: number
}

interface Activity {
  id: string
  type: "course_completed" | "achievement_earned" | "streak_milestone" | "quiz_passed"
  title: string
  description: string
  timestamp: string
  icon: string
}

export default function ProfilePage() {
  // Mock user data
  const [userProfile] = useState<UserProfile>({
    id: "user-123",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    bio: "Passionate full-stack developer with a love for learning new technologies. Currently focusing on React, Node.js, and cloud computing. Always excited to take on new challenges and collaborate with fellow developers.",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    github: "alexjohnson",
    linkedin: "alex-johnson-dev",
    twitter: "alexjohnsondev",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg?height=150&width=150",
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "MongoDB"],
    interests: ["Web Development", "Machine Learning", "Cloud Computing", "Open Source"],
    achievements: [
      {
        id: "1",
        title: "First Steps",
        description: "Completed your first course",
        icon: "🎓",
        dateEarned: "2023-02-01",
        category: "course",
        rarity: "common",
      },
      {
        id: "2",
        title: "JavaScript Ninja",
        description: "Mastered all JavaScript courses",
        icon: "⚡",
        dateEarned: "2023-03-15",
        category: "skill",
        rarity: "rare",
      },
      {
        id: "3",
        title: "Community Champion",
        description: "Helped 50+ students in forums",
        icon: "🤝",
        dateEarned: "2023-04-10",
        category: "community",
        rarity: "epic",
      },
      {
        id: "4",
        title: "Speed Demon",
        description: "Completed 10 courses in one month",
        icon: "🚀",
        dateEarned: "2023-05-01",
        category: "special",
        rarity: "legendary",
      },
    ],
    courseHistory: [
      {
        courseId: 1,
        title: "Full Stack Web Development with React & Node.js",
        instructor: "Sarah Chen",
        progress: 100,
        status: "completed",
        startDate: "2023-01-20",
        completionDate: "2023-02-28",
        grade: 95,
        certificate: true,
        thumbnail: "/placeholder.svg?height=100&width=150",
      },
      {
        courseId: 2,
        title: "Machine Learning Fundamentals with Python",
        instructor: "Dr. Alex Kumar",
        progress: 75,
        status: "in-progress",
        startDate: "2023-03-01",
        thumbnail: "/placeholder.svg?height=100&width=150",
      },
      {
        courseId: 3,
        title: "Cloud Computing with AWS",
        instructor: "Jennifer Park",
        progress: 100,
        status: "completed",
        startDate: "2023-02-15",
        completionDate: "2023-03-30",
        grade: 88,
        certificate: true,
        thumbnail: "/placeholder.svg?height=100&width=150",
      },
    ],
    stats: {
      totalCourses: 8,
      completedCourses: 5,
      totalHours: 120,
      currentStreak: 15,
      longestStreak: 30,
      averageGrade: 91,
      rank: "Advanced Learner",
      xp: 2450,
      level: 12,
    },
    recentActivity: [
      {
        id: "1",
        type: "course_completed",
        title: "Course Completed",
        description: "Finished 'Cloud Computing with AWS'",
        timestamp: "2023-03-30T14:30:00Z",
        icon: "🎯",
      },
      {
        id: "2",
        type: "achievement_earned",
        title: "Achievement Unlocked",
        description: "Earned 'JavaScript Ninja' badge",
        timestamp: "2023-03-15T10:15:00Z",
        icon: "🏆",
      },
      {
        id: "3",
        type: "streak_milestone",
        title: "Streak Milestone",
        description: "Reached 15-day learning streak",
        timestamp: "2023-03-10T09:00:00Z",
        icon: "🔥",
      },
    ],
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getXPToNextLevel = () => {
    const baseXP = 200
    const nextLevelXP = baseXP * userProfile.stats.level
    const currentLevelXP = baseXP * (userProfile.stats.level - 1)
    const progressXP = userProfile.stats.xp - currentLevelXP
    const neededXP = nextLevelXP - currentLevelXP
    return { progressXP, neededXP, percentage: (progressXP / neededXP) * 100 }
  }

  const xpProgress = getXPToNextLevel()

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="profile" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {userProfile.firstName}!</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/settings">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xl">
                      {userProfile.firstName[0]}
                      {userProfile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">
                    {userProfile.firstName} {userProfile.lastName}
                  </h2>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                  <Badge className="mt-2">{userProfile.stats.rank}</Badge>
                </div>

                <div className="mt-6 space-y-3">
                  {userProfile.location && (
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                  {userProfile.website && (
                    <div className="flex items-center space-x-2 text-sm">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={userProfile.website}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {new Date(userProfile.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-3 mt-4">
                  {userProfile.github && (
                    <a href={`https://github.com/${userProfile.github}`} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    </a>
                  )}
                  {userProfile.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${userProfile.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    </a>
                  )}
                  {userProfile.twitter && (
                    <a href={`https://twitter.com/${userProfile.twitter}`} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span>Level Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary">Level {userProfile.stats.level}</div>
                  <div className="text-sm text-muted-foreground">{userProfile.stats.xp} XP</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{xpProgress.progressXP} XP</span>
                    <span>{xpProgress.neededXP} XP</span>
                  </div>
                  <Progress value={xpProgress.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    {xpProgress.neededXP - xpProgress.progressXP} XP to next level
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Courses</span>
                  </div>
                  <span className="font-medium">
                    {userProfile.stats.completedCourses}/{userProfile.stats.totalCourses}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Hours</span>
                  </div>
                  <span className="font-medium">{userProfile.stats.totalHours}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Streak</span>
                  </div>
                  <span className="font-medium">{userProfile.stats.currentStreak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Avg Grade</span>
                  </div>
                  <span className="font-medium">{userProfile.stats.averageGrade}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{userProfile.stats.completedCourses}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hours</p>
                    <p className="text-2xl font-bold">{userProfile.stats.totalHours}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Streak</p>
                    <p className="text-2xl font-bold">{userProfile.stats.currentStreak}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                    <p className="text-2xl font-bold">{userProfile.achievements.length}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Courses</span>
                  <Link href="/courses">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile.courseHistory
                    .filter((course) => course.status === "in-progress")
                    .map((course) => (
                      <div key={course.courseId} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={course.thumbnail || "/placeholder.svg"}
                          alt={course.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Progress value={course.progress} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                        </div>
                        <Link href={`/courses/${course.courseId}/learn`}>
                          <Button size="sm">Continue</Button>
                        </Link>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {userProfile.achievements.slice(0, 4).map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 border-2 rounded-lg ${getRarityColor(achievement.rarity)}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm opacity-80 mb-2">{achievement.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs capitalize">
                              {achievement.rarity}
                            </Badge>
                            <span className="text-xs opacity-70">
                              {new Date(achievement.dateEarned).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills & Interests */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="h-5 w-5" />
                    <span>Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Interests</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.interests.map((interest) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
