import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Palette, Check } from 'lucide-react';
import { toast } from '../../hooks/use-toast';

const presetThemes = [
  {
    name: 'Classic Blue',
    primary: '#3b82f6',
    secondary: '#1e293b',
    accent: '#10b981'
  },
  {
    name: 'Professional Purple',
    primary: '#8b5cf6',
    secondary: '#1e1b4b',
    accent: '#f59e0b'
  },
  {
    name: 'Modern Teal',
    primary: '#14b8a6',
    secondary: '#0f172a',
    accent: '#ec4899'
  },
  {
    name: 'Elegant Navy',
    primary: '#1e40af',
    secondary: '#172554',
    accent: '#06b6d4'
  },
  {
    name: 'Bold Red',
    primary: '#ef4444',
    secondary: '#18181b',
    accent: '#fbbf24'
  },
  {
    name: 'Fresh Green',
    primary: '#22c55e',
    secondary: '#052e16',
    accent: '#a855f7'
  }
];

const ColorSchemeForm = () => {
  const { portfolioData, updateField } = usePortfolio();
  const [customMode, setCustomMode] = useState(false);
  const [tempColors, setTempColors] = useState(portfolioData.colorScheme);

  const applyPreset = (theme) => {
    const newScheme = {
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent
    };
    updateField('colorScheme', 'primary', theme.primary);
    updateField('colorScheme', 'secondary', theme.secondary);
    updateField('colorScheme', 'accent', theme.accent);
    setTempColors(newScheme);
    setCustomMode(false);
    toast({
      title: "Theme applied",
      description: `${theme.name} color scheme has been applied to your portfolio.`,
    });
  };

  const handleColorChange = (key, value) => {
    setTempColors(prev => ({ ...prev, [key]: value }));
  };

  const applyCustomColors = () => {
    updateField('colorScheme', 'primary', tempColors.primary);
    updateField('colorScheme', 'secondary', tempColors.secondary);
    updateField('colorScheme', 'accent', tempColors.accent);
    toast({
      title: "Custom colors applied",
      description: "Your custom color scheme has been applied successfully.",
    });
  };

  const isActiveTheme = (theme) => {
    return portfolioData.colorScheme.primary === theme.primary &&
           portfolioData.colorScheme.secondary === theme.secondary &&
           portfolioData.colorScheme.accent === theme.accent;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Color Scheme
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Choose a preset theme or create your own custom color scheme
        </p>

        {/* Preset Themes */}
        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Preset Themes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {presetThemes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => applyPreset(theme)}
                className={`relative p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                  isActiveTheme(theme)
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {isActiveTheme(theme) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <Palette className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span className="font-medium text-slate-900 dark:text-white">
                    {theme.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div
                    className="w-12 h-12 rounded-md shadow-sm border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: theme.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-12 h-12 rounded-md shadow-sm border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: theme.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="w-12 h-12 rounded-md shadow-sm border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: theme.accent }}
                    title="Accent"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Custom Colors
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCustomMode(!customMode)}
              className="border-slate-300 dark:border-slate-600"
            >
              {customMode ? 'Hide' : 'Show'} Custom Picker
            </Button>
          </div>

          {customMode && (
            <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={tempColors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-16 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempColors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                      placeholder="#3b82f6"
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Main brand color
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={tempColors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="w-16 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempColors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                      placeholder="#1e293b"
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Background/header color
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={tempColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="w-16 h-10 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempColors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                      placeholder="#10b981"
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Highlight color
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={applyCustomColors}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Apply Custom Colors
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Current Color Scheme Preview
          </h4>
          <div className="flex gap-4">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-lg shadow-md border-2 border-slate-200 dark:border-slate-700"
                style={{ backgroundColor: portfolioData.colorScheme.primary }}
              />
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Primary</p>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-500">
                {portfolioData.colorScheme.primary}
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-lg shadow-md border-2 border-slate-200 dark:border-slate-700"
                style={{ backgroundColor: portfolioData.colorScheme.secondary }}
              />
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Secondary</p>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-500">
                {portfolioData.colorScheme.secondary}
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-lg shadow-md border-2 border-slate-200 dark:border-slate-700"
                style={{ backgroundColor: portfolioData.colorScheme.accent }}
              />
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Accent</p>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-500">
                {portfolioData.colorScheme.accent}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSchemeForm;
