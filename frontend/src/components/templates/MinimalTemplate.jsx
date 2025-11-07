import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Github } from 'lucide-react';

const MinimalTemplate = React.memo(({ data }) => {
  const { personalInfo, experience, education, skills, projects, contact, certifications = [] } = data;

  return (
    <div className="bg-white min-h-full p-8 transition-colors duration-300" id="portfolio-preview">
      {/* Header Section */}
      <div className="border-b-2 border-slate-200 pb-8 mb-8 animate-fade-in">
        <div className="flex items-start gap-6 mb-6">
          {/* Photo */}
          {personalInfo.photo && (
            <img 
              src={personalInfo.photo} 
              alt={personalInfo.fullName}
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 flex-shrink-0"
            />
          )}
          
          {/* Header Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{personalInfo.fullName}</h1>
            <p className="text-xl text-slate-600 mb-4">{personalInfo.title}</p>
            <p className="text-slate-700 mb-6 max-w-3xl">{personalInfo.bio}</p>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Experience */}
      {experience.length > 0 && experience[0].jobTitle && (
        <div className="mb-8 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="hover:bg-slate-50 p-4 -mx-4 rounded-lg transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 text-lg">{exp.jobTitle}</h3>
                  <span className="text-sm text-slate-500 whitespace-nowrap ml-4">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-slate-700 font-medium mb-2">{exp.company}</p>
                <p className="text-slate-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education[0].degree && (
        <div className="mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="hover:bg-slate-50 p-4 -mx-4 rounded-lg transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                  <span className="text-sm text-slate-500">{edu.year}</span>
                </div>
                <p className="text-slate-700 font-medium mb-1">{edu.school}</p>
                {edu.description && <p className="text-slate-600 text-sm">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && projects[0].title && (
        <div className="mb-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Projects</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="border-l-4 border-slate-300 pl-6 hover:border-slate-500 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.split(',').map((tech, idx) => (
                    <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  {project.githubLink && (
                    <a href={project.githubLink} className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 transition-colors">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 transition-colors">
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

      {/* Certifications & Awards */}
      {certifications.length > 0 && certifications[0].name && (
        <div className="mb-8 animate-fade-in" style={{animationDelay: '0.45s'}}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Certifications & Awards</h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="hover:bg-slate-50 p-4 -mx-4 rounded-lg transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900">{cert.name}</h3>
                  {cert.date && <span className="text-sm text-slate-500 whitespace-nowrap ml-4">{cert.date}</span>}
                </div>
                <p className="text-slate-700 font-medium mb-1">{cert.issuer}</p>
                {cert.description && <p className="text-slate-600 text-sm mb-2">{cert.description}</p>}
                {cert.credentialId && (
                  <p className="text-xs text-slate-500">Credential ID: {cert.credentialId}</p>
                )}
                {cert.url && (
                  <a href={cert.url} className="text-sm text-slate-600 hover:text-slate-900 font-medium hover:underline transition-colors inline-flex items-center gap-1 mt-2">
                    <ExternalLink className="w-3 h-3" />
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Links */}
      {(contact.github || contact.linkedin || contact.twitter || contact.website) && (
        <div className="border-t-2 border-slate-200 pt-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Connect</h2>
          <div className="flex flex-wrap gap-4">
            {contact.github && (
              <a href={contact.github} className="text-slate-600 hover:text-slate-900 font-medium hover:underline transition-colors">GitHub</a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} className="text-slate-600 hover:text-slate-900 font-medium hover:underline transition-colors">LinkedIn</a>
            )}
            {contact.twitter && (
              <a href={contact.twitter} className="text-slate-600 hover:text-slate-900 font-medium hover:underline transition-colors">Twitter</a>
            )}
            {contact.website && (
              <a href={contact.website} className="text-slate-600 hover:text-slate-900 font-medium hover:underline transition-colors">Website</a>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

MinimalTemplate.displayName = 'MinimalTemplate';

export default MinimalTemplate;
