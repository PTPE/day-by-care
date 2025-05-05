import { useSearchParams } from 'next/navigation';

export function useScheduleUrlParams() {
  const searchParams = useSearchParams();

  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const clientId = searchParams.get('clientId');

  return { year, month, clientId };
}
