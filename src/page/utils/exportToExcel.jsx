// src/utils/exportToExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data) => {
  // Convert data array of objects to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rekapitulasi");

  // Write workbook and generate binary string
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Save file
  try {
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "rekapitulasi.xlsx"
    );
  } catch (e) {
    console.error(e);
  }
};
