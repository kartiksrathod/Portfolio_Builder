import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe, Briefcase, GraduationCap, Code, FolderGit2 } from 'lucide-react';

const ProfessionalTemplate = React.memo(({ data }) => {
  const { personalInfo, experience, education, skills, projects, contact, certifications = [] } = data;

  return (
    <div className="bg-white min-h-full" id="portfolio-preview">
      {/* Header with Side Panel Layout */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Left Sidebar */}
        <div className="md:w-1/3 bg-slate-900 text-white p-6 rounded-lg">
          {/* Photo */}
          {personalInfo.photo && (
            <div className="mb-6 flex justify-center">
              <img 
                src={personalInfo.photo} 
                alt={personalInfo.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />
            </div>
          )}
          
          <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className="text-blue-400 text-lg mb-6">{personalInfo.title}</p>
          
          {/* Contact Info */}
          <div className="space-y-3 text-sm mb-6">
            {personalInfo.email && (
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {personalInfo.location}
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="border-t border-slate-700 pt-4">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Connect</h3>
            <div className="space-y-2">
              {contact.github && (
                <a href={contact.github} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              {contact.twitter && (
                <a href={contact.twitter} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              )}
              {contact.website && (
                <a href={contact.website} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </div>

          {/* Skills Sidebar */}
          {skills.length > 0 && (
            <div className="border-t border-slate-700 pt-4 mt-4">
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                <Code className="w-4 h-4" />
                Skills
              </h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="md:w-2/3 space-y-6">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded"></div>
              About
            </h2>
            <p className="text-slate-600 leading-relaxed">{personalInfo.bio}</p>
          </div>

          {/* Experience */}
          {experience.length > 0 && experience[0].jobTitle && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                <Briefcase className="w-5 h-5" />
                Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-slate-300 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-slate-900">{exp.jobTitle}</h3>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium text-sm mb-2">{exp.company}</p>
                    <p className="text-slate-600 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && education[0].degree && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                <GraduationCap className="w-5 h-5" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-slate-300 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{edu.year}</span>
                    </div>
                    <p className="text-blue-600 font-medium text-sm">{edu.school}</p>
                    {edu.description && <p className="text-slate-600 text-sm mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && projects[0].title && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                <FolderGit2 className="w-5 h-5" />
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border border-slate-200 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-slate-600 text-sm mb-2">{project.description}</p>
                    <p className="text-xs text-slate-500 mb-3">
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                    <div className="flex gap-3 text-xs">
                      {project.githubLink && (
                        <a href={project.githubLink} className="text-blue-600 hover:underline flex items-center gap-1">
                          <Github className="w-3 h-3" />
                          Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} className="text-blue-600 hover:underline flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Awards */}
          {certifications.length > 0 && certifications[0].name && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                Certifications & Awards
              </h2>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border-l-2 border-slate-300 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-slate-900">{cert.name}</h3>
                      {cert.date && (
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{cert.date}</span>
                      )}
                    </div>
                    <p className="text-blue-600 font-medium text-sm mb-1">{cert.issuer}</p>
                    {cert.description && <p className="text-slate-600 text-sm mb-2">{cert.description}</p>}
                    <div className="flex gap-3 text-xs">
                      {cert.credentialId && (
                        <span className="text-slate-500">ID: {cert.credentialId}</span>
                      )}
                      {cert.url && (
                        <a href={cert.url} className="text-blue-600 hover:underline flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          View Credential
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ProfessionalTemplate.displayName = 'ProfessionalTemplate';

export default ProfessionalTemplate;