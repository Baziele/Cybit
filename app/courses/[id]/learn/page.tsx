"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { getCourseById } from "@/lib/courses-data"
import { Navigation } from "@/components/navigation"
import { QuizSystem } from "@/components/quiz-system"
import { CodeEditor } from "@/components/code-editor"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize,
  CheckCircle,
  Download,
  FileText,
  Code2,
  HelpCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Trophy,
} from "lucide-react"

// Sample quiz data for demonstration
const sampleQuizzes = {
  1: [
    {
      id: "q1",
      type: "multiple-choice" as const,
      question: "What is the correct way to create a React component?",
      options: [
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = () => <div>Hello</div>;",
        "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
        "All of the above",
      ],
      correctAnswer: "All of the above",
      explanation: "React components can be created using function declarations, arrow functions, or class components.",
      points: 10,
    },
    {
      id: "q2",
      type: "coding" as const,
      question: "Create a simple React component that displays 'Hello, World!' in an h1 tag.",
      language: "javascript",
      starterCode: `import React from 'react';

function HelloWorld() {
  // Your code here
}

export default HelloWorld;`,
      expectedOutput: "<h1>Hello, World!</h1>",
      points: 20,
    },
    {
      id: "q3",
      type: "short-answer" as const,
      question: "What does JSX stand for?",
      correctAnswer: "JavaScript XML",
      explanation: "JSX stands for JavaScript XML. It allows you to write HTML-like syntax in JavaScript.",
      points: 5,
    },
  ],
  2: [
    {
      id: "q4",
      type: "multiple-select" as const,
      question: "Which of the following are valid Python data types?",
      options: ["int", "string", "list", "boolean", "array"],
      correctAnswer: ["int", "string", "list", "boolean"],
      explanation:
        "Python has int, str (not string), list, and bool (not boolean) as built-in types. Array is not a built-in type.",
      points: 15,
    },
    {
      id: "q5",
      type: "coding" as const,
      question: "Write a Python function that calculates the factorial of a number.",
      language: "python",
      starterCode: `def factorial(n):
    # Your code here
    pass

# Test your function
print(factorial(5))  # Should output 120`,
      expectedOutput: "120",
      points: 25,
    },
  ],
}

export default function VideoPlayerPage({ params }: { params: { id: string } }) {
  const courseId = Number.parseInt(params.id)
  const course = getCourseById(courseId)

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizScores, setQuizScores] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState("")

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

  // Flatten all videos from all curriculum sections
  const allVideos = course.curriculum.flatMap((section) =>
    section.videos.map((video) => ({ ...video, sectionTitle: section.title })),
  )

  const currentVideo = allVideos[currentVideoIndex]
  const completedVideos = allVideos.filter((video) => video.isCompleted).length
  const progressPercentage = (completedVideos / allVideos.length) * 100

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index)
    setIsPlaying(false)
    setShowQuiz(false)
  }

  const handleNextVideo = () => {
    if (currentVideoIndex < allVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1)
      setIsPlaying(false)
      setShowQuiz(false)
    }
  }

  const handlePrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1)
      setIsPlaying(false)
      setShowQuiz(false)
    }
  }

  const handleQuizComplete = (score: number, answers: Record<string, any>) => {
    setQuizScores((prev) => ({ ...prev, [currentVideo.id]: score }))
    console.log("Quiz completed with score:", score, "Answers:", answers)
  }

  const currentQuiz = sampleQuizzes[currentVideo.id as keyof typeof sampleQuizzes]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-3">
            {/* Video Player */}
            <Card className="mb-6 overflow-hidden">
              <div className="aspect-video bg-black relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-20 w-20 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-semibold mb-2">{currentVideo.title}</h3>
                    <p className="text-gray-300">Duration: {currentVideo.duration}</p>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={handlePrevVideo}
                      disabled={currentVideoIndex === 0}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={handleNextVideo}
                      disabled={currentVideoIndex === allVideos.length - 1}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>

                    <div className="flex-1">
                      <Progress value={45} className="h-1" />
                    </div>

                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Volume2 className="h-4 w-4" />
                    </Button>

                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quiz Section */}
            {showQuiz && currentQuiz ? (
              <div className="mb-6">
                <QuizSystem
                  questions={currentQuiz}
                  onComplete={handleQuizComplete}
                  title={`${currentVideo.title} - Quiz`}
                />
              </div>
            ) : (
              /* Video Content Tabs */
              <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-card rounded-lg shadow-sm border">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="code">Code Practice</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{currentVideo.duration}</span>
                        </div>
                        <Badge variant="outline">{currentVideo.sectionTitle}</Badge>
                        {currentVideo.isCompleted && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {quizScores[currentVideo.id] && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            <Trophy className="h-3 w-3 mr-1" />
                            Quiz: {quizScores[currentVideo.id]}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{currentVideo.description}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Downloadable Resources</h3>
                    {currentVideo.resources && currentVideo.resources.length > 0 ? (
                      <div className="grid gap-3">
                        {currentVideo.resources.map((resource, index) => (
                          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {resource.type === "pdf" ? (
                                  <FileText className="h-5 w-5 text-red-500" />
                                ) : (
                                  <Code2 className="h-5 w-5 text-primary" />
                                )}
                                <div>
                                  <p className="font-medium">{resource.name}</p>
                                  <p className="text-sm text-muted-foreground capitalize">{resource.type} file</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No resources available for this video.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="quiz" className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Interactive Quiz</h3>
                      {quizScores[currentVideo.id] && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Trophy className="h-4 w-4 mr-1" />
                          Best Score: {quizScores[currentVideo.id]}%
                        </Badge>
                      )}
                    </div>

                    {currentQuiz ? (
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Test your understanding of this video with an interactive quiz featuring multiple question
                          types.
                        </p>
                        <div className="flex items-center space-x-4">
                          <Button onClick={() => setShowQuiz(true)} className="flex items-center space-x-2">
                            <HelpCircle className="h-4 w-4" />
                            <span>Start Quiz</span>
                          </Button>
                          <div className="text-sm text-muted-foreground">
                            {currentQuiz.length} questions • {currentQuiz.reduce((sum, q) => sum + q.points, 0)} points
                            total
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No quiz available for this video.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="code" className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Code Practice</h3>
                    <p className="text-muted-foreground mb-4">
                      Practice coding with our interactive editor. Try different programming languages and see your code
                      in action.
                    </p>
                    <CodeEditor
                      title="Practice Code Editor"
                      showOutput={true}
                      onCodeChange={(code) => console.log("Code changed:", code)}
                      onRun={(code, language) => console.log("Running code:", code, "in", language)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Notes</h3>
                    <p className="text-muted-foreground">
                      Take notes about this video to help you remember key concepts and ideas.
                    </p>
                    <Textarea
                      placeholder="Take notes about this video..."
                      rows={10}
                      className="resize-none"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <Button>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Save Notes
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>

          {/* Video Playlist Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Course Progress</span>
                  <Badge variant="outline">{Math.round(progressPercentage)}%</Badge>
                </CardTitle>
                <Progress value={progressPercentage} className="h-2" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {allVideos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`p-4 border-b cursor-pointer transition-colors ${
                        index === currentVideoIndex ? "bg-primary/10 border-l-4 border-l-primary" : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleVideoSelect(index)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {video.isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : index === currentVideoIndex ? (
                            <Play className="h-5 w-5 text-primary" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium text-sm ${index === currentVideoIndex ? "text-primary" : ""}`}>
                            {video.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">{video.duration}</span>
                            <Badge variant="outline" className="text-xs">
                              {video.sectionTitle}
                            </Badge>
                            {quizScores[video.id] && (
                              <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-600">
                                <Trophy className="h-2 w-2 mr-1" />
                                {quizScores[video.id]}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={handlePrevVideo} disabled={currentVideoIndex === 0}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Video
              </Button>
              <Button
                className="w-full"
                onClick={handleNextVideo}
                disabled={currentVideoIndex === allVideos.length - 1}
              >
                Next Video
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
