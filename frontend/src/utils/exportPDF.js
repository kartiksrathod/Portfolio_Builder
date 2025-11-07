import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId = 'portfolio-preview', filename = 'portfolio.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Portfolio preview element not found');
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate PDF dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    // Save PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return false;
  }
};

export default exportToPDF;