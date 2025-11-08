import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Briefcase, GraduationCap, Code, FolderGit2, Mail, Camera, Palette, Award } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import ContactForm from './forms/ContactForm';
import PhotoUploadForm from './forms/PhotoUploadForm';
import ColorSchemeForm from './forms/ColorSchemeForm';
import CertificationsForm from './forms/CertificationsForm';

const FormSection = () => {
  const { currentStep, setCurrentStep } = usePortfolio();

  const sections = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'photo', label: 'Photo', icon: Camera },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'colors', label: 'Colors', icon: Palette }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="flex flex-wrap gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg w-full">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <TabsTrigger 
                key={section.id} 
                value={section.id}
                className="flex items-center justify-center gap-2 px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-slate-900 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all hover:bg-slate-200 dark:hover:bg-slate-700 min-w-[100px]"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="photo" className="mt-6">
          <PhotoUploadForm />
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

        <TabsContent value="certifications" className="mt-6">
          <CertificationsForm />
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <ContactForm />
        </TabsContent>

        <TabsContent value="colors" className="mt-6">
          <ColorSchemeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormSection;