import { barcodePrefix, barcodePad } from '../config';

/* eslint-disable import/prefer-default-export */
export const generateBarcode = (sequenceNum) => {
  let str = `${sequenceNum}`;
  let pad = barcodePad;
  let ans = pad.substring(0, pad.length - str.length) + str;
  return `${barcodePrefix}-${ans}`;
};
