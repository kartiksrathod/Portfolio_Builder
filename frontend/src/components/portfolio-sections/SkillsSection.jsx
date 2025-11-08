import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';

const SkillsSection = () => {
  const { portfolioData, updateField, addArrayItem, removeArrayItem } = usePortfolio();
  const { skills } = portfolioData;
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('General');

  const categories = ['Frontend', 'Backend', 'Languages', 'Database', 'DevOps', 'Tools', 'General'];

  const addSkill = () => {
    if (!newSkillName.trim()) return;

    addArrayItem('skills', {
      name: newSkillName,
      level: 50,
      category: newSkillCategory
    });
    setNewSkillName('');
    setNewSkillCategory('General');
  };

  const updateSkill = (id, field, value) => {
    const updatedSkills = skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    updateField('skills', '', updatedSkills);
  };

  const removeSkill = (id) => {
    removeArrayItem('skills', id);
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Skills</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Showcase your technical and soft skills with proficiency levels
        </p>
      </div>

      {/* Add New Skill */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Add New Skill
        </label>
        <div className="flex gap-2">
          <Input
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Skill name (e.g., React, Python)"
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            className="flex-1 bg-white dark:bg-slate-800"
          />
          <Select value={newSkillCategory} onValueChange={setNewSkillCategory}>
            <SelectTrigger className="w-32 bg-white dark:bg-slate-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addSkill}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {/* Skills List */}
      {skills.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                {category}
              </h4>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Input
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        className="flex-1 font-medium bg-white dark:bg-slate-800"
                      />
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 w-12 text-right">
                        {skill.level}%
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(skill.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    <Slider
                      value={[skill.level]}
                      onValueChange={(value) => updateSkill(skill.id, 'level', value[0])}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          <p className="text-slate-500 dark:text-slate-400">No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;