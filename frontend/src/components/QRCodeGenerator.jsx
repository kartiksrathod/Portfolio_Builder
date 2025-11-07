import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Button } from './ui/button';
import { QrCode, Download, X, Link2, User } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from '../hooks/use-toast';

const QRCodeGenerator = ({ isOpen, onClose }) => {
  const { portfolioData } = usePortfolio();
  const [qrType, setQrType] = useState('vcard'); // 'vcard' or 'url'
  const [portfolioUrl, setPortfolioUrl] = useState('');

  // Generate vCard data
  const generateVCard = () => {
    const { personalInfo, contact } = portfolioData;
    return `BEGIN:VCARD
VERSION:3.0
FN:${personalInfo.fullName}
TITLE:${personalInfo.title}
TEL:${personalInfo.phone}
EMAIL:${personalInfo.email}
ADR:;;${personalInfo.location};;;;
URL:${contact.website || ''}
NOTE:${personalInfo.bio}
END:VCARD`;
  };

  const getQRValue = () => {
    if (qrType === 'vcard') {
      return generateVCard();
    }
    return portfolioUrl || 'https://example.com/portfolio';
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-qr-${qrType}.png`;
        a.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "QR Code downloaded",
          description: "Your QR code has been saved successfully.",
        });
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                QR Code Generator
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Share your portfolio easily
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* QR Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              QR Code Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setQrType('vcard')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  qrType === 'vcard'
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Contact Card
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  vCard format
                </p>
              </button>
              <button
                onClick={() => setQrType('url')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  qrType === 'url'
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Portfolio URL
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Direct link
                </p>
              </button>
            </div>
          </div>

          {/* URL Input (only for URL type) */}
          {qrType === 'url' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Portfolio URL
              </label>
              <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter your hosted portfolio URL
              </p>
            </div>
          )}

          {/* QR Code Display */}
          <div className="flex flex-col items-center">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-lg border-2 border-slate-200 dark:border-slate-700 shadow-lg">
              <QRCodeSVG
                id="qr-code-svg"
                value={getQRValue()}
                size={200}
                level="H"
                includeMargin={true}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3 max-w-xs">
              {qrType === 'vcard' 
                ? 'Scan to add contact information to your phone'
                : 'Scan to visit the portfolio website'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={downloadQRCode}
              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-300 dark:border-slate-600"
            >
              Close
            </Button>
          </div>

          {/* Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-2">
              <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div className="text-sm text-blue-900 dark:text-blue-200">
                <p className="font-medium mb-1">Tip:</p>
                <p>Print this QR code on business cards or resumes for easy portfolio sharing!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
