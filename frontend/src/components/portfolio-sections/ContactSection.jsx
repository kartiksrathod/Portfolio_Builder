import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe } from 'lucide-react';

const ContactSection = () => {
  const { portfolioData, updateField } = usePortfolio();
  const { contact } = portfolioData;

  const updateContact = (field, value) => {
    updateField('contact', field, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Contact Information</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          How visitors can reach out to you
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email *
        </label>
        <Input
          type="email"
          value={contact.email}
          onChange={(e) => updateContact('email', e.target.value)}
          placeholder="your.email@example.com"
          className="bg-white dark:bg-slate-800"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Phone
        </label>
        <Input
          type="tel"
          value={contact.phone}
          onChange={(e) => updateContact('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
          className="bg-white dark:bg-slate-800"
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location
        </label>
        <Input
          value={contact.location}
          onChange={(e) => updateContact('location', e.target.value)}
          placeholder="San Francisco, CA"
          className="bg-white dark:bg-slate-800"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Social Links
        </h4>
      </div>

      {/* GitHub */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Github className="w-4 h-4" />
          GitHub
        </label>
        <Input
          value={contact.github}
          onChange={(e) => updateContact('github', e.target.value)}
          placeholder="https://github.com/yourusername"
          className="bg-white dark:bg-slate-800"
        />
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </label>
        <Input
          value={contact.linkedin}
          onChange={(e) => updateContact('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/yourusername"
          className="bg-white dark:bg-slate-800"
        />
      </div>

      {/* Twitter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Twitter className="w-4 h-4" />
          Twitter / X
        </label>
        <Input
          value={contact.twitter}
          onChange={(e) => updateContact('twitter', e.target.value)}
          placeholder="https://twitter.com/yourusername"
          className="bg-white dark:bg-slate-800"
        />
      </div>

      {/* Website */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Website
        </label>
        <Input
          value={contact.website}
          onChange={(e) => updateContact('website', e.target.value)}
          placeholder="https://yourwebsite.com"
          className="bg-white dark:bg-slate-800"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Call-to-Action Message
        </label>
        <Textarea
          value={contact.message}
          onChange={(e) => updateContact('message', e.target.value)}
          placeholder="Let's build something amazing together! Feel free to reach out for collaborations or opportunities."
          rows={3}
          className="bg-white dark:bg-slate-800"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This message will appear in your contact section
        </p>
      </div>
    </div>
  );
};

export default ContactSection;