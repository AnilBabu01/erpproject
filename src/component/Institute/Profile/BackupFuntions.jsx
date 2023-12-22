import exportFromJSON from "export-from-json";
import moment from "moment";
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const ExportFrontOffice = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `FrontOffice${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      Date: moment(item?.EnquiryDate).format("MM/DD/YYYY"),
      "Student Name": item?.StudentName,
      "Student Number": item?.StudentNumber,
      "Student Email": item?.StudentEmail,
      Address: item?.Address,
      Course: item?.Course,
      Comment: item?.Comment,
      "Created Date": moment(item?.created_at).format("DD-MM-YYYY"),
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportStudent = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `AllStudent${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      Addmission_Date: moment(item?.admissionDate).format("MM/DD/YYYY"),
      Session: item?.Session,
      Section: item?.Section,
      "Roll Number": item?.rollnumber,
      SNO: item?.SrNumber,
      Student_Name: item?.name,
      Student_Email: item?.email,
      "Student_Mobile NO": item?.phoneno1,
      "Father's_Name": item?.fathersName,
      "Father's_Mobile NO": item?.fathersPhoneNo,
      Class: item?.courseorclass,
      Category: item?.StudentCategory,
      Status: item?.Status,
      "Created Date": moment(item?.created_at).format("DD-MM-YYYY"),
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportBooks = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `BookList${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      BookId: item?.BookId,
      BookTitle: item?.BookTitle,
      auther: item?.auther,
      quantity: item?.quantity,
      "in library": item?.Realquantity,
      class: item?.courseorclass,
      "Add Date": moment(item?.created_at).format("DD-MM-YYYY"),
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportIssuedBooks = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `IssuedBooklist${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      Session: item?.Session,
      Section: item?.Section,
      SrNumber: item?.SrNumber,
      rollnumber: item?.rollnumber,
      courseorclass: item?.courseorclass,
      BookId: item?.BookId,
      BookTitle: item?.BookTitle,
      auther: item?.auther,
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportPaidFee = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `PaidFee${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      Session: item?.Session,
      Section: item?.Section,
      SrNumber: item?.SrNumber,
      paidfee: item?.paidfee,
      HostelPaidFee: item?.HostelPaidFee,
      TransportPaidFee: item?.TransportPaidFee,
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportPendingFee = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `PendingFee${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      Session: item?.Session,
      Section: item?.Section,
      SrNumber: item?.SrNumber,
      pendingfee: item?.pendingfee,
      HostelPendingFee: item?.HostelPendingFee,
      TransportPendingFee: item?.TransportPendingFee,
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportAllReceiptdata = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `AllReceiptdata${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      Session: item?.Session,
      Section: item?.Section,
      "SR Number": item?.SNO,
      RollNo: item?.RollNo,
      studentName: item?.studentName,
      fathername: item?.fathername,
      PaidAmount: item?.PaidAmount,
      PaidDate: moment(item?.PaidDate).format("DD-MM-YYYY"),
      ReceiptNo: item?.ReceiptNo,
      Feetype: item?.Feetype,
      RollNo: item?.RollNo,
      Course: item?.Course,
      PayOption: item?.PayOption,
      MonthName: monthNames[Number(item?.monthno)],
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportExpenses = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `Expenseslist${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      Session: item?.Session,
      Date: moment(item?.Date).format("DD-MM-YYYY"),
      Expensestype: item?.Expensestype,
      ExpensesAmount: item?.ExpensesAmount,
      PayOption: item?.PayOption,
      Comment: item?.Comment,
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportBuslist = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `Buslist${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      BusNumber: item?.BusNumber,
      Vahicletype: item?.Vahicletype,
      FualType: item?.FualType,
      Color: item?.Color,
      DriverId1: item?.DriverId1,
      DriverId2: item?.DriverId2,
      HelferId1: item?.HelferId1,
      HelferId2: item?.HelferId2,
      NoOfSheets: item?.NoOfSheets,
      "available sheets": item?.RealSheets,
      GPSDeviceURL: item?.GPSDeviceURL,
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportHostel = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `HostelList${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      HostelName: item?.HostelName,
      DescripTion: item?.DescripTion,
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportRoomCheckined = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `CheckinList${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      hostelname: item?.hostelname,
      Category: item?.Category,
      Facility: item?.Facility,
      RoomNo: item?.RoomNo,
      StudentName: item?.StudentName,
      StudentClass: item?.StudentClass,
      Session: item?.Session,
      Section: item?.Section,
      "Sr Number": item?.SNO,
      MobileNO: item?.MobileNO,
      CheckinDate: item?.CheckinDate,
    });
  });

  exportFromJSON({ data, fileName, exportType });
};

export const ExportRoomList = (isData) => {
  let newdate = new Date();
  let fullyear = newdate.getFullYear();
  let date = newdate.getDate();
  let month = newdate.getMonth();
  let fulldate = `${date}/${month}/${fullyear}`;
  const fileName = `RoolistInHostel${fulldate}`;
  const exportType = "xls";
  var data = [];

  isData.map((item, index) => {
    data.push({
      hostelname: item?.hostelname,
      Category: item?.Category,
      Facility: item?.Facility,
      FromRoom: item?.FromRoom,
      ToRoom: item?.ToRoom,
      "Per Month": item?.PermonthFee,
    });
  });

  exportFromJSON({ data, fileName, exportType });
};
