import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const { Schema } = mongoose;

const SubjectSchema = new Schema({
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
SubjectSchema.plugin(timestamps);

/**
 * Hook to remove all devices on delete
 */
// SubjectSchema.pre('remove', (next) => {
//   mongoose.model('Adi').remove({
//     subject: this._id,
//   }, next);
// });

export default mongoose.model('Subject', SubjectSchema, 'subjects');
