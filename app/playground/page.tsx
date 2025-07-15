"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import {
  Play,
  Save,
  Download,
  FolderOpen,
  Terminal,
  Globe,
  Settings,
  Code2,
  FileText,
  Trash2,
  Copy,
  Share,
} from "lucide-react"

// Monaco Editor will be loaded dynamically
let monaco: any = null

const LANGUAGE_CONFIGS = {
  javascript: {
    name: "JavaScript",
    extension: ".js",
    icon: "🟨",
    defaultCode: `// JavaScript Playground
console.log("Hello, World!");

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
    console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,
    monacoLanguage: "javascript",
  },
  typescript: {
    name: "TypeScript",
    extension: ".ts",
    icon: "🔷",
    defaultCode: `// TypeScript Playground
interface User {
    name: string;
    age: number;
    email?: string;
}

function greetUser(user: User): string {
    return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = {
    name: "Alice",
    age: 30,
    email: "alice@example.com"
};

console.log(greetUser(user));`,
    monacoLanguage: "typescript",
  },
  python: {
    name: "Python",
    extension: ".py",
    icon: "🐍",
    defaultCode: `# Python Playground
import math

def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def is_prime(n):
    """Check if a number is prime."""
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

print("Hello, World!")
print("\\nFibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

print("\\nPrime numbers up to 20:")
primes = [n for n in range(2, 21) if is_prime(n)]
print(primes)`,
    monacoLanguage: "python",
  },
  html: {
    name: "HTML",
    extension: ".html",
    icon: "🌐",
    defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Playground</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        h1 { color: #fff; text-align: center; }
        .card {
            background: rgba(255, 255, 255, 0.2);
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML Playground</h1>
        <div class="card">
            <h2>Interactive Elements</h2>
            <button onclick="alert('Hello from HTML!')">Click Me!</button>
            <input type="text" placeholder="Type something..." />
        </div>
        <div class="card">
            <h2>Dynamic Content</h2>
            <p id="time"></p>
            <script>
                setInterval(() => {
                    document.getElementById('time').textContent = 
                        'Current time: ' + new Date().toLocaleTimeString();
                }, 1000);
            </script>
        </div>
    </div>
</body>
</html>`,
    monacoLanguage: "html",
  },
  css: {
    name: "CSS",
    extension: ".css",
    icon: "🎨",
    defaultCode: `/* CSS Playground */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  color: white;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #fff, var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin: 20px 0;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.button {
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}`,
    monacoLanguage: "css",
  },
  json: {
    name: "JSON",
    extension: ".json",
    icon: "📄",
    defaultCode: `{
  "name": "JSON Playground",
  "version": "1.0.0",
  "description": "A playground for JSON data",
  "author": {
    "name": "Cybit User",
    "email": "user@cybit.club"
  },
  "features": [
    "Syntax highlighting",
    "Auto-completion",
    "Error detection",
    "Real-time validation"
  ],
  "config": {
    "theme": "dark",
    "fontSize": 14,
    "tabSize": 2,
    "wordWrap": true
  },
  "data": {
    "users": [
      {
        "id": 1,
        "name": "Alice Johnson",
        "role": "developer",
        "skills": ["JavaScript", "React", "Node.js"],
        "active": true
      },
      {
        "id": 2,
        "name": "Bob Smith",
        "role": "designer",
        "skills": ["Figma", "Photoshop", "CSS"],
        "active": false
      }
    ],
    "statistics": {
      "totalUsers": 2,
      "activeUsers": 1,
      "lastUpdated": "2024-01-20T10:30:00Z"
    }
  }
}`,
    monacoLanguage: "json",
  },
}

interface SavedFile {
  id: string
  name: string
  language: string
  code: string
  createdAt: string
  updatedAt: string
}

export default function PlaygroundPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [savedFiles, setSavedFiles] = useState<SavedFile[]>([])
  const [currentFileName, setCurrentFileName] = useState("")
  const [isMonacoLoaded, setIsMonacoLoaded] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showLoadDialog, setShowLoadDialog] = useState(false)

  const editorRef = useRef<any>(null)
  const monacoEditorRef = useRef<any>(null)

  // Load Monaco Editor
  useEffect(() => {
    const loadMonaco = async () => {
      if (typeof window !== "undefined" && !monaco) {
        // In a real implementation, you would load Monaco from CDN or npm
        // For this demo, we'll simulate Monaco loading
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock Monaco API
        monaco = {
          editor: {
            create: (container: HTMLElement, options: any) => {
              // Create a textarea as fallback
              const textarea = document.createElement("textarea")
              textarea.style.width = "100%"
              textarea.style.height = "100%"
              textarea.style.border = "none"
              textarea.style.outline = "none"
              textarea.style.resize = "none"
              textarea.style.fontFamily = "Monaco, 'Courier New', monospace"
              textarea.style.fontSize = "14px"
              textarea.style.padding = "16px"
              textarea.style.backgroundColor = options.theme === "vs-dark" ? "#1e1e1e" : "#ffffff"
              textarea.style.color = options.theme === "vs-dark" ? "#d4d4d4" : "#000000"
              textarea.value = options.value || ""

              container.appendChild(textarea)

              return {
                getValue: () => textarea.value,
                setValue: (value: string) => {
                  textarea.value = value
                },
                onDidChangeModelContent: (callback: any) => {
                  textarea.addEventListener("input", callback)
                },
                dispose: () => container.removeChild(textarea),
                layout: () => {},
              }
            },
            defineTheme: () => {},
            setTheme: () => {},
          },
          languages: {
            registerCompletionItemProvider: () => {},
            registerHoverProvider: () => {},
          },
        }

        setIsMonacoLoaded(true)
      }
    }

    loadMonaco()
  }, [])

  // Initialize editor when Monaco is loaded
  useEffect(() => {
    if (isMonacoLoaded && editorRef.current && !monacoEditorRef.current) {
      const langConfig = LANGUAGE_CONFIGS[selectedLanguage as keyof typeof LANGUAGE_CONFIGS]

      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value: code || langConfig.defaultCode,
        language: langConfig.monacoLanguage,
        theme: "vs-dark",
        fontSize: 14,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: "on",
        lineNumbers: "on",
        folding: true,
        selectOnLineNumbers: true,
        matchBrackets: "always",
        autoIndent: "full",
        formatOnPaste: true,
        formatOnType: true,
      })

      monacoEditorRef.current.onDidChangeModelContent(() => {
        setCode(monacoEditorRef.current.getValue())
      })
    }

    return () => {
      if (monacoEditorRef.current) {
        monacoEditorRef.current.dispose()
        monacoEditorRef.current = null
      }
    }
  }, [isMonacoLoaded, selectedLanguage])

  // Update editor when language changes
  useEffect(() => {
    if (monacoEditorRef.current) {
      const langConfig = LANGUAGE_CONFIGS[selectedLanguage as keyof typeof LANGUAGE_CONFIGS]
      if (!code) {
        monacoEditorRef.current.setValue(langConfig.defaultCode)
      }
    }
  }, [selectedLanguage])

  // Load saved files from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("playground-files")
    if (saved) {
      setSavedFiles(JSON.parse(saved))
    }
  }, [])

  const handleRunCode = async () => {
    setIsRunning(true)
    setActiveTab("output")

    // Simulate code execution
    setTimeout(() => {
      let simulatedOutput = ""
      const langConfig = LANGUAGE_CONFIGS[selectedLanguage as keyof typeof LANGUAGE_CONFIGS]

      switch (selectedLanguage) {
        case "javascript":
        case "typescript":
          simulatedOutput = `> Running ${langConfig.name} code...

Hello, World!

Fibonacci sequence:
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34

✅ Execution completed successfully`
          break
        case "python":
          simulatedOutput = `> Running Python code...

Hello, World!

Fibonacci sequence:
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34

Prime numbers up to 20:
[2, 3, 5, 7, 11, 13, 17, 19]

✅ Process finished with exit code 0`
          break
        case "html":
          simulatedOutput = "HTML rendered in preview tab"
          break
        case "css":
          simulatedOutput = "CSS styles applied in preview tab"
          break
        case "json":
          try {
            JSON.parse(code)
            simulatedOutput = "✅ Valid JSON format"
          } catch (e) {
            simulatedOutput = `❌ JSON Syntax Error: ${(e as Error).message}`
          }
          break
        default:
          simulatedOutput = "Code executed successfully"
      }

      setOutput(simulatedOutput)
      setIsRunning(false)
    }, 1500)
  }

  const handleSaveFile = () => {
    if (!currentFileName.trim()) return

    const newFile: SavedFile = {
      id: Date.now().toString(),
      name: currentFileName,
      language: selectedLanguage,
      code: code,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedFiles = [...savedFiles, newFile]
    setSavedFiles(updatedFiles)
    localStorage.setItem("playground-files", JSON.stringify(updatedFiles))
    setShowSaveDialog(false)
    setCurrentFileName("")
  }

  const handleLoadFile = (file: SavedFile) => {
    setSelectedLanguage(file.language)
    setCode(file.code)
    if (monacoEditorRef.current) {
      monacoEditorRef.current.setValue(file.code)
    }
    setShowLoadDialog(false)
  }

  const handleDeleteFile = (fileId: string) => {
    const updatedFiles = savedFiles.filter((f) => f.id !== fileId)
    setSavedFiles(updatedFiles)
    localStorage.setItem("playground-files", JSON.stringify(updatedFiles))
  }

  const handleDownload = () => {
    const langConfig = LANGUAGE_CONFIGS[selectedLanguage as keyof typeof LANGUAGE_CONFIGS]
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `playground-code${langConfig.extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Code from Cybit Playground",
          text: code,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(code)
      // You could show a toast notification here
    }
  }

  const renderPreview = () => {
    if (selectedLanguage === "html") {
      return (
        <div className="border rounded-lg overflow-hidden h-full">
          <div className="bg-muted px-3 py-2 border-b flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Live Preview</span>
          </div>
          <div className="h-[calc(100%-40px)]">
            <iframe srcDoc={code} className="w-full h-full border-0" title="HTML Preview" sandbox="allow-scripts" />
          </div>
        </div>
      )
    }

    if (selectedLanguage === "css") {
      const htmlWithCSS = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${code}</style>
        </head>
        <body>
          <div class="container">
            <h1 class="title">CSS Preview</h1>
            <div class="card">
              <p>This is a preview of your CSS styles.</p>
              <button class="button">Sample Button</button>
            </div>
          </div>
        </body>
        </html>
      `
      return (
        <div className="border rounded-lg overflow-hidden h-full">
          <div className="bg-muted px-3 py-2 border-b flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">CSS Preview</span>
          </div>
          <div className="h-[calc(100%-40px)]">
            <iframe srcDoc={htmlWithCSS} className="w-full h-full border-0" title="CSS Preview" />
          </div>
        </div>
      )
    }

    return (
      <div className="border rounded-lg overflow-hidden h-full">
        <div className="bg-muted px-3 py-2 border-b flex items-center space-x-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-medium">Console Output</span>
        </div>
        <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm h-[calc(100%-40px)] overflow-auto">
          {output ? (
            <pre className="whitespace-pre-wrap">{output}</pre>
          ) : (
            <div className="text-gray-500">Click "Run Code" to see output here...</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="playground" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary" />
              <span>Code Playground</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Write, execute, and experiment with code in multiple programming languages
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(LANGUAGE_CONFIGS).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center space-x-2">
                      <span>{config.icon}</span>
                      <span>{config.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save File</DialogTitle>
                  <DialogDescription>Enter a name for your file</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="filename">File Name</Label>
                    <Input
                      id="filename"
                      value={currentFileName}
                      onChange={(e) => setCurrentFileName(e.target.value)}
                      placeholder="my-awesome-code"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveFile} disabled={!currentFileName.trim()}>
                      Save File
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Load
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Load Saved File</DialogTitle>
                  <DialogDescription>Choose a file to load into the editor</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-auto">
                  {savedFiles.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No saved files found</p>
                  ) : (
                    savedFiles.map((file) => (
                      <Card key={file.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4" />
                              <span className="font-medium">{file.name}</span>
                              <Badge variant="outline">
                                {LANGUAGE_CONFIGS[file.language as keyof typeof LANGUAGE_CONFIGS]?.name}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Created: {new Date(file.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handleLoadFile(file)}>
                              Load
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDeleteFile(file.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>

            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>

            <Button onClick={handleRunCode} disabled={isRunning} className="bg-green-600 hover:bg-green-700">
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Editor Panel */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Code2 className="h-5 w-5" />
                  <span>Code Editor</span>
                  <Badge variant="outline">
                    {LANGUAGE_CONFIGS[selectedLanguage as keyof typeof LANGUAGE_CONFIGS]?.name}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(code)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="h-full border rounded-lg overflow-hidden">
                {!isMonacoLoaded ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading Monaco Editor...</p>
                    </div>
                  </div>
                ) : (
                  <div ref={editorRef} className="h-full" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="output">Output</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <Tabs value={activeTab} className="h-full">
                <TabsContent value="output" className="h-full m-0">
                  {renderPreview()}
                </TabsContent>
                <TabsContent value="preview" className="h-full m-0">
                  {renderPreview()}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
