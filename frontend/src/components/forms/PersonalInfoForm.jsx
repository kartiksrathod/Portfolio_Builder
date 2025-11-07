import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const PersonalInfoForm = () => {
  const { portfolioData, updateField } = usePortfolio();
  const { personalInfo } = portfolioData;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Full Name</label>
        <input
          type="text"
          value={personalInfo.fullName}
          onChange={(e) => updateField('personalInfo', 'fullName', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Professional Title</label>
        <input
          type="text"
          value={personalInfo.title}
          onChange={(e) => updateField('personalInfo', 'title', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Full Stack Developer"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Bio</label>
        <textarea
          value={personalInfo.bio}
          onChange={(e) => updateField('personalInfo', 'bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Tell us about yourself..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => updateField('personalInfo', 'email', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Phone</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => updateField('personalInfo', 'phone', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Location</label>
        <input
          type="text"
          value={personalInfo.location}
          onChange={(e) => updateField('personalInfo', 'location', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="San Francisco, CA"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
