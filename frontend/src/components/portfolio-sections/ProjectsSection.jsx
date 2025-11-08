import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, Trash2, Image as ImageIcon, X, Star } from 'lucide-react';
import { toast } from '../../hooks/use-toast';

const ProjectsSection = () => {
  const { portfolioData, addArrayItem, updateArrayItem, removeArrayItem } = usePortfolio();
  const { projects } = portfolioData;
  const fileInputRefs = useRef({});

  const addProject = () => {
    addArrayItem('projects', {
      title: '',
      description: '',
      technologies: [],
      images: [],
      githubLink: '',
      liveLink: '',
      featured: false
    });
  };

  const updateProject = (id, field, value) => {
    updateArrayItem('projects', id, { [field]: value });
  };

  const removeProject = (id) => {
    removeArrayItem('projects', id);
  };

  const handleTechnologiesChange = (id, value) => {
    const techArray = value.split(',').map(t => t.trim()).filter(t => t);
    updateProject(id, 'technologies', techArray);
  };

  const handleImageUpload = (projectId, e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const project = projects.find(p => p.id === projectId);
    const currentImages = project.images || [];

    if (currentImages.length + files.length > 5) {
      toast({
        title: 'Too many images',
        description: 'You can upload maximum 5 images per project',
        variant: 'destructive'
      });
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `${file.name} is over 5MB`,
          variant: 'destructive'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateProject(projectId, 'images', [...currentImages, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (projectId, imageIndex) => {
    const project = projects.find(p => p.id === projectId);
    const updatedImages = project.images.filter((_, idx) => idx !== imageIndex);
    updateProject(projectId, 'images', updatedImages);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Projects</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Showcase your best work with images and detailed descriptions
        </p>
      </div>

      <Button onClick={addProject} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add New Project
      </Button>

      {projects.length > 0 ? (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="p-5 border-2 border-slate-200 dark:border-slate-700 rounded-lg space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Project #{index + 1}
                  </span>
                  <button
                    onClick={() => updateProject(project.id, 'featured', !project.featured)}
                    className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700"
                    title="Featured projects appear first"
                  >
                    <Star className={`w-4 h-4 ${project.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    {project.featured ? 'Featured' : 'Mark as Featured'}
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              {/* Project Images */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Project Images (Max 5)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {project.images && project.images.map((img, imgIdx) => (
                    <div key={imgIdx} className="relative group aspect-square">
                      <img
                        src={img}
                        alt={`Project ${index + 1} - ${imgIdx + 1}`}
                        className="w-full h-full object-cover rounded border-2 border-slate-200 dark:border-slate-700"
                      />
                      <button
                        onClick={() => removeImage(project.id, imgIdx)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {(!project.images || project.images.length < 5) && (
                    <button
                      onClick={() => fileInputRefs.current[project.id]?.click()}
                      className="aspect-square border-2 border-dashed border-slate-300 dark:border-slate-600 rounded flex items-center justify-center hover:border-blue-500 transition-colors"
                    >
                      <ImageIcon className="w-6 h-6 text-slate-400" />
                    </button>
                  )}
                </div>
                <input
                  ref={el => fileInputRefs.current[project.id] = el}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(project.id, e)}
                  className="hidden"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Upload up to 5 images (max 5MB each). First image is used as thumbnail.
                </p>
              </div>

              {/* Project Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Project Title *
                </label>
                <Input
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  placeholder="E-Commerce Platform"
                  className="bg-white dark:bg-slate-800"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description *
                </label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe your project, the challenges you solved, and the impact it made..."
                  rows={4}
                  className="bg-white dark:bg-slate-800"
                />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Technologies Used
                </label>
                <Input
                  value={Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                  onChange={(e) => handleTechnologiesChange(project.id, e.target.value)}
                  placeholder="React, Node.js, MongoDB, Tailwind CSS"
                  className="bg-white dark:bg-slate-800"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Separate technologies with commas
                </p>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    GitHub Link
                  </label>
                  <Input
                    value={project.githubLink}
                    onChange={(e) => updateProject(project.id, 'githubLink', e.target.value)}
                    placeholder="https://github.com/..."
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Live Demo Link
                  </label>
                  <Input
                    value={project.liveLink}
                    onChange={(e) => updateProject(project.id, 'liveLink', e.target.value)}
                    placeholder="https://demo.example.com"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 mb-3">No projects added yet</p>
          <Button variant="outline" onClick={addProject}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;