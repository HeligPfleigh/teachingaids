import XLSX from 'xlsx';

export const getDataFromExcel = (filePath, sheetName) => {
  const workbook = XLSX.readFile(filePath);
  const ws = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(ws);
};
