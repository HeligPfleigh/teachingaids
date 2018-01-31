import { AidHistoryModel } from '../../models';

async function getAidHistories() {
  return await AidHistoryModel.find();
}

async function getAidHistoriesOfEquipmentType(equipmentTypeId) {
  return await AidHistoryModel.find({ 'equipment.equipmentTypeId': equipmentTypeId });
}

async function getAidHistoriesOfTeacher(teacherId) {
  return await AidHistoryModel.find({ 'borrower.userId': teacherId });
}

export default {
  getAidHistories,
  getAidHistoriesOfEquipmentType,
  getAidHistoriesOfTeacher,
};
