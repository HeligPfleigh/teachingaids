import isEmpty from 'lodash/isEmpty';
import { EquipmentStatusModel } from '../../models/index.js';
import removeToneVN from '../../../utils/removeToneVN';

async function getEquipmentStatusById(id) {
  return await EquipmentStatusModel.findById(id) || {};
}

async function getEquipmentStatus() {
  return await EquipmentStatusModel.find();
}

async function checkEquipmentStatusExist(name) {
  const query = { $regex: new RegExp(`^${name.toLowerCase()}$`, 'i') };
  const sub = await EquipmentStatusModel.find({
    $or: [
      { name: query },
      { uniqueName: query },
    ],
  });
  return !isEmpty(sub);
}

async function createEquipmentStatus(name) {
  if (isEmpty(name)) {
    throw new Error('status name is undefined');
  }

  if (await EquipmentStatusModel.findOne({ name })) {
    throw new Error('status name is exist');
  }

  return await EquipmentStatusModel.create({
    name,
    uniqueName: removeToneVN(name).toUpperCase(),
  });
}

async function updateEquipmentStatus(_id, name) {
  if (isEmpty(_id)) {
    throw new Error('status id is undefined');
  }

  if (isEmpty(name)) {
    throw new Error('status name is undefined');
  }

  if (!await EquipmentStatusModel.findById(_id)) {
    throw new Error('status does not exist');
  }

  await EquipmentStatusModel.update({ _id }, {
    $set: {
      name,
      uniqueName: removeToneVN(name).toUpperCase(),
    },
  });

  return EquipmentStatusModel.findById(_id);
}

async function deleteEquipmentStatus(_id) {
  if (isEmpty(_id)) {
    throw new Error('subject id is undefined');
  }

  if (!await EquipmentStatusModel.findById(_id)) {
    throw new Error('subject does not exist');
  }

  try {
    await EquipmentStatusModel.remove({ _id });
    return true;
  } catch (error) {
    return false;
  }
}

export default {
  getEquipmentStatus,
  getEquipmentStatusById,
  createEquipmentStatus,
  updateEquipmentStatus,
  deleteEquipmentStatus,
  checkEquipmentStatusExist,
};
