"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { getCourseById } from "@/lib/courses-data"
import {
  Star,
  Clock,
  Users,
  Play,
  CheckCircle,
  Lock,
  Download,
  Share,
  Heart,
  Calendar,
  Award,
  BookOpen,
  ArrowLeft,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = Number.parseInt(params.id)
  const course = getCourseById(courseId)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [activeVideo, setActiveVideo] = useState(course?.curriculum[0]?.videos[0])

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Link href="/courses">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleEnroll = () => {
    setIsEnrolled(true)
    // In a real app, this would make an API call to enroll the user
    // Then redirect to the video player page
    window.location.href = `/courses/${params.id}/learn`
  }

  const totalLessons = course.curriculum.reduce((total, section) => total + section.lessons, 0)
  const completedLessons = course.curriculum.reduce(
    (total, section) => total + section.videos.filter((video) => video.isCompleted).length,
    0,
  )
  const progressPercentage = (completedLessons / totalLessons) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation currentPage="courses" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <span>/</span>
            <span className="text-foreground">{course.title}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-card rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2">{course.category}</Badge>
                  <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                  <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{course.rating}</span>
                  <span className="ml-1 text-muted-foreground">({course.students} students)</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{totalLessons} lessons</span>
                </div>
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="outline">{course.language}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {isEnrolled && (
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">Course Progress</span>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      {Math.round(progressPercentage)}% Complete
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              )}
            </div>

            {/* Video Player */}
            {isEnrolled && activeVideo && (
              <div className="bg-card rounded-lg shadow-sm border mb-6 overflow-hidden">
                <div className="aspect-video bg-black relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <h3 className="text-xl font-semibold mb-2">{activeVideo.title}</h3>
                      <p className="text-gray-300">Duration: {activeVideo.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{activeVideo.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Course Content Tabs */}
            <Tabs defaultValue="curriculum" className="bg-card rounded-lg shadow-sm border">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="p-6">
                <div className="space-y-4">
                  {course.curriculum.map((section) => (
                    <Card key={section.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {section.lessons} lessons • {section.duration}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {section.videos.map((video) => (
                            <div
                              key={video.id}
                              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                activeVideo?.id === video.id ? "bg-primary/10 border-primary/20" : "hover:bg-muted/50"
                              } ${video.isLocked && !isEnrolled ? "opacity-50" : ""}`}
                              onClick={() => {
                                if (!video.isLocked || isEnrolled) {
                                  setActiveVideo(video)
                                }
                              }}
                            >
                              <div className="flex items-center space-x-3">
                                {video.isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : video.isLocked && !isEnrolled ? (
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <Play className="h-5 w-5 text-primary" />
                                )}
                                <div>
                                  <div className="font-medium">{video.title}</div>
                                  <div className="text-sm text-muted-foreground">{video.duration}</div>
                                </div>
                              </div>
                              {video.isLocked && !isEnrolled && <Badge variant="outline">Premium</Badge>}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="overview" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">About this course</h3>
                    <p className="text-muted-foreground leading-relaxed">{course.longDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {course.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{course.instructor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{course.instructor.experience}</p>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{course.instructor.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="ml-1 text-muted-foreground">
                          {course.instructor.students.toLocaleString()} students
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{course.instructor.bio}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground">Be the first to review this course!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Enrollment Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    {course.isFree ? (
                      <>
                        <div className="text-3xl font-bold text-green-600 mb-2">FREE</div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          No Cost • Full Access
                        </Badge>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-bold mb-2">${course.price}</div>
                        <Badge variant="outline">One-time payment</Badge>
                      </>
                    )}
                  </div>

                  {!isEnrolled ? (
                    <div className="space-y-3">
                      <Button onClick={handleEnroll} className="w-full" size="lg">
                        {course.isFree ? "Enroll for Free" : "Enroll Now"}
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Heart className="h-4 w-4 mr-2" />
                        Add to Wishlist
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="text-green-800 dark:text-green-200 font-medium">You're enrolled!</p>
                      </div>
                      <Link href={`/courses/${params.id}/learn`}>
                        <Button className="w-full" size="lg">
                          Continue Learning
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Students</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Language</span>
                      <span className="font-medium">{course.language}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Certificate</span>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{course.certificate ? "Yes" : "No"}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="font-medium">{new Date(course.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Features */}
              <Card>
                <CardHeader>
                  <CardTitle>This course includes:</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Play className="h-4 w-4 text-primary mr-3" />
                      <span>
                        {course.curriculum.reduce((total, section) => total + section.videos.length, 0)} video lectures
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-primary mr-3" />
                      <span>Downloadable resources</span>
                    </div>
                    {course.certificate && (
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-primary mr-3" />
                        <span>Certificate of completion</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-3" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-3" />
                      <span>Community access</span>
                    </div>
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
