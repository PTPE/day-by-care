import { z } from 'zod';

import { DayOfWeek as DayOfWeekType } from '@/features/schedule/types';

export const weekScheduleSchema = z.object({
  [DayOfWeekType.MONDAY]: z.array(
    z.object({
      start: z.string(),
      end: z.string(),
    })
  ),
  [DayOfWeekType.TUESDAY]: z.array(
    z.object({
      start: z.string(),
      end: z.string(),
    })
  ),
  [DayOfWeekType.WEDNESDAY]: z.array(
    z.object({
      start: z.string(),
      end: z.string(),
    })
  ),
  [DayOfWeekType.THURSDAY]: z.array(
    z.object({
      start: z.string(),
      end: z.string(),
    })
  ),
  [DayOfWeekType.FRIDAY]: z.array(
    z.object({
      start: z.string(),
      end: z.string(),
    })
  ),
  [DayOfWeekType.SATURDAY]: z.array(
    z.object({
      start: z.string(),
      end: z.string(),
    })
  ),
  [DayOfWeekType.SUNDAY]: z.array(
    z.object({
      start: z.string(),
      end: z.string(),
    })
  ),
});
