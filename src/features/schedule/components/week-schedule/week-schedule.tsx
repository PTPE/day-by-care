/* eslint-disable arrow-body-style */

'use client';

import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DayOfWeek as DayOfWeekType } from '@/features/schedule/types';
import { applyWeekScheduleToMonthSchedule } from '@/features/schedule/store/schedule-slice';
import { weekScheduleSchema } from '@/features/schedule/modules';
import Button from '@/ui/button';
import { useAppDispatch } from '@/store/hooks';

import DayOfWeek from './_day-of-week';

function getValidServiceTime(
  serviceTime: z.infer<typeof weekScheduleSchema>
): z.infer<typeof weekScheduleSchema> {
  return Object.entries(serviceTime).reduce(
    (acc, [day, slots]) => {
      // eslint-disable-next-line no-param-reassign
      acc[day as keyof typeof serviceTime] = slots.filter(
        (slot) => slot.start && slot.end && slot.end > slot.start
      );
      return acc;
    },
    {} as z.infer<typeof weekScheduleSchema>
  );
}

const defaultValues = {
  [DayOfWeekType.MONDAY]: [],
  [DayOfWeekType.TUESDAY]: [],
  [DayOfWeekType.WEDNESDAY]: [],
  [DayOfWeekType.THURSDAY]: [],
  [DayOfWeekType.FRIDAY]: [],
  [DayOfWeekType.SATURDAY]: [],
  [DayOfWeekType.SUNDAY]: [],
};

export default function WeekSchedule() {
  const dispatch = useAppDispatch();
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(weekScheduleSchema),
  });

  const onSubmit = (data: z.infer<typeof weekScheduleSchema>) => {
    const validServiceTime = getValidServiceTime(data);

    methods.reset(defaultValues);

    dispatch(
      applyWeekScheduleToMonthSchedule({
        weekSchedule: validServiceTime,
      })
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-5"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold text-primary">每週排班模板</div>
          <div className="text-sm text-muted-foreground">
            設定每週固定時段，可一鍵套用到整個月。每日可設定多個時段，方便彈性安排。
          </div>
        </div>
        {/* <div className="px-4 py-3 bg-tertiary text-tertiary-foreground rounded-t-md border border-line border-b-0 font-bold"></div> */}
        <div className="flex gap-3 rounded-b-md overflow-auto">
          {[
            DayOfWeekType.MONDAY,
            DayOfWeekType.TUESDAY,
            DayOfWeekType.WEDNESDAY,
            DayOfWeekType.THURSDAY,
            DayOfWeekType.FRIDAY,
            DayOfWeekType.SATURDAY,
            DayOfWeekType.SUNDAY,
          ].map((day) => (
            <DayOfWeek key={day} day={day} />
          ))}
        </div>

        <div className="flex gap-5 items-center">
          <Button
            variant="outline"
            className="w-fit border-line"
            onClick={() => methods.reset(defaultValues)}
          >
            <div className="icon-[solar--trash-bin-minimalistic-outline]" />
            清除所有時段
          </Button>
          <Button
            className="w-[200px] self-center"
            variant="accent"
            type="submit"
          >
            <div className="icon-[uil--schedule]" />
            一鍵套用至月班表
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
