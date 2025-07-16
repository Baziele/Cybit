# Cybit Website

A modern educational platform built with Next.js, featuring course management, user authentication, and interactive learning tools.

## Features

-   ✅ Course Management System
-   ✅ User Authentication (Login/Signup)
-   ✅ Student Learning Portal
-   ✅ Interactive Code Playground
-   ✅ Admin Dashboard
-   ✅ Customizable Themes
-   ✅ Responsive Design
-   ✅ Interactive Quiz System
-   ✅ Particle Background Effects

## Tech Stack

-   **Framework**: Next.js
-   **Styling**: Tailwind CSS
-   **UI Components**: Shadcn/ui
-   **Authentication**: Built-in auth system
-   **Components**: Custom React components for code editing, navigation, and theme customization

## Project Structure

```
app/               # Next.js app directory
├── about/         # About page
├── admin/         # Admin dashboard
├── auth/          # Authentication pages
├── courses/       # Course listings and details
├── playground/    # Code playground
└── profile/       # User profile management

components/        # React components
├── ui/           # Reusable UI components
└── ...           # Custom components

hooks/            # Custom React hooks
lib/              # Utility functions and data
styles/           # Global styles
public/           # Static assets
```

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    pnpm install
    ```
3. Run the development server:
    ```bash
    pnpm dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

The project uses:

-   TypeScript for type safety
-   Tailwind CSS for styling
-   Shadcn/ui for UI components
-   Next.js 13+ features including app router

## Roadmap / Todo

### Backend Implementation (Supabase)

-   [ ] Database Setup

    -   [ ] User authentication and profiles
    -   [ ] Course management tables
    -   [ ] Quiz and assessment tracking
    -   [ ] Progress and completion records
    -   [ ] Code playground saves

-   [ ] Authentication Features

    -   [ ] Social login integration (Google, GitHub)
    -   [ ] Role-based access control
    -   [ ] Password reset flow
    -   [ ] Email verification

-   [ ] Storage Features

    -   [ ] Course material storage
    -   [ ] User uploads
    -   [ ] Profile pictures
    -   [ ] Course thumbnails

-   [ ] Real-time Features
    -   [ ] Live collaboration in playground
    -   [ ] Real-time chat for course discussions
    -   [ ] Live notifications
    -   [ ] Course progress updates

### Content Creation & Management

-   [ ] Video Content Integration

    -   [ ] Direct video upload support
    -   [ ] Video hosting service integration
    -   [ ] Video processing pipeline
    -   [ ] Video streaming optimization
    -   [ ] Video thumbnail generation

-   [ ] Resource Management

    -   [ ] Bulk resource upload
    -   [ ] Resource versioning
    -   [ ] Resource access controls
    -   [ ] Resource analytics

### Frontend Enhancements

-   [x] Advanced Code Editor Features

    -   [x] Multiple file support
    -   [x] Theme customization
    -   [ ] Code sharing
    -   [ ] Live collaboration

-   [x] Course Experience

    -   [x] Interactive video player
    -   [x] Note-taking system
    -   [x] Progress tracking
    -   [x] Certificates generation

-   [x] User Experience
    -   [x] Dark/Light mode refinements
    -   [x] Responsive design improvements
    -   [x] Accessibility enhancements
    -   [x] Loading states and animations

### Testing

-   [ ] Unit Tests
-   [ ] Integration Tests
-   [ ] E2E Tests
-   [ ] Performance Testing

### DevOps

-   [ ] CI/CD Pipeline
-   [ ] Automated Deployments
-   [ ] Monitoring and Analytics
-   [ ] Error Tracking
-   [ ] Performance Monitoring

### Documentation

-   [x] API Documentation
-   [x] User Guide
-   [ ] Contributing Guidelines
-   [x] Development Setup Guide

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
