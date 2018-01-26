import isEmpty from 'lodash/isEmpty';
import { SubjectModel } from '../../models/index.js';
import removeToneVN from '../../../utils/removeToneVN';

async function getSubject(id) {
  return await SubjectModel.findById(id) || {};
}

async function getSubjects() {
  return await SubjectModel.find();
}

async function createSubject(name) {
  if (isEmpty(name)) {
    throw new Error('subject name is undefined');
  }

  if (await SubjectModel.findOne({ name })) {
    throw new Error('subject name is exist');
  }

  return await SubjectModel.create({ name, uniqueName: removeToneVN(name) });
}

async function updateSubject(subId, name) {
  if (isEmpty(subId)) {
    throw new Error('subject id is undefined');
  }

  if (isEmpty(name)) {
    throw new Error('subject name is undefined');
  }

  if (!await SubjectModel.findById(subId)) {
    throw new Error('subject does not exist');
  }

  await SubjectModel.update({ _id: subId }, {
    $set: {
      name,
      uniqueName: removeToneVN(name),
    },
  });

  return SubjectModel.findById(subId);
}

async function deleteSubject(subId) {
  if (isEmpty(subId)) {
    throw new Error('subject id is undefined');
  }

  if (!await SubjectModel.findById(subId)) {
    throw new Error('subject does not exist');
  }

  try {
    await SubjectModel.remove({ _id: subId });
    return true;
  } catch (error) {
    return false;
  }
}

export default {
  getSubject,
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
};
