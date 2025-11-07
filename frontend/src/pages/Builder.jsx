import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { FileText, Download, ArrowLeft, Eye, EyeOff, Moon, Sun, Maximize2, Minimize2, X, QrCode } from 'lucide-react';
import FormSection from '../components/FormSection';
import Preview from '../components/Preview';
import SaveIndicator from '../components/SaveIndicator';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { toast } from '../hooks/use-toast';
import { exportToPDF } from '../utils/exportPDF';
import useAutoSave from '../hooks/useAutoSave';

const Builder = () => {
  const navigate = useNavigate();
  const { savePortfolio, portfolioData } = usePortfolio();
  const { isDark, toggleTheme } = useTheme();
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isPreviewMaximized, setIsPreviewMaximized] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  
  // Auto-save functionality
  const { isSaving, lastSaved } = useAutoSave(portfolioData, savePortfolio, 2000);

  const handleManualSave = () => {
    const success = savePortfolio();
    if (success) {
      toast({
        title: "Portfolio Saved",
        description: "Your portfolio has been saved successfully.",
      });
    } else {
      toast({
        title: "Save Failed",
        description: "There was an error saving your portfolio.",
        variant: "destructive",
      });
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    const toastId = toast({
      title: "Generating PDF",
      description: "Please wait while we create your portfolio PDF...",
    });

    const success = await exportToPDF('portfolio-preview', 'portfolio.pdf', (progress) => {
      // Progress callback - could update UI if needed
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
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
                <h1 className="text-xl font-bold text-slate-900 dark:text-white hidden md:block">Portfolio Builder</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
              <div className="hidden sm:block w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
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
                variant="ghost"
                size="icon"
                onClick={() => setShowQRCode(true)}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                aria-label="Generate QR Code"
                title="Generate QR Code"
              >
                <QrCode className="w-5 h-5" />
              </Button>
              <Button 
                size="sm"
                onClick={handleExport}
                disabled={isExporting}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export PDF'}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6 animate-slide-in">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-slate-200 dark:border-slate-700 transition-all">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Build Your Portfolio</h2>
                <p className="text-slate-600 dark:text-slate-300">Fill in your information to create your professional portfolio</p>
              </div>
              <FormSection />
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-2xl p-6 border border-slate-200 dark:border-slate-700 lg:sticky lg:top-24 animate-fade-in transition-all">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Live Preview</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsPreviewMaximized(true)}
                    className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                    title="Maximize Preview"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className="lg:hidden border-slate-300 dark:border-slate-600"
                  >
                    {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showPreview ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </div>
              <div className={`${showPreview ? 'block' : 'hidden lg:block'} transition-all duration-300`}>
                <Preview />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      {isPreviewMaximized && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="h-full flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900/90 border-b border-slate-700 px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">
                    Live Preview - Fullscreen
                  </h3>
                  <SaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleExport}
                    disabled={isExporting}
                    variant="outline"
                    className="border-slate-600 hover:bg-slate-800 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isExporting ? 'Exporting...' : 'Download PDF'}
                  </Button>
                  <Button
                    onClick={() => setIsPreviewMaximized(false)}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-slate-800"
                    title="Minimize Preview"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto custom-scrollbar p-8">
              <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-12">
                <div id="portfolio-preview-fullscreen">
                  <Preview />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;