import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { useFieldArray, useForm } from 'react-hook-form';
import { zhTW } from 'date-fns/locale';
import { format } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/ui/dialog';
import Button from '@/ui/button';
import { ServiceLog } from '@/features/report/types';
import { useUpdateServiceTimeByDay } from '@/hooks/query';
import { getValidServiceTime } from '@/utils/get-valid-service-time';

import TimeSlot from './_time-slot';

type Props = {
  serviceLog: ServiceLog;
};

export type EditTimeSlotDialogRef = {
  open: () => void;
  close: () => void;
};

const EditTimeSlotDialog = forwardRef<EditTimeSlotDialogRef, Props>(
  ({ serviceLog }, ref) => {
    const [open, setOpen] = useState(false);

    const { control, register, handleSubmit, reset } = useForm({
      defaultValues: {
        serviceTime: serviceLog.serviceTime,
      },
    });

    const { fields, remove, update, append } = useFieldArray({
      control,
      name: 'serviceTime',
    });

    const { mutate: updateServiceTime, isPending: isUpdating } =
      useUpdateServiceTimeByDay({
        onSuccessCb: () => setOpen(false),
      });

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    const handleRemove = (index: number) => {
      if (fields.length === 1) update(0, { startTime: '', endTime: '' });
      else remove(index);
    };

    const handleRemoveAll = () => {
      reset({ serviceTime: [{ startTime: '', endTime: '' }] });
    };

    const onSubmit = (data: {
      serviceTime: { startTime: string; endTime: string }[];
    }) => {
      const serviceTimePerDay = data.serviceTime.map((time) => ({
        date: serviceLog.date,
        serviceTime: time,
      }));

      const validServiceTimePerDay = serviceTimePerDay.filter((time) =>
        getValidServiceTime({
          date: serviceLog.date,
          service_start_time: time.serviceTime.startTime,
          service_end_time: time.serviceTime.endTime,
        })
      );

      updateServiceTime({
        clientId: serviceLog.clientId,
        serviceTimePerDay: validServiceTimePerDay,
      });
    };

    useEffect(() => {
      if (!open) reset({ serviceTime: serviceLog.serviceTime });
    }, [open, reset, serviceLog.serviceTime]);

    if (!open) return null;

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogDescription />
        <DialogContent className="w-[95%] rounded-lg max-h-[90%] overflow-y-auto">
          <DialogTitle className="text-primary font-bold text-lg text-start">
            {serviceLog.clientName} -{' '}
            {format(serviceLog.date, 'yyyy/M/d（eeeee）', { locale: zhTW })}
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                  <TimeSlot
                    key={field.id}
                    register={register}
                    index={index}
                    onRemove={() => handleRemove(index)}
                  />
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/20"
                  onClick={handleRemoveAll}
                >
                  刪除全部
                </Button>
                <Button
                  variant="accent"
                  className="text-primary-foreground"
                  onClick={() => {
                    append({ startTime: '', endTime: '' });
                  }}
                >
                  新增時段
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? '修改中...' : '確認更改'}
                </Button>
                <Button
                  variant="ghost"
                  className="border border-border"
                  onClick={() => setOpen(false)}
                >
                  取消
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);

EditTimeSlotDialog.displayName = 'EditTimeSlotDialog';

export default EditTimeSlotDialog;
