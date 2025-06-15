'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import Label from '@/ui/label';
import Input from '@/ui/input';
import DatePicker from '@/ui/date-picker';
import Button from '@/ui/button';
import ClientIconSelectDialog from '@/features/client/components/client-icon-select-dialog';
import ClientServiceSelect from '@/features/client/components/client-service-select';
import { clientFormSchema } from '@/features/client/schema/client-form-schema';
import {
  useCreateClient,
  useUpdateClient,
} from '@/features/client/hooks/query';
import routes from '@/const/routes';
import LoadingSpinner from '@/ui/loading-spinner';
import { ServiceItemIds } from '@/types/client';

type Props = {
  defaultValues: z.infer<typeof clientFormSchema>;
};

export default function ClientForm({ defaultValues }: Props) {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues,
  });

  const router = useRouter();
  const params = useParams();
  const isEdit = !!params.clientId;

  const { mutate: createClient, isPending: isCreating } = useCreateClient({
    onSuccessCb: () => {
      router.push(routes.Clients());
    },
  });

  const { mutate: updateClient, isPending: isUpdating } = useUpdateClient({
    onSuccessCb: () => {
      router.push(routes.Clients());
    },
  });

  const onSubmit = async (data: z.infer<typeof clientFormSchema>) => {
    if (isEdit) {
      updateClient({ clientId: params.clientId as string, formData: data });
    } else {
      createClient(data);
    }
  };

  return (
    <>
      {(isCreating || isUpdating) && <LoadingSpinner />}
      <form
        className="flex flex-col gap-5 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-card p-5 rounded-lg space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-accent rounded-full " />
            <div className="text-xl font-extrabold tracking-widest">
              基本資料
            </div>
          </div>

          <div className="flex justify-center">
            <ClientIconSelectDialog
              selectedIcon={watch('clientIcon') || ''}
              onSelectIcon={(icon) => setValue('clientIcon', icon)}
            />
          </div>

          <div>
            <Label>案主姓名</Label>
            <Input className="bg-secondary" {...register('clientName')} />
            <p className="text-red-500 text-sm">{errors.clientName?.message}</p>
          </div>

          <div>
            <Label>生日</Label>
            <br />
            <DatePicker
              className="bg-secondary border-border w-full"
              onChange={(date) => {
                setValue('birthday', new Date(date).toISOString());
              }}
            />
            <p className="text-red-500 text-sm">{errors.birthday?.message}</p>
          </div>
          <div>
            <Label>地址</Label>
            <Input className="bg-secondary" {...register('address')} />
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>
          <div>
            <Label>緊急聯絡人</Label>
            <Input className="bg-secondary" {...register('emergencyContact')} />
            <p className="text-red-500 text-sm">
              {errors.emergencyContact?.message}
            </p>
          </div>
          <div>
            <Label>緊急聯絡人電話</Label>
            <Input
              className="bg-secondary"
              {...register('emergencyContactPhone')}
            />
            <p className="text-red-500 text-sm">
              {errors.emergencyContactPhone?.message}
            </p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-lg space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-accent rounded-full " />
            <div className="text-xl font-extrabold tracking-widest">
              服務項目
            </div>
          </div>
          <div>
            <Label>服務項目</Label>
            <ClientServiceSelect
              onChange={(serviceIds: ServiceItemIds[]) => {
                setValue('serviceItems', serviceIds);
              }}
              serviceItemsIds={watch('serviceItems') || []}
            />
            <p className="text-red-500 text-sm">
              {errors.serviceItems?.message}
            </p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-lg space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-accent rounded-full " />
            <div className="text-xl font-extrabold tracking-widest">
              督導資料
            </div>
          </div>

          <div>
            <Label>督導姓名</Label>
            <Input className="bg-secondary" {...register('supervisorName')} />
            <p className="text-red-500 text-sm">
              {errors.supervisorName?.message}
            </p>
          </div>

          <div>
            <Label>督導電話</Label>
            <Input className="bg-secondary" {...register('supervisorPhone')} />
            <p className="text-red-500 text-sm">
              {errors.supervisorPhone?.message}
            </p>
          </div>

          <div>
            <Label>辦公室電話</Label>
            <Input className="bg-secondary" {...register('officePhone')} />
            <p className="text-red-500 text-sm">
              {errors.officePhone?.message}
            </p>
          </div>
        </div>

        <div className="flex gap-5 mb-5">
          <Button
            variant="ghost"
            className="w-full border border-border"
            type="submit"
          >
            取消
          </Button>
          <Button
            type="submit"
            variant="accent"
            className="w-full text-primary-foreground"
          >
            確定
          </Button>
        </div>
      </form>
    </>
  );
}
