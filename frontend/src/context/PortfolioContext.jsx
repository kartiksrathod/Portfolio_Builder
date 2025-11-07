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
  personalInfo: {
    fullName: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate developer with 5+ years of experience building scalable web applications. I love creating elegant solutions to complex problems.',
    avatar: ''
  },
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Developer',
      company: 'Tech Corp',
      startDate: '2021',
      endDate: 'Present',
      description: 'Led development of core platform features, mentored junior developers, and improved system performance by 40%.'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      startDate: '2019',
      endDate: '2021',
      description: 'Built responsive web applications using React and Node.js. Collaborated with designers and product managers.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      year: '2019',
      description: 'Graduated with honors. Specialized in software engineering and algorithms.'
    }
  ],
  skills: [
    { id: '1', name: 'React', level: 90 },
    { id: '2', name: 'Node.js', level: 85 },
    { id: '3', name: 'TypeScript', level: 80 },
    { id: '4', name: 'Python', level: 75 },
    { id: '5', name: 'MongoDB', level: 70 },
    { id: '6', name: 'AWS', level: 65 }
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Built a full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
      technologies: 'React, Node.js, MongoDB, Stripe',
      githubLink: 'https://github.com/johndoe/ecommerce',
      liveLink: 'https://demo.example.com'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Developed a collaborative task management tool with real-time updates and team features.',
      technologies: 'React, Firebase, Tailwind CSS',
      githubLink: 'https://github.com/johndoe/taskapp',
      liveLink: ''
    }
  ],
  contact: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    website: 'https://johndoe.dev'
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