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

async function createEquipmentType(name, madeFrom, grade, khCode, unit, subject) {
  if (await EquipmentTypeModel.findOne({ name })) {
    throw new Error('Loại thiết bị đã tồn tại trong cơ sở dữ liệu');
  }

  const equipmentInfo = {
    madeFrom,
    grade,
    khCode,
  };
  const totalNumber = '0';

  return await EquipmentTypeModel.create({ name, equipmentInfo, totalNumber, unit, subject });
}

export default {
  getEquipmentTypeById,
  updateAmountOfEquipmentType,
  createEquipmentType,
};
