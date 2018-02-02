/* eslint-disable max-len */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/teachingaidsman';

export const auth = {
  jwt: { secret: process.env.JWT_SECRET || 'my-secret-sns-administrator' },
};

export const mailer = {
  smtp: {
    service: 'Gmail',
    auth: {
      user: 'sns.mail.center@gmail.com',
      pass: 'Mtt2016a@',
    },
  },
  from: '"SNS SERVICE" <sns.mail.center@gmail.com>',
};

export const barcodePrefix = 'C2TS';
export const barcodePad = '0000000';
