import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus, Trash2, Award } from 'lucide-react';

const CertificationsSection = () => {
  const { portfolioData, addArrayItem, updateArrayItem, removeArrayItem } = usePortfolio();
  const { certifications } = portfolioData;

  const addCertification = () => {
    addArrayItem('certifications', {
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      credentialUrl: '',
      description: ''
    });
  };

  const updateCertification = (id, field, value) => {
    updateArrayItem('certifications', id, { [field]: value });
  };

  const removeCertification = (id) => {
    removeArrayItem('certifications', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Certifications & Awards</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Professional certifications, awards, and recognitions (optional)
        </p>
      </div>

      <Button onClick={addCertification} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Certification
      </Button>

      {certifications.length > 0 ? (
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="p-5 border-2 border-slate-200 dark:border-slate-700 rounded-lg space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Certification #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertification(cert.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              {/* Certification Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Certification / Award Name *
                </label>
                <Input
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                  className="bg-white dark:bg-slate-800"
                />
              </div>

              {/* Issuer & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Issuer *
                  </label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Date
                  </label>
                  <Input
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    placeholder="2023"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Credential ID & URL */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Credential ID
                  </label>
                  <Input
                    value={cert.credentialId}
                    onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                    placeholder="AWS-12345"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Credential URL
                  </label>
                  <Input
                    value={cert.credentialUrl}
                    onChange={(e) => updateCertification(cert.id, 'credentialUrl', e.target.value)}
                    placeholder="https://verify.example.com"
                    className="bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <Textarea
                  value={cert.description}
                  onChange={(e) => updateCertification(cert.id, 'description', e.target.value)}
                  placeholder="Brief description of the certification..."
                  rows={2}
                  className="bg-white dark:bg-slate-800"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 mb-3">No certifications added yet</p>
          <Button variant="outline" onClick={addCertification}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Certification
          </Button>
        </div>
      )}
    </div>
  );
};

export default CertificationsSection;