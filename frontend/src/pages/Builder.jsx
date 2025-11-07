import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Button } from '../components/ui/button';
import { FileText, Save, Download, ArrowLeft } from 'lucide-react';
import FormSection from '../components/FormSection';
import Preview from '../components/Preview';
import { toast } from '../hooks/use-toast';
import { exportToPDF } from '../utils/exportPDF';

const Builder = () => {
  const navigate = useNavigate();
  const { savePortfolio } = usePortfolio();
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSave = () => {
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
    toast({
      title: "Generating PDF",
      description: "Please wait while we create your portfolio PDF...",
    });

    const success = await exportToPDF();
    
    setIsExporting(false);
    
    if (success) {
      toast({
        title: "PDF Exported",
        description: "Your portfolio has been downloaded successfully.",
      });
    } else {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your portfolio.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Portfolio Builder</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSave}
                className="border-slate-300"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button 
                size="sm"
                onClick={handleExport}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Build Your Portfolio</h2>
                <p className="text-slate-600">Fill in your information to create your professional portfolio</p>
              </div>
              <FormSection />
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 sticky top-24">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Live Preview</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="lg:hidden"
                >
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
              </div>
              <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-slate-50 rounded-lg p-8 min-h-[600px] border border-slate-200">
                  <div className="text-center text-slate-400">
                    <FileText className="w-16 h-16 mx-auto mb-4" />
                    <p>Preview will appear here</p>
                    <p className="text-sm mt-2">Coming in the next phase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;