import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Camera, X } from 'lucide-react';
import { toast } from '../../hooks/use-toast';

const HeroSection = () => {
  const { portfolioData, updateField } = usePortfolio();
  const { hero } = portfolioData;
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image under 5MB',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      updateField('hero', 'photo', reader.result);
      setUploading(false);
      toast({
        title: 'Photo uploaded',
        description: 'Your profile photo has been updated'
      });
    };
    reader.onerror = () => {
      setUploading(false);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your photo',
        variant: 'destructive'
      });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    updateField('hero', 'photo', '');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Hero Section</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          This is the first impression visitors get. Make it count!
        </p>
      </div>

      {/* Profile Photo */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          {hero.photo ? (
            <div className="relative group">
              <img
                src={hero.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Camera className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : hero.photo ? 'Change Photo' : 'Upload Photo'}
          </Button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Recommended: Square image, at least 400x400px, max 5MB
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Full Name *
        </label>
        <Input
          value={hero.fullName}
          onChange={(e) => updateField('hero', 'fullName', e.target.value)}
          placeholder="John Doe"
          className="bg-white dark:bg-slate-800"
        />
      </div>

      {/* Tagline */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Tagline *
        </label>
        <Input
          value={hero.tagline}
          onChange={(e) => updateField('hero', 'tagline', e.target.value)}
          placeholder="Full Stack Developer & Creative Problem Solver"
          className="bg-white dark:bg-slate-800"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          A catchy one-liner that describes what you do
        </p>
      </div>

      {/* Short Bio */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Short Bio *
        </label>
        <Textarea
          value={hero.shortBio}
          onChange={(e) => updateField('hero', 'shortBio', e.target.value)}
          placeholder="Building innovative web experiences that make a difference"
          rows={2}
          className="bg-white dark:bg-slate-800 resize-none"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Keep it short and impactful (1-2 sentences)
        </p>
      </div>
    </div>
  );
};

export default HeroSection;