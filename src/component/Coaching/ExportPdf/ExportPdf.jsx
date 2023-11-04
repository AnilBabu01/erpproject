import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import moment from "moment";
const ExportPdfEnquiry = (isData, fileName) => {
  const doc = new jsPDF();

  const tableColumn = [
    "date",
    "Name",
    "Number",
    "Email",
    "Address",
    "Course",
    "comment",
  ];

  const tableRows = [];

  isData.forEach((item) => {
    const ticketData = [
      moment(item?.EnquiryDate).format("MM/DD/YYYY"),
      item?.StudentName,
      item?.StudentNumber,
      item?.StudentEmail,
      item?.Address,
      item?.Course,
      item?.Comment,
    ];

    tableRows.push(ticketData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.text(`${fileName}`, 8, 9);
  doc.setFont("Lato-Regular", "normal");
  doc.setFontSize(28);
  doc.save(`${fileName}_${dateStr}.pdf`);
};



export { ExportPdfEnquiry };
