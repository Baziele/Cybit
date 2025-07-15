"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, RotateCcw, Download, Terminal, Globe, Code2, FileText } from "lucide-react"

interface CodeEditorProps {
  initialCode?: string
  language?: string
  onCodeChange?: (code: string) => void
  onRun?: (code: string, language: string) => void
  readOnly?: boolean
  showOutput?: boolean
  title?: string
}

const LANGUAGE_TEMPLATES = {
  python: `# Python Code
def hello_world():
    print("Hello, World!")
    return "Success"

# Call the function
result = hello_world()
print(f"Result: {result}")`,

  javascript: `// JavaScript Code
function helloWorld() {
    console.log("Hello, World!");
    return "Success";
}

// Call the function
const result = helloWorld();
console.log(\`Result: \${result}\`);`,

  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,

  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a simple HTML page.</p>
</body>
</html>`,

  css: `/* CSS Styles */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
}`,
}

const LANGUAGE_INFO = {
  python: { name: "Python", extension: ".py", icon: "🐍" },
  javascript: { name: "JavaScript", extension: ".js", icon: "🟨" },
  c: { name: "C", extension: ".c", icon: "⚡" },
  go: { name: "Go", extension: ".go", icon: "🔵" },
  html: { name: "HTML", extension: ".html", icon: "🌐" },
  css: { name: "CSS", extension: ".css", icon: "🎨" },
}

export function CodeEditor({
  initialCode = "",
  language = "python",
  onCodeChange,
  onRun,
  readOnly = false,
  showOutput = true,
  title = "Code Editor",
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode)
    } else {
      setCode(LANGUAGE_TEMPLATES[selectedLanguage as keyof typeof LANGUAGE_TEMPLATES] || "")
    }
  }, [selectedLanguage, initialCode])

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    onCodeChange?.(newCode)
  }

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage)
    if (!initialCode) {
      const template = LANGUAGE_TEMPLATES[newLanguage as keyof typeof LANGUAGE_TEMPLATES] || ""
      setCode(template)
      onCodeChange?.(template)
    }
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setActiveTab("output")

    // Simulate code execution with different outputs based on language
    setTimeout(() => {
      let simulatedOutput = ""

      switch (selectedLanguage) {
        case "python":
          simulatedOutput = `Hello, World!
Result: Success

Process finished with exit code 0`
          break
        case "javascript":
          simulatedOutput = `Hello, World!
Result: Success

[Finished in 0.1s]`
          break
        case "c":
          simulatedOutput = `Compilation successful.
Hello, World!

[Program exited with code 0]`
          break
        case "go":
          simulatedOutput = `Hello, World!

[go run completed successfully]`
          break
        case "html":
          simulatedOutput = "HTML rendered in browser preview"
          break
        case "css":
          simulatedOutput = "CSS styles applied successfully"
          break
        default:
          simulatedOutput = "Code executed successfully"
      }

      setOutput(simulatedOutput)
      onRun?.(code, selectedLanguage)
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    const template = LANGUAGE_TEMPLATES[selectedLanguage as keyof typeof LANGUAGE_TEMPLATES] || ""
    setCode(template)
    setOutput("")
    onCodeChange?.(template)
  }

  const handleDownload = () => {
    const langInfo = LANGUAGE_INFO[selectedLanguage as keyof typeof LANGUAGE_INFO]
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `code${langInfo?.extension || ".txt"}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderOutput = () => {
    if (selectedLanguage === "html") {
      return (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted px-3 py-2 border-b flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Browser Preview</span>
          </div>
          <div className="p-4 bg-white min-h-[200px]">
            <div dangerouslySetInnerHTML={{ __html: code }} />
          </div>
        </div>
      )
    }

    if (selectedLanguage === "css") {
      return (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted px-3 py-2 border-b flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">CSS Preview</span>
          </div>
          <div className="p-4 min-h-[200px]">
            <style>{code}</style>
            <div className="container">
              <h1>CSS Preview</h1>
              <p>Your CSS styles are applied to this preview.</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted px-3 py-2 border-b flex items-center space-x-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-medium">Terminal Output</span>
        </div>
        <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm min-h-[200px]">
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
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Code2 className="h-5 w-5" />
            <span>{title}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={selectedLanguage} onValueChange={handleLanguageChange} disabled={readOnly}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(LANGUAGE_INFO).map(([key, info]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center space-x-2">
                      <span>{info.icon}</span>
                      <span>{info.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline">
              {LANGUAGE_INFO[selectedLanguage as keyof typeof LANGUAGE_INFO]?.extension || ".txt"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <div className="border rounded-lg">
              <div className="bg-muted px-3 py-2 border-b flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {LANGUAGE_INFO[selectedLanguage as keyof typeof LANGUAGE_INFO]?.name} Editor
                  </span>
                </div>
                <div className="flex space-x-2">
                  {!readOnly && (
                    <>
                      <Button size="sm" variant="outline" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </>
                  )}
                  <Button size="sm" onClick={handleRunCode} disabled={isRunning}>
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                </div>
              </div>
              <Textarea
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                placeholder={`Write your ${selectedLanguage} code here...`}
                className="font-mono text-sm min-h-[400px] border-0 resize-none focus:ring-0"
                readOnly={readOnly}
              />
            </div>
          </TabsContent>

          <TabsContent value="output" className="space-y-4">
            {renderOutput()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
