import { EquipmentModel, UserModel, EquipmentStatusModel } from '../../models/index.js';

async function createEquipment(equipmentTypeId, quantity) {
  const allEquipment = await EquipmentModel.find();
  let startSequenceNum = 0;

  if (allEquipment.length !== 0) {
    const maxSequenceNum = allEquipment.map(value => value.sequenceNum).reduce((a, b) => Math.max(a, b));
    startSequenceNum = maxSequenceNum + 1;
  }

  let array = [];
  for (let i = 0; i < quantity; i++) {
    let sequenceNum = startSequenceNum + i;
    let status = 'null';

    // barcode string
    let str = `${sequenceNum}`;
    let pad = '0000000';
    let ans = pad.substring(0, pad.length - str.length) + str;
    let barcode = `C2TS-${ans}`;

    array.push({ sequenceNum, equipmentTypeId, barcode, status });
  }

  return await EquipmentModel.create(array);
}

async function updateAidEquiment(equipmentId, lender, borrower, status, borrowerTime, returnTime) {
  if (await EquipmentModel.findOne({ _id: equipmentId }))
    {return await EquipmentModel.update({ _id: equipmentId },
    {
      lender,
      borrower,
      borrowerTime,
      returnTime,
      status,
    });}
}
export default {
  createEquipment,
};
