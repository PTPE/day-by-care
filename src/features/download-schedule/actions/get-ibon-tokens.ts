'use server';

import { generateDisposableSet } from '@/features/download-schedule/utils/generate-disposable-id';

type IbonTokensResponse = {
  result: {
    token: string;
    uuid: string;
  };
};

type IbonPinCodeResponse = {
  result: {
    pincode: string;
    deadline: string;
  };
};

async function getIbonTokens() {
  const { disposableId, key, t1 } = generateDisposableSet();
  const response = await fetch(
    'https://print-api.ibon.com.tw/api/BaseEntry/GetEntry',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Data: {
          disposableId,
          fV: '2.2.1',
          key,
          memberToken: '',
          t1,
          t2: '1',
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch ibon tokens');
  }

  const data = (await response.json()) as IbonTokensResponse;

  return { token: data.result.token, key: data.result.uuid };
}

export async function getPinCode() {
  const { key, token } = await getIbonTokens();
  const response = await fetch(
    'https://print-api.ibon.com.tw/api/IbonUpload/GetPincode',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        FV: '2.2.1',
        Key: key,
      },
      body: JSON.stringify({
        Data: {
          email: 'winnie524722@gmail.com',
          SelectType: 'FNOMAL',
          User: 'guest',
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch ibon pin code');
  }

  const data = (await response.json()) as IbonPinCodeResponse;

  return { pincode: data.result.pincode, deadline: data.result.deadline };
}

function getFormattedTimestamp(): string {
  const now = new Date();

  const pad = (num: number, size: number) => num.toString().padStart(size, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1, 2); // 月份是從 0 開始
  const day = pad(now.getDate(), 2);
  const hour = pad(now.getHours(), 2);
  const minute = pad(now.getMinutes(), 2);
  const second = pad(now.getSeconds(), 2);
  const millisecond = pad(now.getMilliseconds(), 3);

  return `${year}${month}${day}${hour}${minute}${second}${millisecond}`;
}

type ParamsUploadFile = {
  fileName: string;
  fileSize: number;
  buffer: string;
};

export async function uploadFile({
  fileName,
  fileSize,
  buffer,
}: ParamsUploadFile) {
  const { key, token } = await getIbonTokens();
  const { pincode } = await getPinCode();

  const response = await fetch('https://www.ibon.com.tw/qwsapi2/api/Upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      FV: '2.2.1',
      Key: key,
    },
    body: JSON.stringify({
      ExtParameter: {
        fileName,
        fileSerial: 1,
        fileSize,
        isMultipleFile: false,
        pincode,
        updateTime: getFormattedTimestamp(),
        useMode: 'API',
      },
      buffer,
      offset: 0,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  const data = await response.json();

  return data;
}
