export const personal = {
  name: "Adithya U",
  firstName: "Adithya",
  tagline: "Full Stack Developer · AI Enthusiast · Building Smart Digital Solutions",
  heroIntro:
    "I'm a Full Stack Developer and AI Enthusiast who enjoys building modern web applications, intelligent automation systems, and real-world software solutions. I turn ideas into impactful digital products through clean code, creativity, and continuous learning.",
  location: "Madurai, Tamil Nadu, India",
  email: "ambrishathi007@gmail.com",
  phone: "+91 9150301030",
  resumeUrl:
    "https://drive.google.com/file/d/10uOasWn6jo4aYKs4_JtoiJ0MI9xFJTkq/view",
  avatar: "/images/profile.jpeg",
};

export const socials = {
  github: "https://github.com/Adhxizz",
  linkedin: "https://www.linkedin.com/in/adithya-u-11d40",
  leetcode: "https://leetcode.com/u/ZWmGAt4ZUs/",
  email: `mailto:${personal.email}`,
};

export const about = {
  bio: [
    "I am a passionate Full Stack Developer with a strong interest in Artificial Intelligence, Web Development, and Automation. I enjoy creating innovative applications that solve practical problems and improve user experiences.",
    "Through internships and personal projects, I've gained hands-on experience building responsive websites, intelligent chatbots, automation workflows, and scalable web solutions. I'm constantly exploring new technologies and challenging myself through development projects, coding challenges, and hackathons.",
  ],
  goal:
    "My goal is to become a skilled Software Engineer specializing in Full Stack Development and AI-powered applications, contributing to impactful products that solve real-world challenges.",
  interests: [
    "Artificial Intelligence",
    "Web Development",
    "Automation",
    "Competitive Programming",
    "Hackathons",
    "Fitness & Gym",
    "Technology Exploration",
  ],
  strengths: [
    {
      title: "Problem Solving",
      description: "Breaking down complex challenges into clear, workable solutions.",
    },
    {
      title: "Quick Learning",
      description: "Picking up new tools and frameworks fast under real deadlines.",
    },
    {
      title: "Adaptability",
      description: "Comfortable switching between frontend, backend, and automation work.",
    },
    {
      title: "Team Collaboration",
      description: "Working well across teams during internships, hackathons, and events.",
    },
    {
      title: "Attention to Detail",
      description: "Caring about the small things that make software feel polished.",
    },
  ],
};

export type SkillCategory = {
  category: string;
  icon: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    icon: "Code2",
    skills: ["Java", "Python", "C", "C++"],
  },
  {
    category: "Frontend",
    icon: "LayoutTemplate",
    skills: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
  },
  {
    category: "Backend",
    icon: "Server",
    skills: ["PHP"],
  },
  {
    category: "Databases",
    icon: "Database",
    skills: ["MySQL"],
  },
  {
    category: "AI & Automation",
    icon: "BrainCircuit",
    skills: [
      "AI Fundamentals",
      "Machine Learning Basics",
      "Chatbot Development",
      "n8n Automation",
      "Workflow Automation",
    ],
  },
  {
    category: "Tools & Technologies",
    icon: "Wrench",
    skills: ["Git", "GitHub", "VS Code", "Google Sheets", "Telegram Bot API", "Figma"],
  },
];

export type Experience = {
  company: string;
  role: string;
  duration: string;
  mode: string;
  responsibilities: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    company: "Gateway Software Solutions",
    role: "Full Stack Developer Intern",
    duration: "December 2024 — February 2025",
    mode: "Virtual",
    responsibilities: [
      "Developed responsive web applications end to end.",
      "Enhanced UI/UX and application performance across pages.",
      "Worked with databases and backend integration for real features.",
    ],
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "PHP", "MySQL"],
  },
  {
    company: "Rinex Technology",
    role: "AI Intern",
    duration: "June 2024 — August 2024",
    mode: "Virtual",
    responsibilities: [
      "Learned AI and Machine Learning concepts and their real-world applications.",
      "Worked with algorithms for real-world data analysis tasks.",
      "Explored optimization techniques and intelligent systems.",
    ],
    technologies: ["Python", "Machine Learning"],
  },
];

export type Project = {
  slug: string;
  name: string;
  description: string;
  problem: string;
  features: string[];
  tech: string[];
  github: string | null;
  live: string | null;
  gradient: [string, string];
  icon: string;
  image: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "city-portal-madurai",
    image: "/images/projects/city-portal-madurai.svg",
    name: "City Portal of Madurai",
    description:
      "A centralized digital platform that provides essential city services, information, and resources for citizens and visitors of Madurai.",
    problem:
      "Citizens often struggle to access city-related information and services from multiple scattered sources. This platform brings everything together in one place.",
    features: [
      "Public service information",
      "Emergency contact directory",
      "Tourist attraction listings",
      "City news & updates",
      "Fully responsive interface",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: null,
    live: null,
    gradient: ["#3B82F6", "#10D9C4"],
    icon: "Building2",
    featured: true,
  },
  {
    slug: "medichecker",
    image: "/images/projects/medichecker.svg",
    name: "MediChecker",
    description:
      "An intelligent healthcare platform that helps users verify medicines, understand prescriptions, and access medication-related information.",
    problem:
      "Patients often lack clear information about medicines, dosage, and usage instructions.",
    features: [
      "Medicine information lookup",
      "Prescription assistance",
      "User-friendly interface",
      "Healthcare awareness support",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: null,
    live: null,
    gradient: ["#7C3AED", "#3B82F6"],
    icon: "Stethoscope",
    featured: true,
  },
  {
    slug: "price-tracer",
    image: "/images/projects/price-tracer.svg",
    name: "Price Tracer",
    description: "An automated product price monitoring and alert system.",
    problem:
      "Users often miss price drops on e-commerce platforms — this system tracks prices and notifies them instantly.",
    features: [
      "Amazon price tracking",
      "Flipkart price tracking",
      "Instant Telegram alerts",
      "Google Sheets integration",
      "Automated monitoring",
    ],
    tech: ["n8n", "Google Sheets", "Telegram Bot API"],
    github: null,
    live: null,
    gradient: ["#10D9C4", "#3B82F6"],
    icon: "TrendingDown",
    featured: true,
  },
  {
    slug: "interactive-web-chatbot",
    image: "/images/projects/interactive-web-chatbot.svg",
    name: "Interactive Web Chatbot",
    description: "An AI-powered chatbot developed for Smart India Hackathon.",
    problem:
      "Provides automated assistance and improves user engagement through conversational interactions.",
    features: [
      "Intelligent conversations",
      "Real-time responses",
      "Interactive user experience",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    github: null,
    live: null,
    gradient: ["#7C3AED", "#10D9C4"],
    icon: "Bot",
    featured: true,
  },
  {
    slug: "grooming-salon-website",
    image: "/images/projects/grooming-salon.svg",
    name: "Grooming (Salon) Website",
    description: "A complete salon management and appointment booking platform.",
    problem: "Digitizes salon operations and simplifies appointment scheduling.",
    features: [
      "Online booking",
      "Service management",
      "Responsive design",
      "Customer-friendly interface",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: null,
    live: null,
    gradient: ["#3B82F6", "#7C3AED"],
    icon: "Scissors",
    featured: false,
  },
  {
    slug: "eco-learn-platform",
    image: "/images/projects/eco-learn.svg",
    name: "Eco Learn Platform",
    description: "An educational platform promoting environmental awareness and sustainable learning.",
    problem:
      "Provides accessible resources for environmental education and sustainability awareness.",
    features: [
      "Learning modules",
      "Educational resources",
      "Interactive content",
      "Responsive design",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    github: null,
    live: null,
    gradient: ["#10D9C4", "#7C3AED"],
    icon: "Leaf",
    featured: false,
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  { name: "Python for Data Science", issuer: "NPTEL", year: "2025" },
  {
    name: "Python Data Analysis & Visualization Masterclass",
    issuer: "Udemy",
    year: "2025",
  },
  { name: "MongoDB Basics for Students", issuer: "MongoDB", year: "2025" },
  { name: "C & C++ Diploma", issuer: "Diploma", year: "2021" },
];

export type Achievement = {
  title: string;
  description: string;
  icon: string;
};

export const achievements: Achievement[] = [
  {
    title: "TN Skills Web Technology — Level 2 Qualified",
    description: "Conducted by Infosys, 2025.",
    icon: "Award",
  },
  {
    title: "Event Coordinator",
    description: "Successfully organized and managed college events and activities.",
    icon: "Users",
  },
  {
    title: "Coding Enthusiast",
    description: "Actively participates in coding challenges, hackathons, and problem-solving competitions.",
    icon: "Trophy",
  },
];
