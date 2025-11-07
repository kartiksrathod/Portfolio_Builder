import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Enhanced PDF export with optimized settings and multi-page support
 * @param {string} elementId - ID of the element to export
 * @param {string} filename - Name of the PDF file
 * @param {function} onProgress - Optional callback for progress updates
 * @returns {Promise<boolean>} - Success status
 */
export const exportToPDF = async (
  elementId = 'portfolio-preview', 
  filename = 'portfolio.pdf',
  onProgress = null
) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Portfolio preview element not found');
    }

    // Report progress
    if (onProgress) onProgress(10);

    // Optimized canvas settings for better quality and performance
    const canvas = await html2canvas(element, {
      scale: 2, // High quality without being excessive
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      removeContainer: true,
      imageTimeout: 0,
      allowTaint: false,
      // Optimize rendering
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      // Fix gradient rendering issues by ensuring elements have proper dimensions
      onclone: (clonedDoc) => {
        // Find all gradient elements and ensure they have minimum width
        const gradientElements = clonedDoc.querySelectorAll('[class*="gradient"]');
        gradientElements.forEach(el => {
          const computedStyle = window.getComputedStyle(el);
          const width = parseFloat(computedStyle.width);
          const height = parseFloat(computedStyle.height);
          
          // Ensure minimum dimensions to prevent zero-width/height gradient errors
          if (width === 0 || isNaN(width)) {
            el.style.minWidth = '1px';
          }
          if (height === 0 || isNaN(height)) {
            el.style.minHeight = '1px';
          }
        });
      }
    });

    if (onProgress) onProgress(50);

    // Use JPEG for better compression while maintaining quality
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    // Calculate PDF dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true // Enable compression
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Calculate scaling to fit page width
    const ratio = pdfWidth / imgWidth;
    const scaledHeight = imgHeight * ratio;
    
    // Multi-page support for long portfolios
    let heightLeft = scaledHeight;
    let position = 0;
    let pageCount = 0;

    if (onProgress) onProgress(70);

    // Add pages as needed
    while (heightLeft > 0) {
      if (pageCount > 0) {
        pdf.addPage();
      }
      
      pdf.addImage(
        imgData, 
        'JPEG', 
        0, 
        position, 
        pdfWidth, 
        scaledHeight,
        undefined,
        'FAST' // Use fast compression
      );
      
      heightLeft -= pdfHeight;
      position -= pdfHeight;
      pageCount++;
    }

    if (onProgress) onProgress(90);
    
    // Save PDF
    pdf.save(filename);
    
    if (onProgress) onProgress(100);
    
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return false;
  }
};

/**
 * Quick export without progress tracking
 */
export const quickExportToPDF = async (elementId = 'portfolio-preview', filename = 'portfolio.pdf') => {
  return exportToPDF(elementId, filename, null);
};

export default exportToPDF;