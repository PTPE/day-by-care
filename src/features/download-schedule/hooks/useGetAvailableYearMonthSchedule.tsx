import { useQuery } from '@tanstack/react-query';

import getAvailableYearMonthScheduleAction from '@/features/download-schedule/actions/get-available-year-month-schedule';

export default function useGetAvailableYearMonthSchedule() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['availableYearMonthSchedule'],
    queryFn: () => getAvailableYearMonthScheduleAction(),
  });

  return { data, isLoading, error };
}
