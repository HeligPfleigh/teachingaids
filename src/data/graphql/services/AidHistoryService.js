import { AidHistoryModel, UserModel, EquipmentModel } from '../../models';

async function getAidHistories() {
  return await AidHistoryModel.find().sort({ createdAt: -1 });
}

async function getAidHistoriesOfEquipmentType(equipmentTypeId) {
  return await AidHistoryModel.find({ 'equipment.equipmentTypeId': equipmentTypeId }).sort({ createdAt: -1 });
}

async function getAidHistoriesOfTeacher(teacherId) {
  return await AidHistoryModel.find({ 'borrower.userId': teacherId }).sort({ createdAt: -1 });
}

async function createAidHistories(lenderId, borrowerId, borrowTime, returnTime, status, equipmentId) {
  const lender = await UserModel.findOne({ _id: lenderId });
  const borrower = await UserModel.findOne({ _id: borrowerId });
  const equipment = await EquipmentModel.findOne({ _id: equipmentId });
  return await AidHistoryModel.create({
    lender: { userId: lenderId, name: `${lender.profile.lastName} ${lender.profile.firstName}` },
    borrower: { userId: borrowerId, name: `${borrower.profile.lastName} ${borrower.profile.firstName}` },
    borrowTime,
    returnTime,
    status,
    equipment: {
      equipmentTypeId: equipment.equipmentTypeId,
      barcode: equipment.barcode,
      equipmentId,
    },
  });
}

export default {
  getAidHistories,
  getAidHistoriesOfEquipmentType,
  getAidHistoriesOfTeacher,
  createAidHistories,
};
