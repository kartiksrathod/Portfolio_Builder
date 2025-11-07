import React, { useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import { Button } from './ui/button';

const Preview = React.memo(() => {
  const { portfolioData, selectedTemplate, setSelectedTemplate } = usePortfolio();

  const templates = useMemo(() => [
    { id: 'minimal', name: 'Minimal', component: MinimalTemplate },
    { id: 'modern', name: 'Modern', component: ModernTemplate },
    { id: 'professional', name: 'Professional', component: ProfessionalTemplate },
    { id: 'creative', name: 'Creative', component: CreativeTemplate }
  ], []);

  const SelectedTemplateComponent = useMemo(() => 
    templates.find(t => t.id === selectedTemplate)?.component || MinimalTemplate,
    [selectedTemplate, templates]
  );

  return (
    <div className="space-y-4">
      {/* Template Selector */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-700 flex-wrap">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Template:</span>
        <div className="flex gap-2 flex-wrap">
          {templates.map((template) => (
            <Button
              key={template.id}
              size="sm"
              variant={selectedTemplate === template.id ? 'default' : 'outline'}
              onClick={() => setSelectedTemplate(template.id)}
              className={`transition-all ${selectedTemplate === template.id ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' : 'border-slate-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'}`}
            >
              {template.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden shadow-inner">
        <div className="max-h-[600px] overflow-y-auto p-8 custom-scrollbar">
          <div id="portfolio-preview">
            <SelectedTemplateComponent data={portfolioData} />
          </div>
        </div>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;