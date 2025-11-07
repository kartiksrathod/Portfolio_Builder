import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Slider } from '../ui/slider';

const SkillsForm = () => {
  const { portfolioData, updateArrayItem, addArrayItem, removeArrayItem } = usePortfolio();
  const { skills } = portfolioData;
  const [newSkillName, setNewSkillName] = useState('');

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      addArrayItem('skills', {
        name: newSkillName.trim(),
        level: 50
      });
      setNewSkillName('');
    }
  };

  const handleUpdateSkillName = (id, name) => {
    const item = skills.find(skill => skill.id === id);
    updateArrayItem('skills', id, { ...item, name });
  };

  const handleUpdateSkillLevel = (id, level) => {
    const item = skills.find(skill => skill.id === id);
    updateArrayItem('skills', id, { ...item, level });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleUpdateSkillName(skill.id, e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white font-medium"
                    placeholder="Skill name"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem('skills', skill.id)}
                    className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Slider
                      value={[skill.level]}
                      onValueChange={(value) => handleUpdateSkillLevel(skill.id, value[0])}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 min-w-[3rem] text-right">
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Add a new skill..."
        />
        <Button
          onClick={handleAddSkill}
          disabled={!newSkillName.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default SkillsForm;