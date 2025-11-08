import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { ArrowLeft, Download, Maximize2, Eye, Palette, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../hooks/use-toast';
import { exportToPDF } from '../utils/exportPDF';
import useAutoSave from '../hooks/useAutoSave';
import PortfolioEditor from '../components/PortfolioEditor';
import SaveIndicator from '../components/SaveIndicator';
import ThemeSwitcher from '../components/ThemeSwitcher';
import TechPortfolioTemplate from '../components/templates/TechPortfolioTemplate';
import CreativeShowcaseTemplate from '../components/templates/CreativeShowcaseTemplate';
import ModernProfessionalTemplate from '../components/templates/ModernProfessionalTemplate';

const templateComponents = {
  tech: TechPortfolioTemplate,
  creative: CreativeShowcaseTemplate,
  professional: ModernProfessionalTemplate
};

const NewBuilder = () => {
  const navigate = useNavigate();
  const { portfolioData, savePortfolio, selectedTemplate, setSelectedTemplate, portfolioTheme, isFullPreview, setIsFullPreview } = usePortfolio();
  const { isDark, toggleTheme } = useTheme();
  const [isExporting, setIsExporting] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  
  // Auto-save functionality
  const { isSaving, lastSaved } = useAutoSave(portfolioData, savePortfolio, 2000);

  const TemplateComponent = templateComponents[selectedTemplate] || TechPortfolioTemplate;

  const handleExport = async () => {
    setIsExporting(true);
    
    toast({
      title: "Generating PDF",
      description: "Please wait while we create your portfolio PDF...",
    });

    const success = await exportToPDF('portfolio-preview', `${portfolioData.hero.fullName || 'portfolio'}.pdf`, (progress) => {
      console.log(`PDF Export Progress: ${progress}%`);
    });
    
    setIsExporting(false);
    
    if (success) {
      toast({
        title: "✓ PDF Exported Successfully!",
        description: "Your portfolio has been downloaded.",
      });
    } else {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your portfolio. Please try again.",
        variant: "destructive",
      });
    }
  };

  const templates = [
    { id: 'tech', name: 'Tech Portfolio', description: 'Developer-focused with terminal vibes' },
    { id: 'creative', name: 'Creative Showcase', description: 'Bold and vibrant design' },
    { id: 'professional', name: 'Modern Professional', description: 'Clean corporate style' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-slate-600 dark:text-slate-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Portfolio Builder
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <SaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
              
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
              
              {/* Template Selector */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplateSelector(true)}
                className="hidden md:flex items-center gap-2"
              >
                <Palette className="w-4 h-4" />
                Template: {templates.find(t => t.id === selectedTemplate)?.name}
              </Button>
              
              {/* Full Preview Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullPreview(!isFullPreview)}
                className="hidden lg:flex items-center gap-2"
              >
                {isFullPreview ? <Eye className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                {isFullPreview ? 'Edit' : 'Preview Full Page'}
              </Button>
              
              {/* Theme Toggle */}
              <Button 
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-slate-600 dark:text-slate-300"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              {/* Export PDF */}
              <Button 
                size="sm"
                onClick={handleExport}
                disabled={isExporting}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-full">
        {isFullPreview ? (
          /* Full Page Preview Mode */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div id="portfolio-preview" className="mx-auto">
              <TemplateComponent data={portfolioData} theme={portfolioTheme} />
            </div>
          </motion.div>
        ) : (
          /* Editor Mode - Split View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left: Collapsible Editor */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Build Your Portfolio</h2>
                <p className="text-blue-100">Fill in your information in the sections below. Your changes save automatically!</p>
              </div>
              
              {/* Theme Switcher */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Portfolio Theme</h3>
                <ThemeSwitcher />
              </div>
              
              {/* Portfolio Editor */}
              <PortfolioEditor />
            </div>

            {/* Right: Floating Live Preview */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Live Preview</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsFullPreview(true)}
                      className="text-xs"
                    >
                      <Maximize2 className="w-3 h-3 mr-1" />
                      Full Page
                    </Button>
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar">
                  <div id="portfolio-preview" className="scale-[0.4] origin-top-left w-[250%]">
                    <TemplateComponent data={portfolioData} theme={portfolioTheme} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Template Selector Modal */}
      <AnimatePresence>
        {showTemplateSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTemplateSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-4xl w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Choose Your Template</h2>
                <button
                  onClick={() => setShowTemplateSelector(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setShowTemplateSelector(false);
                      toast({
                        title: "Template Changed",
                        description: `Switched to ${template.name}`,
                      });
                    }}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedTemplate === template.id
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                      selectedTemplate === template.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      <Palette className="w-6 h-6" />
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${
                      selectedTemplate === template.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-900 dark:text-white'
                    }`}>
                      {template.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {template.description}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewBuilder;
