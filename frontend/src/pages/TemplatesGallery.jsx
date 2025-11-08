import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { FileText, ArrowLeft, Maximize2, Download, X, Check, Moon, Sun } from 'lucide-react';
import TechPortfolioTemplate from '../components/templates/TechPortfolioTemplate';
import CreativeShowcaseTemplate from '../components/templates/CreativeShowcaseTemplate';
import ModernProfessionalTemplate from '../components/templates/ModernProfessionalTemplate';
import { toast } from '../hooks/use-toast';
import { exportToPDF } from '../utils/exportPDF';

// Sample data for template preview - matching new template structure
const sampleData = {
  hero: {
    fullName: 'Alex Johnson',
    tagline: 'Full Stack Developer & UI/UX Enthusiast',
    shortBio: 'Passionate developer with 5+ years of experience building scalable web applications. I love creating elegant solutions to complex problems.',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    photo: ''
  },
  about: {
    headline: 'About Me',
    story: 'I\'m a full-stack developer who loves turning complex problems into simple, beautiful solutions. With over 5 years of experience in web development, I\'ve worked on everything from small startups to enterprise applications. My passion lies in creating intuitive user experiences backed by robust, scalable architectures.',
    strengths: [
      {
        id: '1',
        title: 'Problem Solver',
        description: 'Breaking down complex challenges into manageable solutions'
      },
      {
        id: '2',
        title: 'Team Player',
        description: 'Collaborative approach to building great products'
      },
      {
        id: '3',
        title: 'Fast Learner',
        description: 'Quickly adapting to new technologies and frameworks'
      }
    ]
  },
  skills: [
    { id: '1', name: 'React', proficiency: 90, category: 'Frontend' },
    { id: '2', name: 'Node.js', proficiency: 85, category: 'Backend' },
    { id: '3', name: 'TypeScript', proficiency: 88, category: 'Language' },
    { id: '4', name: 'Python', proficiency: 80, category: 'Backend' },
    { id: '5', name: 'MongoDB', proficiency: 75, category: 'Database' },
    { id: '6', name: 'AWS', proficiency: 70, category: 'Cloud' },
    { id: '7', name: 'Docker', proficiency: 75, category: 'DevOps' },
    { id: '8', name: 'GraphQL', proficiency: 72, category: 'API' }
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Built a full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Scaled to handle 100K+ daily active users.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
      images: [],
      githubLink: 'https://github.com/alexjohnson/ecommerce',
      liveLink: 'https://demo-ecommerce.example.com',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management SaaS',
      description: 'Developed a collaborative task management tool with real-time updates, team features, and advanced analytics dashboard.',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'WebSockets'],
      images: [],
      githubLink: 'https://github.com/alexjohnson/taskapp',
      liveLink: 'https://taskflow.example.com',
      featured: true
    },
    {
      id: '3',
      title: 'AI Content Generator',
      description: 'Created an AI-powered content generation tool using GPT-4 API. Helps marketers create engaging content 10x faster.',
      technologies: ['Next.js', 'OpenAI API', 'PostgreSQL', 'Prisma'],
      images: [],
      githubLink: 'https://github.com/alexjohnson/ai-content',
      liveLink: '',
      featured: false
    }
  ],
  experience: [
    {
      id: '1',
      position: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: 'Present',
      current: true,
      description: 'Lead development of core platform features, mentor junior developers, and architect scalable microservices. Improved system performance by 40% and reduced deployment time by 60%.',
      responsibilities: [
        'Led team of 5 developers in building cloud-native applications',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Architected microservices handling 1M+ requests daily'
      ]
    },
    {
      id: '2',
      position: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2021-02',
      current: false,
      description: 'Built responsive web applications using React and Node.js. Collaborated with designers and product managers to deliver user-centric features.',
      responsibilities: [
        'Developed 20+ customer-facing features',
        'Integrated payment systems (Stripe, PayPal)',
        'Optimized database queries improving load times by 50%'
      ]
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'California',
      startDate: '2015',
      endDate: '2019',
      gpa: '3.8/4.0',
      description: 'Graduated with honors. Specialized in software engineering, algorithms, and distributed systems. Dean\'s List all semesters.'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-05',
      credentialId: 'AWS-CSA-2023-12345',
      url: 'https://aws.amazon.com/certification/',
      description: 'Professional certification demonstrating expertise in designing distributed systems on AWS.'
    },
    {
      id: '2',
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022-11',
      credentialId: 'GCP-DEV-2022-67890',
      url: 'https://cloud.google.com/certification',
      description: 'Certification in cloud-native application development and deployment on GCP.'
    }
  ],
  contact: {
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    github: 'https://github.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    twitter: 'https://twitter.com/alexjohnson',
    website: 'https://alexjohnson.dev'
  }
};

const TemplatesGallery = () => {
  const navigate = useNavigate();
  const { portfolioData, selectedTemplate, setSelectedTemplate } = usePortfolio();
  const { isDark, toggleTheme } = useTheme();
  const [fullscreenTemplate, setFullscreenTemplate] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const templates = useMemo(() => [
    { 
      id: 'tech', 
      name: 'Tech Portfolio', 
      description: 'Developer-focused design with terminal vibes and code aesthetics',
      component: TechPortfolioTemplate 
    },
    { 
      id: 'creative', 
      name: 'Creative Showcase', 
      description: 'Bold and vibrant design perfect for creative professionals',
      component: CreativeShowcaseTemplate 
    },
    { 
      id: 'professional', 
      name: 'Modern Professional', 
      description: 'Clean corporate style for business and enterprise roles',
      component: ModernProfessionalTemplate 
    }
  ], []);

  const handleMaximize = (template) => {
    setFullscreenTemplate(template);
  };

  const handleCloseFullscreen = () => {
    setFullscreenTemplate(null);
  };

  const handleExportPDF = async (templateId, templateName) => {
    setIsExporting(true);
    
    toast({
      title: "Generating PDF",
      description: "Please wait while we create your portfolio PDF...",
    });

    // Create a temporary element to render the template with user's data
    const tempDiv = document.createElement('div');
    tempDiv.id = 'temp-pdf-export';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '210mm'; // A4 width
    tempDiv.style.padding = '20px';
    tempDiv.style.backgroundColor = '#ffffff';
    document.body.appendChild(tempDiv);

    // Render the selected template component with user's actual data
    const template = templates.find(t => t.id === templateId);
    const TemplateComponent = template.component;
    
    try {
      // Create root and render the component with user's data
      const root = ReactDOM.createRoot(tempDiv);
      
      // Render and wait for it to complete
      await new Promise((resolve) => {
        root.render(<TemplateComponent data={portfolioData} />);
        // Give it time to render
        setTimeout(resolve, 500);
      });

      const success = await exportToPDF('temp-pdf-export', `${templateName.toLowerCase()}-portfolio.pdf`);
      
      // Cleanup
      root.unmount();
      document.body.removeChild(tempDiv);
      
      if (success) {
        toast({
          title: "✓ PDF Exported Successfully!",
          description: `Your ${templateName} portfolio has been downloaded.`,
        });
      } else {
        toast({
          title: "Export Failed",
          description: "There was an error exporting your portfolio. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('PDF Export Error:', error);
      // Cleanup on error
      if (document.body.contains(tempDiv)) {
        document.body.removeChild(tempDiv);
      }
      toast({
        title: "Export Failed",
        description: "There was an error exporting your portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleApplyTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Template Applied",
      description: "This template has been set for your portfolio. Go to Builder to see it.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 dark:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Templates Gallery</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button 
                onClick={() => navigate('/builder')}
                className="bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Go to Builder
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Browse our professionally designed templates. Preview them in fullscreen, download as PDF, or apply to your portfolio.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => {
            const TemplateComponent = template.component;
            const isSelected = selectedTemplate === template.id;
            
            return (
              <div 
                key={template.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fade-in card-hover"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Template Preview */}
                <div className="relative bg-slate-50 dark:bg-slate-700 p-4 h-96 overflow-hidden">
                  <div className="absolute inset-0 p-4 flex items-start justify-center overflow-hidden">
                    <div 
                      className="origin-top scale-[0.28] w-[357%]"
                      style={{ 
                        transformOrigin: 'top center',
                        maxHeight: '1400px'
                      }}
                    >
                      <div className="bg-white dark:bg-slate-800 p-8 shadow-lg">
                        <TemplateComponent data={sampleData} theme="light" />
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg z-10">
                      <Check className="w-4 h-4" />
                      Active
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {template.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {template.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleMaximize(template)}
                      variant="outline"
                      className="flex-1 min-w-[140px] border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Maximize2 className="w-4 h-4 mr-2" />
                      Fullscreen
                    </Button>
                    <Button
                      onClick={() => handleExportPDF(template.id, template.name)}
                      disabled={isExporting}
                      variant="outline"
                      className="flex-1 min-w-[140px] border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isExporting ? 'Exporting...' : 'Download PDF'}
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleApplyTemplate(template.id)}
                    className={`w-full ${isSelected ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} dark:bg-blue-500 dark:hover:bg-blue-600`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Currently Active
                      </>
                    ) : (
                      'Apply This Template'
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Fullscreen Modal */}
      {fullscreenTemplate && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="h-full flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900/90 border-b border-slate-700 px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">
                    {fullscreenTemplate.name} Template
                  </h3>
                  {selectedTemplate === fullscreenTemplate.id && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleExportPDF(fullscreenTemplate.id, fullscreenTemplate.name)}
                    disabled={isExporting}
                    variant="outline"
                    className="border-slate-600 hover:bg-slate-800 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isExporting ? 'Exporting...' : 'Download PDF'}
                  </Button>
                  <Button
                    onClick={() => handleApplyTemplate(fullscreenTemplate.id)}
                    className={selectedTemplate === fullscreenTemplate.id ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                  >
                    {selectedTemplate === fullscreenTemplate.id ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Active Template
                      </>
                    ) : (
                      'Apply Template'
                    )}
                  </Button>
                  <Button
                    onClick={handleCloseFullscreen}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto custom-scrollbar p-8">
              <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-12">
                {React.createElement(fullscreenTemplate.component, { data: sampleData, theme: 'light' })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesGallery;
