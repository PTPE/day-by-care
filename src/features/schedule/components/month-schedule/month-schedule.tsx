'use client';

import { useRef, useState } from 'react';

import Calendar from 'react-calendar';

import { useAppSelector } from '@/store/hooks';

import './calendar.css';
import CheckInOutDialog, { CheckInOutDialogRef } from './_check-in-out-dialog';
import DayTile from './_day-tile';

export default function MonthSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dayRef = useRef<CheckInOutDialogRef>(null);

  const year = useAppSelector((state) => state.schedule.year);
  const month = useAppSelector((state) => state.schedule.month);
  const client = useAppSelector((state) => state.schedule.client.name);

  const yearMonthOfSchedule =
    year && month && client ? `${year}年${month}月班表 - ${client}` : '';

  return (
    <>
      <div className="text-lg font-bold mb-5">{yearMonthOfSchedule}</div>

      <Calendar
        value={selectedDate}
        onChange={(value) => setSelectedDate(value as Date)}
        locale="zh-TW"
        calendarType="hebrew"
        next2Label={null}
        prev2Label={null}
        tileClassName={({ date }) => {
          if (date.getMonth() !== new Date().getMonth()) {
            return 'text-muted-foreground';
          }
          return '';
        }}
        formatShortWeekday={(_, date) =>
          date.toLocaleDateString('zh-TW', { weekday: 'narrow' })
        }
        formatDay={(_, date) =>
          date.toLocaleDateString('en-US', { day: 'numeric' })
        }
        // eslint-disable-next-line react/no-unstable-nested-components
        tileContent={({ date }) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <DayTile date={date} />
        )}
      />

      <CheckInOutDialog ref={dayRef} date={selectedDate} />
    </>
  );
}
