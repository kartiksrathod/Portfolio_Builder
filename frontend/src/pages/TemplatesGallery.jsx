import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { FileText, ArrowLeft, Maximize2, Download, X, Check, Moon, Sun } from 'lucide-react';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import { toast } from '../hooks/use-toast';
import { exportToPDF } from '../utils/exportPDF';

// Sample data for template preview
const sampleData = {
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

const TemplatesGallery = () => {
  const navigate = useNavigate();
  const { portfolioData, selectedTemplate, setSelectedTemplate } = usePortfolio();
  const { isDark, toggleTheme } = useTheme();
  const [fullscreenTemplate, setFullscreenTemplate] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const templates = useMemo(() => [
    { 
      id: 'minimal', 
      name: 'Minimal', 
      description: 'Clean and simple design with focus on content',
      component: MinimalTemplate 
    },
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Contemporary design with bold typography',
      component: ModernTemplate 
    },
    { 
      id: 'professional', 
      name: 'Professional', 
      description: 'Classic layout perfect for corporate roles',
      component: ProfessionalTemplate 
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Vibrant and colorful design for creative professionals',
      component: CreativeTemplate 
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                        <TemplateComponent data={sampleData} />
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
                {React.createElement(fullscreenTemplate.component, { data: sampleData })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesGallery;
