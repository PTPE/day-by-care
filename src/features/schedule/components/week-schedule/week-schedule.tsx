/* eslint-disable arrow-body-style */

'use client';

import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DayOfWeek as DayOfWeekType } from '@/features/schedule/types';
import { weekScheduleSchema } from '@/features/schedule/schema/week-schedule-schema';
import {
  getValidMonthScheduleServiceTime,
  weekScheduleToMonthSchedule,
} from '@/features/schedule/utils';
import Button from '@/ui/button';
import LoadingSpinner from '@/ui/loading-spinner';
import { useScheduleUrlParams } from '@/features/schedule/hooks/useScheduleUrlParams';
import { useUpdateServiceTimeByDay } from '@/hooks/query';

import DayOfWeek from './_day-of-week';

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
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(weekScheduleSchema),
  });

  const { year, month, clientId } = useScheduleUrlParams();

  const { mutate: updateSchedule, isPending: isUpdating } =
    useUpdateServiceTimeByDay({
      onSuccessCb: () => {
        methods.reset(defaultValues);
      },
    });

  if (!year || !month || !clientId) return null;

  const onSubmit = (data: z.infer<typeof weekScheduleSchema>) => {
    const monthSchedule = weekScheduleToMonthSchedule({
      year: Number(year),
      month: Number(month),
      weekSchedule: data,
    });

    const validMonthSchedule = getValidMonthScheduleServiceTime(monthSchedule);

    updateSchedule({
      clientId,
      serviceTimePerDay: validMonthSchedule,
    });
  };

  return (
    <FormProvider {...methods}>
      {isUpdating && <LoadingSpinner />}
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
