import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const EquipmentSchema = new Schema({
  barcode: String,
  sequenceNum: Number,
  equipmentTypeId: String,
  statusId: String,
  status: String,
  lender: ObjectId,
  borrower: ObjectId,
  borrowTime: Date,
  returnTime: Date,
});

// plugins
EquipmentSchema.plugin(timestamps);

const EquipmentModel = mongoose.model('Equipment', EquipmentSchema, 'equipments');

export default EquipmentModel;
