import { useSearchParams } from 'next/navigation';

export default function useReportUrlParams() {
  const searchParams = useSearchParams();

  const year = searchParams.get('year') || new Date().getFullYear();
  const month = searchParams.get('month') || new Date().getMonth() + 1;

  return { year, month };
}
