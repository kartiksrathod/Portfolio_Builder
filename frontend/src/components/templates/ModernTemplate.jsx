import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe } from 'lucide-react';

const ModernTemplate = React.memo(({ data }) => {
  const { personalInfo, experience, education, skills, projects, contact } = data;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-full" id="portfolio-preview">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-xl mb-6">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-xl text-blue-400 mb-4">{personalInfo.title}</p>
        <p className="text-slate-300 max-w-2xl mb-4">{personalInfo.bio}</p>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1 text-slate-300">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1 text-slate-300">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Grid Layout for Sections */}
      <div className="space-y-6">
        {/* Experience Section */}
        {experience.length > 0 && experience[0].jobTitle && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded"></div>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-slate-900 text-lg">{exp.jobTitle}</h3>
                    <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                  <p className="text-slate-600 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm font-semibold text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full transition-all" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && education[0].degree && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                      <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">{edu.year}</span>
                    </div>
                    <p className="text-blue-600 font-medium">{edu.school}</p>
                    {edu.description && <p className="text-slate-600 text-sm mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects Section */}
        {projects.length > 0 && projects[0].title && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded"></div>
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-2">{project.description}</p>
                  <p className="text-sm mb-3">
                    <span className="text-slate-500">Tech:</span>{' '}
                    <span className="text-blue-600 font-medium">{project.technologies}</span>
                  </p>
                  <div className="flex gap-3 text-sm">
                    {project.githubLink && (
                      <a href={project.githubLink} className="text-blue-600 hover:underline flex items-center gap-1 font-medium">
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} className="text-blue-600 hover:underline flex items-center gap-1 font-medium">
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
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <div className="flex flex-wrap gap-4">
            {contact.github && (
              <a href={contact.github} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                <Github className="w-5 h-5" />
                GitHub
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            )}
            {contact.twitter && (
              <a href={contact.twitter} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
                Twitter
              </a>
            )}
            {contact.website && (
              <a href={contact.website} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                <Globe className="w-5 h-5" />
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';

export default ModernTemplate;