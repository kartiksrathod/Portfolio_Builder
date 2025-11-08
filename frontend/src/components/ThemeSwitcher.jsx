import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Button } from './ui/button';
import { Sun, Moon, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const themes = [
  {
    id: 'light',
    name: 'Light Minimalist',
    icon: Sun,
    description: 'Clean and professional',
    preview: 'bg-white border-slate-200'
  },
  {
    id: 'dark',
    name: 'Dark Modern',
    icon: Moon,
    description: 'Sleek and sophisticated',
    preview: 'bg-slate-900 border-slate-700'
  },
  {
    id: 'creative',
    name: 'Creative Gradient',
    icon: Sparkles,
    description: 'Bold and vibrant',
    preview: 'bg-gradient-to-br from-purple-600 to-blue-600'
  }
];

const ThemeSwitcher = ({ compact = false }) => {
  const { portfolioTheme, setPortfolioTheme } = usePortfolio();

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isActive = portfolioTheme === theme.id;
          
          return (
            <button
              key={theme.id}
              onClick={() => setPortfolioTheme(theme.id)}
              className={`p-2 rounded transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
              }`}
              title={theme.name}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {themes.map((theme) => {
        const Icon = theme.icon;
        const isActive = portfolioTheme === theme.id;

        return (
          <motion.button
            key={theme.id}
            onClick={() => setPortfolioTheme(theme.id)}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              isActive
                ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isActive && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                <Check className="w-3 h-3" />
              </div>
            )}
            <div className="flex flex-col items-center text-center gap-2">
              <div className={`w-12 h-12 rounded-lg ${theme.preview} flex items-center justify-center border-2 ${
                isActive ? 'border-white shadow-lg' : 'border-slate-300 dark:border-slate-600'
              }`}>
                <Icon className={`w-6 h-6 ${
                  theme.id === 'creative' ? 'text-white' : isActive ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'
                }`} />
              </div>
              <div>
                <p className={`text-sm font-semibold ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {theme.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {theme.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
