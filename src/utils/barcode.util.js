import { barcodePrefix } from '../config';

export const generateBarcode = (sequenceNum) => {
  let str = `${sequenceNum}`;
  let pad = '0000000';
  let ans = pad.substring(0, pad.length - str.length) + str;
  return `${barcodePrefix}-${ans}`;
};
