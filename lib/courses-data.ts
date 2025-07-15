export interface Course {
  id: number
  title: string
  instructor: {
    name: string
    avatar: string
    bio: string
    rating: number
    students: number
    experience: string
  }
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  students: number
  rating: number
  category: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  whatYouWillLearn: string[]
  requirements: string[]
  curriculum: {
    id: number
    title: string
    duration: string
    lessons: number
    videos: {
      id: number
      title: string
      duration: string
      isCompleted: boolean
      isLocked: boolean
      description: string
      resources?: { name: string; type: string; url: string }[]
      questions?: any[]
    }[]
  }[]
  price: number
  isFree: boolean
  certificate: boolean
  language: string
  lastUpdated: string
}

export const coursesData: Course[] = [
  {
    id: 1,
    title: "Full Stack Web Development with React & Node.js",
    instructor: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Senior Software Engineer at Google with 8+ years of experience in web development. Passionate about teaching and helping students build real-world applications.",
      rating: 4.9,
      students: 15000,
      experience: "8+ years at Google, Meta, and startups",
    },
    level: "Intermediate",
    duration: "12 weeks",
    students: 2340,
    rating: 4.8,
    category: "Web Development",
    description: "Master modern web development with React, Node.js, and databases",
    longDescription:
      "This comprehensive course will take you from beginner to advanced full-stack developer. You'll learn to build modern, responsive web applications using the latest technologies including React, Node.js, Express, and MongoDB. By the end of this course, you'll have built several real-world projects and be ready for a career in web development.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML", "CSS"],
    whatYouWillLearn: [
      "Build full-stack web applications from scratch",
      "Master React and modern JavaScript ES6+",
      "Create RESTful APIs with Node.js and Express",
      "Work with databases (MongoDB and SQL)",
      "Deploy applications to the cloud (AWS, Heroku)",
      "Implement authentication and security best practices",
      "Use Git and GitHub for version control",
      "Apply responsive design principles",
      "Test your applications with Jest and React Testing Library",
      "Optimize performance and SEO",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Familiarity with programming concepts",
      "A computer with internet connection",
      "Willingness to learn and practice coding daily",
    ],
    curriculum: [
      {
        id: 1,
        title: "Introduction to Full Stack Development",
        duration: "3 hours",
        lessons: 8,
        videos: [
          {
            id: 1,
            title: "Course Overview and Learning Path",
            duration: "12:30",
            isCompleted: false,
            isLocked: false,
            description:
              "Welcome to the Full Stack Web Development course! Learn about the course structure, projects you'll build, and career opportunities.",
            resources: [
              { name: "Course Syllabus", type: "pdf", url: "#" },
              { name: "Learning Resources", type: "pdf", url: "#" },
            ],
          },
          {
            id: 2,
            title: "Setting Up Development Environment",
            duration: "18:45",
            isCompleted: false,
            isLocked: false,
            description:
              "Set up your development environment with Node.js, VS Code, Git, and essential extensions for productive coding.",
            resources: [
              { name: "VS Code Extensions List", type: "pdf", url: "#" },
              { name: "Environment Setup Script", type: "code", url: "#" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Frontend Development with React",
        duration: "15 hours",
        lessons: 20,
        videos: [
          {
            id: 3,
            title: "React Fundamentals and JSX",
            duration: "25:00",
            isCompleted: false,
            isLocked: true,
            description: "Learn React basics, JSX syntax, and how to create your first React components.",
          },
          {
            id: 4,
            title: "Components, Props, and State",
            duration: "30:15",
            isCompleted: false,
            isLocked: true,
            description: "Master React components, passing data with props, and managing component state.",
          },
        ],
      },
    ],
    price: 0,
    isFree: true,
    certificate: true,
    language: "English",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals with Python",
    instructor: {
      name: "Dr. Alex Kumar",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "PhD in Machine Learning from Stanford. Former AI researcher at OpenAI and current professor at MIT. Published 50+ papers in top-tier conferences.",
      rating: 4.9,
      students: 12000,
      experience: "PhD Stanford, 10+ years in AI research",
    },
    level: "Beginner",
    duration: "10 weeks",
    students: 1890,
    rating: 4.9,
    category: "AI/ML",
    description: "Learn the fundamentals of machine learning and data science with hands-on Python projects",
    longDescription:
      "Dive into the exciting world of Machine Learning! This course covers everything from basic statistics to advanced ML algorithms. You'll work with real datasets, build predictive models, and learn to use popular libraries like scikit-learn, pandas, and matplotlib.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "Machine Learning", "Data Science", "Pandas", "Scikit-learn", "TensorFlow"],
    whatYouWillLearn: [
      "Understand machine learning concepts and algorithms",
      "Work with data using Pandas and NumPy",
      "Build and evaluate ML models",
      "Implement supervised and unsupervised learning",
      "Create data visualizations with Matplotlib and Seaborn",
      "Deploy ML models to production",
      "Work with neural networks using TensorFlow",
      "Handle real-world datasets and preprocessing",
    ],
    requirements: [
      "Basic Python programming knowledge",
      "High school level mathematics",
      "Interest in data and problem-solving",
      "No prior ML experience required",
    ],
    curriculum: [
      {
        id: 1,
        title: "Introduction to Machine Learning",
        duration: "4 hours",
        lessons: 10,
        videos: [
          {
            id: 1,
            title: "What is Machine Learning?",
            duration: "15:30",
            isCompleted: false,
            isLocked: false,
            description: "Introduction to ML concepts, types of learning, and real-world applications.",
          },
        ],
      },
    ],
    price: 0,
    isFree: true,
    certificate: true,
    language: "English",
    lastUpdated: "2024-01-10",
  },
  {
    id: 3,
    title: "Mobile App Development with React Native",
    instructor: {
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Lead Mobile Developer at Uber with 6+ years of experience. Built apps used by millions of users. Expert in React Native and native iOS/Android development.",
      rating: 4.7,
      students: 8500,
      experience: "6+ years at Uber, Airbnb",
    },
    level: "Advanced",
    duration: "14 weeks",
    students: 1560,
    rating: 4.7,
    category: "Mobile Development",
    description: "Build native mobile apps for iOS and Android using React Native",
    longDescription:
      "Master mobile app development with React Native! Learn to build cross-platform mobile applications that look and feel native. Cover navigation, state management, API integration, and publishing to app stores.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "Mobile Development", "iOS", "Android", "JavaScript", "Redux"],
    whatYouWillLearn: [
      "Build cross-platform mobile apps",
      "Master React Native components and APIs",
      "Implement navigation and routing",
      "Manage app state with Redux",
      "Integrate with REST APIs and GraphQL",
      "Handle device features (camera, GPS, etc.)",
      "Optimize app performance",
      "Publish apps to App Store and Google Play",
    ],
    requirements: [
      "Strong JavaScript and React knowledge",
      "Basic understanding of mobile app concepts",
      "Mac computer for iOS development (recommended)",
      "Android Studio or Xcode installed",
    ],
    curriculum: [
      {
        id: 1,
        title: "React Native Fundamentals",
        duration: "5 hours",
        lessons: 12,
        videos: [
          {
            id: 1,
            title: "Introduction to React Native",
            duration: "20:00",
            isCompleted: false,
            isLocked: false,
            description: "Learn what React Native is and how it differs from web React development.",
          },
        ],
      },
    ],
    price: 0,
    isFree: true,
    certificate: true,
    language: "English",
    lastUpdated: "2024-01-08",
  },
  {
    id: 4,
    title: "Cloud Computing with AWS",
    instructor: {
      name: "Jennifer Park",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "AWS Solutions Architect with 7+ years of cloud experience. Certified in multiple AWS services and helps companies migrate to the cloud.",
      rating: 4.6,
      students: 9200,
      experience: "7+ years AWS, Azure, GCP",
    },
    level: "Intermediate",
    duration: "8 weeks",
    students: 2030,
    rating: 4.6,
    category: "Cloud Computing",
    description: "Master AWS services and cloud architecture patterns",
    longDescription:
      "Learn cloud computing with Amazon Web Services! This course covers core AWS services, cloud architecture patterns, and best practices for building scalable, secure applications in the cloud.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["AWS", "Cloud Computing", "Docker", "Kubernetes", "DevOps", "Serverless"],
    whatYouWillLearn: [
      "Understand cloud computing fundamentals",
      "Master core AWS services (EC2, S3, RDS, Lambda)",
      "Design scalable cloud architectures",
      "Implement security best practices",
      "Use Infrastructure as Code with CloudFormation",
      "Deploy containerized applications",
      "Monitor and optimize cloud costs",
      "Prepare for AWS certification exams",
    ],
    requirements: [
      "Basic understanding of web applications",
      "Familiarity with Linux command line",
      "No prior cloud experience required",
      "AWS account (free tier available)",
    ],
    curriculum: [
      {
        id: 1,
        title: "Cloud Computing Fundamentals",
        duration: "3 hours",
        lessons: 8,
        videos: [
          {
            id: 1,
            title: "Introduction to Cloud Computing",
            duration: "18:00",
            isCompleted: false,
            isLocked: false,
            description: "Learn cloud computing concepts, service models, and deployment types.",
          },
        ],
      },
    ],
    price: 0,
    isFree: true,
    certificate: true,
    language: "English",
    lastUpdated: "2024-01-12",
  },
  {
    id: 5,
    title: "Cybersecurity Essentials",
    instructor: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Cybersecurity expert with 10+ years of experience. Former security consultant for Fortune 500 companies. CISSP and CEH certified.",
      rating: 4.8,
      students: 7800,
      experience: "10+ years in cybersecurity",
    },
    level: "Beginner",
    duration: "12 weeks",
    students: 1780,
    rating: 4.8,
    category: "Cybersecurity",
    description: "Learn fundamental cybersecurity concepts and practices",
    longDescription:
      "Protect yourself and organizations from cyber threats! This comprehensive course covers cybersecurity fundamentals, threat analysis, security tools, and best practices for securing systems and networks.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Cybersecurity", "Network Security", "Ethical Hacking", "Risk Management", "Compliance"],
    whatYouWillLearn: [
      "Understand cybersecurity fundamentals",
      "Identify and assess security threats",
      "Implement security controls and measures",
      "Use security tools and technologies",
      "Conduct risk assessments",
      "Understand compliance requirements",
      "Practice ethical hacking techniques",
      "Develop incident response plans",
    ],
    requirements: [
      "Basic computer and networking knowledge",
      "Interest in security and problem-solving",
      "No prior cybersecurity experience required",
      "Virtual machine software (VirtualBox/VMware)",
    ],
    curriculum: [
      {
        id: 1,
        title: "Cybersecurity Fundamentals",
        duration: "4 hours",
        lessons: 10,
        videos: [
          {
            id: 1,
            title: "Introduction to Cybersecurity",
            duration: "22:00",
            isCompleted: false,
            isLocked: false,
            description: "Overview of cybersecurity landscape, threats, and career opportunities.",
          },
        ],
      },
    ],
    price: 0,
    isFree: true,
    certificate: true,
    language: "English",
    lastUpdated: "2024-01-05",
  },
  {
    id: 6,
    title: "Data Structures & Algorithms in Python",
    instructor: {
      name: "Lisa Wang",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Computer Science professor at UC Berkeley. Former software engineer at Google and Facebook. Expert in algorithms and data structures.",
      rating: 4.9,
      students: 11500,
      experience: "PhD UC Berkeley, 8+ years industry",
    },
    level: "Intermediate",
    duration: "16 weeks",
    students: 2670,
    rating: 4.9,
    category: "Computer Science",
    description: "Master data structures and algorithms for technical interviews and problem solving",
    longDescription:
      "Ace your technical interviews and become a better programmer! This course covers essential data structures and algorithms with Python implementations. Perfect for interview preparation and improving problem-solving skills.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "Data Structures", "Algorithms", "Interview Prep", "Problem Solving"],
    whatYouWillLearn: [
      "Master fundamental data structures",
      "Understand algorithm complexity (Big O)",
      "Implement sorting and searching algorithms",
      "Work with trees, graphs, and hash tables",
      "Solve dynamic programming problems",
      "Practice with real interview questions",
      "Optimize code for performance",
      "Develop problem-solving strategies",
    ],
    requirements: [
      "Solid Python programming skills",
      "Basic mathematics knowledge",
      "Understanding of programming concepts",
      "Motivation to practice coding problems",
    ],
    curriculum: [
      {
        id: 1,
        title: "Algorithm Analysis and Big O",
        duration: "3 hours",
        lessons: 8,
        videos: [
          {
            id: 1,
            title: "Introduction to Algorithm Analysis",
            duration: "25:00",
            isCompleted: false,
            isLocked: false,
            description: "Learn how to analyze algorithm efficiency and understand Big O notation.",
          },
        ],
      },
    ],
    price: 0,
    isFree: true,
    certificate: true,
    language: "English",
    lastUpdated: "2024-01-18",
  },
  {
    id: 7,
    title: "UI/UX Design Fundamentals",
    instructor: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Senior UX Designer at Apple with 9+ years of experience. Led design for multiple award-winning mobile apps and web platforms.",
      rating: 4.8,
      students: 6700,
      experience: "9+ years at Apple, Adobe",
    },
    level: "Beginner",
    duration: "10 weeks",
    students: 1450,
    rating: 4.8,
    category: "Design",
    description: "Learn user interface and user experience design principles",
    longDescription:
      "Create beautiful and functional digital experiences! This course covers UI/UX design fundamentals, design thinking, prototyping, and user research. Learn to use industry-standard tools like Figma and Adobe XD.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["UI Design", "UX Design", "Figma", "Prototyping", "User Research", "Design Thinking"],
    whatYouWillLearn: [
      "Understand UI/UX design principles",
      "Conduct user research and testing",
      "Create wireframes and prototypes",
      "Master design tools (Figma, Adobe XD)",
      "Apply design thinking methodology",
      "Design responsive interfaces",
      "Understand accessibility guidelines",
      "Build a professional design portfolio",
    ],
    requirements: [
      "No prior design experience required",
      "Creative mindset and attention to detail",
      "Computer with internet access",
      "Willingness to practice and iterate",
    ],
    curriculum: [
      {
        id: 1,
        title: "Design Fundamentals",
        duration: "4 hours",
        lessons: 10,
        videos: [
          {
            id: 1,
            title: "Introduction to UI/UX Design",
            duration: "20:00",
            isCompleted: false,
            isLocked: false,
            description: "Overview of UI/UX design, career paths, and design process.",
          },
        ],
      },
    ],
    price: 0,
    isFree: true,
    certificate: true,
    language: "English",
    lastUpdated: "2024-01-14",
  },
  {
    id: 8,
    title: "DevOps and CI/CD Pipeline",
    instructor: {
      name: "Carlos Martinez",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "DevOps Engineer at Netflix with 7+ years of experience. Expert in containerization, orchestration, and building scalable deployment pipelines.",
      rating: 4.7,
      students: 5400,
      experience: "7+ years at Netflix, Spotify",
    },
    level: "Advanced",
    duration: "12 weeks",
    students: 980,
    rating: 4.7,
    category: "DevOps",
    description: "Master DevOps practices and build automated CI/CD pipelines",
    longDescription:
      "Streamline your development workflow with DevOps! Learn to build automated CI/CD pipelines, containerize applications with Docker, orchestrate with Kubernetes, and implement infrastructure as code.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["DevOps", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Terraform", "AWS"],
    whatYouWillLearn: [
      "Understand DevOps culture and practices",
      "Build CI/CD pipelines with Jenkins/GitHub Actions",
      "Containerize applications with Docker",
      "Orchestrate containers with Kubernetes",
      "Implement Infrastructure as Code",
      "Monitor and log applications",
      "Automate testing and deployment",
      "Manage cloud infrastructure",
    ],
    requirements: [
      "Experience with software development",
      "Basic Linux/Unix command line skills",
      "Understanding of web applications",
      "Familiarity with Git version control",
    ],
    curriculum: [
      {
        id: 1,
        title: "DevOps Fundamentals",
        duration: "3 hours",
        lessons: 8,
        videos: [
          {
            id: 1,
            title: "Introduction to DevOps",
            duration: "18:00",
            isCompleted: false,
            isLocked: false,
            description: "Learn DevOps principles, culture, and benefits for software development.",
          },
        ],
      },
    ],
    price: 0,
    isFree: true,
    certificate: true,
    language: "English",
    lastUpdated: "2024-01-11",
  },
]

export function getCourseById(id: number): Course | undefined {
  return coursesData.find((course) => course.id === id)
}

export function getCoursesByCategory(category: string): Course[] {
  return coursesData.filter((course) => course.category === category)
}

export function searchCourses(query: string): Course[] {
  const lowercaseQuery = query.toLowerCase()
  return coursesData.filter(
    (course) =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.instructor.name.toLowerCase().includes(lowercaseQuery) ||
      course.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}
