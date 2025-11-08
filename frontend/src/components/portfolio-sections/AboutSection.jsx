import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

const AboutSection = () => {
  const { portfolioData, updateField, addArrayItem, updateArrayItem, removeArrayItem } = usePortfolio();
  const { about } = portfolioData;

  const addStrength = () => {
    addArrayItem('about.strengths', {
      title: '',
      description: ''
    });
  };

  const updateStrength = (id, field, value) => {
    const updatedStrengths = about.strengths.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    );
    updateField('about', 'strengths', updatedStrengths);
  };

  const removeStrength = (id) => {
    const updatedStrengths = about.strengths.filter(s => s.id !== id);
    updateField('about', 'strengths', updatedStrengths);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">About Me</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Tell your story and highlight what makes you unique
        </p>
      </div>

      {/* Headline */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Section Headline
        </label>
        <Input
          value={about.headline}
          onChange={(e) => updateField('about', 'headline', e.target.value)}
          placeholder="About Me"
          className="bg-white dark:bg-slate-800"
        />
      </div>

      {/* Story */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Your Story *
        </label>
        <Textarea
          value={about.story}
          onChange={(e) => updateField('about', 'story', e.target.value)}
          placeholder="Tell your story... What drives you? What's your background?"
          rows={6}
          className="bg-white dark:bg-slate-800"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Share your journey, passion, and what makes you unique (2-3 paragraphs recommended)
        </p>
      </div>

      {/* Strengths */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Key Strengths
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={addStrength}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Strength
          </Button>
        </div>

        {about.strengths && about.strengths.length > 0 ? (
          <div className="space-y-4">
            {about.strengths.map((strength, index) => (
              <div key={strength.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Strength #{index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStrength(strength.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
                <Input
                  value={strength.title}
                  onChange={(e) => updateStrength(strength.id, 'title', e.target.value)}
                  placeholder="Strength title (e.g., Problem Solving)"
                  className="bg-white dark:bg-slate-800"
                />
                <Textarea
                  value={strength.description}
                  onChange={(e) => updateStrength(strength.id, 'description', e.target.value)}
                  placeholder="Brief description of this strength"
                  rows={2}
                  className="bg-white dark:bg-slate-800 resize-none"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
            <p className="text-slate-500 dark:text-slate-400 mb-3">No strengths added yet</p>
            <Button variant="outline" size="sm" onClick={addStrength}>
              <Plus className="w-4 h-4 mr-1" />
              Add Your First Strength
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;