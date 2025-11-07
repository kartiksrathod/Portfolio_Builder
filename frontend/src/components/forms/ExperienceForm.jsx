import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = () => {
  const { portfolioData, updateArrayItem, addArrayItem, removeArrayItem } = usePortfolio();
  const { experience } = portfolioData;

  const handleAddExperience = () => {
    addArrayItem('experience', {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleUpdateExperience = (id, field, value) => {
    const item = experience.find(exp => exp.id === id);
    updateArrayItem('experience', id, { ...item, [field]: value });
  };

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div key={exp.id} className="p-6 border border-slate-200 rounded-lg bg-slate-50 space-y-4 relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900">Experience {index + 1}</h3>
            {experience.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeArrayItem('experience', exp.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Job Title</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => handleUpdateExperience(exp.id, 'jobTitle', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="Senior Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="Tech Corp"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                  placeholder="2021"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                  placeholder="Present"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        onClick={handleAddExperience}
        variant="outline"
        className="w-full border-slate-300 hover:bg-slate-100"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;