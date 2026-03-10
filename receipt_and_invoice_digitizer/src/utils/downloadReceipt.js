import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadReceipt = async () => {
  const element = document.getElementById("receipt-content");

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const width = 190;
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, "PNG", 10, 10, width, height);
  pdf.save("digitized_receipt.pdf");
};