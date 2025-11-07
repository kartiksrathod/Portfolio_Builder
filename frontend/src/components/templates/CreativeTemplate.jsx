import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Twitter, Globe, Briefcase, GraduationCap } from 'lucide-react';

const CreativeTemplate = React.memo(({ data }) => {
  const { personalInfo, experience, education, skills, projects, contact } = data;

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 min-h-full p-8" id="portfolio-preview">
      {/* Creative Header with Gradient */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10"></div>
        <div className="relative p-8 rounded-3xl border-2 border-blue-200">
          <div className="flex items-start gap-6">
            {/* Avatar Circle */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {personalInfo.fullName.charAt(0)}
              </div>
            </div>
            
            {/* Header Content */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {personalInfo.fullName}
              </h1>
              <p className="text-xl text-slate-700 font-medium mb-3">{personalInfo.title}</p>
              <p className="text-slate-600 mb-4 max-w-2xl">{personalInfo.bio}</p>
              
              {/* Contact Info Row */}
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                {personalInfo.email && (
                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                    <Mail className="w-3 h-3" />
                    {personalInfo.email}
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                    <Phone className="w-3 h-3" />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    {personalInfo.location}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Experience & Education */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          {experience.length > 0 && experience[0].jobTitle && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Experience</h2>
              </div>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900 text-lg">{exp.jobTitle}</h3>
                        <span className="text-sm text-slate-500 font-medium">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && education[0].degree && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Education</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <span className="text-sm text-slate-500 font-medium">{edu.year}</span>
                    </div>
                    <p className="text-purple-600 font-medium mb-1">{edu.school}</p>
                    {edu.description && <p className="text-slate-600 text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && projects[0].title && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Projects</h2>
              <div className="grid gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{project.title}</h3>
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.split(',').map((tech, idx) => (
                        <span key={idx} className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 text-sm">
                      {project.githubLink && (
                        <a href={project.githubLink} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
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
        </div>

        {/* Right Column - Skills & Contact */}
        <div className="space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Skills</h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">{skill.name}</span>
                      <span className="text-sm font-bold text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connect/Social Links */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
            <div className="space-y-3">
              {contact.github && (
                <a href={contact.github} className="flex items-center gap-3 text-white hover:text-blue-100 transition-colors group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <span className="font-medium">GitHub</span>
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} className="flex items-center gap-3 text-white hover:text-blue-100 transition-colors group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}
              {contact.twitter && (
                <a href={contact.twitter} className="flex items-center gap-3 text-white hover:text-blue-100 transition-colors group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Twitter</span>
                </a>
              )}
              {contact.website && (
                <a href={contact.website} className="flex items-center gap-3 text-white hover:text-blue-100 transition-colors group">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
