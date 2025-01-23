import { z } from 'zod';

export const timeSlotsSchema = z.array(
  z.object({
    day: z.number(),
    workTime: z.array(
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
  timeSlots: timeSlotsSchema,
});

export const createScheduleFormSchema = z.object({
  schedules: z.array(clientScheduleSchema),
  year: z.number(),
  month: z.number(),
});
