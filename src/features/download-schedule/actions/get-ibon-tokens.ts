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

export async function getIbonTokens() {
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
  const month = pad(now.getMonth() + 1, 2);
  const day = pad(now.getDate(), 2);
  const hour = pad(now.getHours(), 2);
  const minute = pad(now.getMinutes(), 2);
  const second = pad(now.getSeconds(), 2);
  const millisecond = pad(now.getMilliseconds(), 3);

  return `${year}${month}${day}${hour}${minute}${second}${millisecond}`;
}

export async function uploadFile({
  bufferArr,
  fileName,
  pincode,
}: {
  bufferArr: string[];
  fileName: string;
  token: string;
  key: string;
  pincode: string;
}) {
  const responses = await Promise.all(
    bufferArr.map((buffer, index) =>
      fetch('https://www.ibon.com.tw/qwsapi2/api/Upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ExtParameter: {
            fileName,
            fileSerial: index + 1,
            filesize: Buffer.from(buffer, 'base64').length,
            isMultiFile: bufferArr.length > 1,
            pincode,
            note1: null,
            note2: null,
            note3: null,
            uploadTime: getFormattedTimestamp(),
            useMode: 'API',
          },
          buffer,
          offset: 0,
        }),
      })
    )
  );

  const hasError = responses.some((res) => !res.ok);

  if (hasError) {
    throw new Error('Failed to upload file');
  }

  const data = await Promise.all(responses.map((res) => res.json()));

  return data;
}

export async function sendNotifyEmail({
  pincode,
  token,
  key,
}: {
  pincode: string;
  token: string;
  key: string;
}) {
  const response = await fetch(
    'https://print-api.ibon.com.tw/api/IbonUpload/SendNotifyMail',
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
          pincode,
          selectType: 'FNOMAL',
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to send notify email');
  }

  const data = await response.json();

  return data;
}

export async function uploadFileToIbonAndSendNotifyEmail({
  bufferArr,
  fileName,
}: {
  bufferArr: string[];
  fileName: string;
}) {
  const { key, token } = await getIbonTokens();
  const { pincode } = await getPinCode();

  await uploadFile({
    bufferArr,
    fileName,
    token,
    key,
    pincode,
  });

  await sendNotifyEmail({ pincode, token, key });

  return { pincode };
}
