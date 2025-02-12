'use client';

import { useEffect } from 'react';

import { z } from 'zod';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import useCreateClient from '@/features/client/hooks/useCreateClient';
import useUpdateClient from '@/features/client/hooks/useUpdateClient';
import ClientIconSelector from '@/features/client/components/client-icon-selector';
import ServiceItemSelector from '@/features/client/components/service-items-selector';
import { createClientFormSchema } from '@/features/client/models/create-client-form-schema';
import useGetClientFormDefaultValues from '@/features/client/hooks/useGetClientFormDefaultValues';
import DatePicker from '@/ui/date-picker';
import Button from '@/ui/button';
import Input from '@/ui/input';

type Props = {
  onHandleExitEditModet?: () => void;
};

export default function ClientPage({ onHandleExitEditModet }: Props) {
  const { clientId } = useParams<{ clientId: string }>();

  const { defaultValues } = useGetClientFormDefaultValues();

  const { mutate: updateClient } = useUpdateClient({
    onSuccessCb: onHandleExitEditModet,
  });

  const { mutate: createClient } = useCreateClient();

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues,
    resolver: zodResolver(createClientFormSchema),
  });

  const onSubmit = (data: z.infer<typeof createClientFormSchema>) => {
    if (!clientId) createClient(data);
    else updateClient({ formData: data, client_id: clientId });
  };

  useEffect(() => reset(defaultValues), [defaultValues, reset]);

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative flex flex-col m-auto gap-5 min-w-[300px]">
        <ClientIconSelector
          selectedIcon={watch('clientIcon') || ''}
          onSelectIcon={(icon) => setValue('clientIcon', icon)}
        />

        <div className="flex flex-col gap-5">
          <p className="font-extrabold">個人資訊</p>

          <div className="flex gap-2 text-sm items-center">
            <p className=" w-18 flex-shrink-0">姓名：</p>
            <Input {...register('clientName')} />
          </div>

          <div className="flex gap-2 text-sm items-center">
            <p className=" w-18 flex-shrink-0">地址：</p>
            <Input {...register('address')} />
          </div>

          <div className="flex gap-2 items-center text-sm">
            <p className=" w-18 flex-shrink-0">生日：</p>
            <DatePicker
              value={
                watch('birthday') ? new Date(watch('birthday')!) : new Date()
              }
              onChange={(birthday) =>
                setValue('birthday', birthday.toISOString())
              }
            />
          </div>

          <p className="font-extrabold">緊急聯絡人</p>

          <div className="flex gap-2 text-sm items-center">
            <p className="w-18 flex-shrink-0">姓名：</p>
            <Input {...register('emergencyContact')} />
          </div>

          <div className="flex gap-2 text-sm items-center">
            <p className="w-18 flex-shrink-0">電話：</p>
            <Input {...register('emergencyContactPhone')} />
          </div>

          <p className="font-extrabold">服務資訊</p>

          <div className="flex gap-2 text-sm items-center">
            <p className="w-18 flex-shrink-0">服務項目：</p>

            <ServiceItemSelector
              selectedServiceItems={watch('serviceItems') || []}
              onHandleSelectedServiceItems={(items) =>
                setValue('serviceItems', items)
              }
            />
          </div>

          <div className="flex gap-2 text-sm items-center">
            <p className="w-18 flex-shrink-0">督導姓名：</p>
            <Input {...register('supervisorName')} />
          </div>
          <div className="flex gap-2 text-sm items-center">
            <p className="w-18 flex-shrink-0">督導電話：</p>
            <Input {...register('supervisorPhone')} />
          </div>

          <div className="flex gap-2 text-sm items-center">
            <p className="w-18 flex-shrink-0">辦公室電話：</p>
            <Input {...register('officePhone')} />
          </div>

          <Button type="submit">儲存</Button>
        </div>
      </div>
    </form>
  );
}
