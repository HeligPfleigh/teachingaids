import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import {
  EquipmentModel,
  EquipmentTypeModel,
} from '../../models/index.js';

async function searchEquipment(query) {
  const result = {
    type: 'equipment',
    items: [],
  };

  if (isEmpty(query)) {
    return result;
  }

  let items = await EquipmentModel.find({
    $or: [
      { barcode: query },
      { equipmentTypeId: query },
    ],
  });

  if (!isEmpty(items)) {
    return {
      ...result,
      items,
      type: items.length > 1 ? 'equipmentType' : 'equipment',
    };
  }

  const pattern = {
    $regex: new RegExp(`${query.trim()}`, 'gi'),
  };

  items = await EquipmentTypeModel.find({
    $or: [
      { id: query },
      { name: pattern },
      { subject: pattern },
    ],
  });

  if (!isEmpty(items)) {
    const ids = map(items, '_id');
    items = await EquipmentModel.find({ equipmentTypeId: { $in: ids } });

    return {
      ...result,
      items,
      type: items.length > 1 ? 'equipmentType' : 'equipment',
    };
  }

  return result;
}

export default {
  searchEquipment,
};
