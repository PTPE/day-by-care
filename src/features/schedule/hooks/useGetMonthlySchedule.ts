import { useQuery } from '@tanstack/react-query';

import getMonthlyClientSchedule from '@/features/schedule/actions/get-monthly-client-schedule';

type Props = {
  scheduleId: string;
};

export default function useGetMonthlyClientSchedule({ scheduleId }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['monthly-client-schedule'],
    queryFn: () => getMonthlyClientSchedule(scheduleId),
  });

  return { data, isLoading, error };
}
