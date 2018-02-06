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

    const availabledLabel = 'Có sẵn';
    const borrowedLable = 'Đã mượn';
    const returnedLabel = 'Đã trả';

    const availabled = await EquipmentStatusModel.findOne({ name: availabledLabel });
    const borrowed = await EquipmentStatusModel.findOne({ name: borrowedLable });
    const returned = await EquipmentStatusModel.findOne({ name: returnedLabel });

    const equipments = await EquipmentModel.find({ _id: { $in: items } });
    await equipments.forEach(async (item) => {
      const statusId = isEmpty(item.statusId) || (item.status !== borrowedLable) ? borrowed._id : availabled._id;
      const status = isEmpty(item.statusId) || (item.status !== borrowedLable) ? borrowed.name : availabled.name;

      // update equipment status
      await EquipmentModel.findByIdAndUpdate({ _id: item._id }, {
        $set: {
          statusId,
          status,
          lender: lender._id,
          borrower: status === borrowedLable ? userId : null,
          borrowTime: status === borrowedLable ? new Date() : null,
          returnTime: status === borrowedLable ? null : new Date(),
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
        borrowTime: status === borrowedLable ? new Date() : null,
        returnTime: status === borrowedLable ? null : new Date(),
        equipment: {
          equipmentId: item._id,
          equipmentTypeId: equipmentType._id,
          name: equipmentType.name,
          barCode: item.barcode,
        },
        statusId: status === borrowedLable ? borrowed._id : returned._id,
        status: status === borrowedLable ? borrowed.name : returned.name,
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
