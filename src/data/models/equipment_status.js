import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const { Schema } = mongoose;

const EquipmentStatusSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  uniqueName: {
    type: String,
    trim: true,
    uppercase: true,
    unique: true,
    // select: false,
  },
});

// plugins
EquipmentStatusSchema.plugin(timestamps);

/**
 * Hook to remove all devices on delete
 */
// EquipmentStatusSchema.pre('remove', (next) => {
//   mongoose.model('Adi').remove({
//     status: this._id,
//   }, next);
// });

export default mongoose.model('EquipmentStatus', EquipmentStatusSchema, 'equipment_status');
