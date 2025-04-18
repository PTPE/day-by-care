import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default async function downloadPdf(ids: string[]) {
  // eslint-disable-next-line new-cap
  const pdf = new jsPDF('l', 'mm', 'a4');

  for (let i = 0; i < ids.length; i += 1) {
    const input = document.getElementById(ids[i]);
    if (!input) return;

    // eslint-disable-next-line no-await-in-loop
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    const imgProps = {
      width: canvas.width,
      height: canvas.height,
    };

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(
      pdfWidth / imgProps.width,
      pdfHeight / imgProps.height
    );

    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

    if (i < ids.length - 1) {
      pdf.addPage();
    }
  }

  pdf.save('table.pdf');
}
