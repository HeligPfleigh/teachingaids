import { AidHistoryModel } from '../../models/index.js';

async function getAidHistories() {
  return await AidHistoryModel.find();
}

export default {
  getAidHistories,
};
