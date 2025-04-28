import { useQuery } from '@tanstack/react-query';

import getMonthlyClientScheduleAction from '@/features/schedule/actions/get-monthly-client-schedule-action';

type Props = {
  scheduleId: string;
};

export default function useGetMonthlyClientSchedule({ scheduleId }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['monthly-client-schedule'],
    queryFn: () => getMonthlyClientScheduleAction(scheduleId),
  });

  return { data, isLoading, error };
}
