import { EquipmentTypeModel } from '../../models/index.js';

async function getEquipmentTypeById(id) {
  return await EquipmentTypeModel.findById(id) || {};
}

async function updateAmountOfEquipmentType(_id, totalNumber) {
  if (!await EquipmentTypeModel.findById({ _id })) {
    throw new Error('Không tồn tại loại thiết bị đã nhập');
  }
  await EquipmentTypeModel.update({ _id }, {
    $set: {
      totalNumber,
    },
  });

  return EquipmentTypeModel.findById({ _id });
}

export default {
  getEquipmentTypeById,
  updateAmountOfEquipmentType,
};
