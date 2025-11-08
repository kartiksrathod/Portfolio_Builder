import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, ExternalLink, Calendar, Briefcase, Code2, Terminal } from 'lucide-react';

const TechPortfolioTemplate = ({ data, theme = 'light' }) => {
  const { hero, about, skills, projects, experience, education, certifications, contact } = data;

  // Theme-based color schemes
  const themeStyles = {
    light: {
      bg: 'bg-slate-50',
      cardBg: 'bg-white',
      text: 'text-slate-900',
      textSecondary: 'text-slate-600',
      border: 'border-slate-200',
      accent: 'bg-blue-600',
      accentText: 'text-blue-600',
      codeBlock: 'bg-slate-100'
    },
    dark: {
      bg: 'bg-slate-900',
      cardBg: 'bg-slate-800',
      text: 'text-white',
      textSecondary: 'text-slate-300',
      border: 'border-slate-700',
      accent: 'bg-blue-500',
      accentText: 'text-blue-400',
      codeBlock: 'bg-slate-900/50'
    },
    creative: {
      bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
      cardBg: 'bg-slate-800/50 backdrop-blur',
      text: 'text-white',
      textSecondary: 'text-slate-200',
      border: 'border-purple-500/30',
      accent: 'bg-gradient-to-r from-purple-600 to-blue-600',
      accentText: 'text-purple-400',
      codeBlock: 'bg-slate-900/80'
    }
  };

  const t = themeStyles[theme] || themeStyles.light;

  return (
    <div className={`min-h-screen ${t.bg} font-mono`}>
      {/* Hero Section with Terminal Style */}
      <section className={`${t.cardBg} border-b-4 ${t.border} py-20`}>
        <div className=\"max-w-5xl mx-auto px-8\">
          <div className=\"flex items-center gap-8\">
            {hero.photo && (
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={hero.photo}
                alt={hero.fullName}
                className=\"w-32 h-32 rounded-lg border-4 border-green-500 object-cover shadow-lg\"
              />
            )}
            <div className=\"flex-1\">
              <div className={`${t.codeBlock} p-4 rounded-lg border ${t.border} mb-4`}>
                <p className=\"text-green-500 text-sm mb-1\">$ whoami</p>
                <h1 className={`text-4xl font-bold ${t.text} mb-2`}>{hero.fullName}</h1>
              </div>
              <div className={`${t.codeBlock} p-4 rounded-lg border ${t.border} mb-4`}>
                <p className=\"text-green-500 text-sm mb-1\">$ cat role.txt</p>
                <p className={`text-xl ${t.accentText} font-semibold`}>{hero.tagline}</p>
              </div>
              <div className={`${t.codeBlock} p-4 rounded-lg border ${t.border}`}>
                <p className=\"text-green-500 text-sm mb-1\">$ echo $BIO</p>
                <p className={t.textSecondary}>{hero.shortBio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {about && about.story && (
        <section className=\"py-16\">
          <div className=\"max-w-5xl mx-auto px-8\">
            <div className={`${t.cardBg} border ${t.border} rounded-lg p-8`}>
              <h2 className={`text-3xl font-bold ${t.text} mb-2 flex items-center gap-2`}>
                <Terminal className={`w-8 h-8 ${t.accentText}`} />
                {about.headline}
              </h2>
              <div className=\"h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mb-6\"></div>
              <p className={`${t.textSecondary} text-lg leading-relaxed whitespace-pre-wrap`}>{about.story}</p>
              
              {about.strengths && about.strengths.length > 0 && (
                <div className=\"grid grid-cols-3 gap-4 mt-8\">
                  {about.strengths.map((strength) => (
                    <div key={strength.id} className={`${t.codeBlock} p-4 rounded-lg border ${t.border}`}>
                      <h3 className={`font-bold ${t.text} mb-1`}>{strength.title}</h3>
                      <p className={`text-sm ${t.textSecondary}`}>{strength.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section className=\"py-16\">
          <div className=\"max-w-5xl mx-auto px-8\">
            <h2 className={`text-3xl font-bold ${t.text} mb-2 flex items-center gap-2`}>
              <Code2 className={`w-8 h-8 ${t.accentText}`} />
              Technical Skills
            </h2>
            <div className=\"h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mb-8\"></div>
            
            <div className=\"grid grid-cols-2 md:grid-cols-3 gap-4\">
              {skills.map((skill) => (
                <div key={skill.id} className={`${t.cardBg} border ${t.border} rounded-lg p-4`}>
                  <div className=\"flex items-center justify-between mb-2\">
                    <span className={`font-semibold ${t.text}`}>{skill.name}</span>
                    <span className={`text-sm ${t.accentText} font-mono`}>{skill.level}%</span>
                  </div>
                  <div className=\"h-2 bg-slate-700 rounded-full overflow-hidden\">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full ${t.accent} rounded-full`}
                    />
                  </div>
                  {skill.category && (
                    <span className={`text-xs ${t.textSecondary} mt-1 block`}>{skill.category}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className={`${t.cardBg} py-16`}>
          <div className=\"max-w-5xl mx-auto px-8\">
            <h2 className={`text-3xl font-bold ${t.text} mb-2`}>Featured Projects</h2>
            <div className=\"h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mb-8\"></div>
            
            <div className=\"space-y-8\">
              {projects.filter(p => p.featured).concat(projects.filter(p => !p.featured)).map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`border-2 ${t.border} rounded-lg overflow-hidden hover:border-green-500 transition-colors`}
                >
                  {project.images && project.images.length > 0 && (
                    <div className=\"relative h-64 bg-slate-800\">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className=\"w-full h-full object-cover\"
                      />
                      {project.featured && (
                        <div className=\"absolute top-4 right-4 bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold\">
                          FEATURED
                        </div>
                      )}
                    </div>
                  )}
                  <div className=\"p-6\">
                    <h3 className={`text-2xl font-bold ${t.text} mb-2`}>{project.title}</h3>
                    <p className={`${t.textSecondary} mb-4`}>{project.description}</p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className=\"flex flex-wrap gap-2 mb-4\">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className={`${t.codeBlock} px-3 py-1 rounded-full text-sm ${t.text} border ${t.border}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className=\"flex gap-3\">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target=\"_blank\"
                          rel=\"noopener noreferrer\"
                          className={`flex items-center gap-2 ${t.accentText} hover:underline`}
                        >
                          <Github className=\"w-5 h-5\" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target=\"_blank\"
                          rel=\"noopener noreferrer\"
                          className={`flex items-center gap-2 ${t.accentText} hover:underline`}
                        >
                          <ExternalLink className=\"w-5 h-5\" />
                          <span>Live Demo</span>
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
        <section className=\"py-16\">
          <div className=\"max-w-5xl mx-auto px-8\">
            <h2 className={`text-3xl font-bold ${t.text} mb-2 flex items-center gap-2`}>
              <Briefcase className={`w-8 h-8 ${t.accentText}`} />
              Experience
            </h2>
            <div className=\"h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mb-8\"></div>
            
            <div className=\"space-y-6\">
              {experience.map((exp, idx) => (
                <div key={exp.id} className={`${t.cardBg} border-l-4 border-green-500 ${t.border} rounded-r-lg p-6`}>
                  <div className=\"flex items-start justify-between mb-2\">
                    <div>
                      <h3 className={`text-xl font-bold ${t.text}`}>{exp.jobTitle}</h3>
                      <p className={t.accentText}>{exp.company}</p>
                    </div>
                    <span className={`${t.codeBlock} px-3 py-1 rounded border ${t.border} ${t.textSecondary} text-sm whitespace-nowrap`}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <p className={`${t.textSecondary} text-sm mb-3`}>{exp.location}</p>
                  )}
                  <p className={`${t.textSecondary} mb-3`}>{exp.description}</p>
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className=\"space-y-1\">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className={`${t.textSecondary} text-sm flex items-start gap-2`}>
                          <span className=\"text-green-500 mt-1\">▹</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      <section className={`${t.cardBg} py-16`}>
        <div className=\"max-w-5xl mx-auto px-8\">
          <div className=\"grid md:grid-cols-2 gap-8\">
            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <h2 className={`text-2xl font-bold ${t.text} mb-6`}>Education</h2>
                <div className=\"space-y-4\">
                  {education.map((edu) => (
                    <div key={edu.id} className={`border ${t.border} rounded-lg p-4`}>
                      <h3 className={`font-bold ${t.text}`}>{edu.degree}</h3>
                      <p className={t.accentText}>{edu.school}</p>
                      <p className={`${t.textSecondary} text-sm`}>{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div>
                <h2 className={`text-2xl font-bold ${t.text} mb-6`}>Certifications</h2>
                <div className=\"space-y-4\">
                  {certifications.map((cert) => (
                    <div key={cert.id} className={`border ${t.border} rounded-lg p-4`}>
                      <h3 className={`font-bold ${t.text}`}>{cert.name}</h3>
                      <p className={t.accentText}>{cert.issuer}</p>
                      <p className={`${t.textSecondary} text-sm`}>{cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {contact && (
        <section className=\"py-16\">
          <div className=\"max-w-5xl mx-auto px-8 text-center\">
            <h2 className={`text-3xl font-bold ${t.text} mb-4`}>Get In Touch</h2>
            <div className=\"h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6\"></div>
            <p className={`${t.textSecondary} text-lg mb-8 max-w-2xl mx-auto`}>{contact.message}</p>
            
            <div className=\"flex justify-center gap-6 mb-8\">
              {contact.github && (
                <a href={contact.github} target=\"_blank\" rel=\"noopener noreferrer\" className={`${t.accentText} hover:scale-110 transition-transform`}>
                  <Github className=\"w-8 h-8\" />
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target=\"_blank\" rel=\"noopener noreferrer\" className={`${t.accentText} hover:scale-110 transition-transform`}>
                  <Linkedin className=\"w-8 h-8\" />
                </a>
              )}
              {contact.twitter && (
                <a href={contact.twitter} target=\"_blank\" rel=\"noopener noreferrer\" className={`${t.accentText} hover:scale-110 transition-transform`}>
                  <Twitter className=\"w-8 h-8\" />
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target=\"_blank\" rel=\"noopener noreferrer\" className={`${t.accentText} hover:scale-110 transition-transform`}>
                  <Globe className=\"w-8 h-8\" />
                </a>
              )}
            </div>
            
            <div className={`${t.cardBg} border ${t.border} rounded-lg p-6 inline-block`}>
              {contact.email && (
                <div className={`flex items-center gap-2 ${t.text} mb-2`}>
                  <Mail className=\"w-5 h-5\" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className={`flex items-center gap-2 ${t.text} mb-2`}>
                  <Phone className=\"w-5 h-5\" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.location && (
                <div className={`flex items-center gap-2 ${t.text}`}>
                  <MapPin className=\"w-5 h-5\" />
                  <span>{contact.location}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default React.memo(TechPortfolioTemplate);
