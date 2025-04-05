'use client';

import { useParams } from 'next/navigation';

import useGetMonthlyClientSchedule from '@/features/schedule/hooks/useGetMonthlySchedule';

import FirstHalfMonth from './_first-half-month-schedule';
import LastHalfMonth from './_last-half-month-schedule';

export default function Schedule() {
  const { scheduleId = '' } = useParams();
  const { data: schedule } = useGetMonthlyClientSchedule({
    scheduleId: scheduleId as string,
  });

  if (!schedule) return <div>Loading...</div>;

  return (
    <>
      <FirstHalfMonth schedule={schedule} />
      <LastHalfMonth schedule={schedule} />
    </>
  );
}
