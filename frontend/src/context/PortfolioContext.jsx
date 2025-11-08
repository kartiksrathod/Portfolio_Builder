import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

const initialData = {
  // Hero / Introduction Section
  hero: {
    fullName: 'Alex Rivera',
    tagline: 'Full Stack Developer & Creative Problem Solver',
    shortBio: 'Building innovative web experiences that make a difference',
    photo: '', // base64 encoded photo
    heroBackground: '' // optional background image
  },
  
  // About Me Section
  about: {
    headline: 'About Me',
    story: 'I\'m a passionate developer with 5+ years of experience crafting beautiful, functional web applications. My journey started with a curiosity about how things work, and evolved into a love for creating digital experiences that users enjoy. I specialize in full-stack development, with a focus on modern frameworks and scalable architectures.',
    strengths: [
      { id: '1', title: 'Problem Solving', description: 'Breaking down complex challenges into elegant solutions' },
      { id: '2', title: 'Team Leadership', description: 'Mentoring developers and fostering collaborative environments' },
      { id: '3', title: 'Innovation', description: 'Always exploring new technologies and best practices' }
    ]
  },
  
  // Skills Section
  skills: [
    { id: '1', name: 'React', level: 90, category: 'Frontend' },
    { id: '2', name: 'Node.js', level: 85, category: 'Backend' },
    { id: '3', name: 'TypeScript', level: 80, category: 'Languages' },
    { id: '4', name: 'Python', level: 75, category: 'Languages' },
    { id: '5', name: 'MongoDB', level: 70, category: 'Database' },
    { id: '6', name: 'AWS', level: 65, category: 'DevOps' }
  ],
  
  // Projects Section with Multiple Images
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Built a full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. This project showcases my ability to handle complex state management and create intuitive user experiences.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      images: [], // Array of base64 encoded images
      githubLink: 'https://github.com/johndoe/ecommerce',
      liveLink: 'https://demo.example.com',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Developed a collaborative task management tool with real-time updates and team features. Features include drag-and-drop task organization, real-time collaboration, and advanced filtering.',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      images: [],
      githubLink: 'https://github.com/johndoe/taskapp',
      liveLink: '',
      featured: false
    }
  ],
  
  // Experience Section (Timeline)
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      startDate: '2021',
      endDate: 'Present',
      description: 'Leading development of core platform features, mentoring junior developers, and architecting scalable solutions. Improved system performance by 40% through optimization initiatives.',
      responsibilities: [
        'Led team of 5 developers in building customer-facing features',
        'Architected microservices infrastructure using Node.js and Docker',
        'Implemented CI/CD pipelines reducing deployment time by 60%'
      ]
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2019',
      endDate: '2021',
      description: 'Built responsive web applications from concept to deployment. Collaborated closely with designers and product managers to deliver user-centric features.',
      responsibilities: [
        'Developed RESTful APIs serving 100k+ daily active users',
        'Created responsive React components with 95% code coverage',
        'Optimized database queries improving response time by 50%'
      ]
    }
  ],
  
  // Education Section
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      location: 'Boston, MA',
      year: '2019',
      description: 'Graduated with honors. Specialized in software engineering, algorithms, and distributed systems.',
      achievements: [
        'GPA: 3.8/4.0',
        'Dean\'s List all semesters',
        'Senior Capstone: Machine Learning for Predictive Analytics'
      ]
    }
  ],
  
  // Certifications & Awards
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-12345',
      credentialUrl: 'https://aws.amazon.com/verification',
      description: 'Professional level certification for designing distributed systems on AWS'
    }
  ],
  
  // Contact Section
  contact: {
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    github: 'https://github.com/alexrivera',
    linkedin: 'https://linkedin.com/in/alexrivera',
    twitter: 'https://twitter.com/alexrivera',
    website: 'https://alexrivera.dev',
    message: 'Let\'s build something amazing together! Feel free to reach out for collaborations or opportunities.'
  },
  
  // Theme Selection
  theme: 'light', // 'light', 'dark', 'creative'
  
  // Color Scheme (for customization)
  colorScheme: {
    primary: '#3b82f6', // blue-600
    secondary: '#1e293b', // slate-800
    accent: '#10b981' // green-500
  }
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [currentStep, setCurrentStep] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        setPortfolioData(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Update specific field in a section
  const updateField = (section, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Update array items (experience, education, skills, projects)
  const updateArrayItem = (section, itemId, updatedItem) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === itemId ? { ...item, ...updatedItem } : item
      )
    }));
  };

  // Add new array item
  const addArrayItem = (section, newItem) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now().toString() }]
    }));
  };

  // Remove array item
  const removeArrayItem = (section, itemId) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== itemId)
    }));
  };

  // Save to localStorage
  const savePortfolio = () => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
      return true;
    } catch (error) {
      console.error('Error saving portfolio:', error);
      return false;
    }
  };

  // Reset to initial state
  const resetPortfolio = () => {
    setPortfolioData(initialData);
    localStorage.removeItem('portfolioData');
  };

  const value = {
    portfolioData,
    selectedTemplate,
    currentStep,
    setSelectedTemplate,
    setCurrentStep,
    updateField,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    savePortfolio,
    resetPortfolio
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};