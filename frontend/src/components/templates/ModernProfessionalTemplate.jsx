import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, ExternalLink, ChevronRight, Award, Briefcase } from 'lucide-react';

const ModernProfessionalTemplate = ({ data, theme = 'light' }) => {
  const { hero, about, skills, projects, experience, education, certifications, contact } = data;

  const themeStyles = {
    light: {
      bg: 'bg-white',
      sectionBg: 'bg-slate-50',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-600',
      border: 'border-slate-200',
      accent: 'text-indigo-600',
      accentBg: 'bg-indigo-600',
      skillBg: 'bg-indigo-100',
      skillBar: 'bg-indigo-600'
    },
    dark: {
      bg: 'bg-slate-900',
      sectionBg: 'bg-slate-800',
      cardBg: 'bg-slate-800',
      text: 'text-white',
      textSecondary: 'text-slate-300',
      border: 'border-slate-700',
      accent: 'text-indigo-400',
      accentBg: 'bg-indigo-500',
      skillBg: 'bg-slate-700',
      skillBar: 'bg-indigo-500'
    },
    creative: {
      bg: 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50',
      sectionBg: 'bg-white/80 backdrop-blur',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-700',
      border: 'border-indigo-200',
      accent: 'text-indigo-600',
      accentBg: 'bg-gradient-to-r from-indigo-600 to-purple-600',
      skillBg: 'bg-gradient-to-r from-indigo-100 to-purple-100',
      skillBar: 'bg-gradient-to-r from-indigo-600 to-purple-600'
    }
  };

  const t = themeStyles[theme] || themeStyles.light;

  return (
    <div className={`min-h-screen ${t.bg}`}>
      {/* Hero Section - Split Design */}
      <section className={`${t.sectionBg} py-24`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {hero.photo && (
                <img
                  src={hero.photo}
                  alt={hero.fullName}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border-8 border-white object-cover"
                />
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className={`text-5xl md:text-6xl font-bold ${t.text} mb-4 leading-tight`}>
                {hero.fullName}
              </h1>
              <p className={`text-2xl ${t.accent} font-semibold mb-6`}>{hero.tagline}</p>
              <p className={`text-lg ${t.textSecondary} mb-8 leading-relaxed`}>{hero.shortBio}</p>
              <div className="flex gap-4">
                {contact && contact.github && (
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className={`${t.accentBg} text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-semibold`}>
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                )}
                {contact && contact.linkedin && (
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={`border-2 ${t.border} ${t.text} px-6 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 font-semibold`}>
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {about && about.story && (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl font-bold ${t.text} mb-8`}>{about.headline}</h2>
              <div className={`w-20 h-1 ${t.accentBg} mb-8`}></div>
              <p className={`${t.textSecondary} text-lg leading-relaxed mb-10`}>{about.story}</p>
              
              {about.strengths && about.strengths.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6">
                  {about.strengths.map((strength, idx) => (
                    <motion.div
                      key={strength.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={`${t.cardBg} border ${t.border} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow`}
                    >
                      <div className={`w-12 h-12 ${t.accentBg} rounded-lg flex items-center justify-center mb-4`}>
                        <ChevronRight className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`font-bold ${t.text} text-lg mb-2`}>{strength.title}</h3>
                      <p className={`${t.textSecondary} text-sm`}>{strength.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Section - Professional Bars */}
      {skills && skills.length > 0 && (
        <section className={`${t.sectionBg} py-20`}>
          <div className="max-w-5xl mx-auto px-8">
            <h2 className={`text-4xl font-bold ${t.text} mb-8`}>Professional Skills</h2>
            <div className={`w-20 h-1 ${t.accentBg} mb-12`}></div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${t.text} font-semibold`}>{skill.name}</span>
                    <span className={`${t.accent} font-bold`}>{skill.level}%</span>
                  </div>
                  <div className={`h-3 ${t.skillBg} rounded-full overflow-hidden`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.05 }}
                      className={`h-full ${t.skillBar} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className={`text-4xl font-bold ${t.text} mb-8`}>Featured Projects</h2>
            <div className={`w-20 h-1 ${t.accentBg} mb-12`}></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${t.cardBg} border ${t.border} rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group`}
                >
                  {project.images && project.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.featured && (
                        <div className={`absolute top-3 left-3 ${t.accentBg} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
                          <Award className="w-3 h-3" />
                          Featured
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold ${t.text} mb-2`}>{project.title}</h3>
                    <p className={`${t.textSecondary} text-sm mb-4 line-clamp-3`}>{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className={`${t.skillBg} ${t.text} px-2 py-1 rounded text-xs font-medium`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`${t.accent} hover:underline text-sm font-semibold flex items-center gap-1`}>
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`${t.accent} hover:underline text-sm font-semibold flex items-center gap-1`}>
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <section className={`${t.sectionBg} py-20`}>
          <div className="max-w-5xl mx-auto px-8">
            <h2 className={`text-4xl font-bold ${t.text} mb-8 flex items-center gap-3`}>
              <Briefcase className={`w-8 h-8 ${t.accent}`} />
              Professional Experience
            </h2>
            <div className={`w-20 h-1 ${t.accentBg} mb-12`}></div>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${t.cardBg} border-l-4 border-indigo-600 ${t.border} rounded-r-xl p-8 shadow-sm`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${t.text}`}>{exp.jobTitle}</h3>
                      <p className={`${t.accent} text-lg font-semibold`}>{exp.company}</p>
                      {exp.location && <p className={`${t.textSecondary} text-sm`}>{exp.location}</p>}
                    </div>
                    <span className={`${t.accentBg} text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap`}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className={`${t.textSecondary} mb-4`}>{exp.description}</p>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className={`${t.textSecondary} flex items-start gap-3`}>
                          <ChevronRight className={`w-5 h-5 ${t.accent} flex-shrink-0 mt-0.5`} />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contact && (
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl font-bold ${t.text} mb-6`}>Let's Connect</h2>
              <div className={`w-20 h-1 ${t.accentBg} mx-auto mb-8`}></div>
              <p className={`${t.textSecondary} text-xl mb-12 max-w-2xl mx-auto`}>{contact.message}</p>
              
              <div className="flex justify-center gap-6 mb-10">
                {contact.github && (
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className={`${t.cardBg} border ${t.border} p-4 rounded-xl hover:shadow-lg transition-shadow`}>
                    <Github className={`w-8 h-8 ${t.accent}`} />
                  </a>
                )}
                {contact.linkedin && (
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={`${t.cardBg} border ${t.border} p-4 rounded-xl hover:shadow-lg transition-shadow`}>
                    <Linkedin className={`w-8 h-8 ${t.accent}`} />
                  </a>
                )}
                {contact.twitter && (
                  <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className={`${t.cardBg} border ${t.border} p-4 rounded-xl hover:shadow-lg transition-shadow`}>
                    <Twitter className={`w-8 h-8 ${t.accent}`} />
                  </a>
                )}
                {contact.website && (
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className={`${t.cardBg} border ${t.border} p-4 rounded-xl hover:shadow-lg transition-shadow`}>
                    <Globe className={`w-8 h-8 ${t.accent}`} />
                  </a>
                )}
              </div>
              
              <div className={`${t.cardBg} border ${t.border} rounded-2xl p-8 inline-block shadow-lg`}>
                {contact.email && (
                  <div className={`flex items-center gap-3 ${t.text} mb-3 justify-center`}>
                    <Mail className={`w-6 h-6 ${t.accent}`} />
                    <span className="text-lg font-semibold">{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className={`flex items-center gap-3 ${t.textSecondary} mb-3 justify-center`}>
                    <Phone className="w-5 h-5" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.location && (
                  <div className={`flex items-center gap-3 ${t.textSecondary} justify-center`}>
                    <MapPin className="w-5 h-5" />
                    <span>{contact.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default React.memo(ModernProfessionalTemplate);