import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Plus, Trash2, Award } from 'lucide-react';

const CertificationsForm = () => {
  const { portfolioData, updateArrayItem, addArrayItem, removeArrayItem } = usePortfolio();

  const handleAdd = () => {
    addArrayItem('certifications', {
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      url: '',
      description: ''
    });
  };

  const handleChange = (id, field, value) => {
    updateArrayItem('certifications', id, { [field]: value });
  };

  const handleRemove = (id) => {
    removeArrayItem('certifications', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Certifications & Awards
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Add your professional certifications, awards, and recognitions
          </p>
        </div>
        <Button
          onClick={handleAdd}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {portfolioData.certifications.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
          <Award className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            No certifications or awards added yet
          </p>
          <Button
            onClick={handleAdd}
            size="sm"
            variant="outline"
            className="mt-4 border-slate-300 dark:border-slate-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Certification
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {portfolioData.certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    Certification #{portfolioData.certifications.indexOf(cert) + 1}
                  </h4>
                </div>
                <Button
                  onClick={() => handleRemove(cert.id)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Certification/Award Name *
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
                    placeholder="e.g., AWS Certified Solutions Architect"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
                    placeholder="e.g., Amazon Web Services"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Date Issued
                  </label>
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => handleChange(cert.id, 'date', e.target.value)}
                    placeholder="e.g., June 2024"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => handleChange(cert.id, 'credentialId', e.target.value)}
                    placeholder="e.g., ABC123XYZ"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Credential URL
                  </label>
                  <input
                    type="url"
                    value={cert.url}
                    onChange={(e) => handleChange(cert.id, 'url', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={cert.description}
                    onChange={(e) => handleChange(cert.id, 'description', e.target.value)}
                    placeholder="Brief description of the certification or award..."
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
