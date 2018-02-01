import express from 'express';
import _ from 'lodash';
import EquipmentModel from '../../data/models/equipment';
import EquipmentTypeModel from '../../data/models/equipment_type';
import { generateBarcode } from '../../utils/barcode.util';
import { getDataFromExcel } from '../../utils/excel.util';
import removeToneVN from '../../utils/removeToneVN';
import { UNITS } from '../../constants';

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
  const pathFile = 'src/server/excel_files/excel.xlsx';
  const sheetName = 'Tranh';
  const data = getDataFromExcel(pathFile, sheetName);
  const equipmentStatus = 'MOI';
  const units = _.invert(UNITS);
  try {
    let maxSequenceNum = await getMaxSequenceNum();
    await data.map(async (item) => {
      const equipmentTypeObj = {
        name: item.name,
        equipmentInfo: {
          madeFrom: item.madeFrom,
          grade: item.grade ? item.grade.split(',').map(g => parseInt(g, 10)) : null,
          khCode: item.khCode,
        },
        totalNumber: item.totalNumber,
        subject: item.subject,
        unit: Object.prototype.hasOwnProperty.call(units, item.unit) ? units[item.unit] : _.toUpper(removeToneVN(item.unit)),
        order: item.order,
      };
      await EquipmentTypeModel.create(equipmentTypeObj, async (error, equipmentType) => {
        if (error) {
          console.log(`EquipmentType ERRORRRR!: ${item.name} - ${error}`);
        }
        maxSequenceNum++;
        const equipmentObj = {
          barcode: generateBarcode(maxSequenceNum),
          sequenceNum: maxSequenceNum,
          equipmentTypeId: equipmentType.id,
          status: equipmentStatus,
        };
        await EquipmentModel.create(equipmentObj, (err) => {
          if (err) {
            console.log(`Equipment ERRORRRR!: ${item.name} - ${err}`);
          }
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
  // EquipmentModel.insertMany(arr, (error, docs) => {});
  // console.log(data);
  // workbook.SheetNames.forEach((n, i) => {
  //   console.log(n, i);
  // });
  res.json(data);
});

export default router;
