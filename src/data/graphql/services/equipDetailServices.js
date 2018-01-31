import { EquipmentModel } from '../../models/index.js';

async function createSubject(barcode, equipmentTypeId) {
  if (await EquipmentModel.findOne({ barcode })) {
    throw new Error('Mã barcode đã tồn tại');
  }

  return await EquipmentModel.create({ barcode, equipmentTypeId });
}

export default {
  createSubject,
};
