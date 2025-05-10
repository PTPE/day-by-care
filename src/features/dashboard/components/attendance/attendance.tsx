'use client';

import { useEffect, useMemo, useState } from 'react';

import { format } from 'date-fns';
import { useFieldArray, useForm } from 'react-hook-form';

import Button from '@/ui/button';
import DatePicker from '@/ui/date-picker';
import Label from '@/ui/label';
import { useGetServiceTimeByClientIdAndDate } from '@/features/dashboard/hooks/useDashboardQuery.client';
import { getValidServiceTime } from '@/utils/get-valid-service-time';
import { useUpdateServiceTimeByDay } from '@/hooks/query';

import TimeSlot from './_time-slot';

type Props = {
  selectedClientId: string;
};

export default function Attendance({ selectedClientId }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data: serviceTime } = useGetServiceTimeByClientIdAndDate({
    clientId: selectedClientId,
    date: format(selectedDate, 'yyyy-MM-dd'),
  });

  const { mutate: updateServiceTime } = useUpdateServiceTimeByDay();

  const defaultValues = useMemo(
    () => ({
      serviceTime: serviceTime?.length
        ? serviceTime
        : [{ startTime: '', endTime: '' }],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(serviceTime)]
  );

  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'serviceTime',
  });

  const handleAddServiceTime = () => {
    append({
      startTime: '',
      endTime: '',
    });
  };

  const handleRemoveServiceTime = (index: number) => {
    if (fields.length === 1) update(index, { startTime: '', endTime: '' });
    else remove(index);
  };

  useEffect(() => {
    setValue('serviceTime', defaultValues.serviceTime);
  }, [defaultValues, setValue]);

  const onSubmit = (data: {
    serviceTime: { startTime: string; endTime: string }[];
  }) => {
    const serviceTimePerDay = data.serviceTime.map((time) => ({
      date: format(selectedDate, 'yyyy-MM-dd'),
      serviceTime: time,
    }));

    const validServiceTimePerDay = serviceTimePerDay.filter((time) =>
      getValidServiceTime({
        date: format(selectedDate, 'yyyy-MM-dd'),
        service_start_time: time.serviceTime.startTime,
        service_end_time: time.serviceTime.endTime,
      })
    );

    updateServiceTime({
      clientId: selectedClientId,
      serviceTimePerDay: validServiceTimePerDay,
    });
  };

  return (
    <form
      className="flex flex-col gap-5 bg-card p-4 rounded-lg lg:p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-accent rounded-full " />
        <div className="text-xl font-extrabold tracking-widest">簽到簽退</div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm md:text-base">日期</Label>
        <DatePicker onChange={(date) => setSelectedDate(date)} />
      </div>

      {fields.map((field, index) => (
        <TimeSlot
          key={field.id}
          register={register}
          index={index}
          onRemove={() => handleRemoveServiceTime(index)}
        />
      ))}

      <Button
        variant="outline"
        className="border-accent text-sm"
        onClick={handleAddServiceTime}
      >
        <div className="flex items-center gap-1 text-accent">
          <span className="icon-[material-symbols--add-2-rounded] text-lg" />
          新增時段
        </div>
      </Button>

      <Button type="submit" variant="default">
        <div className="flex items-center gap-1 text-primary-foreground">
          <span className="icon-[material-symbols--check-rounded] text-xl" />
          確認
        </div>
      </Button>
    </form>
  );
}
