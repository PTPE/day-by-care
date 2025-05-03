import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DayOfWeek } from '@/features/schedule/types';

type ISODateString = string;

type ScheduleState = {
  year: number;
  month: number;
  client: {
    id: string;
    name: string;
  };

  monthSchedule: {
    date: ISODateString;
    serviceTime: {
      start: string;
      end: string;
    }[];
  }[];
};

function getDatesInMonthByDayOfWeek(year: number, month: number) {
  const result: Record<DayOfWeek, ISODateString[]> = {
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

    result[dayOfWeek].push(date.toISOString());
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
        date: ISODateString;
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

    setSingleDateServiceTimeToMonthSchedule: (
      state,
      action: PayloadAction<{
        date: ISODateString;
        serviceTime: { start: string; end: string }[];
      }>
    ) => {
      const index = state.monthSchedule.findIndex(
        (date) => date.date === action.payload.date
      );

      if (index === -1) {
        state.monthSchedule.push(action.payload);
      } else {
        state.monthSchedule[index].serviceTime = action.payload.serviceTime;
      }
    },
  },
});

export const {
  setYear,
  setMonth,
  setClient,
  applyWeekScheduleToMonthSchedule,
  setSingleDateServiceTimeToMonthSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
