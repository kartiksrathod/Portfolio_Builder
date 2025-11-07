import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { validateEmail, validatePhone } from '../../utils/validation';

const PersonalInfoForm = () => {
  const { portfolioData, updateField } = usePortfolio();
  const { personalInfo } = portfolioData;
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    const value = e.target.value;
    updateField('personalInfo', 'email', value);
    const validation = validateEmail(value);
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, email: validation.error }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    updateField('personalInfo', 'phone', value);
    const validation = validatePhone(value);
    if (!validation.valid) {
      setErrors(prev => ({ ...prev, phone: validation.error }));
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
        <input
          type="text"
          value={personalInfo.fullName}
          onChange={(e) => updateField('personalInfo', 'fullName', e.target.value)}
          className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Professional Title</label>
        <input
          type="text"
          value={personalInfo.title}
          onChange={(e) => updateField('personalInfo', 'title', e.target.value)}
          className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          placeholder="Full Stack Developer"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
        <textarea
          value={personalInfo.bio}
          onChange={(e) => updateField('personalInfo', 'bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={handleEmailChange}
            className={`w-full px-4 py-2.5 border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-slate-600'} bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 dark:text-red-400">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => updateField('personalInfo', 'phone', e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
        <input
          type="text"
          value={personalInfo.location}
          onChange={(e) => updateField('personalInfo', 'location', e.target.value)}
          className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          placeholder="San Francisco, CA"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
