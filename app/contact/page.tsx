"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Calendar,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation currentPage="contact" />

      {/* Hero Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Have questions, ideas, or want to collaborate? We'd love to hear from you. Reach out to us through any of
              the channels below.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Contact Cards */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                    <CardTitle>Email Us</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">General inquiries</p>
                  <a href="mailto:info@cybit.club" className="text-blue-600 hover:underline font-medium">
                    info@cybit.club
                  </a>
                  <p className="text-gray-600 mt-4 mb-2">Technical support</p>
                  <a href="mailto:support@cybit.club" className="text-blue-600 hover:underline font-medium">
                    support@cybit.club
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-blue-600" />
                    <CardTitle>Call Us</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Main office</p>
                  <a href="tel:+1234567890" className="text-blue-600 hover:underline font-medium">
                    +1 (234) 567-8900
                  </a>
                  <p className="text-gray-600 mt-4 mb-2">Student hotline</p>
                  <a href="tel:+1234567891" className="text-blue-600 hover:underline font-medium">
                    +1 (234) 567-8901
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <CardTitle>Visit Us</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Main campus location</p>
                  <address className="not-italic text-gray-800">
                    Tech University
                    <br />
                    Computer Science Building
                    <br />
                    Room 205, Second Floor
                    <br />
                    123 Innovation Drive
                    <br />
                    Tech City, TC 12345
                  </address>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <CardTitle>Office Hours</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <CardDescription>Stay connected on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <LinkedinIcon className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors">
                      <TwitterIcon className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                      <InstagramIcon className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                      <FacebookIcon className="h-6 w-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="course">Course Information</SelectItem>
                        <SelectItem value="membership">Membership</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Brief subject of your message"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Ways to Connect</h2>
            <p className="text-lg text-gray-600">Choose the method that works best for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Forum</h3>
              <p className="text-gray-600 mb-4">Join discussions with other members</p>
              <Button variant="outline" className="w-full">
                Visit Forum
              </Button>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Schedule Meeting</h3>
              <p className="text-gray-600 mb-4">Book a one-on-one session with our team</p>
              <Button variant="outline" className="w-full">
                Book Meeting
              </Button>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">How do I join Cybit?</h3>
              <p className="text-gray-600">
                Simply create an account on our website and you'll have access to all our free courses and community
                features.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Are all courses really free?</h3>
              <p className="text-gray-600">
                Yes! All our courses are completely free. We believe in making quality tech education accessible to
                everyone.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Can I get certificates?</h3>
              <p className="text-gray-600">
                Upon successful completion of courses, you'll receive certificates that you can showcase on your profile
                and resume.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Do you offer in-person events?</h3>
              <p className="text-gray-600">
                Yes! We regularly organize workshops, hackathons, and networking events. Check our events calendar for
                upcoming activities.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
