'use client';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Schedule from '@/features/schedule/components/schedule';

export default function SchedulePage() {
  const exportToPDF = async (tableId: string) => {
    const input = document.getElementById(tableId);
    if (!input) return;
    const canvas = await html2canvas(input);
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('table.pdf');
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => exportToPDF('table-to-export')}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        匯出表格為PDF
      </button>
      <Schedule />
    </div>
  );
}
