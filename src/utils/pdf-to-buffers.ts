import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default async function pdfToBuffer(
  ids: string[],
  orientation: 'l' | 'p' = 'l'
): Promise<string | null> {
  // eslint-disable-next-line new-cap
  const pdf = new jsPDF(orientation, 'mm', 'a4');

  for (let i = 0; i < ids.length; i += 1) {
    const input = document.getElementById(ids[i]);
    if (!input) return null;

    // eslint-disable-next-line no-await-in-loop
    const canvas = await html2canvas(input, { scale: 0.7 });
    const imgData = canvas.toDataURL('image/jpeg', 0.7);

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

  const base64 = pdf.output('datauristring').split(',')[1];

  return base64;
}
