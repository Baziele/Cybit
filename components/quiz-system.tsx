"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, HelpCircle, Code, Play, RotateCcw, Trophy } from 'lucide-react'

interface QuizQuestion {
  id: string
  type: "multiple-choice" | "multiple-select" | "short-answer" | "long-answer" | "coding" | "true-false"
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  explanation?: string
  points: number
  language?: string
  starterCode?: string
  expectedOutput?: string
  testCases?: { input: string; expectedOutput: string }[]
}

interface QuizSystemProps {
  questions: QuizQuestion[]
  onComplete: (score: number, answers: Record<string, any>) => void
  title?: string
}

export function QuizSystem({ questions, onComplete, title = "Quiz" }: QuizSystemProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, any>>({})

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleSubmitQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = () => {
    let totalScore = 0
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0)

    questions.forEach((question) => {
      const userAnswer = answers[question.id]
      if (checkAnswer(question, userAnswer)) {
        totalScore += question.points
      }
    })

    const finalScore = Math.round((totalScore / maxScore) * 100)
    setScore(finalScore)
    setSubmittedAnswers(answers)
    setShowResults(true)
    onComplete(finalScore, answers)
  }

  const checkAnswer = (question: QuizQuestion, userAnswer: any): boolean => {
    if (!userAnswer) return false

    switch (question.type) {
      case "multiple-choice":
      case "true-false":
        return userAnswer === question.correctAnswer
      case "multiple-select":
        if (!Array.isArray(question.correctAnswer) || !Array.isArray(userAnswer)) return false
        return (
          question.correctAnswer.length === userAnswer.length &&
          question.correctAnswer.every((answer) => userAnswer.includes(answer))
        )
      case "short-answer":
      case "long-answer":
        return userAnswer.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim()
      case "coding":
        // For coding questions, we'll implement a more sophisticated check
        return true // Placeholder - would need actual code execution
      default:
        return false
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
    setScore(0)
    setSubmittedAnswers({})
  }

  // Helper – stringify answers safely for display
  const formatAnswer = (ans: any) => {
    if (ans == null) return "No answer"
    if (Array.isArray(ans)) return ans.join(", ")
    if (typeof ans === "object") {
      // Coding answers are { code, output }
      if ("code" in ans) return ans.code.trim().slice(0, 100) + (ans.code.length > 100 ? "…" : "")
      return JSON.stringify(ans)
    }
    return String(ans)
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <div className="text-4xl font-bold text-primary mt-4">{score}%</div>
          <p className="text-muted-foreground">You scored {score}% on this quiz</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = submittedAnswers[question.id]
              const isCorrect = checkAnswer(question, userAnswer)

              return (
                <Card
                  key={question.id}
                  className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <Badge variant={isCorrect ? "default" : "destructive"}>{question.points} points</Badge>
                        </div>
                        <h3 className="font-medium">
                          Question {index + 1}: {question.question}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Your answer:</strong> {formatAnswer(userAnswer)}</p>
                      <p><strong>Correct answer:</strong> {formatAnswer(question.correctAnswer)}</p>
                      {question.explanation && (
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="flex justify-center space-x-4 mt-8">
            <Button onClick={resetQuiz} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
            <Button onClick={() => window.location.reload()}>Continue Learning</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5" />
            <span>{title}</span>
          </CardTitle>
          <Badge variant="outline">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            <Badge className="mb-4">{currentQuestion.points} points</Badge>
          </div>

          <QuestionRenderer
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
          />

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
              {currentQuestionIndex === questions.length - 1 ? "Submit Quiz" : "Next"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface QuestionRendererProps {
  question: QuizQuestion
  answer: any
  onAnswer: (answer: any) => void
}

function QuestionRenderer({ question, answer, onAnswer }: QuestionRendererProps) {
  switch (question.type) {
    case "multiple-choice":
      return (
        <RadioGroup value={answer} onValueChange={onAnswer}>
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      )

    case "multiple-select":
      return (
        <div className="space-y-2">
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`option-${index}`}
                checked={answer?.includes(option) || false}
                onCheckedChange={(checked) => {
                  const currentAnswers = answer || []
                  if (checked) {
                    onAnswer([...currentAnswers, option])
                  } else {
                    onAnswer(currentAnswers.filter((a: string) => a !== option))
                  }
                }}
              />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </div>
      )

    case "true-false":
      return (
        <RadioGroup value={answer} onValueChange={onAnswer}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="true" />
            <Label htmlFor="true">True</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="false" />
            <Label htmlFor="false">False</Label>
          </div>
        </RadioGroup>
      )

    case "short-answer":
      return (
        <Input placeholder="Enter your answer..." value={answer || ""} onChange={(e) => onAnswer(e.target.value)} />
      )

    case "long-answer":
      return (
        <Textarea
          placeholder="Enter your detailed answer..."
          value={answer || ""}
          onChange={(e) => onAnswer(e.target.value)}
          rows={6}
        />
      )

    case "coding":
      return <CodingQuestion question={question} answer={answer} onAnswer={onAnswer} />

    default:
      return <div>Unsupported question type</div>
  }
}

interface CodingQuestionProps {
  question: QuizQuestion
  answer: any
  onAnswer: (answer: any) => void
}

function CodingQuestion({ question, answer, onAnswer }: CodingQuestionProps) {
  const [code, setCode] = useState(answer?.code || question.starterCode || "")
  const [output, setOutput] = useState(answer?.output || "")
  const [isRunning, setIsRunning] = useState(false)

  const handleRunCode = async () => {
    setIsRunning(true)
    // Simulate code execution
    setTimeout(() => {
      let simulatedOutput = ""

      switch (question.language) {
        case "python":
          simulatedOutput = "Hello, World!\n"
          break
        case "javascript":
          simulatedOutput = "Hello, World!\n"
          break
        case "html":
          simulatedOutput = "<div>HTML rendered successfully</div>"
          break
        default:
          simulatedOutput = "Code executed successfully\n"
      }

      setOutput(simulatedOutput)
      onAnswer({ code, output: simulatedOutput })
      setIsRunning(false)
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <div className="bg-muted px-3 py-2 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span className="text-sm font-medium">Code Editor</span>
            <Badge variant="outline">{question.language}</Badge>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={handleRunCode} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setCode(question.starterCode || "")
                setOutput("")
              }}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
        <Textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            onAnswer({ code: e.target.value, output })
          }}
          placeholder="Write your code here..."
          className="font-mono text-sm min-h-[200px] border-0 resize-none focus:ring-0"
        />
      </div>

      {output && (
        <div className="border rounded-lg">
          <div className="bg-muted px-3 py-2 border-b">
            <span className="text-sm font-medium">Output</span>
          </div>
          <div className="p-3 bg-gray-900 text-green-400 font-mono text-sm">
            <pre>{output}</pre>
          </div>
        </div>
      )}

      {question.expectedOutput && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Expected Output:</p>
          <pre className="text-sm text-blue-700 dark:text-blue-300">{question.expectedOutput}</pre>
        </div>
      )}
    </div>
  )
}
