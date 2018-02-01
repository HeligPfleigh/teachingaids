import express from 'express';
import EquipmentModel from '../../data/models/equipment';
import EquipmentTypeModel from '../../data/models/equipment_type';
import { generateBarcode } from '../../utils/barcode.util';
import { getDataFromExcel } from '../../utils/excel.util';

const router = express.Router();

const getMaxSequenceNum = async () => {
  const allEquipment = await EquipmentModel.find();
  let maxSequenceNum = 0;
  if (allEquipment.length > 0) {
    maxSequenceNum = allEquipment
      .map(value => value.sequenceNum)
      .reduce((a, b) => Math.max(a, b));
  }
  return maxSequenceNum;
};

router.get('/excels', async (req, res) => {
  const pathFile = 'src/server/excel_files/excel.xlsx';
  const sheetName = 'Tranh';
  const data = getDataFromExcel(pathFile, sheetName);

  const maxSequenceNum = await getMaxSequenceNum();
  // let sequenceNum = startSequenceNum + i;
  let barcode = generateBarcode(maxSequenceNum);

  // return await EquipmentModel.create(array);

  data.map((item) => {
    const equipmentType = {
      name: item.name,
      equipmentInfo: {
        madeFrom: item.madeFrom,
        grade: item.grade,
        khCode: item.khCode,
      },
      totalNumber: item.totalNumber,
      subject: item.subject,
      unit: item.unit,
      order: item.order,
    };
    const equipment = {
      barcode: 'name',
      sequenceNum: 'sequenceNum',
      equipmentTypeId: 'totalNumber',
      status: 'status',
    };
    return true;
  });
  // EquipmentModel.insertMany(arr, (error, docs) => {});
  // console.log(data);
  // workbook.SheetNames.forEach((n, i) => {
  //   console.log(n, i);
  // });
  // console.log(workbook);
  res.json(data);
});

export default router;
