import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Github } from 'lucide-react';

const MinimalTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, contact } = data;

  return (
    <div className="bg-white min-h-full" id="portfolio-preview">
      {/* Header Section */}
      <div className="border-b border-slate-200 pb-8 mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">{personalInfo.fullName}</h1>
        <p className="text-xl text-blue-600 mb-4">{personalInfo.title}</p>
        <p className="text-slate-600 max-w-2xl">{personalInfo.bio}</p>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Experience Section */}
      {experience.length > 0 && experience[0].jobTitle && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-900">{exp.jobTitle}</h3>
                  <span className="text-sm text-slate-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-blue-600">{exp.company}</p>
                <p className="text-slate-600 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && education[0].degree && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                  <span className="text-sm text-slate-600">{edu.year}</span>
                </div>
                <p className="text-blue-600">{edu.school}</p>
                {edu.description && <p className="text-slate-600 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Skills</h2>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                  <span className="text-sm text-slate-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && projects[0].title && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="space-y-2">
                <h3 className="font-semibold text-slate-900">{project.title}</h3>
                <p className="text-slate-600 text-sm">{project.description}</p>
                <p className="text-sm text-slate-500"><strong>Technologies:</strong> {project.technologies}</p>
                <div className="flex gap-3 text-sm">
                  {project.githubLink && (
                    <a href={project.githubLink} className="text-blue-600 hover:underline flex items-center gap-1">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} className="text-blue-600 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Connect</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          {contact.github && (
            <a href={contact.github} className="text-blue-600 hover:underline">GitHub</a>
          )}
          {contact.linkedin && (
            <a href={contact.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>
          )}
          {contact.twitter && (
            <a href={contact.twitter} className="text-blue-600 hover:underline">Twitter</a>
          )}
          {contact.website && (
            <a href={contact.website} className="text-blue-600 hover:underline">Website</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;