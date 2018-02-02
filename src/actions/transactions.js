/* eslint-disable import/prefer-default-export */

import {
  CHANGE_INDEX_STEP,
  ADD_USER_FORM,
  RESET_TRANSACTION,
  SELECT_EQUIPMENT,
  REMOVE_EQUIPMENT,
} from '../constants/index';

export function handleNext(stepIndex) {
  return {
    type: CHANGE_INDEX_STEP,
    payload: {
      stepIndex: stepIndex < 3 ? (stepIndex + 1) : stepIndex,
      finished: stepIndex >= 2,
      isNextStep: stepIndex >= 2,
    },
  };
}

export function handlePrev(stepIndex) {
  return {
    type: CHANGE_INDEX_STEP,
    payload: {
      finished: false,
      isNextStep: true,
      stepIndex: stepIndex > 0 ? (stepIndex - 1) : stepIndex,
    },
  };
}

export function addUserForm(user) {
  return {
    user,
    type: ADD_USER_FORM,
  };
}

export function selectEquipment(item) {
  return {
    item,
    type: SELECT_EQUIPMENT,
  };
}

export function removeEquipment(item) {
  return {
    item,
    type: REMOVE_EQUIPMENT,
  };
}

export function resetTransaction() {
  return { type: RESET_TRANSACTION };
}
