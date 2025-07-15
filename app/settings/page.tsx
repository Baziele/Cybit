"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ThemeCustomizer } from "@/components/theme-customizer"
import {
  Save,
  Upload,
  Trash2,
  Shield,
  Bell,
  Globe,
  Lock,
  User,
  Palette,
  Download,
  AlertTriangle,
  Plus,
  X,
} from "lucide-react"

interface UserSettings {
  profile: {
    firstName: string
    lastName: string
    email: string
    bio: string
    location: string
    website: string
    github: string
    linkedin: string
    twitter: string
    avatar: string
    skills: string[]
    interests: string[]
  }
  privacy: {
    profileVisibility: "public" | "private" | "friends"
    showEmail: boolean
    showLocation: boolean
    showSocialLinks: boolean
    allowMessages: boolean
    showOnlineStatus: boolean
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    courseUpdates: boolean
    achievementAlerts: boolean
    communityMessages: boolean
    weeklyDigest: boolean
    marketingEmails: boolean
  }
  preferences: {
    language: string
    timezone: string
    dateFormat: string
    autoplay: boolean
    subtitles: boolean
    playbackSpeed: string
    theme: "light" | "dark" | "system"
  }
  security: {
    twoFactorEnabled: boolean
    loginAlerts: boolean
    sessionTimeout: string
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex.johnson@example.com",
      bio: "Passionate full-stack developer with a love for learning new technologies.",
      location: "San Francisco, CA",
      website: "https://alexjohnson.dev",
      github: "alexjohnson",
      linkedin: "alex-johnson-dev",
      twitter: "alexjohnsondev",
      avatar: "/placeholder.svg?height=150&width=150",
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
      interests: ["Web Development", "Machine Learning", "Cloud Computing"],
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showLocation: true,
      showSocialLinks: true,
      allowMessages: true,
      showOnlineStatus: true,
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      courseUpdates: true,
      achievementAlerts: true,
      communityMessages: false,
      weeklyDigest: true,
      marketingEmails: false,
    },
    preferences: {
      language: "en",
      timezone: "America/Los_Angeles",
      dateFormat: "MM/DD/YYYY",
      autoplay: true,
      subtitles: false,
      playbackSpeed: "1.0",
      theme: "system",
    },
    security: {
      twoFactorEnabled: false,
      loginAlerts: true,
      sessionTimeout: "30",
    },
  })

  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const updateSettings = (section: keyof UserSettings, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
    setHasUnsavedChanges(true)
  }

  const addSkill = () => {
    if (newSkill.trim() && !settings.profile.skills.includes(newSkill.trim())) {
      updateSettings("profile", "skills", [...settings.profile.skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    updateSettings(
      "profile",
      "skills",
      settings.profile.skills.filter((s) => s !== skill),
    )
  }

  const addInterest = () => {
    if (newInterest.trim() && !settings.profile.interests.includes(newInterest.trim())) {
      updateSettings("profile", "interests", [...settings.profile.interests, newInterest.trim()])
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    updateSettings(
      "profile",
      "interests",
      settings.profile.interests.filter((i) => i !== interest),
    )
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving settings:", settings)
    setHasUnsavedChanges(false)
  }

  const handleExportData = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "cybit-profile-data.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage="settings" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your account preferences and privacy settings</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {hasUnsavedChanges && (
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-yellow-800 dark:text-yellow-200">You have unsaved changes</p>
            </div>
          </div>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>Update your personal information and profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={settings.profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {settings.profile.firstName[0]}
                      {settings.profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Photo
                    </Button>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={settings.profile.firstName}
                      onChange={(e) => updateSettings("profile", "firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={settings.profile.lastName}
                      onChange={(e) => updateSettings("profile", "lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => updateSettings("profile", "email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={settings.profile.bio}
                    onChange={(e) => updateSettings("profile", "bio", e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={settings.profile.location}
                      onChange={(e) => updateSettings("profile", "location", e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={settings.profile.website}
                      onChange={(e) => updateSettings("profile", "website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Connect your social media accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Username</Label>
                  <Input
                    id="github"
                    value={settings.profile.github}
                    onChange={(e) => updateSettings("profile", "github", e.target.value)}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Username</Label>
                  <Input
                    id="linkedin"
                    value={settings.profile.linkedin}
                    onChange={(e) => updateSettings("profile", "linkedin", e.target.value)}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter Username</Label>
                  <Input
                    id="twitter"
                    value={settings.profile.twitter}
                    onChange={(e) => updateSettings("profile", "twitter", e.target.value)}
                    placeholder="username"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills & Interests */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Add your technical skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {settings.profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        <button onClick={() => removeSkill(skill)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Interests</CardTitle>
                  <CardDescription>Add your learning interests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {settings.profile.interests.map((interest) => (
                      <Badge key={interest} variant="outline" className="flex items-center space-x-1">
                        <span>{interest}</span>
                        <button onClick={() => removeInterest(interest)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add an interest..."
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addInterest()}
                    />
                    <Button onClick={addInterest} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Privacy Settings</span>
                </CardTitle>
                <CardDescription>Control who can see your information and activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value) => updateSettings("privacy", "profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can view</SelectItem>
                      <SelectItem value="private">Private - Only you can view</SelectItem>
                      <SelectItem value="friends">Friends - Only connections can view</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Email Address</Label>
                      <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showEmail}
                      onCheckedChange={(checked) => updateSettings("privacy", "showEmail", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Location</Label>
                      <p className="text-sm text-muted-foreground">Display your location on your profile</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showLocation}
                      onCheckedChange={(checked) => updateSettings("privacy", "showLocation", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Social Links</Label>
                      <p className="text-sm text-muted-foreground">Display your social media links</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showSocialLinks}
                      onCheckedChange={(checked) => updateSettings("privacy", "showSocialLinks", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Messages</Label>
                      <p className="text-sm text-muted-foreground">Let other users send you messages</p>
                    </div>
                    <Switch
                      checked={settings.privacy.allowMessages}
                      onCheckedChange={(checked) => updateSettings("privacy", "allowMessages", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Online Status</Label>
                      <p className="text-sm text-muted-foreground">Display when you're online</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showOnlineStatus}
                      onCheckedChange={(checked) => updateSettings("privacy", "showOnlineStatus", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => updateSettings("notifications", "emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateSettings("notifications", "pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Course Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about new lessons and course updates</p>
                    </div>
                    <Switch
                      checked={settings.notifications.courseUpdates}
                      onCheckedChange={(checked) => updateSettings("notifications", "courseUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Achievement Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when you earn new achievements</p>
                    </div>
                    <Switch
                      checked={settings.notifications.achievementAlerts}
                      onCheckedChange={(checked) => updateSettings("notifications", "achievementAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Community Messages</Label>
                      <p className="text-sm text-muted-foreground">Notifications for forum replies and mentions</p>
                    </div>
                    <Switch
                      checked={settings.notifications.communityMessages}
                      onCheckedChange={(checked) => updateSettings("notifications", "communityMessages", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">Weekly summary of your learning progress</p>
                    </div>
                    <Switch
                      checked={settings.notifications.weeklyDigest}
                      onCheckedChange={(checked) => updateSettings("notifications", "weeklyDigest", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Promotional emails about new features and courses</p>
                    </div>
                    <Switch
                      checked={settings.notifications.marketingEmails}
                      onCheckedChange={(checked) => updateSettings("notifications", "marketingEmails", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>General Preferences</span>
                </CardTitle>
                <CardDescription>Customize your learning experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={settings.preferences.language}
                      onValueChange={(value) => updateSettings("preferences", "language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.preferences.timezone}
                      onValueChange={(value) => updateSettings("preferences", "timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="Europe/London">GMT</SelectItem>
                        <SelectItem value="Europe/Paris">CET</SelectItem>
                        <SelectItem value="Asia/Tokyo">JST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.preferences.dateFormat}
                    onValueChange={(value) => updateSettings("preferences", "dateFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Preferences</CardTitle>
                <CardDescription>Customize your video learning experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autoplay Videos</Label>
                    <p className="text-sm text-muted-foreground">Automatically play the next video in sequence</p>
                  </div>
                  <Switch
                    checked={settings.preferences.autoplay}
                    onCheckedChange={(checked) => updateSettings("preferences", "autoplay", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Subtitles</Label>
                    <p className="text-sm text-muted-foreground">Display subtitles by default</p>
                  </div>
                  <Switch
                    checked={settings.preferences.subtitles}
                    onCheckedChange={(checked) => updateSettings("preferences", "subtitles", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="playbackSpeed">Default Playback Speed</Label>
                  <Select
                    value={settings.preferences.playbackSpeed}
                    onValueChange={(value) => updateSettings("preferences", "playbackSpeed", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x</SelectItem>
                      <SelectItem value="0.75">0.75x</SelectItem>
                      <SelectItem value="1.0">1.0x (Normal)</SelectItem>
                      <SelectItem value="1.25">1.25x</SelectItem>
                      <SelectItem value="1.5">1.5x</SelectItem>
                      <SelectItem value="2.0">2.0x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Appearance</span>
                </CardTitle>
                <CardDescription>Customize the look and feel of the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme Customization</Label>
                    <p className="text-sm text-muted-foreground">Personalize colors and theme preferences</p>
                  </div>
                  <ThemeCustomizer />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.security.twoFactorEnabled}
                      onCheckedChange={(checked) => updateSettings("security", "twoFactorEnabled", checked)}
                    />
                    {!settings.security.twoFactorEnabled && (
                      <Button variant="outline" size="sm">
                        Setup 2FA
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={settings.security.loginAlerts}
                    onCheckedChange={(checked) => updateSettings("security", "loginAlerts", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout</Label>
                  <Select
                    value={settings.security.sessionTimeout}
                    onValueChange={(value) => updateSettings("security", "sessionTimeout", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Active Sessions
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
