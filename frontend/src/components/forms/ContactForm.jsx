import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Github, Linkedin, Twitter, Globe, AlertCircle } from 'lucide-react';
import { validateURL } from '../../utils/validation';

const ContactForm = () => {
  const { portfolioData, updateField } = usePortfolio();
  const { contact } = portfolioData;
  const [errors, setErrors] = useState({});

  const socialLinks = [
    { key: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
    { key: 'twitter', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
    { key: 'website', label: 'Personal Website', icon: Globe, placeholder: 'https://yourwebsite.com' }
  ];

  const handleURLChange = (key, value) => {
    updateField('contact', key, value);
    const validation = validateURL(value);
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, [key]: validation.error }));
    } else {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Add your social media profiles and website links to help people connect with you.
        </p>
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <div key={social.key} className="space-y-2 animate-fade-in">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {social.label}
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={contact[social.key] || ''}
                  onChange={(e) => handleURLChange(social.key, e.target.value)}
                  className={`w-full px-4 py-2.5 border ${errors[social.key] ? 'border-red-500 dark:border-red-400 pr-10' : 'border-slate-300 dark:border-slate-600'} bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all`}
                  placeholder={social.placeholder}
                />
                {errors[social.key] && (
                  <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </div>
              {errors[social.key] && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 animate-slide-in">
                  {errors[social.key]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg animate-fade-in">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <strong>Tip:</strong> Your email and phone from the Personal Info section will also be included in your portfolio's contact section.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;