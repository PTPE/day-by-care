import { z } from 'zod';

export const timeSlotsSchema = z.array(
  z.object({
    day: z.number(),
    time_range: z.array(
      z.object({
        start: z.object({
          hour: z.number(),
          minute: z.number(),
        }),
        end: z.object({
          hour: z.number(),
          minute: z.number(),
        }),
      })
    ),
  })
);

export const clientScheduleSchema = z.object({
  client_id: z.string(),
  time_slots: timeSlotsSchema,
});

export const scheduleFormSchema = z.object({
  schedules: z.array(clientScheduleSchema),
  year: z
    .number()
    .optional()
    .refine((val) => !!val, { message: '請選擇月份' }),
  month: z
    .number()
    .optional()
    .refine((val) => !!val, { message: '請選擇月份' }),
});
