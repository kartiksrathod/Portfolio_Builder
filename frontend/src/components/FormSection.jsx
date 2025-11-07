import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Briefcase, GraduationCap, Code, FolderGit2, Mail } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import ContactForm from './forms/ContactForm';

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
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 bg-slate-100 p-1 rounded-lg w-full overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <TabsTrigger 
                key={section.id} 
                value={section.id}
                className="flex items-center justify-center gap-1 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm rounded-md transition-all min-w-[60px] sm:min-w-0"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{section.label}</span>
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

export default FormSection;