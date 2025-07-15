"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, TrendingUp, Activity, Clock, Award, AlertTriangle, CheckCircle } from "lucide-react"

// Mock data for analytics
const analyticsData = {
  totalUsers: 2847,
  activeUsers: 1923,
  totalCourses: 45,
  completedCourses: 1256,
  totalRevenue: 89420,
  monthlyGrowth: 12.5,
  userGrowth: [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1450 },
    { month: "Mar", users: 1680 },
    { month: "Apr", users: 1920 },
    { month: "May", users: 2150 },
    { month: "Jun", users: 2847 },
  ],
  courseStats: [
    { name: "JavaScript Fundamentals", enrolled: 456, completed: 234, rating: 4.8 },
    { name: "React Development", enrolled: 389, completed: 156, rating: 4.9 },
    { name: "Python Basics", enrolled: 567, completed: 345, rating: 4.7 },
    { name: "Web Design", enrolled: 234, completed: 189, rating: 4.6 },
  ],
  recentActivity: [
    { user: "John Doe", action: "Completed JavaScript Fundamentals", time: "2 hours ago" },
    { user: "Jane Smith", action: "Started React Development", time: "4 hours ago" },
    { user: "Mike Johnson", action: "Left a 5-star review", time: "6 hours ago" },
    { user: "Sarah Wilson", action: "Enrolled in Python Basics", time: "8 hours ago" },
  ],
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{analyticsData.monthlyGrowth}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((analyticsData.activeUsers / analyticsData.totalUsers) * 100).toFixed(1)}% engagement rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalCourses}</div>
            <p className="text-xs text-muted-foreground">{analyticsData.completedCourses} completions this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* User Growth Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly user registration trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.userGrowth.map((data, index) => (
                <div key={data.month} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium">{data.month}</div>
                  <div className="flex-1">
                    <Progress value={(data.users / analyticsData.totalUsers) * 100} className="h-2" />
                  </div>
                  <div className="w-16 text-sm text-right">{data.users}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
          <CardDescription>Top performing courses and their statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.courseStats.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{course.name}</h4>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span>{course.enrolled} enrolled</span>
                    <span>{course.completed} completed</span>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {course.rating}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={course.completed / course.enrolled > 0.6 ? "default" : "secondary"}>
                    {((course.completed / course.enrolled) * 100).toFixed(1)}% completion
                  </Badge>
                  <Progress value={(course.completed / course.enrolled) * 100} className="w-24 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Operational</div>
            <p className="text-xs text-muted-foreground">All systems running normally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Load</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <Progress value={23} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Minor issues detected</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
