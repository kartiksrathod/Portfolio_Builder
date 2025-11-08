import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Globe, Mail, Phone, MapPin, ExternalLink, Sparkles, Heart, Zap } from 'lucide-react';

const CreativeShowcaseTemplate = ({ data, theme = 'light' }) => {
  const { hero, about, skills, projects, experience, education, certifications, contact } = data;

  const themeStyles = {
    light: {
      bg: 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50',
      cardBg: 'bg-white/80 backdrop-blur',
      text: 'text-slate-900',
      textSecondary: 'text-slate-700',
      accent: 'from-pink-500 to-purple-600',
      skillBg: 'bg-gradient-to-r from-pink-400 to-purple-500'
    },
    dark: {
      bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
      cardBg: 'bg-slate-800/60 backdrop-blur',
      text: 'text-white',
      textSecondary: 'text-slate-200',
      accent: 'from-pink-400 to-purple-500',
      skillBg: 'bg-gradient-to-r from-pink-500 to-purple-600'
    },
    creative: {
      bg: 'bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600',
      cardBg: 'bg-white/10 backdrop-blur',
      text: 'text-white',
      textSecondary: 'text-white/90',
      accent: 'from-yellow-300 to-pink-300',
      skillBg: 'bg-gradient-to-r from-yellow-400 to-pink-400'
    }
  };

  const t = themeStyles[theme] || themeStyles.light;

  return (
    <div className={`min-h-screen ${t.bg}`}>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {hero.photo && (
              <motion.img
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                src={hero.photo}
                alt={hero.fullName}
                className="w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover mx-auto mb-8"
              />
            )}
            <h1 className={`text-6xl font-black ${t.text} mb-4 bg-gradient-to-r ${t.accent} bg-clip-text text-transparent`}>
              {hero.fullName}
            </h1>
            <p className={`text-3xl ${t.textSecondary} font-light mb-6`}>{hero.tagline}</p>
            <p className={`text-xl ${t.textSecondary} max-w-2xl mx-auto`}>{hero.shortBio}</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      {about && about.story && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`${t.cardBg} rounded-3xl p-10 shadow-2xl`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className={`w-10 h-10 bg-gradient-to-r ${t.accent} bg-clip-text text-transparent`} style={{fill: 'currentColor'}} />
                <h2 className={`text-4xl font-black ${t.text}`}>{about.headline}</h2>
              </div>
              <p className={`${t.textSecondary} text-lg leading-relaxed mb-8`}>{about.story}</p>
              
              {about.strengths && about.strengths.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6">
                  {about.strengths.map((strength, idx) => (
                    <motion.div
                      key={strength.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/50 dark:bg-slate-900/50 rounded-2xl p-6 hover:scale-105 transition-transform"
                    >
                      <Heart className="w-8 h-8 text-pink-500 mb-3" />
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

      {/* Skills Section - Creative Circles */}
      {skills && skills.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h2 className={`text-4xl font-black ${t.text} mb-12`}>Skills & Expertise</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${t.cardBg} rounded-full px-8 py-4 shadow-lg border-2 border-white/20`}
                >
                  <span className={`${t.text} font-bold text-lg`}>{skill.name}</span>
                  <span className={`ml-3 bg-gradient-to-r ${t.accent} bg-clip-text text-transparent font-black`}>
                    {skill.level}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Gallery - Creative Grid */}
      {projects && projects.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className={`text-4xl font-black ${t.text} text-center mb-12`}>Creative Works</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ y: -10 }}
                  className={`${t.cardBg} rounded-3xl overflow-hidden shadow-2xl group`}
                >
                  {project.images && project.images.length > 0 && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Featured
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className={`text-2xl font-black ${t.text} mb-3`}>{project.title}</h3>
                    <p className={`${t.textSecondary} mb-4`}>{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className={`bg-gradient-to-r ${t.accent} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 bg-gradient-to-r ${t.accent} bg-clip-text text-transparent font-bold hover:scale-110 transition-transform`}>
                          <Github className="w-5 h-5" />
                          Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 bg-gradient-to-r ${t.accent} bg-clip-text text-transparent font-bold hover:scale-110 transition-transform`}>
                          <ExternalLink className="w-5 h-5" />
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

      {/* Experience Timeline - Creative */}
      {experience && experience.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className={`text-4xl font-black ${t.text} text-center mb-12`}>Journey</h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`${t.cardBg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${t.accent} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-black ${t.text} mb-1`}>{exp.jobTitle}</h3>
                      <p className={`bg-gradient-to-r ${t.accent} bg-clip-text text-transparent font-bold text-lg mb-2`}>{exp.company}</p>
                      <p className={`${t.textSecondary} text-sm mb-3`}>{exp.startDate} - {exp.endDate}</p>
                      <p className={`${t.textSecondary} mb-3`}>{exp.description}</p>
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="space-y-1">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className={`${t.textSecondary} text-sm flex items-start gap-2`}>
                              <span className="text-pink-500 text-xl">•</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contact && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`${t.cardBg} rounded-3xl p-12 shadow-2xl`}
            >
              <h2 className={`text-5xl font-black ${t.text} mb-6 bg-gradient-to-r ${t.accent} bg-clip-text text-transparent`}>
                Let's Create Together!
              </h2>
              <p className={`${t.textSecondary} text-xl mb-8`}>{contact.message}</p>
              
              <div className="flex justify-center gap-6 mb-8">
                {contact.github && (
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={contact.github} target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full bg-gradient-to-r ${t.accent} flex items-center justify-center text-white shadow-lg`}>
                    <Github className="w-7 h-7" />
                  </motion.a>
                )}
                {contact.linkedin && (
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full bg-gradient-to-r ${t.accent} flex items-center justify-center text-white shadow-lg`}>
                    <Linkedin className="w-7 h-7" />
                  </motion.a>
                )}
                {contact.twitter && (
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={contact.twitter} target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full bg-gradient-to-r ${t.accent} flex items-center justify-center text-white shadow-lg`}>
                    <Twitter className="w-7 h-7" />
                  </motion.a>
                )}
                {contact.website && (
                  <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={contact.website} target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full bg-gradient-to-r ${t.accent} flex items-center justify-center text-white shadow-lg`}>
                    <Globe className="w-7 h-7" />
                  </motion.a>
                )}
              </div>
              
              <div className="space-y-3">
                {contact.email && <p className={`${t.text} text-lg font-semibold`}>{contact.email}</p>}
                {contact.phone && <p className={t.textSecondary}>{contact.phone}</p>}
                {contact.location && <p className={t.textSecondary}>{contact.location}</p>}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default React.memo(CreativeShowcaseTemplate);