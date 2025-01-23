'use client';

import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ClientIconSelector from '@/features/client/components/client-icon-selector/client-icon-selector';
import ServiceItemSelector from '@/features/client/components/service-items-selector';
import Input from '@/ui/input';
import { createClientFormSchema } from '@/features/client/models/create-client-form-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/form/form';
import { createClientAction } from '@/features/client/actions/create-client-action';
import Button from '@/ui/button';
import { ServiceItem } from '@/features/client/types/service-items';

export default function CreateClient() {
  const router = useRouter();

  const form = useForm<z.infer<typeof createClientFormSchema>>({
    resolver: zodResolver(createClientFormSchema),
    defaultValues: {
      clientIcon: '',
      clientName: '秋津田',
      birthday: 1736956956,
      address: 'test',
      supervisorName: 'test',
      supervisorPhone: 'test',
      officePhone: 'test',
      emergencyContact: 'test',
      emergencyContactPhone: 'test',
      serviceItems: [ServiceItem.DressingAndUndressing],
    },
  });

  const onSubmit = async (data: z.infer<typeof createClientFormSchema>) => {
    await createClientAction(data);
    router.push('/clients');
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center justify-center gap-5 w-1/2 m-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-3xl mb-5">新增案主</h1>
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="col-span-2 flex items-center ">
            <ClientIconSelector
              onSelectIcon={(icon) => {
                form.setValue('clientIcon', icon);
              }}
              selectedIcon={form.watch('clientIcon') || ''}
            />
          </div>

          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem className="grid items-center gap-1.5">
                <FormLabel htmlFor="name">姓名</FormLabel>
                <FormControl>
                  <Input type="name" id="name" placeholder="姓名" {...field} />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="grid items-center gap-1.5">
                <FormLabel htmlFor="birthday">生日</FormLabel>
                <FormControl>
                  <Input
                    type="birthday"
                    id="birthday"
                    placeholder="生日"
                    onChange={(e) => field.onChange(+e)}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="grid items-center gap-1.5">
                <FormLabel htmlFor="address">住址</FormLabel>
                <FormControl>
                  <Input
                    type="address"
                    id="address"
                    placeholder="住址"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceItems"
            render={() => (
              <FormItem className="col-span-2 w-full">
                <FormLabel>服務項目</FormLabel>
                <ServiceItemSelector
                  selectedServiceItems={form.watch('serviceItems') || []}
                  onHandleSelectedServiceItems={(serviceItems) =>
                    serviceItems.length > 0 &&
                    form.setValue('serviceItems', serviceItems)
                  }
                />
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem className="grid items-center gap-1.5">
                <FormLabel htmlFor="emergencyContact">緊急聯絡人</FormLabel>
                <FormControl>
                  <Input
                    type="emergencyContact"
                    id="emergencyContact"
                    placeholder="緊急聯絡人"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyContactPhone"
            render={({ field }) => (
              <FormItem className="grid items-center gap-1.5">
                <FormLabel htmlFor="emergencyContactPhone">
                  緊急聯絡人電話
                </FormLabel>
                <FormControl>
                  <Input
                    type="emergencyContactPhone"
                    id="emergencyContactPhone"
                    placeholder="緊急聯絡人電話"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supervisorName"
            render={({ field }) => (
              <FormItem className="grid items-center gap-1.5">
                <FormLabel htmlFor="supervisorName">督導姓名</FormLabel>
                <FormControl>
                  <Input
                    type="supervisorName"
                    id="supervisorName"
                    placeholder="督導姓名"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supervisorPhone"
            render={({ field }) => (
              <FormItem className="grid items-center gap-1.5">
                <FormLabel htmlFor="supervisorPhone">督導電話</FormLabel>
                <FormControl>
                  <Input
                    type="supervisorPhone"
                    id="supervisorPhone"
                    placeholder="督導電話"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="officePhone"
            render={({ field }) => (
              <FormItem className="grid items-center gap-1.5">
                <FormLabel htmlFor="officePhone">辦公室電話</FormLabel>
                <FormControl>
                  <Input
                    type="officePhone"
                    id="officePhone"
                    placeholder="辦公室電話"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <Button onClick={form.handleSubmit(onSubmit)}>儲存</Button>
      </form>
    </Form>
  );
}
