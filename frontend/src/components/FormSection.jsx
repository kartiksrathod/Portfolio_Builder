import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Briefcase, GraduationCap, Code, FolderGit2, Mail } from 'lucide-react';

const FormSection = () => {
  const { currentStep, setCurrentStep } = usePortfolio();

  const sections = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-slate-100 p-1 rounded-lg">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <TabsTrigger 
                key={section.id} 
                value={section.id}
                className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-slate-900 rounded-md transition-all"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="experience" className="mt-6">
          <ExperienceForm />
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <EducationForm />
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <SkillsForm />
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <ProjectsForm />
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <ContactForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Placeholder form components
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

const ExperienceForm = () => (
  <div className="text-center py-8 text-slate-500">
    <Briefcase className="w-12 h-12 mx-auto mb-4" />
    <p>Experience form coming in next phase</p>
  </div>
);

const EducationForm = () => (
  <div className="text-center py-8 text-slate-500">
    <GraduationCap className="w-12 h-12 mx-auto mb-4" />
    <p>Education form coming in next phase</p>
  </div>
);

const SkillsForm = () => (
  <div className="text-center py-8 text-slate-500">
    <Code className="w-12 h-12 mx-auto mb-4" />
    <p>Skills form coming in next phase</p>
  </div>
);

const ProjectsForm = () => (
  <div className="text-center py-8 text-slate-500">
    <FolderGit2 className="w-12 h-12 mx-auto mb-4" />
    <p>Projects form coming in next phase</p>
  </div>
);

const ContactForm = () => (
  <div className="text-center py-8 text-slate-500">
    <Mail className="w-12 h-12 mx-auto mb-4" />
    <p>Contact form coming in next phase</p>
  </div>
);

export default FormSection;