'use client';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import Schedule from '@/features/schedule/components/schedule';

export default function SchedulePage() {
  const exportToPDF = async (tableIds: string[]) => {
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF('l', 'mm', 'a4');

    for (let i = 0; i < tableIds.length; i += 1) {
      const input = document.getElementById(tableIds[i]);
      if (!input) return;
      // eslint-disable-next-line no-await-in-loop
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      if (i < tableIds.length - 1) {
        pdf.addPage();
      }
    }
    pdf.save('table.pdf');

    // const input = document.getElementById(tableIds);
    // if (!input) return;
    // const canvas = await html2canvas(input);
    // // eslint-disable-next-line new-cap
    // const pdf = new jsPDF('l', 'mm', 'a4');
    // const imgData = canvas.toDataURL('image/png');

    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = pdf.internal.pageSize.getHeight();

    // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => exportToPDF(['first-half-month', 'last-half-month'])}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        匯出表格為PDF
      </button>
      <Schedule />
    </div>
  );
}
