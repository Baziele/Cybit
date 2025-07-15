"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Upload, Save, ArrowLeft, HelpCircle } from "lucide-react"

interface Section {
  id: string
  title: string
  description: string
  videoUrl: string
  resources: Resource[]
  quiz: Quiz | null
}

interface Resource {
  id: string
  name: string
  type: "pdf" | "image" | "link"
  url: string
}

interface Quiz {
  id: string
  title: string
  questions: Question[]
}

interface Question {
  id: string
  type: "multiple-choice" | "short-answer" | "coding"
  question: string
  options?: string[]
  correctAnswer: string
  explanation?: string
}

export default function CreateCourse() {
  const router = useRouter()
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    thumbnail: "",
    tags: [] as string[],
  })
  const [sections, setSections] = useState<Section[]>([])
  const [currentTag, setCurrentTag] = useState("")

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: "",
      description: "",
      videoUrl: "",
      resources: [],
      quiz: null,
    }
    setSections([...sections, newSection])
  }

  const updateSection = (sectionId: string, field: string, value: any) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, [field]: value } : section)))
  }

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId))
  }

  const addResource = (sectionId: string) => {
    const newResource: Resource = {
      id: Date.now().toString(),
      name: "",
      type: "pdf",
      url: "",
    }
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, resources: [...section.resources, newResource] } : section,
      ),
    )
  }

  const updateResource = (sectionId: string, resourceId: string, field: string, value: any) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              resources: section.resources.map((resource) =>
                resource.id === resourceId ? { ...resource, [field]: value } : resource,
              ),
            }
          : section,
      ),
    )
  }

  const deleteResource = (sectionId: string, resourceId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, resources: section.resources.filter((r) => r.id !== resourceId) }
          : section,
      ),
    )
  }

  const addQuiz = (sectionId: string) => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: "",
      questions: [],
    }
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, quiz: newQuiz } : section)))
  }

  const addQuestion = (sectionId: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    }
    setSections(
      sections.map((section) =>
        section.id === sectionId && section.quiz
          ? {
              ...section,
              quiz: {
                ...section.quiz,
                questions: [...section.quiz.questions, newQuestion],
              },
            }
          : section,
      ),
    )
  }

  const updateQuestion = (sectionId: string, questionId: string, field: string, value: any) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId && section.quiz
          ? {
              ...section,
              quiz: {
                ...section.quiz,
                questions: section.quiz.questions.map((question) =>
                  question.id === questionId ? { ...question, [field]: value } : question,
                ),
              },
            }
          : section,
      ),
    )
  }

  const addTag = () => {
    if (currentTag && !courseData.tags.includes(currentTag)) {
      setCourseData({
        ...courseData,
        tags: [...courseData.tags, currentTag],
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCourseData({
      ...courseData,
      tags: courseData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Course Data:", courseData)
    console.log("Sections:", sections)
    router.push("/admin/courses")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Create New Course</h2>
            <p className="text-muted-foreground">Build a comprehensive learning experience</p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Course
        </Button>
      </div>

      {/* Course Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Basic details about your course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                placeholder="Enter course title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={courseData.category}
                onValueChange={(value) => setCourseData({ ...courseData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={courseData.description}
              onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
              placeholder="Describe what students will learn"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={courseData.level}
                onValueChange={(value) => setCourseData({ ...courseData, level: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={courseData.duration}
                onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                placeholder="e.g., 8 hours"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={courseData.price}
                onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex space-x-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === "Enter" && addTag()}
              />
              <Button type="button" onClick={addTag}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {courseData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} ×
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Sections */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Course Sections</CardTitle>
              <CardDescription>Organize your course content into sections</CardDescription>
            </div>
            <Button onClick={addSection}>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {sections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No sections added yet. Click "Add Section" to get started.
            </div>
          ) : (
            <div className="space-y-6">
              {sections.map((section, index) => (
                <Card key={section.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Label>Section {index + 1} Title</Label>
                        </div>
                        <Input
                          value={section.title}
                          onChange={(e) => updateSection(section.id, "title", e.target.value)}
                          placeholder="Enter section title"
                          className="mt-2"
                        />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => deleteSection(section.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={section.description}
                        onChange={(e) => updateSection(section.id, "description", e.target.value)}
                        placeholder="Describe this section"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Video URL</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={section.videoUrl}
                          onChange={(e) => updateSection(section.id, "videoUrl", e.target.value)}
                          placeholder="Enter video URL or upload"
                        />
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Resources</Label>
                        <Button variant="outline" size="sm" onClick={() => addResource(section.id)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Resource
                        </Button>
                      </div>
                      {section.resources.map((resource) => (
                        <div key={resource.id} className="flex space-x-2 items-end">
                          <div className="flex-1">
                            <Input
                              value={resource.name}
                              onChange={(e) => updateResource(section.id, resource.id, "name", e.target.value)}
                              placeholder="Resource name"
                            />
                          </div>
                          <Select
                            value={resource.type}
                            onValueChange={(value) => updateResource(section.id, resource.id, "type", value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="link">Link</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex-1">
                            <Input
                              value={resource.url}
                              onChange={(e) => updateResource(section.id, resource.id, "url", e.target.value)}
                              placeholder="URL or file path"
                            />
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => deleteResource(section.id, resource.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Quiz */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Quiz</Label>
                        {!section.quiz ? (
                          <Button variant="outline" size="sm" onClick={() => addQuiz(section.id)}>
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Add Quiz
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => addQuestion(section.id)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Question
                          </Button>
                        )}
                      </div>

                      {section.quiz && (
                        <div className="space-y-4 p-4 border rounded-lg">
                          <Input
                            value={section.quiz.title}
                            onChange={(e) =>
                              updateSection(section.id, "quiz", { ...section.quiz, title: e.target.value })
                            }
                            placeholder="Quiz title"
                          />

                          {section.quiz.questions.map((question, qIndex) => (
                            <div key={question.id} className="space-y-2 p-3 border rounded">
                              <div className="flex justify-between items-start">
                                <Label>Question {qIndex + 1}</Label>
                                <Select
                                  value={question.type}
                                  onValueChange={(value) => updateQuestion(section.id, question.id, "type", value)}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                    <SelectItem value="short-answer">Short Answer</SelectItem>
                                    <SelectItem value="coding">Coding</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <Textarea
                                value={question.question}
                                onChange={(e) => updateQuestion(section.id, question.id, "question", e.target.value)}
                                placeholder="Enter your question"
                                rows={2}
                              />

                              {question.type === "multiple-choice" && question.options && (
                                <div className="space-y-2">
                                  <Label>Options</Label>
                                  {question.options.map((option, oIndex) => (
                                    <Input
                                      key={oIndex}
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...question.options!]
                                        newOptions[oIndex] = e.target.value
                                        updateQuestion(section.id, question.id, "options", newOptions)
                                      }}
                                      placeholder={`Option ${oIndex + 1}`}
                                    />
                                  ))}
                                </div>
                              )}

                              <div className="space-y-2">
                                <Label>Correct Answer</Label>
                                <Input
                                  value={question.correctAnswer}
                                  onChange={(e) =>
                                    updateQuestion(section.id, question.id, "correctAnswer", e.target.value)
                                  }
                                  placeholder="Enter correct answer"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Explanation (Optional)</Label>
                                <Textarea
                                  value={question.explanation || ""}
                                  onChange={(e) =>
                                    updateQuestion(section.id, question.id, "explanation", e.target.value)
                                  }
                                  placeholder="Explain the correct answer"
                                  rows={2}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
