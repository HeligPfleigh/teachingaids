import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const EquipmentInfoSchema = new Schema({
  madeFrom: String,
  grade: Array,
  khCode: String,
}, {
  _id: false,
});

const EquipmentTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  equipmentInfo: EquipmentInfoSchema,
  totalNumber: Number,
  subject: String,
  unit: String,
  order: Number,
  category: String,
});

// plugins
EquipmentTypeSchema.plugin(timestamps);

const EquipmentTypeModel = mongoose.model('EquipmentType', EquipmentTypeSchema, 'equipment_types');

export default EquipmentTypeModel;
