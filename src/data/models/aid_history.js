import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const borrowerHistorySchema = new Schema({
  userId: ObjectId,
  name: String,
  teacherCode: String
}, {
  _id: false,
});

const lenderHistorySchema = new Schema({
  userId: ObjectId,
  name: String
}, {
  _id: false,
});

const equipmentHistorySchema = new Schema({
  equipmentTypeId: ObjectId,
  equipmentId: ObjectId,
  name: String,
  barCode: String
}, {
  _id: false,
});

const AidHistorySchema = new Schema({
  lender: lenderHistorySchema,
  borrower: borrowerHistorySchema,
  borrowTime: Date,
  returnTime: Date,
  equipment: equipmentHistorySchema
});

// plugins
AidHistorySchema.plugin(timestamps);

const AidHistoryModel = mongoose.model('AidHistory', AidHistorySchema, 'aid_histories');

export default AidHistoryModel;