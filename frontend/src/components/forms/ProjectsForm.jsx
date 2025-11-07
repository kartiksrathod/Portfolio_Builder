import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = () => {
  const { portfolioData, updateArrayItem, addArrayItem, removeArrayItem } = usePortfolio();
  const { projects } = portfolioData;

  const handleAddProject = () => {
    addArrayItem('projects', {
      title: '',
      description: '',
      technologies: '',
      githubLink: '',
      liveLink: ''
    });
  };

  const handleUpdateProject = (id, field, value) => {
    const item = projects.find(proj => proj.id === id);
    updateArrayItem('projects', id, { ...item, [field]: value });
  };

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={project.id} className="p-6 border border-slate-200 rounded-lg bg-slate-50 space-y-4 relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900">Project {index + 1}</h3>
            {projects.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeArrayItem('projects', project.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Project Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="E-Commerce Platform"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="Describe what this project does and your role..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Technologies Used</label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => handleUpdateProject(project.id, 'technologies', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">GitHub Link (Optional)</label>
                <input
                  type="url"
                  value={project.githubLink}
                  onChange={(e) => handleUpdateProject(project.id, 'githubLink', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Live Demo Link (Optional)</label>
                <input
                  type="url"
                  value={project.liveLink}
                  onChange={(e) => handleUpdateProject(project.id, 'liveLink', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        onClick={handleAddProject}
        variant="outline"
        className="w-full border-slate-300 hover:bg-slate-100"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};

export default ProjectsForm;