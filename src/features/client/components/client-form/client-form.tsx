'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Popover, PopoverTrigger, PopoverContent } from '@/ui/popover';
import DatePicker from '@/ui/date-picker';
import Button from '@/ui/button';
import Label from '@/ui/label';
import Input from '@/ui/input';
import Checkbox from '@/ui/checkbox';
import { icons } from '@/features/client/const/client-icons';
import { serviceItems } from '@/features/client/const/service-item';
import { createClientFormSchema } from '@/features/client/models/create-client-form-schema';

export default function ClientForm() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const { register } = useForm<z.infer<typeof createClientFormSchema>>();

  return (
    <form className="space-y-5">
      <div className="flex flex-col w-fit items-center gap-4">
        <span className={`${selectedIcon || ''} text-5xl`} />
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
                  onClick={() => setSelectedIcon(icon)}
                  aria-label={`Select ${icon}`}
                />
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>案主姓名</Label>
        <Input {...register('name')} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>地址</Label>
        <Input {...register('address')} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label {...register('birthday')}>生日</Label>
        <DatePicker />
      </div>

      <div className="flex flex-col items-start gap-3">
        <Label className="h-[28px] flex items-center shrink-0">服務項目</Label>
        <div className="flex gap-2 flex-wrap">
          {serviceItems.map((service) => (
            <div className="flex max-w-sm items-center gap-3" key={service}>
              <Checkbox id={service} />
              <Label htmlFor={service} className="cursor-pointer">
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>督導</Label>
        <Input {...register('supervisorName')} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>督導電話</Label>
        <Input {...register('supervisorPhone')} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>辦公室電話</Label>
        <Input {...register('officePhone')} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>緊急聯絡人</Label>
        <Input {...register('emergencyContact')} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>緊急聯絡人電話</Label>
        <Input />
      </div>

      <Button>儲存</Button>
    </form>
  );
}
