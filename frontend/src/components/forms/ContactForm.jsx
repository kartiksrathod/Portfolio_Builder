import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

const ContactForm = () => {
  const { portfolioData, updateField } = usePortfolio();
  const { contact } = portfolioData;

  const socialLinks = [
    { key: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
    { key: 'twitter', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
    { key: 'website', label: 'Personal Website', icon: Globe, placeholder: 'https://yourwebsite.com' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Add your social media profiles and website links to help people connect with you.
        </p>
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <div key={social.key} className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {social.label}
              </label>
              <input
                type="url"
                value={contact[social.key] || ''}
                onChange={(e) => updateField('contact', social.key, e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder={social.placeholder}
              />
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Your email and phone from the Personal Info section will also be included in your portfolio's contact section.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;