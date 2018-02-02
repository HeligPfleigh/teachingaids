import express from 'express';
import XLSX from 'xlsx';
import EquipmentModel from '../../data/models/equipment';
import EquipmentTypeModel from '../../data/models/equipment_type';
import { generateBarcode } from '../../utils/barcode.util';

const router = express.Router();

const getMaxSequenceNum = async () => {
  const allEquipment = await EquipmentModel.find();
  let maxSequenceNum = 0;
  if (allEquipment.length > 0) {
    maxSequenceNum = allEquipment
      .map(value => parseInt(value.sequenceNum, 10) || 0)
      .reduce((a, b) => Math.max(a, b));
  }
  return maxSequenceNum;
};

router.get('/excels', async (req, res) => {
  const equipmentStatus = 'MOI';
  const pathFile = 'src/server/excel_files/excel.xlsx';
  const workbook = XLSX.readFile(pathFile);
  try {
    let maxSequenceNum = await getMaxSequenceNum();
    workbook.SheetNames.map(async (sheetName) => {
      const ws = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws);
      return data.map(async (item) => {
        const equipmentTypeObj = {
          name: item.name,
          equipmentInfo: {
            madeFrom: item.madeFrom,
            grade: item.grade ? item.grade.split(',').map(g => parseInt(g, 10)) : null,
            khCode: item.khCode,
          },
          totalNumber: parseFloat(item.totalNumber) || 0,
          subject: item.subject,
          unit: item.unit,
          order: item.order,
          category: item.category,
        };
        await EquipmentTypeModel.create(equipmentTypeObj, async (error, equipmentType) => {
          if (error) {
            console.log(`EquipmentType ERRORRRR!: ${item.name} - ${error}`);
          }
          const equipmentArray = [];
          for (let i = 0; i < equipmentType.totalNumber; i++) {
            maxSequenceNum++;
            equipmentArray.push({
              barcode: generateBarcode(maxSequenceNum),
              sequenceNum: maxSequenceNum,
              equipmentTypeId: equipmentType.id,
              status: equipmentStatus,
            });
          }
          await EquipmentModel.insertMany(equipmentArray, (err) => {
            if (err) {
              console.log(`Equipment ERRORRRR!: ${item.name} - ${err}`);
            }
          });
        });
        // return `Successfully import ${item.name} with barcode ${item.name}`;
      });
    });
  } catch (e) {
    console.log(`ERRORRRR!: ${e}`);
  }
  res.send('IMPORTED');
});

export default router;
