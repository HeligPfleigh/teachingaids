import {
  CHANGE_INDEX_STEP,
  ADD_USER_FORM,
  RESET_TRANSACTION,
  SELECT_EQUIPMENT,
  REMOVE_EQUIPMENT,
} from '../constants/index';

const initState = {
  stepIndex: 0,
  finished: false,
  isNextStep: false,
  user: null,
  selectItems: [],
};

export default function transactions(state = initState, action) {
  switch (action.type) {
    case CHANGE_INDEX_STEP:
      return {
        ...state,
        ...action.payload,
      };

    case ADD_USER_FORM:
      return {
        ...state,
        isNextStep: true,
        user: action.user,
      };

    case SELECT_EQUIPMENT: {
      const { selectItems } = state;
      const { item } = action;
      if (item) {
        const callback = ({ _id }) => _id.toString() === item._id.toString();
        const isExistItem = (selectItems || []).findIndex(callback) > -1;

        return {
          ...state,
          isNextStep: true,
          selectItems: isExistItem ? selectItems : [...selectItems, ...[action.item]],
        };
      }

      return state;
    }

    case REMOVE_EQUIPMENT: {
      const newSelectItems = state.selectItems.filter(e => e !== action.item);
      return {
        ...state,
        selectItems: newSelectItems,
        isNextStep: newSelectItems.length > 0,
      };
    }

    case RESET_TRANSACTION:
      return initState;

    default:
      return state;
  }
}
