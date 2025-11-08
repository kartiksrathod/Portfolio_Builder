import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, FileText, Code, Briefcase, GraduationCap, Award, Mail, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './portfolio-sections/HeroSection';
import AboutSection from './portfolio-sections/AboutSection';
import SkillsSection from './portfolio-sections/SkillsSection';
import ProjectsSection from './portfolio-sections/ProjectsSection';
import ExperienceSection from './portfolio-sections/ExperienceSection';
import EducationSection from './portfolio-sections/EducationSection';
import CertificationsSection from './portfolio-sections/CertificationsSection';
import ContactSection from './portfolio-sections/ContactSection';

const sections = [
  { id: 'hero', name: 'Hero', icon: User, component: HeroSection },
  { id: 'about', name: 'About Me', icon: FileText, component: AboutSection },
  { id: 'skills', name: 'Skills', icon: Code, component: SkillsSection },
  { id: 'projects', name: 'Projects', icon: Palette, component: ProjectsSection },
  { id: 'experience', name: 'Experience', icon: Briefcase, component: ExperienceSection },
  { id: 'education', name: 'Education', icon: GraduationCap, component: EducationSection },
  { id: 'certifications', name: 'Certifications', icon: Award, component: CertificationsSection },
  { id: 'contact', name: 'Contact', icon: Mail, component: ContactSection }
];

const PortfolioEditor = () => {
  const [openSections, setOpenSections] = useState(['hero']); // Hero open by default

  const toggleSection = (sectionId) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const Icon = section.icon;
        const Component = section.component;
        const isOpen = openSections.includes(section.id);

        return (
          <div
            key={section.id}
            className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isOpen 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`font-semibold text-base ${
                  isOpen 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {section.name}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </motion.div>
            </button>

            {/* Section Content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-5 border-t border-slate-200 dark:border-slate-700">
                    <Component />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioEditor;
