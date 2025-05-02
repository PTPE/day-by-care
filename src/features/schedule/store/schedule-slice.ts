import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DayOfWeek } from '@/features/schedule/types';

type ScheduleState = {
  year: number;
  month: number;
  client: {
    id: string;
    name: string;
  };

  monthSchedule: {
    date: string;
    serviceTime: {
      start: string;
      end: string;
    }[];
  }[];
};

function getDatesInMonthByDayOfWeek(year: number, month: number) {
  const result: Record<DayOfWeek, string[]> = {
    [DayOfWeek.SUNDAY]: [],
    [DayOfWeek.MONDAY]: [],
    [DayOfWeek.TUESDAY]: [],
    [DayOfWeek.WEDNESDAY]: [],
    [DayOfWeek.THURSDAY]: [],
    [DayOfWeek.FRIDAY]: [],
    [DayOfWeek.SATURDAY]: [],
  };

  const date = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  while (date <= end) {
    const jsDay = date.getDay();
    const dayOfWeek = [
      DayOfWeek.SUNDAY,
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY,
    ][jsDay];

    result[dayOfWeek].push(date.toLocaleDateString('zh-TW'));
    date.setDate(date.getDate() + 1);
  }

  return result;
}

const initialState: ScheduleState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  client: {
    id: '',
    name: '',
  },

  monthSchedule: [],
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
    },
    setClient: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.client = action.payload;
    },

    applyWeekScheduleToMonthSchedule: (
      state,
      action: PayloadAction<{
        weekSchedule: {
          [key in DayOfWeek]: {
            start: string;
            end: string;
          }[];
        };
      }>
    ) => {
      const monthSchedule: {
        date: string;
        serviceTime: { start: string; end: string }[];
      }[] = [];

      const datesByDayOfWeek = getDatesInMonthByDayOfWeek(
        state.year,
        state.month
      );

      Object.entries(datesByDayOfWeek).forEach(([dayOfWeek, dates]) => {
        const serviceTimes =
          action.payload.weekSchedule[dayOfWeek as DayOfWeek];

        dates.forEach((date) => {
          monthSchedule.push({ date, serviceTime: serviceTimes });
        });
      });

      state.monthSchedule = monthSchedule;
    },
  },
});

export const {
  setYear,
  setMonth,
  setClient,
  applyWeekScheduleToMonthSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
