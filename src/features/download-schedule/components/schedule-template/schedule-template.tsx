import { MonthlyClientSchedule } from '@/features/schedule/types/monthly-client-schedule';

import FirstHalfMonth from './_first-half-month';
import SecondHalfMonth from './_second-half-month';

type Props = {
  schedule: MonthlyClientSchedule;
  type: 'preview' | 'download';
};

export default function ScheduleTemplate({ schedule, type }: Props) {
  return (
    <div>
      <FirstHalfMonth type={type} schedule={schedule} />
      <SecondHalfMonth type={type} schedule={schedule} />
    </div>
  );
}
