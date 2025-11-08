import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

const EducationSection = () => {
  const { portfolioData, addArrayItem, updateArrayItem, removeArrayItem } = usePortfolio();
  const { education } = portfolioData;

  const addEducation = () => {
    addArrayItem('education', {
      degree: '',
      school: '',
      location: '',
      year: '',
      description: '',
      achievements: []
    });
  };

  const updateEducation = (id, field, value) => {
    updateArrayItem('education', id, { [field]: value });
  };

  const removeEducation = (id) => {
    removeArrayItem('education', id);
  };

  const handleAchievementsChange = (id, value) => {
    const achArray = value.split('\n').filter(a => a.trim());
    updateEducation(id, 'achievements', achArray);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Education</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Your academic background and achievements
        </p>
      </div>

      <Button onClick={addEducation} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>

      {education.length > 0 ? (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="p-5 border-2 border-slate-200 dark:border-slate-700 rounded-lg space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Education #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              {/* Degree */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Degree *
                </label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="bg-white dark:bg-slate-800"
                />
              </div>

              {/* School & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    School / University *
                  </label>
                  <Input
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    placeholder="University of Technology"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Location
                  </label>
                  <Input
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    placeholder="Boston, MA"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Year of Graduation
                </label>
                <Input
                  value={edu.year}
                  onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                  placeholder="2019"
                  className="bg-white dark:bg-slate-800"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  placeholder="Brief description of your studies, specialization, or notable experiences..."
                  rows={2}
                  className="bg-white dark:bg-slate-800"
                />
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Achievements / Honors
                </label>
                <Textarea
                  value={Array.isArray(edu.achievements) ? edu.achievements.join('\n') : ''}
                  onChange={(e) => handleAchievementsChange(edu.id, e.target.value)}
                  placeholder="- GPA: 3.8/4.0\n- Dean's List all semesters\n- Senior Capstone: Machine Learning Project"
                  rows={4}
                  className="bg-white dark:bg-slate-800 font-mono text-sm"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter each achievement on a new line (will be displayed as bullet points)
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 mb-3">No education added yet</p>
          <Button variant="outline" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Education
          </Button>
        </div>
      )}
    </div>
  );
};

export default EducationSection;