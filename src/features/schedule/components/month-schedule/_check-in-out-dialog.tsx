'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import { useFieldArray, useForm } from 'react-hook-form';
import { format } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import Button from '@/ui/button';
import { DateString } from '@/features/schedule/types';
import LoadingSpinner from '@/ui/loading-spinner';
import { getValidMonthScheduleServiceTime } from '@/features/schedule/utils';
import { useScheduleUrlParams } from '@/features/schedule/hooks/useScheduleUrlParams';
import { useUpdateServiceTimeByDay } from '@/hooks/query';

import TimeSlot from './_time-slot';

type Props = {
  date: Date;
  serviceTime: { start: string; end: string }[];
};

export type CheckInOutDialogRef = {
  open: () => void;
  close: () => void;
};

const CheckInOutDialog = forwardRef<CheckInOutDialogRef, Props>(
  ({ date, serviceTime }, ref) => {
    const [open, setOpen] = useState(false);

    const hasServiceTime = serviceTime.length > 0;

    const defaultValues = useMemo(() => {
      if (hasServiceTime) {
        return { serviceTime };
      }

      return { serviceTime: [{ start: '', end: '' }] };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasServiceTime, JSON.stringify(serviceTime)]);

    const { mutate: updateSchedule, isPending: isUpdating } =
      useUpdateServiceTimeByDay({
        onSuccessCb: () => {
          setOpen(false);
        },
      });

    const { clientId } = useScheduleUrlParams();

    const { control, register, reset, handleSubmit } = useForm<{
      serviceTime: { start: string; end: string }[];
    }>({
      defaultValues,
    });

    const { fields, remove, update, append } = useFieldArray({
      control,
      name: 'serviceTime',
    });

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    useEffect(() => {
      reset(defaultValues);
    }, [defaultValues, reset]);

    if (!open || !clientId) return null;

    const onSubmit = handleSubmit((data) => {
      const monthSchedule = data.serviceTime.map((s) => ({
        date: format(date, 'yyyy-MM-dd') as DateString,
        serviceTime: {
          startTime: s.start,
          endTime: s.end,
        },
      }));

      const validMonthSchedule =
        getValidMonthScheduleServiceTime(monthSchedule);

      const params = {
        clientId,
        serviceTimePerDay: validMonthSchedule,
      };

      updateSchedule(params);
    });

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-primary w-[95%] rounded-md">
          {isUpdating && <LoadingSpinner />}
          <DialogDescription />

          <DialogHeader>
            <DialogTitle>{format(date, 'yyyy年MM月dd日')}排程</DialogTitle>
          </DialogHeader>

          {fields.map((field, index) => (
            <TimeSlot
              key={field.id}
              register={register}
              onRemove={() => {
                if (fields.length === 1) {
                  update(0, { start: '', end: '' });
                } else {
                  remove(index);
                }
              }}
              index={index}
            />
          ))}

          <Button
            variant="outline"
            className="text-accent"
            onClick={() => {
              append({ start: '', end: '' });
            }}
          >
            新增時段
          </Button>

          <div className="w-full h-[1px] bg-line" />

          <div className="flex justify-between">
            <Button variant="ghost" className="text-destructive" type="button">
              刪除全部時段
            </Button>

            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                reset(defaultValues);
                setOpen(false);
              }}
            >
              取消變更
            </Button>

            <Button
              variant="accent"
              type="submit"
              onClick={() => {
                onSubmit();
              }}
            >
              儲存變更
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

CheckInOutDialog.displayName = 'CheckInOutDialog';

export default CheckInOutDialog;
