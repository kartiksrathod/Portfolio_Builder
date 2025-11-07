import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { portfolioData, updateArrayItem, addArrayItem, removeArrayItem } = usePortfolio();
  const { education } = portfolioData;

  const handleAddEducation = () => {
    addArrayItem('education', {
      degree: '',
      school: '',
      year: '',
      description: ''
    });
  };

  const handleUpdateEducation = (id, field, value) => {
    const item = education.find(edu => edu.id === id);
    updateArrayItem('education', id, { ...item, [field]: value });
  };

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={edu.id} className="p-6 border border-slate-200 rounded-lg bg-slate-50 space-y-4 relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900">Education {index + 1}</h3>
            {education.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeArrayItem('education', edu.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">School/University</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="University of Technology"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Year</label>
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleUpdateEducation(edu.id, 'year', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="2019"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Description (Optional)</label>
              <textarea
                value={edu.description}
                onChange={(e) => handleUpdateEducation(edu.id, 'description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="Honors, specializations, relevant coursework..."
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        onClick={handleAddEducation}
        variant="outline"
        className="w-full border-slate-300 hover:bg-slate-100"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};

export default EducationForm;