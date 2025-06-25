'use server';

/* eslint-disable react-hooks/rules-of-hooks */
import { cookies } from 'next/headers';
import { addDays, format } from 'date-fns';

import useSupabaseServer from '@/utils/supabase/supabase-server';
import generateDisposableSet from '@/utils/supabase/generate-disposable-set';

type UpdateScheduleParams = {
  clientId: string;
  serviceTimePerDay: {
    date: string;
    serviceTime: {
      startTime: string;
      endTime: string;
    };
  }[];
};

export async function updateServiceTimeByDay(params: UpdateScheduleParams) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const client = useSupabaseServer(cookieStore);

  const { data, error } = await client.rpc('replace_day_schedules', {
    p_client_id: params.clientId,
    p_new_schedules: params.serviceTimePerDay.map((day) => ({
      date: day.date,
      service_start_time: day.serviceTime.startTime,
      service_end_time: day.serviceTime.endTime,
    })),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

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
          fV: '3.4.2',
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
        FV: '3.4.2',
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

export async function uploadFile({
  bufferArr,
  fileName,
  pincode,
  uploadTime,
}: {
  bufferArr: string[];
  fileName: string;
  token: string;
  key: string;
  pincode: string;
  uploadTime: string;
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
            uploadTime,
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
        FV: '3.4.2',
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
  const now = new Date();

  const uploadTime = format(now, 'yyyyMMddHHmmssSSS');

  const deadline = format(addDays(now, 2), 'yyyy/MM/dd HH:mm:ss');

  await uploadFile({
    bufferArr,
    fileName,
    token,
    key,
    pincode,
    uploadTime,
  });

  await sendNotifyEmail({ pincode, token, key });

  return { pincode, deadline };
}
