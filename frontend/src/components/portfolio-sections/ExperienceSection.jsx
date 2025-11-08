import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, Trash2, Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const { portfolioData, addArrayItem, updateArrayItem, removeArrayItem } = usePortfolio();
  const { experience } = portfolioData;

  const addExperience = () => {
    addArrayItem('experience', {
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      responsibilities: []
    });
  };

  const updateExperience = (id, field, value) => {
    updateArrayItem('experience', id, { [field]: value });
  };

  const removeExperience = (id) => {
    removeArrayItem('experience', id);
  };

  const handleResponsibilitiesChange = (id, value) => {
    const respArray = value.split('\n').filter(r => r.trim());
    updateExperience(id, 'responsibilities', respArray);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Experience</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Your professional journey and accomplishments
        </p>
      </div>

      <Button onClick={addExperience} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>

      {experience.length > 0 ? (
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={exp.id} className="p-5 border-2 border-slate-200 dark:border-slate-700 rounded-lg space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Experience #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Job Title *
                </label>
                <Input
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                  placeholder="Senior Full Stack Developer"
                  className="bg-white dark:bg-slate-800"
                />
              </div>

              {/* Company & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Company *
                  </label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Tech Innovations Inc."
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Location
                  </label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    placeholder="San Francisco, CA"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Start Date *
                  </label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="Jan 2021"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    End Date
                  </label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="Present"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Brief overview of your role and impact..."
                  rows={3}
                  className="bg-white dark:bg-slate-800"
                />
              </div>

              {/* Key Responsibilities */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Key Responsibilities / Achievements
                </label>
                <Textarea
                  value={Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : ''}
                  onChange={(e) => handleResponsibilitiesChange(exp.id, e.target.value)}
                  placeholder="- Led team of 5 developers\n- Architected microservices infrastructure\n- Improved performance by 40%"
                  rows={5}
                  className="bg-white dark:bg-slate-800 font-mono text-sm"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter each responsibility on a new line (will be displayed as bullet points)
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 mb-3">No experience added yet</p>
          <Button variant="outline" onClick={addExperience}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Experience
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;