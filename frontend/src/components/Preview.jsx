import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import { Button } from './ui/button';

const Preview = () => {
  const { portfolioData, selectedTemplate, setSelectedTemplate } = usePortfolio();

  const templates = [
    { id: 'minimal', name: 'Minimal', component: MinimalTemplate },
    { id: 'modern', name: 'Modern', component: ModernTemplate },
    { id: 'professional', name: 'Professional', component: ProfessionalTemplate }
  ];

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || MinimalTemplate;

  return (
    <div className="space-y-4">
      {/* Template Selector */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
        <span className="text-sm font-medium text-slate-700">Template:</span>
        <div className="flex gap-2">
          {templates.map((template) => (
            <Button
              key={template.id}
              size="sm"
              variant={selectedTemplate === template.id ? 'default' : 'outline'}
              onClick={() => setSelectedTemplate(template.id)}
              className={selectedTemplate === template.id ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-300'}
            >
              {template.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto p-8">
          <SelectedTemplateComponent data={portfolioData} />
        </div>
      </div>
    </div>
  );
};

export default Preview;