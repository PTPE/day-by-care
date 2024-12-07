'use client';

import { useRef } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Popover, PopoverTrigger, PopoverContent } from '@/ui/popover';
import DatePicker from '@/ui/date-picker';
import Button from '@/ui/button';
import Input from '@/ui/input';
import Checkbox from '@/ui/checkbox';
import { icons } from '@/features/client/const/client-icons';
import { serviceItems } from '@/features/client/const/service-item';
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

export default function ClientForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof createClientFormSchema>>({
    resolver: zodResolver(createClientFormSchema),
    defaultValues: {
      clientIcon: '',
      clientName: '',
      birthday: new Date().toISOString(),
      address: '',
      supervisorName: '',
      supervisorPhone: '',
      officePhone: '',
      emergencyContact: '',
      emergencyContactPhone: '',
      serviceItems: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof createClientFormSchema>) => {
    await createClientAction(data);
    router.push('/clients');
  };

  return (
    <Form {...form}>
      <form ref={formRef} className="space-y-5 max-w-lg">
        <div className="flex flex-col w-fit items-center gap-4">
          <span className={`${form.watch('clientIcon') || ''} text-5xl`} />
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">案主頭像</Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="h-52 overflow-auto">
                {icons.map((icon) => (
                  <button
                    type="button"
                    key={icon}
                    className={`${icon} cursor-pointer text-3xl`}
                    onClick={() => form.setValue('clientIcon', icon)}
                    aria-label={`Select ${icon}`}
                  />
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>案主姓名</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>地址</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>生日</FormLabel>
              <div>
                <FormControl>
                  <DatePicker
                    onChange={(date) =>
                      field.onChange(new Date(date).toISOString())
                    }
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceItems"
          render={() => (
            <FormItem>
              <FormLabel>服務項目</FormLabel>
              <div className="flex gap-2 flex-wrap">
                {serviceItems.map((serviceItem) => (
                  <FormField
                    key={serviceItem}
                    control={form.control}
                    name="serviceItems"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-y-0 gap-1 flex-shrink-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(serviceItem)}
                            onCheckedChange={(checked) =>
                              checked
                                ? field.onChange([...field.value, serviceItem])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== serviceItem
                                    )
                                  )
                            }
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer">
                          {serviceItem}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supervisorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>督導姓名</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supervisorPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>督導電話</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="officePhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>辦公室電話</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>緊急聯絡人</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyContactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>緊急聯絡人電話</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button onClick={form.handleSubmit(onSubmit)}>儲存</Button>
      </form>
    </Form>
  );
}
