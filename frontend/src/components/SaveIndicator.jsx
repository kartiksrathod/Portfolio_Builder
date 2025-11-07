import React from 'react';
import { Check, Cloud } from 'lucide-react';

const SaveIndicator = ({ isSaving, lastSaved }) => {
  if (!lastSaved && !isSaving) return null;

  const formatTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 5) return 'Just now';
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {isSaving ? (
        <>
          <Cloud className="w-4 h-4 text-slate-400 animate-pulse" />
          <span className="text-slate-600">Saving...</span>
        </>
      ) : (
        <>
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-slate-600">Saved {formatTime(lastSaved)}</span>
        </>
      )}
    </div>
  );
};

export default SaveIndicator;