import { MonthlyClientSchedule } from '@/features/schedule/types/monthly-client-schedule';

import FirstHalfMonth from './_first-half-month';
import SecondHalfMonth from './_second-half-month';

type Props = {
  schedule: MonthlyClientSchedule;
};

export default function ScheduleTemplate({ schedule }: Props) {
  return (
    <div>
      <FirstHalfMonth schedule={schedule} />
      <SecondHalfMonth schedule={schedule} />
    </div>
  );
}
