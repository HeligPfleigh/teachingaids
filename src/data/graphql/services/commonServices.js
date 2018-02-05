import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import {
  EquipmentModel,
  EquipmentTypeModel,
  AidHistoryModel,
  UserModel,
  EquipmentStatusModel,
} from '../../models/index.js';

async function searchEquipment({ borrowerId, query }) {
  const result = {
    error: false,
    message: '',
    type: 'equipment',
    items: [],
  };

  if (isEmpty(query)) {
    return result;
  }

  const pattern = {
    $regex: new RegExp(`${query.trim()}`, 'gi'),
  };

  let items = await EquipmentModel.find({
    $or: [
      { barcode: pattern },
      { equipmentTypeId: query },
    ],
  });

  if (!isEmpty(items)) {
    if (items.length === 1 && !isEmpty(borrowerId)) {
      if (!isEmpty(items[0].borrower)
        && (items[0].borrower.toString() !== borrowerId.toString())
      ) {
        return {
          ...result,
          error: true,
          message: 'Người trả không phải là người mượn..!',
        };
      }
    }

    return {
      ...result,
      items,
      type: items.length > 1 ? 'equipmentType' : 'equipment',
    };
  }

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

async function transaction({ ownerUser, userId, items }) {
  const result = {
    type: 'error',
    status: 'Thao tác mượn trả đã được xử lý thành công!',
  };

  if (isEmpty(userId) || isEmpty(items)) {
    return {
      ...result,
      status: 'Lỗi thiếu tham số',
    };
  }

  try {
    const lender = await UserModel.findById(ownerUser);
    if (isEmpty(lender)) {
      return {
        ...result,
        status: 'Người cho mượn không tồn tại trên hệ thống',
      };
    }

    const borrower = await UserModel.findById(userId);
    if (isEmpty(borrower)) {
      return {
        ...result,
        status: 'Người mượn không tồn tại trên hệ thống',
      };
    }

    const availabled = await EquipmentStatusModel.findOne({ name: 'Có sẵn' });
    const borrowed = await EquipmentStatusModel.findOne({ name: 'Đã mượn' });
    const returned = await EquipmentStatusModel.findOne({ name: 'Đã trả' });

    const equipments = await EquipmentModel.find({ _id: { $in: items } });
    await equipments.forEach(async (item) => {
      const statusId = isEmpty(item.statusId) || (item.status !== 'Đã mượn') ? borrowed._id : availabled._id;
      const status = isEmpty(item.statusId) || (item.status !== 'Đã mượn') ? borrowed.name : availabled.name;

      // update equipment status
      await EquipmentModel.findByIdAndUpdate({ _id: item._id }, {
        $set: {
          statusId,
          status,
          lender: lender._id,
          borrower: status === 'Đã mượn' ? userId : null,
          borrowTime: status === 'Đã mượn' ? new Date() : null,
          returnTime: status === 'Đã mượn' ? null : new Date(),
        },
      });

      const equipmentType = await EquipmentTypeModel.findById(item.equipmentTypeId);

      // update history status
      await AidHistoryModel.create({
        lender: {
          userId: lender._id,
          name: `${lender.profile.firstName} ${lender.profile.lastName}`,
        },
        borrower: {
          userId: borrower._id,
          name: `${borrower.profile.firstName} ${borrower.profile.lastName}`,
        },
        borrowTime: isEmpty(item.statusId) || (item.status !== 'Đã mượn') ? null : new Date(),
        returnTime: isEmpty(item.statusId) || (item.status !== 'Đã mượn') ? new Date() : null,
        equipment: {
          equipmentId: item._id,
          equipmentTypeId: equipmentType._id,
          name: equipmentType.name,
          barCode: item.barcode,
        },
        statusId: isEmpty(item.statusId) || (item.status !== 'Đã mượn') ? borrowed._id : returned._id,
        status: isEmpty(item.statusId) || (item.status !== 'Đã mượn') ? borrowed.name : returned.name,
      });
    });

    return {
      ...result,
      type: 'success',
    };
  } catch (error) {
    return {
      ...result,
      status: 'Lỗi không xác định',
    };
  }
}

export default {
  transaction,
  searchEquipment,
};
