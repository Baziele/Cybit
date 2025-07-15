"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Edit, Trash2, Eye, Users, Clock, Star, BookOpen } from "lucide-react"

// Mock course data
const mockCourses = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    instructor: "John Smith",
    category: "Programming",
    status: "Published",
    enrolled: 456,
    rating: 4.8,
    duration: "8 hours",
    sections: 12,
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    title: "React Development",
    instructor: "Jane Doe",
    category: "Web Development",
    status: "Published",
    enrolled: 389,
    rating: 4.9,
    duration: "12 hours",
    sections: 16,
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-18",
  },
  {
    id: 3,
    title: "Python for Beginners",
    instructor: "Mike Johnson",
    category: "Programming",
    status: "Draft",
    enrolled: 0,
    rating: 0,
    duration: "10 hours",
    sections: 14,
    createdDate: "2024-01-20",
    lastUpdated: "2024-01-20",
  },
  {
    id: 4,
    title: "Advanced CSS Techniques",
    instructor: "Sarah Wilson",
    category: "Web Design",
    status: "Published",
    enrolled: 234,
    rating: 4.6,
    duration: "6 hours",
    sections: 8,
    createdDate: "2023-12-15",
    lastUpdated: "2024-01-12",
  },
]

export default function CourseManagement() {
  const [courses, setCourses] = useState(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter((course) => course.id !== courseId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Course Management</h2>
          <p className="text-muted-foreground">Create, edit, and manage all courses</p>
        </div>
        <Link href="/admin/courses/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.filter((c) => c.status === "Published").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.enrolled, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                courses.filter((c) => c.rating > 0).reduce((sum, course) => sum + course.rating, 0) /
                courses.filter((c) => c.rating > 0).length
              ).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course List */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Manage your course catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {course.category} • {course.sections} sections
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      {course.enrolled}
                    </div>
                  </TableCell>
                  <TableCell>
                    {course.rating > 0 ? (
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-400 fill-current" />
                        {course.rating}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No ratings</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      {course.duration}
                    </div>
                  </TableCell>
                  <TableCell>{course.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Course
                        </DropdownMenuItem>
                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Course
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCourse(course.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
