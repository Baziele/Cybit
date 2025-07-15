"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "@/components/theme-provider"
import { Palette, Monitor, Moon, Sun, Check } from "lucide-react"

export function ThemeCustomizer() {
  const { theme, setTheme, accentColor, setAccentColor, accentColors } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80">
        <SheetHeader>
          <SheetTitle>Customize Theme</SheetTitle>
          <SheetDescription>Personalize your experience with theme and color preferences.</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Theme Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Theme Mode</CardTitle>
              <CardDescription>Choose your preferred theme mode</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={theme} onValueChange={setTheme}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center space-x-2 cursor-pointer">
                    <Sun className="h-4 w-4" />
                    <span>Light</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center space-x-2 cursor-pointer">
                    <Moon className="h-4 w-4" />
                    <span>Dark</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center space-x-2 cursor-pointer">
                    <Monitor className="h-4 w-4" />
                    <span>System</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Accent Color Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accent Color</CardTitle>
              <CardDescription>Choose your preferred accent color</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color)}
                    className={`relative h-10 w-10 rounded-md border-2 transition-all hover:scale-105 ${
                      accentColor.value === color.value ? "border-foreground" : "border-muted"
                    }`}
                    style={{
                      backgroundColor: `hsl(${theme === "dark" ? color.dark : color.light})`,
                    }}
                    title={color.name}
                  >
                    {accentColor.value === color.value && (
                      <Check className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Selected: <span className="font-medium">{accentColor.name}</span>
              </p>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preview</CardTitle>
              <CardDescription>See how your customization looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Primary Button</Button>
              <Button variant="outline" className="w-full">
                Outline Button
              </Button>
              <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
                <p className="text-sm text-primary font-medium">This is how accent colors appear in your theme</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
